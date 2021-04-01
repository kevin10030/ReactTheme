import React, { Component, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CDataTable,
  CForm,
  CFormGroup,
  CFormText,
  CLink,
  CInput,
  CLabel,
  CSelect,
  CSpinner,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputFile
} from "@coreui/react";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import { NavLink as RouterLink, useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import Config from '../../common/Config';
import UserService from '../../services/UserService';

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function Users() {
  const history = useHistory();
  const [currentPage, setCurrentPage] = React.useState(1)
  const [currentPagination, setCurrentPagination] = React.useState(5)
  const getLastVal = (currentPage) => {
    if (currentPage * currentPagination < usersList.length)
      return currentPage * currentPagination;
    return usersList.length;
  }
  const fields = [
    { key: "firstname", label: "First Name", _style: { width: "20%" } },
    { key: "lastname", label: "Last Name", _style: { width: "20%" } },
    { key: "userrole", label: "User Role", _style: { width: "20%" } },
    { key: "email", label: "Email", _style: { width: "20%" } },
    { key: "mobilenumber", label: "Mobile", _style: { width: "20%" } },
    { key: "country", label: "Country", _style: { width: "20%" } },
    { key: "city", label: "City", _style: { width: "20%" } },
    {
      key: 'actions',
      label: '',
      _style: { width: '100px' },
      sorter: false,
      filter: false
    },
  ];
  const [loading, setLoading] = React.useState(false);
  const [usersList, setUsersList] = React.useState([]);
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
  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');

  React.useEffect(() => {
    if (localStorage.getItem("loginUser")) {
      var loginUser = JSON.parse(localStorage.getItem("loginUser"));
      console.log("loginUser2 ===> " + JSON.stringify(loginUser));
      if(loginUser.userrole !== 'Admin') {
        history.push('/');
      }
    } else {
      history.push("/auth/login-page");
    }
    getUserList();
  }, []);

  const getUserList = async () => {
    setLoading(true);
    axios({
      url: Config.BACKEND_API_URL+'/admin/user/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1)
      console.log(list)
      setUsersList(list);
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false);
     });
  };

  const setUser = async (item) => {
    setUserId(item.userId); setEmail(item.email);
    setFirstname(item.firstname); setLastname(item.lastname);
    setCompany(item.company); setState(item.state);
    setCountry(item.country); setCity(item.city);
    setAddress(item.address); setMobileNumber(item.mobilenumber);
    setPincode(item.pincode); setUserRole(item.userrole);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
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
      setLoading(false);
      setToastClass('success');
      setToastMessage(res);
      showToast(true);
      getUserList();
    }, (err) => {
      setLoading(false);
      setToastClass('error');
      setToastMessage(err);
      showToast(true);
      getUserList();
    });
  }

  return (
    <div className="animated fadeIn">
      <CRow>
        <CCol xl="12">
          <CCard custom>
            <CCardHeader>Users</CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersList}
                fields={fields}
                tableFilter
                itemsPerPageSelect={false}
                itemsPerPage={currentPagination}
                dark={false}
                hover={false}
                border={false}
                outlined={false}
                loading={false}
                sorter={false}
                pagination={{ doubleArrows: true, align: "center" }}
                loading={loading}
                onPageChange={val => {
                  console.log("new page:", val);
                  setCurrentPage(val);
                }}
                onPaginationChange={val => {
                  console.log("new pagination:", val);
                  setCurrentPagination(val);
                }}
                scopedSlots={{
                  'actions':
                    item => {
                      return(
                        <td className="py-2" style={{display:'flex',justifyContent: 'flex-end',textAlign:'right'}}>
                          {
                            userId != item.userId ?
                            <CButton size="sm" color="info" onClick={(e) => { e.preventDefault(); setUser(item) }}>Edit</CButton>
                            : <CButton size="sm" color="info" disabled>Edit</CButton>
                          }
                        </td>
                      )
                    }
                }}
              />
              <CRow>
                <CCol
                  xs="9"
                  md="8"
                  style={{ alignSelf: "center", display: "flex" }}
                >
                  <spin style={{ marginTop: "5px", marginRight: "5px" }}>
                    Items per page:
                  </spin>
                  <CSelect
                    name="itemsperpage"
                    id="itemsperpage"
                    style={{ width: "70px" }}
                    onChange={e => setCurrentPagination(e.target.value)}
                    value={currentPagination}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </CSelect>
                </CCol>
                <CCol xs="3" md="4" style={{ alignSelf: "center" }}>
                  <div style={{ textAlign: "right" }}>
                    <spin>
                      {(currentPage - 1) * currentPagination +
                        1 +
                        "-" +
                        getLastVal(currentPage) +
                        " of " +
                        usersList.length}
                    </spin>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg="7" md="8" sm="12">
          <CCard custom>
            <CCardHeader id="headingOne" style={{ display: 'inline-flex' }}>
              Edit User
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} className="form-horizontal" name='simpleForm'>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>@</CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="text"
                      label="Email"
                      name="useremail-input"
                      id="useremail-input"
                      placeholder="Email"
                      autoComplete="given-email"
                      value={email}
                      required
                      readonly />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>@</CInputGroupText>
                  </CInputGroupPrepend>
                  <CSelect
                    name="userrole"
                    id="userrole"
                    onChange={e => setUserRole(e.target.value)}
                    value={userrole}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </CSelect>
                </CInputGroup>
                <hr/>
                <div style={{width:"150px"}}>
                  <CButton type="submit" size="sm" color="primary" style={{marginRight:'10px'}} ><CIcon name="cil-save" /> Save</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
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
