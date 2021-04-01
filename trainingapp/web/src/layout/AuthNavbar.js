import React from "react";
import { useDispatch } from 'react-redux';
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink, useHistory,  useLocation } from "react-router-dom";
import { Auth } from 'aws-amplify';
// @material-ui/core components
import { AppBar, Toolbar, Typography, List, ListItem, Hidden, Drawer,
         ListItemText, MenuItem, Menu } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { CBadge, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle,
         CImg, CHeaderNavLink } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { HashLink as Link } from 'react-router-hash-link';

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Person from "@material-ui/icons/Person";
// import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Home from "@material-ui/icons/Home";
import Assignment from "@material-ui/icons/Assignment";

// core components
import Button from "./custombuttons/Button";
import styles from "../assets/material/jss/material-dashboard-pro-react/components/authNavbarStyle.js";

import Logo from "../assets/images/logo.png";

const useStyles = makeStyles(styles);

export default function AuthNavbar(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const jsonString = localStorage.getItem('loginUser');
  const loginUser = JSON.parse(jsonString);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  async function signOut() {
    try {
      await Auth.signOut();
      dispatch({type: 'set', loginUser: null });
      localStorage.removeItem("loginUser");
      localStorage.setItem('logoutStatus', 'You have logged out successfully.');
      history.push('/');
    } catch (error) {
      console.log('Error Signing Out ===> ', error);
    }
  }
  // verifies if routeName is the one active (in browser input)
  const activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  };
  const classes = useStyles();
  const { color, brandText } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  var list = (
    <List className={classes.list}>
      {location.pathname != "/auth/home" ? (
        <>
          <ListItem className={classes.listItem}>
            <NavLink
              to={"/auth/home"}
              className={cx(classes.navLink, {
                [classes.navLinkActive]: activeRoute("/auth/home")
              })}
            >
              {/* <Home className={classes.listItemIcon} /> */}
              <ListItemText
                primary={"Home"}
                disableTypography={true}
                className={classes.listItemText}
              />
            </NavLink>
          </ListItem>
        </>
      ) : ""
      }
      <ListItem className={classes.listItem}>
        <Link
          to={"/auth/home#buycourses"}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute("/auth/home#buycourses")
          })}
        >
          {/* <Assignment className={classes.listItemIcon} /> */}
          <ListItemText
            primary={"Buy a Course"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link
          to={"/auth/home#joincourses"}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute("/auth/home#joincourses")
          })}
        >
          {/* <Assignment className={classes.listItemIcon} /> */}
          <ListItemText
            primary={"Join Classes Now"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to={"/auth/schedule-free-class"}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute("/auth/schedule-free-class")
          })}
        >
          {/* <Assignment className={classes.listItemIcon} /> */}
          <ListItemText
            primary={"Schedule Free Class"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>

      {localStorage.getItem("loginUser") != null && localStorage.getItem("loginUser") != 'null' ? (
        <>
          {loginUser.userrole == 'Admin' ?
            (
              <ListItem className={classes.listItem}>
                <NavLink
                  to={"/modules"}
                  className={cx(classes.navLink, {
                    [classes.navLinkActive]: activeRoute("/modules")
                  })}
                >
                  <CIcon name="cil-list" className="mfe-2" />
                  <ListItemText
                    primary={"Dashboard"}
                    disableTypography={true}
                    className={classes.listItemText}
                  />
                </NavLink>
              </ListItem>
            )
          : (<></>)}

          <ListItem className={classes.listItem}>
            <CDropdown
              inNav
              className="c-header-nav-items mx-2"
              direction="down"
            >
              <CDropdownToggle className="c-header-nav-link" caret={true}  style={{fontFamily:"Poppins-Regular", paddingTop: "15px", color: "black" }}>
                  <Person className={classes.listItemIcon} /> {JSON.parse(localStorage.getItem("loginUser")).firstname + ' ' + JSON.parse(localStorage.getItem("loginUser")).lastname}
              </CDropdownToggle>
              <CDropdownMenu placement="bottom-end">
                <CDropdownItem >
                  <CHeaderNavLink to="/auth/user-profile" style={{fontFamily:"Poppins-Regular", textDecoration: "none", color: "black" }}>
                    <CIcon name="cil-settings" className="mfe-2" />
                    My Profile
                  </CHeaderNavLink>
                </CDropdownItem>
                <CDropdownItem>
                  <CHeaderNavLink onClick={signOut} style={{fontFamily:"Poppins-Regular", textDecoration: "none", color: "black" }}>
                    <CIcon name="cil-account-logout" className="mfe-2" />
                    Logout
                  </CHeaderNavLink>
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem className={classes.listItem}>
            <NavLink
              to={"/auth/register-page"}
              className={cx(classes.navLink, {
                [classes.navLinkActive]: activeRoute("/auth/register-page")
              })}
            >
              <PersonAdd className={classes.listItemIcon} />
              <ListItemText
                primary={"Register"}
                disableTypography={true}
                className={classes.listItemText}
              />
            </NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink
              to={"/auth/login-page"}
              className={cx(classes.navLink, {
                [classes.navLinkActive]: activeRoute("/auth/login-page")
              })}
            >
              <Fingerprint className={classes.listItemIcon} />
              <ListItemText
                primary={"Login"}
                disableTypography={true}
                className={classes.listItemText}
              />
            </NavLink>
          </ListItem>
        </>
      )}
    </List>
  );
  return (
    <AppBar position="static" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container} style={{marginLeft:"10px"}}>
        <Hidden smDown>
          <div className={classes.flex}>
            <img src={Logo} alt="Logo" style={{ height: "50px" }} />
          </div>
        </Hidden>
        <Hidden mdUp>
          <div className={classes.flex}>
            <img src={Logo} alt="Logo" style={{ height: "50px" }} />
          </div>
        </Hidden>
        <Hidden smDown>{list}</Hidden>
        <Hidden mdUp>
          <Button
            className={classes.sidebarButton}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </Button>
        </Hidden>
        <Hidden mdUp>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={"right"}
              open={open}
              classes={{
                paper: classes.drawerPaper
              }}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {list}
            </Drawer>
          </Hidden>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string
};
