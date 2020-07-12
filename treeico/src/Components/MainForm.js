import React, { Component } from "react";
import { connect } from "react-redux";

// donations
export class MainForm extends Component {
  render() {
    return <div>Home</div>;
  }
}

const mapStateToProps = (state) => ({
  contracts: state.contracts,
});

export default connect(mapStateToProps)(MainForm);
