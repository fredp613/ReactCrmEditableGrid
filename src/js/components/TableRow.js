import React from "react";
import TableDataStore from "../stores/TableDataStore";
import * as TableDataActions from "../actions/TableDataActions";
import TableRowValue from "../components/TableRowValue";

export default class TableRow extends React.Component {
	
	constructor() {
		super();
		this.state = {
			isHovering: false,
		}
	}

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

	handleHover(e) {
						
		this.setState({isHovering:true})		
	}

	handleHoverDeactivate(e) {
		// if (!this.props.dirtyRecords.length > 0) {
			this.setState({isHovering:false})
		// }		
	}

	render() {	

		const visibility = this.props.isVisible ? "" : "none"
		const isVisible = {
			display: visibility,		
		}		
		
		var classForRow = "";
				
		const rowValueComponents = this.props.values.map((child, index) => {
			
			const currentRecordIsDirty = this.props.dirtyRecords.filter((dirtyRecord)=>{					
					return dirtyRecord.parentId == child.crmRecordId				
			});
						
			if (currentRecordIsDirty.length > 0) {			
				classForRow = "success"
			}

			const fieldLabel = this.getLabelForValue(child.crmFieldType, child.crmFieldName, child.value)

			if (child.crmFieldType == "lookup") {
				return <TableRowValue key={index} parentId={child.crmRecordId} fieldId={child.id} value={child.value} 
				fieldType={child.crmFieldType} fieldName={child.crmFieldName} fieldLabel={fieldLabel} lookupData={this.props.lookupData} isHovering={this.state.isHovering} {...this.props} />
			}
			if (child.crmFieldType == "boolean") {
				return <TableRowValue key={index} parentId={child.crmRecordId} fieldId={child.id} value={child.value} 
				fieldType={child.crmFieldType} fieldName={child.crmFieldName} 
				fieldLabel={fieldLabel} twoOptionsData={this.props.twoOptionsData} isHovering={this.state.isHovering} {...this.props} />	
			}
			return <TableRowValue key={index} parentId={child.crmRecordId} fieldId={child.id} value={child.value} 
			fieldType={child.crmFieldType} fieldLabel={fieldLabel} fieldName={child.crmFieldName} isHovering={this.state.isHovering} {...this.props}/>
		})
		
		return(			
			<tr class={classForRow} style={isVisible} onMouseEnter={this.handleHover.bind(this)} onMouseLeave={this.handleHoverDeactivate.bind(this)}>
				{rowValueComponents}
			</tr>
		);
	}


}