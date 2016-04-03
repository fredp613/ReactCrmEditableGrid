import dispatcher from "../dispatcher";

	
	export function toggleEditingMode(isEditing) {
		dispatcher.dispatch({
			type: "TOGGLE_EDITING_MODE",
			isEditing,
		});
	}

	export function toggleQuickSort(sortFieldName, sortDirection) {
		dispatcher.dispatch({
			type: "TOGGLE_QUICK_SORT",
			sortFieldName,
			sortDirection,
		})
	}

	export function updateRequest() {
		dispatcher.dispatch({
			type: "UPDATE_REQUEST",			
		});
	}

	export function updateDirtyRecords(parentId, fieldName, value) {
		dispatcher.dispatch({
			type: "UPDATE_DIRTY_RECORDS",
			parentId: parentId,
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