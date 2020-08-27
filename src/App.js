import React from "react";
import API from "./api.js";
import "./App.css";
import ResultTable from "./components/ResultTable.js";

class App extends React.Component {
  state = {
    employees: [],
  };
  //getting result from api calll
  // componentDidMount() {
  //   this.searchGiphy("kittens");
  // }

  // searchEmployee = query => {
  //   API.search(query)
  //     .then(res => this.setState({ results: res.data.results }))
  //     .catch(err => console.log(err));
  // };
  componentDidMount() {
    API.search()
      .then((res) => this.setState({ employees: res.data.results }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-3">Employee Directory</h1>
          <p className="lead">
            Easy to search your employee by fisrt name, last name, age, and
            phone number.
          </p>
        </div>
        <nav className="navbar navbar-light bg-light text-center">
          <a className="navbar-brand">Employee Search</a>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </nav>

        <ResultTable employees={this.state.employees} />
      </div>
    );
  }
}

export default App;
