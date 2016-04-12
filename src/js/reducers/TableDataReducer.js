import _ from "lodash"
import {
	TOGGLE_EDITING_MODE,
	TOGGLE_QUICK_SORT,
	UPDATE_DIRTY_RECORDS,
	FETCH_TABLE_DATA_ERROR,
	RECEIVE_TABLE_DATA,
	FETCH_CACHE_TABLE_DATA,
	APPEND_DIRTY_RECORDS,
	CANCEL_DIRTY_RECORDS,
	GENERATE_USER_ID,

} from "../actions/TableDataActions"
import TableDataStore from "../stores/TableDataStore"

				//.sort((a, b) => b.sortedValue - a.sortedValue)				

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

					sortDirection: newSortDirection,
					tableDataGroup: _.toPairs(_.groupBy(state.tableData, "sortedValue")).map((td, index)=> {
									td.id = index;
									return Object.assign({}, td, {...state});
					}),
					isGrouped: true,		
				}, ...state);

			}
									
		case UPDATE_DIRTY_RECORDS:
			return Object.assign({}, state, {
				dirtyRecords: [],
				isEditing: false,
			}, ...state)
		case CANCEL_DIRTY_RECORDS:
			return Object.assign({}, state, {	
				...state.tableData,						
				dirtyRecords: [],
				isEditing: false,
				tableDataGroup: [],
			}, ...state);	
					
		case FETCH_TABLE_DATA_ERROR:
			return state;
		case FETCH_CACHE_TABLE_DATA:
			console.log("hi-------------------------------")
			return Object.assign({}, state, {				
						tableData: action.payload.tableData,					
					}, ...state);			
		case RECEIVE_TABLE_DATA: 
			return state;
		case APPEND_DIRTY_RECORDS:
				
			 return Object.assign({}, state, {
			        dirtyRecords: [{
			          	parentId: action.payload.parentId,
						fieldId: action.payload.fieldId,
						fieldName: action.payload.fieldName,
						value: action.payload.value,
			        }, ...state.dirtyRecords]
			      })	
		case GENERATE_USER_ID:
			return Object.assign({}, state, {
				userId: action.id,
			}, ...state.userId)				
		default:
			return state;
	}
}