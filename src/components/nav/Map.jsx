//

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "../css_modules/Map.module.css";
import { useCities } from "../../contexts/CitiesContext";
import { useGeolocation } from "../../hooks/useGeoLocation";
import Button from "./Button";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams] = useSearchParams();
  const {
    getPosition,
    isLoading: isLoadingPosition,
    position: geolocationPosition,
  } = useGeolocation();

  const { cities } = useCities();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <Button />
      <MapContainer
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <DetectClick />
        <ChangeCenter
          mapLat={mapLat}
          mapLng={mapLng}
          setMapPosition={setMapPosition}
        />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ mapLat, mapLng, setMapPosition }) {
  const map = useMap();

  useEffect(
    function () {
      if (mapLat === null || mapLng === null) return;

      const position = [Number(mapLat), Number(mapLng)];

      map.setView(position);
      setMapPosition(position);
    },
    [map, mapLat, mapLng, setMapPosition],
  );

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}

export default Map;
