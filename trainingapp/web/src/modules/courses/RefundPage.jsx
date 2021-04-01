import React from "react";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow, CDataTable, CForm, CFormGroup, CFormText, CLink, CInput, CLabel, CSelect,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from '@coreui/react'

import { useSelector, useDispatch } from 'react-redux';
import { NavLink as RouterLink, Route, useHistory } from "react-router-dom";

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import CIcon from '@coreui/icons-react'
import axios from 'axios';
import Config from '../../common/Config'

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}


export default function RefundPage() {
  const { useState } = React;
  const history = useHistory();
  // const loginUser = useSelector(state => state.loginUser);
  const [loginUser, setLoginUser] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [currentPagination, setCurrentPagination] = useState(5)
  const getLastVal = (currentPage) => {
    if (currentPage * currentPagination < paymentList.length)
      return currentPage * currentPagination;
    return paymentList.length;
  }
  const fields = [
    { key: 'useremail', label:'User Email', _style: { width: '20%' } },
    { key: 'coursename', label:'Course Name', _style: { width: '30%' } },
    { key: 'amount', label:'Amount', _style: { width: '20%' } },
    { key: 'paymenttime', label:'Payment Time', _style: { width: '30%' } },
    {
      key: 'actions',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    },
  ]

  const [adminid, setAdminId] = React.useState("adminid")
  const [adminemail, setAdminEmail] = React.useState("adminemail")

  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');

  const [loading, setLoading] = React.useState(false);
  const [paymentList, setPaymentList] = React.useState([])
  const [courseList, setCourseList] = React.useState([])

  const [refunditem, setRefundItem] = React.useState(null)

  React.useEffect(() => {
    if(localStorage.getItem('loginUser')) {
      var loginUser = JSON.parse(localStorage.getItem('loginUser'))
      setLoginUser(loginUser)
      console.log('loginUser2 ===> ' + JSON.stringify(loginUser));
      setAdminId(loginUser.userId);
      setAdminEmail(loginUser.email);
      if(loginUser.userrole !== 'Admin') {
        history.push('/');
      }
    } else {
      history.push('/auth/login-page');
    }

    getCourseList();
  }, []);

  const getUser = async (email) => {
    setLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/user/details',
      method: 'get' ,
      headers: {
        'Content-Type': 'application/json',
        'user-email': email
      }
    })
    .then(function (response) {
      console.log(response.data)
      setAdminId(response.data.userId)
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });
  };

  const getPaymentList = async () => {
    setLoading(true)

    axios({
      url: Config.BACKEND_API_URL + '/admin/payment/list/unrefund',
      method: 'get'
    }).then(response => response.data).then((data) => {
      const list = data.sort((a, b) => a.updatedtime > b.updatedtime ? 1 : -1)
      console.log(list)
      setPaymentList(list);
      setLoading(false)
    }).catch(error => {
      setLoading(false)
    });
  };

  const getCourseList = async () => {
    setLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/course/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.updatedtime > b.updatedtime ? 1 : -1)
      console.log(list)
      setCourseList(list);
      setLoading(false)
      getPaymentList()
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });
  };

  const handleRefund = (item) => {
    if(refunditem !==null) {
      // setToastClass('Warning');
      // setToastMessage('Please process previous refund')
      // showToast(true)
    } else
      setRefundItem(item);
  }

  const refundPayment = (item) => {
    setLoading(true)
    console.log(item)
    var chargeid = 'ch_'
    try{
      chargeid = item.chargeid;
    }catch(e){
      setLoading(false)
      setToastClass('Warning');
      setToastMessage("Charge id is not valid");
      showToast(true);
      return;
    }

    console.log(chargeid)
    axios({
      url: process.env.REACT_APP_AWS_API_ENDPOINT + '/admin/refund/create',
      method: 'post',
      data: {
        'chargeid': chargeid,
        'paymentid': item.paymentid,
        'amount': courseList.find(course => course.courseid === item.courseid).price,
        'adminemail':adminemail,
        'updatedby': adminid,
        'updatedtime': Date.now().toString()
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.data).then((data) => {
      console.log(data)
      setLoading(false)
      setToastClass('success');
      setToastMessage('Success: ' + data);
      showToast(true);
      setRefundItem(null);
    }).catch(error => {
      console.log(error)
      setLoading(false)
      setToastClass('Warning');
      setToastMessage(error.response.data);
      showToast(true);
      setRefundItem(null);
    })
  }

  function getDateTimeString(timestamp)
  {
    const date =  new Date(Number(timestamp));
    return date.toLocaleString("en-US");
  }

  return (
    <div className="animated fadeIn">
      <CRow>
        <CCol xl="12">
          <CCard custom>
            <CCardHeader >
              Payment Transactions
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={paymentList}
                fields={fields}
                // columnFilter
                tableFilter
                // footer
                itemsPerPageSelect={false}
                itemsPerPage={currentPagination}
                dark={false}
                hover={false}
                border={false}
                outlined={false}
                loading={false}
                sorter={false}
                // clickableRows
                pagination={{ doubleArrows: true, align: 'center' }}
                loading={loading}
                // onRowClick={(item,index,col,e) => {console.log(item,index,col,e)}}
                onPageChange={(val) => {
                  setCurrentPage(val)
                  }
                }
                // onPagesChange={(val) => console.log('new pages:', val)}
                onPaginationChange={(val) => {
                  setCurrentPagination(val);
                }}
                // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
                // onSorterValueChange={(val) => console.log('new sorter value:', val)}
                // onTableFilterChange={(val) => console.log('new table filter:', val)}
                // onColumnFilterChange={(val) => console.log('new column filter:', val)}
                scopedSlots={{
                  'coursename':
                  (item) => (
                    <td>
                      {
                        courseList.find(course => course.courseid === item.courseid).coursename
                      }
                    </td>
                  ),
                  'amount':
                  (item) => (
                    <td>
                      {
                        courseList.find(course => course.courseid === item.courseid).price + " " + courseList.find(course => course.courseid === item.courseid).currency
                      }
                    </td>
                  ),
                  'paymenttime':
                  (item) => (
                    <td>
                      { getDateTimeString(item.updatedtime) }
                    </td>
                  ),
                  'actions':
                    item => {
                      return (
                        <td className="py-2">
                          <CButton size="sm" color="danger" className="ml-1" onClick={(e) =>
                            {
                              e.preventDefault();
                              handleRefund(item)

                            }}>
                            Refund
                          </CButton>
                        </td>
                      )
                    }
                }}
              />
              <CRow>
                <CCol xs="9" md="8" style={{alignSelf:"center", display:'flex'}}>
                    <spin style={{marginTop:"5px", marginRight:"5px"}}>Items per page:</spin>
                    <CSelect
                      name="itemsperpage"
                      id="itemsperpage"
                      style={{width:"70px"}}
                      onChange={e => setCurrentPagination(e.target.value)}
                      value={currentPagination}>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </CSelect>
                </CCol>
                <CCol xs="3" md="4" style={{alignSelf:"center"}}>
                  <div  style={{textAlign: 'right' }}>
                    <spin>
                    {
                      ((currentPage - 1) * currentPagination + 1) + '-' + getLastVal(currentPage) + ' of ' + paymentList.length
                    }
                    </spin>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12" lg="12" >
            <CRow className="justify-content-center" hidden={refunditem === null} >
              <Alert
                severity={'info'}
                color={'info'}
                action={
                  <div>
                    <CButton color="danger" style={{width:"50px",marginRight:"5px"}} onClick={(e) => { e.preventDefault(); refundPayment(refunditem); }}>YES</CButton>
                    <CButton color="danger" style={{width:"50px"}} onClick={(e) => { e.preventDefault(); setRefundItem(null); }}>NO</CButton>
                  </div>
                }
              >
              {'Do yo want to perform refund?'}
            </Alert>
            </CRow>
        </CCol>
        <CCol sm="12" lg="6">
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={toast}
            autoHideDuration={10000}
            onClose={() => { showToast(false); getPaymentList(); }}>
            <Alert
              severity={toastClass}
              action={
                <CButton  onClick={(e) => { e.preventDefault(); showToast(false); getPaymentList();  }}><CIcon name="cil-x" /></CButton>
              }
            >
              {toastMessage}
            </Alert>
          </Snackbar>
        </CCol>
      </CRow>
    </div>
  )
}
