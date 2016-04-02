import React from "react"

export default class TableHeader extends React.Component {
	
	render() {
		const linkStyle = {
      		outline: "none",
      		cursor: "pointer"
    	};

		return(										
			<th>{this.props.fieldName} <a class='glyphicon glyphicon-menu-up' style={linkStyle} /><a class='glyphicon glyphicon-menu-down' style={linkStyle} /><a class='glyphicon glyphicon-filter' style={linkStyle} /></th>							
		);
	}


}