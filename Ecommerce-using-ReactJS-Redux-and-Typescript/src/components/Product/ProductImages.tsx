import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { ReactComponent as IconBack } from "../../media/icons/back-7.svg";
import { ReactComponent as IconNext } from "../../media/icons/next-10.svg";

export const SProductImages = styled.div`
	width: 100%;
	max-width: 520px;
	margin: 0 auto;

	padding-bottom: 10px;

	overflow: hidden;

	position: relative;

	@media screen and (min-width: 800px) {
		grid-area: pimgs;
		max-width: 520px;
		margin: 0;
	}

	button#btn_left_carousel_product_images {
		padding: 12px;
		cursor: pointer;

		position: absolute;
		left: 0;
		top: calc(50% - 25px);

		z-index: 2;

		> svg {
			width: 24px;
		}
	}

	button#btn_right_carousel_product_images {
		padding: 12px;
		cursor: pointer;

		position: absolute;
		right: 0;
		top: calc(50% - 25px);

		z-index: 2;

		> svg {
			width: 24px;
		}
	}

	div#carousel_images {
		width: calc(300% - 0px);
		transition: transform 0.2s ease-out;

		display: grid;
		grid-template-columns: 33.33% 33.33% 33.33%;
		column-gap: 0.03%;
		img {
			width: 100%;
			border-radius: 2px;
		}
	}
`;

interface props {
	images: String[];
}

const ProductImages: React.FC<props> = ({ images }) => {
	// Margin of error for browsers that round pixel values based on %. (Like Edge)
	// It ended up in a small error of pixels like: 1019 of 1020 pixels in total
	const marginOfError = 10;

	const carouselParent = useRef<HTMLDivElement>(null);
	const carouselContent = useRef<HTMLDivElement>(null);
	const [currentImagesXScroll, setCurrentImagesXScroll] = useState(0);

	const userCurrentInnerWidth = useRef(window.innerWidth);

	const firstLoad = useRef(true);

	const slideCarouselLeft = (): void => {
		if (carouselParent.current) {
			const newValue = carouselParent.current.clientWidth + currentImagesXScroll;

			setCurrentImagesXScroll(newValue > 0 ? 0 : newValue);
		}
	};

	const slideCarouselRight = (): void => {
		if (carouselParent.current && carouselContent.current) {
			const newValue = currentImagesXScroll - carouselParent.current.clientWidth;

			setCurrentImagesXScroll(
				Math.abs(newValue) >= carouselContent.current.clientWidth - marginOfError ? currentImagesXScroll : newValue,
			);
		}
	};

	const handleWindowResize = () => {
		if (window.innerWidth !== userCurrentInnerWidth.current) {
			userCurrentInnerWidth.current = window.innerWidth;
			setCurrentImagesXScroll(0);
		}
	};

	useEffect(() => {
		if (firstLoad.current) {
			firstLoad.current = false;
			window.onresize = handleWindowResize;
		}

		return () => {
			window.onresize = null;
		};
	}, []);

	return (
		<SProductImages ref={carouselParent}>
			<button id="btn_left_carousel_product_images" type="button" onClick={slideCarouselLeft}>
				<IconBack />
			</button>
			<button id="btn_right_carousel_product_images" type="button" onClick={slideCarouselRight}>
				<IconNext />
			</button>

			<div id="carousel_images" ref={carouselContent} style={{ transform: `translateX(${currentImagesXScroll}px)` }}>
				{images.map((image, i) => (
					<img key={i} src={require("../../media/images/" + image).default} alt="" />
				))}
			</div>
		</SProductImages>
	);
};

export default ProductImages;
