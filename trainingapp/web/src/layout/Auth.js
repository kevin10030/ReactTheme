import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AuthNavbar from "./AuthNavbar.js";
import Footer from "./Footer.js";

import routes from "./HomeRoutes.js";

import styles from "../assets/material/jss/material-dashboard-pro-react/layouts/authStyle.js";

import register from "../assets/material/img/register.jpeg";
import login from "../assets/material/img/login.jpeg";
import lock from "../assets/material/img/lock.jpeg";
import error from "../assets/material/img/clint-mckoy.jpg";
import pricing from "../assets/material/img/bg-pricing.jpeg";

import hometop from "../assets/images/home/home_top.png";

const useStyles = makeStyles(styles);

export default function Pages(props) {
  const { ...rest } = props;
  // ref for the wrapper div
  const wrapper = React.createRef();
  // styles
  const classes = useStyles();
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBgImage = () => {
    if (window.location.href.indexOf("/auth/register-page") !== -1) {
      return register;
    } else if (window.location.href.indexOf("/auth/login-page") !== -1) {
      return login;
    } else if (window.location.href.indexOf("/auth/home") !== -1) {
      return pricing;
    } else if (
      window.location.href.indexOf("/auth/lock-screen-page") !== -1
    ) {
      return lock;
    } else if (window.location.href.indexOf("/auth/error-page") !== -1) {
      return error;
    } else
    return login;
  };
  const getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  return (
    <div>
      <AuthNavbar brandText={getActiveRoute(routes)} {...rest} />
      <div className={classes.wrapper} ref={wrapper} >
        <div
          className={classes.fullPage}
          //  style={{ backgroundImage: "url(" + hometop + ")" }}
          style={{background:"#fff"}}
        >
          <Switch>
            {getRoutes(routes)}
          </Switch>
          
        </div>
      </div>
      <div style={{color:"#FFF",width: "100%",border: "none !important",bottom: "0"}}> 
        <Footer white />       
      </div>
    </div>
  );
}
