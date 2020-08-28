import React from "react";

function TableHead(props) {
  return (
    <thead>
      <tr>
        <th scope="col">Photo</th>
        <th scope="col" value="first" onClick={props.sortHandle}>
          First Name
        </th>
        <th scope="col" value="last">
          Last Name
        </th>
        <th scope="col" value="cell">
          Phone
        </th>
        <th scope="col" value="email">
          E-mail
        </th>
        <th scope="col" value="dob">
          DOB
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
