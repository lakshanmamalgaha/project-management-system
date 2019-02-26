import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import Select from 'react-select';


export default class add_employee extends Component {
  componentDidMount() {
    const token = localStorage.usertoken
    try {
      const decoded = jwt_decode(token)
      if (decoded.payload.type === 0) {
        console.log(decoded.payload.type);
        this.setState({
          ID: decoded.payload.ID,
          comId:decoded.payload.comId
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
    
      
  }
  
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      role:'',
      speciality:'',
      roles:[],
      tech: 'select',
      selectedOption: null,
      
      
      
    };
    
    console.log(this.state.roles)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /*
  state={
    roles:[]
  }
*/
  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    this.setState({
      tech: e.target.value
    })
    
    console.log(this.state.tech);

    this.setState({
      [name]: value
    });
  }
   handleCha = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
 

  handleSubmit(e) {
    e.preventDefault();
  }
    
  

   componentWillMount() {
     
       
   }
  addEmployee(){
    fetch('http://localhost:8080/admin/addEmployee', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comID:this.state.comId,
          name:this.state.name,
          email: this.state.email,
          speciality:this.state.speciality,
          role:this.state.selectedOption.value
        })
      })
      .then(res => res.json())
      .then(res => console.log(res));
      this.props.history.push(`/admin/employee`);
  }
  
  render() {
    const { selectedOption } = this.state;
    const leave_type = [{value:'1',label:'Project Manager'}];
    let roles=this.state.roles.map(role=>{
    
      if(role.comID===this.state.ID){
        leave_type.push({value: role.roleID,
          label: role.role_name})
        return(
          console.log('')
            
        )}else{
          return(
            console.log('')
          )
        }
        
      })
    return (
      <React.Fragment>
        <div className="container">
        <div className="row">
                            <div class="col-md-4">
                <div class="clearfix">
                    <label for=""></label>
                </div>
                {roles}
                <div class="form-group">
                <Link to="/admin/add_employee" className="form-control btn btn-success">
                                        Add Employee
                                    </Link>


                </div>
                <div class="form-group">
                <Link to="/admin/add_role" className="form-control btn btn-success">
                                        Add Role
                                    </Link>
                </div>
                
                <div class="form-group">
                <Link to="/admin/role" className="form-control btn btn-success">
                                        Roles
                                    </Link>
                </div>
                <div class="form-group">
                <Link to="/admin/employee" className="form-control btn btn-success">
                                        Employees
                                    </Link>
                </div>
                <div class="form-group">
                <Link to="/admin/leaves" className="form-control btn btn-success">
                                        Accept Leave
                                    </Link>
                </div>
                <div class="form-group">
                <Link to="/admin/change_password" className="form-control btn btn-success">
                                        Settings
                                    </Link>
                </div>
                
                


                </div>
                <div className="col-md-8">
          <br />
        
        <div className="card">
        < div className = "card-body" >
         <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="form-group">
                <label className="FormField__Label" htmlFor="name">Employee Name</label>
                <input type="text" id="name" className="form-control"  name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="description">Employee Email</label>
                <input type="email" id="email" className="form-control"  name="email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="role">Role</label>
                  <div>
                  <Select
                    value={selectedOption}
                    onChange={this.handleCha}
                    options={leave_type}
                  />
                  </div>
               
                      
                  
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="speciality">Speciality</label>
                <input type="text" id="speciality" className="form-control"  name="speciality" value={this.state.speciality} onChange={this.handleChange} />
              </div>
              
              <div className="form-group">
                  <button className="form-control bg-success" onClick={()=>this.addEmployee()}>Submit</button> 
                  
              </div>
            </form>
          </div>
        </div>
        </div>
        </div>
        </div>
      </React.Fragment>
    )
  }
}
