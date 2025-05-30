import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import authReducer from "./reducers/auth";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "shopDienTu",
  storage,
};

const persistCartReducer = persistReducer(persistConfig, cartReducer);
const persistAuthReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: {
    Cart: persistCartReducer,
    Auth: persistAuthReducer,
  },
});

export const persistor = persistStore(store);

export default store;
