import React, { Component, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow, CDataTable, CForm, CFormGroup, CFormText, CLink, CInput, CLabel, CSelect,CSpinner,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputFile
} from '@coreui/react';

import { useSelector } from 'react-redux';
import { NavLink as RouterLink, Route, useHistory } from "react-router-dom";

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import S3 from "react-aws-s3";

import CIcon from '@coreui/icons-react'
import axios from 'axios';
import Config from '../../common/Config'

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function Courses() {
  const { useState } = React;
  const history = useHistory();
  // const loginUser = useSelector(state => state.loginUser);
  const [loginUser, setLoginUser] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [currentPagination, setCurrentPagination] = useState(5)
  const getLastVal = (currentPage) => {
    if (currentPage * currentPagination < courseList.length)
      return currentPage * currentPagination;
    return courseList.length;
  }
  const fields = [
    { key: 'coursename',label:'Title', _style: { width: '20%' } },
    { key: 'currency',label:'Currency', _style: { width: '10%' } },
    { key: 'price',label:'Price', _style: { width: '10%' } },
    { key: 'category',label:'Category', _style: { width: '20%' } },
    { key: 'expiryduration',label:'Expiry Duration', _style: { width: '20%' } },
    {
      key: 'actions',
      label: '',
      _style: { width: '15%' },
      sorter: false,
      filter: false
    },
  ]
  const fields_highlight = [
    { key: 'name',label:'Name', _style: { width: '20%' } },
    { key: 'content',label:'Content', _style: { width: '20%' } },
    {
      key: 'actions',
      label: '',
      _style: { width: '100px' },
      sorter: false,
      filter: false
    },
  ]

  const [adminid, setAdminId] = React.useState("adminid")
  const [isAddCourse, setIsAddCourse] = useState(true)
  const [editId, setEditId] = useState(-1)

  const [categoryList, setCategoryList] = React.useState([]);
  const [courseList, setCourseList] = React.useState([]);
  const [courseTitle, setCourseTitle] = React.useState('');
  const [currency, setCurrency] = React.useState('SGD');
  const [price, setPrice] = React.useState('');
  const [expiryduration, setExpiryDuration] = React.useState(1);
  const [highlightList, setHighlightList] = React.useState([]);
  const [highlightname, setHighlightName] = React.useState('');
  const [highlightcontent, setHighlightContent] = React.useState('');
  const [categoryid, setCategoryId] = React.useState(0);

  const [image, setImage] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [imageHeight, setImageHeight] = React.useState('0px');
  const [videoHeight, setVideoHeight] = React.useState('0px');
  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');
  const [loading, setLoading] = React.useState(false);

  const [imageLoading, setImageLoading] = React.useState(false);
  const [videoLoading, setVideoLoading] = React.useState(false);
  const [imageFile, setImageFile] = React.useState('');
  const [videoFile, setVideoFile] = React.useState('');
  const [imageClicked, setImageClicked] = React.useState(false);

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

    getCategoryList();
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

  const getCategoryList = async () => {
    setLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/category/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1)
      setCategoryList(list);
      console.log(list)
      setLoading(false)
      if(list.length > 0)
        setCategoryId(list[0].categoryid)
      getCourseList();
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });
  };

  function getCategoryName(item) {
    var cat = categoryList.find(pCat => pCat.categoryid === item.categoryid)
    if(cat) return cat.categoryname
    // const name = await axios({
    //   url: Config.BACKEND_API_URL+'/category/details/'+item.categoryid,
    //   method: 'get'
    // })
    // .then(function (response) {
    //   console.log(response.data)
    //   return response.data.categoryname
    // })
    // .catch(function (error) {
    //   console.log(error.response)
    //   return "unknown"
    //  });

     return "Deleted"
  };

  const getCourseList = async () => {
    console.log(process.env.REACT_APP_AWS_ASSETS_BUCKET)
    setLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/course/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1)
      setCourseList(list);
      console.log(list)
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });
  };

  const handleReset = () => {
    setCourseTitle('')
    setCurrency('SGD')
    setPrice('')
    setExpiryDuration(1)
    setHighlightList([])
    setHighlightName('')
    setHighlightContent('')
    if(categoryList.length > 0)
      setCategoryId(categoryList[0].categoryid)

    setImage(null);
    setVideo(null);
    setImageHeight('0px');
    setVideoHeight('0px');
    setImageFile('');
    setVideoFile('');

    setIsAddCourse(true)
    setEditId(-1)

    setImageClicked(false)
    setImage(null)
  }

  const editCourse = (item) => {

    setIsAddCourse(false)
    setEditId(item.courseid)
    setCourseTitle(item.coursename)

    if(categoryList.find(pCat => pCat.categoryid === item.categoryid))
      setCategoryId(item.categoryid)
    else if(categoryList.length > 0)
      setCategoryId(categoryList[0].categoryid)

    setCurrency(item.currency)
    setPrice(item.price)
    setExpiryDuration(parseInt(item.expiryduration))

    setHighlightName('')
    setHighlightContent('')

    var aa = JSON.parse(JSON.parse(item.highlights))
    setHighlightList(aa.map(a => ({...a}) ))

    setImageFile(item.coursephoto)
    // coursephoto
    setImageClicked(false);
    if(item.coursephoto !== "") {
      setImage(process.env.REACT_APP_AWS_BUCKET_CLOUDFRONT_URL + '/' + item.coursephoto)
    }
  }

  function deleteCourse(item) {
    setIsAddCourse(true)
    setEditId(-1)

    setLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/course/delete',
      method: 'delete',
      data: {
        courseid: item.courseid,
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

  function imageUpload(file) {

    let fileName = Date.now().toString();
    const config = {
      bucketName: process.env.REACT_APP_AWS_ASSETS_BUCKET,
      region: process.env.REACT_APP_AWS_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    };
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, fileName).then((data) => {
      if (data.status === 204) {
        setImageFile(data.key);
        setImageHeight("125px");
        setImageLoading(false);
      } else {
        console.log(data);
      }
    });
  };

  function setThumbnail(event) {
    event.preventDefault();
    setImageClicked(false);

    setImageLoading(true);
    let file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    imageUpload(file);
  };

  function setVideoThumbnail(event) {
    event.preventDefault();
    setVideoLoading(true);
    let file = event.target.files[0];
    setVideo(URL.createObjectURL(file));
    videoUpload(file);
  };

  function videoUpload(file) {
    let fileName = Date.now().toString();
    const config = {
      bucketName: process.env.REACT_APP_AWS_ASSETS_BUCKET,
      region: process.env.REACT_APP_AWS_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    };
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, fileName).then((data) => {
      if (data.status === 204) {
        setVideoFile(data.key);
        setVideoHeight("125px");
        setVideoLoading(false);
      } else {
        console.log(data);
      }
    });
  };

  function deleteHighlight(item) {
    const highlight = highlightList.find(highlight => highlight.name === item.name)
    var index = highlightList.indexOf(highlight)
    if (index !== -1) {
      highlightList.splice(index, 1);
    }
    setHighlightList(highlightList.map(a => ({...a})))
  }

  const handleHighlightSubmit = (event) => {
    event.preventDefault();
    if(highlightname === '' || highlightcontent === '') return;
    highlightList.push({name:highlightname, content:highlightcontent})
    setHighlightList(highlightList.map(a => ({...a})))
    setHighlightName('')
    setHighlightContent('')
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    if(imageFile === '')
    {
      setToastClass('Warning');
      setToastMessage('Warning: Image field is missing');
      showToast(true);
      return;
    }
    if(courseTitle === '' || currency === '' || price.toString() === '' || expiryduration.toString() === '' || imageFile === '')
      return;

    setLoading(true)
    const formData = new FormData();
    formData.append('file', image);
    console.log("categoryid:" + categoryid)
    console.log(courseTitle+ " " + currency + " " +  price + " " + expiryduration)
    console.log(imageFile);
    console.log(JSON.stringify(highlightList))

    if(editId === -1) {
      axios({
        url: Config.BACKEND_API_URL+'/admin/course/create',
        method: 'post',
        data: {
          categoryid: categoryid,
          coursename: courseTitle,
          currency: currency,
          price: price.toString(),
          expiryduration: expiryduration.toString(),
          coursephoto:imageFile,
          highlights:JSON.stringify(highlightList),
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

        setLoading(false)
        handleReset()
      })
      .catch(function (error) {
        setToastClass('Warning');
        setToastMessage('Warning: ' + error.response.data);
        showToast(true);

        setLoading(false)
      });
    } else {
      axios({
        url: Config.BACKEND_API_URL+'/admin/course/create',
        method: 'post',
        data: {
          courseid:editId,
          categoryid: categoryid,
          coursename: courseTitle,
          currency: currency,
          price: price.toString(),
          expiryduration: expiryduration.toString(),
          coursephoto:imageFile,
          highlights:JSON.stringify(highlightList),
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

  // const Sections  = React.lazy(() => import('./Sections'));


  return (
    <div className="animated fadeIn">
      <CRow>
        <CCol xl="12">
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
                  'coursename':
                    (item) => (
                      <td>
                        <CLink  to={`/modules/admin/courses/${item.courseid}`}>{item.coursename}</CLink>
                      </td>
                    ),
                  'category':
                    item => {
                      return (
                        <td>
                          {
                            getCategoryName(item)
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
                        <td className="py-2" style={{display:'flex',justifyContent: 'flex-end',textAlign:'right'}}>
                          {
                              editId != item.courseid ?
                              <CButton size="sm" color="info" onClick={(e) => { e.preventDefault(); editCourse(item) }}>Edit</CButton>
                              : <CButton size="sm" color="info" disabled>Edit</CButton>
                          }
                          <CButton size="sm" color="danger" className="ml-1" onClick={(e) => { e.preventDefault(); deleteCourse(item) }}>
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
                      ((currentPage - 1) * currentPagination + 1) + '-' + getLastVal(currentPage) + ' of ' + courseList.length
                    }
                    </spin>
                  </div>
                </CCol>
              </CRow>

            </CCardBody>
          </CCard>
        </CCol>

        <CCol xl="12">
          <CCard custom>
            <CCardHeader >
              {
                isAddCourse ? 'Add Course' : 'Edit Course'
              }
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} className="form-horizontal" name='simpleForm'>
                <CRow>
                  <CCol xl="6">
                    <CInputGroup className="mb-2">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text"
                          label="Course Title"
                          name="coursetitle-input"
                          id="coursetitle-input"
                          placeholder="Course Title"
                          autoComplete="given-name"
                          onChange={e => setCourseTitle(e.target.value)}
                          value={courseTitle}
                          required />
                    </CInputGroup>
                    <CInputGroup className="mb-2">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CSelect
                          custom name="category"
                          label="Category"
                          id="category"
                          onChange={e => setCategoryId(e.target.value)}
                          value={categoryid}
                        >
                        {categoryList.map((category) => (
                          <option value={category.categoryid}>{category.categoryname}</option>
                        ))}
                      </CSelect>
                    </CInputGroup>
                    <CRow>
                      <CCol  md={4}>
                        <CInputGroup className="mb-2">
                          <CInputGroupPrepend>
                            <CInputGroupText>@</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text"
                              label="Currency"
                              name="currency-input"
                              id="currency-input"
                              placeholder="Currency"
                              autoComplete="given-name"
                              onChange={e => setCurrency(e.target.value)}
                              value={currency}
                              required />
                        </CInputGroup>
                      </CCol>
                      <CCol  md={4}>
                        <CInputGroup className="mb-2">
                          <CInputGroupPrepend>
                            <CInputGroupText>@</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="number"
                              label="Price"
                              name="price-input"
                              id="price-input"
                              placeholder="Price"
                              autoComplete="given-name"
                              onChange={e => setPrice(e.target.value)}
                              value={price}
                              required />
                        </CInputGroup>
                      </CCol>
                      <CCol  md={4}>
                        <CInputGroup className="mb-2">
                          <CInputGroupPrepend>
                            <CInputGroupText>@</CInputGroupText>
                          </CInputGroupPrepend>
                          {/* <CInput type="number"
                              label="Expiry Duration"
                              name="expiryduration-input"
                              id="expiryduration-input"
                              placeholder="Expiry Duration"
                              autoComplete="given-name"
                              onChange={e => setExpiryDuration(e.target.value)}
                              value={expiryduration}
                              required /> */}
                          <CSelect
                            name="itemsperpage"
                            id="itemsperpage"
                            style={{width:"70px"}}
                            onChange={e => setExpiryDuration(e.target.value)}
                            value={expiryduration}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                          </CSelect>
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="7" xl="6" md="6">
                        <Button class='btn btn-primary btn-sm' variant="contained" component="label">
                          <PhotoLibraryIcon /> &nbsp; Upload Image
                          <input type="file" accept="image/*" style={{display:"none"}} onChange={setThumbnail}/>
                        </Button>
                        <Fade in={imageLoading}><CSpinner grow color="primary" style={{marginLeft:10,marginTop:5, width:20,height:20}}/></Fade>
                      </CCol>
                      <CCol  xs="5" xl="6" md="6">
                       <span style={{cursor:"pointer", color:"#321fdb"}} onClick={(e)=>{e.preventDefault(); setImageClicked(true)}}>{imageFile}</span>
                      </CCol>
                    </CRow>
                    {
                      imageClicked && image != null?
                        <CRow>
                          <CCol xs="12" md="6">
                            <CCardBody
                              style={{backgroundImage:`url(${image})`,height:'125px',backgroundRepeat:'no-repeat',backgroundPosition: 'center',backgroundSize: 'cover',marginTop:0}}>
                            </CCardBody>
                          </CCol>
                        </CRow>
                      :""
                    }
                  </CCol>
                  <CCol xl="6">
                      <CInputGroup className="mb-2">
                        <CInputGroupPrepend>
                          <CInputGroupText>@</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text"
                            label="Highlight Name"
                            name="highlight-input"
                            id="highlight-input"
                            placeholder="Highlight Name"
                            autoComplete="given-name"
                            onChange={e => setHighlightName(e.target.value)}
                            value={highlightname}
                            />
                      </CInputGroup>
                      <CInputGroup className="mb-2">
                        <CInputGroupPrepend>
                          <CInputGroupText>@</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text"
                            label="Highlight Content"
                            name="highlightcontent-input"
                            id="highlightcontent-input"
                            placeholder="Highlight Content"
                            autoComplete="given-name"
                            onChange={e => setHighlightContent(e.target.value)}
                            value={highlightcontent}
                            />
                      </CInputGroup>
                      <CButton size="sm" color="primary" onClick={handleHighlightSubmit}><CIcon name="cil-plus" /> ADD</CButton>
                      <CDataTable
                        items={highlightList}
                        fields={fields_highlight}
                        size="sm"
                        striped
                        itemsPerPage={5}
                        pagination={{ doubleArrows: true, align: 'center' }}
                        loading={loading}
                        scopedSlots={{
                          'actions':
                            item => {
                              return (
                                <td className="py-2" style={{display:'flex',justifyContent: 'flex-end',textAlign:'right'}}>
                                  <CButton size="sm" color="danger" className="ml-1" onClick={(e) => { e.preventDefault(); deleteHighlight(item) }}>
                                    Delete
                                  </CButton>
                                </td>
                              )
                            }
                        }}
                        style={{height:10}}
                      />
                  </CCol>
                </CRow>
                <hr/>
                <div style={{width:"150px"}}>
                  <CButton type="submit" size="sm" color="primary" style={{marginRight:'10px'}}><CIcon name="cil-save" /> Save</CButton>
                  <CButton type="reset"  size="sm" color="danger" onClick={handleReset} ><CIcon name="cil-ban" /> Reset</CButton>
                </div>

              </CForm>
            </CCardBody>
            {/* <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={handleSubmit}><CIcon name="cil-save" /> Save</CButton>
              <CButton type="reset"  size="sm" color="danger" onClick={handleReset} ><CIcon name="cil-ban" /> Reset</CButton>
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
            }}
          >
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
