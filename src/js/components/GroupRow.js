import React from "react"
import TableDataStore from "../stores/TableDataStore";
import TableDataActions from "../actions/TableDataActions";
import TableRow from "../components/TableRow";

export default class TableBody extends React.Component {
	
	constructor() {
		super();
		this.state = {
			isGrouped: TableDataStore.isGrouped,
		}
	}

	componentWillMount() {
		TableDataStore.on('change', ()=> {
			this.setState({
				isGrouped: TableDataStore.isGrouped,
			})
		})
	}


	componentWillUnmount() {
		TableDataStore.removeListener('change', ()=> {
			this.setState({
				isGrouped: TableDataStore.isGrouped,
			})
		})

	}


	

	render() {		
		const { isGrouped } = this.state;
		console.log(isGrouped)
    	const TableRowComponents = this.props.tableData.map((data, index, arr)=> {   
    			
				return	(<TableRow key={index} values={data.values} 
					   				lookupData={this.props.lookupData} twoOptionsData={this.props.twoOptionsData} />)
	   		   		
    	});
    	    	    	
		return(	
			<tr>	
				<GroupRow />	
				{TableRowComponents}
			</tr>						
			
		);
	}


}