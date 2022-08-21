import React, { useEffect, useState, useRef } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./_append_classes.css";
import { SProduct, SProductDescription } from "./Product.styles";

import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";

import { fetchProduct, IProduct } from "../../data";
import { DuxCartProductAction } from "../../redux/cartReducer";

import LoadingContainer from "../LoadingContainer";
import { ANIMATION_DURATION } from "../../App";
import { scrollPageToTop, setPageTitle } from "../../utils";

interface ProductProps extends RouteComponentProps<any> {}

const Product: React.FC<ProductProps> = ({ match }) => {
	const descriptionContainer = useRef<HTMLDivElement>(null);
	const mobileBtnAddToCart = useRef<HTMLButtonElement>(null);
	const productContainer = useRef<HTMLDivElement>(null);

	const currentColor = useRef<string>("");
	const currentSize = useRef<string>("");

	const [productData, setProduct] = useState<IProduct | null>(null);
	const [unloadComponent, setUnloadComponent] = useState(false);

	const dispatchAddProductToCart = useDispatch();

	const setCurrentColor = (color: string) => {
		currentColor.current = color;
	};

	const setCurrentSize = (size: string) => {
		currentSize.current = size;
	};

	let productName = match.params.productName;

	const addToCart = (): void => {
		if (!productData) return;

		let aux: DuxCartProductAction = {
			type: "@cart/ADD_PRODUCT",
			data: {
				productId: productData.id,
				name: productData.name,
				price: productData.new_price,
				quantity: 1,
				image: productData.images[0],
				color: currentColor.current,
				size: currentSize.current,
			},
		};
		dispatchAddProductToCart(aux);
	};

	const handleUnloadComponent = () => {
		if (productContainer.current === null) return;
		productContainer.current.classList.add("element_exit_animation");
		setTimeout(() => {
			setUnloadComponent(true);
		}, ANIMATION_DURATION);
	};

	const needToUnloadComponent = () => !productName && !unloadComponent;

	useEffect(() => {
		scrollPageToTop();
	}, [productData]);

	if (needToUnloadComponent()) handleUnloadComponent();
	else if (!productName) {
		if (productData) setProduct(null);
		return null;
	}

	if (productName && unloadComponent) setUnloadComponent(false);

	if (
		!productData ||
		(productName !== undefined && productName.toLowerCase().replaceAll("_", " ") !== productData.name.toLowerCase())
	) {
		if (!productName) return null;
		let cleanedProductName = productName.toLowerCase().replaceAll("_", " ");

		// Fake fetch call
		setTimeout(() => {
			setProduct(fetchProduct(cleanedProductName));
		}, ANIMATION_DURATION);

		currentColor.current = "";
		currentSize.current = "";

		return (
			<SProduct ref={productContainer} style={{ height: "100%" }}>
				<LoadingContainer />
			</SProduct>
		);
	} else if (productData && currentColor.current === "" && currentSize.current === "") {
		setCurrentColor(productData.colors[0].name);
		setCurrentSize(productData.sizes[0]);
	}

	if (productData) setPageTitle(productData.name);

	return (
		<SProduct ref={productContainer}>
			<button ref={mobileBtnAddToCart} onClick={addToCart} id="mobile_btn_add_to_cart" type="button">
				ADICIONAR AO CARRINHO
			</button>
			<h4 id="product_name">{productData.name}</h4>
			<ProductImages images={productData.images} />
			<Route
				path="/"
				component={(props: RouteComponentProps) => (
					<ProductDetails
						data={productData}
						addToCart={addToCart}
						setCurrentColor={setCurrentColor}
						setCurrentSize={setCurrentSize}
						{...props}
					/>
				)}
			/>

			<SProductDescription id="product_description_container">
				<button type="button" onClick={() => descriptionContainer.current?.classList.toggle("show_description")}>
					<span>Ver detalhes do produto</span>
					<span>+</span>
				</button>
				<div ref={descriptionContainer} id="product_description">
					<span className="product_section_label">Decrição</span>
					<p>{productData.description}</p>
				</div>
			</SProductDescription>
		</SProduct>
	);
};

export default Product;
