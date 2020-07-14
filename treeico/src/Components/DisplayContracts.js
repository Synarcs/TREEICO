import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Container,
} from "@material-ui/core";
import PropTypes from "prop-types";

class DisplayContracts extends Component {
  render() {
    return (
      <Container>
        <Grid container spacing={4}>
          {this.props.contracts.contracts.map((contract) => {
            return (
              <Grid item key={contract.deployedAddress}>
                <Card>
                  <CardContent>
                    <Typography component="h5" variant="h5">
                      Hashed Address::{contract.ownerAddress.substring(0, 5)}...
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {contract.deployedAddress}
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary">
                      Maximum Bid Awardrd By Owner{contract.tokenSale}
                    </Typography>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        this.props.history.push(
                          `BorrowTokens/${contract.deployedAddress}`
                        );
                      }}
                    >
                      Borrow Some Tokens
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  }
}

DisplayContracts.propTypes = {
  contracts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contracts: state.contracts,
});

export default connect(mapStateToProps)(DisplayContracts);
