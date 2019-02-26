import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
import Select from 'react-select';

class Add_project extends Component {
    constructor() {
        super()
        this.state = {
           project_name: '',
            description: '',
            budget:'',
            project_type:'',
            selectedOption: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCha = (selectedOption) => {
        this.setState({
            selectedOption
        });
        console.log(`Option selected:`, selectedOption);
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
   handleChange(e) {
       let target = e.target;
       let value = target.type === 'checkbox' ? target.checked : target.value;
       let name = target.name;

       this.setState({
           [name]: value
       });
       this.setState({
           project_type: e.target.project_type
       });
   }

   handleSubmit(e) {
       e.preventDefault();
       fetch('http://localhost:8080/projectmanager/add_project', {
               method: 'POST',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   ID: this.state.comId,
                   project_name: this.state.project_name,
                   description: this.state.description,
                   budget: this.state.budget,
                   project_type: this.state.selectedOption.value
               })
           })
           .then(res => res.json())
           .then(res => console.log(res));
           this.props.history.push(`/projectmanager/project`);

   }
   

    render () {
        const {
            selectedOption
        } = this.state;
        const project_type = [{
                value: 'client',
                label: 'Client Project'
            },
            {
                value: 'company',
                label: 'Company Project'
            }
        ];
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
                <br />
                <div className="card">
                <div class="card-header text-center">
    Add Project
  </div>
        < div className = "card-body" >
         <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="form-group">
                <label className="FormField__Label" htmlFor="name">Project Name</label>
                <input type="text"  className="form-control"  name="project_name" value={this.state.project_name} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="description">Description</label>
                <input type="description" className="form-control"  name="description" value={this.state.description} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="role">Buget</label>
                <input type="text" className="form-control"  name="budget" value={this.state.budget} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label className="FormField__Label" htmlFor="role_name">Project Type</label>
                <div>
                  <Select
                    value={selectedOption}
                    onChange={this.handleCha}
                    options={project_type}
                  />
                  </div>
                
              </div>
              
              <div className="form-group">
                  <button className="form-control bg-success" >Submit</button> 
                  
              </div>
            </form>
          </div>
        </div>
                    
                </div>
            </div>
            </div>
        )
    }
}

export default Add_project