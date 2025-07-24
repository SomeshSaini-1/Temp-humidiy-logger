import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useEffect } from 'react';

// Mock API call
export const fetchSensorData = createAsyncThunk('sensors/fetchSensorData', async () => {
  // Simulate API response
  return [];
});

// Async thunk to fetch device data
export const fetchDeviceData = createAsyncThunk('sensors/fetchDeviceData', async () => {
  try {
    const api = await fetch("https://temperature-humidity-datalogger-api.otplai.com/api/getDevice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        devicename: "all",
      }),
    });
    const data = await api.json();
    console.log(data, "Device Data");
    return data; // Assuming the API returns an array of devices
  } catch (error) {
    console.error(error);
    throw error; // Let Redux Toolkit handle the error
  }
});

// Remove standalone Device_data function as it's now handled by fetchDeviceData

const sensorSlice = createSlice({
  name: 'sensors',
  initialState: {
    devices: [
       { devicename: "OTPL-WTH-001", deviceid: "348518941934",date:new Date().toJSON().slice(0, 10) , status:"Active",category:"Wifi",region:"North" },

    ], // Initialize as empty, to be populated by API
    sensorData: [],
  },
  reducers: {
    addDevice: (state, action) => {
      state.devices.push(action.payload);
    },
    addSensorData: (state, action) => {
      state.sensorData.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensorData.fulfilled, (state, action) => {
        state.sensorData = action.payload;
      })
      .addCase(fetchDeviceData.fulfilled, (state, action) => {
        state.devices = action.payload; // Set devices from API data
      });
  },
});

export const { addSensorData, addDevice } = sensorSlice.actions;
export default sensorSlice.reducer;

// If you still need to trigger the fetch in a component
// // Example usage in a React component:
// function MyComponent() {
//   useEffect(() => {
//     // Dispatch fetchDeviceData when component mounts
//     // Note: You'll need to import useDispatch and fetchDeviceData
//     // Example: dispatch(fetchDeviceData());
//   }, []);

//   return null; // Replace with your component JSX
// }







// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Mock API call
// export const fetchSensorData = createAsyncThunk('sensors/fetchSensorData', async () => {
//   // Simulate API response
//   return [];
// });

// const sensorSlice = createSlice({
//   name: 'sensors',
//   initialState: {
//     devices: [
//   { devicename: "OTPL-WTH-001", deviceid: "348518941934",date:new Date().toJSON().slice(0, 10) , status:"Active",category:"Wifi",region:"North" },
//    { devicename: "Testing", deviceid: "A085E3F17FF0",date:new Date().toJSON().slice(0, 10) , status:"Deactive",category:"Wifi",region:"North" }
 
// ],
//     sensorData: [],
//   },
//   reducers: {
//     addDevice: (state, action) => {
//       state.devices.push(action.payload);
//     },
//     addSensorData: (state, action) => {
//       state.sensorData.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchSensorData.fulfilled, (state, action) => {
//       state.sensorData = action.payload;
//     });
//   },
// });

// export const { addSensorData,addDevice } = sensorSlice.actions;
// export default sensorSlice.reducer;