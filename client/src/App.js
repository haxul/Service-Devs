import React from "react";
import { connect } from "react-redux";
import image from "./images/python.png";

class App extends React.Component {
  handleName = e => {
    this.props.dHandleName(e.target.value);
  };
  handlePosition = e => {
    this.props.dHandlePosition(e.target.value);
  };
  handleSkills = e => {
    this.props.dHandleSkills(e.target.value);
  };
  updateDevs = () => {};

  addDev = () => {
    const { name, position, skills } = this.props.store;
    const skillList = skills.replace(/[\s+\.+,+]/g, ",").split(",");
    fetch("/api/addDevs", {
      method: "post",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        name: name,
        position: position,
        skills: skillList
      })
    });
  };

  getDevs = () => {
    fetch("/api/devs")
      .then(response => response.json())
      .then(response => {
        this.props.dUpdateDevs(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getDevs();
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
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="name"
                onChange={this.handleName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                className="form-control"
                id="position"
                placeholder="position"
                onChange={this.handlePosition}
              />
            </div>
            <div className="form-group">
              <label htmlFor="skills">Skills description</label>
              <textarea
                className="form-control"
                id="skills"
                rows="3"
                onChange={this.handleSkills}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              id="add_dev"
              onClick={this.addDev}
            >
              add developer
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    dHandleName: name => {
      dispatch({ type: "NAME", payload: name });
    },
    dHandlePosition: position => {
      dispatch({ type: "POSITION", payload: position });
    },
    dHandleSkills: skills => {
      dispatch({ type: "SKILLS", payload: skills });
    },
    dUpdateDevs: devs => {
      dispatch({ type: "UPDATE_DEVS", payload: devs });
    }
  })
)(App);
