import React from "react";

function ResultTable(props) {
  return (
    <h1 className="list-group">
      {props.name}
      {/* {props.results.map((result) => (
        <li className="list-group-item" key={result.id}>
          <img
            alt={result.title}
            className="img-fluid"
            src={result.images.original.url}
          />
        </li>
      ))} */}
    </h1>
  );
}

export default ResultTable;
