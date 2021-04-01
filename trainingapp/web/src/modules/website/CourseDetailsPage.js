import React, { Suspense } from 'react'
import {
  CButton,
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow, CDataTable, CForm, CFormGroup, CFormText, CLink, CInput, CLabel, CSelect,
  CCollapse,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CSpinner,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavItem,
  CNavItem,
  CSidebarNavDropdown,
  CFade,
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter
} from '@coreui/react';

import {
  Redirect,
  Route,
  Switch,
  useHistory
} from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import TheFooter from '../../layout/TheFooter'
import TopicDetailsPage from './TopicsDetailsPage'
import CIcon from '@coreui/icons-react'
import logo from '../../assets/images/logo.png'
import logo_small from '../../assets/images/logo_small.png'
import {
  TheHeaderDropdown
}  from '../../layout/index'

import axios from 'axios';

const isloading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const CourseDetailsPage = (props) => {
  const history = useHistory();

  const darkMode = useSelector(state => state.darkMode)
  const classes = classNames(
    'c-app c-default-layout',
    darkMode && 'c-dark-theme'
  )
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const [loading, setLoading] = React.useState(false)
  const [sectionList, setSectionList] = React.useState([])
  const [topicList, setTopicList] = React.useState([])
  const [topic, setTopic] = React.useState(null)
  const [courseName, setCourseName] = React.useState("")
  const [displayMode, setDisplayMode] = React.useState(0)

  const routes = [
    { path: '/course/:id/:id', name: 'Topic',  exact: true, component: TopicDetailsPage },
  ]

  React.useEffect(() => {
    // if(localStorage.getItem('topic') != null && localStorage.getItem('topic') != 'null') {
    //   var topic = JSON.parse(localStorage.getItem('topic'))
    //   setTopic(topic)
    // }
    if(localStorage.getItem('loginUser')) {
      console.log('loginUser ===> ' + JSON.stringify(localStorage.getItem('loginUser')));
    } else {
      // history.push('/auth/login-page');
      // return;
    }

    localStorage.setItem('topic', null);           
    getOrderList();
    // localStorage.setItem('topic', null);
    // getSectionList();
  }, []);

  const getCourse = async (orderlist, orderitemlist, paymentlist) => {
    axios({
      url: process.env.REACT_APP_AWS_API_ENDPOINT+'/admin/course/'+props.match.params.id+'/details',
      method: 'get' ,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log(response.data)
      setCourseName(response.data.coursename)

      var isPurchased = false;
      var loginUser = JSON.parse(localStorage.getItem('loginUser'))
      for(var j=0;j<orderitemlist.length;j++) {
        if(orderitemlist[j].productid === props.match.params.id) {
            const order = orderlist.find(order => (order.orderid === orderitemlist[j].orderid) && (order.userid === loginUser.userId))
            if(order) {
              console.log(order)
              if(order.status === "Purchased" ) {
                const payment = paymentlist.find(payment => payment.orderitemid === orderitemlist[j].orderitemid)
                console.log(orderitemlist[j].orderitemid)
                console.log(payment)
                if(payment) {
                  const date =  new Date(Number(payment.updatedtime));
                  date.setMonth(date.getMonth() + parseInt(response.data.expiryduration))
                  if(date >= Date.now()) {
                    isPurchased = true
                  } else {
                    isPurchased = false
                  }
                } else {
                  isPurchased = false
                }
              } else if(order.status === "Admin assigned" ) {
                isPurchased = true
              } else isPurchased = false

              break;
            }
        }
      }
      if(isPurchased == true ) {
        localStorage.setItem('topic', null);
        getSectionList();
      } else {
        history.push('/');
      }
    })
    .catch(function (error) {
      console.log(error.response)
     });
  };


  const getPaymentList = async (orderlist, orderitemlist) => {
    setLoading(true)
    const paymentList = await axios({
      url: process.env.REACT_APP_AWS_API_ENDPOINT + '/admin/payment/list',
      method: 'get'
    }).then(response => response.data).then((data) => {
      setLoading(false)
      return data.sort((a, b) => a.updatedtime > b.updatedtime ? -1 : 1)   //   descending
    }).catch(error => {
      setLoading(false)
    });

    getCourse(orderlist, orderitemlist, paymentList);
  };

  const getOrderItemList = async (orderlist) => {
    setLoading(true)
    const list = await axios({
      url: process.env.REACT_APP_AWS_API_ENDPOINT+'/admin/orderitem/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.updatedtime > b.updatedtime ? -1 : 1) //descending
      setLoading(false)
      return list
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });

     getPaymentList(orderlist, list)
  };

  const getOrderList = async () => {
    setLoading(true)
    const list = await axios({
      url: process.env.REACT_APP_AWS_API_ENDPOINT+'/admin/order/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.updatedtime > b.updatedtime ? -1 : 1) //descending
      setLoading(false)
      return list
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });

     getOrderItemList(list);
  };

  const getSectionList = async () => {
    setLoading(true)
    axios({
      url: process.env.REACT_APP_AWS_API_ENDPOINT+'/admin/section/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1) //Ascending
      console.log(list)
      setSectionList(list.filter(section => section.courseid === props.match.params.id));
      setLoading(false)
      getTopicList();
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });
  };

  const getTopicList = async () => {

    setLoading(true)
    axios({
      url: process.env.REACT_APP_AWS_API_ENDPOINT+'/admin/topic/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1) //Ascending
      console.log(list)
      // setTopicList(list.filter(topic => topic.sectionid === props.match.params.id));
      setTopicList(list)
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
      setLoading(false)
     });
  };

  const handleTopicClick = (topic) => {
    setTopic(topic)
    localStorage.setItem('topic', JSON.stringify(topic));
    setDisplayMode(1)
  }

  const downloadData = () => {
    axios({
      url: process.env.REACT_APP_AWS_BUCKET_CLOUDFRONT_URL + '/' + topic.uploadedfile,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', topic.uploadedfile);
      document.body.appendChild(link);
      link.click();
    });
  }

  return (
    <div className={classes}>
      <CSidebar
        show={sidebarShow}
        unfoldable
        size="lg"
        onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}>

        <CSidebarBrand className="d-md-down-none" to="/" style={{background:"#ced2d8"}}>
          <CIcon
            className="c-sidebar-brand-full"
            src={logo}
            height={45}
          />
          <CIcon
            className="c-sidebar-brand-minimized"
            src={logo_small}
            width={35}
          />
        </CSidebarBrand>
        <CSidebarNav >
          <CSpinner grow color="primary" style={{alignSelf:'center', height:'20', marginTop:"20px"}} hidden={!loading}/>
          {/* {section.sectionname} */}
          {sectionList.map(section=>(
             <div>
                <CSidebarNavDropdown  show="false"  name= {section.sectionname}  route={`/course/${props.match.params.id}`}>
                {/* filter(topic => topic.sectionid === section.sectionid). */}
                 {topicList.filter(topic => topic.sectionid === section.sectionid).map(tp=>(
                  //  <CSidebarNavItem name={topic.topicname} to={`/course/${props.match.params.id}/${topic.topicid}`}  onClick={(e)=> {handleTopicClick(topic);}}/>
                  <CSidebarNavItem name={tp.topicname} style={{color:topic===null?"#ffffffcc":topic.topicid===tp.topicid?"#fff":"ffffffcc" , background:topic===null?"transparent":topic.topicid===tp.topicid?"#ffffff0d":"transparent"}} onClick={(e)=> {handleTopicClick(tp);}}/>
                ))}
                </CSidebarNavDropdown>
             </div>
           ))}
          <CSidebarNavDivider />
        </CSidebarNav>
      </CSidebar>
      <div className="c-wrapper">
        {/* <CourseDetailsHeader/> */}
        <CHeader withSubheader>
          <CToggler
            inHeader
            className="ml-md-3 d-lg-none"
            onClick={toggleSidebarMobile}
          />
          <CToggler
            inHeader
            className="ml-3 d-md-down-none"
            onClick={toggleSidebar}
          />
          {/* <CHeaderBrand className="mx-auto d-lg-none" to="/">
            <CIcon src={logo} height="48" alt="Logo"/>
          </CHeaderBrand> */}

          <CHeaderNav className="mr-auto">
            <CHeaderNavItem className="px-3" >
            <CHeaderNavLink to="/">
              <CIcon name="cil-home" className="mfe-2" />
                Home
              </CHeaderNavLink>
            </CHeaderNavItem>
          </CHeaderNav>

          <CHeaderNav className="px-3">
            <TheHeaderDropdown/>
          </CHeaderNav>

          <CSubheader className="px-3 justify-content-between">
            {/* <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} /> */}
            <div className="border-0 c-subheader-nav m-0 px-0 px-md-3"  >
              <spin style={{whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"130%", color:"#058fd1"}}> {'Course : ' + courseName/*localStorage.getItem('coursename')*/} </spin>
            </div>
              <div className=" mfe-2 c-subheader-nav">
                {
                  topic !== null && topic.content != 'null' ?
                    <CLink className="c-subheader-nav-link" href="#" onClick={((e)=>{ setDisplayMode(1) })}>
                      Preview Content
                    </CLink>
                  :''
                }
                {
                  topic !== null && topic.videofile != 'null' ?
                    <CLink className="c-subheader-nav-link" href="#" onClick={((e)=>{ setDisplayMode(2) })}>
                      Preview Video
                    </CLink>
                  :''
                }
                {
                topic !== null && topic.uploadedfile != 'null' ?
                    <CLink className="c-subheader-nav-link" href="#" onClick={((e)=>{ setDisplayMode(3) })}>
                      Preview File
                    </CLink>
                : ''
                }
                {
                topic !== null && topic.uploadedfile != 'null' ?
                    <CLink className="c-subheader-nav-link" href="#" onClick={((e)=>{downloadData()})}>
                      <CIcon name="cil-CloudDownload" alt="Download" />&nbsp;Download File
                    </CLink>
                : ''
                }
              </div>
          </CSubheader>
        </CHeader>
        <div className="c-body">
          <main className="c-main">
            <CContainer fluid>
                {/* <Suspense fallback={isloading}>
                  {routes.map((route, idx) => {
                    return route.component && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <CFade>
                            <route.component {...props}/>
                          </CFade>
                        )} />
                    )
                  })}
                </Suspense> */}
                <TopicDetailsPage displayMode={displayMode}/>
            </CContainer>
          </main>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default CourseDetailsPage
