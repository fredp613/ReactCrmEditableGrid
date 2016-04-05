import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import lodash from "lodash";


class TableHeaderStore extends EventEmitter {
	constructor() {
		super();
		this.sortDirection = "down";
		this.cancelGroupButtonActive = false;
		
	}

	toggleQuickSort(sortDirection) {
		this.sortDirection = sortDirection
		this.emit("change");		
	}

			
	handleActions(action) {
		switch(action.type) {						
			case "TOGGLE_QUICK_SORT":			
				this.toggleQuickSort(action.sortDirection)								
				break;
			case "TOGGLE_CANCEL_GROUP_BTN":			
				this.toggleCancelGroupBtn()								
				break;					
		}
	}

	

}

const tableHeaderStore = new TableHeaderStore;
dispatcher.register(tableHeaderStore.handleActions.bind(tableHeaderStore));
window.dispatcher = dispatcher;
export default tableHeaderStore;






















