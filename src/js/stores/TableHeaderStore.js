import { EventEmitter } from "events";
import dispatcher from "../dispatcher";


class TableHeaderStore extends EventEmitter {
	constructor() {
		super()
		this.headers = [
			{
				id: 434,
				title: "AGAOM asdfsfddsaf",
				fieldType: "plainText",					
			},
			{
				id: 234,
				title: "asfasf 234324asdfsfddsaf",					
				fieldType: "date",
			},
			{
				id: 214,
				title: "farnk 234324asdfsfddsaf",					
				fieldType: "lookup"
			},	
			{
				id: 215,
				title: "farnk 234324asdfsfddsaf",					
				fieldType: "currency",
			},		
		]
	}
	

	getAll() {
		return this.headers;
	}

	handleActions(action) {
		switch(action.type) {			
			case "RECEIVE_HEADERS": 				
				this.headers = action.headers;
				this.emit("change");
				break;							
			case "FETCH_FOOTERS_ERROR": 
				break;			
		}
	}

}

const tableHeaderStore = new TableHeaderStore;
dispatcher.register(tableHeaderStore.handleActions.bind(tableHeaderStore));
window.dispatcher = dispatcher;
export default tableHeaderStore;






















