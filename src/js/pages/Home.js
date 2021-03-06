import React from "react";
import TableDataStore from "../stores/TableDataStore";
import TableRowDataStore from "../stores/TableRowDataStore";
import * as TableDataActions from "../actions/TableDataActions";
import * as TableRowDataActions from "../actions/TableRowDataActions";
import TableHeader from "../components/tableHeader";
import TableFooter from "../components/tableFooter";
import TableBody from "../components/tableBody";
import Pager from "../components/Pager";
import lodash from "lodash";
import ReactTransitionGroup  from "react-addons-transition-group"
import ReactCSSTransitionGroup  from "react-addons-css-transition-group"
import { connect } from 'react-redux';
import css from "../../css/app.css";
import _ from "lodash";

 
class Home extends React.Component {
  
  constructor() {
      super();
      this.state = {
        searchText: "",
        isSearching: false, 
        isEditing: false,                     
      }                          
  }

  componentWillMount() {
    this.props.dispatch(TableDataActions.fetchData())
    this.props.dispatch(TableDataActions.getPagedData())

  }
     
  handleClearBtnClick() {
      this.setState({isSearching:false, searchText:"",})
      this.refs.searchInput.focus();
  } 

  handleSearchTextChange(e) { 
    
    if (e.target.value.length > 0) {
        this.setState({searchText:e.target.value, isSearching:true})
    } else {
        this.setState({searchText:e.target.value, isSearching:false})
    }
    
  }

  handleSearchButtonAction() {       
    this.setState({searchText:""})
  }

  handeCancelBtnClick() {      
       this.refs.searchInput.focus();         
       this.props.dispatch(TableDataActions.cancelDirtyRecords())
       this.props.dispatch(TableDataActions.toggleQuickSort(this.props.sortFieldName, this.props.sortDirection, false));
      
  }

  handleSaveBtnClick() {  
     
      // this.props.dispatch.updateDirtyRecords();      
      this.refs.searchInput.focus();          
      this.props.dispatch(TableDataActions.updateDirtyRecords())
       // this.props.dispatch(TableDataActions.toggleQuickSort(this.props.sortFieldName, this.props.sortDirection, false));
      

  }

  handleGenerateNewUserIdClick(e) {
    e.preventDefault();    
    // this.props.dispatch(TableDataActions.generateUserId())
    this.props.dispatch(TableDataActions.generateUserIdIfOdd())

  }

  handleGenerateNewUserIdClickAsync(e) {
    e.preventDefault();    
    // this.props.dispatch(TableDataActions.generateUserId())
    this.props.dispatch(TableDataActions.generateUserIdAsync())

  }

  handleRecordsPerPageChange(e) {
    this.props.dispatch(TableDataActions.setRecordsPerPage(e.target.value))
    this.props.dispatch(TableDataActions.toggleQuickSort(this.props.sortFieldName, this.props.sortDirection, this.props.isGrouped));
  }

