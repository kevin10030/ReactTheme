import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, Typography, List, ListItem,
  withStyles, Grid, SwipeableDrawer
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dropdown from './Dropdown';
import { NavLink as RouterLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

const styleSheet = {
  list: {
    width: 200,
  },
  menuitem: {
    paddingRight: 30,
    cursor: "pointer",
    textDecoration: "none",
    color: "black",
    '&:hover': {
      color: "#3f51b5"
    },
  },
  button: {
    marginLeft: "auto",
    paddingRight:"1rem",
  },
  sideBarIcon: {
    padding: 0,
    cursor: "pointer",
  }
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {drawerActivate:false, drawer:false};
    this.createDrawer = this.createDrawer.bind(this);
    this.destroyDrawer = this.destroyDrawer.bind(this);
  }

  componentWillMount() {
    if(window.innerWidth <= 600) {
      this.setState({drawerActivate:true});
    }
    window.addEventListener('resize',() => {
      if(window.innerWidth <= 600) {
        this.setState({drawerActivate:true});
      } else {
        this.setState({drawerActivate:false})
      }
    });
  }

  createDrawer() {
    return (
      <div>
        <AppBar color="default">
          <Toolbar>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Typography color="inherit" variant="headline">
                <img src={Logo} alt="Logo" style={{width:"58%"}} />
              </Typography>
              <Typography color="inherit" variant="headline"></Typography>
              <MenuIcon
                className={this.props.classes.sideBarIcon}
                onClick={()=>{this.setState({drawer:true})}} />
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          anchor="right"
          open={this.state.drawer}
          onClose={()=>{this.setState({drawer:false})}}
          onOpen={()=>{this.setState({drawer:true})}}>
           <div
             tabIndex={0}
             role="button"
             onClick={()=>{this.setState({drawer:false})}}
             onKeyDown={()=>{this.setState({drawer:false})}}>
            <List className={this.props.classes.list}>
               <ListItem key={1} button divider component={RouterLink} to="/">Home</ListItem>
               <ListItem key={2} button divider component={RouterLink} to="/services">Services</ListItem>
               <ListItem key={3} button divider><Dropdown/></ListItem>
               <ListItem key={3} button divider component={RouterLink} to="/modules">Modules</ListItem>
               <ListItem key={3} button divider component={RouterLink} to="/about">About Us</ListItem>
               <ListItem key={3} button divider component={RouterLink} to="/contact">Contact</ListItem>
             </List>
         </div>
       </SwipeableDrawer>
      </div>
    );
  }


  destroyDrawer() {
    const {classes} = this.props
    return (
      <AppBar color="default">
        <Toolbar>
          <Typography color="inherit">
            <img src={Logo} alt="Logo" style={{width:"58%",paddingLeft:"1rem"}} />
          </Typography>
          <Typography component={RouterLink} to="/" className={classes.menuitem}>Home</Typography>
          <Typography component={RouterLink} to="/services" className={classes.menuitem}>Services</Typography>
          <Typography className={classes.menuitem}>
            <Dropdown />
          </Typography>
          <Typography component={RouterLink} to="/modules" className={classes.menuitem}>Modules</Typography>
          <Typography component={RouterLink} to="/about" className={classes.menuitem}>About Us</Typography>
          <Typography component={RouterLink} to="/contact" className={classes.menuitem}>Contact</Typography>
          <div className={classes.button}>
            <Button variant="outlined" color="primary" component={RouterLink} to="/signin">
              Sign In
            </Button>
            <Button variant="outlined" color="primary" component={RouterLink} to="/signup" style={{marginLeft:"0.5rem"}}>
              Sign Up
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    )
  }

  render() {
    return (
      <div>
        {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(Navigation);
