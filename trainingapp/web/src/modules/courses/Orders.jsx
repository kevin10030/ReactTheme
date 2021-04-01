import React, { Component, useEffect } from 'react'
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
} from '@coreui/react';

import { useSelector } from 'react-redux';
import { NavLink as RouterLink, Route, useHistory } from "react-router-dom";

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import CIcon from '@coreui/icons-react'
import axios from 'axios';
import Config from '../../common/Config'

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function Orders() {
  const { useState } = React;
  const history = useHistory();
  // const loginUser = useSelector(state => state.loginUser);
  const [loginUser, setLoginUser] = useState({})

  const [currentCoursePage, setCurrentCoursePage] = useState(1)
  const [currentCoursePagination, setCurrentCoursePagination] = useState(5)
  const getLastVal_Course = (currentPage) => {
    if (currentPage * currentCoursePagination < courseList.length)
      return currentPage * currentCoursePagination;
    return courseList.length;
  }

  const [currentUserPage, setCurrentUserPage] = useState(1)
  const [currentUserPagination, setCurrentUserPagination] = useState(5)
  const getLastVal_User = (currentPage) => {
    if (currentPage * currentUserPagination < userList.length)
      return currentPage * currentUserPagination;
    return userList.length;
  }


  const fields = [
    { key: 'coursename',label:'Title', _style: { width: '20%' } },
    { key: 'price',label:'Price', _style: { width: '10%' } },
    { key: 'expiryduration',label:'Expiry Duration', _style: { width: '20%' } },
    {
      key: 'actions',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    },
  ]

  const fields_users = [
    { key: 'email',label:'Email', _style: { width: '10%' } },
    { key: 'status',label:'Status', _style: { width: '20%' } },
    {
      key: 'actions',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    },
  ]

  const [adminid, setAdminId] = React.useState("adminid")
  const [courseOrderId, setCourseOrderId] = useState(-1)
  const [currency, setCurrency] = useState('SGD')
  const [price, setPrice] = useState('')

  const [userOrderId, setUserOrderId] = useState('')

  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');

  const [loading, setLoading] = React.useState(false);
  const [courseList, setCourseList] = React.useState([])

  const [userloading, setUserLoading] = React.useState(false);
  const [userList, setUserList] = React.useState([])
  const [orderList, setOrderList] = React.useState([])
  const [orderItemList, setOrderItemList] = React.useState([])

  React.useEffect(() => {
    if(localStorage.getItem('loginUser')) {
      var loginUser = JSON.parse(localStorage.getItem('loginUser'))
      setLoginUser(loginUser)
      console.log('loginUser2 ===> ' + JSON.stringify(loginUser));
      setAdminId(loginUser.userId);
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

  const getCourseList = async () => {
    setLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/course/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1)
      console.log(list)
      setCourseList(list);
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });
  };

  const getUserList = async (courseid,expiryduration, orderlist, orderitemlist,paymentlist) => {
    setUserLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/user/list',
      method: 'get'
    })
    .then(function (response) {
      console.log(orderlist)
      console.log(orderitemlist)
      console.log(response.data)
      // setUserList(response.data);
      const list =  response.data;
      for(var i=0;i<list.length;i++) {
        list[i]['status'] = getOrderStatus(courseid, expiryduration, orderlist, orderitemlist,paymentlist, list[i])
      }
      setUserList(list)
      setUserLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
      setUserLoading(false)
     });
  };

  const getPaymentList = async (courseid,expiryduration, orderlist, orderitemlist) => {
    setUserLoading(true)
    const paymentList = await axios({
      url: Config.BACKEND_API_URL + '/admin/payment/list',
      method: 'get'
    }).then(response => response.data).then((data) => {
      setUserLoading(false)
      return data.sort((a, b) => a.updatedtime > b.updatedtime ? -1 : 1)   //   descending
    }).catch(error => {
      setUserLoading(false)
    });

    getUserList(courseid,expiryduration, orderlist, orderitemlist, paymentList);
  };

  const getOrderItemList = async (courseid, expiryduration, orderlist) => {
    setUserLoading(true)
    const list = await axios({
      url: Config.BACKEND_API_URL+'/admin/orderitem/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.updatedtime > b.updatedtime ? -1 : 1) //descending
      setOrderItemList(list)
      // console.log(list)
      setUserLoading(false)
      return list
    })
    .catch(function (error) {
      console.log(error.response)
      setUserLoading(false)
     });

     getPaymentList(courseid, expiryduration, orderlist, list)
  };

  function getDateTimeString(timestamp)
  {
    const date =  new Date(Number(timestamp));
    return date.toLocaleString("en-US");
  }


  const getOrderList = async (courseid,expiryduration) => {
    setUserLoading(true)
    const list = await axios({
      url: Config.BACKEND_API_URL+'/admin/order/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.updatedtime > b.updatedtime ? -1 : 1) //descending
      // console.log(list)
      setOrderList(list);
      setUserLoading(false)
      return list
    })
    .catch(function (error) {
      console.log(error.response)
      setUserLoading(false)
     });

     getOrderItemList(courseid,expiryduration, list);
  };

  const getOrderStatus = (courseid, expiryduration, orderlist, orderitemlist, paymentlist, user) => {
    for(var i=0;i<orderitemlist.length;i++) {
      if(orderitemlist[i].productid === courseid) {
          // const order = orderList.slice().reverse().find(order => (order.orderid === orderItemList[i].orderid) && (order.userid == item.userId))
          const order = orderlist.find(order => (order.orderid === orderitemlist[i].orderid) && (order.userid === user.userId))
          if(order) {
            if(order.status === "Purchased" ) {
              const payment = paymentlist.find(payment => payment.orderitemid === orderitemlist[i].orderitemid)
              if(payment) {
                const date =  new Date(Number(payment.updatedtime));
                date.setMonth(date.getMonth() + parseInt(expiryduration))
                if(date >= Date.now()) {
                  return order.status
                } else return "Admin unassigned"
              } else {
                return "Admin unassigned"
              }
            } else return order.status
          }
      }
    }
    return "Admin unassigned"
  }

  const editOrders = (item) => {
    setCourseOrderId(item.courseid)
    setCurrency(item.currency)
    setPrice(item.price)
    getOrderList(item.courseid,item.expiryduration);
  }

  const UpdateList = (item, status) => {
    const user = userList.find(user => user.userId === item.userId)
    var index = userList.indexOf(user)
    userList[index]['status'] = status
    setUserList(userList.map(a => ({...a})))
  }

  const OrderActive = (item, status) => {
    // userid, status, ordertype, productid, currency, price, updatedby,updatedtime
    setUserLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/user/order/create',
      method: 'post',
      data: {
        userid: item.userId,
        status: status,
        ordertype: "Course",
        productid: courseOrderId,
        currency: currency,
        price: price.toString(),
        updatedby: adminid.toString(),
        updatedtime: Date.now().toString()
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      setToastClass('success');
      setToastMessage('Success: ' + response.data);
      showToast(true);
      UpdateList(item,status)
      setUserLoading(false)
    })
    .catch(function (error) {
      setToastClass('Warning');
      setToastMessage('Warning: ' + error.response.data);
      showToast(true);
      setUserLoading(false)
    });
  }


  return (
    <div className="animated fadeIn">
      <CRow>
        <CCol xl="6">
          <CCard custom>
            <CCardHeader >
              Courses
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={courseList}
                fields={fields}
                // columnFilter
                tableFilter
                // footer
                itemsPerPageSelect={false}
                itemsPerPage={currentCoursePagination}
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
                  setCurrentCoursePage(val)
                }
                }
                // onPagesChange={(val) => console.log('new pages:', val)}
                onPaginationChange={(val) => {
                  setCurrentCoursePagination(val);
                }}
                // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
                // onSorterValueChange={(val) => console.log('new sorter value:', val)}
                // onTableFilterChange={(val) => console.log('new table filter:', val)}
                // onColumnFilterChange={(val) => console.log('new column filter:', val)}
                scopedSlots={{
                  'price':
                    item => {
                      return (
                        <td>
                          {
                            item.price + " " + courseList.find(pCourse => pCourse.courseid === item.courseid).currency
                          }
                        </td>
                      )
                  },
                  'expiryduration':
                    item => {
                      return (
                        <td>
                          {
                            item.expiryduration + " months"
                          }
                        </td>
                      )
                  },
                  'actions':
                    item => {
                      return (
                        <td className="py-2">
                          {
                              courseOrderId != item.courseid ?
                              <CButton size="sm" color="info" onClick={(e) => { e.preventDefault(); editOrders(item) }}>Order</CButton>
                              : <CButton size="sm" color="info" disabled>Order</CButton>
                          }
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
                      onChange={e => setCurrentCoursePagination(e.target.value)}
                      value={currentCoursePagination}>
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
                     ((currentCoursePage - 1) * currentCoursePagination + 1) + '-' + getLastVal_Course(currentCoursePage) + ' of ' + courseList.length
                    }
                    </spin>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xl="6">
          <CCard custom>
            <CCardHeader >
              User Orders {courseOrderId !== -1 ? '( '+ courseList.find(pCourse=>pCourse.courseid === courseOrderId).coursename+ ' )' : ''}
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={userList}
                fields={fields_users}
                // columnFilter
                tableFilter
                // footer
                itemsPerPageSelect={false}
                itemsPerPage={currentUserPagination}
                dark={false}
                hover={false}
                border={false}
                outlined={false}
                sorter={false}
                // clickableRows
                pagination={{ doubleArrows: true, align: 'center' }}
                loading={userloading}
                // onRowClick={(item,index,col,e) => {console.log(item,index,col,e)}}
                onPageChange={(val) => {
                  setCurrentUserPage(val)
                }
                }
                // onPagesChange={(val) => console.log('new pages:', val)}
                onPaginationChange={(val) => {
                  setCurrentUserPagination(val);
                }}
                // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
                // onSorterValueChange={(val) => console.log('new sorter value:', val)}
                // onTableFilterChange={(val) => console.log('new table filter:', val)}
                // onColumnFilterChange={(val) => console.log('new column filter:', val)}
                scopedSlots={{
                  'email':
                    item => {
                      return (
                        <td>
                          {
                            item.email
                          }
                        </td>
                      )
                  },
                  'status':
                    item => {
                      return (
                        <td>
                          {
                            // getOrderStatus(item)
                            item.status
                          }
                        </td>
                      )
                  },
                  'actions':
                    item => {
                      return (
                        <td className="py-2">
                          {
                              item.status == 'Admin unassigned' || item.status == 'Expired' ?
                                <CButton size="sm" color="primary" onClick={(e) => { e.preventDefault(); OrderActive(item, "Admin assigned");}}>&nbsp;Active&nbsp;</CButton>
                              :
                                item.status == 'Purchased'?
                                  <CButton size="sm" color="danger" disabled>InActive</CButton>
                                :<CButton size="sm" color="danger" onClick={(e) => { e.preventDefault(); OrderActive(item, "Admin unassigned");}}>InActive</CButton>
                          }
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
                      onChange={e => setCurrentUserPagination(e.target.value)}
                      value={currentUserPagination}>
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
                      ((currentUserPage - 1) * currentUserPagination + 1) + '-' + getLastVal_User(currentUserPage) + ' of ' + userList.length
                    }
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
            }}>
            <Alert
              severity={toastClass}
              action={
                <CButton  onClick={(e) => { e.preventDefault(); showToast(false);  }}><CIcon name="cil-x" /></CButton>
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
