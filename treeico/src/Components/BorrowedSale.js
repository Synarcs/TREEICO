import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// material ui
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class BorrowedSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deployedAddress: "",
      hash: "",
    };
  }
  componentDidMount() {
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
  }
  render() {
    console.log(this.state);
    if (this.state.deployedAddress.length > 0) {
      if (this.props.contracts.contracts.length == 0) {
        return <Redirect to="/StartSale" />;
      } else {
        console.log(this.props);
        return (
          <div style={{ marginTop: "100px" }}>
            <Paper>
              {this.props.contracts.contracts.map((contract) => {
                if (contract.deployedAddress == this.state.deployedAddress) {
                  return (
                    <div>
                      <Typography>
                        DeployedAddress :: {this.state.deployedAddress}
                      </Typography>
                      <Typography>
                        Number of Borrowers :: {contract.childDonars.length}
                      </Typography>
                    </div>
                  );
                }
              })}
            </Paper>
            <Paper>
              <div>Home</div>
            </Paper>
          </div>
        );
      }
    } else {
      return <div>Loading..</div>;
    }
  }
}

const mapStateToProps = (state) => ({
  contracts: state.contracts,
});

export default connect(mapStateToProps)(BorrowedSale);
