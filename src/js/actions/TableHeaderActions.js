import dispatcher from "../dispatcher";


export function fetchHeaders() {
	// axios("http://someurl.com/somdataendpoint").then((data)=> {
	// 	console.log("got some data");
	// })
	dispatcher.dispatch({
		type: "FETCH_HEADERS",		
	})
	setTimeout(()=> {
		dispatcher.dispatch({type: "RECEIVE_HEADERS", headers : [
				{
					id: 434,
					title: "AGAOM asdfsfddsaf",
					fieldType: "plainText",					
				},
				{
					id: 234,
					title: "asfasf 234324asdfsfddsaf",					
					fieldType: "date",
				},
				{
					id: 214,
					title: "farnk 234324asdfsfddsaf",					
					fieldType: "lookup"
				},	
				{
					id: 215,
					title: "farnk 234324asdfsfddsaf",					
					fieldType: "currency",
				},
			]
		});
		if (false) {
			dispatcher.dispatch({type: "FETCH_HEADERS_ERROR"});	
		}
	}, 1000);
}