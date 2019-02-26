import React, { Component } from 'react';
import login from './userAuth';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';


export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(e) {
   this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      if (res) {
         
           const token = localStorage.usertoken
           const decoded = jwt_decode(token)
           console.log(decoded.payload.type);
           if(decoded.payload.type===0){
             console.log(decoded.payload.name);
             this.props.history.push(`/admin/profile`)
           }
           if (decoded.payload.type === 1) {
             console.log(decoded.payload.name);
             this.props.history.push(`/employee/profile`)
           }
           if (decoded.payload.type === 2) {
             console.log(decoded.payload.name);
             this.props.history.push(`/projectleader/profile`)
           }
           if (decoded.payload.type === 3) {
             console.log(decoded.payload.name);
             this.props.history.push(`/projectmanager/profile`)
           }
           
         
        //this.props.history.push(`/admin/profile`)
      }
    });

    
  }

  /*signIn() {
    

    fetch('http://localhost:8080/admin/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
          email: this.state.email,
          password: this.state.password })
  })
  .then(res => res.json())
    .then(res => console.log(res));

    
};*/

  render() {
    return (
      <React.Fragment>
        <div className="container">
        <div className="row">
        < div className = "col-md-6" >
        <div className="card">
        < div className = "card-body" >
         <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="form-group">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="form-control"  name="email" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="form-group">
                <label className="" htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="form-group">
                <button className="form-control bg-success" /*onClick={()=>this.signIn()}*/>Sign In</button> 
                  <Link to="/register" className="FormField__Link">Create an account</Link>
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


