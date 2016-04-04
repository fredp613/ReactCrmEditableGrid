import React from "react";
import TableDataStore from "../stores/TableDataStore";
import * as TableDataActions from "../actions/TableDataActions";
import TableRowValue from "../components/TableRowValue";

export default class TableRow extends React.Component {
	

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

		const visibility = this.props.isVisible ? "" : "none"
		const isVisible = {
			display: visibility,
		}

				
		const rowValueComponents = this.props.values.map((child, index) => {
			const fieldLabel = this.getLabelForValue(child.crmFieldType, child.crmFieldName, child.value)

			if (child.crmFieldType == "lookup") {
				return <TableRowValue key={index} parentId={child.crmRecordId} fieldId={child.id} value={child.value} 
				fieldType={child.crmFieldType} fieldName={child.crmFieldName} fieldLabel={fieldLabel} lookupData={this.props.lookupData}/>
			}
			if (child.crmFieldType == "boolean") {
				return <TableRowValue key={index} parentId={child.crmRecordId} fieldId={child.id} value={child.value} 
				fieldType={child.crmFieldType} fieldName={child.crmFieldName} 
				fieldLabel={fieldLabel} twoOptionsData={this.props.twoOptionsData}/>	
			}
			return <TableRowValue key={index} parentId={child.crmRecordId} fieldId={child.id} value={child.value} 
			fieldType={child.crmFieldType} fieldLabel={fieldLabel} fieldName={child.crmFieldName}/>
		})
		
		return(			
			<tr style={isVisible}>
				{rowValueComponents}
			</tr>
		);
	}


}