import { combineReducers } from "redux";
import CartReducer from "./cartReducer";

export type reducerActionBase = {
	type: String;
};

const allReducers = combineReducers({
	cart: CartReducer,
});

export default allReducers;
