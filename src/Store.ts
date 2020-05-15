import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./reducers/Reducer";

const store = configureStore({
  reducer: Reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
