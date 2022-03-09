import { connect, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../store";

const Header_P = ({ handleClick }) => {
  const part = useSelector((state) => state.part);
  const joe = useSelector((state) => state.participants).find(
    (participant) => participant.name === "Joe"
  );

  const { pathname } = useLocation();

  if (!joe || !part) {
    return null;
  }
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
          <h3
            className={`cut-symbol-text ${
              pathname !== "/pool_picks"
                ? "page-title-text-hide"
                : joe.tourneyStage !== "cut"
                ? "page-title-text-hide"
                : ""
            }`}
          >
            {joe.tourneyStage === "cut" && pathname === "/pool_picks"
              ? "* = player missed the cut"
              : "."}
          </h3>
        </Grid>
        <Grid item xs />
        <Grid item>
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            onClick={handleClick}
          >
            <h3 className="logout-text">Sign Out</h3>
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
          <h3
            className={`cut-symbol-text1 ${
              pathname !== "/pool_picks"
                ? "page-title-text-hide"
                : joe.tourneyStage !== "cut"
                ? "page-title-text-hide"
                : ""
            }`}
          >
            {joe.tourneyStage === "cut" && pathname === "/pool_picks"
              ? "@ = player's score is above the cut"
              : "."}
          </h3>
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
          <h3
            className={`cut-symbol-text2 ${
              pathname !== "/pool_picks" ? "page-title-text-hide" : ""
            }`}
          >
            {pathname === "/pool_picks" ? "# = player was DQd" : "."}
          </h3>
        </Grid>
      </Grid>

      <Typography variant="h4" component="h2" sx={{ bgcolor: "#2E7D32" }}>
        <div className="page-title-text">
          {part.id && pathname === "/scorecard"
            ? "Scorecard"
            : part.id && pathname === "/my_picks"
            ? "My Picks"
            : part.id && pathname === "/pool_picks"
            ? "Pool Picks"
            : part.id && pathname === "/golfer_odds"
            ? "Golfer Odds"
            : pathname === "/rules"
            ? "Rules & General Info"
            : part.id && pathname === "/edit_name"
            ? "Edit Name"
            : part.id && pathname === "/name"
            ? "Edit Name"
            : part.id && pathname === "/my_picks_edit_golfers"
            ? "Edit Golfers"
            : part.id && pathname === "/my_picks_edit_tiebreaker"
            ? "Edit Tiebreaker"
            : part.id && pathname === "/admin"
            ? "Admin"
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
          <h3
            className={`cut-number-text ${
              pathname !== "/pool_picks"
                ? "page-title-text-hide"
                : joe.tourneyStage !== "cut"
                ? "page-title-text-hide"
                : ""
            }`}
          >
            {joe.tourneyStage === "cut" && pathname === "/pool_picks"
              ? "Cut: +3"
              : "."}
          </h3>
        </Grid>
      </Grid>
    </AppBar>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Header_P);
