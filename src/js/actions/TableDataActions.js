import dispatcher from "../dispatcher";
import SampleData from "../sampledata/SampleData";
import TableDataStore from '../stores/TableDataStore';
export const TOGGLE_EDITING_MODE = "TOGGLE_EDITING_MODE";
export const TOGGLE_QUICK_SORT = "TOGGLE_QUICK_SORT";
export const UPDATE_DIRTY_RECORDS = "UPDATE_DIRTY_RECORDS";
export const FETCH_TABLE_DATA_ERROR = "FETCH_TABLE_DATA_ERROR";
export const FETCH_CACHE_TABLE_DATA = "FETCH_CACHE_TABLE_DATA";
export const RECEIVE_TABLE_DATA = "RECEIVE_TABLE_DATA";
export const APPEND_DIRTY_RECORDS = "APPEND_DIRTY_RECORDS";
export const CANCEL_DIRTY_RECORDS = "CANCEL_DIRTY_RECORDS";
export const GENERATE_USER_ID = "GENERATE_USER_ID";
	
export function toggleEditingMode(isEditing) {
	return {
		type: TOGGLE_EDITING_MODE,
		payload: {
			isEditing,
		}
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

export function fetchCacheTableData() {
	const sampleData = TableDataStore.getAll();
	
	return {
		type: FETCH_CACHE_TABLE_DATA,
		payload: {
			tableData: sampleData,
		},
	}

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



