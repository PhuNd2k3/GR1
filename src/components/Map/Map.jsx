import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
export const Map = () => {
  const position = [51.505, -0.09];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "85vh",
        padding: "10px 10px 0px 5px",
      }}
    >
      <div
        style={{
          width: "40%",
          alignContent: "center",
          paddingLeft: "20px",
        }}
      >
        <div style={{ paddingBottom: "40px" }}>Bắt đầu</div>
        <div>Kết thúc</div>
      </div>
      <div>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "60%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};
