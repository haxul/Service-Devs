import React from "react";
import image from "../images/python.png";

const Table = props => {
  return (
    <>
      <div className="container">
        <img src={image} style={{ float: "left" }} height="56px" width="56px" />
        <h1>Developers</h1>
      </div>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#id</th>
              <th scope="col">Name</th>
              <th scope="col">Position</th>
              <th scope="col">Skills</th>
            </tr>
          </thead>
          <tbody>{props.devList}</tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
