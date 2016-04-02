import React from "react";
import TableDataStore from "../stores/TableDataStore";
import * as TableDataActions from "../actions/TableDataActions";
import TableRowValue from "../components/TableRowValue";

export default class TableRow extends React.Component {
	
		
	render() {	

		const rowValueComponents = this.props.childValues.map((child) => {
			return <TableRowValue key={child.id} value={child.value} fieldType={child.crmFieldType} />
		})
		
		return(
			<tr>
				{rowValueComponents}
			</tr>
		);
	}


}