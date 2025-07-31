// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import './index.css';
// import App from './App';
// import MqttProvider from './assets/Mqtt';

// ReactDOM.render(
//   <Provider store={store}>
//     <MqttProvider>
//           <App />
//     </MqttProvider>
//   </Provider>,
//   document.getElementById('root')
// );

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';
import MqttProvider from './assets/Mqtt';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <MqttProvider>
        <App />
      </MqttProvider>
    </Provider>
  </StrictMode>
);