  render() {

    const { searchText } = this.state;        
    const { tableData } = this.props;
    const { rowValues } = this.props;
    const { lookupData } = this.props;    
    const { twoOptionsData } = this.props;
    const { isGrouped } = this.props;   
    const { isSearching } = this.state;
    const { originalTableDataCount } = this.props;
    const { recordsPerPage } = this.props;
    const closeIconActive = isSearching ? "glyphicon glyphicon-remove-circle close-icon-active" : "glyphicon glyphicon-remove-circle close-icon-inactive";


    if (this.props.dataLoadedFromServer && !this.props.dataLoadedFromServerError) {
    
        const headers  = _.uniqBy(this.props.tableData[0].values, "crmFieldName").map((v)=>{ 
           
           v.fieldName = v.crmFieldName

           this.props.tableData.map((data)=>{
              if (data.sortFieldName == v.fieldName) {
                v.sortDirection = data.sortDirection
                v.isSorted = true;
              } else {
                if (data.sortDirection == "desc") {
                    v.sortDirection = "asc"
                } else {
                    v.sortDirection = "desc"
                }
                v.isSorted = false;                
              }
           })
           
            return v  
        });  
        
        
       

       ///////THIS HERE IS VERY IMPORTANT/////////////////////////////////////////////////////////
       

        var TableBodyComponents = "";

        
        if (this.props.isGrouped == true) {            
          
          // let offset =  (this.props.currentPage - 1) * this.props.recordsPerPage
          // let itemsPerPage = this.props.recordsPerPage;               
          // let pagedData = sortedData.slice(offset, (itemsPerPage + offset));

          TableBodyComponents = this.props.tableDataGroup.map((td, index)=> { 
          //if grouped data is larger than records per page, only grab the records per page otherwise all of it and continue to next;                      
             return (                    
                      <TableBody key={index} headerCount={headers.length} dataForTable={this.props.tableDataGroup[index][1]} groupRowData={this.props.tableDataGroup[index][1][0]} {...this.props} />
                    )
          })
        } else {
          TableBodyComponents = <TableBody key="16575674565467" isGrouped={false} dataForTable={tableData} headerCount={headers.length} {...this.props} />                    
        }   
    
              
      ///////////////////////////////////////////////////////////////////////////////////////////////////          

        const TableHeaderComponents = headers.map((header,index) => { 
            return <TableHeader key={index} {...header} {...this.props} />;            
        });          
        

        const textInputStyle = {
          paddingTop:"10px",      
          // marginLeft: "15px"
        }

        const textContainerStyle = {      
          marginTop: "10px",
          marginRight: "10px",
          
        }

        const buttonStyle = {  
          marginTop: "10px",    
          marginRight: "5px",            
        }
        
        var cancelBtn;    
        var saveBtn;
        var component;
        
        var hasDirty = false;
        tableData.map((data)=>{
            data.values.filter((value)=>{  
                if (value.isDirty == true) {
                  hasDirty = true;
                }  
                return;
            })
        }) 
          

        if (hasDirty) {              
          saveBtn = <button class="btn btn-success home-transition" onClick={this.handleSaveBtnClick.bind(this)} style={buttonStyle}>Save Changes</button>
          cancelBtn = <button class="btn btn-danger home-transition" onClick={this.handeCancelBtnClick.bind(this)} style={buttonStyle}>Cancel</button>      
        } 

        var PagerComponent = "";

        if ((originalTableDataCount / recordsPerPage) > 1) {
          PagerComponent = <Pager key="32432432" {...this.props} />
        }


        return (

            <div class="container-fluid">  
              <strong>hi: {this.props.userId}</strong>
              <button onClick={this.handleGenerateNewUserIdClick.bind(this)}>Generate</button>
              <button onClick={this.handleGenerateNewUserIdClickAsync.bind(this)}>GenerateAsync</button>
                <div class="row">                                                   
                    
  
                    <div class="col-md-2">
                       <div class="btn-group">                  
                            <input type="text" ref="searchInput" value={this.state.searchText} class="form-control" onChange={this.handleSearchTextChange.bind(this)} placeholder="Search" style={textContainerStyle}></input>
                            <button class={closeIconActive} type="reset" onClick={this.handleClearBtnClick.bind(this)}></button>
                        </div>
                    </div>
                    
                    <div class="col-md-2"> 
                      <ReactCSSTransitionGroup transitionName="home-transition" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                          {cancelBtn}
                            {saveBtn} 
                      </ReactCSSTransitionGroup> 
                    </div>
                    
                    <div class="col-md-2 col-md-offset-7">
                        Records per page
                        <select defaultValue={this.props.recordsPerPage} class="form-control" onChange={this.handleRecordsPerPageChange.bind(this)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>
                    </div>
                                                      
                </div>    
                <br/>

                <div class='row'>        
                  
                  <table class='table table-stripped table-hover'>         
                  <thead>
                    <tr>{TableHeaderComponents}</tr>            
                  </thead>          
                   <tfoot>
                    <tr>{/*TableFooterComponents*/}</tr>            
                  </tfoot>

                      {TableBodyComponents}

                </table>              
                </div>
              
             {PagerComponent}
                   
          </div>


        );
      } else {
        if (this.props.dataLoadedFromServerError) {
          return (
            <strong>ERROR LOADING DATA</strong>

          );  
        }
        return (
          <strong>LOADING DATA</strong>

        );
      }
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);



