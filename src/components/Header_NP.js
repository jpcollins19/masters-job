import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";

const Header_NP = () => {
  const { pathname } = useLocation();

  return (
    <AppBar
      sx={{ bgcolor: "#2E7D32" }}
      position="fixed"
      elevation={0}
      className="header white-text"
    >
      <Grid
        container
        spacing={0}
        alignItems="center"
        sx={{ bgcolor: "#2E7D32" }}
      >
        <Grid item xs={2.5} />
        <Grid item>
          <h3 className="cut-symbol-text page-title-text-hide">.</h3>
        </Grid>
        <Grid item xs />
        <Grid item>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <h3 className="login-text">Sign In</h3>
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        alignItems="center"
        sx={{ bgcolor: "#2E7D32" }}
      >
        <Grid item xs={2.5} />
        <Grid item>
          <h3 className="cut-symbol-text page-title-text-hide">.</h3>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        alignItems="center"
        sx={{ bgcolor: "#2E7D32" }}
      >
        <Grid item xs={2.5} />
        <Grid item>
          <h3 className="cut-symbol-text page-title-text-hide">.</h3>
        </Grid>
      </Grid>
      <Typography variant="h4" component="h2" sx={{ bgcolor: "#2E7D32" }}>
        <div
          className={
            pathname === "/rules" || pathname === "/forgot_pw"
              ? "page-title-text"
              : "page-title-text-hide"
          }
        >
          {pathname === "/rules"
            ? "Rules/General Info"
            : pathname === "/forgot_pw"
            ? "Forgot Password"
            : "."}
        </div>
      </Typography>
      <Grid
        container
        spacing={0}
        alignItems="center"
        sx={{ bgcolor: "#2E7D32" }}
      >
        <Grid item xs={3.2} />
        <Grid item>
          <h3 className="cut-info-text page-title-text-hide">.</h3>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header_NP;
