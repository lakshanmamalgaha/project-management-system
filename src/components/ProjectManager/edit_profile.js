import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'

export default class PM_editProfile extends Component {
  
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
          mobile:decoded.payload.mobile,
          gender:decoded.payload.gender,
          address:decoded.payload.address,
          dob:decoded.payload.dob
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
  constructor() {
    super();

    this.state = {
      
      
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

    console.log('The form was submitted with the following data:');
    console.log(this.state);
  }
  update() {
    fetch('http://localhost:8080/employee/edit_profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ID:this.state.ID,
          mobile: this.state.mobile,
          address: this.state.address,
          gender: this.state.gender,
          dob: this.state.dob
        })
      })
      .then(res => res.json())
      .then(res => console.log(res));
      console.log(this.state.ID);
      this.props.history.push(`/employee/edit_profile`);
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
    Edit Profile
  </div>
        < div className = "card-body" >
         <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input type="text"  className="form-control"  name="mobile" value={this.state.mobile} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label  htmlFor="gender">Gender</label>
                <input type="text"  className="form-control"  name="gender" value={this.state.gender} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label  htmlFor="address">Address</label>
                <input type="text" className="form-control"  name="address" value={this.state.address} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="leaves">Birthday</label>
                <input type="date" id="dob" className="form-control"  name="dob" value={this.state.dob} onChange={this.handleChange} />
              </div>
              

              <div className="form-group">
                  <button className="form-control bg-success" onClick={()=>this.update()}>Submit</button> 
                  
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
