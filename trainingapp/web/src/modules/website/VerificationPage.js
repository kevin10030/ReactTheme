import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import { NavLink as RouterLink, Route, useHistory } from "react-router-dom";
import Amplify, { Auth } from 'aws-amplify';

import { CAlert, CInput, CInputGroup, CButton, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

// core components
import GridContainer from "../../layout/grid/GridContainer.js";
import GridItem from "../../layout/grid/GridItem.js";
import Button from "../../layout/custombuttons/Button.js";
import CustomInput from "../../layout/custominput/CustomInput.js";
import InfoArea from "../../layout/infoarea/InfoArea.js";
import Card from "../../layout/card/Card.js";
import CardBody from "../../layout/card/CardBody.js";

import styles from "../../assets/material/jss/material-dashboard-pro-react/views/registerPageStyle";

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function VerificationPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [code, setCode] = React.useState('');
  const email = useSelector(state => state.registerUser.email);
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
      await Auth.confirmSignUp(email,code)
      localStorage.setItem('verificationStatus', 'Registration Successful. Please Login.')
      history.push('/auth/login-page');
    } catch (error) {
      console.log('error confirming sign up', error);
      setToastClass('error');
      setToastMessage(error.message);
      showToast(true);
    }
    setIsDisabled(false);
    setIsHidden(true);
  }

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={4}>
          <Card className={classes.cardSignup} style={{marginBottom: '15px'}}>
            <h3 className={classes.cardTitle}>Email Verification</h3>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <form id="verifyForm" className={classes.form} onSubmit={handleSubmit}>
                    <CInputGroup className="mb-3">
                      <CInput
                        type = "email"
                        value={email}
                        disabled
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInput
                        type="text"
                        placeholder="Verification Code"
                        onChange={e => setCode(e.target.value)}
                        value={code}
                        required
                      />
                    </CInputGroup>
                    <CButton type="submit" color="success" block disabled={isDisabled}>
                      <CSpinner grow size="sm" className="mfe-1" hidden={isHidden} />
                      Verify
                    </CButton>
                  </form>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={toast}
        autoHideDuration={3000}
        onClose={() => { showToast(false); }}>
        <Alert
          severity={toastClass}
          action={
            <CButton onClick={(e) => { e.preventDefault();  showToast(false); }}><CIcon name="cil-x" /></CButton>
          }
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
