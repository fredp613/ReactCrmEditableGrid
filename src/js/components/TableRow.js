import React from "react";
import TableDataStore from "../stores/TableDataStore";
import * as TableDataActions from "../actions/TableDataActions";
import TableRowValue from "../components/TableRowValue";

export default class TableRow extends React.Component {
	
		
	render() {	

		const rowValueComponents = this.props.childValues.map((child) => {
			if (child.crmFieldType == "lookup") {
				return <TableRowValue key={child.id} value={child.value} fieldType={child.crmFieldType} fieldName={child.crmFieldName} lookupData={this.props.lookupData}/>
			}
			if (child.crmFieldType == "boolean") {
				return <TableRowValue key={child.id} value={child.value} fieldType={child.crmFieldType} fieldName={child.crmFieldName} twoOptionsData={this.props.twoOptionsData}/>	
			}
			return <TableRowValue key={child.id} value={child.value} fieldType={child.crmFieldType} fieldName={child.crmFieldName}/>
		})
		
		return(
			<tr>
				{rowValueComponents}
			</tr>
		);
	}


}