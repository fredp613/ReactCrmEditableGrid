import { EventEmitter } from "events";
import dispatcher from "../dispatcher";


class TableBodyStore extends EventEmitter {
	constructor() {
		super()

		
		this.bodyData = [
			{
				id: 1,
				fieldValue: "asdfsfddsaf",	
				fieldType: "text",				
			},
			{
				id: 2,
				fieldValue: "234324asdfsfddsaf",									
				fieldType: "text",
			},
			{
				id: 3,
				fieldValue: "234324asdfsfddsaf",									
				fieldType: "text",
			},
			{
				id: 4,
				fieldValue: "sadf",									
				fieldType: "text",
			},
			{
				id: 5,
				fieldValue: "asdfasdf",									
				fieldType: "text",
			},
			{
				id: 6,
				fieldValue: "234324asdfsfddsaf",									
				fieldType: "text",
			},
			{
				id: 7,
				fieldValue: "sadfesfd",									
				fieldType: "text",
			},	
					
		]
	}
	

	getAll() {
		return this.bodyData;
	}

	handleActions(action) {
		switch(action.type) {			
			case "RECEIVE_BODY_DATA": 				
				this.footers = action.bodyData;
				this.emit("change");
				break;							
			case "FETCH_BODY_DATA_ERROR": 
				break;			
		}
	}

}

const tableBodyStore = new TableBodyStore;
dispatcher.register(tableBodyStore.handleActions.bind(tableBodyStore));
window.dispatcher = dispatcher;
export default tableBodyStore;






















