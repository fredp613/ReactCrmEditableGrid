import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import lodash from "lodash";


class TableHeaderStore extends EventEmitter {
	constructor() {
		super();
		this.sortDirection = "down";
		
	}
			
	handleActions(action) {
		switch(action.type) {						
			case "TOGGLE_QUICK_SORT":			
				this.toggleQuickSort(action.sortDirection)								
				break;					
		}
	}

	toggleQuickSort(sortDirection) {
		this.sortDirection = sortDirection
		this.emit("change");		
	}

}

const tableHeaderStore = new TableHeaderStore;
dispatcher.register(tableHeaderStore.handleActions.bind(tableHeaderStore));
window.dispatcher = dispatcher;
export default tableHeaderStore;






















