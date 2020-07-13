import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DisplayContracts from "./DisplayContracts";

import PropTypes from "prop-types";

// web3
import web3 from "../ethereumconfig/web3eth";

// actions
import { MainOwner } from "../redux/actions./stateActions";
import { styles } from "../assets/styles";
import { Typography } from "@material-ui/core";

// donations
class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      err: false,
      insufficientBalance: "",
    };
  }
  render() {
    return (
      <div style={styles.MainForm}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Paper style={styles.paper}>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (this.state.address.length < 20) {
                    this.setState({ err: true });
                  }
                  const balance = await web3.eth.getBalance(this.state.address);
                  if (
                    0.001 > balance ||
                    0.001 * this.state.TokenAmount > balance
                  ) {
                    this.setState({
                      insufficientBalance:
                        "not enogh balance to start take loan form existing contract",
                    });
                  }
                  this.props.MainOwner(
                    this.state.address,
                    this.state.TokenAmount
                  );
                }}
              >
                <TextField
                  type="text"
                  label="Ethereum Account Address"
                  error={this.state.err}
                  fullWidth
                  onChange={(e) => {
                    this.setState({
                      address: e.target.value,
                    });
                  }}
                />
                <TextField
                  type="text"
                  label="TokenAmount"
                  error={this.state.err}
                  fullWidth
                  onChange={(e) => {
                    this.setState({
                      TokenAmount: e.target.value,
                    });
                    console.log(this.props.contracts);
                  }}
                />
                <br />
                <br />
                <Button variant="contained" color="primary" type="submit">
                  Start Sale of Tokens
                </Button>
              </form>
              <br />
              <br />
              <div>
                <Typography>
                  {this.state.insufficientBalance &&
                    this.state.insufficientBalance}
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <DisplayContracts />
      </div>
    );
  }
}

MainForm.propTypes = {
  contracts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contracts: state.contracts,
});

export default connect(mapStateToProps, { MainOwner })(MainForm);
