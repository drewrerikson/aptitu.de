import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

class App extends Component {

  constructor(properties) {
      super(properties);
      this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:5000/test")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
      this.callAPI();
  }

  render() {
    return (
      <div className="wrapper">
        <Router>
          <Sidebar />
          <Route path='/' component={Main} />
        </Router>
      </div>
    );
  }
}

export default App;
