import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'

//let err='';

export default class Employee_CP extends Component {
  
  componentDidMount() {
    const token = localStorage.usertoken
    console.log(token);
    try {
      const decoded = jwt_decode(token)
      if (decoded.payload.type === 1) {
        console.log(decoded.payload.type);
        this.setState({
          ID: decoded.payload.ID,
         // empID:decoded.payload.empID
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
      err: '',
      password: '',
      confirm_password: ''
  };
  constructor() {
    super();

    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }
  

  handleSubmit(e) {
    e.preventDefault();

    console.log('The form was submitted with the following data:');
    console.log(this.state);
    
    let err='';
    const { password, confirm_password } = this.state;
    
    if (password !== confirm_password) {
        err="Passwords don't match";
        if (err) {
          this.setState({
            err
          });
          
        }
        
    } 
    else{
        
    fetch('http://localhost:8080/api/change_password', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          empID:this.state.ID,
          password: this.state.password 
        })
      })
      .then(res => res.json())
      .then(res => console.log(res));
      console.log(this.state.ID);
      this.props.history.push(`/employee/profile`);
  
    }
    if(err) {
        //this.setState({err})
        console.log(err)
        // make API call
    }
  }
 
  render() {
    return (
      <React.Fragment>
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
        <div className="card">
        <div class="card-header text-center">
    Change Password
  </div>
        < div className = "card-body" >
         <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="text-danger text-center">{this.state.err}</div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control"  name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control"  name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange} />
              </div>
              

              <div className="form-group">
                  <button type="submit" className="form-control bg-success" >Save Changes</button> 
                  
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
