import React from "react";
import TableDataStore from "../stores/TableDataStore";
import TableRowDataStore from "../stores/TableRowDataStore";
import * as TableDataActions from "../actions/TableDataActions";
import * as TableRowDataActions from "../actions/TableRowDataActions";
import TableHeader from "../components/tableHeader";
import TableFooter from "../components/tableFooter";
import TableBody from "../components/tableBody";
import lodash from "lodash";



export default class Home extends React.Component {
  
	constructor() {
	    super();
      this.lodash = require('lodash');           
	    this.state = {            
	        headers: TableDataStore.getHeaders(),
          tableData: TableDataStore.getAll(),
          lookupData: TableDataStore.getLookupData(),
          twoOptionsData: TableDataStore.getTwoOptionsData(),
          searchText: "",
          isEditing: TableDataStore.isEditing,
          isDirty: TableRowDataStore.isDirty,
          dirtyRecords: TableDataStore.dirtyRecords,                
	    }    
	}
   
	toggleState() {
		  this.setState({
          headers: TableDataStore.getHeaders(),           
          tableData: TableDataStore.getAll(), 
          lookupData: TableDataStore.getLookupData(),
          twoOptionsData: TableDataStore.getTwoOptionsData(),  
          dirtyRecords: TableDataStore.dirtyRecords,                   
          searchText: "", 
          isEditing: TableDataStore.isEditing,  
          isDirty: TableRowDataStore.isDirty,             
      });		
	}


	componentWillMount() {
      // this.toggleState();                     
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
    
   shouldComponentUpdate() {
      return true;
   }

	handleSearchTextChange(e) {
		console.log(e.target.value);
		
		this.setState({searchText:e.target.value})
	}

	handleSearchButtonAction() {		
		this.setState({searchText:""})
	}

  handeCancelBtnClick() {      
      TableDataActions.toggleEditingMode(false)    
      TableRowDataActions.toggleDirtyMode(false)        
  }

  handeSaveBtnClick() {  

      // var newData = [];
      // for (var i=0;i<=this.state.tableData.length - 1;i++) {
      //   var td = this.state.tableData[i];
      //   console.log(td)
      //   var foundObject = this.lodash.find(this.state.dirtyRecords, ['parentId', td.id])
      //   if (foundObject) {
      //      for (var y=0;y<=td.values.length - 1;y++) {
      //       console.log("found object: " + foundObject);
      //         var value = td.values[y];
      //         if (value.crmFieldName == foundObject.fieldName) {
      //           value.value = foundObject.value
      //         }

      //      }   
      //   }
      //   newData.push(td);
       

      // }

      // console.log(newData)
      // TableDataActions.updateDirtyRecords(newData);
      TableDataActions.updateDirtyRecords();
      TableRowDataActions.toggleDirtyMode(false);      
      TableDataActions.toggleEditingMode(false);         

  }


  render() {
    
  	const { searchText } = this.state;  	
    const { headers } = this.state;      
    const { tableData } = this.state;
    const { rowValues } = this.state;
    const { lookupData } = this.state;
    const { twoOptionsData } = this.state;
       
    const TableHeaderComponents = headers.map((header) => { 
        return <TableHeader key={header.key} fieldName={header.headerName} sortDirection={header.sortDirection} />;            
    }); 
   
       
    // const TableFooterComponents = headers.map((footer) => {                         
    //     return <TableFooter key={footer.key} fieldName={footer.headerName}  />;            
    // });  

       
    const textInputStyle = {
      // paddingTop:"10px",
      marginLeft: "15px"
    }

    const textContainerStyle = {
      paddingTop: "10px"
    }

    const buttonStyle = {
      marginTop: "10px",
      marginRight: "5px"
      // marginRight: "15px"
    }

    var cancelBtn;
    if (this.state.isEditing) {      
      cancelBtn = <button class="col-md-1 btn btn-danger" onClick={this.handeCancelBtnClick.bind(this)} style={buttonStyle}>Cancel</button>
    } 
    var saveBtn;
    if (this.state.isDirty) {          
      saveBtn = <button class="col-md-2 btn btn-success" onClick={this.handeSaveBtnClick.bind(this)} style={buttonStyle}>Save Changes</button>
    }   



    

    return (
        <div>  
            <div class="row-fluid">                                 
                
                <button class="col-md-1 btn btn-info" style={buttonStyle}>add</button>                
                {cancelBtn}
                {saveBtn} 
              	<div class="input-group col-md-4" style={textContainerStyle} >                                    
        	         <input type="text" class="form-control" onChange={this.handleSearchTextChange.bind(this)} value={searchText} style={textInputStyle} />           
                 		 <span class="input-group-btn">                          		 
                         <button class="btn btn-default" type="button" onClick={this.handleSearchButtonAction.bind(this)}>
                        			<span class="glyphicon glyphicon-search"></span>
                    		</button>                       
                  	</span>
               </div>
            </div>    
    		    <br/>
            <div class='row-fluid'>        
              
              <table class='table table-stripped table-bordered table-hover table-condensed'>         
              <thead>
                <tr>{TableHeaderComponents}</tr>            
              </thead>          
                   <TableBody tableData={tableData} lookupData={lookupData} twoOptionsData={twoOptionsData} />          
              <tfoot>
                <tr>{/*TableFooterComponents*/}</tr>            
              </tfoot>
            
            </table>
            

            </div>
        	
        	
            
      </div>
    );
  }
}