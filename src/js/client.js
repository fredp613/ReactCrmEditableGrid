import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory} from "react-router";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import configureStore from "./stores/store";
import { Provider } from 'react-redux';
import TableDataStore from "./stores/TableDataStore"
import TableRowDataStore from "./stores/TableRowDataStore"
// import Archives from "./pages/Archives";
// import Settings from "./pages/Settings";

let initialState = {	
	
	tableData: [],
	lookupData: [],
	twoOptionsData: [],
	tableDataGroup: [],		
	searchText: "",		
	isSearching: false,		
	isGrouped: false,	
	isEditing: false,	
	dataLoadedFromServer: false,
	dataLoadedFromServerError: false,
	userId: 13,
	sortDirection: "desc",
	sortFieldName: "",
	currentPage: 1,	
	recordsPerPage: 1,

}

let store = configureStore(initialState);

const app = document.getElementById('app');

ReactDOM.render(
	<Provider store={store}>
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Home}></IndexRoute>
			{/*<Route path="archives(/:article)" component={Archives}></Route>
			<Route path="settings" component={Settings}></Route>*/}
		</Route>
	</Router>
	</Provider>
,app);