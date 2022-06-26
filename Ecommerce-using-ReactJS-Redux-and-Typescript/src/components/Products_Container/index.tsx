import React, { useRef, useState } from "react";

import ProductCard from "../Product_Card";

import { SProductsContainer } from "./Product_Container.styles";

import { RouteComponentProps } from "react-router";
import { fetchData, IProductCard } from "../../data";
import LoadingContainer from "../LoadingContainer";

interface props extends RouteComponentProps<any> {}

const ProductsContainer: React.FC<props> = ({ history, match }) => {
	const [products, setProducts] = useState<IProductCard[]>([]);
	const [isFetchingData, setIsFetchingData] = useState(true);

	// This is a bad way to know when fetch data. But I don't have a real API, so I'll improvise using this ref to know
	// when it's a new page and needs "new data".

	// Esta é uma maneira horrível de saber quando requisitar os dados pela API. Eu não tenho uma API de verdade, então
	// essa variável vai ajudar a saber quando carregar "novos resultados" com base no link.
	const previousLink = useRef("");

	if (history.location.pathname !== previousLink.current) {
		previousLink.current = history.location.pathname;
		setIsFetchingData(true);
		setTimeout(() => {
			let sectionData = fetchData();
			setProducts(sectionData.products);

			setIsFetchingData(false);
		}, 2000);
	}

	let section_title = "Novidades!!!";

	if (match.params.searchValue) section_title = `Resultados para "${match.params.searchValue}"`;
	else if (match.params.productName) section_title = `Outras peças incríveis`;

	return (
		<SProductsContainer className="container" style={{ height: isFetchingData ? "100%" : "" }}>
			{isFetchingData ? (
				<LoadingContainer />
			) : (
				<>
					<h4 className="products_section__title">{section_title}</h4>
					<div className="products_section__content">
						{products.map((product, i) => {
							return (
								<ProductCard
									key={i}
									id={product.id}
									name={product.name}
									old_price={product.old_price}
									new_price={product.new_price}
									image={product.image}
								/>
							);
						})}
					</div>
				</>
			)}
		</SProductsContainer>
	);
};

export default ProductsContainer;
