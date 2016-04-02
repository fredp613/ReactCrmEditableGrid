import React from "react";
import TableDataStore from "../stores/TableDataStore";
import * as TableDataActions from "../actions/TableDataActions";
import ItemOrEditField from "../components/ItemOrEditField";


export default class TableRow extends React.Component {
	
	constructor() {
		super();
		this.state = {
			isEditing: false,	
			currentValue: ""		
		}
	}	

	componentWillMount() {
		this.setState({
			isEditing: false,	
			currentValue: this.props.value
		});
	}

	componentWillUnmount() {
		this.setState({
			isEditing: false,	
			currentValue: this.props.value
		});	
	}
	

	handleClick(value, ft) {
		
		const val = value
		console.log(val)

		if (!this.state.isEditing) {
			TableDataActions.toggleEditingMode(true),
			this.setState({
				isEditing: true,
				currentValue: val,
			})
		} else {
			isEditing: TableDataActions.toggleEditingMode(false),
			this.setState({
				isEditing: false,
				// currentValue: val,
			})
		}
	}

	handleChange(e) {
		const newValue = e.target.value;
		this.setState({
			currentValue: newValue
		})
	}

	render() {
		const tdStyle = {      			
      		cursor: "pointer",
      		textDecoration: "none, !important" 
    	}; 
    	const gkey = Date.now();
    	var field;
    	if (!this.state.isEditing) {	
    		field = <a class={this.props.fieldType} style={tdStyle} onClick={this.handleClick.bind(this, this.props.value, this.props.fieldType)}>{this.props.value}</a> 
    	} else {
    		switch(this.props.fieldType) {
    			case "crmShortText":    				
					field = <input type="text" value={this.state.currentValue} onChange={this.handleChange.bind(this)} />	    				    			
    			break;
    			case "boolean":
	    			field = <select defaultValue={this.props.value =="true" ? "Yes" : "No"}>
	    				<option value="Yes">Yes</option>
	    				<option value="No">No</option>
	    			</select>
    			break;
    		}    		
    	}

		return(
			<td>	
				{field}
			</td>
		);
	}

}