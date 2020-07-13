import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Typography, Container } from "@material-ui/core";

import { Link } from "react-router-dom";

const styles = {
  button: {
    marginLeft: "auto",
    textDecoration: "none",
    color: "yello",
  },
  but: {
    marginLeft: "auto",
    padding: "2px",
  },
};

export default class Navbar extends Component {
  render() {
    return (
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography>The Main Dapp App</Typography>
          <div style={styles.but}>
            <Link to="/CheckBalance">
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  alert("Check Balance to Start a Sale");
                }}
                style={styles.button}
              >
                Balance
              </Button>
            </Link>
            <Link to="/StartSale">
              <Button
                color="inherit"
                variant="contained"
                onClick={() => {
                  alert("start a value");
                }}
                style={styles.button}
              >
                Start Sale
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
