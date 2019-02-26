import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom'

class Profile extends Component {
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
        console.log(token);
        try{
        const decoded = jwt_decode(token)
        if (decoded.payload.type===0){
        console.log(decoded.payload.type);
        this.setState({
            ID: decoded.payload.ID,
            name: decoded.payload.name,
            email: decoded.payload.email,
            role: decoded.payload.role,
            speciality: decoded.payload.speciality
        })
    }else{
        this.props.history.push(`../login`);
    }
        //console.log(state.ID);
        } catch(err){
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
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        )
    }
}

export default Profile