class SampleData {

	constructor() {
		this.tableDataFromTheOutside = [
			{
				id: "1z",
				crmRecordId: "431212",
				crmFieldName: "firstName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "John",
				grouping: "",
			},
			{
				id: "2x",
				crmRecordId: "431212",
				crmFieldName: "lastName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "Smith",
				grouping: "",
			},					
			{
				id: "3x",
				crmRecordId: "431212",
				crmFieldName: "isActive",
				crmFieldType: "boolean",
				sortDirection: "asc",
				value: "0",
				grouping: "",
			},		
			{
				id: "371",
				crmRecordId: "431212",
				crmFieldName: "isAboriginal",
				crmFieldType: "boolean",
				sortDirection: "desc",
				value: "1",
				grouping: "",
			},	
			{
				id: "382",
				crmRecordId: "431212",
				crmFieldName: "Category",
				crmFieldType: "lookup",
				sortDirection: "desc",
				value: "140012",
				grouping: "",
			},	
			{
				id: "5xxxx",
				crmRecordId: "4312123",
				crmFieldName: "firstName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "Mike",
				grouping: "",
			},
			{
				id: "6121213x",
				crmRecordId: "4312123",
				crmFieldName: "lastName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "JonesU",
				grouping: "",
			},		
			{
				id: "30fgfg",
				crmRecordId: "4312123",
				crmFieldName: "isActive",
				crmFieldType: "boolean",
				sortDirection: "asc",
				value: "0",
				grouping: "",
			},	
			{
				id: "3443565",
				crmRecordId: "4312123",
				crmFieldName: "isAboriginal",
				crmFieldType: "boolean",
				sortDirection: "desc",
				value: "0",
				grouping: "",
			},	
			{
				id: "35xxxxxx",
				crmRecordId: "4312123",
				crmFieldName: "Category",
				crmFieldType: "lookup",
				sortDirection: "desc",
				value: "140012",
				grouping: "",
			},
			{
				id: "7f1111",
				crmRecordId: "4312124",
				crmFieldName: "firstName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "Mike",
				grouping: "",
			},
			{
				id: "68",
				crmRecordId: "4312124",
				crmFieldName: "lastName",
				crmFieldType: "crmShortText",
				sortDirection: "desc",
				value: "Jones",
				grouping: "",
			},
			{
				id: "3132x32",
				crmRecordId: "4312124",
				crmFieldName: "isActive",
				crmFieldType: "boolean",
				sortDirection: "asc",
				value: "1",
				grouping: "",
			},
			{
				id: "32axsdfasdf",
				crmRecordId: "4312124",
				crmFieldName: "isAboriginal",
				crmFieldType: "boolean",
				sortDirection: "desc",
				value: "0",
				grouping: "",
			},	
			{
				id: "33trxerefsdf",
				crmRecordId: "4312124",
				crmFieldName: "Category",
				crmFieldType: "lookup",
				sortDirection: "desc",
				value: "140013",
				grouping: "",
			},


		];
		this.lookupData = [
			{
			crmFieldId: "4324",
			crmFieldName: "Category",
			value: "140012",
			label: "Category 1",
			},
			{
				
				crmFieldId: "4324",
				crmFieldName: "Category",
				value: "140013",
				label: "Category 2",
			},
			{
				
				crmFieldId: "4324",
				crmFieldName: "Category",
				value: "140014",
				label: "Category 3",
			},
			{
				
				crmFieldId: "4324",
				crmFieldName: "Category",
				value: "140015",
				label: "Category 4",
			},

		];

		this.twoOptionsData = [
			{
				crmFieldId: "123",
				crmFieldName: "isActive",				
				value: "0",
				label: "No",
			},
			{
				crmFieldId: "123",
				crmFieldName: "isActive",
				value: "1",
				label: "Yes",
			},
			{
				crmFieldId: "124",
				crmFieldName: "isAboriginal",				
				value: "0",
				label: "No",
			},
			{
				crmFieldId: "124",
				crmFieldName: "isAboriginal",
				value: "1",
				label: "Yes",
			},


		];
	}

}

const sampleData = new SampleData;
export default sampleData;