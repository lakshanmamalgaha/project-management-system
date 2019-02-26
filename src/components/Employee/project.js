import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import {Table } from 'reactstrap';
import axios from 'axios';

export default class E_project extends Component {
   

  componentDidMount() {
      const token = localStorage.usertoken
      console.log(token);
      try {
        const decoded = jwt_decode(token)
        if (decoded.payload.type === 1) {
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
    projects:[]
  }
  componentWillMount() {
    axios.get("http://localhost:8080/employee/project")
      .then((response) => {
        this.setState({
          projects: response.data
        })
      });
  }

  render() {
     let projects = this.state.projects.map(project => {
       if(project.comId===this.state.comId){
        return(
            <tr>
                <td>
                   {
                     project.project_name
                   }  </td>
            <td>
                  {project.startDate} </td>
                
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
          <Link to="/employee/profile" className="form-control btn btn-success">
                                Profile
                            </Link>
          
          </div>
          <div class="form-group">
          <Link to="/employee/leave_apply" className="form-control btn btn-success">
                                Apply Leave
                            </Link>
          </div>
          <div class="form-group">
          <Link to="/employee/leaves" className="form-control btn btn-success">
                                Leave History
                            </Link>
          </div>
          <div class="form-group">
          <Link to="/employee/project" className="form-control btn btn-success">
                                Projects
                            </Link>
          </div>
          <div class="form-group">
          <Link to="/employee/change_password" className="form-control btn btn-success">
                                Settings
                            </Link>
          </div>
          


        </div>
                <div className="col-md-8">
                <br />
        <div className="App container">

        <h3 className="text-center">Company Projects</h3>
          <Table>
              <thead>
                  <tr>
                      <th>Project</th>
                      <th>Started</th>
                     
                  </tr>
              </thead>
              <tbody>
                {
                    projects
                }
                
              </tbody>
          </Table>
          </div>
          </div>
          </div>
          </div>
      
    )
  }
}
