import React from "react";

function TableHead(props) {
  return (
    <thead>
      <tr>
        <th scope="col" id="sort">
          (Sort by...)
        </th>
        <th scope="col" value="first" onClick={props.sortHandle}>
          First Name
        </th>
        <th scope="col" value="last" onClick={props.sortHandle}>
          Last Name
        </th>
        <th scope="col" value="cell" onClick={props.sortHandle}>
          Phone
        </th>
        <th scope="col" value="email" onClick={props.sortHandle}>
          E-mail
        </th>
        <th scope="col" value="dob" onClick={props.sortHandle}>
          DOB
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
