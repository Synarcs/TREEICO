import React, { Component } from "react";
import { connect } from "react-redux";

// material ui
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
// web3
import { getOwnerContract } from "../ethereumconfig/ethAssets";
import { Divider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class BorrowedSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deployedAddress: "",
      hash: "",
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addChildDonarstoParent = this.addChildDonarstoParent.bind(this);
  }
  async addChildDonarstoParent() {}
  handleClick() {
    this.setState({
      open: true,
    });
  }

  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: false,
    });
  }

  async componentDidMount() {
    const {
      match: { params },
      location: { hash },
    } = this.props;
    this.setState({
      deployedAddress: params.address,
      hash,
    });
    let current = this.setState({
      rootDetails: current,
    });
    const contract = await getOwnerContract(this.state.deployedAddress);
    this.setState({
      contract,
    });
    console.log(this.state.contract);
  }
  render() {
    return (
      <div style={{ marginTop: "100px" }}>
        <Paper elevation={10}>
          {this.props.contracts.contracts.map((contract) => {
            if (contract.deployedAddress == this.state.deployedAddress) {
              return (
                <div key={this.state.deployedAddress}>
                  <Typography>
                    <b>OwnerAddress</b> :: {contract.ownerAddress}..
                  </Typography>
                  <Typography>
                    <b>deployedAddress</b>
                    :: {this.state.deployedAddress}
                  </Typography>
                  <Typography>
                    <b>Number of Borrowers</b>
                    :: {contract.childDonars.length}
                  </Typography>
                </div>
              );
            }
          })}
        </Paper>
        <Divider />
        <Paper>
          <Button variant="outlined" onClick={this.handleClick}>
            Click for More Info..
          </Button>
          <Snackbar
            open={this.state.open}
            autoHideDuration={4000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="success">
              Borrow Some Tokens from this ICO
            </Alert>
          </Snackbar>
        </Paper>
        <br />
        <br />
        <Paper>
          <form
            onSubmit={async (e) => {
              this.addChildDonarstoParent;
            }}
          >
            <TextField
              type="text"
              label="Ethereum Account Address to Transfer Money"
              fullWidth
              onChange={(e) => {
                this.setState({
                  address: e.target.value,
                });
              }}
            />
            <TextField
              type="text"
              disabled
              fullWidth
              value={`Deployed Address ${this.state.deployedAddress}`}
            />
            <TextField
              type="text"
              label="price for Each Token In Ether"
              fullWidth
              onChange={(e) => {
                this.setState({
                  TokenAmount: e.target.value,
                });
              }}
            />
            <br />
            <br />
            <br />
            <Button variant="contained" color="secondary" type="submit">
              Start Your Buisness from This ICO
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contracts: state.contracts,
});

export default connect(mapStateToProps)(BorrowedSale);
