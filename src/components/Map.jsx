import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import styles from "./Map.module.css";
import { useCityContext } from "../context/CityContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Map() {
  const { selectedCityList } = useCityContext();
  const { id } = useParams();
  const [mapPosition, setMapPosition] = useState(
    selectedCityList.length > 0
      ? [selectedCityList[0].lat, selectedCityList[0].lng]
      : [(10, 20)]
  );

  useEffect(
    function () {
      if (!id) return;
      const location = selectedCityList.find((item) => item.cityID === id);
      if (!location) return;

      setMapPosition([location.lat, location.lng]);
    },
    [id]
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {selectedCityList.map((city) => (
          <Marker position={[city.lat, city.lng]} key={city.cityID}>
            <Popup>
              <p style={{ display: "grid", gridTemplateColumns: "60fr 40fr" }}>
                <span>
                  <img
                    src={`../assets/weatherIcons/${String(
                      city.currentCondition?.WeatherIcon
                    ).padStart(2, "0")}-s.png`}
                    className="weatherIconSmall"
                  />
                </span>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>{city.emoji}</span>
                  <span>{city.cityName}</span>
                </span>
              </p>
            </Popup>
          </Marker>
        ))}
        <CenterMap position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function CenterMap({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
