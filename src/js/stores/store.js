import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers/TableDataReducer'
import logger from 'redux-logger';

//add middleware
let finalCreateStore = compose(
	applyMiddleware(logger())
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
	}) {
	return finalCreateStore(reducer, initialState);	
}
