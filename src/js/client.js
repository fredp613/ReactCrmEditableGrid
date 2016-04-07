import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory} from "react-router";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
// import Archives from "./pages/Archives";
// import Settings from "./pages/Settings";

const app = document.getElementById('app');
ReactDOM.render(
	
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Home}></IndexRoute>
			{/*<Route path="archives(/:article)" component={Archives}></Route>
			<Route path="settings" component={Settings}></Route>*/}
		</Route>
	</Router>
,app);