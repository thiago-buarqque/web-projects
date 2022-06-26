import React, { useEffect, useRef, useState, useCallback } from "react";

interface props {
	parent: HTMLElement;
	contentContainer: HTMLElement;
}

const ScrollBar: React.FC<props> = ({ parent, contentContainer }) => {
	const barContainer = useRef<HTMLDivElement>(null);
	const bar = useRef<HTMLDivElement>(null);

	const [firstLoad, setFirstLoad] = useState(true);

	const maxMarginTop = useRef(0);
	const barTranslateTop = useRef(0);

	const handleContentContainerScroll = useCallback((): void => {
		const netBarPosition =
			(contentContainer.scrollTop * maxMarginTop.current) /
			(contentContainer.scrollHeight - contentContainer.getBoundingClientRect().height);

		if (bar.current) bar.current.style.transform = `translateY(${netBarPosition}px)`;
	}, [contentContainer, maxMarginTop, bar]);

	const handleMouseDown = useCallback(
		(e: { clientY: number }): void => {
			if (!bar.current || window.innerWidth < 1024) return;
			if (!barContainer.current) return;

			const barContainerPadding = +window.getComputedStyle(barContainer.current).paddingTop.split("px")[0];

			const barContainerTopPos = barContainer.current.getBoundingClientRect().top;

			let posY = e.clientY - barContainerTopPos - barContainerPadding;

			const handleBarMovement = (e: { clientY: number }): void => {
				if (!bar.current) return;

				let currentY = e.clientY - barContainerTopPos - barContainerPadding;

				let newPosY = currentY - posY;
				if (Math.abs(newPosY) < 2) return;
				posY = currentY;

				newPosY += barTranslateTop.current;
				if (newPosY < 0) newPosY = 0;
				else if (newPosY > maxMarginTop.current - barContainerPadding) newPosY = maxMarginTop.current;

				barTranslateTop.current = newPosY;
				bar.current.style.transform = `translateY(${barTranslateTop.current}px)`;
				contentContainer.scrollTop =
					((contentContainer.scrollHeight - contentContainer.getBoundingClientRect().height) *
						barTranslateTop.current) /
					maxMarginTop.current;
			};

			const removeBarEvents = (): void => {
				if (!bar.current) return;
				window.onmousemove = null;
				window.onmouseup = null;
				contentContainer.onscroll = handleContentContainerScroll;
			};

			window.onmousemove = handleBarMovement;
			window.onmouseup = removeBarEvents;
			contentContainer.onscroll = null;
		},
		[contentContainer, handleContentContainerScroll],
	);

	if (bar.current && barContainer.current) {
		bar.current.style.height = `${100 / (contentContainer.scrollHeight / parent.getBoundingClientRect().height)}%`;

		const barContainerPadding = +window.getComputedStyle(barContainer.current).paddingTop.split("px")[0] * 2;

		maxMarginTop.current =
			parent.getBoundingClientRect().height - bar.current.getBoundingClientRect().height - barContainerPadding;
	}
	useEffect(() => {
		if (firstLoad) {
			if (window.innerWidth >= 1024) {
				contentContainer.onscroll = handleContentContainerScroll;
			}
			setFirstLoad(false);
		}
	}, [firstLoad, setFirstLoad, contentContainer, handleContentContainerScroll]);

	return (
		<div ref={barContainer} className="scroll_bar_container">
			<div ref={bar} className="scroll_bar" onMouseDown={handleMouseDown}></div>
		</div>
	);
};

export default ScrollBar;
