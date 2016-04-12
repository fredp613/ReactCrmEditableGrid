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
	headers: TableDataStore.getHeaders(),
	tableData: TableDataStore.getAll(),	
	tableDataGroup: [],
	lookupData: TableDataStore.lookupData,
	twoOptionsData: TableDataStore.twoOptionsData,
	searchText: "",	
	isDirty: TableRowDataStore.isDirty,
	dirtyRecords: [], 
	isSearching: false,		
	isGrouped: false,	
	isEditing: false,
	userId: 13,
	
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