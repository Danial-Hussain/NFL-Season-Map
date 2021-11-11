import React, { useRef, useEffect } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ArcGISMap from "@arcgis/core/Map";
import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import "./Map.css";

export const Map = ({ theme, team, year }) => {
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
        zoom: 5,
        spatialReference: {
          wkid: 3857,
        },
      });

      const popupTemplate = {
        // autocasts as new PopupTemplate()
        title: "station: {Station_Name}",
        content: [
          {
            // It is also possible to set the fieldInfos outside of the content
            // directly in the popupTemplate. If no fieldInfos is specifically set
            // in the content, it defaults to whatever may be set within the popupTemplate.
            type: "fields",
            fieldInfos: [
              {
                fieldName: "Fuel_Type_Code",
                label: "Fuel type",
              },
              {
                fieldName: "EV_Network",
                label: "EV network",
              },
              {
                fieldName: "EV_Connector_Types",
                label: "EV connection types",
              },
              {
                fieldName: "Station_Name",
                label: "Station Name",
              },
            ],
          },
        ],
      };

      const scale = 36112;
      const layer1 = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Alternative_Fuel_Station_March2018/FeatureServer",
        outFields: ["*"],
        popupTemplate,
        renderer: new DictionaryRenderer({
          url: "https://jsapi.maps.arcgis.com/sharing/rest/content/items/30cfbf36efd64ccf92136201d9e852af",
          fieldMap: {
            fuel_type: "Fuel_Type_Code",
          },
          config: {
            show_label: "false",
          },
          visualVariables: [
            {
              type: "size",
              valueExpression: "$view.scale",
              stops: [
                { value: scale / 2, size: 20 },
                { value: scale * 2, size: 15 },
                { value: scale * 4, size: 10 },
                { value: scale * 8, size: 5 },
                { value: scale * 16, size: 2 },
                { value: scale * 32, size: 1 },
              ],
            },
          ],
        }),
        minScale: 0,
        maxScale: 10000,
      });

      const layer2 = new FeatureLayer({
        url: "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Alternative_Fuel_Station_March2018/FeatureServer",
        outFields: ["*"],
        renderer: new DictionaryRenderer({
          url: "https://jsapi.maps.arcgis.com/sharing/rest/content/items/30cfbf36efd64ccf92136201d9e852af",
          fieldMap: {
            fuel_type: "Fuel_Type_Code",
            connector_types: "EV_Connector_Types",
            network: "EV_Network",
            name: "Station_Name",
          },
          config: {
            show_label: "true",
          },
        }),
        minScale: 10000,
        maxScale: 0,
      });

      const layer3 = new FeatureLayer({
        url: `https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/${team}-${year}/FeatureServer`,
        outFields: ["*"],
        renderer: {
          type: "simple",
          symbol: { type: "simple-fill" },
        },
      });

      // const layer4 = new FeatureLayer({
      //   url: "https://services.arcgis.com/LBbVDC0hKPAnLRpO/arcgis/rest/services/stadiums/FeatureServer",
      //   outFields: ["*"],
      //   renderer: {
      //     type: "simple",
      //     symbol: { type: "simple-fill" },
      //     visualVariables: [
      //       {
      //         size: 50,
      //         color: "green",
      //       },
      //     ],
      //   },
      // });

      map.addMany([layer1]);
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
};
