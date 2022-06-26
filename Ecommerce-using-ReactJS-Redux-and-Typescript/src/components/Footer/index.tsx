import React from "react";

import { SFooter } from "./Footer.styles";

const Footer = () => {
	return (
		<SFooter>
			<span>© Julia Clothing</span>
			<span id="author">
				Made with ❤ by{" "}
				<a
					href="https://www.linkedin.com/in/thiago-buarque/"
					target="_blank"
					rel="noreferrer"
				>
					Thiago Buarque
				</a>
			</span>
		</SFooter>
	);
};

export default Footer;
