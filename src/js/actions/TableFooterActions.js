import dispatcher from "../dispatcher";


export function fetchHeaders() {
	// axios("http://someurl.com/somdataendpoint").then((data)=> {
	// 	console.log("got some data");
	// })
	dispatcher.dispatch({
		type: "FETCH_FOOTERS",		
	})
	setTimeout(()=> {
		dispatcher.dispatch({type: "RECEIVE_FOOTERS", footers : [
				{
					id: 434,
					title: "AGAOM asdfsfddsaf",					
				},
				{
					id: 234,
					title: "asfasf 234324asdfsfddsaf",					
				},
				{
					id: 214,
					title: "farnk 234324asdfsfddsaf",					
				}
			]
		});
		if (false) {
			dispatcher.dispatch({type: "FETCH_FOOTERS_ERROR"});	
		}
	}, 1000);
}