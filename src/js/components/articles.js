import React from "react";
import Article from "./Home/article";
import ArticleStore from "../stores/ArticleStore";
import * as ArticleActions from "../actions/ArticleActions";


export default class Entries extends React.Component {
    constructor() {
        super();
        // this.getArticles = this.getArticles.bind(this);
        this.state = {
            articles: ArticleStore.getAll(),
            titleText: "",
        };
    }

    componentWillMount() {
        ArticleStore.on('change', () => {
            this.setState({
                articles: ArticleStore.getAll(), 
                titleText:"",                        
            });
        });
    }

    componentWillUnmount() {
        ArticleStore.removeListener("change", () => {
            this.setState({
                articles: ArticleStore.getAll(), 
                titleText:"",                        
            });
        });
    }

    getArticles() {
        this.setState({
            articles: ArticleStore.getAll(), 
            titleText:"",                        
        });
    }

    changeTitle(e) {
        const titleText = e.target.value;
        this.setState({titleText});        
    }

    createArticle() {
        ArticleActions.createArticle(this.state.titleText);
    }

    reloadArticles() {
        ArticleActions.reloadArticles();
    }
    
    render() {
        const { titleText } = this.state;    
        const { articles } = this.state;
        
        const ArticleComponents = articles.map((article) => {           
            if (!article.old) {
                return <Article key={article.id} {...article} />;    
            }            
        });

        return (
            <div>                
                <div class="col-md-8">                                    
                <span>{titleText}</span>
                    <h1 class="page-header">
                        Page Heading
                        <small>Secondary Text</small>
                    </h1>
                   <button onClick={this.reloadArticles.bind(this)}>Reload</button>                       
                   <button onClick={this.createArticle.bind(this)}>Create</button>                      
                   <input type="text" onChange={this.changeTitle.bind(this)} id="blogTitleInput" value={titleText} />
                   {ArticleComponents}                    
                </div>                    
            </div>            
        );
    }


}


            