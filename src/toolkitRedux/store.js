import { combineReducers, configureStore, createEntityAdapter } from '@reduxjs/toolkit'
import orderBookSlice from './orderBookSlice';
import {wsAPI} from 'toolkitAPI/websocket'
import userPanelSlice from './userPanelSlice';

const rootReducer = combineReducers({
    userPanel: userPanelSlice,
    orderBook: orderBookSlice,
    [wsAPI.reducerPath]: wsAPI.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(wsAPI.middleware)
})
