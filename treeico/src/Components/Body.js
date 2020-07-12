import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MainForm from "./MainForm";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

// dapp
import web3 from "../ethereumconfig/web3eth";
import { getAcc } from "../ethereumconfig/web3eth";

// styles
import { styles } from "../assets/styles";

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      err: false,
      amount: 0,
    };
    this.getter = this.getter.bind(this);
  }
  async componentDidMount() {
    getAcc().then(console.log);
  }
  async getter() {
    //
    const balance = await web3.eth.getBalance(this.state.address);
    const ether = web3.utils.fromWei(balance, "ether");
    this.setState({
      amount: ether,
    });
  }
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
                <b>Check if balance satisfy for Sale</b>
              </Typography>
              <Typography>
                Current Rate :: <b>0.001 Ether</b>
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
              <Typography>
                Amount in Wallet ::{" "}
                {this.state.amount == 0 ? "" : this.state.amount}
              </Typography>
              {this.state.amount == 0 ? (
                ""
              ) : (
                <span>
                  Max Tokens possible to Sell{this.state.amount / 0.001}
                </span>
              )}
            </Paper>
          </Grid>
        </Grid>
        {this.state.err ? (
          <div>
            <Paper>
              <Typography color="primary">
                Can Donate Max of {this.state.amount / 0.001} Tokens
              </Typography>
            </Paper>
          </div>
        ) : null}
      </div>
    );
  }
}
