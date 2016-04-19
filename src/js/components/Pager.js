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
      this.props.dispatch(TableDataActions.toggleQuickSort(this.props.sortFieldName, this.props.sortDirection, this.props.isGrouped));
  	}

  handleDirectionButtonClick(direction, e) {    
     e.preventDefault();

     if (direction === true && (this.props.currentPage === this.props.numberOfRecords) ) {       
          return false;          
     }

     if (direction === false && (this.props.currentPage === 1)) {        
          return false;        
     }
     this.props.dispatch(TableDataActions.movePage(direction));
     this.props.dispatch(TableDataActions.toggleQuickSort(this.props.sortFieldName, this.props.sortDirection, this.props.isGrouped));
         
  }

  getNumberOfPages() {
    const remainder = this.props.originalTableDataCount % this.props.recordsPerPage; 
      var num = 1;  
        if (remainder == 0){    
          num = this.props.originalTableDataCount / this.props.recordsPerPage; 
        } else {    
          num = (this.props.originalTableDataCount / this.props.recordsPerPage) + 1
        }
      return num;
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