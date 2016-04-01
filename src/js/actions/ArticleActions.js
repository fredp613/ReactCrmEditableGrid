import dispatcher from "../dispatcher";

export function createArticle(text) {
	dispatcher.dispatch({
		type: "CREATE_ARTICLE",
		text,
	});
}

export function deleteArticle(id) {
	dispatcher.dispatch({
		type: "DELETE_ARTICLE",
		id,
	});
}

export function reloadArticles() {
	// axios("http://someurl.com/somdataendpoint").then((data)=> {
	// 	console.log("got some data");
	// })
	dispatcher.dispatch({
		type: "FETCH_ARTICLES",		
	})
	setTimeout(()=> {
		dispatcher.dispatch({type: "RECEIVE_ARTICLES", articles : [
				{
					id: 434,
					title: "AGAOM asdfsfddsaf",
					old: false,
				},
				{
					id: 234,
					title: "asfasf 234324asdfsfddsaf",
					old: false,
				},
				{
					id: 214,
					title: "farnk 234324asdfsfddsaf",
					old: true,
				}
			]
		});
		if (false) {
			dispatcher.dispatch({type: "FETCH_ARTICLES_ERROR"});	
		}
	}, 2000);
}