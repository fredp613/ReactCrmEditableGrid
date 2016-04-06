import React from "react";
import TableDataStore from "../stores/TableDataStore";
import TableRowDataStore from "../stores/TableRowDataStore";
import * as TableDataActions from "../actions/TableDataActions";
import * as TableRowDataActions from "../actions/TableRowDataActions";
import TableHeader from "../components/tableHeader";
import TableFooter from "../components/tableFooter";
import TableBody from "../components/tableBody";
import lodash from "lodash";
import ReactTransitionGroup  from "react-addons-transition-group"
import ReactCSSTransitionGroup  from "react-addons-css-transition-group"
// import ReactTransitionGroup  from "react-addons-transition-group"
 


export default class Home extends React.Component {
  
  constructor() {
      super();
      this.lodash = require('lodash');
             
      this.state = {            
          headers: TableDataStore.getHeaders(),
          tableData: TableDataStore.getAll(),
          isGrouped: TableDataStore.isGrouped,
          lookupData: TableDataStore.getLookupData(),
          twoOptionsData: TableDataStore.getTwoOptionsData(),
          searchText: "",
          isEditing: TableDataStore.isEditing,
          isDirty: TableRowDataStore.isDirty,
          dirtyRecords: TableDataStore.dirtyRecords, 
          isSearching: false,                         
      }    
  }
   
  toggleState() {
      this.setState({
          headers: TableDataStore.getHeaders(),           
          tableData: TableDataStore.tableData, 
          lookupData: TableDataStore.getLookupData(),
          isGrouped: TableDataStore.isGrouped,
          twoOptionsData: TableDataStore.getTwoOptionsData(),  
          dirtyRecords: TableDataStore.dirtyRecords,                   
          searchText: "", 
          isEditing: TableDataStore.isEditing,  
          isDirty: TableRowDataStore.isDirty, 
          isSearching: false,            
      });   
  }


  componentWillMount() {                    
        TableDataStore.on('change', () => { 
           this.toggleState();
        });
        TableRowDataStore.on('change', () => {
          this.setState({
            isDirty: TableRowDataStore.isDirty,
          })
        })
        
    }

    componentDidMount() {
                 
        TableDataStore.on('change', () => { 

           this.toggleState();
        });
        TableRowDataStore.on('change', () => {
          this.setState({
            isDirty: TableRowDataStore.isDirty,
          })
        })
    }

    componentWillUnmount() {        
        TableDataStore.removeListener('change', () => {           
           this.toggleState();
        });
         TableRowDataStore.removeListener('change', () => {
          this.setState({
            isDirty: TableRowDataStore.isDirty,
          })
        })
        
    }
   
   handleClearBtnClick() {
      this.setState({isSearching:false})
   } 


  handleSearchTextChange(e) { 
    console.log("hi")
    console.log(e.target.value)
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
      TableDataActions.toggleEditingMode(false)    
      TableRowDataActions.toggleDirtyMode(false)        
  }

  handleSaveBtnClick() {  
     
      TableDataActions.updateDirtyRecords();
      TableRowDataActions.toggleDirtyMode(false);      
      TableDataActions.toggleEditingMode(false);         

  }

  render() {

    var _ = require("lodash");
    const { searchText } = this.state;    
    const { headers } = this.state;      
    const { tableData } = this.state;
    const { rowValues } = this.state;
    const { lookupData } = this.state;
    const { twoOptionsData } = this.state;
    const { isGrouped } = this.state;   
    const { isSearching } = this.state;

    const closeIconActive = isSearching ? "glyphicon glyphicon-remove-circle close-icon-active" : "glyphicon glyphicon-remove-circle close-icon-inactive";


    const TableHeaderComponents = headers.map((header,index) => { 
        return <TableHeader key={index} fieldName={header.headerName} sortDirection={header.sortDirection} />;            
    }); 

    var TableBodyComponents;

    if (isGrouped) {
        TableBodyComponents = tableData.map((td, index)=> {

           return (                    
                    <TableBody key={index} tableData={tableData[index][1]} 
                    lookupData={lookupData} twoOptionsData={twoOptionsData} isGrouped={true} groupRowData={tableData[index][1][0]} isEditing={this.state.isEditing} />
                  )
        })
    } else {
        TableBodyComponents = <TableBody key="1" tableData={tableData} lookupData={lookupData} twoOptionsData={twoOptionsData} isGrouped={false} isEditing={this.state.isEditing} />          
    }

   
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
    if (this.state.isDirty) {          
      saveBtn = <button class="btn btn-success home-transition" onClick={this.handleSaveBtnClick.bind(this)} style={buttonStyle}>Save Changes</button>
      cancelBtn = <button class="btn btn-danger home-transition" onClick={this.handeCancelBtnClick.bind(this)} style={buttonStyle}>Cancel</button>      
    } 

    return (
        <div class="container-fluid">  
            <div class="row">                                                   
                <form class="form-inline">
                <div class="form-group">
                   <div class="btn-group">                  
                        <input type="text" value={this.state.searchText} class="form-control" onChange={this.handleSearchTextChange.bind(this)} placeholder="Search" style={textContainerStyle}></input>
                        <button class={closeIconActive} type="reset" onClick={this.handleClearBtnClick.bind(this)}></button>
                    </div>
                </div>
                <div class="form-group">
                  
                  <ReactCSSTransitionGroup transitionName="home-transition" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                        {cancelBtn}
                        {saveBtn} 
                   </ReactCSSTransitionGroup> 
                 </div>
              </form>
                                  
            </div>    
            <br/>

            <div class='row'>        
              
              <table class='table table-stripped table-bordered table-hover table-condensed'>         
              <thead>
                <tr>{TableHeaderComponents}</tr>            
              </thead>          
               <tfoot>
                <tr>{/*TableFooterComponents*/}</tr>            
              </tfoot>

                  {TableBodyComponents}

              
             
            
            </table>
            

            </div>
          
          
            
      </div>
    );
  }
}