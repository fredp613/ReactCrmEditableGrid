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
			saveRequired: TableDataStore.saveRequired,
			currentValue: "",
			isEditingComponent: false,
			dirtyParentIds: [],		
		}
	}	

	componentWillMount() {
		
		TableDataStore.on('change', () => {           
        	 this.setState({
        	 	isEditing: TableDataStore.isEditing,
        	 	isDirty: TableRowDataStore.isDirty,
        	 	saveRequired: TableDataStore.saveRequired,	
				currentValue: "",
				isEditingComponent: false,
				dirtyParentIds: [],	        	 	
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
				saveRequired: TableDataStore.saveRequired,
				currentValue: "",
				isEditingComponent: false,
				dirtyParentIds: [],	        	 	
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

	updateRecords() {
		console.log("updating the following records: " + this.dirtyParentIds);
	}

	handleChange(e) {		
		const newValue = e.target.value;
		TableRowDataActions.toggleDirtyMode(true);
		TableDataActions.appendDirtyRecords(this.props.parentId, this.props.fieldName, newValue)			
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
	    				field = <select defaultValue={this.props.value} onChange={this.handleChange.bind(this)}> 	    							
		    						{this.props.twoOptionsData.map((topt) => {
		    							if (this.props.fieldName == topt.crmFieldName) {
		    								return <option value={topt.value}>{topt.label}</option>		
		    							}		    							
		    						})}
	    						</select>		    			
		    		break;
		    		case "lookup":
		    			field =	<select defaultValue={this.props.value} onChange={this.handleChange.bind(this)}> 
		    						{this.props.lookupData.map((lu) => {
		    							if (this.props.fieldName == lu.crmFieldName) {
			    							return <option value={lu.value}>{lu.label}</option>		
		    							}		    									    							
		    						})}
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

