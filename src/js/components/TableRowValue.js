import React from "react";
import TableDataStore from "../stores/TableDataStore";
import TableRowDataStore from "../stores/TableDataStore";
import * as TableDataActions from "../actions/TableDataActions";
import * as TableRowDataActions from "../actions/TableRowDataActions";
import ItemOrEditField from "../components/ItemOrEditField";


export default class TableRow extends React.Component {
	
	constructor() {
		super();
		this.state = {
			isEditing: TableDataStore.isEditing,	
			isDirty: TableRowDataStore.isDirty,
			currentValue: "",
			isEditingComponent: false		
		}
	}	

	componentWillMount() {
		
		TableDataStore.on('change', () => {           
        	 this.setState({
        	 	isEditing: TableDataStore.isEditing,
        	 	isDirty: TableRowDataStore.isDirty,	
				currentValue: "",
				isEditingComponent: false	        	 	
        	 });
        });

        TableRowDataStore.on('change', () => {           
        	 this.setState({        	 	
        	 	isDirty: TableRowDataStore.isDirty,						        	 	
        	 });
        });

	}
	

	componentWillUnmount() {
		TableDataStore.removeListener('change', () => {           
        	 this.setState({
				isEditing: TableDataStore.isEditing,
				isDirty: TableRowDataStore.isDirty,	
				currentValue: "",
				isEditingComponent: false	        	 	
        	 });
        });	
        TableRowDataStore.removeListener('change', () => {           
        	 this.setState({        	 	
        	 	isDirty: TableRowDataStore.isDirty,		        	 	
        	 });
        });
	}
	

	handleClick(value, ft) {
		
		if (!this.state.isEditing) {
			TableDataActions.toggleEditingMode(true);
		}

		const val = value		
		if (!this.state.isEditingComponent) {
						
			this.setState({			
				isEditingComponent: true,
				currentValue: val,
			})

		} 
	}

	handleChange(e) {
		console.log("changed")
		const newValue = e.target.value;
		TableRowDataActions.toggleDirtyMode(true)
		this.setState({
			currentValue: newValue
		});
	}

	render() {
		const tdStyle = {      			
      		cursor: "pointer",
      		textDecoration: "none, !important" 
    	}; 
    	const gkey = Date.now();
    	var field;

    	if (this.state.isEditing) {
    		if (!this.state.isEditingComponent) {	
    			field = <a class={this.props.fieldType} style={tdStyle} onClick={this.handleClick.bind(this, this.props.value, this.props.fieldType)}>{this.props.value}</a> 
	    	} else {
	    		switch(this.props.fieldType) {
	    			case "crmShortText":    				
						field = <input type="text" value={this.state.currentValue} onChange={this.handleChange.bind(this)} />	    				    			
	    			break;
	    			case "boolean":
		    			field = <select defaultValue={this.props.value =="true" ? "Yes" : "No"} onChange={this.handleChange.bind(this)}>
		    				<option value="Yes">Yes</option>
		    				<option value="No">No</option>
		    			</select>
	    			break;
	    		}    		
	    	}
    	} else {
    		field = <a class={this.props.fieldType} style={tdStyle} onClick={this.handleClick.bind(this, this.props.value, this.props.fieldType)}>{this.props.value}</a> 
    	}
    	
		return(
			<td>	
				{field}
			</td>
		);
	}

}