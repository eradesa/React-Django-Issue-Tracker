import React,{Component} from 'react';
import {variables} from '../Variables.js';
import {formatDate} from '../Functions.js';

export class Issues extends Component{
    constructor(props){
        super(props);

        this.state={ /*initializing the state properties that will be used to manage
                        the component's behavior and appearance*/
            issues:[],
            categories:[],           
            modalTitle:"",
            IssueUiId:0,
            IssueId:"",
            IssuePriority:"",
            IssueName:"",
            IssueDes:"",
            CatCode:"",
            CompDate:"",
            GroupCode:"",
            IssueAdEdDate:"",
            //IssueListImage:"", 
            PhotoFileName:"anonymous.png",
            PhotoPath:variables.PHOTO_URL,           

            IssueIdFilter:"",
            IssueNameFilter:"",
            //IssuePriorityFilter:"",
            issuesWithoutFilter:[]
        }
    }

    
    FilterFn(){ // Filter Function for the Filter Fields
        var IssueIdFilter=this.state.IssueIdFilter;
        var IssueNameFilter = this.state.IssueNameFilter;
        
        var filteredData=this.state.issuesWithoutFilter.filter(
            function(el){
                return el.IssueListId.toString().toLowerCase().includes(
                    IssueIdFilter.toString().trim().toLowerCase()
                ) ||
                el.IssueListName.toString().toLowerCase().includes(
                    IssueNameFilter.toString().trim().toLowerCase()
                ) 
            }
        );

        this.setState({issues:filteredData});

    }

    sortResult(prop,asc){ // Function to sort the data columns
        var sortedData=this.state.issuesWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({issues:sortedData});
    }    
       
    changeFilters = (e) => { // This function will be called when the user filters data
        this.state.IssueNameFilter=e.target.value;
        this.state.IssueIdFilter=e.target.value;
        this.state.IssuePriority=e.target.value;

        this.FilterFn();
    }

       


    refreshList(){ // 'GET' data from the API on Mount and after CRUD
        fetch(variables.API_URL+'issue')
        .then(response=>response.json())
        .then(data=>{
            this.setState({issues:data,issuesWithoutFilter:data});
        });

        fetch(variables.API_URL+'category')
        .then(response=>response.json())
        .then(data=>{
            this.setState({categories:data});
        });
    }

    componentDidMount(){ 
        this.refreshList();
    }
    
/*Capture data on 'Add' and 'Edit' the state variables */
    changeIssueId =(e)=>{ 
        this.setState({IssueId:e.target.value});
    }
    changePriority =(e)=>{
        this.setState({IssuePriority:e.target.value});
    }

    changeIssueDes =(e)=>{
        this.setState({IssueDes:e.target.value});
    }

    changeIssueName =(e)=>{
        this.setState({IssueName:e.target.value});
    }

    changeCatCode =(e)=>{
        this.setState({CatCode:e.target.value});
    }
    changeCompDate =(e)=>{
        this.setState({CompDate:e.target.value});
    }
    changeGroupCode =(e)=>{
        this.setState({GroupCode:e.target.value});
    }

    addClick(){ // Initiate the Modal Form  on 'Add'
        this.setState({
            modalTitle:"Add Issue",
            IssueUiId:0,
            IssueId:"",
            IssuePriority:"High",
            IssueName:"",
            IssueDes:"",
            CatCode:"goAML",
            CompDate:"",
            GroupCode:"Vendor",
            //IssueAdEdDate:"",
            IssueListImage:"",
            PhotoFileName:"anonymous.jpg"    

        });
    }
    editClick(iss){ // Initiate the Modal Form  on 'Edit'
        this.setState({
            modalTitle:"Edit Issue",
            IssueUiId:iss.IssueListUiId,
            IssueId:iss.IssueListId,
            IssuePriority:iss.IssuePriority,
            IssueName:iss.IssueListName,
            IssueDes:iss.IssueListDes,
            CatCode:iss.CategoryCode,
            CompDate:iss.CompletionDate,
            GroupCode:iss.UserGroupCode,
            PhotoFileName:iss.IssueListImage
        });
    }

