import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import {Table } from 'reactstrap';
import axios from 'axios';

export default class role extends Component {
   

  componentDidMount() {
      const token = localStorage.usertoken
      console.log(token);
      try {
        const decoded = jwt_decode(token)
        if (decoded.payload.type === 0) {
          console.log(decoded.payload.type);
          this.setState({
            ID: decoded.payload.ID
          })
        } else {
          this.props.history.push(`../login`);
        }
        //console.log(state.ID);
      } catch (err) {
        console.log(err);
        this.props.history.push(`../login`)
      }}

  state={
    roles:[]
  }
  componentWillMount() {
    axios.get("http://localhost:8080/admin/role")
      .then((response) => {
        this.setState({
          roles: response.data
        })
      });
  }

  render() {
     let roles=this.state.roles.map(role=>{
        return(
            <tr>
                <td>
                   {role.role_name} </td>

                
                <td>
                   {role.basic_salary} 
                </td>
                <td>
                    {role.leaves}
                </td>
                <td>
                    {role.ot_rate}
                </td>
                
                
            </tr>
        )
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
                      <th>Role Name</th>
                      <th>Basic Salary</th>
                      <th>Leaves</th>
                      <th>OT Rate</th>
                      
                  </tr>
              </thead>
              <tbody>
                {roles}
                
              </tbody>
          </Table>
          </div>
          </div>
          </div>
          </div>
      
    )
  }
}
