import React,{Component} from 'react';
import {variables} from '../Variables.js';
import {formatDate} from '../Functions.js';

export class Category extends Component{
    constructor(props){
        super(props);

        this.state={ /*initializing the state properties that will be used to manage
                        the component's behavior and appearance*/
            categories:[],
            modalTitle:"",
            CategoryCode:"",
            CategoryDes:"",
            CategoryId:0,

            CategoryIdFilter:"",
            CategoryDesFilter:"",
            categoriesWithoutFilter:[]
        }
    }

    FilterFn(){ // Filter Function for the Filter Fields
        var CategoryIdFilter=this.state.CategoryIdFilter;
        var CategoryDesFilter = this.state.CategoryDesFilter;

        var filteredData=this.state.categoriesWithoutFilter.filter(
            function(el){
                return el.CategoryId.toString().toLowerCase().includes(
                    CategoryIdFilter.toString().trim().toLowerCase()
                )&&
                el.CategoryDes.toString().toLowerCase().includes(
                    CategoryDesFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({categories:filteredData});

    }

    sortResult(prop,asc){ // Function to sort the data columns
        var sortedData=this.state.categoriesWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({categories:sortedData});
    }    
       
    changeCategoryDesFilter = (e)=>{ // This function will be called when the user filters data
        /*this.setState ({
            CategoryDesFilter:e.target.value
        })*/
        this.state.CategoryDesFilter=e.target.value;
        this.FilterFn();
    }

    /*changeCategoryDesFilter = (e) => {
        this.setState({ CategoryDesFilter: e.target.value }, () => {
            this.FilterFn();
        });
    }*/
    


    refreshList(){ // 'GET' data from the API on Mount and after CRUD
        fetch(variables.API_URL+'category')
        .then(response=>response.json())
        .then(data=>{
            this.setState({categories:data,categoriesWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

/*Capture data on 'Add' and 'Edit' the state variables */
    changeCategoryDes =(e)=>{
        this.setState({CategoryDes:e.target.value});
    }

    changeCategoryCode =(e)=>{
        this.setState({CategoryCode:e.target.value});
    }

    addClick(){ // Initiate the Modal Form  on 'Add'
        this.setState({
            modalTitle:"Add Category",
            CategoryId:0,
            CategoryCode:"",
            CategoryDes:""
        });
    }
    editClick(cat){ // Initiate the Modal Form  on 'Edit'
        this.setState({
            modalTitle:"Edit Category",
            CategoryId:cat.CategoryId,
            //CategoryCode:cat.CategoryCode,
            CategoryDes:cat.CategoryDes
        });
    }

    createClick(){ //'POST'(Add Record) API Integartion 
        fetch(variables.API_URL+'category',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CategoryCode:this.state.CategoryCode,
                CategoryDes:this.state.CategoryDes,
                CategoryCrDate:formatDate(Date.now())
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);

            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    updateClick(){ //'UPDATE'(Edit Record) API Integartion 
        fetch(variables.API_URL+'category',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CategoryId:this.state.CategoryId,
                CategoryDes:this.state.CategoryDes,
                CategoryEditDate:formatDate(Date.now())
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){ //'DELETE'(Delete Record) API Integartion 
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'category/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){ /*Rendering content to be displayed on the screen
                based on the component's current state and props*/
        const {
            categories,
            modalTitle,
            CategoryId,
            CategoryCode,
            CategoryDes
        }=this.state;

        return( // HTML Body Content of the Componant
    <div>

    <button type="button"
    className="btn btn-warning m-2 float-start"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Category
    </button>
    <div className="d-flex flex-row">
        <input className="form-control m-2"
        onChange={this.changeCategoryDesFilter}
        placeholder="Filter Category Description"/>
    </div>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">            
                <div>      
                    <button type="button" className="btn btn-light"
                    onClick={()=>this.sortResult('CategoryId',true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                        </svg>
                    </button>
                    <span className="mx-2">CategoryId</span>
                    <button type="button" className="btn btn-light"
                    onClick={()=>this.sortResult('CategoryId',false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-square" viewBox="0 0 16 16">
                            <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0l-4-4.5z"/>
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z"/>
                        </svg>
                    </button>
                </div>
            </div>
           
        </th>
        <th>
            <div className="d-flex flex-row">
                <div>
                    <button type="button" className="btn btn-light"
                    onClick={()=>this.sortResult('CategoryCode',true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                        </svg>
                    </button>
                    <span className="mx-2">Category_Code</span>
                    <button type="button" className="btn btn-light"
                    onClick={()=>this.sortResult('CategoryCode',false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-square" viewBox="0 0 16 16">
                            <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0l-4-4.5z"/>
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z"/>
                        </svg>
                    </button>
                </div>
            </div>
          
      
        </th>
        <th>
            <div div className="d-flex flex-row">
                
                <div>
                    <button type="button" className="btn btn-light"
                    onClick={()=>this.sortResult('CategoryDes',true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                        </svg>
                    </button>
                    <span className="mx-2">Category_Description</span>
                    <button type="button" className="btn btn-light"
                    onClick={()=>this.sortResult('CategoryDes',false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-square" viewBox="0 0 16 16">
                            <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0l-4-4.5z"/>
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z"/>
                        </svg>
                    </button>
                </div>
            </div>
            
      
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {categories.map(cat=> // Data from the POST API Request (refreshList())
            <tr key={cat.CategoryId}>
                <td>{cat.CategoryId}</td>
                <td>{cat.CategoryCode}</td>
                <td>{cat.CategoryDes}</td>
                <td>
                <button type="button" /* Row Edit Button */
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(cat)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button" /* Row Delete Button */
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(cat.CategoryId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>
              {/* Model form */}
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
    <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">
    <div className="modal-header bg-secondary">
       <h5 className="modal-title text-light">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
    </div>

    <div className="modal-body bg-dark">
       <div className="form-floating mb-3">
            {CategoryId===0? // Hide Element in Edit View 
                <div>
                    <span className="input-group-text">Category Code</span>
                    <input type="text" className="form-control"
                    value={CategoryCode} /* Get Value of the input Box */
                    onChange={this.changeCategoryCode}/> {/* Capture Change in input Box */}
                    <br />
                </div>
            :null}

                <span className="input-group-text">Category Description</span>
                <input type="text" className="form-control"
                value={CategoryDes}
                onChange={this.changeCategoryDes}/>
        </div>        


        {CategoryId===0? // Show Create Button in Add Option 
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {CategoryId!==0? // Show Update Button in Edit Option 
        <button type="button"
        className="btn btn-danger float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}

   </div>

</div>
</div> 
</div>


</div>
        )
    }
}