import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";

class DisplayContracts extends Component {
  render() {
    return (
      <Grid container spacing={2}>
        {this.props.contracts.contracts.map((contract) => {
          return (
            <Grid item>
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
                    Enter In Bid
                  </Button>
                </CardContent>
                <CardMedia
                  image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIIAggMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAgMEBwEFBgj/xAA7EAABAwICBQsCBQMFAQAAAAABAAIDBBEFIQYSEzFBBxQiMlFSYXGBkaEjMxVCYqKxcpKyCILBwtFD/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAEDBAUCBv/EACcRAAICAgEDAwQDAAAAAAAAAAABAhEDIRIEIjEFUWEGQ3GBMzRC/9oADAMBAAIRAxEAPwC4lLg+01GxZ2fKZfI5jy1psAgFVX5U3B91qcj+rfXztuSpGNjaXtFiEA6Vymlel2D6K0wmxSptK4Xip4+lLJ5Ds8TkpOl+kbdG9HK3FZbOMLPpsP55Dk0e5XlHEK6rxOtmrcQnfUVMzi6SR5uSf/PBAWDpFyzaQ4hrQ4O2LCqe9gWjaTerjkPQeq4TEMaxbEiTiGKVtSTv207nD2vZQUISO09TUUrw+mnlhePzRSFp9wupwPlK0twV7dji0tVEP/jW/WafU9IehXIoQHoXQ3lZwnHZGUmLMGGVrzZpc+8Mh8HHqnwPuVZ1N9v1XizhZXnyG6aVNdDJo7iExfLTRbSkkebuMYIBYT4XFvDyQgt+p6o80zH9xvmE5ETK60mYAunHRNa0uAzAuEA6oL+ufNL20nb8J5sTXAOIzIzzQEVCl7FnZ8rCARzn9PysbPanXBtfhZI2T+4U9G9rGBrjYjeEAn7Hjf0QZNqNS1r8UTfVtqZ23pMbXMeHOBAHFAU1/qKrnxR4NhbXdCR0lTIO0ts1v+TlSvBXV/qPpw78CrWWNjNC4+eqR/BXOcmmheHaSYFiM+JtkDjO2OnljdZ0dm3cRwIOsMjfcvMpKKtnqMXJ0iuELvMb5KsfoZC7DtliMF+iWPDHgeLXG3sVAw/k40orahsT8PNIwnpTVEjQ1voCSfQKOcauyeErqjkb23pcsUsIBmikjB3F7C2/uvQmimgeDaONbKyLnVcBnVTi5H9I3N/nxXSVdLTVsDoKuninhcLOZIwOB9Cq3nSekWLA68nlVdFydV7sN04wWoBIBqmxO8Q/oH+VvuU/QaHR/UxTCQ4YfLJqPgJJ2Djuse6bcdxsFx2AOLcfwwt6wrISPPXCujJSVoqlFxdM9hAc36V9a+SNtr9DVtrZLM31MmZkHMJtrHNcCWkAG5Kk8i+bnvfCNtqdHVvbK905tWd4Jh0bnOJa24KAXzn9PysprZP7hWEBNUOb7rki57SpcIGzbcIBum3O9E5P9pybqctW2Xkm4c5WgoCs+XWjfX6IxyU7C99FVNmkAF7R6rmuPyCn+TOhFBoRhjR1p2Gdx7S83/iy7LGKdpnkbIwPjlbYtducLWIK1eGUUeG4dTUMF9lTxiNl+6N3xZZMuRvtZqxwS7kSkIQqC8EIQgIeL4bTYxhlTh9Y3WgqGFju0dhHiDY+iovB9E8Tw7lCw7CqmEudDUsqHSNF2uha8HX8jb5svQChx4fCzFZ8SteeWFkOtbqsaXG3qXfAVuPI4WVzxqR1VFIJem03BCkyfbd5FQoIzFQxDMOOZ9c0qO+u3PitiutmN+RKmx9Rvks6reweyhvJ1yLnepIJqFAue0rKAk7CPsKadI6NxY21huTnOG90pBjMhLwQAeCAzH9a+vw7Fl8bYml7N4WG/Q62et2LLpBKNQAgnigItS3nMeq+2WYI4LVTRGGRzHbwVvdg4cQoWJsEwEjGnWbkfEKjNC1a8l2KdOmaxCELIawQhCAFNpqTqSyHscG2Uemh20oB6v5vJbvZ7Wzm2aBlZX4cd7ZRmnWkZYdsS1+4Z5JTomMaXNGYzCS0bA6zs75ZLJmDxqgHpZLWZRvbv8E6IWvGs69zmkc3d3glCcN6JBuMkArYM8ULHOG90oQDGzf3SpETmtYA42KdUOb7rkA5P07amdt9kiJpbIC4WHal0u53onJ/tOQGTIy3WCi6jr9UpKkVNTHTRa8h8gN5QHP1jmQ1r4SNXIEeqSo2JPdUTuqCMzvA4JiKpkjyPSb4rn5E1N2dDH3QTRsEmR7Y26zjZRXVpt0WAeqZ6c0mbrk8bbl486R741tnTUMZ5rG9rCNdod7qfCQxlnGxutfhNc3ZsppTYtFmu4EKXUfc9F0oqkkc2Tt2OTkPaAzM34JpjHB7SQQAUul67vJPyfbd5FSQY2jO8FGcxxcSASCck2p0fUb5ICJs390oU1CAg67u873UmMNMYLgCeJISTTtHEqueU/T1+BB2DYK8DEHN+rNv5u07rfrPwM+xSlbIbSVnT6UaX4Ho4QyvrA2e1xTwjWkPoN3mbLgsQ5ZRuwzB3u7HVk1v2tvf3VUSPfLK+WV75JHm7nvcXOce0k7ykq5Y0vJQ8jZ2ddylaUV99Wsjo2dylhaPk3Pytrya45V1OLVdJiFZUVLp49ox1RM55DmnMC5yuDu8FXcW4+a2OB15wvGKSuuQIZQXW7u53wSpcVWiFJ8i+CARY7lCmjMb7cDuU0EEAtzB3ELEsYkZbjwKxZsfOPyb8OTg/ggKbTx7NufWO9NU8J1tZ2VjkFKVWDHXcyzqMt9qNbpLiP4VgdZWA2fHGdT+s5N+SFUuG6X6R4Y1raXGastbwmfth5dO/wALreVjENWmosNY7ORxnkseDcgD6kn/AGqtl0YR0c7JLZYOHcsOLwhrcQw+jqQMnPicYXW+QfhdbgvKvgFfK2OuNTh7id9QAYz/ALmk2HmAqKQjgmQsjR62hdDPG2WIsfG8Xa9tiHDwKYe5weQHEC/avPegum9dopVCMufPhb3fVpib6na5nYfDcfleg6GWmxGkhrKSUSwTsD2PacnAqqUeJdGXINd3ed7rKf5u3tKF5PRq9JsfhwLAazEpBrbCMljTlrvOTW+pIC8xVVTPWVU1VVSGSeZ5kkefzOO9W3y44g6HDsMw1txt5XzPHaGAAfL/AIVPq7GtFGR7oEIQrCsci3FL3pjinwLBCC6dBa84lo1RvJLpYRsJL77tyHuLH1WdPqrE8I0f53h+q0mQMlktd0bTkCPG9gua5GsQEeJV2GyH70YmiHY5uTvcEf2rq+VWo2Oh07L2M0scYz/VrH4asmfUWdP0+p54Jq9nBcn2LYxJj8FBDM6eCoeXTNmJdqje54PA/wAq2JYnxOs70I4qoeS+p5vplSNvYTMki/aT/LVbulOIswjR6vrn6v0ojqX4vd0Wj+4hUdNbidD1qKhnVKtFI6a4j+J6S1soN4437GPybl/Nz6rRrOZzJJPElNSDNdJHzrdiEIQgBW3yH6RvbzrAKlxLGg1FLnuF+m3yuQfUqpFu9Ca84bpfhFSCQOdMidbuydA/5X9F5krR6i6Z6b5w3sPshR9Q90+yys5pKQ5ba11TpiymBvHSUjG27HuLnH41VX63Wmlb+I6XYxVXuHVT2NPgzoj4atKtMVSMsnbYIQhSQZG8J4G4umE5GeCEG20axP8AB8eocQLtVkMo2n9Byd8Eqx+WeoDcMw2mDs5J3SZHeGtt/wBlUpFxZdJpXjf4xhej4c/Wmp6RzJf6g7Vv6hoPqsvWax2db0VcurivbZB0TqDSaT4VNwFVGD5F2qfgqwuWbE9nQ0OFMd0p3meQfpbkP3H9qquKU08rJm9aNwePQ3W90+xYYzpRVTxvDoItWGEjutGf7i4+qo6HdnR+olThL3OeTchubdiccbBMronzBhCEISCXDMaaaOob1oniQebTf/hIQQCCDxQHriCQTQRytIIe0OB8whcLo7pbG3R/DGySDXFJEHX7dQLKo4M0c0UHMSZpCTclxJJ80hCFeZwQhCAFlu8IQhA8s/mKELL1n8TOx6F/dX4YI4LCFR0H+jo/Uf2/2Ik3BNoQuifLghCEALI3rCEBOjmlEbQJXgACwDihCFBJ/9k="
                  title="Live from space album cover"
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
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
