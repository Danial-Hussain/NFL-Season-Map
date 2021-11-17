from itemadapter import ItemAdapter
import json

class NflTeamPipeline:
    def process_item(self, item, spider):
        data = {}
        year = item["year"]
        teams = item["teams"]
        matchups = item["matchups"]
        index = 0
        for team in teams:
            data[f"{team}"] = []
            end_range = 18 if year == "2021" else 17 
            for matchup_idx in range(index, index+end_range):
                week = matchup_idx - index + 1
                matchup = matchups[matchup_idx]
                home = True if matchup[0] != '@' else False
                data[f"{team}"].append(
                    {
                        f"Week {week}": week,
                        "Opponent": matchup.replace("@",""),
                        "Home": home
                    }
                )
            if year == "2021":
                index += 18
            else:
                index += 17
        with open(f"NFL_Season_{year}.json", "w") as f:
            json.dump(data, f)


class NflStatsPipeline:
    def process_item(self, item, spider):
        with open(f"NFL_Stats.json", "r+") as f:
            data = json.load(f)
            team = item["nfl_team"]
            year = item["year"]
            points = item["points"]
            if item["nfl_team"] in data["data"]:
                data["data"][team]["points"][year] = points
            else:
                data["data"][team] = {"points": {year: points}}
            f.truncate(0)
            f.seek(0)
            json.dump(data, f)
        