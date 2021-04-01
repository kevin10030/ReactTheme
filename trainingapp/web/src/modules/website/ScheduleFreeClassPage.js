import React from "react";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CTextarea,
  CFormGroup,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// @material-ui/core components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import axios from 'axios';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useTheme, makeStyles } from "@material-ui/core/styles";

import { Hidden } from "@material-ui/core";
import free_trial_bg from "../../assets/images/home/free_trial_bg.png"
import free_trial_circle1 from "../../assets/images/home/free_trial_circle1.png"
import free_trial_circle2 from "../../assets/images/home/free_trial_circle2.png"

import styles from "../../assets/material/jss/material-dashboard-pro-react/views/pricingPageStyle.js";
import  { useStyles }  from '../../layout/theme/PageTheme';
const useStyles1 = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function ScheduleFreeClassPage() {
  const classes1 = useStyles1();
  const theme = useTheme();
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isHidden, setIsHidden] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');

  async function handleSubmit(event) {
    event.preventDefault();
    setIsDisabled(true);
    setIsHidden(false);
    axios({
      url: process.env.REACT_APP_AWS_API_ENDPOINT + '/user/message/create',
      method: 'post',
      data: {
        'name': name,
        'email': email,
        'mobilenumber': mobileNumber,
        'subject': subject,
        'message': message,
        'type': 'scheduleclass',
        'deletedby': 'null'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.data).then((data) => {
      setToastClass('success');
      setToastMessage(data);
      showToast(true);
      resetForm();
      setIsDisabled(false);
      setIsHidden(true);
    }).catch(error => {
      console.log('Error: ' + error);
      setToastClass('error');
      setToastMessage('Error sending message!');
      showToast(true);
      //resetForm();
      setIsDisabled(false);
      setIsHidden(true);
    });
  }

  function resetForm() {
    setName(''); setEmail(''); setMobileNumber('');
    setSubject(''); setMessage('');
  }

  return (
    <div className={classes1.container}
        style={{backgroundImage: "url("+free_trial_bg+")", width:"100%",height:"100%"}}
    >
    <Hidden smDown>
      <div style={{padding:"3rem", margin:"0"}}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="10" lg="8" xl="7">
            <CRow style={{float:"left"}}>
              <CCardBody style={{backgroundImage: "url("+free_trial_circle1+")", backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', width:"200px",height:"200px"}}/>
            </CRow>
            <CCard style={{display:"block", padding:"3rem",paddingTop:"1rem", marginTop:"60px", marginLeft:"60px"}}>
              <CCardBody className="p-4">
                <CForm id="signUpForm" onSubmit={handleSubmit}>
                  <h1 style={{color:"#3c4b64"}}>Schedule a free class</h1>
                  <p className="text-muted">Drop a message, and we'll get back to you soon.</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Name"
                      autoComplete="name"
                      onChange={e => setName(e.target.value)}
                      required
                      value={name} />
                  </CInputGroup>
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
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
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
                      value={mobileNumber} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Subject"
                      autoComplete="subject"
                      onChange={e => setSubject(e.target.value)}
                      required
                      value={subject} />
                  </CInputGroup>
                  <CTextarea
                      name="message"
                      id="message"
                      rows="4"
                      placeholder="Message"
                      onChange={e => setMessage(e.target.value)}
                      required
                      value={message}
                      className="mb-3" />
                  <CButton type="submit" color="success" block disabled={isDisabled}>
                    <CSpinner grow size="sm" className="mfe-1" hidden={isHidden} />
                    Send
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
            <CRow style={{float:"right", marginTop:"-170px", marginRight:"-60px"}}>
              <CCardBody style={{textAlign:"bottom", backgroundImage: "url("+free_trial_circle2+")", backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', width:"200px",height:"200px"}}/>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
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
    </Hidden>

    <Hidden mdUp>
      <div style={{paddingLeft:"0.5rem",paddingRight:"0.5rem",paddingTop:"3rem",paddingBottom:"3rem", margin:"0"}}>
          <CRow className="justify-content-center" style={{paddingLeft:"0",paddingRight:"0"}}>
            <CCol md="10" lg="8" xl="7" style={{paddingLeft:"0",paddingRight:"0"}}>
              <CCard >
                <CCardBody className="p-4">
                  <CForm id="signUpForm" onSubmit={handleSubmit}>
                    <h1 style={{color:"#3c4b64"}}>Schedule a free class</h1>
                    <p className="text-muted">Drop a message, and we'll get back to you soon.</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Name"
                        autoComplete="name"
                        onChange={e => setName(e.target.value)}
                        required
                        value={name} />
                    </CInputGroup>
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
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
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
                        value={mobileNumber} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Subject"
                        autoComplete="subject"
                        onChange={e => setSubject(e.target.value)}
                        required
                        value={subject} />
                    </CInputGroup>
                    <CTextarea
                        name="message"
                        id="message"
                        rows="4"
                        placeholder="Message"
                        onChange={e => setMessage(e.target.value)}
                        required
                        value={message}
                        className="mb-3" />
                    <CButton type="submit" color="success" block disabled={isDisabled}>
                      <CSpinner grow size="sm" className="mfe-1" hidden={isHidden} />
                      Send
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
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
    </Hidden>
    </div>
  );
}
