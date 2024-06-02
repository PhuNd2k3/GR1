import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import TextField from "@mui/material/TextField";

import startIcon from "../../assets/startIcon.png";
import endIcon from "../../assets/endIcon.png";

export const Map = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [mapCenter, setMapCenter] = useState([21.1812352, 105.84064]);
  const [isStartSelected, setIsStartSelected] = useState(true);
  var isAdded = false;
  const [distanceInMeters, setDistanceInMeters] = useState(null);

  const handleStartClick = () => {
    setIsStartSelected(true);
  };

  const handleEndClick = () => {
    setIsStartSelected(false);
  };

  const LeafletRoutingMachine = () => {
    const map = useMap();
    if (start && end && !isAdded) {
      useEffect(() => {
        if (!isAdded && !distanceInMeters) {
          isAdded = true;
          console.log(true);
          const routingControl = L.Routing.control({
            waypoints: [
              L.latLng(start.lat, start.lng),
              L.latLng(end.lat, end.lng),
            ],

            createMarker: function (i, waypoint, n) {
              if (i === 0) {
                return L.marker(waypoint.latLng, {
                  icon: startMarkerIcon,
                }).bindPopup("Start");
              } else if (i === n - 1) {
                return L.marker(waypoint.latLng, {
                  icon: endMarkerIcon,
                }).bindPopup("End");
              } else {
                return L.marker(waypoint.latLng);
              }
            },
          }).addTo(map);
          routingControl.on("routesfound", function (e) {
            const routes = e.routes;
            const route = routes[0];
            setDistanceInMeters(route.summary.totalDistance);
            // alert();
            // "Tổng quãng đường là: " + route.summary.totalDistance + " Meters"
          });
        }
      }, []);
    }
    return null;
  };

  function GetLocation() {
    const map = useMapEvents({
      click: async (event) => {
        const { lat, lng } = event.latlng;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&zoom=18`
        );
        const data = await response.json();
        const address = data.display_name.replace(/Xã\s*|Huyện\s*/g, "");

        if (isStartSelected) {
          setStart({ lat, lng, address });
        } else {
          setEnd({ lat, lng, address });
        }
      },
    });
    return null;
  }

  const startMarkerIcon = L.icon({
    iconUrl: startIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const endMarkerIcon = L.icon({
    iconUrl: endIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

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
        <div style={{ marginBottom: "30px", padding: "0px 20px" }}>
          <TextField
            label="Bắt đầu"
            variant="outlined"
            onClick={handleStartClick}
            fullWidth
            style={{ width: "calc(100%)" }}
            value={start ? start.address : ""}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div style={{ padding: "0px 20px" }}>
          <TextField
            label="Kết thúc"
            variant="outlined"
            onClick={handleEndClick}
            fullWidth
            style={{ width: "calc(100%)" }}
            value={end ? end.address : ""}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        {distanceInMeters && (
          <div
            style={{
              marginTop: "30px",
              padding: "0px 20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <TextField
              label="Tổng khoảng cách"
              variant="outlined"
              fullWidth
              style={{ width: "calc(50%)" }}
              value={!distanceInMeters ? "" : `${distanceInMeters} meters`}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        )}
      </div>
      <div>
        <MapContainer
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "60vw", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {start && (
            <Marker position={[start.lat, start.lng]} icon={startMarkerIcon}>
              <Popup>Bắt đầu</Popup>
            </Marker>
          )}
          {end && (
            <Marker position={[end.lat, end.lng]} icon={endMarkerIcon}>
              <Popup>Kết thúc</Popup>
            </Marker>
          )}
          <GetLocation />
          <LeafletRoutingMachine />
        </MapContainer>
      </div>
    </div>
  );
};
