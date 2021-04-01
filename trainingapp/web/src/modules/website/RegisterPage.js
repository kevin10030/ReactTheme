import React from "react";
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { CButton, CCard, CCardBody, CCardFooter, CCol, CContainer, CForm, CInput, CInputGroup,
  CInputGroupPrepend, CInputGroupText, CRow, CAlert, CSpinner } from '@coreui/react';

import CIcon from '@coreui/icons-react';

import { NavLink as RouterLink, Route, useHistory } from "react-router-dom";
import Amplify, { Auth } from 'aws-amplify';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import UserService from '../../services/UserService';

import { Hidden } from "@material-ui/core";

import Config from "../../common/Config"
import free_trial_bg from "../../assets/images/home/free_trial_bg.png"
import free_trial_circle1 from "../../assets/images/home/free_trial_circle1.png"
import free_trial_circle2 from "../../assets/images/home/free_trial_circle2.png"

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/material/jss/material-dashboard-pro-react/views/registerPageStyle";

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');

  Amplify.configure({
    Auth: {
      region: process.env.REACT_APP_AWS_REGION,
      userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_CLIENT_ID
    }
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setIsDisabled(true);
    setIsHidden(false);
    showToast(false);
    try {
      const cognitoUser = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          name: firstname + ' ' + lastname,
          email: email
        }
      });

      if(cognitoUser.user) {
        axios({
          url: process.env.REACT_APP_AWS_API_ENDPOINT + '/admin/user/details',
          method: 'get',
          headers: {
            'user-email': cognitoUser.user.username
          }
        }).then(response => response.data).then((data) => {
          if(data && data.length > 0) {
            var exUser = data[0];
            dispatch({type: 'set', loginUser: { userId: exUser.userId, email: exUser.email, name: exUser.firstname + ' ' + exUser.lastname } });
            console.log("Existing User ===> ", data);
          } else {
            UserService.createUser({
              userId: '',
              email: cognitoUser.user.username,
              firstname: firstname,
              lastname: lastname,
              mobileNumber: mobileNumber,
              company: '',
              country: '',
              state: '',
              city: '',
              address: '',
              pincode: '',
              userrole: 'User'
            }, (res) => {
              console.log("User Created Successfully ===> ", res);
            }, (err) => {
              console.log("Error Creating User ===> ", err);
            });
          }
        }).catch(error => {
          console.log(error);
        });
        setIsDisabled(false);
        setIsHidden(true);
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        dispatch({type: 'set', registerUser: { email: email } });
        history.push('/auth/verify');
      }

    } catch (error) {
      setIsDisabled(false);
      setIsHidden(true);
      console.log('Error Signing Up:', error);
      setToastClass('error');
      setToastMessage(error.message);
      showToast(true);
    }
  }

  function validate() {
    let cPass = document.getElementById('confirmPassword');
    if(password != cPass.value) {
      cPass.setCustomValidity("Passwords Don't Match");
    } else {
      cPass.setCustomValidity('');
    }
  }

  return (
    <div className={classes.container}
         style={{paddingTop:"3rem",paddingBottom:"3rem",paddingLeft:"0rem",paddingRight:"0rem", margin:"0", backgroundImage: "url("+free_trial_bg+")", width:"100%",height:"100%"}}
    >
      <Hidden smDown>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CRow style={{float:"left"}}>
                <CCardBody style={{backgroundImage: "url("+free_trial_circle1+")", backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', width:"200px",height:"200px"}}/>
              </CRow>
              <CCard style={{display:"block", margin:"0", marginTop:"60px", marginLeft:"60px"}}>
                <CCardBody className="p-4">
                  <CForm id="signUpForm" onSubmit={handleSubmit}>
                    <div style={{width:"100%",textAlign:"center"}}><spin style={{marginLeft:"-60px", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#000000", textAlign:"center"}}>Register</spin></div>
                    <div style={{width:"100%",textAlign:"center"}}><spin className="text-muted" style={{marginLeft:"-60px",fontFamily:"Poppins-Regular",fontSize:"100%", color:"#000000", textAlign:"center"}} >Create your account</spin></div>
                    <div style={{width:"100%", display:"inline-flex"}}>
                    {/* <CRow className="justify-content-center" style={{marginLeft:"-60px"}}> */}
                      <div style={{width:"50%",marginRight:"10px"}}>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            placeholder="First Name"
                            autoComplete="firstname"
                            onChange={e => setFirstname(e.target.value)}
                            required
                            value={firstname}
                            style={{fontFamily:"Poppins-Regular"}}/>
                        </CInputGroup>
                      </div>
                      {/* <CCol md="6" lg="6" xl="6"> */}
                      <div style={{width:"50%",marginLeft:"10px"}}>
                        <CInputGroup className="mb-3">
                          <CInput
                            type="text"
                            placeholder="Last Name"
                            autoComplete="lastname"
                            onChange={e => setLastname(e.target.value)}
                            required
                            value={lastname}
                            style={{fontFamily:"Poppins-Regular"}}/>
                        </CInputGroup>
                      </div>
                      {/* </CCol> */}
                    {/* </CRow> */}
                    </div>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        value={email}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        style={{fontFamily:"Poppins-Regular"}}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText><CIcon name="cil-phone" /></CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="tel"
                        placeholder="Mobile Number"
                        autoComplete="mobile"
                        onChange={e => setMobileNumber(e.target.value)}
                        value={mobileNumber}
                        style={{fontFamily:"Poppins-Regular"}}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={e => { setPassword(e.target.value); validate(); }}
                        required
                        value={password}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        onInvalid={e => e.target.setCustomValidity('Password must have at least 8 characters, at least 1 number and 1 uppercase and 1 lowercase letter')}
                        onInput={e => e.target.setCustomValidity('')}
                        style={{fontFamily:"Poppins-Regular"}}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        onChange={validate}
                        required
                        style={{fontFamily:"Poppins-Regular"}}/>
                    </CInputGroup>
                    <CButton type="submit" block disabled={isDisabled} style={{fontFamily:"Poppins-Regular", background:"#ff8b02", color:"#fff"}}>
                      <CSpinner grow size="sm" className="mfe-1" hidden={isHidden} />
                      Create Account
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
              <CRow style={{float:"right", marginTop:"-150px", marginRight:"-60px"}}>
                <CCardBody style={{textAlign:"bottom", backgroundImage: "url("+free_trial_circle2+")", backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', width:"200px",height:"200px"}}/>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
      </Hidden>
      <Hidden mdUp>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="12">
              <CCard style={{display:"block", margin:"0", marginTop:"0px", marginLeft:"0px"}}>
                <CCardBody >
                  <CForm id="signUpForm" onSubmit={handleSubmit}>
                    <div style={{width:"100%",textAlign:"center"}}><spin style={{marginLeft:"-60px", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#000000", textAlign:"center"}}>Register</spin></div>
                    <div style={{width:"100%",textAlign:"center"}}><spin className="text-muted" style={{marginLeft:"-60px",fontFamily:"Poppins-Regular",fontSize:"100%", color:"#000000", textAlign:"center"}} >Create your account</spin></div>
                    <div style={{width:"100%", display:"inline-flex"}}>
                    {/* <CRow className="justify-content-center" style={{marginLeft:"-60px"}}> */}
                      <div style={{width:"50%",marginRight:"10px"}}>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            placeholder="First Name"
                            autoComplete="firstname"
                            onChange={e => setFirstname(e.target.value)}
                            required
                            value={firstname}
                            style={{fontFamily:"Poppins-Regular"}}/>
                        </CInputGroup>
                      </div>
                      {/* <CCol md="6" lg="6" xl="6"> */}
                      <div style={{width:"50%",marginLeft:"10px"}}>
                        <CInputGroup className="mb-3">
                          <CInput
                            type="text"
                            placeholder="Last Name"
                            autoComplete="lastname"
                            onChange={e => setLastname(e.target.value)}
                            required
                            value={lastname}
                            style={{fontFamily:"Poppins-Regular"}}/>
                        </CInputGroup>
                      </div>
                      {/* </CCol> */}
                    {/* </CRow> */}
                    </div>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        value={email}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        style={{fontFamily:"Poppins-Regular"}}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText><CIcon name="cil-phone" /></CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="tel"
                        placeholder="Mobile Number"
                        autoComplete="mobile"
                        onChange={e => setMobileNumber(e.target.value)}
                        value={mobileNumber}
                        style={{fontFamily:"Poppins-Regular"}}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={e => { setPassword(e.target.value); validate(); }}
                        required
                        value={password}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        onInvalid={e => e.target.setCustomValidity('Password must have at least 8 characters, at least 1 number and 1 uppercase and 1 lowercase letter')}
                        onInput={e => e.target.setCustomValidity('')}
                        style={{fontFamily:"Poppins-Regular"}}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        onChange={validate}
                        required
                        style={{fontFamily:"Poppins-Regular"}}/>
                    </CInputGroup>
                    <CButton type="submit" block disabled={isDisabled} style={{fontFamily:"Poppins-Regular", background:"#ff8b02", color:"#fff"}}>
                      <CSpinner grow size="sm" className="mfe-1" hidden={isHidden} />
                      Create Account
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
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
