import _ from "lodash"
import {
	TOGGLE_EDITING_MODE,
	TOGGLE_QUICK_SORT,
	UPDATE_DIRTY_RECORDS,
	FETCH_TABLE_DATA,
	FETCH_TABLE_DATA_ERROR,
	RECEIVE_TABLE_DATA,	
	APPEND_DIRTY_RECORDS,
	CANCEL_DIRTY_RECORDS,
	GENERATE_USER_ID,
	GROUP_TABLE_DATA,
	SELECT_PAGE_NUMBER,
	MOVE_PAGE,
	SET_RECORDS_PER_PAGE,

} from "../actions/TableDataActions"
import TableDataStore from "../stores/TableDataStore"
			

export default function tableDataReducer(state, action) {	
	switch (action.type) {	
		case TOGGLE_EDITING_MODE:
			return Object.assign({}, state, {
				isEditing: action.payload.isEditing
			}, ...state.isEditing)

		case TOGGLE_QUICK_SORT:
			const newSortFieldName = action.payload.sortFieldName;
			const newSortDirection = action.payload.sortDirection;	
			const isGrouped = action.payload.isGrouped;	

			const tableDataForGroup = state.tableData.map((td)=>{
				td.sortDirection = newSortDirection
				td.sortFieldName = newSortFieldName

				const newSortedValue = td.values.filter((val)=>{																				
					return val.crmFieldName === newSortFieldName
				})

				td.sortedValue = newSortedValue[0].value
				return td;
			})

			
			if (!isGrouped) {

				return Object.assign({}, state, {				
					tableData: state.tableData.map((td)=>{						
							const newSortedValue = td.values.filter((val)=>{																						
								return val.crmFieldName === newSortFieldName
							})
							return Object.assign({}, td, { sortDirection: newSortDirection, sortFieldName: newSortFieldName, sortedValue: newSortedValue[0].value}, ...td)
						}),
					sortDirection: newSortDirection,	
					sortFieldName: newSortFieldName,
					isGrouped: false,	
					tableDataGroup: [],			
				}, ...state);
			} else {
				return Object.assign({}, state, {				
					tableData: state.tableData.map((td)=>{						
							const newSortedValue = td.values.filter((val)=>{																						
								return val.crmFieldName === newSortFieldName
							})
							return Object.assign({}, td, { sortDirection: newSortDirection, sortFieldName: newSortFieldName, sortedValue: newSortedValue[0].value}, ...td)
						}),
					tableDataGroup: _.toPairs(_.groupBy(state.tableData, "sortedValue")).map((td, index)=> {
									td.id = index;
									return Object.assign({}, td, {...state});
					}),
					sortDirection: newSortDirection,	
					sortFieldName: newSortFieldName,
					isGrouped: true,		
				}, ...state);

			}
		case GROUP_TABLE_DATA:
			return Object.assign({}, state, {									
					tableDataGroup: _.toPairs(_.groupBy(state.tableData, "sortedValue")).map((td, index)=> {
									td.id = index;
									return Object.assign({}, td, {...state});
					}),						
				});
									
		case UPDATE_DIRTY_RECORDS:
			return Object.assign({}, state, {
			 	
		        tableData: state.tableData.map((data) => {	
		        	const newvals = data.values.map((value)=> {		        		
		        		if (value.isDirty) {		        					        					        			
		        			return Object.assign({}, value, {value: value.dirtyValue, isDirty: false, dirtyValue: ""})		        			
		        		} else {
		        			return value;
			             }
		        	})		        	
		        	return Object.assign({}, data, {values: newvals });		        	
		        })
		      })
		case CANCEL_DIRTY_RECORDS:
			return Object.assign({}, state, {			 	
		        tableData: state.tableData.map((data) => {	
		        	const newvals = data.values.map((value)=> {		        				        		
	        			return Object.assign({}, value, {dirtyValue: "", isDirty: false})		        					        		
		        	})
		        	// console.log(values)		        	
		        	return Object.assign({}, data, {values: newvals });		        	
		        })
		      })					
		case FETCH_TABLE_DATA_ERROR:
			return Object.assign({}, state, {				
				dataLoadedFromServer: true,
				dataLoadedFromServerError: true,
			})
			
		case FETCH_TABLE_DATA:	
			const tdG = action.payload.tableData.map((td)=>{
				
				const newSortedValue = td.values.filter((val)=>{																				
					return val.crmFieldName === td.sortFieldName
				})

				td.sortedValue = newSortedValue[0].value
				return td;
			})

			return Object.assign({}, state, {				
						tableData: tdG,
						twoOptionsData: action.payload.twoOptionsData,
						lookupData: action.payload.lookupData,					
						dataLoadedFromServer: true,
						dataLoadedFromServerError: false,
						sortDirection: action.payload.tableData[0].sortDirection,	
						sortFieldName: action.payload.tableData[0].sortFieldName,
					});			
		case RECEIVE_TABLE_DATA: 
			return state;
		case APPEND_DIRTY_RECORDS:
			 return Object.assign({}, state, {
			 	
		        tableData: state.tableData.map((data) => {	
		        	const newvals = data.values.map((value)=> {		        		
		        		if ((value.crmRecordId === action.payload.crmRecordId) && (value.crmFieldName === action.payload.crmFieldName)) {		        					        					        			
		        			return Object.assign({}, value, {dirtyValue: action.payload.dirtyValue, isDirty: true})		        			
		        		} else {
		        			return value;
			             }
		        	})
		        	// console.log(values)		        	
		        	return Object.assign({}, data, {values: newvals });		        	
		        })
		      })
		case GENERATE_USER_ID:
			return Object.assign({}, state, {
				userId: action.id,
			}, ...state.userId)	

		case SELECT_PAGE_NUMBER:
			return Object.assign({}, state, {
				currentPage: parseInt(action.payload.pageNumber),
			})
		case MOVE_PAGE:	
			const currentPage = action.payload.direction ? (state.currentPage + 1) : (state.currentPage - 1)
			return Object.assign({}, state, {
				currentPage: parseInt(currentPage),
			})	

		case SET_RECORDS_PER_PAGE:
			return Object.assign({}, state, {
				currentPage: 1,
				recordsPerPage: parseInt(action.payload.recordsPerPage),				
			})
			
		default:
			return state;
	}
}