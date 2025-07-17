// MqttProvider.js
import React, { createContext, useState, useEffect, useRef } from 'react';
import mqtt from 'mqtt';

export const MqttContext = createContext();

const MQTT_BROKER_URL = 'wss://otplai.com:8884';
const MQTT_OPTIONS = {
  username: 'oyt',
  password: '123456789',
};

const MqttProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [data, setData] = useState({});
  const clientRef = useRef(null);

  // 1. Connect once on mount
  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_BROKER_URL, MQTT_OPTIONS);
    clientRef.current = mqttClient;

    mqttClient.on('connect', () => {
      console.log('✅ MQTT connected.');
    });

    mqttClient.on('message', (msgTopic, payload) => {
      const payloadData = payload.toString();
      console.log('📩 Message:', msgTopic, payloadData);
      setData((prev) => ({
        ...prev,
        [msgTopic]: payloadData,
      }));
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  // 2. Subscribe to topics
  useEffect(() => {
    const client = clientRef.current;
    if (client && topics.length > 0) {
      topics.forEach((topic) => {
        client.subscribe(topic, (err) => {
          if (err) console.error(`❌ Error subscribing to ${topic}:`, err);
          else console.log(`✅ Subscribed to ${topic}`);
        });
      });

      return () => {
        topics.forEach((topic) => {
          client.unsubscribe(topic);
        });
      };
    }
  }, [topics]);

  // Add topic safely
  const subscribeToTopic = (newTopic) => {
    setTopics((prev) => (prev.includes(newTopic) ? prev : [...prev, newTopic]));
  };

  return (
    <MqttContext.Provider value={{ topics, subscribeToTopic, data, client: clientRef.current }}>
      {children}
    </MqttContext.Provider>
  );
};

export default MqttProvider;




// import React, { createContext, useState, useEffect, useRef } from 'react';
// import mqtt from 'mqtt';

// export const MqttContext = createContext();

// const MQTT_BROKER_URL = 'wss://otplai.com:8884';
// const MQTT_OPTIONS = {
//     username: 'oyt',
//     password: '123456789',
// };

// const MqttProvider = ({ children }) => {
//     const [topic, setTopic] = useState('');
//     const [data, setData] = useState(null);
//     const clientRef = useRef(null);

//     // 1. Connect once on mount
//     useEffect(() => {
//         const mqttClient = mqtt.connect(MQTT_BROKER_URL, MQTT_OPTIONS);
//         clientRef.current = mqttClient;

//         mqttClient.on('connect', () => {
//             console.log('MQTT connected to wss server.');
//         });

//         mqttClient.on('message', (msgTopic, payload) => {
//             const payloadData = payload.toString();
//             console.log(payloadData, msgTopic);
//             setData({ topic: msgTopic, payload: payloadData });
//         });

//         return () => {
//             mqttClient.end();
//         };
//     }, []); // ✅ empty dependency list

//     // 2. Subscribe to topic when it changes
//     useEffect(() => {
//         const client = clientRef.current;
//         if (client && topic) {
//             client.subscribe(topic, (error) => {
//                 if (error) {
//                     console.log('Error subscribing:', error);
//                 } else {
//                     console.log('Topic Subscribed:', topic);
//                 }
//             });

//             // Optional: unsubscribe from old topic when topic changes
//             return () => {
//                 client.unsubscribe(topic);
//             };
//         }
//     }, [topic]); // ✅ valid dependency

//     const subscribeToTopic = (newTopic) => {
//         setTopic(newTopic);
//         console.log(newTopic)
//     };

//     return (
//         <MqttContext.Provider value={{ topic, setTopic: subscribeToTopic, data, client: clientRef.current }}>
//             {children}
//         </MqttContext.Provider>
//     );
// };

// export default MqttProvider;
