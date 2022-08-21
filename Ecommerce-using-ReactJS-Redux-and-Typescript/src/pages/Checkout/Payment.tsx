import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { setPageTitle } from "../../utils";

import { LeftContainer, FormPayment } from "./checkout.styles";

interface props extends RouteComponentProps<any> {
	finishOrder: () => void;
}

const Payment: React.FC<props> = ({ history, finishOrder }) => {
	if (history.location.pathname !== "/checkout/payment") return null;

	setPageTitle("Pagamento - Fechar pedido");

	return (
		<LeftContainer id="payment_container">
			<span className="instruction_message">Agora o pagamento.</span>
			<FormPayment action="POST" id="form_address">
				<div className="form_item" id="form_item_num_card">
					<span className="form_item_name">
						Número do cartão <span className="required_item">*</span>
					</span>
					<input type="number" name="inNumCard" id="input_num_card" />
				</div>

				<div className="form_item" id="form_item_card_expiration">
					<span className="form_item_name">
						Validade <span className="required_item">*</span>
					</span>
					<input type="number" name="inCardExpiration" id="input_card_expiration" />
				</div>

				<div className="form_item" id="form_item_name_in_card">
					<span className="form_item_name">
						Nome no cartão <span className="required_item">*</span>
					</span>
					<input type="number" name="inNameInCard" id="input_name_in_card" />
				</div>

				<div className="form_item" id="form_item_card_pin">
					<span className="form_item_name">
						CVV <span className="required_item">*</span>
					</span>
					<input type="number" name="inCardPIN" id="input_card_pin" />
				</div>
			</FormPayment>

			<div className="form_item" id="form_item_select_payment_method">
				<span className="form_item_name">Parcelas</span>
				<select name="select_payment_method" id="select_payment_method" required>
					<option value="1">1x sem juros</option>
					<option value="2">2x sem juros</option>
					<option value="3">3x sem juros</option>
					<option value="4">4x sem juros</option>
					<option value="5">5x sem juros</option>
					<option value="6">6x sem juros</option>
					<option value="7">7x sem juros</option>
					<option value="8">8x sem juros</option>
					<option value="9">9x sem juros</option>
					<option value="10">10x sem juros</option>
				</select>
			</div>

			<span className="required_items_message">
				<span className="required_item">*</span> Obrigatório
			</span>
			<button className="left_container_next_button" onClick={finishOrder}>
				Confirmar pedido
			</button>
		</LeftContainer>
	);
};

export default Payment;
