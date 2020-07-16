import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Body from "./Components/Body";
import Home from "./Components/Home";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// redux
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { fetcher } from "./redux/actions/stateActions";

import { theme } from "./assets/styles";
import MainForm from "./Components/MainForm";
import BorrowedSale from "./Components/BorrowedSale";
import RedirectHome from "./Components/RedirectHome";
import web3 from "./ethereumconfig/web3eth";
import DisplayContracts from "./Components/DisplayContracts";

// second side Backup
import { firebaseConfig } from "./redux/actions/configKeys";
import firebase from "firebase";
import { BuyTokens } from "./Components/BuyTokens";
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  componentDidMount() {
    store.dispatch(fetcher());
  }
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div style={{ overflow: "hidden" }}>
            <Router>
              <Container>
                <Navbar />
              </Container>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/CheckBalance" component={Body} />
                <Route exact path="/StartSale" component={MainForm} />
                <Route
                  exact
                  path="/BorrowTokens/:address"
                  component={BorrowedSale}
                />
                <Route
                  exact
                  path="/:address/:DeployedAdmin"
                  component={BuyTokens}
                />
                <Route exact path="/*" component={RedirectHome} />
              </Switch>
              {/* <Route path="/ViewTree" component={Tree} /> */}
            </Router>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
