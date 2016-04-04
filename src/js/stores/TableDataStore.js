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
		this.saveRequired = false;
		this.dirtyRecords = [];
		this.tableDataGrouped = [];

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

		record json shoudl be row (recorid) -> values (all fields of view and their values) 
		grouping should look like
		{"Result":[
			    {"ML":[
			        {"TeamName":"Team 1","League":"League 1"},
			        {"TeamName":"Team 2","League":"League 2"},
			        {"TeamName":"Team 3","League":"League 3"}
			    ]},
			    {"3A":[
			        {"TeamName":"Team 4","League":"League 1"},
			        {"TeamName":"Team 5","League":"League 2"},
			        {"TeamName":"Team 6","League":"League 3"}
			    ]},
			    {"2A":[
			        {"TeamName":"Team 7","League":"League 1"},
			        {"TeamName":"Team 8","League":"League 2"},
			        {"TeamName":"Team 9","League":"League 3"}
			    ]}
			]}
		**/
		this.tableData = [			
			{
				id: "1",
				crmRecordId: "431212",
				crmFieldName: "firstName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "John",
				grouping: "",
			},
			{
				id: "2",
				crmRecordId: "431212",
				crmFieldName: "lastName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "Smith",
				grouping: "",
			},					
			{
				id: "3",
				crmRecordId: "431212",
				crmFieldName: "isActive",
				crmFieldType: "boolean",
				sortDirection: "asc",
				value: "0",
				grouping: "",
			},		
			{
				id: "37",
				crmRecordId: "431212",
				crmFieldName: "isAboriginal",
				crmFieldType: "boolean",
				sortDirection: "desc",
				value: "1",
				grouping: "",
			},	
			{
				id: "38",
				crmRecordId: "431212",
				crmFieldName: "Category",
				crmFieldType: "lookup",
				sortDirection: "desc",
				value: "140012",
				grouping: "",
			},	
			{
				id: "5",
				crmRecordId: "4312123",
				crmFieldName: "firstName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "Mike",
				grouping: "",
			},
			{
				id: "6",
				crmRecordId: "4312123",
				crmFieldName: "lastName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "JonesU",
				grouping: "",
			},		
			{
				id: "30",
				crmRecordId: "4312123",
				crmFieldName: "isActive",
				crmFieldType: "boolean",
				sortDirection: "asc",
				value: "0",
				grouping: "",
			},	
			{
				id: "34",
				crmRecordId: "4312123",
				crmFieldName: "isAboriginal",
				crmFieldType: "boolean",
				sortDirection: "desc",
				value: "0",
				grouping: "",
			},	
			{
				id: "35",
				crmRecordId: "4312123",
				crmFieldName: "Category",
				crmFieldType: "lookup",
				sortDirection: "desc",
				value: "140012",
				grouping: "",
			},
			{
				id: "7f",
				crmRecordId: "4312124",
				crmFieldName: "firstName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "Mike",
				grouping: "",
			},
			{
				id: "68",
				crmRecordId: "4312124",
				crmFieldName: "lastName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "Jones",
				grouping: "",
			},
			{
				id: "313232",
				crmRecordId: "4312124",
				crmFieldName: "isActive",
				crmFieldType: "boolean",
				sortDirection: "asc",
				value: "1",
				grouping: "",
			},
			{
				id: "32asdfasdf",
				crmRecordId: "4312124",
				crmFieldName: "isAboriginal",
				crmFieldType: "boolean",
				sortDirection: "desc",
				value: "0",
				grouping: "",
			},	
			{
				id: "33trerefsdf",
				crmRecordId: "4312124",
				crmFieldName: "Category",
				crmFieldType: "lookup",
				sortDirection: "desc",
				value: "140013",
				grouping: "",
			},			
			
		]
		

		this.tableDataOld = [

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
						value: "0",
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
						id: "5",
						crmFieldName: "firstName",
						crmFieldType: "crmShortText",
						sortDirection: "desc",
						value: "Jane",
					},
					{
						id: "6",
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
						id: "7f",
						crmFieldName: "firstName",
						crmFieldType: "crmShortText",
						sortDirection: "desc",
						value: "Mike",
					},
					{
						id: "68",
						crmFieldName: "lastName",
						crmFieldType: "crmShortText",
						sortDirection: "desc",
						value: "Jones",
					},
					{
						id: "313232",
						crmFieldName: "isActive",
						crmFieldType: "boolean",
						sortDirection: "asc",
						value: "1",
					},
					{
						id: "32asdfasdf",
						crmFieldName: "isAboriginal",
						crmFieldType: "boolean",
						sortDirection: "desc",
						value: "0",
					},	
					{
						id: "33trerefsdf",
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



	getAll() {
		return this.tableData;
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


	appendDirtyRecords(parentId, fieldId, fieldName, value) {
		
		const revised = {
			parentId: parentId,
			fieldId: fieldId,
			fieldName: fieldName,
			value: value,
		}
		var tmpArr = [];
		const foundObject = _.find(this.dirtyRecords, ['fieldId', fieldId])
		if (!foundObject) {
			this.dirtyRecords.push(revised)
		} else {
			for (var i=0;i<=this.dirtyRecords.length - 1;i++) {
				const dirtyRecord = this.dirtyRecords[i];
				if (dirtyRecord.fieldId == fieldId) {
					dirtyRecord.value = value;
				}

				tmpArr.push(dirtyRecord)
			}
			this.dirtyRecords = tmpArr
		}		
							
	}
	updateDirtyRecords() {
		
		this.tableData = this.tableData.map((td) => {
			td.values.map((val)=> {
				const foundObject = _.find(this.dirtyRecords, ['fieldId', val.id])			
				if (foundObject) {										
					val.value = foundObject.value;														
				}
			})			
			return td;			
		})		

		this.emit("change");
	}


	toggleEditingMode(isEditing) {
		this.isEditing = isEditing
		this.dirtyRecords = [];
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

	findByAttributeValue(value) {
		// var arr = [];
		// this.tableData.map((td)=> {
		// 	td.values.map((val) => {
		// 		if (val.value == value) {
		// 			val.crmRecordId = td.crmRecordId					
		// 			arr.push(val)
		// 		}
		// 	})
		// })

		// return arr;
	}
	
	transformDataForGrouping(groupingAttribute) {
		// var newArr = [];		
		// //"firstName"
		// this.tableData.map((td)=>{
		// 	td.values.map((val)=> {
		// 		if (groupingAttribute == val.crmFieldName) {
		// 			//firstName = firstName so grab value
		// 			//Find all elements in array with this firstName value					
		// 			const foundObject = _.find(newArr, ['groupingValue', val.value])
		// 				if (!foundObject) {
		// 					newArr.push({

		// 					groupingAttribute: val.crmFieldName,
		// 					groupingValue: val.value,						
		// 					//find anyting this table data with this value
		// 					groupValues: this.findByAttributeValue(val.value)							
		// 				})	
		// 			}					
		// 		}
		// 	})

		// })
		// console.log(newArr);
		// this.tableDataGrouped = newArr;
		console.log(_.groupBy(this.tableDataFinal, "grouping"));

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
			case "UPDATE_DIRTY_RECORDS":
				// this.testf(action.validDirtyRecords);
				// this.emit('change')
				this.updateDirtyRecords();								
				break;
			case "APPEND_DIRTY_RECORDS":
				this.appendDirtyRecords(action.parentId, action.fieldId, action.fieldName, action.value)
				break;			
			case "FETCH_TABLE_DATA_ERROR": 
				break;			
		}
	}


	


}

const tableDataStore = new TableDataStore;
dispatcher.register(tableDataStore.handleActions.bind(tableDataStore));
window.dispatcher = dispatcher;
export default tableDataStore;






















