import { reducerActionBase as GenericReducerAction } from "./index";

export type CartProduct = {
	productId: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
	color: string;
	size: string;
};

export type DuxCartProductAction = GenericReducerAction & {
	data?: CartProduct;
};

export type CartProductsState = {
	products: CartProduct[];
};

const defineInitialState = () => {
	let auxProducts: CartProduct[] = [];
	const browserState = localStorage.getItem("cartState");
	if (browserState) {
		let browserCartItems = browserState.split(";");

		let auxItem: string[];
		browserCartItems.forEach((item, i) => {
			auxItem = item.split("|");
			auxProducts.push({
				productId: Number(auxItem[0]),
				name: auxItem[1],
				price: Number(auxItem[2]),
				quantity: Number(auxItem[3]),
				image: auxItem[4],
				color: auxItem[5],
				size: auxItem[6],
			});
		});
	}
	return {
		products: auxProducts,
	};
};

const initialState: CartProductsState = defineInitialState();

const getProductCartId = (productId: number, state: CartProductsState) => {
	let id = -1;
	state.products.forEach((product, i) => {
		if (product.productId === productId) id = i;
	});
	return id;
};

const saveCartStateInBrowserStorage = (auxState: CartProductsState) => {
	let browserData = "";
	auxState.products.forEach((product, i) => {
		if (i > 0) browserData += ";";
		browserData += `${product.productId}|${product.name}|${product.price}|${product.quantity}|${product.image}|${product.color}|${product.size}`;
	});
	localStorage.setItem("cartState", browserData);
};

const CartReducer = (state: CartProductsState = initialState, action: DuxCartProductAction) => {
	try {
		if (action.type === "@cart/CLEAR_CART") {
			state = {
				products: [],
			};
			saveCartStateInBrowserStorage(state);
			return state;
		} else if (action.data !== undefined) {
			let productCartId = getProductCartId(action.data.productId, state);
			switch (action.type) {
				case "@cart/ADD_PRODUCT":
					let aux = { ...state, products: [...state.products] };
					if (productCartId === -1) aux.products.push(action.data);
					else {
						aux.products[productCartId] = action.data;
						aux.products[productCartId].quantity = state.products[productCartId].quantity + 1;
					}
					saveCartStateInBrowserStorage(aux);
					return { ...state, products: [...aux.products] };

				case "@cart/REMOVE_PRODUCT":
					state.products.splice(productCartId, 1);
					saveCartStateInBrowserStorage(state);
					return { ...state, products: [...state.products] };

				case "@cart/DECREASE_PRODUCT_QUANTITY":
					state.products[productCartId].quantity = state.products[productCartId].quantity - 1;
					if (state.products[productCartId].quantity === 0) {
						state.products.splice(productCartId, 1);
					}
					saveCartStateInBrowserStorage(state);
					return { ...state, products: [...state.products] };

				case "@cart/INCREASE_PRODUCT_QUANTITY":
					state.products[productCartId].quantity = state.products[productCartId].quantity + 1;
					saveCartStateInBrowserStorage(state);
					return { ...state, products: [...state.products] };

				default:
					return state;
			}
		}
	} catch (err) {}
	return state;
};

export default CartReducer;
