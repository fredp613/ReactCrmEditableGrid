import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers/TableDataReducer'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

//add middleware
let finalCreateStore = compose(
	applyMiddleware(thunk, logger())
)(createStore);

export default function configureStore(
	initialState = {
		tableData: TableDataStore.getAll(),	
		tableDataGroup: [],
		lookupData: TableDataStore.lookupData,
		twoOptionsData: TableDataStore.twoOptionsData,
		searchText: "",		
		isSearching: false,		
		isGrouped: false,	
		isEditing: false,
		userId: 13,
	}) {
	return finalCreateStore(reducer, initialState);	
}
