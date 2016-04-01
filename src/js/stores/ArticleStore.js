import { EventEmitter } from "events";
import dispatcher from "../dispatcher";


class ArticleStore extends EventEmitter {
	constructor() {
		super()
		this.articles = [
			{
				id: 1,
				title: "asdfsfddsaf",
				old: true
			},
			{
				id: 2,
				title: "234324asdfsfddsaf",
				old: false
			},
			{
				id: 3,
				title: "234324asdfsfddsaf",
				old: false
			},
			

		]
	}

	createArticle(title) {

		const id = Date.now();
		this.articles.push({
			id,
			title,
			old:false
		});		 		
		this.emit("change");
		
	}

	getAll() {
		return this.articles;
	}

	handleActions(action) {
		switch(action.type) {
			case "CREATE_ARTICLE": 
				this.createArticle(action.text);
				break;
			case "RECEIVE_ARTICLES": 				
				this.articles = action.articles;
				this.emit("change");
				break;			
			case "FETCH_ARTICLES": 
				this.articles = this.articles;
				break;			
			case "FETCH_ARTICLES_ERROR": 
				break;			
		}
	}

}

const articleStore = new ArticleStore;
dispatcher.register(articleStore.handleActions.bind(articleStore));
window.dispatcher = dispatcher;
export default articleStore;






















