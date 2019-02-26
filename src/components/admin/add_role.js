import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'

export default class add_role extends Component {
  
  componentDidMount() {
    const token = localStorage.usertoken
    console.log(token);
    try {
      const decoded = jwt_decode(token)
      if (decoded.payload.type === 0) {
        console.log(decoded.payload.type);
        this.setState({
          ID: decoded.payload.ID
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
      role_name: '',
      description: '',
      basic_salary:'',
      leaves:'',
      ot_rate:''
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
  addrole() {
    fetch('http://localhost:8080/admin/addrole', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comID:this.state.ID,
          role_name: this.state.role_name,
          description: this.state.description,
          basic_salary: this.state.basic_salary,
          leaves: this.state.leaves,
          ot_rate: this.state.ot_rate 
        })
      })
      .then(res => res.json())
      .then(res => console.log(res));
      console.log(this.state.ID);
      //this.props.history.push(`/admin/role`);
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
                <br />
        <div className="card">
        < div className = "card-body" >
         <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="form-group">
                <label className="FormField__Label" htmlFor="role_name">Role Name</label>
                <input type="text" id="role_name" className="form-control"  name="role_name" value={this.state.role_name} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="description">Description</label>
                <input type="text" id="description" className="form-control"  name="description" value={this.state.description} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="basic_salary">Basic Salary</label>
                <input type="text" id="basic_salary" className="form-control"  name="basic_salary" value={this.state.basic_salary} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="leaves">No Of Leaves</label>
                <input type="text" id="leaves" className="form-control"  name="leaves" value={this.state.leaves} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="ot_rate">OT Rate</label>
                <input type="text" id="ot_rate" className="form-control"  name="ot_rate" value={this.state.ot_rate} onChange={this.handleChange} />
              </div>

              <div className="form-group">
                  <button className="form-control bg-success" onClick={()=>this.addrole()}>Submit</button> 
                  
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
