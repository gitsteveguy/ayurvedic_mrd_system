import React from 'react'
import { VectorMap } from "react-jvectormap";
import { useRef } from "react";

export default function WorldMap(props) {
    const mapRef = useRef();
    const countries = props.mapData;
  return (
    <div className="card card-full" >
        <h3>{props.title}</h3>
        <div style={{ width: "100%", height: props.height }}>
        <VectorMap
          ref={mapRef}
          // zoomOnScroll={false}
          // zoomButtons={false}
          map={"world_mill"}
          backgroundColor="white"
          containerStyle={{
            width: "100%",
            height: "100%",
          }}
          markerStyle={{
            initial: {
              fill: "#5E32CA",
              stroke: "#383f47",
            },
          }}
          containerClassName="map"
          series={{
            regions: [
              {
                scale: ["#a3e9a3", "#008500"],
                attribute: "fill",
                values: countries,
                normalizeFunction: "polynomial",
                min: Math.min(...Object.values(countries)),
                max: Math.max(...Object.values(countries)),
                
              },
            ],
          }}
          regionStyle={{
            initial: {
              fill: "#D1D5DB",
              "fill-opacity": 1,
              stroke: "#265cff",
              "stroke-width": 0,
              "stroke-opacity": 0,
            },
            hover: {
              "fill-opacity": 0.8,
              fill: "",
              stroke: "#2b2b2b",
            },
            selected: {
              fill: "#FFFB00",
            },
          }} 
          onRegionTipShow={function (event, label, code, ...props) {
            let count = 0;
            if(countries[code])
            count = countries[code];
            console.log("-----> ", label.html(), event, label, code, props);
            label.html(
              '<div class="map-tooltip"' +
                "<p>" +
                "<b>" +
                label.html() +
                "</b>" +
                "</p>" +
                "<p>" +
                "Count: " +
                "<b> " +
                count +
                "</b>" +
                "</p>" +
                "</div>"
                
            );
          }}
          
          />
        </div>
    </div>
  )
}
