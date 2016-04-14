import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers/TableDataReducer'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

//add middleware
let finalCreateStore = compose(
	applyMiddleware(thunk, logger())
)(createStore);

// let initialState = {	
	
// 	tableData: [],
// 	lookupData: [],
// 	twoOptionsData: [],
// 	tableDataGroup: [],		
// 	searchText: "",		
// 	isSearching: false,		
// 	isGrouped: false,	
// 	isEditing: false,	
// 	dataLoadedFromServer: false,
// 	dataLoadedFromServerError: false,
// 	userId: 13,
// 	sortDirection: "desc",
// 	sortFieldName: "",
// 	currentPage: 1,	
// 	numberOfPages: 0,
// }

export default function configureStore(initialState) {
	return finalCreateStore(reducer, initialState);	
}
