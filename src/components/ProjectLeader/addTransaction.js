import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Select from 'react-select';
import jwt_decode from 'jwt-decode'


export default class add_role extends Component {

  componentDidMount() {
    const token = localStorage.usertoken
    console.log(token);
    try {
      const decoded = jwt_decode(token)
      if (decoded.payload.type === 2) {
        console.log(decoded.payload.type);
        this.setState({
          ID: decoded.payload.ID,
          comId: decoded.payload.comId
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
      type: null,
      description: '',
      amount:''
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
  handle = (type) => {
    this.setState({
      type
    });
    console.log(`Option selected:`, type);
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('The form was submitted with the following data:');
    console.log(this.state);
  }
  addTransaction() {
    fetch('http://localhost:8080/projectleader/addtransaction', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectID: this.props.location.state.projectID,
          type: this.state.type.value,
          amount:this.state.amount,
          description: this.state.description,
          comId:this.state.comId
        })
      })
      .then(res => res.json())
      .then(res => console.log(res));
      this.props.history.push(`/projectleader/project`);
  }
  render() {
    const { type } = this.state;
    const tran_type = [{value:'expense',label:'Expense'},
                  {
                    value: 'income',
                    label: 'Income'
                  }];
    return (
      <React.Fragment>
        <div className="container">
        <div className="row">
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
        <div className="card">
        <div class="card-header text-center">
    Add Transaction
  </div>
        < div className = "card-body" >
         <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="form-group">
                <label className="FormField__Label" htmlFor="role_name">Transaction Type</label>
                <div>
                <Select
                    value={type}
                    onChange={this.handle}
                    options={tran_type}
                  />
                  </div>
                
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="amount">Amount</label>
                <input type="text" id="amount" className="form-control"  name="amount" value={this.state.amount} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="description">Description</label>
                <input type="text" id="description" className="form-control"  name="description" value={this.state.description} onChange={this.handleChange} />
              </div>
              
              

              <div className="form-group">
                  <button className="form-control bg-success" onClick={()=>this.addTransaction()}>Submit</button> 
                  
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
