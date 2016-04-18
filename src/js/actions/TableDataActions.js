import dispatcher from "../dispatcher";
import SampleData from "../sampledata/SampleData";
import TableDataStore from '../stores/TableDataStore';
import axios from "axios"


export const TOGGLE_EDITING_MODE = "TOGGLE_EDITING_MODE";
export const TOGGLE_QUICK_SORT = "TOGGLE_QUICK_SORT";
export const UPDATE_DIRTY_RECORDS = "UPDATE_DIRTY_RECORDS";
export const FETCH_TABLE_DATA_ERROR = "FETCH_TABLE_DATA_ERROR";
export const FETCH_TABLE_DATA = "FETCH_TABLE_DATA";
export const RECEIVE_TABLE_DATA = "RECEIVE_TABLE_DATA";
export const APPEND_DIRTY_RECORDS = "APPEND_DIRTY_RECORDS";
export const CANCEL_DIRTY_RECORDS = "CANCEL_DIRTY_RECORDS";
export const GENERATE_USER_ID = "GENERATE_USER_ID";
export const GROUP_TABLE_DATA = "GROUP_TABLE_DATA";
export const MOVE_PAGE = "MOVE_PAGE";
export const SELECT_PAGE_NUMBER = "SELECT_PAGE_NUMBER";
export const SET_RECORDS_PER_PAGE = "SET_RECORDS_PER_PAGE";
export const PAGED_DATA = "PAGED_DATA"


export function getPagedData() {
	return {
		type: PAGED_DATA,		
	}
}


export function toggleEditingMode(isEditing) {
	return {
		type: TOGGLE_EDITING_MODE,
		payload: {
			isEditing,
		}
	}
		
}

export function groupTableData() {
	return {
		type: GROUP_TABLE_DATA, 
	}
}

export function toggleQuickSort(sortFieldName, sortDirection, isGrouped) {	
		return {
				type: TOGGLE_QUICK_SORT,
				payload: {
					sortFieldName,
					sortDirection,						
					isGrouped,
				}
			}					
}

export function updateDirtyRecords() {					
		return {
			type: UPDATE_DIRTY_RECORDS,		
		}		
}
export function cancelDirtyRecords() {					
		return {
			type: CANCEL_DIRTY_RECORDS,		
		}
		
}

export function appendDirtyRecords(crmRecordId, dirtyValue, crmFieldName) {
	return {
		type: APPEND_DIRTY_RECORDS,
		payload: {
			crmRecordId: crmRecordId,
			dirtyValue: dirtyValue,			
			crmFieldName: crmFieldName,
		}
	}		
}

export function fetchTableDataSuccess(data) {
	const sampleData = TableDataStore.getAll(data)	
	const lookupData = TableDataStore.getLookupData();
	const twoOptionsData = TableDataStore.getTwoOptionsData();
	 
	return {
		type: FETCH_TABLE_DATA,
		payload: {
			tableData: sampleData,
			lookupData: lookupData,
			twoOptionsData: twoOptionsData,			
		},
	}
}

export function fetchTableDataError() {
	return {
		type: FETCH_TABLE_DATA_ERROR,		
	}	
}

export function fetchData() {
	return dispatch => {

		axios.get('http://localhost:3000/')
		  .then(function (response) {		    
		  	
		    dispatch(fetchTableDataSuccess(response.data));
		  })
		  .catch(function (response) {
		    console.log(response);
		    dispatch(fetchTableDataError());
		  });
		


	    // setTimeout(() => {	      
	      // dispatch(fetchCacheTableData());
	    // }, 1500);
	};
}

export function fetchTableData() {

}

export function receiveTabelData() {

}

export function generateUserId() {
	return {
		type: GENERATE_USER_ID,
		id: Math.round(Math.random()*100),
	}
}

export function generateUserIdIfOdd() {
	return (dispatch, getState) => {
		const { userId } = getState();
		 if (userId % 2 === 0) {
		      return;
		 }

	    dispatch(generateUserId());
	};
}

export function generateUserIdAsync() {
	 return dispatch => {
	    setTimeout(() => {
	      // Yay! Can invoke sync or async actions with `dispatch`
	      dispatch(generateUserId());
	    }, 2000);
	  };
}

export function selectPageNumber(pageNumber) {
	return {
		type: SELECT_PAGE_NUMBER,
		payload: {
			pageNumber: pageNumber,			
		},
	}
}

export function movePage(direction) {
	return {
		type: MOVE_PAGE,
		payload: {
			direction: direction,
		},
	}
}

export function setRecordsPerPage(number) {
	return {
		type: SET_RECORDS_PER_PAGE,
		payload: {
			recordsPerPage: number,
		}
	}
}



