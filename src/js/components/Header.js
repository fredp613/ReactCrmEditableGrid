
import React from "react";


export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
        collapsed: true
    }
  }  
  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { collapsed } = this.state;
    const navClass = collapsed ? "collapse" : "";            
    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container-fluid">
            
            <div class="navbar-header">         
                <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)}>
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">First React App</a>
            </div>
            
            <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="#">Featured</a>
                    </li>
                    <li>
                        <a href="#/archives">Archives</a>
                    </li>
                    <li>
                        <a href="#/settings">Settings</a>
                    </li>
                </ul>
            </div>
            
        </div>        
    </nav>
    );
  }
}



   