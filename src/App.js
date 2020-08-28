import React from "react";
import API from "./api.js";
import "./App.css";
import ResultTable from "./components/ResultTable.js";
import TableHead from "./components/TableHead.js";

class App extends React.Component {
  state = {
    employees: [],
    select: "",
    order: "descend",
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
  };

  handleInputChange = (event) => {
    const searchLetter = event.target.value.trim().toLowerCase();
    console.log(searchLetter + " : " + this.state.select);

    API.search()
      .then((res) => {
        const newState = res.data.results.filter((employee) => {
          if (this.state.select === "first") {
            return (
              employee.name.first.toLowerCase().includes(searchLetter) === true
            );
          } else if (this.state.select === "last") {
            return (
              employee.name.last.toLowerCase().includes(searchLetter) === true
            );
          } else if (this.state.select === "dob") {
            return employee.dob.date.includes(searchLetter) === true;
          } else if (this.state.select === "cell") {
            return employee.cell.includes(searchLetter) === true;
          } else if (this.state.select === "email") {
            return employee.email.toLowerCase().includes(searchLetter) === true;
          }
        });
        this.setState({ employees: newState });
      })
      .catch((err) => console.log(err));
  };

  sortHandle = () => {
    if (this.state.order === "descend") {
      this.setState({
        order: "ascend",
      });
    } else {
      this.setState({
        order: "descend",
      });
    }
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
          <h3>Employee Search</h3>
          <form className="form-inline">
            <select
              className="custom-select my-1 mr-sm-2"
              onChange={this.handleSelectChange}
            >
              <option>Choose...</option>
              <option value="first">First Name</option>
              <option value="last">Last Name</option>
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
        <div className="container">
          <table className="table table-hover">
            <TableHead sortHandle={this.sortHandle} />
            <ResultTable employees={this.state.employees} />
          </table>
        </div>
      </div>
    );
  }
}

export default App;
