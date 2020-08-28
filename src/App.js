import React from "react";
import API from "./api.js";
import "./App.css";
import ResultTable from "./components/ResultTable.js";

class App extends React.Component {
  state = {
    employees: [],
    select: "",
  };

  componentDidMount() {
    API.search()
      .then((res) => {
        this.setState({ employees: res.data.results });
      })
      .catch((err) => console.log(err));
  }

  handleSelectChange = (event) => {
    const select = event.target.value;
    this.setState({ select: select });
    // console.log(select);
  };

  handleInputChange = (event) => {
    const searchLetter = event.target.value.trim().toLowerCase();
    console.log(searchLetter + " : " + this.state.select);

    API.search()
      .then((res) => {
        const newState = res.data.results.filter(
          (employee) =>
            //Switch case?? first/last/cell/email/dob - this.state.select
            employee.name.first.toLowerCase().includes(searchLetter) === true
        );
        this.setState({ employees: newState });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-3">Employee Directory</h1>
          <p className="lead">
            Easy to search your employee by fisrt name, last name, e-mail, or
            phone number.
          </p>
        </div>
        <nav className="navbar navbar-light bg-light text-center">
          <a className="navbar-brand">Employee Search</a>
          <form className="form-inline">
            <select
              className="custom-select my-1 mr-sm-2"
              onChange={this.handleSelectChange}
            >
              <option>Choose...</option>
              <option value="name.first">First Name</option>
              <option value="name.last">Last Name</option>
              <option value="cell">Phone</option>
              <option value="email">E-mail</option>
              <option value="dob">DOB</option>
            </select>
            <input
              className="form-control mr-sm-2"
              type="search"
              onChange={this.handleInputChange}
              placeholder="Search"
            />
          </form>
        </nav>

        <ResultTable employees={this.state.employees} />
      </div>
    );
  }
}

export default App;
// select={} search={}
