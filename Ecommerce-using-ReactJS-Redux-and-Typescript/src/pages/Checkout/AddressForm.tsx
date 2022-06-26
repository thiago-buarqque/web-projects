import React, { useState, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import getUserAddressByCEP, { BrazilianAddress, validateCEP } from "./cep";
import { LeftContainer, FormAddress, AddressDetailsContainer } from "./checkout.styles";
import { useFormik } from "formik";
import { setPageTitle } from "../../utils";

interface props extends RouteComponentProps<any> {}

type HouseAddress = {
	houseNumber: string;
	houseNumberComplement: string;
};

type AddressFormErrors = {
	houseNumber?: string | undefined;
};

const AddressForm: React.FC<props> = ({ history }) => {
	const [userAddress, setUserAddress] = useState<BrazilianAddress | null>(null);
	const [cepNotFound, setCepNotFound] = useState(false);
	const inputCEP = useRef<HTMLInputElement>(null);

	const findUserAddress = async (e: any) => {
		e.preventDefault();
		if (!inputCEP.current) return;

		let isValidCEP = validateCEP(inputCEP.current.value);
		try {
			if (isValidCEP) setUserAddress(await getUserAddressByCEP(inputCEP.current.value));
		} catch (error) {
			setCepNotFound(true);
		}
	};

	const validateForm = (values: HouseAddress) => {
		const errors: AddressFormErrors = {};
		if (!values.houseNumber) errors.houseNumber = "Por favor, informe o número da residência";

		return errors;
	};

	const handleSubmit = () => {
		history.push("/checkout/payment");
	};

	const formik = useFormik({
		initialValues: {
			houseNumber: "",
			houseNumberComplement: "",
		},
		validate: validateForm,
		onSubmit: handleSubmit,
	});

	if (history.location.pathname !== "/checkout/address") return null;

	setPageTitle("Endereço - Fechar pedido");

	return (
		<LeftContainer id="address_container">
			<FormAddress action="POST" id="form_address" onSubmit={formik.handleSubmit}>
				<span className="instruction_message">Vamos começar com seu endereço.</span>
				<span className="instruction_message">Digite abaixo o seu CEP e clique em buscar.</span>

				<div className="form_item">
					<span className="form_item_name">
						CEP <span className="required_item">*</span>
					</span>
					<input ref={inputCEP} type="number" name="inCEP" id="input_cep" maxLength={8} />
					<button type="button" id="btn_submit_cep" onClick={findUserAddress}>
						Buscar
					</button>
					{cepNotFound ? <span className="field_error_message">CEP não encontrado</span> : ``}
				</div>
				<AddressDetailsContainer>
					<div
						className={`form_item info_address_item ${!userAddress ? "disabled_form_field" : ""}`}
						id="form_item_address"
					>
						<span className="form_item_name">
							Endereço <span className="required_item">*</span>
						</span>
						<input type="text" id="input_address" readOnly value={userAddress?.logradouro || ""} />
					</div>
					<div
						className={`form_item info_address_item ${!userAddress ? "disabled_form_field" : ""}`}
						id="form_item_state"
					>
						<span className="form_item_name">
							Estado <span className="required_item">*</span>
						</span>
						<input type="text" id="input_state" readOnly value={userAddress?.uf || ""} />
					</div>

					<div
						className={`form_item info_address_item ${!userAddress ? "disabled_form_field" : ""}`}
						id="form_item_city"
					>
						<span className="form_item_name">
							Bairro/Cidade <span className="required_item">*</span>
						</span>
						<input
							type="text"
							id="input_city"
							readOnly
							value={userAddress ? "" + userAddress?.bairro + ", " + userAddress?.localidade : ""}
						/>
					</div>
					<div
						className={`form_item info_address_item ${!userAddress ? "disabled_form_field" : ""}`}
						id="form_item_house_number"
					>
						<span className="form_item_name">
							Número <span className="required_item">*</span>
						</span>
						<input
							type="number"
							name="houseNumber"
							id="input_house_number"
							readOnly={userAddress ? false : true}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.houseNumber}
						/>
						{formik.touched.houseNumber && formik.errors.houseNumber ? (
							<span className="field_error_message">{formik.errors.houseNumber}</span>
						) : (
							``
						)}
					</div>
					<div
						className={`form_item info_address_item ${!userAddress ? "disabled_form_field" : ""}`}
						id="form_item_house_number_complement"
					>
						<span className="form_item_name">Complemento</span>
						<input
							type="text"
							name="houseNumberComplement"
							id="input_house_number_complement"
							readOnly={userAddress ? false : true}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.houseNumberComplement}
						/>
					</div>
				</AddressDetailsContainer>

				<button type="submit" className="left_container_next_button" disabled={userAddress ? false : true}>
					Continuar
				</button>
			</FormAddress>
		</LeftContainer>
	);
};

export default AddressForm;
