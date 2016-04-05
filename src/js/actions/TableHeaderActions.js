import dispatcher from "../dispatcher";

export function toggleQuickSort(sortDirection) {
	dispatcher.dispatch({
		type: "TOGGLE_QUICK_SORT",
		sortDirection,
	});
	
}
