import React from "react";
import { useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import CIcon from '@coreui/icons-react'
import { NavLink as RouterLink, Route,Link, useHistory } from "react-router-dom";
import Amplify, { Auth } from 'aws-amplify';
import { CAlert, CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CInput, CInputGroup,
  CInputGroupPrepend, CInputGroupText, CLink, CRow, CSpinner,CFormGroup,CInputCheckbox,CLabel } from '@coreui/react';
import UserService from '../../services/UserService';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { Hidden } from "@material-ui/core";
import Config from "../../common/Config"

import free_trial_bg from "../../assets/images/home/free_trial_bg.png"
import login_left from "../../assets/images/home/login_left.png"

import styles from "../../assets/material/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [color, setColor] = React.useState('');
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');

  React.useEffect(() => {
    setConfig();
    if(localStorage.getItem("verificationStatus")) {
      setToastClass('success');
      setToastMessage(localStorage.getItem("verificationStatus"));
      showToast(true);
      localStorage.removeItem("verificationStatus");
    }
    if(localStorage.getItem("passwordStatus")) {
      setToastClass('success');
      setToastMessage(localStorage.getItem("passwordStatus"));
      showToast(true);
      localStorage.removeItem("passwordStatus");
    }
  }, []);

  function setConfig() {
    Amplify.configure({
      Auth: {
        identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
        identityPoolRegion: process.env.REACT_APP_AWS_REGION,
        region: process.env.REACT_APP_AWS_REGION,
        userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_CLIENT_ID
      },
    });

    const ga = window.gapi && window.gapi.auth2 ?
      window.gapi.auth2.getAuthInstance() :
        null;
    if (!ga) createScript();
  }

  function googleSignIn() {
    const ga = window.gapi.auth2.getAuthInstance();
    ga.signIn().then(
      googleUser => {
        getAWSCredentials(googleUser);
    },
    error => {
      console.log("Error SignIn with Google ===> ", error);
    });
  }

  async function getAWSCredentials(googleUser) {
    const { id_token, expires_at } = googleUser.getAuthResponse();

    const profile = googleUser.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName()
    };

    const credentials = await Auth.federatedSignIn(
      'google',
      { token: id_token, expires_at },
      user
    );

    if(credentials) {
      axios({
        url: process.env.REACT_APP_AWS_API_ENDPOINT + '/admin/user/details',
        method: 'get',
        headers: {
          'user-email': user.email
        }
      }).then(response => response.data).then((data) => {
        if(data && data.length > 0) {
          var exUser = data[0];
          dispatch({type: 'set', loginUser: exUser });
          localStorage.setItem('loginUser', JSON.stringify(exUser));
        } else {
          var firstname = (user.name.split(' ')[0]) ? user.name.split(' ')[0] : '';
          var lastname = (user.name.split(' ')[1]) ? user.name.split(' ')[1] : '';
          UserService.createUser({
            userId: '',
            email: user.email,
            firstname: firstname,
            lastname: lastname,
            mobileNumber: '',
            company: '',
            country: '',
            state: '',
            city: '',
            address: '',
            pincode: '',
            userrole: 'User'
          }, (res) => {
            console.log('res===>'+res);
            axios({
              url: process.env.REACT_APP_AWS_API_ENDPOINT + '/admin/user/details',
              method: 'get',
              headers: {
                'user-email': user.email
              }
            }).then(response => response.data).then((data) => {
              if(data && data.length > 0) {
                var xUser = data[0];
                console.log('xUser===>'+JSON.stringify(xUser));
                dispatch({type: 'set', loginUser: xUser });
                localStorage.setItem('loginUser', JSON.stringify(xUser));
              }
            }).catch(error => {
              console.log(error);
            });
            //dispatch({type: 'set', loginUser: { userId: userId, email: user.email, name: user.name } });
            //var userDetails = { 'userId': userId, 'email': user.email, 'name': user.name };
            //localStorage.setItem('loginUser', JSON.stringify(userDetails));
          }, (err) => {
            console.log("Error Creating User ===> ", err);
          });
        }
        history.push('/auth/home');
      }).catch(error => {
        console.log(error);
      });
    }

  }

  function createScript() {
    // load the Google SDK
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.onload = initGapi;
    document.body.appendChild(script);
  }

  function initGapi() {
    // init the Google SDK client
    const g = window.gapi;
    g.load('auth2', function() {
      g.auth2.init({
        client_id: process.env.REACT_APP_AWS_GOOGLE_CLIENT_ID,
        //ux_mode: 'redirect',
        //redirect_uri: 'http://localhost:3000/auth/login-page',
        // authorized scopes
        scope: 'profile email openid'
      });
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsDisabled(true);
    setIsHidden(false);
    showToast(false);
    try {
      const cognitoUser = await Auth.signIn({
        username: email,
        password: password
      });
      if(cognitoUser.attributes) {
        axios({
          url: process.env.REACT_APP_AWS_API_ENDPOINT + '/admin/user/details',
          method: 'get',
          headers: {
            'user-email': cognitoUser.attributes.email
          }
        }).then(response => response.data).then((data) => {
          if(data && data.length > 0) {
            var exUser = data[0];
            dispatch({type: 'set', loginUser: exUser});
            localStorage.setItem('loginUser', JSON.stringify(exUser));
            setEmail('');
            setPassword('');
            history.push('/auth/home');
          }
        }).catch(error => {
          console.log(error);
        });
      }
    } catch (error) {
      console.log('Error Loging In ===> ', error.message);
      setToastClass('error');
      setToastMessage(error.message);
      showToast(true);
    }
    setIsDisabled(false);
    setIsHidden(true);
  }

  return (
    <div className={classes.container}
    style={{paddingTop:"3rem",paddingBottom:"3rem",paddingLeft:"0rem",paddingRight:"0rem", margin:"0", backgroundImage: "url("+free_trial_bg+")", width:"100%",height:"100%"}}
    >
    <Hidden smDown>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="4"  style={{padding:"0"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",  padding:"2rem", backgroundImage: "url("+login_left+")", width:"100%",height:"100%"}} >
                <div className="justify-content-center" style={{textAlign:"center"}}>
                  <p style={{fontFamily:"Poppins-Bold", fontSize:"230%", color:"#fff"}}>{'Register'}</p>
                  <p style={{whiteSpace: "pre", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#ffffff",lineHeight:"1.7rem"}}>{Config.login_left_string1}</p>
                  <CButton to="/auth/register-page"  style={{color:"#10256e", background:"#fff",marginTop:"1rem",width:"12rem",height:"3rem", borderRadius:"5px"}} >
                    <div style={{height:"100%",display:"flex",justifyContent:"center", alignItems:"center"}}>
                      <spin style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#10256e"}}>{'Register'}</spin>
                    </div>
                  </CButton>
                </div>
              </div>
            </CCol>
            <CCol md="4" style={{padding:"0"}}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm id="signInForm" onSubmit={handleSubmit}>
                        <h1 style={{fontFamily:"Poppins-Bold",color:"#000", textAlign:"center"}}>Login</h1>
                        {/* <p className="text-muted" style={{fontFamily:"Poppins-Regular", textAlign:"center"}}>Sign In to your account</p> */}
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              @
                              {/* <CIcon name="cil-envelope-closed" /> */}
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text"
                            placeholder="Email"
                            autoComplete="email"
                            type = "email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            style={{fontFamily:"Poppins-Regular"}}/>
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                            required
                            value={password}
                            style={{fontFamily:"Poppins-Regular"}}/>
                        </CInputGroup>
                        <CRow style={{paddingBottom:"20px"}}>
                          <CCol md="6" className="text-left">
                            <CFormGroup variant="custom-checkbox" className="pb-3">
                              <CInputCheckbox custom id="accept" name='checkbox' value='checkbox' />
                              <CLabel variant="custom-checkbox" htmlFor="accept" style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"100%", color:"#000000"}}>{"Remember me"} </CLabel>
                            </CFormGroup>
                          </CCol>
                          <CCol md="6" className="text-right" style={{  fontSize: "13px", fontWeight: "500" }}>
                            <CLink href="/#/auth/email-confirmation" style={{color:"#058fd1",fontFamily:"Poppins-Regular"}}>
                              Forgot password?
                            </CLink>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="5">
                            <CButton type="submit" block disabled={isDisabled} style={{fontFamily:"Poppins-Regular", background:"#ff8b02", color:"#fff"}}>
                              <CSpinner grow size="sm" className="mfe-1" hidden={isHidden} />
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs="7" className="text-right">
                            <CButton color="danger" onClick={googleSignIn} block style={{fontFamily:"Poppins-Regular"}}>
                              Google Login
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
    </Hidden>
    <Hidden mdUp>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="6"  >
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",  padding:"2rem", backgroundImage: "url("+login_left+")", width:"100%",height:"100%"}} >
                <div className="justify-content-center" style={{textAlign:"center"}}>
                  <p style={{fontFamily:"Poppins-Bold", fontSize:"230%", color:"#fff"}}>{'Register'}</p>
                  <p style={{whiteSpace: "pre", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#ffffff",lineHeight:"1.7rem"}}>{Config.login_left_string1}</p>
                  <CButton to="/auth/register-page"  style={{color:"#10256e", background:"#fff",marginTop:"1rem",width:"12rem",height:"3rem", borderRadius:"5px"}} >
                    <div style={{height:"100%",display:"flex",justifyContent:"center", alignItems:"center"}}>
                      <spin style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#10256e"}}>{'Register'}</spin>
                    </div>
                  </CButton>
                </div>
              </div>
            </CCol>
            <CCol md="6" >
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm id="signInForm" onSubmit={handleSubmit}>
                        <h1 style={{fontFamily:"Poppins-Bold",color:"#000", textAlign:"center"}}>Login</h1>
                        {/* <p className="text-muted" style={{fontFamily:"Poppins-Regular", textAlign:"center"}}>Sign In to your account</p> */}
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              @
                              {/* <CIcon name="cil-envelope-closed" /> */}
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text"
                            placeholder="Email"
                            autoComplete="email"
                            type = "email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            style={{fontFamily:"Poppins-Regular"}}/>
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                            required
                            value={password}
                            style={{fontFamily:"Poppins-Regular"}}/>
                        </CInputGroup>
                        <CRow style={{paddingBottom:"20px"}}>
                          <CCol md="6" className="text-left">
                            <CFormGroup variant="custom-checkbox" className="pb-3">
                              <CInputCheckbox custom id="accept" name='checkbox' value='checkbox' />
                              <CLabel variant="custom-checkbox" htmlFor="accept" style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"100%", color:"#000000"}}>{"Remember me"} </CLabel>
                            </CFormGroup>
                          </CCol>
                          <CCol md="6" className="text-right" style={{  fontSize: "13px", fontWeight: "500" }}>
                            <CLink href="/#/auth/email-confirmation" style={{color:"#058fd1",fontFamily:"Poppins-Regular"}}>
                              Forgot password?
                            </CLink>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="5">
                            <CButton type="submit" block disabled={isDisabled} style={{fontFamily:"Poppins-Regular", background:"#ff8b02", color:"#fff"}}>
                              <CSpinner grow size="sm" className="mfe-1" hidden={isHidden} />
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs="7" className="text-right">
                            <CButton color="danger" onClick={googleSignIn} block style={{fontFamily:"Poppins-Regular"}}>
                              Google Login
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
    </Hidden>
    <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={toast}
            autoHideDuration={3000}
            onClose={() => { showToast(false); }}>
            <Alert
              severity={toastClass}
              action={
                <CButton  onClick={(e) => { e.preventDefault();  showToast(false); }}><CIcon name="cil-x" /></CButton>
              }
            >
              {toastMessage}
            </Alert>
          </Snackbar>
    </div>
  );
}
