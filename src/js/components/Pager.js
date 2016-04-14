import React from "react";
import ReactDOM from "react-dom";
import * as TableDataActions from "../actions/TableDataActions";

export default class Pager extends React.Component {
	constructor() {
		super();
	}

	handlePageNumberClick(e) {
      e.preventDefault();  
      const pageNumber = e.target.text;
      this.props.dispatch(TableDataActions.selectPageNumber(pageNumber)); 
  	}

  handleDirectionButtonClick(direction, e) {    
     e.preventDefault();
     this.props.dispatch(TableDataActions.movePage(direction))
  }
	render() {

    var lis = [];
    for (var i=1;i<=this.props.numberOfPages;i++) {
      console.log(this.props.currentPage + " - " + i)
      if (this.props.currentPage === i) {
       lis.push(<li key={i} class="active"><a href="#" onClick={this.handlePageNumberClick.bind(this)}>{i}</a></li>);
      } else {
         lis.push(<li key={i} class="disable"><a href="#" onClick={this.handlePageNumberClick.bind(this)}>{i}</a></li>);
      }

      
    }
    console.log(lis)

    var visiblePrev = {
      display:(this.props.currentPage === 1 ? "none" : ""),
    }

     var visibleLast = {
      display:(this.props.currentPage === this.props.numberOfPages ? "none" : ""),
    }

		return(
			 <nav span="10">
            <ul class="pagination pagination-sm">

              <li style={visiblePrev}>
                  <a href="#" aria-label="Previous" onClick={this.handleDirectionButtonClick.bind(this, false)}>
                    <span aria-hidden="true">&laquo;</span>
                  </a>
              </li>

              {lis}

              <li style={visibleLast}>
                <a href="#" aria-label="Next" onClick={this.handleDirectionButtonClick.bind(this, true)}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>

		);


	}


}