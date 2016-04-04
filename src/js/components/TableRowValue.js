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

	componentDidMount() {
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
	

	handleMouseOver(value, ft) {
		
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

	handleMouseOut(e) {		
		this.setState({
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
		TableDataActions.appendDirtyRecords(this.props.parentId, this.props.fieldId, this.props.fieldName, newValue)			
		console.log(TableDataStore.dirtyRecords);
		this.setState({
			currentValue: newValue
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
    	var field;

    	const maxwidth = {
    		maxWidth:"40px"
    	}


    	// if (this.state.isEditing) {
    		const currentVal = this.state.currentValue != "" ? this.state.currentValue : this.props.value		    			
			const currentValLabel = this.getLabelForValue(this.props.fieldType, this.props.fieldName, currentVal)
			
    		if (!this.state.isEditingComponent) {	    	
    			
    			field = <a class={this.props.fieldType} style={tdStyle}     			
    			onMouseOver={this.handleMouseOver.bind(this, this.state.currentValue, this.props.fieldType)}>{currentValLabel}</a> 
	    	} else {
	    		switch(this.props.fieldType) {
	    			case "crmShortText":    				
						field = <input type="text" value={currentVal} onChange={this.handleChange.bind(this)} onMouseOut = {this.handleMouseOut.bind(this)}/>
	    			break;
	    			case "boolean":
	    				field = <select defaultValue={currentVal} onChange={this.handleChange.bind(this)} onMouseOut = {this.handleMouseOut.bind(this)} > 	    							
		    						{this.props.twoOptionsData.map((topt) => {		    							
		    							if (this.props.fieldName == topt.crmFieldName) {
		    								return <option key={topt.value} value={topt.value}>{topt.label}</option>		
		    							}		    							
		    						})}
	    						</select>	    			
		    		break;
		    		case "lookup":
		    			field =	<select defaultValue={currentVal} onChange={this.handleChange.bind(this)} onMouseOut = {this.handleMouseOut.bind(this)} > 
		    						{this.props.lookupData.map((lu) => {
		    							if (this.props.fieldName == lu.crmFieldName) {
			    							return <option key={lu.value} value={lu.value}>{lu.label}</option>		
		    							}		    									    							
		    						})}
	    						</select>
	    			break;
	    		}    		
	    	}
    	// } else {
    	// 	field = <a class={this.props.fieldType} style={tdStyle} onMouseOver={this.handleMouseOver.bind(this, this.props.value, this.props.fieldType)} >{this.props.fieldLabel}</a> 
    	// }
    	
		return(
			<td style={maxwidth}>	
				{field}
			</td>
		);
	}

}

