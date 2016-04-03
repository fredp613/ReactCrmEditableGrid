import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import lodash from "lodash";


class TableDataStore extends EventEmitter {
	constructor() {
		super();
		//libs
		this._ = require("lodash");
		//////////////////////////////////////////////////////
		this.rowData = [];
		this.headers = [];	
		this.values = [];
		this.isEditing = false;	


		//Quick sort 1 to 1 for sort name and sort direction
		this.newSortDirection = "";
		this.newSortFieldName = "";	
		/////////////////////////////////////////////////////

		
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
						sortDirection: "desc",
						value: "John",
					},
					{
						id: "2",
						crmFieldName: "lastName",
						crmFieldType: "crmShortText",
						sortDirection: "desc",
						value: "Smith",
					},					
					{
						id: "3",
						crmFieldName: "isActive",
						crmFieldType: "boolean",
						sortDirection: "asc",
						value: "1",
					},		
					{
						id: "37",
						crmFieldName: "isAboriginal",
						crmFieldType: "boolean",
						sortDirection: "desc",
						value: "1",
					},	
					{
						id: "38",
						crmFieldName: "Category",
						crmFieldType: "lookup",
						sortDirection: "desc",
						value: "140012",
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
						sortDirection: "desc",
						value: "Jane",
					},
					{
						id: "4",
						crmFieldName: "lastName",
						crmFieldType: "crmShortText",
						sortDirection: "desc",
						value: "JonesU",
					},		
					{
						id: "30",
						crmFieldName: "isActive",
						crmFieldType: "boolean",
						sortDirection: "asc",
						value: "0",
					},	
					{
						id: "34",
						crmFieldName: "isAboriginal",
						crmFieldType: "boolean",
						sortDirection: "desc",
						value: "0",
					},	
					{
						id: "35",
						crmFieldName: "Category",
						crmFieldType: "lookup",
						sortDirection: "desc",
						value: "140012",
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
						sortDirection: "desc",
						value: "Mike",
					},
					{
						id: "6",
						crmFieldName: "lastName",
						crmFieldType: "crmShortText",
						sortDirection: "desc",
						value: "Jones",
					},
					{
						id: "31",
						crmFieldName: "isActive",
						crmFieldType: "boolean",
						sortDirection: "asc",
						value: "1",
					},
					{
						id: "32",
						crmFieldName: "isAboriginal",
						crmFieldType: "boolean",
						sortDirection: "desc",
						value: "0",
					},	
					{
						id: "33",
						crmFieldName: "Category",
						crmFieldType: "lookup",
						sortDirection: "desc",
						value: "140013",
					},					
				]
			},

		]

		this.twoOptionsData = [
											
			{
				crmFieldId: "123",
				crmFieldName: "isActive",				
				value: "0",
				label: "No",
			},
			{
				crmFieldId: "123",
				crmFieldName: "isActive",
				value: "1",
				label: "Yes",
			},
			{
				crmFieldId: "124",
				crmFieldName: "isAboriginal",				
				value: "0",
				label: "No",
			},
			{
				crmFieldId: "124",
				crmFieldName: "isAboriginal",
				value: "1",
				label: "Yes",
			},		
		]

		this.lookupData = [
			
			{
				crmFieldId: "4324",
				crmFieldName: "Category",
				value: "140012",
				label: "Category 1",
			},
			{
				
				crmFieldId: "4324",
				crmFieldName: "Category",
				value: "140013",
				label: "Category 2",
			},
			{
				
				crmFieldId: "4324",
				crmFieldName: "Category",
				value: "140014",
				label: "Category 3",
			},
			{
				
				crmFieldId: "4324",
				crmFieldName: "Category",
				value: "140015",
				label: "Category 4",
			},



		]
		
	}

	getNewSortedTableData() {
		//manipulate array to properly sort
		//find nodes with crmfieldname that is being sorted in the new sorted
		//extract its value and add a new field called sortedValue
		//then sort array completed using the sorted value field and return it
		var newArr = [];
		for (var i=0;i<=this.tableData.length - 1;i++) {
			var firstNode = this.tableData[i];			
			for (var y=0;y<=firstNode.values.length - 1;y++) {
				var val = firstNode.values[y];
				if (val.crmFieldName == this.newSortFieldName) {
					firstNode.sortedValue = val.value;
				}
			}
			newArr.push(firstNode);
		}
		console.log(newArr)

		if (this.newSortDirection == "asc") {
			newArr.sort(function (a, b) {			
				if (a.sortedValue > b.sortedValue) {
			    	return 1;
			  	}
			    if (a.sortedValue < b.sortedValue) {
			    	return -1;
			    }						
			  // a must be equal to b
			  return 0;
			});
		} else {
			newArr.sort(function (a, b) {			
				if (a.sortedValue < b.sortedValue) {
			    	return 1;
			  	}
			    if (a.sortedValue > b.sortedValue) {
			    	return -1;
			    }
						 
			   // a must be equal to b
			    return 0;
			});
		}
			
		return newArr;

	}
		
	getHeaders() {	
		if (this.newSortDirection != "") {			
			return this.getMutadedHeaderNames();
		}
		return _.uniqBy(this.getHeaderNames(), "headerName")
	}

	
	getMutadedHeaderNames() {
		var headers = _.uniqBy(this.getHeaderNames(), "headerName");
		var newHeaders = [];
		for (var i=0;i<=headers.length-1;i++) {
			var header = headers[i];			
			if (header.headerName == this.newSortFieldName) {
				header.sortDirection = this.newSortDirection;
			} else {
				header.sortDirection = "desc";				
			}
			newHeaders.push(header);
		}		
		return newHeaders;
	}

	getHeaderNames() {						
		return this.getHeadersCleaned().map((header, index) => {			
			return {
				headerName: header.crmFieldName,
				key: index,
				sortDirection: header.sortDirection,
			};
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

	getLookupData() {
		return this.lookupData;
	}

	

	getTwoOptionsData() {
		return this.twoOptionsData;
	}


	handleActions(action) {
		switch(action.type) {			
			case "RECEIVE_TABLE_DATA": 				
				this.footers = action.tableData;
				this.emit("change");
				break;
			case "TOGGLE_EDITING_MODE":			
				this.toggleEditingMode(action.isEditing)
				break;
			case "TOGGLE_QUICK_SORT":
				this.toggleQuickSort(action.sortFieldName, action.sortDirection)								
				break;
			case "FETCH_TABLE_DATA_ERROR": 
				break;			
		}
	}

	toggleEditingMode(isEditing) {
		this.isEditing = isEditing
		this.emit("change");		
	}
	toggleQuickSort(fieldName, direction) {				
		this.newSortFieldName = fieldName;
		this.newSortDirection = direction;	
		//temporary, get rid of this its redundant since the server will return a sroted array
		this.tableData = this.getNewSortedTableData();
		/////////////////////////////////////////////////////////////////////////////////////
		this.emit("change");
	}

}

const tableDataStore = new TableDataStore;
dispatcher.register(tableDataStore.handleActions.bind(tableDataStore));
window.dispatcher = dispatcher;
export default tableDataStore;






















