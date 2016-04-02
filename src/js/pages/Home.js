import React from "react";
// import Articles from "../components/articles";
import TableHeaderStore from "../stores/tableHeaderStore";
import TableBodyStore from "../stores/tableBodyStore";
import TableFooterStore from "../stores/tableFooterStore";
import TableDataStore from "../stores/tableDataStore";
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
	    }

	}

	toggleInitialState() {
		  this.setState({
          headers: TableDataStore.getHeaders(),           
          tableData: TableDataStore.getAll(),      
          searchText: "", 
          isEditing: TableDataStore.isEditing,               
      });		
	}

	componentWillMount() {
      this.toggleInitialState();      
               
        TableBodyStore.on('change', () => { 
          console.log("store changed")          
        	 this.toggleInitialState();
        });
        
    }

    componentWillUnmount() {        
        TableBodyStore.removeListener('change', () => {           
        	 this.toggleInitialState();
        });
        
    }
    
   

	handleSearchTextChange(e) {
		console.log(e.target.value);
		
		this.setState({searchText:e.target.value})
	}

	handleSearchButtonAction() {
		console.log("button pressed");
		this.setState({searchText:""})
	}


  render() {
  	const { searchText } = this.state.searchText;  	
    const { headers } = this.state;      
    const { tableData } = this.state;
    const { rowValues } = this.state;
    
    const TableHeaderComponents = headers.map((header, index) => {                           
        return <TableHeader key={index} fieldName={header} />;            
    }); 
   
       
    const TableFooterComponents = headers.map((footer, index) => {                         
        return <TableFooter key={index} fieldName={footer}  />;            
    });  

    var saveBtn;
    if (this.state.isEditing) {
      console.log("top level compoent got hcange")
      saveBtn = <button>Save</button>
    } else {
      saveBtn = <button>Save Not</button>
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
          {saveBtn}
          <table class='table table-stripped table-bordered table-hover table-condensed'>         
          <thead>
            <tr>{TableHeaderComponents}</tr>            
          </thead>          
               <TableBody tableData={tableData} />          
          <tfoot>
            <tr>{TableFooterComponents}</tr>            
          </tfoot>
        
        </table>
        </div>
      	
      	
          
      </div>
    );
  }
}