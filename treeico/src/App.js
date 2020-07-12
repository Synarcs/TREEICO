import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Body from "./Components/Body";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// redux
import { store } from "./redux/store";
import { Provider } from "react-redux";

import { styles } from "./assets/styles";
import { Typography } from "@material-ui/core";
import { MainForm } from "./Components/MainForm";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#004d40",
    },
    secondary: {
      main: "#303f9f",
    },
  },
});

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
            <Route exact path="/BorrowMoney" component={MainForm} />
            {/* <Route path="/ViewTree" component={Tree} /> */}
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
