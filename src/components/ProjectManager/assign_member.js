import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios'

class assign_member extends Component {
     componentDidMount() {
         const token = localStorage.usertoken
         console.log(token);
         try {
             const decoded = jwt_decode(token)
             if (decoded.payload.type === 3) {
                 console.log(decoded.payload.comId);
                 this.setState({
                     ID: decoded.payload.ID,
                     comId: decoded.payload.comId
                 })
             } else {
                 this.props.history.push(`../login`);
             }
             //console.log(state.ID);
         } catch (err) {
             console.log(err);
             this.props.history.push(`../login`)
         }
         axios("http://localhost:8080/admin/role")
             .then((response) => {
                 this.setState({
                     roles: response.data
                 })
             });
        axios("http://localhost:8080/admin/employee")
            .then((response) => {
                this.setState({
                    employees: response.data
                })
            });
     }
    constructor() {
        super()
        this.state = {
            roles:[],
            employees:[],
          selectedOption:null,
          selected:null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCha = (selectedOption) => {
        this.setState({
            selectedOption
        });
        console.log(`Option selected:`, selectedOption);
    }
      handle = (selected) => {
              this.setState({
                  selected
              });
              console.log(`Option selected:`, selected);
            }

   
   handleChange(e) {
       let target = e.target;
       let value = target.type === 'checkbox' ? target.checked : target.value;
       let name = target.name;

       this.setState({
           [name]: value
       });
       this.setState({
           project_type: e.target.project_type
       });
   }

   handleSubmit(e) {
       e.preventDefault();
       fetch('http://localhost:8080/projectmanager/assign_members', {
               method: 'POST',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   comId: this.state.comId,
                   projectID: this.props.location.state.projectID,
                   role: this.state.selected.value,
                   empID: this.state.selectedOption.value

               })
           })
           .then(res => res.json())
           .then(res => console.log(res));
           this.props.history.push(`/projectmanager/project`);

   }
   

    render () {
   console.log(this.props.location.state.projectID)
    const { selectedOption } = this.state;
    const member_role = [{
        value: '0',
        label: 'Project Leader'
    }];
    let roles=this.state.roles.map(role=>{
     if(role.comID===this.state.comId){
        member_role.push({value: role.roleID,
          label: role.role_name})
        return(
          console.log('')
            
        )}else{
          return(
            console.log('')
          )
        }
        
      })
      console.log(roles)
      const { selected } = this.state;
    const employee_type = [];
    let employees=this.state.employees.map(employee=>{
    
      if(employee.comId===this.state.comId && employee.type===1){
        employee_type.push({value: employee.empID,
          label: employee.name})
        return(
          console.log('')
            
        )}else{
          return(
            console.log('')
          )
        }
        
      })
      console.log(employees)
        return (

            <div className="container">
            < div className = "row" >

            <div class="col-md-4">
  <div class="clearfix">
    <label for=""></label>
  </div>
  
 <div class="form-group">
  <Link to="/projectmanager/profile" className="form-control btn btn-success">
                        Profile
                    </Link>
  </div>
  
  <div class="form-group">
  <Link to="/projectmanager/add_project" className="form-control btn btn-success">
                        Add Project
                    </Link>


  </div>
  <div class="form-group">
  <Link to="/projectmanager/project" className="form-control btn btn-success">
                        Projects
                    </Link>
  </div>
  <div class="form-group">
  <Link to="/projectmanager/apply_leave" className="form-control btn btn-success">
                        Apply Leave
                    </Link>
  </div>
  <div class="form-group">
  <Link to="/projectmanager/leaves" className="form-control btn btn-success">
                        Leaves History
                    </Link>
  </div>
  <div class="form-group">
  <Link to="/projectmanager/change_password" className="form-control btn btn-success">
                        Settings
                    </Link>
  </div>
  
  


</div>
                <div className="col-md-8">
                <br />
                <div className="card">
                <div class="card-header text-center">
    Assign Member
  </div>
        < div className = "card-body" >
         <form onSubmit={this.handleSubmit} className="FormFields">
            
              <div className="form-group">
                <label className="FormField__Label" htmlFor="role">Role</label>
                <div>
                  <Select
                    value={selected}
                    onChange={this.handle}
                    options={member_role}
                  />
                  </div>
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="employee">Employee</label>
                <div>
                  <Select
                    value={selectedOption}
                    onChange={this.handleCha}
                    options={employee_type}
                  />
                  </div>
                
              </div>
              
              <div className="form-group">
                  <button className="form-control bg-success" >Submit</button> 
                  
              </div>
            </form>
          </div>
        </div>
                    
                </div>
            </div>
            </div>
        )
    }
}

export default assign_member