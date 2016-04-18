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

	componentDidMount() {
		
	}

	handleMouseOver() {
		console.log("hi")
	}

	render() {		
		
		const {isGrouped} = this.props;
		const {colSpan} = this.props //.headerCount //TableDataStore.getHeaders().length;
		
		
		const rowHoverStyle = {      		
      		cursor: "pointer"
    	};
    	

		var groupRow;


		if (this.props.tableDataGroup.length > 0 && isGrouped) {
						
			groupRow = <tr style={rowHoverStyle} onClick={this.handleGroupingClick.bind(this)}><td colSpan={colSpan}><strong>{this.props.groupRowData.sortFieldName}: {this.props.groupRowData.sortedValue}</strong></td></tr>
		} 
		
				
		
		const sortedData = this.props.dataForTable.sort((a, b) => {
			
			if (this.props.sortDirection === "asc") {
				if (a.sortedValue.toLowerCase() > b.sortedValue.toLowerCase()) {
			    	return 1;
			  	}
			    if (a.sortedValue.toLowerCase() < b.sortedValue.toLowerCase()) {
			    	return -1;
			    }						
			  // a must be equal to b
			  return 0;
			} else {
				if (a.sortedValue.toLowerCase() < b.sortedValue.toLowerCase()) {
			    	return 1;
			  	}
			    if (a.sortedValue.toLowerCase() > b.sortedValue.toLowerCase()) {
			    	return -1;
			    }
			}			
		}); 
		
		
    
		const rows = sortedData.map((data, index, arr)=> {       		  			
			return  (<TableRow key={index}  
		   		{...this.props} isVisible={this.state.groupShowing} {...data}  />)					   	 		   							   		   		
		})

  //      	let offset =  (this.props.currentPage - 1) * this.props.recordsPerPage
  //      	let itemsPerPage = this.props.recordsPerPage;              	
  //      	let pagedData = sortedData.slice(offset, (itemsPerPage + offset));
    
		// const rows = pagedData.map((data, index, arr)=> {       		  			
		// 	return  (<TableRow key={index}  
		//    		{...this.props} isVisible={this.state.groupShowing} {...data}  />)					   	 		   							   		   		
		// })
	    	    	    	
		return(	
			<tbody>	
				{groupRow}
				{rows}											
			</tbody>						
			
		);
	}


}