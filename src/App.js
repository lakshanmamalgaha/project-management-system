import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar'
import Register from './components/register'
import Login from './components/login'
import add_employee from './components/admin/add_employee';
import add_role from './components/admin/add_role';
import add_Transaction from './components/ProjectLeader/addTransaction';
import ALProjectLeader from './components/ProjectLeader/apply_leave';
import ALProjectManager from './components/ProjectManager/apply_leave';
import PL_CP from './components/ProjectLeader/change_password'
import Employee from './components/admin/employee';
import Role from './components/admin/role';
import Profile from './components/admin/profile';
import EmpProfile from './components/Employee/profile';
import Employee_CP from './components/Employee/change_password'
import E_leaves from './components/Employee/leaves';
import E_project from './components/Employee/project'
import PLProfile from './components/ProjectLeader/profile';
import PMProfile from './components/ProjectManager/profile';
import ALEmployee from './components/Employee/leave_apply';
import Add_project from './components/ProjectManager/add_project';
import PM_CP from './components/ProjectManager/change_password'
import employee_editProfile from'./components/Employee/edit_profile';
import Admin_CP from './components/admin/change_password';
import leaves from'./components/admin/leaves';
import PL_editProfile from './components/ProjectLeader/edit_profile';
import PM_editProfile from'./components/ProjectManager/edit_profile';
import PL_project from './components/ProjectLeader/project';
import PM_project from './components/ProjectManager/project';
import PL_leaves from './components/ProjectLeader/leaves'
import PM_leaves from './components/ProjectManager/leaves';
import assign_member from './components/ProjectManager/assign_member';


class App extends Component {
  render() {
    return (
      //<div className="container">
      //<div className="row">
      <React.Fragment>
        <Navbar />
        <Switch>

          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/admin/add_employee" component={add_employee}/>
          <Route path="/admin/add_role" component={add_role}/>
          <Route path='/admin/leaves' component={leaves}/>
          <Route path="/employee/edit_profile" component={employee_editProfile}/>
          <Route path="/ProjectLeader/addTransaction" component={add_Transaction}/>
          <Route path="/projectleader/apply_leave" component={ALProjectLeader}/>
          <Route path="/projectmanager/apply_leave" component={ALProjectManager}/>
          <Route path="/projectleader/edit_profile" component={PL_editProfile}/>
          <Route path="/projectmanager/edit_profile" component={PM_editProfile}/>
          <Route path='/projectleader/change_password' component={PL_CP}/>
          <Route path="/admin/employee" component={Employee}/>
          <Route path="/admin/role" component={Role}/>
          <Route path="/admin/profile" component={Profile}/>
          <Route path='/admin/change_password' component={Admin_CP}/>
          <Route path="/employee/profile" component={EmpProfile}/>
          <Route path='/projectleader/profile' component={PLProfile}/>
          <Route path='/projectmanager/profile' component={PMProfile}/>
          <Route path='/projectmanager/add_project' component={Add_project}/>
          <Route path='/projectmanager/change_password' component={PM_CP}/>
          <Route path='/employee/leave_apply' component={ALEmployee}/>
          <Route path='/employee/change_password' component={Employee_CP}/>
          <Route path='/employee/leaves' component={E_leaves}/>
          <Route path='/projectleader/leaves' component={PL_leaves}/>
          <Route path='/projectmanager/leaves' component={PM_leaves}/>
          <Route path='/employee/project' component={E_project}/>
          <Route path='/projectleader/project' component={PL_project}/>
          <Route path='/projectmanager/project' component={PM_project}/>
          <Route path='/projectmanager/assign_member' component={assign_member}/>

        </Switch>
        
      </React.Fragment>
      //</div>
      
      //</div>
    );
  }
}

export default App;
