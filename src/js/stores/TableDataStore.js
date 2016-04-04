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
		this.tableData = [];
		this.isGrouped = false;

		//Quick sort 1 to 1 for sort name and sort direction
		this.newSortDirection = "";
		this.newSortFieldName = "";	
		/////////////////////////////////////////////////////

		this.tableDataFromTheOutside = [			
			{
				id: "1z",
				crmRecordId: "431212",
				crmFieldName: "firstName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "John",
				grouping: "",
			},
			{
				id: "2x",
				crmRecordId: "431212",
				crmFieldName: "lastName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "Smith",
				grouping: "",
			},					
			{
				id: "3x",
				crmRecordId: "431212",
				crmFieldName: "isActive",
				crmFieldType: "boolean",
				sortDirection: "asc",
				value: "0",
				grouping: "",
			},		
			{
				id: "371",
				crmRecordId: "431212",
				crmFieldName: "isAboriginal",
				crmFieldType: "boolean",
				sortDirection: "desc",
				value: "1",
				grouping: "",
			},	
			{
				id: "382",
				crmRecordId: "431212",
				crmFieldName: "Category",
				crmFieldType: "lookup",
				sortDirection: "desc",
				value: "140012",
				grouping: "",
			},	
			{
				id: "5xxxx",
				crmRecordId: "4312123",
				crmFieldName: "firstName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "Mike",
				grouping: "",
			},
			{
				id: "6121213x",
				crmRecordId: "4312123",
				crmFieldName: "lastName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "JonesU",
				grouping: "",
			},		
			{
				id: "30fgfg",
				crmRecordId: "4312123",
				crmFieldName: "isActive",
				crmFieldType: "boolean",
				sortDirection: "asc",
				value: "0",
				grouping: "",
			},	
			{
				id: "3443565",
				crmRecordId: "4312123",
				crmFieldName: "isAboriginal",
				crmFieldType: "boolean",
				sortDirection: "desc",
				value: "0",
				grouping: "",
			},	
			{
				id: "35xxxxxx",
				crmRecordId: "4312123",
				crmFieldName: "Category",
				crmFieldType: "lookup",
				sortDirection: "desc",
				value: "140012",
				grouping: "",
			},
			{
				id: "7f1111",
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
				id: "3132x32",
				crmRecordId: "4312124",
				crmFieldName: "isActive",
				crmFieldType: "boolean",
				sortDirection: "asc",
				value: "1",
				grouping: "",
			},
			{
				id: "32axsdfasdf",
				crmRecordId: "4312124",
				crmFieldName: "isAboriginal",
				crmFieldType: "boolean",
				sortDirection: "desc",
				value: "0",
				grouping: "",
			},	
			{
				id: "33trxerefsdf",
				crmRecordId: "4312124",
				crmFieldName: "Category",
				crmFieldType: "lookup",
				sortDirection: "desc",
				value: "140013",
				grouping: "",
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
		//perfomr initial grouping here - by crm record Id
		var bodyData = [];
		this.tableDataFromTheOutside.map((td, index)=> {
	      const foundObject = _.find(bodyData, ['groupValue', td.crmRecordId])
	      var arrValues = [];
	      this.tableDataFromTheOutside.map((td1)=>{
	        if (td1.crmRecordId == td.crmRecordId) {
	          arrValues.push(td1);
	        }
	      })
	      if (!foundObject) {
	         bodyData.push({
	         	 id: index,
	             groupField: "",
	             groupValue:td.crmRecordId,
	             values: arrValues
	         })
	      }
	    });
	    bodyData.map((bd)=>{
	    	bd.values.map((value)=>{
	    		if (value.crmFieldName == this.newSortFieldName) {
	    			bd.sortedValue = value.value;
	    			bd.sortFieldName = value.crmFieldName;
	    		}
	    	})
	    	return bd;
	    })
	    this.tableData = bodyData;
	    
		return bodyData;
	}


	getNewSortedTableData() {
		//manipulate array to properly sort
		//find nodes with crmfieldname that is being sorted in the new sorted
		//extract its value and add a new field called sortedValue
		//then sort array completed using the sorted value field and return it
		// this.tableData = this.getAll()
		this.getAll();
		var newArr = [];

		for (var i=0;i<=this.tableData.length - 1;i++) {
			var firstNode = this.tableData[i];					
			for (var y=0;y<=firstNode.values.length - 1;y++) {
				var val = firstNode.values[y];				
				if (val.crmFieldName == this.newSortFieldName) {
					firstNode.sortedValue = val.value;
					firstNode.sortFieldName = val.crmFieldName;
				}
			}
			newArr.push(firstNode);
		}		

		if (this.newSortDirection == "asc") {			
			newArr.sort(function (a, b) {			
				if (a.sortedValue.toLowerCase() > b.sortedValue.toLowerCase()) {
			    	return 1;
			  	}
			    if (a.sortedValue.toLowerCase() < b.sortedValue.toLowerCase()) {
			    	return -1;
			    }						
			  // a must be equal to b
			  return 0;
			});
		} else {
			newArr.sort(function (a, b) {			
				if (a.sortedValue.toLowerCase() < b.sortedValue.toLowerCase()) {
			    	return 1;
			  	}
			    if (a.sortedValue.toLowerCase() > b.sortedValue.toLowerCase()) {
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

			var arr = this.tableDataFromTheOutside.map((td)=>{
						if (td.crmFieldName == this.newSortFieldName) {
							td.sortDirection = this.newSortDirection
						} else {
							td.sortDirection = "desc";
						}
						return {key: td.id, headerName: td.crmFieldName, sortDirection:td.sortDirection}

					 });					
			return _.uniqBy(arr, "headerName");
		}
		
		return _.uniqBy(this.tableDataFromTheOutside, "crmFieldName").map((header)=> {
			return {key: header.id, headerName: header.crmFieldName, sortDirection: header.sortDirection};
		})				
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
		console.log(this.tableData)

		this.tableData = this.tableData.map((td, index) => {
			var vals;
			if (td.values) {
				vals = td.values
			} else {				
				vals = td[1]				
			}
			vals.map((val)=> {
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
	toggleQuickSort(fieldName, direction, isGrouped) {				
		this.newSortFieldName = fieldName;
		this.newSortDirection = direction;	
		this.isGrouped = isGrouped
		//temporary, get rid of this its redundant since the server will return a sroted array
		this.tableData = this.getNewSortedTableData();		
		if (this.isGrouped) {
			var arr = [];		

				arr = _.toPairs(_.groupBy(this.tableData, "sortedValue")).map((td)=> {
					// console.log(td)
					return td;
				})
				console.log(arr)
			this.tableData = arr;
		}
				
		this.emit("change");
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
				this.toggleQuickSort(action.sortFieldName, action.sortDirection, action.isGrouped)								
				break;							
			case "UPDATE_DIRTY_RECORDS":				
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






















