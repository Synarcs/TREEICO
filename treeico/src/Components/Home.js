import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import * as d3 from "d3";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: false,
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:7545/")
      .then(console.log)
      .catch((err) => {
        this.setState({
          err: true,
        });
      });
  }
  render() {
    return (
      <div style={{ marginTop: "120px" }}>
        {this.state.err ? (
          <Typography>Network Not Connected TO BlockChain</Typography>
        ) : (
          <Typography>Ready to GO!!</Typography>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
