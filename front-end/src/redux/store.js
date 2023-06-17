import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import commoditySlide from './reducers/Commodity'
import authSlide from './reducers/Auth'
import settingSlide from './reducers/Setting'
import shopSlide from './reducers/Shop'
import cartSlide from './reducers/Cart'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    commodity: commoditySlide,
    auth: authSlide,
    setting: settingSlide,
    shop: shopSlide,
    cart: cartSlide
})

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['commodity']
}

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
