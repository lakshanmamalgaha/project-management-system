import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
//import {Table } from 'reactstrap';
import axios from 'axios';

export default class PL_project extends Component {
   

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
      }
      axios.get("http://localhost:8080/projectleader/myproject")
        .then((response) => {
          this.setState({
            myprojects: response.data
          })
        });
    
    }

  state={
    projects:[],
    myprojects:[]
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
            <div>
            <div class="card">
            <div class="card-header">
             Project : {project.project_name}
            </div>
            <div class="card-body">
              <h5 class="card-title">Type :{project.type} Project</h5>
              <p class="card-text">{project.description}</p>
              <p class="card-text">Budget - Rs : {project.budget}</p>
              <Link to={{
            pathname: '/projectleader/addTransaction',
            state: { projectID: project.ID }
        }} class="btn btn-primary">Add Transaction</Link>
            </div>
          </div>
          <br/>
          </div>
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
        
        <h3 className="text-center">Company Projects</h3>
          
                {
                    projects
                }
                
              
          
          </div>
          </div>
          </div>
          </div>
          
      
    )
  }
}
