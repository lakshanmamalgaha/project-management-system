import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import {Table,Button } from 'reactstrap';
import axios from 'axios';

export default class leaves extends Component {
   

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
    leaves:[]
  }
  componentWillMount() {
    axios.get("http://localhost:8080/admin/leaves")
      .then((response) => {
        this.setState({
          leaves: response.data
        })
      });
  }
  accept(ID){
    console.log(ID+'sddd')
    fetch('http://localhost:8080/admin/accept', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ID:ID
        })
      })
      .then(res => res.json())
      .then(res => console.log(res));
    //this.props.history.push(`/login`);
  }

  render() {
     let leaves=this.state.leaves.map(leave=>{
        return(
            <tr>
                <td>
                   {leave.reason} </td>

                
                <td>
                   {leave.typeOne},{leave.typeTwo} 
                </td>
                <td>
                  <Button className="btn btn-primary" onClick={this.accept.bind(this,leave.ID)}>Accept</Button>
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
                      <th>Reason</th>
                      <th>Type</th>
                      <th>Action</th>
                      
                  </tr>
              </thead>
              <tbody>
                {leaves}
                
              </tbody>
          </Table>
          </div>
          </div>
          </div>
          </div>
      
    )
  }
}
