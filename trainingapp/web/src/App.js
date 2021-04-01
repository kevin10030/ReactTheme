import React, { Component } from 'react';
import { HashRouter, BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";
import "./assets/material/scss/material-dashboard-pro-react.scss";
import './assets/coreui/scss/style.scss';

import AuthLayout from "./layout/Auth.js"
import Modules from './layout/TheLayout'
import CourseDetails from "./modules/website/CourseDetailsPage.js";

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

const hist = createBrowserHistory();
class App extends Component {

  render() {
    return (
      <HashRouter history={hist}>
          <React.Suspense fallback={loading()}>
            <Switch>
              {/* Website */}
              <Route path="/auth" component={AuthLayout} />
              {/* Admin, Device manage, Analytics */}
              <Route path="/modules" render={props => <Modules {...props}/>} />
              <Route path="/course/:id" render={props => <CourseDetails {...props}/>} />
              <Redirect from="/" to="/auth/home" />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
