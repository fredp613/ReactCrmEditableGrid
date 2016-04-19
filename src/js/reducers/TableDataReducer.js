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
	PAGED_DATA,

} from "../actions/TableDataActions"
import TableDataStore from "../stores/TableDataStore"
			

export default function tableDataReducer(state, action) {	
	switch (action.type) {	
		case TOGGLE_EDITING_MODE:
			return Object.assign({}, state, {
				isEditing: action.payload.isEditing
			}, ...state.isEditing)

		case PAGED_DATA:
			let offset1 =  (state.currentPage - 1) * state.recordsPerPage
	       	let itemsPerPage1 = state.recordsPerPage;              	
	       	//let pagedData = state.tableData.slice(offset, (itemsPerPage + offset));
	       	return Object.assign({}, state, {
	       		tableData : state.tableData.slice(offset1, (itemsPerPage1 + offset1)),
	       	}, ...state)



		case TOGGLE_QUICK_SORT:
			const newSortFieldName = action.payload.sortFieldName;
			const newSortDirection = action.payload.sortDirection;	
			const isGrouped = action.payload.isGrouped;	

			const sortedData = state.originalTableData.sort((a, b) => {
			
				if (newSortDirection === "asc") {
					if (a.sortedValue.toLowerCase() > b.sortedValue.toLowerCase()) {
				    	return 1;
				  	}
				    if (a.sortedValue.toLowerCase() < b.sortedValue.toLowerCase()) {
				    	return -1;
				    }						
				  // a must be equal to b
				  return 0;
				} else {
					if (a.sortedValue.toLowerCase() < b.sortedValue.toLowerCase()) {
				    	return 1;
				  	}
				    if (a.sortedValue.toLowerCase() > b.sortedValue.toLowerCase()) {
				    	return -1;
				    }
				}			
			}); 	

			const offsetx =  (state.currentPage - 1) * state.recordsPerPage
       		const itemsPerPagex = state.recordsPerPage;              	
       		
       		const sortedAndPagedData = sortedData.slice(offsetx, (itemsPerPagex + offsetx))

			if (!isGrouped) {

				return Object.assign({}, state, {				
					tableData: sortedAndPagedData.map((td)=>{						
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
					tableData: sortedAndPagedData.map((td)=>{						
							const newSortedValue = td.values.filter((val)=>{																						
								return val.crmFieldName === newSortFieldName
							})
							return Object.assign({}, td, { sortDirection: newSortDirection, sortFieldName: newSortFieldName, sortedValue: newSortedValue[0].value}, ...td)
						}),
					tableDataGroup: _.toPairs(_.groupBy(sortedAndPagedData, "sortedValue")).map((td, index)=> {
									td.id = index;
									td[1][0].sortDirection = newSortDirection
									td[1][0].sortFieldName = newSortFieldName
									console.log(td[1][0])
									const newSortedValue = td[1][0].values.filter((val)=>{																						
										return val.crmFieldName === newSortFieldName
									})

									td[1][0].sortedValue = newSortedValue[0].value									
									return Object.assign({}, td, {...td});
					}).sort((a, b) => {									
							if (newSortDirection === "asc") {
								if (a[0].toLowerCase() > b[0].toLowerCase()) {
							    	return 1;
							  	}
							    if (a[0].toLowerCase() < b[0].toLowerCase()) {
							    	return -1;
							    }						
							  // a must be equal to b
							  return 0;
							} else {
								if (a[0].toLowerCase() < b[0].toLowerCase()) {
							    	return 1;
							  	}
							    if (a[0].toLowerCase() > b[0].toLowerCase()) {
							    	return -1;
							    }
							}			
						})

					,
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
		        }),
		        originalTableData: state.originalTableData.map((data) => {	
		        	const newvals = data.values.map((value)=> {		        		
		        		if (value.isDirty) {		        					        					        			
		        			return Object.assign({}, value, {value: value.dirtyValue, isDirty: false, dirtyValue: ""})		        			
		        		} else {
		        			return value;
			             }
		        	})		        	
		        	return Object.assign({}, data, {values: newvals });		        	
		        })
		      }, ...state)
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
		        }), 
		        originalTableData: state.originalTableData.map((data) => {	
		        	const newvals = data.values.map((value)=> {		        		
		        		if ((value.crmRecordId === action.payload.crmRecordId) && (value.crmFieldName === action.payload.crmFieldName)) {		        					        					        			
		        			return Object.assign({}, value, {dirtyValue: action.payload.dirtyValue, isDirty: true})		        			
		        		} else {
		        			return value;
			             }
		        	})
		        	// console.log(values)		        	
		        	return Object.assign({}, data, {values: newvals });		        	
		        }),
		      }, ...state)

		case CANCEL_DIRTY_RECORDS:
			return Object.assign({}, state, {			 	
		        tableData: state.tableData.map((data) => {	
		        	const newvals = data.values.map((value)=> {		        				        		
	        			return Object.assign({}, value, {dirtyValue: "", isDirty: false})		        					        		
		        	})		        	
		        	return Object.assign({}, data, {values: newvals });		        	
		        }),
		         originalTableData: state.originalTableData.map((data) => {	
		        	const newvals = data.values.map((value)=> {		        				        		
	        			return Object.assign({}, value, {dirtyValue: "", isDirty: false})		        					        		
		        	})		        	
		        	return Object.assign({}, data, {values: newvals });		        	
		        }),
		      }, ...state)
		      					
		case FETCH_TABLE_DATA_ERROR:
			return Object.assign({}, state, {				
				dataLoadedFromServer: true,
				dataLoadedFromServerError: true,
			})
			
		case FETCH_TABLE_DATA:	

			const remainder = action.payload.tableData.length % state.recordsPerPage;	
			var num = 1;	
		    if (remainder == 0){    
		      num = action.payload.tableData.length / state.recordsPerPage; 
		    } else {    
		      num = (action.payload.tableData.length / state.recordsPerPage) + 1
		    }

			const offset =  (state.currentPage - 1) * state.recordsPerPage
       		const itemsPerPage = state.recordsPerPage;              	
       		
			const tdG = action.payload.tableData.map((td)=>{
				
				const newSortedValue = td.values.filter((val)=>{																				
					return val.crmFieldName === td.sortFieldName
				})

				td.sortedValue = newSortedValue[0].value
				return td;
			})

			const tableSettings = action.payload.tableData[0]
			const numberOfRecords = action.payload.tableData.length;
		
			return Object.assign({}, state, {				
						tableData: tdG.slice(offset, (itemsPerPage + offset)),
						originalTableDataCount: numberOfRecords,
						originalTableData: action.payload.tableData,
						twoOptionsData: action.payload.twoOptionsData,
						lookupData: action.payload.lookupData,					
						dataLoadedFromServer: true,
						dataLoadedFromServerError: false,
						sortDirection: tableSettings.sortDirection,	
						sortFieldName: tableSettings.sortFieldName,
						numberOfPages: num,
					});			
		case RECEIVE_TABLE_DATA: 
			return state;
		
		case GENERATE_USER_ID:
			return Object.assign({}, state, {
				userId: action.id,
			}, ...state.userId)	

		case SELECT_PAGE_NUMBER:


			const offset4 =  (parseInt(action.payload.pageNumber) - 1) * state.recordsPerPage
       		const itemsPerPage4 = state.recordsPerPage;              	
       		
			const tdG3 = state.originalTableData.map((td)=>{
				
				const newSortedValue = td.values.filter((val)=>{																				
					return val.crmFieldName === td.sortFieldName
				})

				td.sortedValue = newSortedValue[0].value
				return td;
			})

			return Object.assign({}, state, {
				tableData: tdG3.slice(offset4, (itemsPerPage4 + offset4)),
				currentPage: parseInt(action.payload.pageNumber),
			})
		case MOVE_PAGE:	

			const currentPage = action.payload.direction ? (state.currentPage + 1) : (state.currentPage - 1)

			const offset3 =  (parseInt(currentPage) - 1) * state.recordsPerPage
       		const itemsPerPage3 = state.recordsPerPage;              	
       		
			const tdG2 = state.originalTableData.map((td)=>{
				
				const newSortedValue = td.values.filter((val)=>{																				
					return val.crmFieldName === td.sortFieldName
				})

				td.sortedValue = newSortedValue[0].value
				return td;
			})


			
			return Object.assign({}, state, {
				tableData: tdG2.slice(offset3, (itemsPerPage3 + offset3)),
				currentPage: parseInt(currentPage),
			}, ...state)	

		case SET_RECORDS_PER_PAGE:
			
       		const itemsPerPage2 = parseInt(action.payload.recordsPerPage);              	
       		const offset2 = 0  //(state.currentPage - 1) * itemsPerPage2
       		
			const tdG1 = state.originalTableData.map((td)=>{
				
				const newSortedValue = td.values.filter((val)=>{																				
					return val.crmFieldName === td.sortFieldName
				})

				td.sortedValue = newSortedValue[0].value
				return td;
			})

			

			return Object.assign({}, state, {
				tableData: tdG1.slice(offset2, (itemsPerPage2 + offset2)),
				currentPage: 1,
				recordsPerPage: itemsPerPage2,								
			}, ...state)
			
		default:
			return state;
	}
}