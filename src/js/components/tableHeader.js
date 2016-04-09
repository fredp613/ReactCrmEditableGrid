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
          cancelGroupBtnActivated: false,
	    }    
	}

	componentWillMount() {

		TableDataStore.on('change', ()=> {						
			this.setState({				
				 newSortDirection: TableDataStore.newSortDirection,
          		 newSortFieldName: TableDataStore.newSortFieldName,  
          		 dirtyRecords: TableDataStore.dirtyRecords,  
          		 cancelGroupBtnActivated: false,            
			});
		})		
	}

	componentWillUnmount() {
		TableDataStore.removeListener('change', ()=> {
			this.setState({				
				 newSortDirection: TableDataStore.newSortDirection,
          		 newSortFieldName: TableDataStore.newSortFieldName, 
          		 dirtyRecords: TableDataStore.dirtyRecords, 
          		 cancelGroupBtnActivated: false,              
			});
		})
		
	}

	
	handleSort(fieldName, isGrouped) {		
		if (this.props.sortDirection == "asc") {				
			TableDataActions.toggleQuickSort(fieldName, "desc", isGrouped);
		} else {					
			TableDataActions.toggleQuickSort(fieldName, "asc", isGrouped);
		}	
		if (isGrouped) {			
			this.setState({cancelGroupBtnActivated: true});	
		}

	}	

	handleCancelGroupBtnClick(fieldName) {
		this.setState({cancelGroupBtnActivated:false});
		TableDataActions.toggleQuickSort(fieldName, "desc", false);
	
	}

	render() {
		const linkStyle = {
      		outline: "none",
      		cursor: "pointer"
    	};
    	const { dirtyRecords } = this.state;
    	const { cancelGroupBtnActivated } = this.state;

    	const sortDirection = this.props.sortDirection == "asc" ? "up" : "down";
    	var headerNameTag; 
    	var sortIndicatorTag;
    	var advancedSearchTag;
    	var cancelGroupBtnTag;
    	if (dirtyRecords.length == 0) {    		
    		headerNameTag = <a style={linkStyle} onClick={this.handleSort.bind(this,this.props.fieldName, false)}>{this.props.fieldName}</a>
    		
    		sortIndicatorTag = <a class={"glyphicon glyphicon-menu-" + sortDirection} 
    		style={linkStyle} onClick={this.handleSort.bind(this,this.props.fieldName,false)} />				
    		
    		advancedSearchTag = <a class='glyphicon glyphicon-filter' style={linkStyle} 
    		onClick={this.handleSort.bind(this,this.props.fieldName,true)} />

    		if (cancelGroupBtnActivated) {
    			cancelGroupBtnTag = <a class='glyphicon glyphicon-remove' style={linkStyle} 
    			onClick={this.handleCancelGroupBtnClick.bind(this, this.props.fieldName)} />
    		}

    	} else {
    		headerNameTag = <span>{this.props.fieldName}</span>
    	}

		return(										
			<th> 
				{headerNameTag}
				{sortIndicatorTag}
				{advancedSearchTag}
				{cancelGroupBtnTag}				
			</th>							
		);
	}
}