import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class register extends Component {
  constructor() {
    super();

    this.state = {
      name:'',
      email: '',
      password: '',
      confirm_password:''
    };

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
  }
  register() {
    fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          confirm_password: this.state.confirm_password
        })
      })
      .then(res => res.json())
      .then(res => console.log(res));
      this.props.history.push(`/login`);
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
        <div className="row">
        < div className = "col-md-6" >
        <div className="card">
        < div className = "card-body" >
         <form onSubmit={this.handleSubmit} autoComplete="off" className="FormFields">
            <div className="form-group">
                <label className="FormField__Label" htmlFor="email">Company Name</label>
                <input type="text" id="name" className="form-control" autoComplete="false"  name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="form-control" autoComplete="false" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="form-group">
                <label className="" htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" autoComplete="false"  name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label className="" htmlFor="confirm_password">Confirm Password</label>
                <input type="password" id="confirm_password" className="form-control" autoComplete="false"  name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange} />
              </div>

              <div className="form-group">
                  <button className="form-control bg-success" onClick={()=>this.register()}>Sign In</button> 
                  <Link to="/login" className="FormField__Link">Already Registered</Link>
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
