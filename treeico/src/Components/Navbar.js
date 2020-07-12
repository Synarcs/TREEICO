import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Typography, Container } from "@material-ui/core";

const styles = {
  button: {
    marginLeft: "auto",
  },
};

export default class Navbar extends Component {
  render() {
    return (
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography>The Main Dapp App</Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              alert("dapp App");
            }}
            style={styles.button}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}
