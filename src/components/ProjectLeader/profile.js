import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom'

class PLProfile extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            role:'',
            speciality:''
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        console.log(decoded.payload.email);
        this.setState({
            ID: decoded.payload.ID,
            name: decoded.payload.name,
            email: decoded.payload.email,
            role: decoded.payload.role,
            speciality: decoded.payload.speciality,
            mobile:decoded.payload.mobile,
            gender: decoded.payload.gender,
            address: decoded.payload.address,
            dob: decoded.payload.dob
        })
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
                            <tr>
                                <td>Mobile</td>
                                <td>{this.state.mobile}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{this.state.gender}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{this.state.address}</td>
                            </tr>
                            <tr>
                                <td>Birth Day</td>
                                <td>{this.state.dob}</td>
                            </tr>
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        )
    }
}

export default PLProfile