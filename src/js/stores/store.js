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
		tableData: [],		
		rowData: [],
		headers: [],	
		values: [],				
		dirtyRecords: [],
		tableData: [],						
		sampledata: SampleData.tableDataFromTheOutside,		
		lookupData: SampleData.lookupData,
		twoOptionsData: SampleData.twoOptionsData,
		modifiedTableData: [],
		userId: 13,
	}) {
	return finalCreateStore(reducer, initialState);	
}
