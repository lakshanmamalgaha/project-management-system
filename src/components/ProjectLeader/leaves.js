import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import {Table } from 'reactstrap';
import axios from 'axios';

export default class PL_leaves extends Component {
   

  componentDidMount() {
      const token = localStorage.usertoken
      console.log(token);
      try {
        const decoded = jwt_decode(token)
        if (decoded.payload.type === 2) {
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
      }}

  state={
    leaves:[]
  }
  componentWillMount() {
    axios.get("http://localhost:8080/employee/leaves")
      .then((response) => {
        this.setState({
          leaves: response.data
        })
      });
  }

  render() {
     let leaves=this.state.leaves.map(leave=>{
       if(leave.empID===this.state.ID && leave.comId===this.state.comId){
        return(
            <tr>
                <td>
                   {leave.leave_day} </td>

                
                <td>
                   {leave.typeOne}, {leave.typeTwo}
                </td>
                <td>
                    {leave.reason}
                </td>
                
                
                
            </tr>
        )}else{
          return ''
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
                <Link to="/projectleader/profile" className="form-control btn btn-success">
                                      Profile
                                  </Link>


                </div>
                <div class="form-group">
                <Link to="/projectleader/apply_leave" className="form-control btn btn-success">
                                      Apply Leave
                                  </Link>
                </div>
                <div class="form-group">
                <Link to="/projectleader/leaves" className="form-control btn btn-success">
                                      Leave History
                                  </Link>
                </div>
                
                <div class="form-group">
                <Link to="/projectleader/project" className="form-control btn btn-success">
                                      My Projects
                                  </Link>
                </div>
                <div class="form-group">
                <Link to="/projectleader/change_password" className="form-control btn btn-success">
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
                      <th>Date</th>
                      <th>Type</th>
                      <th>Reason</th>
                      
                      
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
