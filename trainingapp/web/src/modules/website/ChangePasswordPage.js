import React from "react";
import { useSelector } from "react-redux";

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

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import CIcon from "@coreui/icons-react";

import { useHistory } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";

import { makeStyles } from "@material-ui/core/styles";

import styles from "../../assets/material/jss/material-dashboard-pro-react/views/registerPageStyle";

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function ChangePasswordPage() {
  const classes = useStyles();
  const history = useHistory();
  const [code, setCode] = React.useState("");
  const email = useSelector(state => state.changePasswordUser.email);
  const [password, setPassword] = React.useState("");
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
      await Auth.forgotPasswordSubmit(email, code, password);
      localStorage.setItem(
        "passwordStatus",
        "Password changed successfully. Please Login."
      );
      history.push("/auth/login-page");
    } catch (error) {
      setIsDisabled(false);
      setIsHidden(true);
      setToastClass('error');
      setToastMessage(error.message);
      showToast(true);
    }
  }

  function validate() {
    let cPass = document.getElementById("confirmPassword");
    if (password != cPass.value) {
      cPass.setCustomValidity("Passwords Don't Match");
    } else {
      cPass.setCustomValidity("");
    }
  }

  return (
    <div className={classes.container}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm id="ChangePasswordForm" onSubmit={handleSubmit}>
                  <h1 style={{ color: "#3c4b64" }}>Reset Password</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" value={email} disabled />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Verification Code"
                      onChange={e => setCode(e.target.value)}
                      value={code}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="New Password"
                      autoComplete="new-password"
                      onChange={e => {
                        setPassword(e.target.value);
                        validate();
                      }}
                      required
                      value={password}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      onInvalid={e =>
                        e.target.setCustomValidity(
                          "Password must have at least 8 characters, at least 1 number and 1 uppercase and 1 lowercase letter"
                        )
                      }
                      onInput={e => e.target.setCustomValidity("")}
                    />
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
                    />
                  </CInputGroup>
                  <CButton type="submit" color="success" block disabled={isDisabled}>
                    <CSpinner grow size="sm" className="mfe-1" hidden={isHidden} />
                    Change Password
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
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
  );
}
