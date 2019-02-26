import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import {Table} from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class employee extends Component {
    

  componentDidMount() {
          const token = localStorage.usertoken
          console.log(token);
          try {
              const decoded = jwt_decode(token)
              if (decoded.payload.type === 0) {
                  console.log(decoded.payload.comId);
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
        }
  
    state = {
        employees:[],
        newEmployeeData:{
            name:'',
            email:'',
            role:'',
            speciality:''
        },
        editEmployeeData:{
            id:'',
            name : '',
            email :'',
            role :'',
            speciality:''
        },
        modalEmployee:false,
        editmodalEmployee:false

    }

    componentWillMount(){
        axios.get("http://localhost:8080/admin/employee")
        .then((response)=>{
            this.setState({
                employees:response.data
            })
        });
    }
     
    toggleEmployee(){
        this.setState({
            modalEmployee: !this.state.modalEmployee
        });
    }

     edittoggleEmployee() {
         this.setState({
             editmodalEmployee: !this.state.editmodalEmployee
         });
     }

    addEmployee(){
        axios.post('http://localhost:8080/admin/addEmployee', this.state.newEmployeeData).then((response) => {
            let {employees}=this.state;

            employees.push(response.data);

            console.log(response.data);
            this.setState(
                {employees,
                modalEmployee: false,
                newEmployeeData:{
                name:'',
                email:'',
                role:'',
                speciality:''
            }});
        });
    }
    editEmployee(id,name,email,role,speciality){
        this.setState({
            editEmployee:{id,name,email,role,speciality},
            editmodalEmployee: !this.state.editmodalEmployee
        }); 

    }

   

  render() {
      
      let employees=this.state.employees.map(employee=>{
          console.log(this.state.comID)
          if(employee.type !== 0){
              if(employee.comId===this.state.comId){
        return(
            <tr key={employee.ID}>
                <td>
                   {employee.name} </td>

                <td>
                    {employee.email}
                </td>
                <td>
                   {employee.role} 
                </td>
                <td>
                    {employee.speciality}
                </td>
                
                
            </tr>
        )}else{
            return ''
        }
          }else{
              return''
          }
      })
    return (
      <div className="container">
                            < div className = "row" >

                            <div class="col-md-4">
                <div class="clearfix">
                    <label for=""></label>
                </div>
                
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
          <div className="App container">
        
          

          <Table>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Speciality</th>
                      
                  </tr>
              </thead>
              <tbody>
                {employees}
                
              </tbody>
          </Table>
          </div>
          </div>
          </div>
          </div>
      
    )
  }
}
