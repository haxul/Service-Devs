import React from "react";
import { connect } from "react-redux";
import Adding from "./Components/Adding.js";
import Table from "./Components/Table.js";

export function getDevelopers(param, callback) {
  fetch("/api/devs")
    .then(response => response.json())
    .then(response => {
      param = response;
      callback(param);
    })
    .catch(err => {
      console.log(err);
    });
}

class App extends React.Component {
  componentDidMount() {
    let res;
    getDevelopers(res, this.props.dUpdateDevs);
  }

  handleLinks = e => {
    let links = document.querySelectorAll(".nav-link");

    links.forEach(link => link.classList.remove("active"));
    e.target.classList.add("active");
    if (e.target.parentNode.classList.contains("add"))
      this.props.dHandleLinks("add");
    else if (e.target.parentNode.classList.contains("remove"))
      this.props.dHandleLinks("remove");
    else if (e.target.parentNode.classList.contains("update"))
      this.props.dHandleLinks("update");
  };

  render() {
    const { devs } = this.props.store;
    const devList = devs.map((dev, index) => {
      return (
        <tr key={index}>
          <th>{dev.id}</th>
          <td>{dev.name}</td>
          <td>{dev.position}</td>
          <td>{dev.skills.join(" ")}</td>
        </tr>
      );
    });

    return (
      <div className="container">
        <Table devList={devList} />

        <ul className="nav nav-tabs" onClick={this.handleLinks}>
          <li className="nav-item add">
            <a className="nav-link active" href="#">
              Add dev
            </a>
          </li>
          <li className="nav-item remove">
            <a className="nav-link" href="#">
              Remove dev
            </a>
          </li>
          <li className="nav-item update">
            <a className="nav-link" href="#">
              Update Dev
            </a>
          </li>
        </ul>

        <Adding />
      </div>
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    dUpdateDevs: devs => {
      dispatch({ type: "UPDATE_DEVS", payload: devs });
    },
    dHandleLinks: link => {
      dispatch({ type: "HANDLE_LINKS", payload: link });
    }
  })
)(App);
