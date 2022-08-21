import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as CartIcon } from "../../media/icons/044-shopping cart.svg";
import { ReactComponent as NextIcon } from "../../media/icons/cancel-1.svg";
import ScrollBar from "../ScrollBar";
import CartItem from "./CartItem";

import "./_append_classes.css";
import { SCartContainer, SCart, SCartHeader, SCartBody, SCartFooter } from "./Cart.styles";

import { CartProduct, CartProductsState, DuxCartProductAction } from "../../redux/cartReducer";
import { convertToReal } from "../../utils";

interface props extends RouteComponentProps<any> {}

const Cart: React.FC<props> = () => {
	const cartContainer = useRef<HTMLDivElement>(null);
	const cartBody = useRef<HTMLDivElement>(null);
	const cartBodyContent = useRef<HTMLDivElement>(null);

	const [firstLoadComplete, setFirstLoadComplete] = useState(false);

	const cartProducts = useSelector<CartProductsState, CartProductsState["products"]>(
		(state: CartProductsState) => state.products,
	);

	const dispatchCart = useDispatch();

	const hideCart = (): void => {
		cartContainer.current?.classList.add("hide_cart");
		document.body.style.overflowY = "scroll";
	};

	const handleClickCartContainer = (e: any): void => {
		if (e.target.getAttribute("id") === cartContainer.current?.getAttribute("id")) hideCart();
	};

	const getCartProduct = (productId: number): CartProduct | null => {
		let auxProduct = null;
		cartProducts.forEach((product) => {
			if (product.productId === productId) auxProduct = product;
		});
		return auxProduct;
	};

	const increaseProductQuantity = (productId: number): void => {
		let productToIncrease = getCartProduct(productId);
		if (productToIncrease === null) return;

		let auxAction: DuxCartProductAction = {
			type: "@cart/INCREASE_PRODUCT_QUANTITY",
			data: productToIncrease,
		};
		dispatchCart(auxAction);
	};

	const decreaseProductQuantity = (productId: number): void => {
		let productToIncrease = getCartProduct(productId);
		if (productToIncrease === null) return;

		let auxAction: DuxCartProductAction = {
			type: "@cart/DECREASE_PRODUCT_QUANTITY",
			data: productToIncrease,
		};
		dispatchCart(auxAction);
	};

	const handleClickBtnCheckout = (e: any) => {
		e.preventDefault();
		window.location.href = "/checkout/address";
	};

	useEffect(() => {
		if (!firstLoadComplete) setFirstLoadComplete(true);
	}, [firstLoadComplete, setFirstLoadComplete]);

	let all_products_total = convertToReal.format(
		cartProducts.reduce((sum, curr) => sum + curr.price * curr.quantity, 0),
	);

	return (
		<SCartContainer ref={cartContainer} className="hide_cart" id="cart_container" onClick={handleClickCartContainer}>
			<SCart id="cart">
				<SCartHeader id="cart_header">
					<button type="button" id="btn_close_cart" onClick={hideCart}>
						<NextIcon id="cart__close_icon" />
					</button>

					<CartIcon id="cart__cart_icon" />
					<span>Carrinho</span>
				</SCartHeader>
				<SCartBody ref={cartBody} id="cart_body">
					{firstLoadComplete && cartBody.current && cartBodyContent.current ? (
						<ScrollBar parent={cartBody.current} contentContainer={cartBodyContent.current} />
					) : (
						``
					)}
					{cartProducts.length === 0 ? <h4 id="empty_cart_message">Seu carrinho está vazio</h4> : ``}
					<div ref={cartBodyContent} id="cart_body_content">
						{cartProducts.map((product, i) => (
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
					</div>
				</SCartBody>
				<SCartFooter id="cart_footer">
					<div id="cart_total_price">
						<span>TOTAL: {all_products_total}</span>
					</div>
					<form action="" method="post">
						<button
							type="submit"
							id="btn_close_order"
							onClick={handleClickBtnCheckout}
							disabled={cartProducts.length >= 1 ? false : true}
						>
							FECHAR PEDIDO
						</button>
					</form>
				</SCartFooter>
			</SCart>
		</SCartContainer>
	);
};

export default Cart;
