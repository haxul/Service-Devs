import React from "react";
import { connect } from "react-redux";
import { getDevelopers } from "../App";

class Adding extends React.Component {
  handleName = e => {
    this.props.dHandleName(e.target.value);
  };

  handlePosition = e => {
    this.props.dHandlePosition(e.target.value);
  };

  handleSkills = e => {
    this.props.dHandleSkills(e.target.value);
  };

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
    }).then(() => {
      let tmp;
      getDevelopers(tmp, this.props.dUpdateDevs);
    });
  };

  render() {
    return (
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
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    dHandleName: name => {
      dispatch({
        type: "NAME",
        payload: name
      });
    },
    dHandlePosition: position => {
      dispatch({
        type: "POSITION",
        payload: position
      });
    },
    dHandleSkills: skills => {
      dispatch({
        type: "SKILLS",
        payload: skills
      });
    },
    dUpdateDevs: devs => {
      dispatch({
        type: "UPDATE_DEVS",
        payload: devs
      });
    }
  })
)(Adding);
