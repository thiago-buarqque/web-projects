import React, { useRef, useState, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";

import {
	SProductDetails,
	SProductPrice,
	SProductSizes,
	SProductColors,
	SDesktopButtonsContainer,
	SBtnAddToCart,
	SBtnBuy,
	SCalculateShipping,
} from "./ProductDetails.styles";
import { ReactComponent as IconAddToCart } from "../../media/icons/004-shopping cart.svg";

import { IProduct } from "../../data";
import { convertToReal } from "../../utils";

interface props extends RouteComponentProps<any> {
	data: IProduct;
	addToCart: () => void;
	setCurrentColor: (color: string) => void;
	setCurrentSize: (size: string) => void;
}
const ProductDetails: React.FC<props> = ({ history, data, addToCart, setCurrentColor, setCurrentSize }) => {
	const desktopButton = useRef<HTMLDivElement>(null);

	const [firstRender, setFirstRender] = useState(true);
	const [showDesktopButtons, setShowDesktopButtons] = useState(window.innerWidth <= 520 ? false : true);

	const selectSize = (e: React.MouseEvent<HTMLSpanElement>): void => {
		const selectedSize = document.getElementsByClassName("size_focus")[0];

		selectedSize?.classList.remove("size_focus");
		e.currentTarget.classList.add("size_focus");
		setCurrentSize(e.currentTarget.getAttribute("size-name") || "");
	};

	const selectColor = (e: React.MouseEvent<HTMLSpanElement>): void => {
		const selectedColor = document.getElementsByClassName("color_focus")[0];

		selectedColor?.classList.remove("color_focus");
		e.currentTarget.classList.add("color_focus");
		setCurrentColor(e.currentTarget.getAttribute("color-name") || "");
	};

	const handleResize = useCallback((): void => {
		console.log("resized details");
		if (window.innerWidth <= 520) {
			setShowDesktopButtons(false);
		} else {
			setShowDesktopButtons(true);
		}
	}, []);

	const handleCalculateShipping = (e: any): void => {
		e.preventDefault();
	};

	const buyProduct = () => {
		addToCart();
		history.push("/checkout/address");
	};

	useState(() => {
		if (firstRender) {
			setFirstRender(false);
			window.addEventListener("resize", handleResize);
		}

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

	return (
		<SProductDetails>
			<SProductPrice id="product_price_container">
				{data.old_price ? <span id="product_old_price">{convertToReal.format(data.old_price)}</span> : ``}
				<span id="product_new_price">{convertToReal.format(data.new_price)}</span>
			</SProductPrice>
			<SProductSizes id="product_sizes_container">
				<span className="product_section_label">Tamanhos disponíveis</span>
				<div>
					{data.sizes?.map((size, i) => (
						<span
							key={i}
							className={`product_size${i === 0 ? " size_focus" : ""}`}
							onClick={selectSize}
							size-name={size}
						>
							{size}
						</span>
					))}
				</div>
			</SProductSizes>
			<SProductColors id="product_colors_container">
				<span className="product_section_label">Cores disponíveis</span>
				<div>
					{data.colors?.map((color, i) => (
						<span
							key={i}
							className={`product_color${i === 0 ? " color_focus" : ""}`}
							style={{ backgroundColor: "" + color.hex }}
							onClick={selectColor}
							color-name={color.name}
						></span>
					))}
				</div>
			</SProductColors>
			{showDesktopButtons ? (
				<SDesktopButtonsContainer ref={desktopButton} id="product_desktop_buttons">
					<SBtnAddToCart type="button" id="btn_add_to_cart" onClick={addToCart}>
						<IconAddToCart />
						<span>Adicionar ao carrinho</span>
					</SBtnAddToCart>
					<SBtnBuy type="button" id="btn_buy" onClick={buyProduct}>
						Comprar
					</SBtnBuy>
				</SDesktopButtonsContainer>
			) : (
				``
			)}
			<SCalculateShipping id="calculate_shipping_container">
				<span className="product_section_label">Calcule o frete</span>
				<form action="POST" onSubmit={handleCalculateShipping}>
					<input type="text" placeholder="Digite seu CEP" />
					<button type="submit">Calcular</button>
				</form>
			</SCalculateShipping>
		</SProductDetails>
	);
};

export default ProductDetails;
