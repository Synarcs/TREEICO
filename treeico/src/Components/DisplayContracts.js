import React, { Component } from "react";
import { connect } from "react-redux";

export class DisplayContracts extends Component {
  render() {
    return <div>Displaying Here</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayContracts);
