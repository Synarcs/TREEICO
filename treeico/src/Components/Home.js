import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import * as d3 from "d3";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Grid } from "@material-ui/core";

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
        <Paper>
          {/* <Typography> */}
          {/* <Typography> */}
          <Alert severity="info">
            <AlertTitle>Dont Have Enough Balance for Sale...</AlertTitle>
            Create Your own Ico Sale from the Available Sale Ico going On
          </Alert>
          <Divider />
          <Alert severity="info">
            <AlertTitle>Have Enough Balance...</AlertTitle>
            Create Your Own Ico Sale Based On Balance
          </Alert>
          {/* </Typography> */}
        </Paper>
        <br />
        <Grid>
          <Grid item xs={6} sm={6}>
            <span>
              Create A Root Sale for underlying Client Compoany
              <Button color="secondary" variant="contained">
                RootSale
              </Button>
            </span>
          </Grid>
          <Grid item xs={6} sm={6}>
            <span>Get the Balance for your Account</span>
            <Button color="primary" variant="contained">
              Get Balance
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
