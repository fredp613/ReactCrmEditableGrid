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
          recordIsCurrentlyDirty: TableDataStore.isEditing,              
	    }    
	}

	componentWillMount() {

		TableDataStore.on('change', ()=> {						
			this.setState({				
				 newSortDirection: TableDataStore.newSortDirection,
          		 newSortFieldName: TableDataStore.newSortFieldName,  
          		 recordIsCurrentlyDirty: TableDataStore.isEditing,              
			});
		})		
	}

	componentWillUnmount() {
		TableDataStore.removeListener('change', ()=> {
			this.setState({				
				 newSortDirection: TableDataStore.newSortDirection,
          		 newSortFieldName: TableDataStore.newSortFieldName, 
          		 recordIsCurrentlyDirty: TableDataStore.isEditing,               
			});
		})
		
	}
	 shouldComponentUpdate() {
      return true;
   }

	
	handleSort(fieldName, sortDirection) {		
		if (this.props.sortDirection == "asc") {				
			TableDataActions.toggleQuickSort(fieldName, "desc");
		} else {					
			TableDataActions.toggleQuickSort(fieldName, "asc");
		}	
		this.setState({});
				
	}	

	render() {
		const linkStyle = {
      		outline: "none",
      		cursor: "pointer"
    	};
    	const { recordIsCurrentlyDirty } = this.state;
    	const sortDirection = this.props.sortDirection == "asc" ? "up" : "down";
    	var headerNameTag; 
    	var sortIndicatorTag;
    	var advancedSearchTag;
    	if (!recordIsCurrentlyDirty) {    		
    		headerNameTag = <a style={linkStyle} onClick={this.handleSort.bind(this,this.props.fieldName)}>{this.props.fieldName}</a>
    		sortIndicatorTag = <a class={"glyphicon glyphicon-menu-" + sortDirection} style={linkStyle} onClick={this.handleSort.bind(this,this.props.fieldName)} />				
    		advancedSearchTag = <a class='glyphicon glyphicon-filter' style={linkStyle}  />
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