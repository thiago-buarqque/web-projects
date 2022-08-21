import React, { useRef, useEffect, useState } from "react";

import { ReactComponent as MinusIcon } from "../../media/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../media/icons/plus.svg";
import { convertToReal } from "../../utils";
import { SCartItem, SCartItemQuantityForm, SCartItemDetails, SCartItemData } from "./CartItem.styles";

interface props {
	productId: number;
	name: string;
	image: string;
	price: number;
	size: string;
	color: string;
	quantity: number;
	increaseProductQuantity: (productId: number) => void;
	decreaseProductQuantity: (productId: number) => void;
}

const CartItem: React.FC<props> = ({
	productId,
	name,
	image,
	price,
	size,
	color,
	quantity,
	increaseProductQuantity,
	decreaseProductQuantity,
}) => {
	const [firstRender, setFirstRender] = useState(true);
	const refQuantity = useRef<HTMLInputElement>(null);

	const handleIncreaseProductQuantity = (): void => increaseProductQuantity(productId);

	const handleDecreaseProductQuantity = (): void => decreaseProductQuantity(productId);

	if (!firstRender && refQuantity.current) {
		if (quantity !== Number(refQuantity.current.value)) {
			refQuantity.current.value = "" + quantity;
		}
	}

	useEffect(() => {
		if (firstRender) setFirstRender(false);
	}, [firstRender]);

	return (
		<SCartItem>
			<div className="cart_item_image">
				<a href={`/p/${name.toLowerCase().replaceAll(" ", "_")}`}>
					<img src={require(`../../media/images/${image}`).default} alt={"" + name} />
				</a>
			</div>
			<SCartItemData className="cart_item_data">
				<a href={`/p/${name.toLowerCase().replaceAll(" ", "_")}`} className="cart_item_name">
					{name}
				</a>
				<span className="cart_item_price">{convertToReal.format(price)}</span>
				<SCartItemDetails className="cart_item_details">
					<span className="cart_item_details__size">TAMANHO: {size}</span>
					<span className="cart_item_details__color">COR: {color}</span>
				</SCartItemDetails>
				<span className="cart_item_quantity_label">Quantidade</span>
				<SCartItemQuantityForm>
					<button className="btn_decrease_cart_item_quantity" onClick={handleDecreaseProductQuantity}>
						<MinusIcon />
					</button>
					<input ref={refQuantity} type="text" name="quantity" defaultValue={"" + quantity} readOnly />
					<button className="btn_increase_cart_item_quantity" onClick={handleIncreaseProductQuantity}>
						<PlusIcon />
					</button>
				</SCartItemQuantityForm>
			</SCartItemData>
		</SCartItem>
	);
};

export default CartItem;
