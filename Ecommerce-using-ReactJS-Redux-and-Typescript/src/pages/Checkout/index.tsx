import React, { useEffect, useState } from "react";
import { RouteComponentProps, Route } from "react-router-dom";

import { ReactComponent as DeliveryIcon } from "../../media/icons/003-delivery.svg";
import { ReactComponent as ChequeIcon } from "../../media/icons/042-cheque.svg";

import {
	CheckoutContainer,
	CheckoutHeader,
	CheckoutHeaderDot,
	OrderDetails,
	OrderProducts,
	ContainerEmptyCarMessage,
} from "./checkout.styles";

import CartItem from "../../components/Cart/CartItem";
import AddressForm from "./AddressForm";
import Payment from "./Payment";
import { useDispatch, useSelector } from "react-redux";
import { CartProduct, CartProductsState, DuxCartProductAction } from "../../redux/cartReducer";
import { convertToReal, scrollPageToTop } from "../../utils";

interface props extends RouteComponentProps<any> {}

const Checkout: React.FC<props> = ({ history }) => {
	const checkoutProducts = useSelector<CartProductsState, CartProductsState["products"]>(
		(state: CartProductsState) => state.products,
	);

	const [isOrderFinished, setOrderFinished] = useState(false);

	const dispatch = useDispatch();

	const getCartProduct = (productId: number): CartProduct | null => {
		let auxProduct = null;
		checkoutProducts.forEach((product) => {
			if (product.productId === productId) auxProduct = product;
		});
		return auxProduct;
	};

	const finishOrder = () => {
		let action: DuxCartProductAction = {
			type: "@cart/CLEAR_CART",
		};
		setOrderFinished(true);
		dispatch(action);
		window.location.href = "/";
	};

	const increaseProductQuantity = (productId: number): void => {
		let productToIncrease = getCartProduct(productId);
		if (productToIncrease === null) return;

		let auxAction: DuxCartProductAction = {
			type: "@cart/INCREASE_PRODUCT_QUANTITY",
			data: productToIncrease,
		};
		dispatch(auxAction);
	};

	const decreaseProductQuantity = (productId: number): void => {
		let productToIncrease = getCartProduct(productId);
		if (productToIncrease === null) return;

		let auxAction: DuxCartProductAction = {
			type: "@cart/DECREASE_PRODUCT_QUANTITY",
			data: productToIncrease,
		};
		dispatch(auxAction);
	};

	if (history.location.pathname !== "/checkout/address" && history.location.pathname !== "/checkout/payment") {
		history.push("/error-404");
	}

	useEffect(() => {
		setTimeout(scrollPageToTop, 100);
	}, []);

	if (checkoutProducts.length === 0 && !isOrderFinished) {
		setTimeout(() => (window.location.href = "/"), 3500);
		return (
			<ContainerEmptyCarMessage>
				<h2>
					Seu carrinho está vazio, adicione alguns itens antes de vir para esta página. Você será redirecionado(a) para
					a página inicial.
				</h2>
			</ContainerEmptyCarMessage>
		);
	}

	let total_order = convertToReal.format(
		checkoutProducts.reduce((sum, product) => sum + product.price * product.quantity, 0),
	);

	return (
		<CheckoutContainer className="container" id="checkout_page_container">
			<CheckoutHeader>
				<span id="checkout__header_line"></span>
				<CheckoutHeaderDot id="checkout__header_dot_address">
					<span>Endereço de entrega</span>
					<div className="checkout__header_dot active_checkout_dot">
						<DeliveryIcon />
					</div>
				</CheckoutHeaderDot>
				<CheckoutHeaderDot id="checkout__header_dot_payment">
					<span>Pagamento</span>
					<div
						className={`checkout__header_dot ${
							history.location.pathname === "/checkout/payment" ? " active_checkout_dot" : ""
						}`}
					>
						<ChequeIcon />
					</div>
				</CheckoutHeaderDot>
			</CheckoutHeader>

			<Route path="/checkout" component={AddressForm} />
			<Route
				path="/checkout"
				component={(props: RouteComponentProps<any>) => <Payment {...props} finishOrder={finishOrder} />}
			/>

			<OrderDetails>
				<div id="order_details_header">
					<span id="checkout__total_label">Total</span>
					<span id="checkout__total_value">{total_order}</span>
				</div>
				<span className="normal_span" id="buying_message">
					Você está comprando:
				</span>
				<OrderProducts>
					{checkoutProducts.map((product, i) => (
						<CartItem
							key={i}
							productId={product.productId}
							name={product.name}
							image={product.image}
							price={product.price}
							size={product.size}
							color={product.color}
							quantity={product.quantity}
							increaseProductQuantity={increaseProductQuantity}
							decreaseProductQuantity={decreaseProductQuantity}
						/>
					))}
				</OrderProducts>
			</OrderDetails>
		</CheckoutContainer>
	);
};

export default Checkout;
