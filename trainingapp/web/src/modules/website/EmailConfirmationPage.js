import React from "react";
import { useDispatch } from "react-redux";

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
  CSpinner
} from "@coreui/react";

import { Hidden } from "@material-ui/core";

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import CIcon from "@coreui/icons-react";

import { useHistory } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";

import free_trial_bg from "../../assets/images/home/free_trial_bg.png"
import free_trial_circle1 from "../../assets/images/home/free_trial_circle1.png"
import free_trial_circle2 from "../../assets/images/home/free_trial_circle2.png"

import { makeStyles } from "@material-ui/core/styles";

import styles from "../../assets/material/jss/material-dashboard-pro-react/views/registerPageStyle";

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function EmailConfirmationPage() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = React.useState("");
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
      await Auth.forgotPassword(email);
      dispatch({ type: "set", changePasswordUser: { email: email } });
      history.push("/auth/change-password");
    } catch (error) {
      setIsDisabled(false);
      setIsHidden(true);
      setToastClass('error');
      setToastMessage(error.message);
      showToast(true);
    }
  }

  return (
    <div className={classes.container}
         style={{padding:"2rem", margin:"0", backgroundImage: "url("+free_trial_bg+")", width:"100%",height:"100%"}}
    >
      <Hidden smDown>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="7" lg="6" xl="5">
              <CRow style={{float:"left"}}>
                <CCardBody style={{backgroundImage: "url("+free_trial_circle1+")", backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', width:"100px",height:"100px"}}/>
              </CRow>
              <CCard className="mx-4" style={{display:"block", margin:"0", marginTop:"30px", marginLeft:"60px"}}>
                <CCardBody className="p-4">
                  <CForm id="EmailForm" onSubmit={handleSubmit}>
                    <h1 style={{fontFamily:"Poppins-Bold",textAlign:"center", color: "#000" }}>Forgot Password</h1>
                    <p className="text-muted" style={{fontFamily:"Poppins-Regular",textAlign:"center"}}>Enter registered email address.</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        value={email}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        style={{fontFamily:"Poppins-Regular"}}
                      />
                    </CInputGroup>
                    <CButton
                      type="submit"
                      block
                      disabled={isDisabled}
                      style={{fontFamily:"Poppins-Regular", background:"#ff8b02", color:"#fff"}}
                    >
                      <CSpinner
                        grow
                        size="sm"
                        className="mfe-1"
                        hidden={isHidden}
                      />
                      Send Verification Code
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
              <CRow style={{float:"right", marginTop:"-70px", marginRight:"-10px"}}>
                <CCardBody style={{textAlign:"bottom", backgroundImage: "url("+free_trial_circle2+")", backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', width:"100px",height:"100px"}}/>
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
                  <CForm id="EmailForm" onSubmit={handleSubmit}>
                    <h2 style={{fontFamily:"Poppins-Bold",textAlign:"center", color: "#000" }}>Forgot Password</h2>
                    <p className="text-muted" style={{fontFamily:"Poppins-Regular",textAlign:"center"}}>Enter registered email address.</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        value={email}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        style={{fontFamily:"Poppins-Regular"}}
                      />
                    </CInputGroup>
                    <CButton
                      type="submit"
                      block
                      disabled={isDisabled}
                      style={{fontFamily:"Poppins-Regular", background:"#ff8b02", color:"#fff"}}
                    >
                      <CSpinner
                        grow
                        size="sm"
                        className="mfe-1"
                        hidden={isHidden}
                      />
                      Send Verification Code
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
