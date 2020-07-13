import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const styles = {
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
  MainForm: {
    marginTop: "100px",
  },
  Link: {
    textDecoration: "none",
  },
};

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#311b92",
    },
    secondary: {
      main: "#2e7031",
    },
    mainButton: {
      main: "#311b92",
    },
  },
});
