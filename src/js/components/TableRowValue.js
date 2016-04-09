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
			currentValue: null,
			isEditingComponent: false,
			dirtyParentIds: [],		
		}
	}	

	componentWillMount() {
		TableDataStore.on('change', ()=> {			
			this.state.currentValue = null;
			this.state.isEditingComponent = false;
			this.state.dirtyParentIds = [];
			this.state.isEditing = TableDataStore.isEditing
		})
	}

	componentWillUnmount() {
		TableDataStore.removeListener('change', ()=> {	
			this.state.isEditingComponent = false;	
			this.state.currentValue = null;	
			this.state.dirtyParentIds = [];
			this.state.isEditing = TableDataStore.isEditing				
		})
	}	

	handleCellClick(value, ft) {		
		
		if (!this.props.isEditing) {
			TableDataActions.toggleEditingMode(true);
		}
		
		const val = value		
		if (!this.state.isEditingComponent) {								
			this.state.isEditingComponent = true
			this.state.currentValue = val
			this.state.dirtyParentIds = []			
		} 
		this.setState({})
	}

	handleRowCancelClick(e) {				
		this.setState({
			isEditing: true,
			isEditingComponent: false,
			currentValue: e.target.value,
		})
	}

	updateRecords() {
		console.log("updating the following records: " + this.dirtyParentIds);
	}

	handleChange(e) {		
		const newValue = e.target.value;
		TableRowDataActions.toggleDirtyMode(true);
		TableDataActions.appendDirtyRecords(this.props.parentId, this.props.fieldId, this.props.fieldName, newValue);					
		this.setState({
			currentValue: e.target.value
		});
	}

	getLabelForValue(fieldType, fieldName, value) {
		switch(fieldType) {
			case "boolean":
				return this.props.twoOptionsData.map((to)=>{
						if (to.crmFieldName == fieldName) {
							if (to.value == value) {
							return to.label;
						}	
					}					
				})
			break;
			case "lookup":
				return this.props.lookupData.map((to)=>{
							if (to.crmFieldName == fieldName) {
								if (to.value == value) {
								return to.label;
							}	
						}					
					})
			break;
			default:
				return value;
			break;
		}

	}

	
	render() {		
				
		const tdStyle = {      			
      		cursor: "pointer",
      		textDecoration: "none, !important" 
    	}; 
    	const gkey = Date.now();
    	

    	const maxwidth = {
    		maxWidth:"40px"
    	}

    	// const isEditing = this.props.isEditing;

    	var field;
    	const currentVal = this.state.currentValue != null ? this.state.currentValue : this.props.value		    			
		const currentValLabel = this.getLabelForValue(this.props.fieldType, this.props.fieldName, currentVal)
    	if (this.props.isEditing) {    					
    		if (!this.state.isEditingComponent) {	    	    			
    			field = <a class={this.props.fieldType} style={tdStyle} onClick={this.handleCellClick.bind(this, currentVal, this.props.fieldType)}>{currentValLabel}</a> 
	    	} else {
	    		switch(this.props.fieldType) {
	    			case "crmShortText":    				
						field = <input type="text" value={currentVal} onChange={this.handleChange.bind(this)}/>
	    			break;
	    			case "boolean":
	    				field = <select defaultValue={currentVal} onChange={this.handleChange.bind(this)} > 	    							
		    						{this.props.twoOptionsData.map((topt) => {		    							
		    							if (this.props.fieldName == topt.crmFieldName) {
		    								return <option key={topt.value} value={topt.value}>{topt.label}</option>		
		    							}		    							
		    						})}
	    						</select>	    			
		    		break;
		    		case "lookup":
		    			field =	<select defaultValue={currentVal} onChange={this.handleChange.bind(this)}  > 
		    						{this.props.lookupData.map((lu) => {
		    							if (this.props.fieldName == lu.crmFieldName) {
			    							return <option key={lu.value} value={lu.value}>{lu.label}</option>		
		    							}		    									    							
		    						})}
	    						</select>
	    			break;
	    		}    		
	    	}
    	} else {
    		field = <a class={this.props.fieldType} style={tdStyle} onClick={this.handleCellClick.bind(this, currentVal, this.props.fieldType)}>{currentValLabel}</a> 
    	}
    	
		return(
			<td style={maxwidth}>	
				{field}
			</td>
		);
	}

}

