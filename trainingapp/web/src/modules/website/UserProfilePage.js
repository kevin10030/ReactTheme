import React from "react";
import axios from 'axios';

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserService from '../../services/UserService';

import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CInput, CInputGroup, CInputGroupPrepend,
         CInputGroupText, CRow, CTextarea, CAlert, CSpinner, CLabel } from "@coreui/react";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import CIcon from "@coreui/icons-react";

import { Hidden } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/material/jss/material-dashboard-pro-react/views/registerPageStyle";

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function UserProfilePage() {
  const classes = useStyles();
  const history = useHistory();
  const [userId, setUserId] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState('');
  const [city, setCity] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [pincode, setPincode] = React.useState('');
  const [userrole, setUserRole] = React.useState('');
  const [isHidden, setIsHidden] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastClass, setToastClass] = React.useState("success");

  React.useEffect(() => {
    var jsonUser = localStorage.getItem("loginUser");
    if (jsonUser) {
      var loginUser = JSON.parse(jsonUser);
      setUser(loginUser);
    } else {
      history.push("/auth/login-page");
    }
  }, []);

  const setUser = async (loginUser) => {
    setUserId(loginUser.userId); setEmail(loginUser.email);
    setFirstname(loginUser.firstname); setLastname(loginUser.lastname);
    setCompany(loginUser.company); setState(loginUser.state);
    setCountry(loginUser.country); setCity(loginUser.city);
    setAddress(loginUser.address); setMobileNumber(loginUser.mobilenumber);
    setPincode(loginUser.pincode); setUserRole(loginUser.userrole);
  };

  const getUser = async () => {
    await axios({
      url: process.env.REACT_APP_AWS_API_ENDPOINT + '/admin/user/details',
      method: 'get',
      headers: {
        'user-email': email
      }
    }).then(response => response.data).then((data) => {
      if(data && data.length > 0) {
        var exUser = data[0];
        setUser(exUser);
        localStorage.setItem('loginUser', JSON.stringify(exUser));
      }
    }).catch(error => {
      console.log(error);
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsDisabled(true);
    setIsHidden(false);
    showToast(false);

    UserService.createUser({
      userId: userId,
      email: email,
      firstname: firstname,
      lastname: lastname,
      mobileNumber: mobileNumber,
      company: company,
      country: country,
      state: state,
      city: city,
      address: address,
      pincode: pincode,
      userrole: userrole
    }, (res) => {
      getUser();
      setToastClass('success');
      setToastMessage(res);
      showToast(true);
      setIsDisabled(false);
      setIsHidden(true);
    }, (err) => {
      setToastClass('error');
      setToastMessage(err);
      showToast(true);
      setIsDisabled(false);
      setIsHidden(true);
    });
  }

  return (
    <div className={classes.container}>
      <Hidden smDown>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="8" xl="7">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm id="userProfile" onSubmit={handleSubmit}>
                    <h1 style={{ color: "#3c4b64" }}>Personal Details</h1>
                    <CRow className="justify-content-center mt-2">
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>First Name</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="First Name" autoComplete="firstname"
                            onChange={e => setFirstname(e.target.value)}
                            required
                            value={firstname}
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>Last Name</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Last Name" autoComplete="lastname"
                            onChange={e => setLastname(e.target.value)}
                            required
                            value={lastname}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="justify-content-center">
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>Email</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="email" value={email} disabled />
                        </CInputGroup>
                      </CCol>
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>Mobile</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Mobile Number"
                            onChange={e => setMobileNumber(e.target.value)}
                            value={mobileNumber}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="justify-content-center">
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>Company</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" id="company" placeholder="Company Name"
                            onChange={e => setCompany(e.target.value)}
                            value={company}
                            autoComplete="company-name"
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>City</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" id="city" placeholder="City"
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            autoComplete="city"
                            required
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="justify-content-center">
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>State</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" id="state" placeholder="State / Province"
                            autoComplete="state"
                            onChange={e => setState(e.target.value)}
                            value={state}
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>Country</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" id="country" placeholder="Country"
                            autoComplete="country"
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                            required
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>Address</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" id="address" placeholder="Address"
                        autoComplete="address"
                        onChange={e => setAddress(e.target.value)}
                        value={address}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>PIN Code</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" id="pincode" placeholder="PIN Code"
                        autoComplete="pincode"
                        onChange={e => setPincode(e.target.value)}
                        value={pincode}
                        required
                      />
                    </CInputGroup>
                    <CButton type="submit" color="primary" block disabled={isDisabled}>
                      <CSpinner grow size="sm" className="mfe-1" hidden={isHidden} />
                      Update
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </Hidden>
      <Hidden mdUp>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="12" style={{padding:"0"}} >
              <CCard >
                <CCardBody >
                  <CForm id="userProfile" onSubmit={handleSubmit}>
                    <h1 style={{ color: "#3c4b64" }}>Personal Details</h1>
                    <CRow className="justify-content-center mt-2">
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>First Name</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="First Name" autoComplete="firstname"
                            onChange={e => setFirstname(e.target.value)}
                            required
                            value={firstname}
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>Last Name</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Last Name" autoComplete="lastname"
                            onChange={e => setLastname(e.target.value)}
                            required
                            value={lastname}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="justify-content-center">
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>Email</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="email" value={email} disabled />
                        </CInputGroup>
                      </CCol>
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>Mobile</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Mobile Number"
                            onChange={e => setMobileNumber(e.target.value)}
                            value={mobileNumber}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="justify-content-center">
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>Company</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" id="company" placeholder="Company Name"
                            onChange={e => setCompany(e.target.value)}
                            value={company}
                            autoComplete="company-name"
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>City</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" id="city" placeholder="City"
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            autoComplete="city"
                            required
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="justify-content-center">
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>State</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" id="state" placeholder="State / Province"
                            autoComplete="state"
                            onChange={e => setState(e.target.value)}
                            value={state}
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol md="6">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>Country</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" id="country" placeholder="Country"
                            autoComplete="country"
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                            required
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>Address</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" id="address" placeholder="Address"
                        autoComplete="address"
                        onChange={e => setAddress(e.target.value)}
                        value={address}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>PIN Code</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" id="pincode" placeholder="PIN Code"
                        autoComplete="pincode"
                        onChange={e => setPincode(e.target.value)}
                        value={pincode}
                        required
                      />
                    </CInputGroup>
                    <CButton type="submit" color="primary" block disabled={isDisabled}>
                      <CSpinner grow size="sm" className="mfe-1" hidden={isHidden} />
                      Update
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </Hidden>      
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toast}
        autoHideDuration={3000}
        onClose={() => { showToast(false); }}
      >
        <Alert severity={toastClass}
          action={
            <CButton
              onClick={e => {
                e.preventDefault();
                showToast(false);
              }}
            >
              <CIcon name="cil-x" />
            </CButton>
          }
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
