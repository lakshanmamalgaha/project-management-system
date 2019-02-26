import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

class navbar extends Component {
     constructor(props) {
         super(props);

         this.toggle = this.toggle.bind(this);
         this.state = {
             isOpen: false
         };
     }

  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push('../login')
  }
  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      });
  }


  render() {
    const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        )
        const userLink = (
            < ul className = "navbar-nav " >
                
                <li className="nav-item">
                    <Link to="" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </Link>
                </li>
            </ul>
        )
    return (
        
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
             
              <NavItem>
                <NavLink ><div>
                       {
                           localStorage.usertoken ? userLink : loginRegLink
                       }
                    </div></NavLink>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
     /* <nav className = "navbar navbar-expand-lg navbar-light bg-light" >
      
      < Link to = "/"
      className="navbar-brand"> Home
       </Link>
       
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  
  < div className = "collapses" >
      {localStorage.usertoken ? userLink : loginRegLink}

    
  </div>
</nav>*/
    );
  }
}

export default withRouter(navbar)
