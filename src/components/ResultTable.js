import React from "react";

function ResultTable(props) {
  console.log(props);
  return (
    <tbody>
      {props.employees.map((employee) => (
        <tr key={employee.login.username}>
          <td>
            <img src={employee.picture.medium} alt={employee.name.first} />
          </td>
          <td>{employee.name.first}</td>
          <td>{employee.name.last}</td>
          <td>{employee.cell}</td>
          <td>{employee.email}</td>
          <td>{employee.dob.date.slice(0, 10)}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default ResultTable;
