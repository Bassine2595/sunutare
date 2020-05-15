import { combineReducers } from "@reduxjs/toolkit";
import serviceModal from "./service/Reducer";

const Reducer = combineReducers({ serviceModal });

export type ReducerType = ReturnType<typeof Reducer>;

export default Reducer;
