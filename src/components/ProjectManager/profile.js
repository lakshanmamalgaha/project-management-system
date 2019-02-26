import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom'

class PMProfile extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            role:'',
            speciality:''
        }
    }

   componentDidMount() {
       const token = localStorage.usertoken
       console.log(token);
       try {
           const decoded = jwt_decode(token)
           if (decoded.payload.type === 3) {
               console.log(decoded.payload.type);
               this.setState({
                   ID: decoded.payload.ID,
                   name: decoded.payload.name,
                   email: decoded.payload.email,
                   role: decoded.payload.role,
                   speciality: decoded.payload.speciality
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

    render () {
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
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.state.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td>{this.state.role}</td>
                            </tr>
                            <tr>
                                <td>Specility</td>
                                <td>{this.state.speciality}</td>
                            </tr>
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        )
    }
}

export default PMProfile