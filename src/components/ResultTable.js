import React from "react";

function ResultTable(props) {
  console.log(props);
  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone</th>
            <th scope="col">E-mail</th>
            <th scope="col">DOB</th>
          </tr>
        </thead>
        <tbody>
          {props.employees.map((employee) => (
            <tr key={employee.login.username}>
              <td>{employee.name.first}</td>
              <td>{employee.name.last}</td>
              <td>{employee.cell}</td>
              <td>{employee.email}</td>
              <td>{employee.dob.date.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
