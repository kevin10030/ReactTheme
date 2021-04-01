import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Banner from '../../assets/images/banner.jpg';
import ServicesImage from '../../assets/images/services.jpg';
import AboutImage from '../../assets/images/about.jpg';
import ContactImage from '../../assets/images/contact.jpg';

export const useStyles = makeStyles((theme) => ({
  mainContent: {
    // marginTop: theme.spacing(10),
  },
  backImage: {
    backgroundImage: `url(${Banner})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '200px',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  breadlink: {
    display: 'flex',
  },
  breadicon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  socialIcon: {
    margin: theme.spacing(1),
    cursor: 'pointer'
  },
  aboutImage: {
    backgroundImage: `url(${AboutImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '120px',
  },
  contactImage: {
    backgroundImage: `url(${ContactImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '184px',
  },
}));
