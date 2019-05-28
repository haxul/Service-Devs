import React from "react";
import { connect } from "react-redux";
import image from "./images/python.png";

class App extends React.Component {
  setOne = () => {
    this.props.dSetOne();
  };

  render() {
    return (
      <>
        <div className="container">
          <img
            src={image}
            style={{ float: "left" }}
            height="56px"
            width="56px"
            onClick={this.setOne}
          />
          <h1>Developers</h1>
        </div>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
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
    dSetOne: () => {
      dispatch({ type: "ONE" });
    }
  })
)(App);
