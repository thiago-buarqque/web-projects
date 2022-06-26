import React, { Fragment } from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";

import Main from "./components/Main";
import ProductsContainer from "./components/Products_Container";
import Searcher from "./components/Searcher";
import Product from "./components/Product";
import Cart from "./components/Cart";

import Checkout from "./pages/Checkout";

const Routes: React.FC = () => {
	return (
		<Fragment>
			<Route
				path="/"
				render={(props: RouteComponentProps) => (
					<Fragment>
						<Main {...props} />
						<Cart {...props} />
					</Fragment>
				)}
			/>
			<Route path={["/s/:searchValue", "/p/:productName", "/"]} component={Searcher} />
			<Route path={["/p/:productName", "/"]} component={Product} />
			<Switch>
				<Route path="/checkout" component={Checkout} />
				<Route path="/error-404" render={() => <div>Página não encontrada!</div>} />
			</Switch>
			<Route exact path={["/s/:searchValue", "/p/:productName", "/"]} component={ProductsContainer} />
		</Fragment>
	);
};

export default Routes;
