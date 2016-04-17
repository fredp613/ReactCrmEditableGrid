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

     if (direction === true && (this.props.currentPage === this.getNumberOfPages()) ) {       
          return false;          
     }

     if (direction === false && (this.props.currentPage === 1)) {        
          return false;        
     }
     this.props.dispatch(TableDataActions.movePage(direction));
         
  }

  getNumberOfPages() {
    var remainder = this.props.tableData.length % this.props.recordsPerPage;
    var numberOfPages = 0;
    if (remainder == 0){    
      numberOfPages = this.props.tableData.length / this.props.recordsPerPage; 
    } else {    
      numberOfPages = (this.props.tableData.length / this.props.recordsPerPage) + 1
    }
    return numberOfPages    
  }


	render() {

    // const numberOfPages = (this.props.tableData.length + 1) > this.props.recordsPerPage ? (((this.props.tableData.length + 1) / this.props.recordsPerPage)) : 1

    const numberOfPages = this.getNumberOfPages();
    
    var lis = [];
    for (var i=1;i<=numberOfPages;i++) {
      
      if (this.props.currentPage === i) {
       lis.push(<li key={i} class="active"><a href="#" onClick={this.handlePageNumberClick.bind(this)}>{i}</a></li>);
      } else {
         lis.push(<li key={i} class="disable"><a href="#" onClick={this.handlePageNumberClick.bind(this)}>{i}</a></li>);
      }

      
    }
    

    var visiblePrev = {
    //   display:(this.props.currentPage === 1 ? "none" : ""),
    }

     var visibleLast = {
      // display:(this.props.currentPage === numberOfPages ? "none" : ""),
    }


    // var disablePrev = {
    //   display:(this.props.currentPage === 1 ? "none" : ""),
    // }

    //  var disableLast = {
    //   display:(this.props.currentPage === numberOfPages ? "none" : ""),
    // }



		return(
			 <nav span="10">
            <ul class="pagination pagination-sm">

              <li style={visiblePrev}>
                  <a href="#" aria-label="Previous" onClick={this.handleDirectionButtonClick.bind(this, false)}>
                    <span aria-hidden="true">&laquo;</span>
                  </a>
              </li>

              {lis}

              <li style={visibleLast} >
                <a href="#" aria-label="Next" onClick={this.handleDirectionButtonClick.bind(this, true)}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>

		);


	}


}