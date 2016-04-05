import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import lodash from "lodash";
import SampleData from "../sampledata/SampleData"


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
		this.sampleData = new SampleData;
		
		
	}


	getAll() {
		//perfomr initial grouping here - by crm record Id
		var bodyData = [];
		var initialData = this.sampleData.getTableDataFromTheOutside()
		initialData.map((td, index)=> {
	      const foundObject = _.find(bodyData, ['groupValue', td.crmRecordId])
	      var arrValues = [];
	      initialData.map((td1)=>{
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
		const initialData = this.sampleData.getTableDataFromTheOutside();
		if (this.newSortDirection != "") {	

			var arr = initialData.map((td)=>{
						if (td.crmFieldName == this.newSortFieldName) {
							td.sortDirection = this.newSortDirection
						} else {
							td.sortDirection = "desc";
						}
						return {key: td.id, headerName: td.crmFieldName, sortDirection:td.sortDirection}

					 });					
			return _.uniqBy(arr, "headerName");
		}
		
		return _.uniqBy(initialData, "crmFieldName").map((header)=> {
			return {key: header.id, headerName: header.crmFieldName, sortDirection: header.sortDirection};
		})				 
	}

	getLookupData() {
		return this.sampleData.getLookupData();
	}


	getTwoOptionsData() {
		return this.sampleData.getTwoOptionsData();
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
					return td;
				})
			this.tableData = arr;
		}
				
		this.emit("change");
	}


	


	handleActions(action) {
		switch(action.type) {		
			case "TOGGLE_INITIAL_TABLE_STATE":				
				this.isGrouped = false;
				this.getAll();				
				this.emit("change")	
				break;
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






















