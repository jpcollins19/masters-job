import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  textField: {
    border: "solid 2px yellow",
    borderRadius: "9px",
  },

  button: {
    textTransform: "none",
    backgroundColor: "#BDBDBD",
    color: "black",
    "&:hover": {
      backgroundColor: "#fff",
      color: "black",
    },
  },
}));

const Login_Page = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPW, setShowPW] = useState(false);
  const [error, setError] = useState("");

  const classes = useStyles();

  const showPwClick = () => {
    setShowPW(!showPW);
  };

  const joe = useSelector((state) => state.participants).find(
    (participant) => participant.name === "Joe"
  );

  if (!joe) {
    return null;
  }

  const onChange = (ev) => {
    ev.target.name === "email"
      ? setEmail(ev.target.value)
      : setPassword(ev.target.value);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      dispatch(authenticate(email, password));
      location.hash = "#/scorecard";
    } catch (err) {
      console.log(err.response);
      setError(err.response);
    }
  };

  return (
    <main id="login-page" className="white-text">
      <div className="main-cont-login">
        <div className="main-cont1-login">
          <div id="main-text-container-login" className="white-text">
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h">
                  Sign in
                </Typography>
                <div className="non-error-cont-login"></div>
                <Box
                  component="form"
                  onSubmit={onSubmit}
                  sx={{ mt: 1 }}
                  display="flex"
                  flexDirection="column"
                >
                  <TextField
                    onChange={onChange}
                    sx={{
                      margin: 1,
                      padding: 0,
                    }}
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    inputProps={{
                      style: { textAlign: "center", color: "#ECEFF1" },
                    }}
                    InputLabelProps={{
                      style: {
                        textAlign: "center",
                        color: "#ECEFF1",
                        marginLeft: "30%",
                      },
                    }}
                    className={classes.textField}
                  />
                  <TextField
                    onChange={onChange}
                    sx={{
                      margin: 1,
                      padding: 0,
                    }}
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    inputProps={{
                      style: { textAlign: "center", color: "#ECEFF1" },
                    }}
                    InputLabelProps={{
                      style: {
                        textAlign: "center",
                        color: "#ECEFF1",
                        marginLeft: "33%",
                      },
                    }}
                    className={classes.textField}
                    type={showPW ? "text" : "password"}
                  />
                  <div className="view-pw" onClick={() => showPwClick()}>
                    View Password
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    className={classes.button}
                    disabled={!email || !password}
                  >
                    Sign In
                  </Button>
                  <Grid
                    container
                    display="flex"
                    flexDirection="column"
                    sx={{
                      minWidth: 300,
                    }}
                  >
                    <Grid item xs>
                      <div id="forgot-pw-cont">
                        <Link
                          to="/forgot_pw"
                          style={{ textDecoration: "none" }}
                        >
                          <h4 className="white-text">Forgot Password</h4>
                        </Link>
                      </div>
                    </Grid>
                    <Grid item>
                      {joe.tourneyStage === "pre" && (
                        <div id="create-account-cont">
                          <Link
                            to="/create_account"
                            style={{ textDecoration: "none" }}
                          >
                            <h4 className="white-text">Create Account</h4>
                          </Link>
                        </div>
                      )}
                    </Grid>

                    <Grid item>
                      <Link to="/" style={{ textDecoration: "none" }}>
                        <h4 className="white-text">Cancel</h4>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login_Page;
