import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import LibraryBooks from "@mui/icons-material/LibraryBooks";
import SettingsAccessibility from "@mui/icons-material/SettingsAccessibility";
import BarChart from "@mui/icons-material/BarChart";
import EditIcon from "@mui/icons-material/Edit";

const NavBar = () => {
  const part = useSelector((state) => state.part);
  const SubmittedPicks = useSelector((state) => state.participants).filter(
    (part) => part.tiebreaker !== null
  );

  const categories = [
    { title: "Scorecard", icon: <SettingsAccessibility />, url: "/scorecard" },
    { title: "My Picks", icon: <DnsRoundedIcon />, url: "/my_picks" },
    { title: "Pool Picks", icon: <PeopleIcon />, url: "/pool_picks" },
    { title: "Golfer Odds", icon: <BarChart />, url: "/golfer_odds" },
    { title: "Rules/General Info", icon: <LibraryBooks />, url: "/rules" },
    { title: "Edit Name", icon: <EditIcon />, url: "/name" },
  ];

  const item = {
    py: "2px",
    px: 3,
    color: "rgb(255, 255, 255);;",
    "&:hover, &:focus": {
      bgcolor: "#FFFF00",
    },
  };

  return (
    <Drawer variant="permanent">
      <List disablePadding>
        <ListItem>
          <img
            src="/public/pics/masters-logo.jpg"
            className={part.id ? "masters-logo" : "masters-logo-no-part"}
          />
        </ListItem>

        {part.id && (
          <div>
            <h5 className="last-updated">
              Last Updated: 10/20/21 at 10:36 pm CT
            </h5>
            <h5 className="num-picks">
              # of submitted picks: {SubmittedPicks.length}
            </h5>
          </div>
        )}
        <Box sx={{ bgcolor: "#2E7D32" }} className="white-text">
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: "#fff" }}>
              <h3 className="navbar-title-text">Options</h3>
            </ListItemText>
          </ListItem>
          {part.name === "Joe" && (
            <ListItem>
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <SettingsAccessibility />
                </ListItemIcon>
                <ListItemText>
                  <Link
                    to={"/admin"}
                    className="navbar-option-text"
                    style={{ textDecoration: "none" }}
                  >
                    <div>Admin</div>
                  </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )}

          {part.id ? (
            categories.map((category) => (
              <ListItem key={category.title}>
                <ListItemButton sx={item}>
                  <ListItemIcon>{category.icon}</ListItemIcon>
                  <ListItemText>
                    <Link
                      to={category.url}
                      className="navbar-option-text"
                      style={{ textDecoration: "none" }}
                    >
                      <div>{category.title}</div>
                    </Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem key="Rules/General Info">
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <LibraryBooks />
                </ListItemIcon>
                <ListItemText>
                  <Link
                    to="/rules"
                    className="navbar-option-text"
                    style={{ textDecoration: "none" }}
                  >
                    <div>Rules/General Info</div>
                  </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )}

          <Divider sx={{ mt: 2 }} />

          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>

          {!part.id && (
            <div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
            </div>
          )}
        </Box>
      </List>
    </Drawer>
  );
};

export default NavBar;
