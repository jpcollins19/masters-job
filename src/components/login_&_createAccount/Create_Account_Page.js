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
import { addPart } from "../../store";
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

const Create_Account_Page = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [showPW, setShowPW] = useState(false);
  const [error, setError] = useState("");

  const classes = useStyles();

  const showPwClick = () => {
    setShowPW(!showPW);
  };

  const userEmails = useSelector((state) => state.participants).map((user) => {
    return user.email;
  });

  const userNames = useSelector((state) => state.participants).map((user) => {
    return user.name.toLowerCase();
  });

  console.log(userNames);

  const relayError = (err) => {
    switch (err) {
      case "pw does not match":
        return "Passwords do not match";
        break;
      case "email in use":
        return "Email already exists";
        break;
      case "Validation isEmail on email failed":
        return "Email is not in valid format";
        break;
      case "name in use":
        return "Name already exists";
        break;
      default:
        return "Unknown Error, contact Joe";
        break;
    }
  };

  const onChange = (ev) => {
    switch (ev.target.name) {
      case "email":
        setEmail(ev.target.value);
        break;
      case "name":
        setName(ev.target.value);
        break;
      case "password":
        setPassword(ev.target.value);
        break;
      case "password1":
        setPassword1(ev.target.value);
        break;
      default:
        break;
    }
  };

  const dispatch = useDispatch();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (password !== password1) {
        setError("pw does not match");
      } else if (userEmails.includes(email)) {
        setError("email in use");
      } else if (userNames.includes(name.toLowerCase())) {
        setError("name in use");
      } else {
        await dispatch(addPart({ email, name, password }));
        location.hash = "#/login";
      }
    } catch (err) {
      console.log(
        "REEEEED, error on create account OnSubmit func:",
        err.response.data.error.split("Validation error: ")[1]
      );
      setError(err.response.data.error.split("Validation error: ")[1]);
    }
  };

  return (
    <main id="login-page" className="white-text">
      <div className="main-cont-create-account">
        <div className="main-cont1-create-account">
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
                  Create Account
                </Typography>
                <div className="error-cont-login">
                  {!!error && (
                    <Alert severity="error" className="error-text">
                      {relayError(error)}
                    </Alert>
                  )}
                </div>
                <Box
                  component="form"
                  onSubmit={onSubmit}
                  noValidate
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
                    label="Name"
                    name="name"
                    inputProps={{
                      style: { textAlign: "center", color: "#ECEFF1" },
                    }}
                    InputLabelProps={{
                      style: {
                        textAlign: "center",
                        color: "#ECEFF1",
                        marginLeft: "39%",
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

                  <TextField
                    onChange={onChange}
                    sx={{
                      margin: 1,
                      padding: 0,
                    }}
                    margin="normal"
                    required
                    fullWidth
                    label="Verify Password"
                    name="password1"
                    inputProps={{
                      style: { textAlign: "center", color: "#ECEFF1" },
                    }}
                    InputLabelProps={{
                      style: {
                        textAlign: "center",
                        color: "#ECEFF1",
                        marginLeft: "25%",
                      },
                    }}
                    className={classes.textField}
                    // type={showPW ? "text" : "password"}
                  />

                  <div className="view-pw" onClick={() => showPwClick()}>
                    View Password
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    className={classes.button}
                    disabled={!email || !password || !name || !password1}
                  >
                    Create Account
                  </Button>
                  <Grid
                    container
                    display="flex"
                    flexDirection="column"
                    sx={{
                      minWidth: 300,
                    }}
                  >
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

  // return (
  //   <main id="login-page" className="white-text">
  //     <div className="main-cont-login">
  //       <div className="main-cont1-login">
  //         <div id="main-text-container-login" className="white-text">
  //           <h1>Create Account</h1>
  //           <div className="error-cont-login">
  //             {error && (
  //               <Alert severity="error" className="error-text">
  //                 {relayError(error)}
  //               </Alert>
  //             )}
  //           </div>
  //           <form onSubmit={onSubmit}>
  //             <div id="form-cont-login">
  //               <div className="create-account-cont">
  //                 <div id="email-cont">
  //                   <input
  //                     id="email-info"
  //                     placeholder="email"
  //                     value={email}
  //                     onChange={onChange}
  //                     name="email"
  //                   />
  //                 </div>
  //                 <div id="email-cont">
  //                   <input
  //                     id="email-info"
  //                     placeholder="name"
  //                     value={name}
  //                     onChange={onChange}
  //                     name="name"
  //                   />
  //                 </div>
  //                 <div id="pw-cont">
  //                   <input
  //                     id="pw-info"
  //                     placeholder="password"
  //                     value={password}
  //                     onChange={onChange}
  //                     name="password"
  //                     // type={showPW ? "text" : "password"}
  //                   />
  //                 </div>
  //                 <div id="pw-cont">
  //                   <input
  //                     id="pw-info"
  //                     placeholder="verify password"
  //                     value={password1}
  //                     onChange={onChange}
  //                     name="password1"
  //                     // type={showPW ? "text" : "password"}
  //                   />
  //                   <div className="view-pw" onClick={() => showPwClick()}>
  //                     View Password
  //                   </div>
  //                 </div>
  //               </div>
  //               <div id="submit-cont">
  //                 <button
  //                   id="submit-info"
  //                   disabled={!email || !password || !name || !password1}
  //                 >
  //                   Sign Up
  //                 </button>
  //               </div>
  //               <Link to="/" style={{ textDecoration: "none" }}>
  //                 <h4 className="white-text">Cancel</h4>
  //               </Link>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // );
};

export default Create_Account_Page;
