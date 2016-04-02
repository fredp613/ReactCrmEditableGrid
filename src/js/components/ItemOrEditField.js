import React from "react";
import ReactDOM from "react-dom"
import TableDataStore from "../stores/TableDataStore";


export default class ItemOrEditField extends React.Component {
	
	constructor() {
		super();
		this.state = {
			inEditMode: false
		}
	}	

	handleClick(ft) {
		if (!this.state.inEditMode) {
			this.setState({
				inEditMode: true
			})
		} else {
			this.setState({
				inEditMode: false
			})
		} 


	}
	

	render() {
		const tdStyle = {      			
      		cursor: "pointer",
      		textDecoration: "none, !important" 
    	}; 
    	var field;
    	if (!this.state.inEditMode) {
    		field = <div id="test" onClick={this.handleClick.bind(this, this.props.fieldType)}>{this.props.fieldValue}</div>
    	} else {
			field = <a class={this.props.fieldType} style={tdStyle} onClick={this.handleClick.bind(this, this.props.fieldType)}>{this.props.fieldValue}</a> 
    	}

    	 // = ReactDOM.render(<div id={this.props.isEditing ? 'msg' : null}>Hello World!</div>, mountNode)
    		//  // <a class={this.props.fieldType} style={tdStyle}>{this.props.value}</a> 
    	

		return(
			<span>	
				{field}
			</span>
		);
	}

}