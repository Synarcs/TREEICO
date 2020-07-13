import React, { Component } from "react";
import { connect } from "react-redux";

export class BorrowedSale extends Component {
  render() {
    return <div>BorrowedSale</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BorrowedSale);
