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

export default function Categories() {
  const { useState } = React;
  const history = useHistory();
  // const loginUser = useSelector(state => state.loginUser);
  const [loginUser, setLoginUser] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [currentPagination, setCurrentPagination] = useState(5)
  const getLastVal = (currentPage) => {
    if (currentPage * currentPagination < categoryList.length)
      return currentPage * currentPagination;
    return categoryList.length;
  }
  const fields = [
    { key: 'categoryname', label:'Category Name', _style: { width: '70%' } },
    {
      key: 'actions',
      label: '',
      _style: { width: '100px' },
      sorter: false,
      filter: false
    },
  ]

  const [adminid, setAdminId] = React.useState("adminid")

  const [isAddCategory, setIsAddCategory] = useState(true)
  const [editId, setEditId] = useState(-1)

  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');

  const [isLoading, setIsLoading] = React.useState(false);
  const [categoryList, setCategoryList] = React.useState([])
  const [categoryName, setCategoryName] = React.useState('');

  React.useEffect(() => {
    if(localStorage.getItem('loginUser')) {
      var loginUser = JSON.parse(localStorage.getItem('loginUser'))
      setLoginUser(loginUser)
      console.log('loginUser2 ===> ' + JSON.stringify(loginUser));
      setAdminId(loginUser.userId)
      if(loginUser.userrole !== 'Admin') {
        history.push('/');
      }
    } else {
      history.push('/auth/login-page');
    }

    // if(loginUser) {
    //   console.log(loginUser)
    //   setAdminId(loginUser.userId)
    //   // getUser(loginUser.email)
    // }
    getCategoryList();
  }, []);

  const getUser = async (email) => {
    setIsLoading(true)
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
      setIsLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
      setIsLoading(false)
     });

  };

  const getCategoryList = async () => {
    setIsLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/category/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1)
      setCategoryList(list);
      console.log(list)
      setIsLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
      // error.response.data
      setIsLoading(false)
     });

  };

  const deleteCategory = (item) => {
    // console.log(item)
    // categoryid, deletedby, deletedtime
    // handleReset()
    setIsAddCategory(true)
    setEditId(-1)

    setIsLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/category/delete',
      method: 'delete',
      data: {
        categoryid: item.categoryid,
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
      setIsLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
      // error.response.data
      setIsLoading(false)
     });
  }

  const editCategory = (item) => {
    // document.getElementById('categoryname-input').value = item.categoryname;
    setIsAddCategory(false)
    setEditId(item.categoryid)
    setCategoryName(item.categoryname)
  }

  const handleReset = () => {
    setCategoryName('')
    setIsAddCategory(true)
    setEditId(-1)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true)
    if(editId === -1) {
      axios({
        url: Config.BACKEND_API_URL+'/admin/category/create',
        method: 'post',
        data: {
          categoryname: categoryName,
          createdby: adminid,
          createdtime: Date.now().toString()
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        setToastClass('success');
        setToastMessage('Success: ' + response.data);
        showToast(true);

        setCategoryName('');
        setIsLoading(false)
        handleReset()
      })
      .catch(function (error) {
        console.log(error.response)
        setToastClass('Warning');
        setToastMessage('Warning: ' + error.response.data);
        showToast(true);

        setIsLoading(false)
      });
    } else {
      axios({
        url: Config.BACKEND_API_URL+'/admin/category/create',
        method: 'post',
        data: {
          categoryid:editId,
          categoryname: categoryName,
          updatedby:adminid,
          updatedtime:Date.now().toString()
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        setToastClass('success');
        setToastMessage('Success: ' + response.data);
        showToast(true);

        setCategoryName('');
        setIsLoading(false)
        handleReset()
      })
      .catch(function (error) {
        console.log(error.response)
        setToastClass('Warning');
        setToastMessage('Warning: ' + error.response.data);
        showToast(true);

        setIsLoading(false)
      });
    }
  }

  return (
    <div className="animated fadeIn">
      <CRow>
        <CCol xl="6">
          <CCard custom>
            <CCardHeader >
              Categories
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={categoryList}
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
                  'actions':
                    item => {
                      return (
                        <td className="py-2" style={{display:'flex',justifyContent: 'flex-end',textAlign:'right'}}>
                          {
                              editId != item.categoryid ?
                              <CButton size="sm" color="info" onClick={(e) => { e.preventDefault(); editCategory(item) }}>Edit</CButton>
                              : <CButton size="sm" color="info" disabled>Edit</CButton>
                          }
                          <CButton size="sm" color="danger" className="ml-1" onClick={(e) => { e.preventDefault(); deleteCategory(item) }}>
                            Delete
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
                     ((currentPage - 1) * currentPagination + 1) + '-' + getLastVal(currentPage) + ' of ' + categoryList.length
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
            <CCardHeader id="headingOne" style={{ display: 'inline-flex' }}>
              {
                  isAddCategory ? 'Add Category' : 'Edit Category'
              }
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} className="form-horizontal" name='simpleForm'>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>@</CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="text"
                      label="Category Name"
                      name="categoryname-input"
                      id="categoryname-input"
                      placeholder="Category Name"
                      autoComplete="given-name"
                      onChange={e => setCategoryName(e.target.value) }
                      value={categoryName}
                      required />
                </CInputGroup>
                <hr/>
                <div style={{width:"150px"}}>
                  <CButton type="submit" size="sm" color="primary" style={{marginRight:'10px'}} ><CIcon name="cil-save" /> Save</CButton>
                  <CButton type="reset"  size="sm" color="danger" onClick={handleReset} ><CIcon name="cil-ban" /> Reset</CButton>
                </div>
              </CForm>
            </CCardBody>
            {/* <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={handleSubmit}><CIcon name="cil-save" /> Save</CButton>
            </CCardFooter> */}
          </CCard>
        </CCol>
        <CCol sm="12" lg="6">
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={toast}
            autoHideDuration={3000}
            onClose={() => {
              showToast(false);
              toast ? getCategoryList() : showToast(false);
            }}>
            <Alert
              severity={toastClass}
              action={
                <CButton  onClick={(e) => { e.preventDefault(); showToast(false); getCategoryList();  }}><CIcon name="cil-x" /></CButton>
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
