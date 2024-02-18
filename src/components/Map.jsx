import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../context/CitiesContext';
import { useGeoLocation } from '../hooks/useGeoLocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

const Map = () => {
  const navigate = useNavigate();
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  const {
    getPosition,
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
  } = useGeoLocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    mapLat && mapLng && setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    geoLocationPosition &&
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div
      className={styles.mapContainer}
      // onClick={() => {
      //   navigate('form');
      // }}
    >
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading' : 'Use Your Position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        // center={[mapLat, mapLng]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeComponent position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

function ChangeComponent({ position }) {
  const map = useMap();

  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: e => {
      console.log({ e });
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
