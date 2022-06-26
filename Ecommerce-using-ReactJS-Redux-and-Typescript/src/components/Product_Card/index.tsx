import React from "react";
import { Link } from "react-router-dom";

import { SProductCard, SCardImage, SCardDetailsContainer } from "./product_card.styles";

import { IProductCard } from "../../data";
import { convertToReal } from "../../utils";

const ProductCard: React.FC<IProductCard> = ({ id, name, old_price, new_price, image }) => {
	return (
		<SProductCard>
			<Link to={`/p/${name.toLowerCase().replaceAll(" ", "_")}`}>
				<SCardImage
					className="product_card__image"
					style={{
						backgroundImage: `url('${require("../../media/images/" + image).default}')`,
					}}
				></SCardImage>
			</Link>
			<SCardDetailsContainer className="product_card__details_container">
				<Link to={`/p/${name.toLowerCase().replaceAll(" ", "_")}`}>
					<p>{name}</p>
				</Link>
				<div>
					{old_price ? <span className="product_card__old_price">{convertToReal.format(old_price)}</span> : ``}
					<span className="product_card__new_price">{convertToReal.format(new_price)}</span>
				</div>
			</SCardDetailsContainer>
		</SProductCard>
	);
};

export default ProductCard;
