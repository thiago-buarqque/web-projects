interface IColor {
	hex: string;
	name: string;
}
export interface IProduct {
	id: number;
	name: string;
	description: string;
	old_price?: number;
	new_price: number;
	images: string[];
	sizes: string[];
	colors: IColor[];
}

export interface IProductCard {
	id: number;
	name: string;
	old_price?: number;
	new_price: number;
	image: string;
}

export interface ISectionData {
	section_title: string;
	products: IProductCard[];
}

const PRODUCTS: IProduct[] = [
	{
		id: 0,
		name: `Bermuda feminina`,
		description: "Bermuda 100% algodão, perfeita para usar",
		old_price: 49.99,
		new_price: 29.99,
		images: [
			"bermuda-jeans-12146927_foto1_frontal.jpg",
			"bermuda-jeans-12146927_foto2_costas.jpg",
			"bermuda-jeans-12146927_foto3_lateral.jpg",
		],
		sizes: ["P", "M"],
		colors: [
			{
				hex: "#000",
				name: "Preto",
			},
			{
				hex: "#fff",
				name: "Branco",
			},
		],
	},
	{
		id: 1,
		name: `Blusa Moletom Zíper`,
		description: "Blusa 100% algodão, perfeita para usar",
		old_price: 79.9,
		new_price: 71.9,
		images: [
			"956da641e25fef3d645a66ca773b6f04657e99e5.webp",
			"64dd920876f858538ccb51789211b9f960689d3e.webp",
			"9edd2f75ea3017adaf0679b975c09124f7e1aee6.webp",
		],
		sizes: ["P", "M", "G"],
		colors: [
			{
				hex: "#c2c2c2",
				name: "Cinza",
			},
			{
				hex: "#000",
				name: "Preto",
			},
		],
	},
	{
		id: 2,
		name: `Blusa Moletom Be Strong Snoopy - Branco`,
		description: "Blusa 100% algodão, perfeita para usar",
		old_price: 69.9,
		new_price: 59.9,
		images: [
			"0d68d15920c96cf98289db954034fbc466f9cbee.webp",
			"9e7cb4e1316128fdef992364a9b037d24525c9c4.webp",
			"1d17288605f99ddff412a3772b157b415576b656.webp",
		],
		sizes: ["P", "M", "G"],
		colors: [
			{
				hex: "#fff",
				name: "Branco",
			},
		],
	},
	{
		id: 3,
		name: `Roupão Casa Premium Plush Azul Marinho`,
		description: "Roupão 100% algodão, perfeita para usar",
		old_price: 99.9,
		new_price: 79.9,
		images: [
			"119ddef3a7f6df720174d56fabfc211166976d64.webp",
			"826b053563af274d03548fcd1b1d2512ac3d8f98.webp",
			"2c48ef4981758c38b18e7c250594ac681cb19993.webp",
		],
		sizes: ["M", "G", "GG"],
		colors: [
			{
				hex: "#000080",
				name: "Azul marinho",
			},
		],
	},
];

export function fetchProduct(productName: string): IProduct | null {
	let auxProduct = null;
	PRODUCTS.forEach((product) => {
		if (product.name.toLowerCase() === productName) auxProduct = product;
	});

	return auxProduct;
}

export function fetchData(): ISectionData {
	let products: IProductCard[] = [];

	let SECTION_MAX_SIZE = Math.floor(Math.random() * (15 - 10 + 1)) + 10;

	let randomProduct: IProduct;
	while (products.length < SECTION_MAX_SIZE) {
		randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

		products.push({
			id: randomProduct.id,
			name: randomProduct.name,
			old_price: randomProduct.old_price,
			new_price: randomProduct.new_price,
			image: randomProduct.images[0],
		});
	}

	return {
		section_title: "NOVIDADEEESSS!!!",
		products: products,
	};
}
