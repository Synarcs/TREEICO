import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, TextField } from "@material-ui/core";
import MainForm from "./MainForm";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

// dapp
import web3 from "../ethereumconfig/web3eth";
import { getAcc } from "../ethereumconfig/web3eth";
import { ContractData } from "../ethereumconfig/web3eth";
import DeployContract from "../ethereumconfig/DeployContract";

const styles = {
  marginTop: "100px",
  paper: {
    textAlign: "start",
    width: "inherit",
    marginBottom: "5%",
    padding: "30px",
  },
  ownerAddres: {
    margin: 0,
    width: "100px",
  },
  button: {
    marginTop: "30px",
    padding: "5px",
  },
};

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      err: false,
    };
    this.getter = this.getter.bind(this);
  }
  async componentDidMount() {
    getAcc().then(console.log);
  }
  getter() {}
  render() {
    return (
      <div style={styles}>
        <Grid container spacing={1}>
          <Grid item sm={8}>
            <Paper elevation={2} style={styles.paper}>
              <Typography>
                Contribute by Donating Tokens from Ether Wallet
              </Typography>
              <Typography>
                Current Rate :: <b>0.25 Ether</b>
              </Typography>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.state.address.length > 0
                    ? this.getter()
                    : this.setState({ err: true });
                }}
              >
                <span style={styles.ownerAddres}>
                  <TextField
                    type="text"
                    label="Ethereum Address"
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
                    label="Contract Name"
                    placeholder="Contract Name"
                    error={this.state.err}
                    fullWidth
                    onChange={(e) => {
                      this.setState({
                        contractName: e.target.value,
                      });
                    }}
                  />
                </span>

                <Button
                  color="secondary"
                  variant="contained"
                  className={styles.button}
                  type="submit"
                >
                  Get Balance
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid>
            <Paper style={styles.paper}>
              <Typography>Amount</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row">
          <Grid item sm={6}>
            <MainForm />
          </Grid>
          <Grid item sm={6}>
            <div>Hey</div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
