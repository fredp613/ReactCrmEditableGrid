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
			currentValue: null,						
		}
	}	

	componentWillMount() {
		this.setState({
			currentValue: null,						
		});
	}

	updateRecords() {
		console.log("updating the following records: " + this.dirtyParentIds);
	}

	handleChange(e) {		
		e.preventDefault();
		const newValue = e.target.value;
		this.props.dispatch(TableDataActions.appendDirtyRecords(this.props.parentId, this.props.fieldId, this.props.fieldName, newValue));
						
		this.setState({
			currentValue: e.target.value,									
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
      		textDecoration: "none, !important", 
      		color: "black", 
      		paddingRight: "16px",
    		paddingLeft: "16px",     

    	}; 

    	const gkey = Date.now();
    	

    	const maxwidth = {
    		maxWidth:"150px",
    		width: "150px",
  		}  		    	

    	var field;
    	const currentVal = this.state.currentValue != null ? this.state.currentValue : this.props.value		    			
		const currentValLabel = this.getLabelForValue(this.props.fieldType, this.props.fieldName, currentVal)
    	
    	   
		if (!this.props.isHovering) {    								    		
			field = <a class={this.props.fieldType} style={tdStyle}>{currentValLabel}</a> 
    	} else {
    		switch(this.props.fieldType) {
    			case "crmShortText":    				
					field = <input class="form-control" key="1" type="text" value={currentVal} onChange={this.handleChange.bind(this)}/>
    			break;
    			case "boolean":
    				field = <select class="form-control" key="2" defaultValue={currentVal} onChange={this.handleChange.bind(this)} > 	    							
	    						{this.props.twoOptionsData.map((topt) => {		    							
	    							if (this.props.fieldName == topt.crmFieldName) {
	    								return <option key={topt.value} value={topt.value}>{topt.label}</option>		
	    							}		    							
	    						})}
    						</select>	    			
	    		break;
	    		case "lookup":
	    			field =	<select class="form-control" key="3" defaultValue={currentVal} onChange={this.handleChange.bind(this)}  > 
	    						{this.props.lookupData.map((lu) => {
	    							if (this.props.fieldName == lu.crmFieldName) {
		    							return <option key={lu.value} value={lu.value}>{lu.label}</option>		
	    							}		    									    							
	    						})}
    						</select>
    			break;
    			default:
    			  field = <a key="9" class={this.props.fieldType} style={tdStyle}>{currentValLabel}</a> 
    			 break;
    		}    		
    	}
	
    	
		return(
			<td style={maxwidth}>	
				{field}
			</td>
		);
	}

}
