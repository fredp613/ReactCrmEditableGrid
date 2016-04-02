import { EventEmitter } from "events";
import dispatcher from "../dispatcher";


class TableFooterStore extends EventEmitter {
	constructor() {
		super()
		this.footers = [
			{
				id: 1,
				title: "asdfsfddsaf",				
			},
			{
				id: 2,
				title: "234324asdfsfddsaf",				
			},
			{
				id: 3,
				title: "234324asdfsfddsaf",				
			},
			{
				id: 4,
				title: "234324asdfsfddsaf",				
			},		
		]
	}
	

	getAll() {
		return this.footers;
	}

	handleActions(action) {
		switch(action.type) {			
			case "RECEIVE_FOOTERS": 				
				this.footers = action.footers;
				this.emit("change");
				break;							
			case "FETCH_FOOTERS_ERROR": 
				break;			
		}
	}

}

const tableFooterStore = new TableFooterStore;
dispatcher.register(tableFooterStore.handleActions.bind(tableFooterStore));
window.dispatcher = dispatcher;
export default tableFooterStore;






















