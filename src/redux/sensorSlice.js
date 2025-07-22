import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API call
export const fetchSensorData = createAsyncThunk('sensors/fetchSensorData', async () => {
  // Simulate API response
  return [
    // {
    //   timestamp: new Date().toISOString(),
    //   temperature: 0,
    //   humidity: 0,
    //   dust: 0,
    // },
    // {
    //   timestamp: new Date(Date.now() - 3600000).toISOString(),
    //   temperature: 24.8,
    //   humidity: 58,
    //   dust: 50,
    // },
    // {
    //   timestamp: new Date(Date.now() - 7200000).toISOString(),
    //   temperature: 26.1,
    //   humidity: 62,
    //   dust: 42,
    // },
  ];
});

const sensorSlice = createSlice({
  name: 'sensors',
  initialState: {
    devices: [
  { devicename: "OTPL-WTH-001", deviceid: "348518941934",date:new Date().toJSON().slice(0, 10) , status:"Active",category:"Wifi",region:"North" },
   { devicename: "Testing", deviceid: "A085E3F17FF0",date:new Date().toJSON().slice(0, 10) , status:"Deactive",category:"Wifi",region:"North" }
 
],
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
    builder.addCase(fetchSensorData.fulfilled, (state, action) => {
      state.sensorData = action.payload;
    });
  },
});

export const { addSensorData,addDevice } = sensorSlice.actions;
export default sensorSlice.reducer;