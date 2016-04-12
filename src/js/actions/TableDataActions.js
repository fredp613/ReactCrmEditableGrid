import dispatcher from "../dispatcher";

export const TOGGLE_EDITING_MODE = "TOGGLE_EDITING_MODE";
export const TOGGLE_QUICK_SORT = "TOGGLE_QUICK_SORT";
export const UPDATE_DIRTY_RECORDS = "UPDATE_DIRTY_RECORDS";
export const FETCH_TABLE_DATA_ERROR = "FETCH_TABLE_DATA_ERROR";
export const RECEIVE_TABLE_DATA = "RECEIVE_TABLE_DATA";
export const APPEND_DIRTY_RECORDS = "APPEND_DIRTY_RECORDS";
export const CANCEL_DIRTY_RECORDS = "CANCEL_DIRTY_RECORDS";
	
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

export function appendDirtyRecords(parentId, fieldId, fieldName, value) {
	return {
		type: APPEND_DIRTY_RECORDS,
		payload: {
			parentId: parentId,
			fieldId: fieldId,
			fieldName: fieldName,
			value: value,
		}
	}		
}

export function fetchTableData() {
// axios("http://someurl.com/somdataendpoint").then((data)=> {
// 	console.log("got some data");
// })

}