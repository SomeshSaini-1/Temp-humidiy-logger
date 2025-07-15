import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const Map = (height="500px") => {
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
          mapContainerClassName={`w-full h-[500px] rounded-xl shadow`}
          zoom={10}
          center={defaultCenter}
        >
          {/* <Marker position={position[0]} /> */}
          {/* Or use below if you have multiple markers */}
          {position.map((pos, idx) => <Marker key={idx} position={pos} />)}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
