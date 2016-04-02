import React from "react";
import { Link } from "react-router";
import Header from "../components/header";
import Articles from "../components/articles"
import Footer from "../components/footer";



export default class Layout extends React.Component {
  navigate() {    
    // this.props.history.replaceState(null, "/");
    this.props.history.pushState(null, "/");
  }

  render() {
    
    const containerStyle = {
      paddingTop: "60px"
    };
    const { history } = this.props;
    
      
    return (    
        <div class="container-fluid">
           
              {/* <Header /> */}
              <h1>Editable Grid</h1>
              {this.props.children}
              {/*<Footer />*/}            
             {/* <button class="btn btn-info" onClick={this.navigate.bind(this)}>Featured</button> */}          
       </div>
    );
  }
}