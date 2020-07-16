import React, { Component } from "react";
import { connect } from "react-redux";

// material ui
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export class BuyTokens extends Component {
  render() {
    return <div>Further Child Buyers for a sub child Component</div>;
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(BuyTokens);
