from arcpy.arcobjects.arcobjects import Array, Point, SpatialReference
from arcpy.arcobjects.geometries import PointGeometry, Polyline
from arcpy.management import CreateFeatureclass
from arcgis.features import FeatureLayer
from arcgis.geometry import lengths
from arcgis.geocoding import geocode
from arcgis.gis import GIS
import argparse
import shutil
import arcpy
import json
import os


def get_stadium_coordinates(team: str, year: str = "2021") -> tuple:
    # Read in the NFL Teams json file
    with open(f"data/NFL_Teams_{year}.json", "r") as file:
        teams = json.load(file)
    
    # Retrieve the correct X, Y Coordinates
    for team_obj in teams["teams"]:
        if team == team_obj["Team"]:
            X = team_obj["X_Coordinate"]
            Y = team_obj["Y_Coordinate"]
            return (X, Y) 

    return (None, None)


def geocode_addresses(year: str = "2021") -> None:
    # Read in the NFL Teams json file
    with open(f"data/NFL_Teams_{year}.json", "r") as file:
        data = json.load(file)

    # Geocode the stadium addresses
    for idx, team in enumerate(data["teams"]):
        address = team["Address"]
        geocoded_address = geocode(address, out_fields="X,Y")[0]
        X = geocoded_address["attributes"]["X"]
        Y = geocoded_address["attributes"]["Y"]
        X, Y = round(X, 4), round(Y, 4)
        data["teams"][idx]["X_Coordinate"] = X
        data["teams"][idx]["Y_Coordinate"] = Y

    # Write out the NFL Teams json file
    with open(f"data/NFL_Teams_{year}.json", "w") as f:
        json.dump(data, f)


def generate_stadium_shapefile(year: str = "2021") -> None:
    # Read in NFL Teams json file
    with open(f"data/NFL_Teams_{year}.json", "r") as file:
        data = json.load(file)

    # Create point geometry
    points = [
        (
            PointGeometry(
                Point(team["X_Coordinate"], team["Y_Coordinate"]),
                SpatialReference(4326)
            ),
            team["Team"],
            team["Stadium"],
            team["Color1"],
            team["Color2"],
        )
        for team in data["teams"]
    ]

    # Create new shapefile
    new_shape_file = CreateFeatureclass(
        out_path=os.getcwd() + "\data\stadiums",
        out_name="stadiums.shp",
        geometry_type="POINT",
        spatial_reference=4326,
    )

    # Add fields to shapefile
    arcpy.AddField_management(new_shape_file, field_name="TEAM", field_type="TEXT")
    arcpy.AddField_management(new_shape_file, field_name="STADIUM", field_type="TEXT")
    arcpy.AddField_management(new_shape_file, field_name="COLOR1", field_type="TEXT")
    arcpy.AddField_management(new_shape_file, field_name="COLOR2", field_type="TEXT")

    # Insert data into shapefile
    with arcpy.da.InsertCursor(
        new_shape_file, ["SHAPE@", "TEAM", "STADIUM", "COLOR1", "COLOR2"]
    ) as insert_cursor:
        for point in points:
            print("Inserting...")
            insert_cursor.insertRow(point)
            print(f"{point} inserted into {new_shape_file}")


