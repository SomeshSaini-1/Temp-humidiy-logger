import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const Map = ({ height = 500 }) => {
  const defaultCenter = {
    lat: 26.855980263390784,
    lng: 75.78391780923478,
  };

  const googleMapsApiKey = "AIzaSyA0eGBoFH35UACgzF4UZM34t2NC-SWDFIA";

  const [position, setPosition] = useState([
    {
      lat: 26.852770,
      lng: 75.779541,
    },
    {
      lat: 26.852770,
      lng: 75.779541,
    }
  ]);

  return (
    <div>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: `${height}px`, borderRadius: '0.75rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
          zoom={10}
          center={defaultCenter}
        >
          {position.map((pos, idx) => (
            <Marker key={idx} position={pos} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
