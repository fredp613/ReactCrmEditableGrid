import React from "react";
import * as TableDataActions from "../actions/TableDataActions";
import TableDataStore from "../stores/TableDataStore";
import TableHeaderStore from "../stores/TableHeaderStore";
import * as TableHeaderActions from "../actions/TableHeaderActions";

export default class TableHeader extends React.Component {

	constructor() {
	    super();
           
	    this.state = {     	    	       	      
          newSortDirection: TableDataStore.newSortDirection,
          newSortFieldName: TableDataStore.newSortFieldName,  
          dirtyRecords: TableDataStore.dirtyRecords, 

	    }    
	}

	componentWillMount() {

		TableDataStore.on('change', ()=> {						
			this.setState({				
				 newSortDirection: TableDataStore.newSortDirection,
          		 newSortFieldName: TableDataStore.newSortFieldName,  
          		 dirtyRecords: TableDataStore.dirtyRecords,              
			});
		})		
	}

	componentWillUnmount() {
		TableDataStore.removeListener('change', ()=> {
			this.setState({				
				 newSortDirection: TableDataStore.newSortDirection,
          		 newSortFieldName: TableDataStore.newSortFieldName, 
          		 dirtyRecords: TableDataStore.dirtyRecords,               
			});
		})
		
	}
	 shouldComponentUpdate() {
      return true;
   }

	
	handleSort(fieldName, isGrouped) {		
		console.log(isGrouped)
		if (this.props.sortDirection == "asc") {				
			TableDataActions.toggleQuickSort(fieldName, "desc", isGrouped);
		} else {					
			TableDataActions.toggleQuickSort(fieldName, "asc", isGrouped);
		}	
		this.setState({});			
	}	

	// handleGroupBtnAction(fieldName) {
	// 	this.handleSort(fieldName, "desc");
 //   		TableDataActions.toggleGrouping(fieldName);
 //   		this.setState({});
	// }

	render() {
		const linkStyle = {
      		outline: "none",
      		cursor: "pointer"
    	};
    	const { dirtyRecords } = this.state;
    	const sortDirection = this.props.sortDirection == "asc" ? "up" : "down";
    	var headerNameTag; 
    	var sortIndicatorTag;
    	var advancedSearchTag;
    	if (dirtyRecords.length == 0) {    		
    		headerNameTag = <a style={linkStyle} onClick={this.handleSort.bind(this,this.props.fieldName, false)}>{this.props.fieldName}</a>
    		sortIndicatorTag = <a class={"glyphicon glyphicon-menu-" + sortDirection} style={linkStyle} onClick={this.handleSort.bind(this,this.props.fieldName,false)} />				
    		advancedSearchTag = <a class='glyphicon glyphicon-filter' style={linkStyle} onClick={this.handleSort.bind(this,this.props.fieldName,true)} />
    	} else {
    		headerNameTag = <span>{this.props.fieldName}</span>
    	}

		return(										
			<th> 
				{headerNameTag}
				{sortIndicatorTag}
				{advancedSearchTag}				
			</th>							
		);
	}
}