def generate_schedule_shapefile(year: str = "2021") -> None:
    # Read in the NFL season json file
    with open(f"data/NFL_Season_{year}.json", "r") as file:
        schedule = json.load(file)

    # Create shapefile for each team's schedule
    for team in schedule:
        X_start, Y_start = get_stadium_coordinates(team)
        points = Array([arcpy.Point(X_start, Y_start)])
        polylines = []

        for matchup_idx in range(0, len(schedule[team])-1):
            opponent = schedule[team][matchup_idx]['Opponent']
            isHome = schedule[team][matchup_idx]['Home']
            if isHome:
                X_to, Y_to = get_stadium_coordinates(team)
            else:
                X_to, Y_to = get_stadium_coordinates(opponent)
            point = arcpy.Point(X_to, Y_to)
            points.append(point)
        
        for i in range(0, len(points)-1):
            week = f"Week {i+1}"
            if points[i] != points[i+1]:
                p_line = Polyline(points[i:i+2], SpatialReference(4326))
                length = lengths(
                    spatial_ref=4326,
                    polylines = [p_line],
                    length_unit='9036',
                    calculation_type="planar"
                )['lengths']
                if len(length) == 0:
                    length = 0
                else:
                    length = length[0]
                polylines.append((p_line, length, week))
        
        # Make directory
        if not os.path.exists(f"\data\schedules\{year}\{team}-{year}"):
            os.makedirs(os.getcwd() + f"\data\schedules\{year}\{team}-{year}")

        # Add data to shapefile
        new_shape_file = CreateFeatureclass(
            out_path = os.getcwd() + f"\data\schedules\{year}\{team}-{year}",
            out_name = f"{team}_schedule.shp",
            geometry_type = "POLYLINE",
            spatial_reference = 4326
        )

        # Add fields to shapefile
        arcpy.AddField_management(
            new_shape_file, field_name="LENGTH", field_type="TEXT"
        )
        arcpy.AddField_management(new_shape_file, field_name="WEEK", field_type="TEXT")

        with arcpy.da.InsertCursor(
            new_shape_file, ['SHAPE@', 'LENGTH', 'WEEK']
        ) as insert_cursor:
            for line in polylines:
                print("Inserting...")
                insert_cursor.insertRow(line)
                print(f"{line} inserted into {new_shape_file}")


def batch_upload_stadium() -> None:
    # Zip up the shapefile
    shutil.make_archive("data/stadiums", 'zip', os.getcwd() + "/data")

    # Upload to arcgis online
    file_path = "data/stadiums.zip"
    shpfile = gis.content.add({}, data=file_path)
    published_file = shpfile.publish()
    published_file.share(everyone=True)


def batch_upload_schedules(year: str = "2021") -> None:
    # Get folders and create gis folder
    folders = os.listdir(os.getcwd() + f"/data/schedules/{year}")
    new_folder_details = gis.content.create_folder(f"NFL-{year}")

    # Zip up the shapefiles
    for folder in folders:
        shutil.make_archive(
            f"data/schedules/{year}/{folder}", 'zip', os.getcwd() + f"/data/schedules/{year}/{folder}"
        )

    folders = os.listdir(os.getcwd() + f"/data/schedules/{year}")

    # Upload to arcgis online
    for f_name in folders:
        if f_name.endswith(".zip"):
            data = f"data/schedules/{year}/{f_name}"
            shpfile = gis.content.add({}, data=data)
            published_file = shpfile.publish()
            shpfile.move(new_folder_details)
            published_file.move(new_folder_details)
            published_file.share(everyone=True)


def euclidean_distance_query(start_year: int = 2015, end_year: int = 2021) -> None:
    # Read in teams data
    with open(f"data/NFL_Teams_2021.json", "r") as file:
        data = json.load(file)

    # Create new json file with total distances
    base_url = "https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/"
    json_dic = {"data": {}}
    for team in data["teams"]:
        abbr = team["Team"]
        for year in range(start_year, end_year+1):
            new_url = base_url + f"{abbr}-{year}/FeatureServer/0"
            layer = FeatureLayer(new_url)
            results = layer.query(out_fields="LENGTH")
            distance = round(sum([float(x) for x in results.sdf["LENGTH"]]) * 0.62137)
            if str(year) in json_dic["data"]:
                json_dic["data"][str(year)][abbr] = distance
            else:
                json_dic["data"][str(year)] = {abbr: distance}

    # Write out json data
    with open(f"data/NFL_Teams_Distance.json", "w") as f:
        json.dump(json_dic, f)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Geospatial Data Pipeline")

    parser.add_argument(
        '-y', 
        '--year', 
        metavar='Y', 
        type=str, 
        nargs='?', 
        const="2021",
        help='which year\'s data to apply the geosptial pipeline',
    )

    args = parser.parse_args()

    gis = GIS("home")
    print(f"Logged in as {gis.properties.user.username}")

    geocode_addresses(year=args.year)
    print("Geocoded stadium addresses")

    generate_stadium_shapefile(year=args.year)
    print("Generated shapefile for stadiums")

    batch_upload_stadium()
    print("Uploaded stadium shapefile to ArcGIS Online")

    generate_schedule_shapefile(year=args.year)
    print("Generated shapefile for each team's schedule")

    batch_upload_schedules(year=args.year)
    print("Uploaded schedule shapefiles to ArcGIS Online")

    euclidean_distance_query()
    print("Euclidean distance calculated")