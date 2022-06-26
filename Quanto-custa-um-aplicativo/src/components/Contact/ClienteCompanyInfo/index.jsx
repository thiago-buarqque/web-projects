import React, { useRef, useState } from "react";

import { useFormik } from "formik";

import "./clientCompanyInfo.styles.css";

import PortugalFlag from "../../../images/portugal-flag.png";

const COMPANY_TYPES = [
	{
		label: "Eu sou um particular",
		image: "https://widgets.yeeply.com/1618934712/img/individual.4eaa890b.svg",
	},
	{
		label: "Startup",
		image: "https://widgets.yeeply.com/1618934712/img/startup.39f5ac18.svg",
	},
	{
		label: "PME",
		image: "https://widgets.yeeply.com/1618934712/img/sme.1063f4e5.svg",
	},
	{
		label: "Agência",
		image: "https://widgets.yeeply.com/1618934712/img/agency.04e80c02.svg",
	},
	{
		label: "Grande empresa",
		image: "https://widgets.yeeply.com/1618934712/img/large_enterprise.3f812b28.svg",
	},
];

const JOB_POSITIONS = ["CTO / CINO / Gestor De IT", "CMO / Gestor de Marketing", "Gestor de Departamento", "Outro"];

const ClientCompanyInfo = ({ nextQuestion }) => {
	const jobPositionContainer = useRef(null);
	const currentJobPosition = useRef(null);
	const checkboxTermAndConditions = useRef(null);

	const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState(false);

	const toggleDropdownJobPositions = () => {
		jobPositionContainer.current.classList.toggle("opened_dropdown_current_option");
	};

	const selectJobPosition = (e) => {
		currentJobPosition.current.value = e.target.getAttribute("pos-data");
		toggleDropdownJobPositions();
	};

	const selectCompanyType = (e) => {
		let oldSelection = document.querySelector(".active_company_type");
		if (oldSelection) oldSelection.classList.remove("active_company_type");
		e.target.classList.add("active_company_type");
	};

	const acceptTermAndConditions = (e) => {
		checkboxTermAndConditions.current.checked = !checkboxTermAndConditions.current.checked;
		e.target.classList.toggle("__checkbox_checked");
		setTermsAndConditionsAccepted(checkboxTermAndConditions.current.checked);
	};

	const validate = (values) => {
		const errors = {};

		if (!values.fullName)
			errors.fullName = "Diga-nos o seu nome e aplidos para que possamos utilizá-lo quando comunicamos consigo.";

		if (!values.email)
			errors.email = "Precisamos que nos indique um e-mail de contacto para podermos entrar em contacto.";

		if (!values.phoneNumber)
			errors.phoneNumber =
				"Dê-nos um número de telefone para os nossos consultores possam contactar consigo e esclarecer as dúvidas que possam surgir durante o processo.";

		if (!termsAndConditionsAccepted)
			errors.termsAndConditions =
				"Necessita de aceitar as nossas condições de uso e politica de privacidade para podermos continuar.";

		return errors;
	};

	const formik = useFormik({
		initialValues: {
			fullName: "",
			email: "",
			phoneNumber: "",
			companyName: "",
			jobPosition: "",
			termsAndConditionsAccepted: false,
		},
		validate,
		onSubmit: nextQuestion,
	});

	return (
		<div id="client_company_info_container" className="contact_screen">
			{window.innerWidth >= 1024 ? (
				<img src={require("../../../images/form/window_woman.svg").default} id="_img_window_woman" alt="" />
			) : (
				``
			)}
			{window.innerWidth >= 1024 ? (
				<img src={require("../../../images/form/window_man.svg").default} id="_img_window_man" alt="" />
			) : (
				``
			)}
			<div id="scroll_container">
				<div className="screen_content">
					<h1 className="form_screen_title">Para finalizar, gostavamos de o conhecer melhor.</h1>
					<div id="__company_info_body">
						<form onSubmit={formik.handleSubmit}>
							<div id="form_fields">
								<div className="_form_item">
									<span className="_main_text">Nome e Apelidos*</span>
									<input
										type="text"
										className={`form_field${formik.touched.fullName && formik.errors.fullName ? " field_error" : ``}`}
										name="fullName"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.fullName}
									/>
									{formik.touched.fullName && formik.errors.fullName ? (
										<span className="error">{formik.errors.fullName}</span>
									) : null}
								</div>
								<div className="_form_item">
									<span className="_main_text">Email*</span>
									<input
										type="text"
										className={`form_field${formik.touched.email && formik.errors.email ? " field_error" : ``}`}
										name="email"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.email}
									/>
									{formik.touched.email && formik.errors.email ? (
										<span className="error">{formik.errors.email}</span>
									) : null}
								</div>
								<div className="_form_item" id="field__phone_number">
									<span className="_main_text">Telefone*</span>
									<div id="phone_number_content">
										<div id="countries_flags">
											<img src={PortugalFlag} alt="PT" />
											<span>▼</span>
										</div>
										<input
											type="text"
											className={`form_field${
												formik.touched.phoneNumber && formik.errors.phoneNumber ? " field_error" : ``
											}`}
											name="phoneNumber"
											placeholder="Enter a phone number"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.phoneNumber}
										/>
									</div>
									{formik.touched.phoneNumber && formik.errors.phoneNumber ? (
										<span className="error">{formik.errors.phoneNumber}</span>
									) : null}
								</div>
								<div className="_form_item">
									<span className="_main_text">Nome da empresa</span>
									<input
										type="text"
										className="form_field"
										name="companyName"
										onChange={formik.onChange}
										onBlur={formik.onBlur}
									/>
								</div>
								<div className="_form_item" id="select_job_position">
									<span className="_main_text">Posição</span>
									<div ref={jobPositionContainer} className="select">
										<div className="_current_option" onClick={toggleDropdownJobPositions}>
											<div id="option_container">
												<input
													ref={currentJobPosition}
													type="text"
													className="form_field"
													name="currentOption"
													id=""
													placeholder="Escolha uma opção"
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.jobPosition}
												/>
											</div>
											<span id="_dropdown_symbol">▼</span>
										</div>
										<div className="_options">
											{JOB_POSITIONS.map((position, i) => (
												<div key={i} className="_option" pos-data={position} onClick={selectJobPosition}>
													{position}
												</div>
											))}
										</div>
									</div>
									<span id="required_field" className="_main_text">
										* Campos obrigatórios
									</span>
								</div>
							</div>

							<div id="company_type_container">
								<h3 id="company_type_title" className="_main_text">
									Tipo de empresa
								</h3>
								<div id="__options">
									{COMPANY_TYPES.map((company_type, i) => (
										<div key={i} className="company_type" onClick={selectCompanyType}>
											<button type="button" className="btn__select_company_type">
												<div
													style={{
														backgroundImage: `url('${company_type.image}')`,
													}}
												/>
											</button>
											<span>{company_type.label}</span>
										</div>
									))}
								</div>
							</div>

							<div id="form_footer">
								<div id="_term_and_conditions" onClick={() => console.log("oi")}>
									<div id="_container_terms_and_conditions_message">
										<div id="checkbox_container" onClick={acceptTermAndConditions}>
											<input ref={checkboxTermAndConditions} type="checkbox" name="checkboxTermsAndConditions" />
										</div>
										<span>
											Li e aceito os <a href="https://pt.yeeply.com/termos-e-condicoes/">Termos e Condições</a> e a{" "}
											<a href="https://pt.yeeply.com/politica-privacidade/">Politica de Privacidade</a> de Yeeply.
										</span>
									</div>
									{!termsAndConditionsAccepted && formik.errors.termsAndConditions ? (
										<span className="error">{formik.errors.termsAndConditions}</span>
									) : (
										``
									)}
								</div>
								<button type="submit" id="btn_submit_form" className="contact_button">
									Finalizar
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClientCompanyInfo;
