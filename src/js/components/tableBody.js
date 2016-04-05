import React from "react"
import TableDataStore from "../stores/TableDataStore";
import TableDataActions from "../actions/TableDataActions";
import TableRow from "../components/TableRow";

export default class TableBody extends React.Component {
	
	constructor() {
		super();
		this.state = {
			groupShowing: true,
		}
	}

	handleGroupingClick() {
		console.log("show or hide child rows");
		if (!this.state.groupShowing) {
			this.setState({
				groupShowing: true,
			})	
		} else {
			this.setState({
				groupShowing: false,
			})	
		}
		
	}

	render() {		
			
		const isGrouped = this.props.isGrouped;
		const colSpan = TableDataStore.getHeaders().length;
		
		const rowHoverStyle = {      		
      		cursor: "pointer"
    	};


		var groupRow;
		if (isGrouped) {
			groupRow = <tr style={rowHoverStyle} onClick={this.handleGroupingClick.bind(this)}><td colSpan={colSpan}><strong>{this.props.groupRowData.sortFieldName}: {this.props.groupRowData.sortedValue}</strong></td></tr>
		}

		const rows = this.props.tableData.map((data, index, arr)=> {       		  			
			return  (<TableRow key={index}  
		   		lookupData={this.props.lookupData} isVisible={this.state.groupShowing} twoOptionsData={this.props.twoOptionsData} isEditing={this.props.isEditing} {...data}  />)					   	 		   							   		   		
		});
	
    	    	    	
		return(	
			<tbody>	
				{groupRow}
				{rows}											
			</tbody>						
			
		);
	}


}