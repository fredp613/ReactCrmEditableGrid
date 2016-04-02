import React from "react"
import TableDataStore from "../stores/tableDataStore";
import TableRow from "../components/TableRow";

export default class TableBody extends React.Component {
	
	
	render() {		
		      	
    	const TableRowComponents = this.props.tableData.map((data, index)=> {      		  		    		
			return <TableRow key={data.id} parentId={data.id} childValues={data.values} />	    		
    	});
    	    	    	
		return(	
			<tbody>
				{TableRowComponents}
			</tbody>						
			
		);
	}


}