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

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


import CIcon from '@coreui/icons-react'
import axios from 'axios';
import Config from '../../common/Config'

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}


export default function Payments() {
  const { useState } = React;

  const [currentPage, setCurrentPage] = useState(1)
  const [currentPagination, setCurrentPagination] = useState(5)
  const getLastVal = (currentPage) => {
    if (currentPage * currentPagination < paymentList.length)
      return currentPage * currentPagination;
    return paymentList.length;
  }

  // paymentid(S),  orderitemid(S),  useremail(S),  courseid(S),   chargeid(S),  is_refunded(N),  updatedby(S), updatedtime(S)
  // refundid(S), paymentid(S), amount(S),  updatedby(S),  updatedtime(S)
  const fields = [
    { key: 'useremail', label:'User Email', _style: { width: '15%' } },
    { key: 'coursename', label:'Course Name', _style: { width: '20%' } },
    { key: 'amount', label:'Amount', _style: { width: '10%' } },
    { key: 'paymenttime', label:'Payment Time', _style: { width: '20%' } },
    { key: 'refundtime', label:'Refund Time', _style: { width: '20%' } },
    { key: 'adminemail', label:'Admin Email', _style: { width: '15%' } },
  ]

  const [adminid, setAdminId] = React.useState("adminid")

  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');

  const [isLoading, setIsLoading] = React.useState(false);
  const [paymentList, setPaymentList] = React.useState([])
  const [courseList, setCourseList] = React.useState([])
  const [refundList, setRefundList] = React.useState([])

  React.useEffect(() => {
    getCourseList();
  }, []);

  const getPaymentList = async (courselist, refundlist) => {
    setIsLoading(true)

    axios({
      url: process.env.REACT_APP_AWS_API_ENDPOINT + '/admin/payment/list',
      method: 'get'
    }).then(response => response.data).then((data) => {
      const list = data.sort((a, b) => a.updatedtime > b.updatedtime ? -1 : 1) //Descending
      console.log(list)

      for(var i=0;i<list.length;i++) {
        const course  = courselist.find(course => course.courseid === list[i].courseid)
        if(course) {
          list[i]['coursename'] = course.coursename
          list[i]['amount'] = course.price + " " + course.currency
        }
        list[i]['paymenttime'] =  getDateTimeString(list[i].updatedtime)

        list[i]['refundtime'] = ''
        list[i]['adminemail'] = ''
        if(list[i].is_refunded == 1) {
          const refund = refundlist.find(refund=>refund.paymentid===list[i].paymentid)
          if(refund) {
            list[i]['refundtime'] = getDateTimeString( refund.updatedtime)
            list[i]['adminemail'] = refund.adminemail
          }
        }
      }
      setPaymentList(list);
      setIsLoading(false)

    }).catch(error => {
      setIsLoading(false)
    });
  };

  const getRefundList = async (courselist) => {
    setIsLoading(true)
    const list = await axios({
      url: process.env.REACT_APP_AWS_API_ENDPOINT + '/admin/refund/list',
      method: 'get'
    }).then(response => response.data).then((data) => {
      const list = data.sort((a, b) => a.updatedtime > b.updatedtime ? 1 : -1)
      console.log(list)

      setIsLoading(false)
      return list
    }).catch(error => {
      setIsLoading(false)
    });

    setRefundList(list);
    getPaymentList(courselist, list);
  };

  const getCourseList = async () => {
    setIsLoading(true)
    const list = await axios({
      url: Config.BACKEND_API_URL+'/admin/course/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.updatedtime > b.updatedtime ? 1 : -1)
      console.log(list)
      setIsLoading(false)
      return list;
    })
    .catch(function (error) {
      console.log(error.response)
      setIsLoading(false)
     });

     setCourseList(list);
     getRefundList(list);
  };

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
                loading={isLoading}
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
