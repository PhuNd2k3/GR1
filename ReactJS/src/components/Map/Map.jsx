import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from "react-leaflet/hooks";
import axios from "axios";
export const Map = () => {
  const position = [51.505, -0.09];
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");

  const getGeocode = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&amp;lat=${lat}&amp;lon=${lng}`;

    try {
      const response = await axios.get(url);
      const result = response.data;
      if (result) {
        setAddress(result.display_name);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error(error);
      setAddress("Error retrieving address");
    }
  };

  function GetLocation() {
    const map = useMapEvents({
      click: () => {
        map.locate();
      },
      locationfound: (location) => {
        console.log(location);
      },
    });
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "85vh",
        padding: "10px 10px 0px 5px",
      }}
    >
      <div
        style={{
          width: "40vw",
          alignContent: "center",
        }}
      >
        <div>Bắt đầu</div>
        <div>Kết thúc</div>
      </div>
      <div>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "60vw", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <GetLocation /> */}
        </MapContainer>
      </div>
    </div>
  );
};
