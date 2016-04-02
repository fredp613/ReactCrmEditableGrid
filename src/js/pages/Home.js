import React from "react";
import TableDataStore from "../stores/TableDataStore";
import TableRowDataStore from "../stores/TableRowDataStore";
import * as TableDataActions from "../actions/TableDataActions";
import * as TableRowDataActions from "../actions/TableRowDataActions";
import TableHeader from "../components/tableHeader";
import TableFooter from "../components/tableFooter";
import TableBody from "../components/tableBody";



export default class Home extends React.Component {
  
	constructor() {
	    super();
           
	    this.state = {            
	        headers: TableDataStore.getHeaders(),
          tableData: TableDataStore.getAll(),
          searchText: "",
          isEditing: TableDataStore.isEditing,
          isDirty: TableRowDataStore.isDirty,                
	    }    
	}
   
	toggleState() {
		  this.setState({
          headers: TableDataStore.getHeaders(),           
          tableData: TableDataStore.getAll(),      
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
  }

  handeSaveBtnClick() {      
      TableRowDataActions.toggleDirtyMode(false)        
      TableDataActions.toggleEditingMode(false)          
  }


  render() {
    
  	const { searchText } = this.state;  	
    const { headers } = this.state;      
    const { tableData } = this.state;
    const { rowValues } = this.state;
       
    const TableHeaderComponents = headers.map((header) => { 
        return <TableHeader key={header.key} fieldName={header.headerName} sortDirection={header.sortDirection} />;            
    }); 
   
       
    // const TableFooterComponents = headers.map((footer) => {                         
    //     return <TableFooter key={footer.key} fieldName={footer.headerName}  />;            
    // });  

    var cancelBtn;
    if (this.state.isEditing) {      
      cancelBtn = <button class="btn btn-default" onClick={this.handeCancelBtnClick.bind(this)}>Cancel</button>
    } 
    var saveBtn;
    if (this.state.isDirty) {  
      console.log("state dirty")    
      saveBtn = <button class="btn btn-default" onClick={this.handeSaveBtnClick.bind(this)}>Save Changes</button>
    }      

    return (
      <div class='row-fluid'> 
               
      	<div class="span4 input-group col-md-3 col-xs-offset-9">
            
	         <input type="text" class="form-control" onChange={this.handleSearchTextChange.bind(this)} value={searchText} />           
         		 <span class="input-group-btn">
             		 <button class="btn btn-default" type="button" onClick={this.handleSearchButtonAction.bind(this)}>
                			<span class="glyphicon glyphicon-search"></span>
          		</button>
          	</span>

        </div>    
		    <br/>
        <div class='row-fluid'>
          {cancelBtn}
          {saveBtn}
          <table class='table table-stripped table-bordered table-hover table-condensed'>         
          <thead>
            <tr>{TableHeaderComponents}</tr>            
          </thead>          
               <TableBody tableData={tableData} />          
          <tfoot>
            <tr>{/*TableFooterComponents*/}</tr>            
          </tfoot>
        
        </table>
        </div>
      	
      	
          
      </div>
    );
  }
}