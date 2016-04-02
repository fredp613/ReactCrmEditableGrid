import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import lodash from "lodash";


class TableDataStore extends EventEmitter {
	constructor() {
		super();
		this.rowData = [];
		this.headers = [];	
		this.values = [];
		this.isEditing = false;		
		this._ = require("lodash");
		//in crm this is 2 recrods, taking the three fields in the view
		//field Name would be the header (field display name)
		/**
			id | first name | last name 
			----------------------------
			1  | john       | Jane
			2  | jn         | Doe
			3  | jn         | smith

		**/

		this.tableData = [

			{
				id: "11",
				crmRecordId: "431212",
				values: [
					{
						id: "1",
						crmFieldName: "firstName",
						crmFieldType: "crmShortText",
						value: "John",
					},
					{
						id: "2",
						crmFieldName: "lastName",
						crmFieldType: "crmShortText",
						value: "Smith",
					},					
					{
						id: "3",
						crmFieldName: "isActive",
						crmFieldType: "boolean",
						value: "true",
					},					
				],
			},
			{
				id: "22",
				crmRecordId: "4312123",
				values: [
					{
						id: "3",
						crmFieldName: "firstName",
						crmFieldType: "crmShortText",
						value: "Jane",
					},
					{
						id: "4",
						crmFieldName: "lastName",
						crmFieldType: "crmShortText",
						value: "JonesU",
					},		
					{
						id: "30",
						crmFieldName: "isActive",
						crmFieldType: "boolean",
						value: "false",
					},				
				]
			},
			{
				id: "33",
				crmRecordId: "4312124",
				values: [
					{
						id: "5",
						crmFieldName: "firstName",
						crmFieldType: "crmShortText",
						value: "Mike",
					},
					{
						id: "6",
						crmFieldName: "lastName",
						crmFieldType: "crmShortText",
						value: "Jones",
					},
					{
						id: "31",
						crmFieldName: "isActive",
						crmFieldType: "boolean",
						value: "true",
					},					
				]
			},				
		]
		
	}
	
	getHeaders() {		
		return _.uniq(this.getHeaderNames())
	}

	getHeaderNames() {						
		return this.getHeadersCleaned().map((header) => {			
			return header.crmFieldName;
		})		
	}

	getHeadersCleaned() {
		for (var i=0;i<=this.tableData.length - 1;i++) {			
			var values = this.tableData[i].values
			for (var y=0;y<=values.length - 1;y++) {				
				this.headers.push(values[y])
			}							
		}
		return this.headers;		
	}
	getValueObjects() {
		for (var i=0;i<=this.tableData.length - 1;i++) {			
			var vals = this.tableData[i].values
			for (var y=0;y<=vals.length - 1;y++) {				
				this.values.push(vals[y])
			}							
		}
		return this.values;		
	}
	

	getAll() {
		return this.tableData;
	}

	getRowDataByParentId(id) {			
		return this.rowData = this.tableData.filter(function(row, index){						
			if (row.id == id) {				
				return row;				
			}
		});		
	}

	handleActions(action) {
		switch(action.type) {			
			case "RECEIVE_TABLE_DATA": 				
				this.footers = action.tableData;
				this.emit("change");
				break;
			case "TOGGLE_EDITING_MODE":			
				this.toggleEditingMode(action.isEditing)					
			case "FETCH_TABLE_DATA_ERROR": 
				break;			
		}
	}

	toggleEditingMode(isEditing) {
		this.isEditing = isEditing
		this.emit("change");
		console.log("store changed" + this.isEditing);
	}
	

}

const tableDataStore = new TableDataStore;
dispatcher.register(tableDataStore.handleActions.bind(tableDataStore));
window.dispatcher = dispatcher;
export default tableDataStore;






















