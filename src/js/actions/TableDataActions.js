import dispatcher from "../dispatcher";



	
	
	export function toggleEditingMode(isEditing) {
		dispatcher.dispatch({
			type: "TOGGLE_EDITING_MODE",
			isEditing,
		});
	}



	export function fetchTableData() {
	// axios("http://someurl.com/somdataendpoint").then((data)=> {
	// 	console.log("got some data");
	// })

	setTimeout(()=> {
		dispatcher.dispatch({type: "RECEIVE_TABLE_DATA", bodyData : [
				{
					id: 1,
					fieldName: "egcs_name1",
					fieldType: "lookup",
					values: [
						{
							id: 1,
							fieldValue: "asdfsfddsaf",										
						},
						{
							id: 2,
							fieldValue: "234324asdfsfddsaf",															
						},
						{
							id: 3,
							fieldValue: "234324asdfsfddsaf",															
						},
						{
							id: 4,
							fieldValue: "sadf",															
						},
						{
							id: 5,
							fieldValue: "asdfasdf",															
						},
						{
							id: 6,
							fieldValue: "234324asdfsfddsaf",															
						},
						{
							id: 7,
							fieldValue: "sadfesfd",															
						},

					]

				},
				{
					id: 2,
					fieldName: "egcs_name2",
					fieldType: "boolean",
					values: [
						{
							id: 211,
							fieldValue: true,										
						},
						{
							id: 232,
							fieldValue: false,															
						},
						{
							id: 1113,
							fieldValue: true,															
						},
						{
							id: 4545,
							fieldValue: true,															
						},
						{
							id: 43255,
							fieldValue: false,															
						},
						{
							id: 6000,
							fieldValue: true,															
						},
						{
							id: 7000,
							fieldValue: false,															
						},

					]

				},
				{
					id: 3,
					fieldName: "egcs_name3",
					fieldType: "currency",
					values: [
						{
							id: 8,
							fieldValue: "25,000",										
						},
						{
							id: 9,
							fieldValue: "30,300",															
						},
						{
							id: 10,
							fieldValue: "10,000",															
						},
						{
							id: 11,
							fieldValue: "15,000",															
						},
						{
							id: 12,
							fieldValue: "5,000",															
						},
						{
							id: 13,
							fieldValue: "20,000",															
						},
						{
							id: 14,
							fieldValue: "35,000",															
						},

					]

				},
				{
					id: 4,
					fieldName: "egcs_name4",
					fieldType: "option",
					values: [
						{
							id: 15,
							fieldValue: "asdfsfddsaf",										
						},
						{
							id: 16,
							fieldValue: "234324asdfsfddsaf",															
						},
						{
							id: 17,
							fieldValue: "234324asdfsfddsaf",															
						},
						{
							id: 18,
							fieldValue: "sadf",															
						},
						{
							id: 19,
							fieldValue: "asdfasdf",															
						},
						{
							id: 20,
							fieldValue: "234324asdfsfddsaf",															
						},
						{
							id: 21,
							fieldValue: "sadfesfd",															
						},

					]

				},
				
					
			]
		});

		if (false) {
			dispatcher.dispatch({type: "FETCH_TABLE_DATA_ERROR"});	
		}
		
	}, 1000);
}