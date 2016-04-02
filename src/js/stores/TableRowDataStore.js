import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import lodash from "lodash";


class TableRowDataStore extends EventEmitter {
	constructor() {
		super();
		this.isDirty = false;
		
	}
			
	handleActions(action) {
		switch(action.type) {						
			case "TOGGLE_DIRTY_MODE":			
				this.toggleDirtyMode(action.isDirty)								
				break;					
		}
	}

	toggleDirtyMode(isDirty) {
		this.isDirty = isDirty
		this.emit("change");		
	}

}

const tableRowDataStore = new TableRowDataStore;
dispatcher.register(tableRowDataStore.handleActions.bind(tableRowDataStore));
window.dispatcher = dispatcher;
export default tableRowDataStore;






















