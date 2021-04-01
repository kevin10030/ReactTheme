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

import Snackbar from '@material-ui/core/Snackbar';

import { NavLink as RouterLink, useHistory } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import Config from '../../common/Config'

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function Messages() {
  const history = useHistory();
  const [loginUser, setLoginUser] = React.useState({})

  const [currentPage, setCurrentPage] = React.useState(1)
  const [currentPagination, setCurrentPagination] = React.useState(5)
  const getLastVal = (currentPage) => {
    if (currentPage * currentPagination < messageList.length)
      return currentPage * currentPagination;
    return messageList.length;
  }
  const fields = [
    { key: "subject", label: "Subject", _style: { width: "20%" } },
    { key: "mobilenumber", label: "Mobile Number", _style: { width: "20%" } },
    { key: "message", label: "Message", _style: { width: "20%" } },
    { key: "email", label: "Email", _style: { width: "20%" } },
    { key: "name", label: "Name", _style: { width: "10%" } },
    { key: "type", label: "Type", _style: { width: "10%" } },
    {
      key: 'actions',
      label: '',
      _style: { width: '15%' },
      sorter: false,
      filter: false
    },
  ];
  const [adminid, setAdminId] = React.useState("adminid")
  const [loading, setLoading] = React.useState(false);
  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');
  const [messageList, setMessageList] = React.useState([]);
  React.useEffect(() => {
    if (localStorage.getItem("loginUser")) {
      var loginUser = JSON.parse(localStorage.getItem("loginUser"));
      setLoginUser(loginUser)
      console.log("loginUser2 ===> " + JSON.stringify(loginUser));
      setAdminId(loginUser.userId);
      if(loginUser.userrole !== 'Admin') {
        history.push('/');
      }
    } else {
      history.push("/auth/login-page");
    }

    getMessageList();
  }, []);

  function deleteMessage(item){
    console.log(item);
    setLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/message/delete',
      method: 'delete',
      data: {
        messageid: item.messageid,
        deletedby:adminid,
        deletedtime:Date.now().toString()
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      setToastClass('success');
      setToastMessage('Success: ' + response.data);
      showToast(true);
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
      // error.response.data
      setLoading(false)
    });
  }

  const getMessageList = async () => {
    setLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/message/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1)
      console.log(list)
      setMessageList(list);
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });
  };

  return (
    <div className="animated fadeIn">
      <CRow>
        <CCol xl="12">
          <CCard custom>
            <CCardHeader>Messages</CCardHeader>
            <CCardBody>
              <CDataTable
                items={messageList}
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
                          <CButton size="sm" color="danger" className="ml-1" onClick={(e) => { e.preventDefault(); deleteMessage(item) }}>
                            Delete
                          </CButton>
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
                        messageList.length}
                    </spin>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="12" lg="6">
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={toast}
            autoHideDuration={3000}
            onClose={() => {
              showToast(false);
              toast ? getMessageList() : showToast(false);
            }}
          >
            <Alert
              severity={toastClass}
              action={
                <CButton  onClick={(e) => { e.preventDefault(); showToast(false); getMessageList();  }}><CIcon name="cil-x" /></CButton>
              }
            >
              {toastMessage}
            </Alert>
          </Snackbar>
        </CCol>
      </CRow>
    </div>
  );
}
