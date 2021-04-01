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
import { Hidden } from "@material-ui/core";
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

import Config from "../../common/Config"

import contact_us from "../../assets/images/home/contact_us.png"
import contact_info_address_icon from "../../assets/images/home/contact_info_address_icon.png"
import contact_info_phone_icon from "../../assets/images/home/contact_info_phone_icon.png"
import contact_info_email_icon from "../../assets/images/home/contact_info_email_icon.png"
import contact_us_map from "../../assets/images/home/contact_us_map.png"

import facebook_icon from "../../assets/images/home/facebook_icon.png"
import twitter_icon from "../../assets/images/home/twitter_icon.png"
import whatsapp_icon from "../../assets/images/home/whatsapp_icon.png"
import linkedin_icon from "../../assets/images/home/linkedin_icon.png"

import styles from "../../assets/material/jss/material-dashboard-pro-react/views/pricingPageStyle.js";
import  { useStyles }  from '../../layout/theme/PageTheme';
const useStyles1 = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function ContactPage() {
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
      url: Config.BACKEND_API_URL + '/user/message/create',
      method: 'post',
      data: {
        'name': name,
        'email': email,
        'mobilenumber': mobileNumber,
        'subject': subject,
        'message': message,
        'type': 'contact',
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
    <div className={classes1.container} style={{width:"100%",padding:"0",margin:"0"}}>
      <div style={{backgroundImage: "url("+contact_us+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <CRow className="justify-content-center" style={{margin:"0"}}>
          <Hidden smDown>
            <spin style={{paddingTop:"7rem",paddingBottom:"7rem", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#fff"}}>{'Contact Us'}</spin>
          </Hidden>
          <Hidden mdUp>
            <spin style={{paddingTop:"5rem",paddingBottom:"5rem", fontFamily:"Poppins-Bold", fontSize:"230%", color:"#fff"}}>{'Contact Us'}</spin>
          </Hidden>
        </CRow>
      </div>
      <div style={{paddingTop:"4rem", paddingBottom:"4rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
      <CRow className="justify-content-center">
        <CCol md="9">
          <CRow style={{marginBottom:"4rem"}}>
            <CCol md="4" style={{display:"flex",verticalAlign:"middle", alignItems:"center"}}>
              <div>
                <div style={{textAlign:"left"}}>
                  <p style={{fontFamily:"Poppins-Bold", fontSize:"150%", color:"#ff8b02"}}>{'Contact'}</p>
                </div>
                <div style={{textAlign:"left"}}>
                  <p style={{fontFamily:"Poppins-Bold", fontSize:"150%", color:"#323642"}}>{Config.contactus_string1}</p>
                </div>
              </div>
            </CCol>
            <CCol md="8">
              <div style={{textAlign:"left",float:'right'}}>
                <Hidden smDown>
                  <spin style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"100%", color:"#828282",lineHeight:"2rem"}}>{Config.contactus_string1_content}</spin>
                </Hidden>
                <Hidden mdUp>
                  <spin style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#828282",lineHeight:"2rem"}}>{Config.contactus_string1_content_mobile}</spin>
                </Hidden>
              </div>
            </CCol>
          </CRow>

          <CRow style={{marginBottom:"4rem"}}>
            <CCol md="4">
              <div style={{marginBottom:"2rem"}}>
                <div style={{textAlign:"left"}}>
                  <p style={{fontFamily:"Poppins-Bold", fontSize:"180%", color:"#323642"}}>{Config.contactus_string2}</p>
                </div>
                <div style={{textAlign:"left"}}>
                  <p style={{whiteSpace: "pre", fontFamily:"Poppins-Regular", fontSize:"120%", color:"#3e3e3e"}}>{Config.contactus_string2_content}</p>
                </div>
              </div>
              <div style={{marginBottom:"2rem"}}>
                <div style={{textAlign:"left"}}>
                  <p style={{fontFamily:"Poppins-Bold", fontSize:"180%", color:"#323642"}}>{Config.contactus_string3}</p>
                </div>
                <CRow style={{margin:"0", marginBottom:"1rem", textAlign:"left"}}>
                  <div style={{marginRight:"0.5rem", backgroundImage: "url("+contact_info_address_icon+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                  <spin style={{whiteSpace: "pre", fontFamily:"Poppins-Regular", fontSize:"120%", color:"#3e3e3e"}}>{Config.contactus_string3_sub1}</spin>
                </CRow>
                <CRow style={{margin:"0", marginBottom:"1rem", textAlign:"left"}}>
                  <div style={{marginRight:"0.5rem", backgroundImage: "url("+contact_info_email_icon+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                  <spin style={{whiteSpace: "pre", fontFamily:"Poppins-Regular", fontSize:"120%", color:"#3e3e3e"}}>{Config.contactus_string3_sub2}</spin>
                </CRow>
                <CRow style={{margin:"0", marginBottom:"1rem", textAlign:"left"}}>
                  <div style={{marginRight:"0.5rem", backgroundImage: "url("+contact_info_phone_icon+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                  <spin style={{whiteSpace: "pre", fontFamily:"Poppins-Regular", fontSize:"120%", color:"#3e3e3e"}}>{Config.contactus_string3_sub3}</spin>
                </CRow>
              </div>
              <div style={{marginBottom:"2rem"}}>
                <div style={{textAlign:"left"}}>
                  <p style={{fontFamily:"Poppins-Bold", fontSize:"180%", color:"#323642"}}>{Config.contactus_string4}</p>
                </div>
                <CRow style={{margin:"0", marginBottom:"1rem", textAlign:"left"}}>
                  <div style={{cursor:"pointer", marginRight:"0.5rem", backgroundImage: "url("+facebook_icon+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"2rem", width:"2rem"}}/>
                  <div style={{cursor:"pointer",marginRight:"0.5rem", backgroundImage: "url("+twitter_icon+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"2rem", width:"2rem"}}/>
                  <div style={{cursor:"pointer",marginRight:"0.5rem", backgroundImage: "url("+whatsapp_icon+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"2rem", width:"2rem"}}/>
                  <div style={{cursor:"pointer",marginRight:"0.5rem", backgroundImage: "url("+linkedin_icon+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"2rem", width:"2rem"}}/>
                </CRow>
              </div>
            </CCol>
            <CCol md="8">
              <div style={{width:"100%",float:'right'}}>
                {/* <CRow style={{float:'right'}}>
                  <CCol md="9" lg="7" xl="6"> */}
                    <div style={{padding:"2rem", background:"#f6fafd"}} >
                      <div style={{textAlign:"left"}}>
                        <CForm id="signUpForm" onSubmit={handleSubmit}>
                          <div style={{marginBottom:"1rem"}}>
                          <spin style={{whiteSpace: "pre", fontFamily:"Poppins-Bold",fontSize:"180%",color:"#252424"}}>{Config.contactus_string5}</spin>
                          </div>
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
                              placeholder="Phone"
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
                          <CButton type="submit" disabled={isDisabled} style={{background:"#ff8b02",color:"#fff",fontSize:"120%",  width:"8rem",height:"3rem", borderRadius:"2rem"}}>
                            <CSpinner grow size="sm" className="mfe-1" hidden={isHidden} />
                            Send Now
                          </CButton>
                        </CForm>
                      </div>
                    </div>
                  {/* </CCol>
                </CRow> */}
              </div>
            </CCol>
          </CRow>
          <div style={{ backgroundImage: "url("+contact_us_map+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover',width:"100%", height:"20rem"}}/>
        </CCol>
      </CRow>
      </div>
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
