import React from "react";
import { SHeader, SNavCartContainer, SNavContent } from "./Header.styles";

import { ReactComponent as Cart } from "../../media/icons/044-shopping cart.svg";
import logo from "../../media/clothing_store_logo.png";
import { useSelector } from "react-redux";
import { CartProductsState } from "../../redux/cartReducer";

interface props {}
const Header: React.FC<props> = () => {
	const cartProducts = useSelector<CartProductsState, CartProductsState["products"]>(
		(state: CartProductsState) => state.products,
	);

	const openCart = (): void => {
		const cartContainer = document.getElementById("cart_container");
		cartContainer?.classList.remove("hide_cart");
		document.body.style.overflowY = "hidden";
	};

	return (
		<SHeader>
			<SNavContent id="nav_content">
				<a href="/">
					<img src={logo} alt="julia clothing logo" id="nav_logo" />
				</a>

				<SNavCartContainer id="nav__cart_container" onClick={openCart}>
					<Cart className="icon" />
					<div>{cartProducts.length}</div>
				</SNavCartContainer>
			</SNavContent>
		</SHeader>
	);
};

export default Header;
