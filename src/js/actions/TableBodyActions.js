import dispatcher from "../dispatcher";


export function fetchBodyData() {
	// axios("http://someurl.com/somdataendpoint").then((data)=> {
	// 	console.log("got some data");
	// })
	dispatcher.dispatch({
		type: "FETCH_BODY_DATA",		
	})
	setTimeout(()=> {
		dispatcher.dispatch({type: "RECEIVE_BODY", bodyData : [
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
					fieldValue: "234324asdfsfddsaf",									
				},
				{
					id: 5,
					fieldValue: "234324asdfsfddsaf",									
				},
				{
					id: 6,
					fieldValue: "234324asdfsfddsaf",									
				},
				{
					id: 7,
					fieldValue: "234324asdfsfddsaf",									
				},	
				

			]
		});
		if (false) {
			dispatcher.dispatch({type: "FETCH_BODY_DATA_ERROR"});	
		}
	}, 1000);
}