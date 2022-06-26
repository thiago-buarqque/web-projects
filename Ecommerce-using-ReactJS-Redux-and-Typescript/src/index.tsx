import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { createStore } from "redux";
import { Provider } from "react-redux";
// import allReducers from "./redux";

import CartReducer from "./redux/cartReducer";

const store = createStore(CartReducer);
// const store: Store<CartProductsState> = createStore(
// 	allReducers,
// 	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
// );

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root"),
);
