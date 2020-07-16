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
  }
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
            Borrow Some Tokens from this ICO
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contracts: state.contracts,
});

export default connect(mapStateToProps)(BorrowedSale);
