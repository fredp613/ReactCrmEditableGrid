import React from "react";
import * as TableDataActions from "../actions/TableDataActions";
import * as TableHeaderActions from "../actions/TableHeaderActions";


export default class TableHeader extends React.Component {

	constructor() {
	    super();
	    this.state = {
	    	cancelButtonVisible: false,
	    }
           	      
	}

	componentWillMount() {
		this.setState({
			cancelButtonVisible: false,
		})
	}

	componentWillUnmount() {
		this.setState({
			cancelButtonVisible: false,
		})
	}

	
	handleSort(fieldName, isGrouped) {		
		if (this.props.sortDirection == "asc") {				
			this.props.dispatch(TableDataActions.toggleQuickSort(fieldName, "desc", isGrouped));
		} else {					
			this.props.dispatch(TableDataActions.toggleQuickSort(fieldName, "asc", isGrouped));
		}	
		this.setState({
			cancelButtonVisible: true,
		})
		
		
	}	

	handleCancelGroupBtnClick(fieldName) {
		// this.setState({cancelGroupBtnActivated:false});
		this.props.dispatch(TableDataActions.toggleQuickSort(fieldName, "desc", false));	
		this.setState({
			cancelButtonVisible: false,
		})
	}

	render() {
		
		const linkStyle = {
      		outline: "none",
      		cursor: "pointer"
    	};
    	
    	const { cancelButtonVisible } = this.state;

    	const sortClass = this.props.sortDirection == "asc" ? "up" : "down";
    	var headerNameTag; 
    	var sortIndicatorTag;
    	var advancedSearchTag;
    	var cancelGroupBtnTag;

    	var hasDirty = [];
	    this.props.tableData.map((data)=>{
	    	
	      hasDirty = data.values.filter((value)=>{
	      	
	          return value.isDirty === true;  
	      });
	    })

    	if (hasDirty.length == 0) {    		
    		headerNameTag = <a style={linkStyle} onClick={this.handleSort.bind(this,this.props.fieldName, false)}>{this.props.fieldName}</a>
    		
    		if (this.props.isSorted) {
    			sortIndicatorTag = <a class={"glyphicon glyphicon-menu-" + sortClass} 
	    		style={linkStyle} onClick={this.handleSort.bind(this,this.props.fieldName,false)} />					
    		} 		
    		
    		advancedSearchTag = <a class='glyphicon glyphicon-filter' style={linkStyle} 
    		onClick={this.handleSort.bind(this,this.props.fieldName,true)} />
    		

    	} else {
    		headerNameTag = <span>{this.props.fieldName}</span>
    	}
    	if (cancelButtonVisible) {
    			cancelGroupBtnTag = <a class='glyphicon glyphicon-remove' style={linkStyle} 
    			onClick={this.handleCancelGroupBtnClick.bind(this, this.props.fieldName)} />
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