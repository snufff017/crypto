import { combineReducers, configureStore, createEntityAdapter } from '@reduxjs/toolkit'
import orderBookSlice from './orderBookSlice';
import {wsAPI} from 'toolkitAPI/websocket-copy'
import userPanelSlice from './userPanelSlice';

const rootReducer = combineReducers({
    userPanel: userPanelSlice,
    orderBook: orderBookSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(wsAPI.middleware)
})
