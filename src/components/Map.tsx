import React from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const Map: React.FC<{ coordinates: { latitud: number; longitud: number }[] }> = ({ coordinates }) => {
  let center: [number, number] = [19.4270231,-99.1688868];
  let latlng: [number, number][] = [];

  if (coordinates && coordinates.length > 0) {
    center = [coordinates[0].latitud, coordinates[0].longitud];
    latlng = coordinates.map(coord => [coord.latitud, coord.longitud]);
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100vh" }}
    >
      <ChangeView center={center} zoom={15} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=8114b45c0214493eacd254fc34be6445"
      />
      <Marker
        position={center}
        icon={L.divIcon({
          iconSize: [15, 15],
          iconAnchor: [15 / 2, 15 + 9],
          className: "mymarker",
          html:  `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path fill="red" d="M12 2c-4.418 0-8 3.582-8 8 0 5.25 7.094 12.367 7.458 12.724.188.188.448.276.724.276s.536-.088.724-.276c.364-.357 7.458-7.474 7.458-12.724 0-4.418-3.582-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
        </svg>
        `,
        })}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {latlng.length > 0 && <Polyline positions={latlng} />}
    </MapContainer>
  );
};

export default Map;
