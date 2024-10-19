import React from 'react'
import { VectorMap } from "react-jvectormap";
import { useRef } from "react";
import useAuth from '../../hooks/useAuth';

export default function WorldMap(props) {
  const current_user = useAuth();
  const map_color = current_user.color_theme==='light'? '#D1D5DB' : '#D1D5DB'
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
          backgroundColor="var(--color-white)"
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
              fill: map_color,
              "fill-opacity": 1,
              stroke: map_color,
              "stroke-width": 0,
              "stroke-opacity": 0,
            },
            hover: {
              "fill-opacity": 0.8,
              fill: "var(--color-complementary)",
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
