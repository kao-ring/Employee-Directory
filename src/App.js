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
  };

  handleInputChange = (event) => {
    const searchLetter = event.target.value.trim().toLowerCase();
    console.log(searchLetter + " : " + this.state.select);
    // switch (this.state.select) {
    //   case "first":
    //     var selectSwitch = "name.";

    //     break;

    //   default:
    //     break;
    // }

    API.search()
      .then((res) => {
        const newState = res.data.results.filter((employee) => {
          //Switch case?? first/last/cell/email/dob - this.state.select
          switch (this.state.select) {
            case "first":
              return (
                employee.name.first.toLowerCase().includes(searchLetter) ===
                true
              );
              break;
            case "last":
              return (
                employee.name.last.toLowerCase().includes(searchLetter) === true
              );
              break;
            case "cell":
              return employee.cell.includes(searchLetter) === true;
              break;
            case "email":
              return (
                employee.email.toLowerCase().includes(searchLetter) === true
              );
              break;
            case "dob":
              return employee.dob.includes(searchLetter) === true;
              break;
            default:
              return employee.name.first.includes(searchLetter) === true;

              break;
          }
        });
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

        <ResultTable employees={this.state.employees} />
      </div>
    );
  }
}

export default App;
