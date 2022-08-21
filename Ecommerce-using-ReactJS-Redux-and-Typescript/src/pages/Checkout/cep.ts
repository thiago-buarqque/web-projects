export type BrazilianAddress = {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
	ibge: string;
	gia: string;
	ddd: string;
	siafi: string;
};

export const validateCEP = (cep: string): boolean => (cep.match(/^\d+$/) !== null ? true : false);

const getUserAddressByCEP = async (cep: string): Promise<BrazilianAddress> => {
	let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

	// const { data, errors } = await response.json();
	if (response.ok) {
		let data = await response.json();
		return Object.assign(data);
		// else return Promise.reject(new Error(`An error has ocurred on fetching address`));
	} else {
		const error = new Error("unknown");

		return Promise.reject(error);
	}
};

export default getUserAddressByCEP;
