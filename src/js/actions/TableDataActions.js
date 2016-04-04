import dispatcher from "../dispatcher";

	
	export function toggleEditingMode(isEditing) {
		dispatcher.dispatch({
			type: "TOGGLE_EDITING_MODE",
			isEditing,
		});
	}

	export function toggleQuickSort(sortFieldName, sortDirection, isGrouped) {
		dispatcher.dispatch({
			type: "TOGGLE_QUICK_SORT",
			sortFieldName,
			sortDirection,						
			isGrouped,
		})
	}

	// export function toggleGrouping(fieldName){
	// 	dispatcher.dispatch({
	// 		type: "TOGGLE_GROUPING",
	// 		fieldName: fieldName,			
	// 	})
	// }
	

	export function updateDirtyRecords() {			
		
		dispatcher.dispatch({
			type: "UPDATE_DIRTY_RECORDS",	
			// validDirtyRecords: newData,		
		});
	}

	export function appendDirtyRecords(parentId, fieldId, fieldName, value) {
		dispatcher.dispatch({
			type: "APPEND_DIRTY_RECORDS",
			parentId: parentId,
			fieldId: fieldId,
			fieldName: fieldName,
			value: value,
		});
	}

	export function fetchTableData() {
	// axios("http://someurl.com/somdataendpoint").then((data)=> {
	// 	console.log("got some data");
	// })

	setTimeout(()=> {
		dispatcher.dispatch({type: "RECEIVE_TABLE_DATA", 
		});

		if (false) {
			dispatcher.dispatch({type: "FETCH_TABLE_DATA_ERROR"});	
		}
		
	}, 1000);
}