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
    orderBy: "first",
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

  sortHandle = (event) => {
    // const select = event.target.value;
    // console.log(event.target.getAttribute("value"));
    this.setState({ orderBy: event.target.getAttribute("value") });

    if (this.state.order === "descend") {
      this.handleSortByDescend();
      this.setState({
        order: "ascend",
      });
    } else {
      this.handleSortByAscend();
      this.setState({
        order: "descend",
      });
    }
  };

  handleSortByAscend() {
    console.log("Ascendだよー。" + this.state.orderBy);
    if (this.state.orderBy === "cell") {
      this.state.employees.sort(function (a, b) {
        if (a.cell > b.cell) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (this.state.orderBy === "email") {
      this.state.employees.sort(function (a, b) {
        if (a.email > b.email) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (this.state.orderBy === "first") {
      this.state.employees.sort(function (a, b) {
        if (a.name.first > b.name.first) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (this.state.orderBy === "last") {
      this.state.employees.sort(function (a, b) {
        if (a.name.last > b.name.last) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (this.state.orderBy === "dob") {
      this.state.employees.sort(function (a, b) {
        if (a.dob.date > b.dob.date) {
          return 1;
        } else {
          return -1;
        }
      });
    }
  }

  handleSortByDescend() {
    console.log("Descendだよー。" + this.state.orderBy);
    console.log("Ascendだよー。" + this.state.orderBy);
    if (this.state.orderBy === "cell") {
      this.state.employees.sort(function (a, b) {
        if (a.cell > b.cell) {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (this.state.orderBy === "email") {
      this.state.employees.sort(function (a, b) {
        if (a.email > b.email) {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (this.state.orderBy === "first") {
      this.state.employees.sort(function (a, b) {
        if (a.name.first > b.name.first) {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (this.state.orderBy === "last") {
      this.state.employees.sort(function (a, b) {
        if (a.name.last > b.name.last) {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (this.state.orderBy === "dob") {
      this.state.employees.sort(function (a, b) {
        if (a.dob.date > b.dob.date) {
          return -1;
        } else {
          return 1;
        }
      });
    }
  }

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