    createClick(){ //'POST'(Add Record) API Integartion 
        fetch(variables.API_URL+'issue',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                IssueListId:this.state.IssueId, //"20230827_AML_00" + Math.random(),
                IssuePriority:this.state.IssuePriority,
                IssueListName:this.state.IssueName,
                IssueListDes:this.state.IssueDes,
                CategoryCode:this.state.CatCode,
                CompletionDate:this.state.CompDate,
                UserGroupCode:this.state.GroupCode,
                IssueListAdDate:formatDate(Date.now()),
                IssueListImage:this.state.PhotoFileName // Save Image Name in DB                
                
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
        fetch(variables.API_URL+'issue',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                IssueListUiId:this.state.IssueUiId,
                              
                IssuePriority:this.state.IssuePriority,
                IssueListName:this.state.IssueName,
                IssueListDes:this.state.IssueDes,
                CategoryCode:this.state.CatCode,
                CompletionDate:this.state.CompDate,
                UserGroupCode:this.state.GroupCode,
                IssueListEdDate:formatDate(Date.now()),
                IssueListImage:this.state.PhotoFileName  // Save Image Name in DB  
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
        fetch(variables.API_URL+'issue/'+id,{
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

    imageUpload=(e)=>{ //'POST'(Add/Save Image in Backend Folder) API Integartion 
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);
        
        fetch(variables.API_URL+'issue/savefile',{
            method:'POST',
            body:formData
        })        
        .then(res=>res.json())
        .then(data=>{
            this.setState({PhotoFileName:data});
        })
    }

    // Colour Code the 'Priority' Col
    ColorCodedText = (value) => {
        let color = ''; // Set default color

        if (value === 'Critical') {
            color = 'red';
        } else if (value === 'High') {
            color = '#FC33FF';
        } else if (value === 'Medium') {
            color = '#FF9F35';
        } else if (value === 'Low') {
            color = '#3342FF';
        }  
        return color;
    }    

    render(){ /*Rendering content to be displayed on the screen
                based on the component's current state and props*/
        const {
            issues,
            categories,
            modalTitle,
            IssueUiId,
            IssueId,
            IssuePriority,
            IssueName,
            IssueDes,
            CatCode,
            CompDate,
            GroupCode,
            //IssueAdEdDate,
            //IssueListImage,
            PhotoPath,
            PhotoFileName  
        }=this.state;

        return( // HTML Body Content of the Componant
<div>

    <button type="button"
    className="btn btn-warning m-2 float-start"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Issue
    </button>
    
    <div className="d-flex flex-row">
        <input className="form-control m-2"
        onChange={this.changeFilters}
        placeholder="Filter Issue by 'ID' or 'Name'"/>
    </div>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">            
                <div>     {/* To Sort Exact DB Field name should be given to the 'this.sortResult'  */}
                    <button type="button" className="btn btn-light"
                    onClick={()=>this.sortResult('IssueListId',true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                        </svg>
                    </button>
                    <span className="mx-2">IssueId</span>
                    <button type="button" className="btn btn-light"
                    onClick={()=>this.sortResult('IssueListId',false)}>
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
                    onClick={()=>this.sortResult('IssuePriority',true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                        </svg>
                    </button>
                    <span className="mx-2">Priority</span>
                    <button type="button" className="btn btn-light"
                    onClick={()=>this.sortResult('IssuePriority',false)}>
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
                    onClick={()=>this.sortResult('IssueListName',true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                        </svg>
                    </button>
                    <span className="mx-2">Issue_Name</span>
                    <button type="button" className="btn btn-light"
                    onClick={()=>this.sortResult('IssueListName',false)}>
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
                    <span className="mx-2">Category</span>
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
            <div className="d-flex flex-row">
                
                <div>
                    <button type="button" className="btn btn-light"
                    onClick={()=>this.sortResult('UserGroupCode',true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                        </svg>
                    </button>
                    <span className="mx-2">Action_By</span>
                    <button type="button" className="btn btn-light"
                    onClick={()=>this.sortResult('UserGroupCode',false)}>
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
        {issues.map(iss=> // Data from the POST API Request (refreshList())
            <tr key={iss.IssueListUiId}>
                <td>{iss.IssueListId}</td>
                <td style={{color:this.ColorCodedText(iss.IssuePriority) }}><strong>{iss.IssuePriority}</strong></td>
                <td>{iss.IssueListName}</td>                             
                <td>{iss.CategoryCode}</td>
                <td>{iss.UserGroupCode}</td>

                <td>
                <button type="button" /* Row Edit Button */
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(iss)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button" /* Row Delete Button */
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(iss.IssueListUiId)}>
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
    <div className="modal fade"  id="exampleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
                    <div className="modal-header bg-secondary">
                        <h5 className="modal-title text-light">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        ></button>
                    </div>

                <div className="modal-body bg-dark" >

                    <div className="float-container">
                    
                        <div className="float-child">

                            {IssueUiId===0?   
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Issue Ref</span>
                                    <input type="text" className="form-control"
                                    value={IssueId} /* Get Value of the input Box */
                                    onChange={this.changeIssueId}/> {/* Capture Change in input Box */}
                                </div>
                            : // Disable Element in Edit View 
                                <div className="input-group mb-3">
                                <span className="input-group-text">Issue Ref</span>
                                <input type="text" className="form-control"
                                value={IssueId} disabled/>
                                </div>   
                            }

                            <div className="input-group mb-3">
                                <span className="input-group-text">Issue Priority</span>
                                <select className="form-select"
                                onChange={this.changePriority}
                                value={IssuePriority}>
                                    <option value="Critical">Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>                                 
                                </select>
                            </div>
                    
                            <div className="input-group mb-3">
                                <span className="input-group-text required-label">Issue Title</span>
                                <input type="text" className="form-control"
                                value={IssueName}
                                onChange={this.changeIssueName} required/>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Category</span>
                                <select className="form-select"
                                onChange={this.changeCatCode}
                                value={CatCode}>
                                    {categories.map(cat=><option key={cat.CategoryId}>
                                        {cat.CategoryCode}
                                    </option>)}
                                </select>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Resolved By</span>
                                <input type="date" className="form-control"
                                value={CompDate}
                                onChange={this.changeCompDate}/>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Action By</span>
                                <select className="form-select"
                                onChange={this.changeGroupCode}
                                value={GroupCode}>
                                    <option value="Vendor">Vendor</option>
                                    <option value="ITC">ITC</option>
                                    <option value="Bus_Owner">Bus_Owner</option>
                                    <option value="Others">Others</option>                                 
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Description</span>
                                <textarea rows="6" cols="20" type="text" className="form-control"
                                value={IssueDes}
                                onChange={this.changeIssueDes}/>
                            </div>

                        </div>
                        <div className="float-child">
                            <input  style={{display: 'inline-block',float: 'left' }} className="" type="file" onChange={this.imageUpload}/>
                            <br />
                            <br />
                            <img width="700px" height="250px"
                            src={PhotoPath+PhotoFileName} alt=""/>
                           
                        </div>
                        <br />
                    </div>                        

                    {IssueUiId===0? // Show Create Button in Add Option 
                    <button type="button"
                    className="btn btn-primary float-start"
                    onClick={()=>this.createClick()}
                    >Create</button>
                    :null}

                    {IssueUiId!==0? // Show Update Button in Edit Option 
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
//Filter sort Alinement