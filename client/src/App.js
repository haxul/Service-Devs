import React from "react";
import { connect } from "react-redux";
import image from "./images/python.png";
import Adding from "./Components/Adding.js";

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
    let tmp;
    getDevelopers(tmp, this.props.dUpdateDevs);
  }

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
      <>
        <div className="container">
          <img
            src={image}
            style={{ float: "left" }}
            height="56px"
            width="56px"
          />
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
            <tbody>{devList}</tbody>
          </table>
        </div>

        <Adding/>
      </>
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
    }
  })
)(App);
