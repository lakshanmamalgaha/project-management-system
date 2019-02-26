import React, { Component } from 'react'

export default class accept extends Component {
    componentDidMount() {
      const token = localStorage.usertoken
      console.log(token);
      try {
        const decoded = jwt_decode(token)
        if (decoded.payload.type === 2) {
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
      fetch('http://localhost:8080/admin/accept', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ID: this.props.location.state.leaveID
        })
      })
      .then(res => res.json())
      .then(res => console.log(res));
      this.props.history.push(`/login`);
    
    
    }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
