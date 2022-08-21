export const convertToReal = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
});

export const setPageTitle = (title: string) => (document.title = title);

export const scrollPageToTop = () => {
	window.scrollTo(0, 0);
};
