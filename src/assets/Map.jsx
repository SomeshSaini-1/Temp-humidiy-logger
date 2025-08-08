import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ height = 500 }) => {
  const defaultCenter = [26.852770, 75.779541];

  const positions = [
    [26.852770, 75.779541],
    [26.852770, 75.779541]
  ];

  return (
    <div style={{ borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ 
          height: `${height}px`,
          //  width: '100%'
         }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map((pos, idx) => (
          <Marker key={idx} position={pos}>
            <Popup>Marker {idx + 1}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;






// import React, { useState } from 'react';
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

// const Map = ({ height = 500 }) => {
//   const defaultCenter = {
//     lat: 26.855980263390784,
//     lng: 75.78391780923478,
//   };

//   const googleMapsApiKey = "AIzaSyA0eGBoFH35UACgzF4UZM34t2NC-SWDFIA";

//   const [position, setPosition] = useState([
//     {
//       lat: 26.852770,
//       lng: 75.779541,
//     },
//     {
//       lat: 26.852770,
//       lng: 75.779541,
//     }
//   ]);

//   return (
//     <div>
//       <LoadScript googleMapsApiKey={googleMapsApiKey}>
//         <GoogleMap
//           mapContainerStyle={{ width: '100%', height: `${height}px`, borderRadius: '0.75rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
//           zoom={10}
//           center={defaultCenter}
//         >
//           {position.map((pos, idx) => (
//             <Marker key={idx} position={pos} />
//           ))}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default Map;
