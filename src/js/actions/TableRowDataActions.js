import dispatcher from "../dispatcher";

export function toggleDirtyMode(isDirty) {
	dispatcher.dispatch({
		type: "TOGGLE_DIRTY_MODE",
		isDirty,
	});
}

