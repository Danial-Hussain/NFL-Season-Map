import React, { useRef, useEffect } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import "./Map.css";

export const Map = ({ theme, team, year, updateDistance }) => {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new ArcGISMap({
        basemap: theme,
      });

      const view = new MapView({
        map,
        container: mapDiv.current,
        center: [-97, 38],
        zoom: 4,
        spatialReference: {
          wkid: 3857,
        },
      });

      const popupTemplate = {
        title: "Game",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "LENGTH",
                label: "Distance Traveled (km)",
              },
              {
                fieldName: "WEEK",
                label: "NFL Week",
              },
            ],
          },
        ],
      };

      const schedule_layer = new FeatureLayer({
        url: `https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/${team}-${year}/FeatureServer`,
        outFields: ["*"],
        popupTemplate,
        fieldMap: {
          distance: "LENGTH",
          week: "WEEK",
        },
        renderer: {
          type: "simple",
          symbol: { type: "simple-fill" },
        },
      });

      const stadium_layer = new FeatureLayer({
        url: "https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/stadiums/FeatureServer",
        outFields: ["*"],
        config: {
          show_label: "true",
        },
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-marker",
            color: "#353b48",
            outline: {
              color: "#f5f6fa",
              width: 2,
            },
          },
        },
        labelingInfo: [
          {
            symbol: {
              type: "text",
              color: "black",
              font: {
                family: "Playfair Display",
                size: 10,
              },
            },
            labelPlacement: "above-center",
            labelExpressionInfo: {
              expression: "$feature.STADIUM",
            },
          },
        ],
      });

      view.when(async () => {
        const query = schedule_layer.createQuery();
        const { features } = await schedule_layer.queryFeatures(query);
        let newfeatures = features.map((f) =>
          parseFloat(f.attributes["LENGTH"])
        );
        let sum = 0;
        for (let i = 0; i < newfeatures.length; i++) {
          sum += newfeatures[i];
        }
        updateDistance(Math.round(sum * 0.62137));
      });

      map.addMany([schedule_layer, stadium_layer]);
    }
  }, [team, year]);

  return <div className="mapDiv" ref={mapDiv}></div>;
};
