// Polyfills
import 'es6-object-assign/auto';
import 'core-js/fn/array/includes';
import 'core-js/fn/promise/finally';
import 'intl'; // For Safari 9

import React from 'react';
import ReactDOM from 'react-dom';

import analytics from '../lib/analytics';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';
import supportedBrowser from '../lib/supported-browser';

import styles from './index.css';

// Register "base" page view
analytics.pageview('/');

const appTarget = document.createElement('div');
appTarget.className = styles.app;
document.body.appendChild(appTarget);

const tokenMatches = window.location.href.match(/[?&]token=([^&]+)/);
const token = tokenMatches ? tokenMatches[1] : null;
console.log(token)

var jwt = require('jsonwebtoken');
// var jwttoken = jwt.sign({
//     exp: Math.floor(Date.now() / 1000) + (60),
//     data: 'Scratch'
//   }, 'secret');
// console.log(jwttoken)


var isExpired = false;
jwt.verify(token, 'godataplushscratch', function(err, decoded) {
    if (err) {
      /*
        err = {
          name: 'TokenExpiredError',
          message: 'jwt expired',
          expiredAt: 1408621000
        }
      */
     console.log(err)
     isExpired = true;
    }
  });

// var decodedToken=jwt.decode(token, {complete: true});
// console.log(decodedToken)
// console.log(Date.now() / 1000)
// if(decodedToken === null || decodedToken.payload.exp < Date.now() / 1000)
//     isExpired = true;

if(isExpired) {    
    window.location = 'https://trainingapp.godataplush.com/#/auth/home';   
    // window.location = 'https://localhost:3000/#/auth/home';   
  } else {

	if (supportedBrowser()) {
	    // require needed here to avoid importing unsupported browser-crashing code
	    // at the top level
	    require('./render-gui.jsx').default(appTarget);

	} else {
	    BrowserModalComponent.setAppElement(appTarget);
	    const WrappedBrowserModalComponent = AppStateHOC(BrowserModalComponent, true /* localesOnly */);
	    const handleBack = () => {};
	    // eslint-disable-next-line react/jsx-no-bind
	    ReactDOM.render(<WrappedBrowserModalComponent onBack={handleBack} />, appTarget);
	}
}