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

export default function Sections(props) {
  const { useState } = React;
  const history = useHistory();
  // const loginUser = useSelector(state => state.loginUser);
  const [loginUser, setLoginUser] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [currentPagination, setCurrentPagination] = useState(5)
  const getLastVal = (currentPage) => {
    if (currentPage * currentPagination < sectionList.length)
      return currentPage * currentPagination;
    return sectionList.length;
  }
  const fields = [
    { key: 'sectionname', label:'Section Name', _style: { width: '70%' } },
    {
      key: 'actions',
      label: '',
      _style: { width: '100px' },
      sorter: false,
      filter: false
    },
  ]

  const [adminid, setAdminId] = React.useState("adminid")

  const [isAddSection, setIsAddSection] = useState(true)
  const [editId, setEditId] = useState(-1)

  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');

  const [loading, setLoading] = React.useState(false);
  const [course, setCourse] = React.useState({})
  const [sectionList, setSectionList] = React.useState([])
  const [sectionName, setSectionName] = React.useState('');
  // sectionid(S),  courseid(S),  sectionname(S),  createdby(S), createdtime(S),   updatedby(S),  updatedtime(S) , deletedby(S), deletedtime(S)
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
    console.log(process.env.REACT_APP_AWS_ASSETS_BUCKET)
    setLoading(true)
    const cList = await axios({
      url: Config.BACKEND_API_URL+'/admin/course/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1) //Ascending
      console.log(list)
      setLoading(false)
      return list
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });

     if(cList) {
      const cc = cList.find( course => course.courseid === props.match.params.id)
      setCourse(cc)
     }
     getSectionList();
  };

  const getSectionList = async () => {

    setLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/section/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1) //Ascending
      console.log(list)
      setSectionList(list.filter(section => section.courseid === props.match.params.id));
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });
  };

  const deleteSection = (item) => {
    // console.log(item)
    setIsAddSection(true)
    setEditId(-1)

    setLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/section/delete',
      method: 'delete',
      data: {
        sectionid: item.sectionid,
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

  const editSection = (item) => {
    setIsAddSection(false)
    setEditId(item.sectionid)
    setSectionName(item.sectionname)
  }

  const handleReset = () => {
    setSectionName('')
    setIsAddSection(true)
    setEditId(-1)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    if(editId === -1) {
      axios({
        url: Config.BACKEND_API_URL+'/admin/section/create',
        method: 'post',
        data: {
          courseid:props.match.params.id,
          sectionname: sectionName,
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

        setSectionName('');
        setLoading(false)
        handleReset()
      })
      .catch(function (error) {
        console.log(error.response)
        setToastClass('Warning');
        setToastMessage('Warning: ' + error.response.data);
        showToast(true);

        setLoading(false)
      });
    } else {
      axios({
        url: Config.BACKEND_API_URL+'/admin/section/create',
        method: 'post',
        data: {
          sectionid:editId,
          courseid:props.match.params.id,
          sectionname: sectionName,
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

        setSectionName('');
        setLoading(false)
        handleReset()
      })
      .catch(function (error) {
        console.log(error.response)
        setToastClass('Warning');
        setToastMessage('Warning: ' + error.response.data);
        showToast(true);

        setLoading(false)
      });
    }
  }

  return (
    <div className="animated fadeIn">
      <CRow>
        <CCol xl="6">
          <CCard custom>
            <CCardHeader >
              <h5 >Sections </h5> {course ? '( Course: '+ course.coursename+ ')' : ''}
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={sectionList}
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
                  console.log('new page:', val);
                  setCurrentPage(val)
                }
                }
                // onPagesChange={(val) => console.log('new pages:', val)}
                onPaginationChange={(val) => {
                  console.log('new pagination:', val);
                  setCurrentPagination(val);
                }}
                // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
                // onSorterValueChange={(val) => console.log('new sorter value:', val)}
                // onTableFilterChange={(val) => console.log('new table filter:', val)}
                // onColumnFilterChange={(val) => console.log('new column filter:', val)}
                scopedSlots={{
                  'sectionname':
                  (item) => (
                    <td>
                      <CLink  to={`/modules/admin/courses/${props.match.params.id}/${item.sectionid}`}>{item.sectionname}</CLink>
                    </td>
                  ),
                  'actions':
                    item => {
                      return (
                        <td className="py-2"  style={{display:'flex',justifyContent: 'flex-end',textAlign:'right'}}>
                          {
                              editId != item.sectionid ?
                              <CButton size="sm" color="info" onClick={(e) => { e.preventDefault(); editSection(item) }}>Edit</CButton>
                              : <CButton size="sm" color="info" disabled>Edit</CButton>
                          }
                          <CButton size="sm" color="danger" className="ml-1" onClick={(e) => { e.preventDefault(); deleteSection(item) }}>
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
                     ((currentPage - 1) * currentPagination + 1) + '-' + getLastVal(currentPage) + ' of ' + sectionList.length
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
                  isAddSection ? 'Add Section' : 'Edit Section'
              }
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} className="form-horizontal" name='simpleForm'>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>@</CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="text"
                      label="Section Name"
                      name="sectionname-input"
                      id="sectionname-input"
                      placeholder="Section Name"
                      autoComplete="given-name"
                      onChange={e => setSectionName(e.target.value) }
                      value={sectionName}
                      required />
                </CInputGroup>
                <hr/>
                <div style={{width:"150px"}}>
                  <CButton type="submit" size="sm" color="primary" style={{marginRight:'10px'}}><CIcon name="cil-save" /> Save</CButton>
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
              toast ? getSectionList() : showToast(false);
            }}>
            <Alert
              severity={toastClass}
              action={
                <CButton  onClick={(e) => { e.preventDefault(); showToast(false); getSectionList();  }}><CIcon name="cil-x" /></CButton>
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
