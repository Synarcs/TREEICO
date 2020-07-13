import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Body from "./Components/Body";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

// redux
import { store } from "./redux/store";
import { Provider } from "react-redux";

import { theme } from "./assets/styles";
import MainForm from "./Components/MainForm";
import BorrowedSale from "./Components/BorrowedSale";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div className="app">
              <Navbar />
            </div>
            <Route exact path="/CheckBalance" component={Body} />
            <Route exact path="/StartSale" component={MainForm} />
            <Route
              exact
              path="/BorrowTokens/:address"
              component={BorrowedSale}
            />
            {/* <Route path="/ViewTree" component={Tree} /> */}
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
