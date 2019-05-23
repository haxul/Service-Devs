import React from "react";
import image from "./images/python.png";

class App extends React.Component {
  render() {
    return (
      <>
        <h1>APP is React</h1>
        <img src = {image} />
      </>
    )
  }
}

export default App;