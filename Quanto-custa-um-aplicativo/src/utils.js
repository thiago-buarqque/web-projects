export const fadeOutElement = (element, doNotHideElement) => {
	element.classList.remove("fade_in");
	element.classList.add("fade_out");
	setTimeout(() => {
		if (!doNotHideElement) element.classList.add("hide_element");
	}, 200);
};
export const fadeInElement = (element) => {
	element.classList.remove("fade_out");
	setTimeout(() => {
		element.classList.remove("hide_element");
		element.classList.add("fade_in");
	}, 50);
};

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
	maximumSignificantDigits: 6,
});

export const growElementHeight = (element) => {
	let finalSize = 0;
	let children = [...element.children];

	let compStyle;
	let height;
	children.forEach((child) => {
		compStyle = window.getComputedStyle(child);
		height = compStyle.getPropertyValue("height");
		height = height.split("px")[0];
		finalSize += Number(height);
	});
	element.style.height = `${finalSize}px`;
};

export const getElementWidthWithoutPadding = (element) => {
	let computedStyle = window.getComputedStyle(element);

	let elementWidth = element.clientWidth; // width with padding

	elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
	return elementWidth;
};
