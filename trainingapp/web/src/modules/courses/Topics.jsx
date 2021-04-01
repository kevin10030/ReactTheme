import React, { Component, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow, CDataTable, CForm, CFormGroup, CFormText, CLink, CInput, CLabel, CSelect,CSpinner,
  CInputFile,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CTextarea
} from '@coreui/react';

import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'

import { useSelector } from 'react-redux';
import { NavLink as RouterLink, Route, useHistory } from "react-router-dom";

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AttachFile from '@material-ui/icons/AttachFile';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import Fade from '@material-ui/core/Fade';

import ReactPlayer from 'react-player';
import S3 from "react-aws-s3";
import AWS from 'aws-sdk'

import CIcon from '@coreui/icons-react'
import axios from 'axios';
import Config from '../../common/Config'

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function Topics(props) {
  const { useState } = React;
  const history = useHistory();

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']                                         // remove formatting button
    ]
  }

  // const loginUser = useSelector(state => state.loginUser);
  const [loginUser, setLoginUser] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [currentPagination, setCurrentPagination] = useState(5)
  const getLastVal = (currentPage) => {
    if (currentPage * currentPagination < topicList.length)
      return currentPage * currentPagination;
    return topicList.length;
  }
  const fields = [
    { key: 'topicname', label:'Topic Name', _style: { width: '70%' } },
    {
      key: 'actions',
      label: '',
      _style: { width: '100px' },
      sorter: false,
      filter: false
    },
  ]

  const [adminid, setAdminId] = React.useState("adminid")

  const [isAdd, setIsAdd] = useState(true)
  const [editId, setEditId] = useState(-1)

  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');

  const [video, setVideo] = React.useState(null);
  const [videoHeight, setVideoHeight] = React.useState('0px');

  const [loading, setLoading] = React.useState(false);
  const [section, setSection] = React.useState({})
  const [topicList, setTopicList] = React.useState([])

  const [videoLoading, setVideoLoading] = React.useState(false);
  const [fileLoading, setFileLoading] = React.useState(false);
  const [topicName, setTopicName] = React.useState('');
  const [content, setContent] = React.useState('');
  const [videoFile, setVideoFile] = React.useState('');
  const [uploadedFile, setUploadedFile] = React.useState('');

  const [videoClicked, setVideoClicked] = React.useState(false);

  //topicid(S),  sectionid(S),  topicname(S),  videofile(S),  content(S),  uploadedfile(S), createdby(S), createdtime(S),  updatedby(S),  updatedtime(S) ,  deletedby(S),deletedtime(S)
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

    getSectionList();
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

  const getSectionList = async () => {
    console.log(process.env.REACT_APP_AWS_ASSETS_BUCKET)
    setLoading(true)
    const cList = await axios({
      url: Config.BACKEND_API_URL+'/admin/section/list',
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
      const cc = cList.find( section => section.sectionid === props.match.params.id)
      setSection(cc)
     }
     getTopicList();
  };

  const getTopicList = async () => {

    setLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/topic/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1) //Ascending
      console.log(list)
      setTopicList(list.filter(topic => topic.sectionid === props.match.params.id));
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });
  };

  const deleteTopic = (item) => {
    // console.log(item)
    setIsAdd(true)
    setEditId(-1)

    setLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/topic/delete',
      method: 'delete',
      data: {
        topicid: item.topicid.toString(),
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

  const editTopic = (item) => {
    setIsAdd(false)
    setEditId(item.topicid)

    setTopicName(item.topicname)
    if(item.videofile === "null") setVideoFile('')
    else setVideoFile(item.videofile)
    if(item.content === "null") setContent('')
    else setContent(item.content)
    if(item.uploadedfile === "null") setUploadedFile('')
    else setUploadedFile(item.uploadedfile)

    setVideoClicked(false);
    if(item.videofile !== "null") {
      setVideo(process.env.REACT_APP_AWS_BUCKET_CLOUDFRONT_URL + '/' + item.videofile)
    }

  }

  const handleReset = () => {
    setTopicName('')
    setVideoFile('')
    setContent('')
    console.log("uploadedfile:"+ uploadedFile)
    setUploadedFile('')

    setVideoClicked(false)
    setVideo(null)

    setIsAdd(true)
    setEditId(-1)
  }

  function setFileThumbnail(event) {
    event.preventDefault();
    setFileLoading(true);
    console.log(event)
    let file = event.target.files[0];
    // setUploadedFile(URL.createObjectURL(file));
    console.log("setFiieThumbnail:" + file)
    // console.log(URL.createObjectURL(file))
    fileUpload(file);
  };

  function fileUpload(file) {
    const fileExtension = file.name.split('.').pop()
    const fileName = `${Date.now().toString()}.${fileExtension}`

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    })

    const myBucket = new AWS.S3({
      params: { Bucket: process.env.REACT_APP_AWS_ASSETS_BUCKET},
      region: process.env.REACT_APP_AWS_REGION,
    })
    console.log(fileName +" "+file.type)
    const params = {
      ACL: 'public-read',
      Key: fileName,
      ContentType: file.type,
      Body: file,
    }

    myBucket.putObject(params)
    .on('httpUploadProgress', (evt) => {
      if(Math.round((evt.loaded / evt.total) * 100) >= 100) {
        setUploadedFile(fileName);
        setFileLoading(false);
      }
    })
    .send((err) => {
       if (err) {
         // handle the error here
         console.log(err);
       }
    })

    // const config = {
    //   bucketName: process.env.REACT_APP_AWS_ASSETS_BUCKET,
    //   region: process.env.REACT_APP_AWS_REGION,
    //   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    //   secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    // };
    // const ReactS3Client = new S3(config);
    // ReactS3Client.uploadFile(file, fileName).then((data) => {
    //   console.log(fileName)
    //   console.log(data)
    //   if (data.status === 204) {
    //     setUploadedFile(data.key);
    //     setFileLoading(false);
    //   } else {
    //     console.log(data);
    //   }
    // });
  };

  function setVideoThumbnail(event) {
    event.preventDefault();
    setVideoClicked(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    if(editId === -1) {
      axios({
        url: Config.BACKEND_API_URL+'/admin/topic/create',
        method: 'post',
        data: {
          sectionid:props.match.params.id,
          topicname: topicName,
          createdby: adminid,
          videofile:videoFile,
          content:content,
          uploadedfile:uploadedFile,
          createdby:adminid,
          createdtime:Date.now().toString()
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
    } else {
      console.log("topicid:"+editId)
      console.log("topicname:"+topicName)
      axios({
        url: Config.BACKEND_API_URL+'/admin/topic/create',
        method: 'post',
        data: {
          topicid:editId.toString(),
          sectionid:props.match.params.id,
          topicname: topicName,
          createdby: adminid,
          videofile:videoFile,
          content:content,
          uploadedfile:uploadedFile,
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

  return (
    <div className="animated fadeIn">
      <CRow>
        <CCol xl="6">
          <CCard custom>
            <CCardHeader >
              <h5 >Topics </h5> {section ? '( Section: '+ section.sectionname+ ')' : ''}
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={topicList}
                fields={fields}
                // columnFilter
                tableFilter
                // footer
                itemsPerPageSelect = {false}
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
                  'actions':
                    item => {
                      return (
                        <td className="py-2" style={{display:'flex',justifyContent: 'flex-end',textAlign:'right'}}>
                          {
                              editId != item.topicid ?
                              <CButton size="sm" color="info" onClick={(e) => { e.preventDefault(); editTopic(item) }}>Edit</CButton>
                              : <CButton size="sm" color="info" disabled>Edit</CButton>
                          }
                          <CButton size="sm" color="danger" className="ml-1" onClick={(e) => { e.preventDefault(); deleteTopic(item) }}>
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
                      ((currentPage - 1) * currentPagination + 1) + '-' + getLastVal(currentPage) + ' of ' + topicList.length
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
                  isAdd ? 'Add Topic' : 'Edit Topic'
              }
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} className="form-horizontal" name='simpleForm'>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>@</CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="text"
                      label="Topic Name"
                      name="topicname-input"
                      id="topicname-input"
                      placeholder="Topic Name"
                      autoComplete="given-name"
                      onChange={e => setTopicName(e.target.value) }
                      value={topicName}
                      required />
                </CInputGroup>
                {/* <CTextarea
                      name="content"
                      id="content"
                      rows="5"
                      placeholder="Contents"
                      onChange={e => setContent(e.target.value)}
                      required
                      value={content}
                      style={{marginBottom:10}}
                    /> */}
                {/* <CInputFile
                  id="file-input"
                  name="file-input"
                  onChange={setFileThumbnail}
                  value={uploadedFile}
                  style={{marginBottom:10}}
                /> */}    
                <ReactQuill name="content" id="content" placeholder="Contents"  value={content} modules={modules} onChange={setContent} style={{marginBottom:"10px"}} required/>                
                <style jsx>{`
                .ql-container {
                  height:200px
                }
                `
                }</style>
                <CRow>
                  <CCol xs="7" xl="6" md="6">
                    <Button class='btn btn-primary btn-sm' variant="contained" component="label">
                        <AttachFile /> &nbsp;Upload File
                        <input type="file" accept="*/*" style={{display:"none"}} onChange={setFileThumbnail}/>
                    </Button>
                    <Fade in={fileLoading}><CSpinner grow color="primary" style={{marginLeft:10,marginTop:5, width:20,height:20}}/></Fade>
                  </CCol>
                  <CCol xs="5" xl="6" md="6">
                    {/* <CCardBody> */}
                      {uploadedFile}
                    {/* </CCardBody>                       */}
                  </CCol>
                </CRow>

                 <CRow>
                  <CCol xs="7" xl="6" md="6">
                    <Button class='btn btn-primary btn-sm' variant="contained" component="label">
                        <VideoLibraryIcon /> &nbsp; Upload Video
                        <input type="file" accept="video/*" style={{display:"none"}} onChange={setVideoThumbnail}/>
                    </Button>
                    <Fade in={videoLoading}><CSpinner grow color="primary" style={{marginLeft:10,marginTop:5, width:20,height:20}}/></Fade>
                  </CCol>
                  <CCol  xs="5" xl="6" md="6">
                    <span style={{cursor:"pointer", color:"#321fdb"}} onClick={(e)=>{e.preventDefault(); setVideoClicked(true)}}>{videoFile}</span>
                  </CCol>
                </CRow>

                <hr/>
                <div style={{width:"150px"}}>
                  <CButton type="submit" size="sm" color="primary" style={{marginRight:'10px'}}><CIcon name="cil-save" /> Save</CButton>
                  <CButton type="reset"  size="sm" color="danger" onClick={handleReset} ><CIcon name="cil-ban" /> Reset</CButton>
                </div>
                {
                  videoClicked && video != null?
                    <CRow>
                      <CCol xs="12" md="6">
                        <CCardBody>
                          <ReactPlayer
                            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                            onContextMenu={e => e.preventDefault()}
                            controls
                            width="250"
                            height="125"
                            url={video}
                            style={{height:`${videoHeight}`,backgroundRepeat:'no-repeat',backgroundPosition: 'center',marginTop:5}}
                          />
                        </CCardBody>
                      </CCol>
                    </CRow>
                  :""
                }
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
