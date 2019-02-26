import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
import Select from 'react-select';


export default class ALEmployee extends Component {
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
    }
  }
  constructor() {
    super();

    this.state = {
      type_err:'',
      day_err:'',
      reason_err:'',
      reason:'',
      selectedOption: null,
      selected:null
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
  handleCha = (selectedOption) => {
    this.setState({
      selectedOption
    });
    console.log(`Option selected:`, selectedOption);
  }
  handle = (selected) => {
    this.setState({
      selected
    });
    console.log(`Option selected:`, selected);
  }
  validate=()=>{
    let type_err;
    let day_err;
    let reason_err;
    const { selected,selectedOption,reason } = this.state;
    if(selected===null){
      day_err="Please select Leave Day";
      
    }
    if (day_err) {
      this.setState({
        day_err
      });
      return false;
    }
    if(selectedOption===null){
      type_err="Please select Leave Day";
    }
      if (type_err) {
        this.setState({
          type_err
        });
        return false;
      }
      if(reason===''){
      reason_err="Please select Leave Day";
      if (reason_err) {
        this.setState({
          reason_err
        });
        return false;
      }}
      return true;


  }

  handleSubmit(e) {
    e.preventDefault();
    
    const isValid=this.validate();
    if(isValid){
    fetch('http://localhost:8080/employee/apply_leave', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ID:this.state.ID,
          selected: this.state.selected.value ,
          selectedOption:this.state.selectedOption.value,
          reason:this.state.reason,
          comId:this.state.comId
        })
      })
      .then(res => res.json())
      .then(res => console.log(res));
      console.log(this.state.ID);
      this.props.history.push(`/employee/leaves`);

    
  }
}
  render() {
    const { selectedOption } = this.state;
    const leave_type = [{value:'normal',label:'Normal'},
                  {
                    value: 'special',
                    label: 'Special'
                  }];
    const { selected } = this.state;
    const leave_day = [{value:'full_day',label:'Full Day'},
                  {
                    value: 'half_day',
                    label: 'Half Day'
                  }];
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
    Apply Leave
  </div>
        < div className = "card-body" >
         <form onSubmit={this.handleSubmit} className="FormFields">
         <div className="text-danger">{this.state.type_err}</div>
            <div className="form-group">
                <label className="FormField__Label" htmlFor="role_name">Leave Type</label>
                <div>
                  <Select
                    value={selectedOption}
                    onChange={this.handleCha}
                    options={leave_type}
                  />
                  </div>
                
              </div>
              <div className="form-group">
            <label>Leave Day</label>
              <div>
                <Select
                    value={selected}
                    onChange={this.handle}
                    options={leave_day}
                  />
                  </div>
                  
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="basic_salary">Reason</label>
                <input type="text" id="reason" className="form-control"  name="reason" value={this.state.reason} onChange={this.handleChange} />
              </div>
              

              <div className="form-group">
                  <button type="submit" className="form-control bg-success">Apply</button> 
                  
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
