import React from "react";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CButton,
  CSpinner
} from  '@coreui/react'

import { useSelector, useDispatch } from 'react-redux';
import { NavLink as RouterLink, useHistory } from "react-router-dom";

import Config from "../../common/Config"

import CIcon from '@coreui/icons-react'
import StripeCheckout from 'react-stripe-checkout';

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

// import  { useStyles }  from '../../Layout/Theme/PageTheme';
import styles from "../../assets/material/jss/material-dashboard-pro-react/views/pricingPageStyle.js";
const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function CoursesPage() {

  const classes = useStyles();
  const history = useHistory();
  // const loginUser = useSelector(state => state.loginUser);
  const [loginUser, setLoginUser] = React.useState(null)

  const [isLoading, setIsLoading] = React.useState(false)
  const [isAdding, setIsAdding] = React.useState(false)

  const [toast, showToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastClass, setToastClass] = React.useState('success');


  const [userid, setUserId] = React.useState("userid")
  const [useremail, setUserEmail] = React.useState("useremail")

  // const [course1, setCourse1] = React.useState({name:'Introduction to IOT',description:'8 Classes', amount:1, currency:'SGD', isPurchased:false})
  // const [course2, setCourse2] = React.useState({name:'IOT Intermediate Level',description:'48 Classes', amount:300, currency:'SGD', isPurchased:false})
  const [stripeKey, setStripeKey] = React.useState(Config.STRIPE_PUBLISHABLE_KEY)

  const [courseList, setCourseList] = React.useState([]);
  const [sectionList, setSectionList] = React.useState([]);

  React.useEffect(() => {
    if(localStorage.getItem('loginUser') != null && localStorage.getItem('loginUser') != 'null') {
      var loginUser = JSON.parse(localStorage.getItem('loginUser'))
      setLoginUser(loginUser)
      console.log('loginUser2 ===> ' + JSON.stringify(loginUser));
      setUserId(loginUser.userId)
      setUserEmail(loginUser.email)
    }

    // if(loginUser) {
    //   console.log(loginUser)
    //   setUserId(loginUser.userId)
    //   setUserEmail(loginUser.email)
    //   // getUser(loginUser.email)
    // }
    getSectionList();
  }, []);

  const getUser = async (email) => {
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
      setUserId(response.data.userId)
    })
    .catch(function (error) {
      console.log(error.response)
     });
  };

  const getCourseList = async (orderlist, orderitemlist) => {
    setIsLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/course/list',
      method: 'get'
    })
    .then(function (response) {
      const resList = [];
      var list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1)
      console.log(orderlist)
      console.log(orderitemlist)
      console.log(list)
      var loginUser = null
      if(localStorage.getItem('loginUser') != null && localStorage.getItem('loginUser') != 'null') {
        loginUser = JSON.parse(localStorage.getItem('loginUser'))
      }
      console.log(loginUser.userId)
      for(var i=0 ; i<list.length;i++)
      {
        list[i]['imagePath'] = process.env.REACT_APP_AWS_BUCKET_CLOUDFRONT_URL + '/' + list[i].coursephoto
        // const payment = paymentList.find(payment => payment.courseid === list[i].courseid)
        list[i]['isPurchased'] = false
        if(loginUser != null) {
          for(var j=0;j<orderitemlist.length;j++) {
            if(orderitemlist[j].productid === list[i].courseid) {
                // const order = orderList.slice().reverse().find(order => (order.orderid === orderItemList[i].orderid) && (order.userid == item.userId))
                const order = orderlist.find(order => (order.orderid === orderitemlist[j].orderid) && (order.userid === loginUser.userId))
                if(order) {
                  console.log(order)
                  if(order.status === "Purchased" ) {
                    const date =  new Date(Number(order.updatedtime));
                    date.setDate(date.getMonth() + parseInt(list[i].expiryduration))
                    if(date >= Date.now()) {
                      list[i]['isPurchased'] = true
                      resList.push(list[i])
                    } else list[i]['isPurchased'] = false
                  } else if(order.status === "Admin assigned" ) {
                    list[i]['isPurchased'] = true
                    resList.push(list[i])
                  } else list[i]['isPurchased'] = false

                  break;
                }
            }
          }
        }
      }

      setCourseList(resList);
      setIsLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
     });
  };

  const getOrderItemList = async (orderlist) => {
    setIsLoading(true)
    const list = await axios({
      url: Config.BACKEND_API_URL+'/admin/orderitem/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.updatedtime > b.updatedtime ? -1 : 1) //descending
      setIsLoading(false)
      return list
    })
    .catch(function (error) {
      console.log(error.response)
      setIsLoading(false)
     });

     getCourseList(orderlist, list);
  };

  const getOrderList = async () => {
    setIsLoading(true)
    const list = await axios({
      url: Config.BACKEND_API_URL+'/admin/order/list',
      method: 'get'
    })
    .then(function (response) {
      const list = response.data.sort((a, b) => a.updatedtime > b.updatedtime ? -1 : 1) //descending
      setIsLoading(false)
      return list
    })
    .catch(function (error) {
      console.log(error.response)
      setIsLoading(false)
     });

     getOrderItemList(list);
  };


  const getSectionList = async () => {
    setIsLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/section/list',
      method: 'get'
    })
    .then(function (response) {
      console.log(response.data)
      setSectionList(response.data)
      setIsLoading(false)
      getOrderList();
    })
    .catch(function (error) {
      console.log(error.response)
      setIsLoading(false)
     });
  };


  return (
    <div className={classes.container}>
     <CContainer style={{marginBottom:0}}>
        <CRow className="justify-content-center">
          <Fade in={isLoading} ><CSpinner grow color="primary" style={{textAlign:'center', height:'20'}}/></Fade>
        </CRow>
      </CContainer>
      <CContainer>
        <CContainer >
          {courseList.map((course) => (
          <CRow style={{marginLeft:'70px', marginRight:'70px'}}>
             <CCol xs="12" sm="12" md="12" >
              <CCard style={{borderRadius:'0rem', marginLeft:10,marginRight:10}}>
                <CRow>
                  <CCol md="3">
                    <CCardBody  style={{backgroundImage:`url(${course.imagePath})`,
                            maxWidth:'100%', height:'115px',backgroundRepeat:'no-repeat',
                            backgroundPosition: 'center',backgroundSize: 'cover'}}>
                    </CCardBody>
                  </CCol>
                  <CCol md="9">
                    <CRow>
                      <CCol md="6">
                        <CCardBody style={{marginTop:'15px'}}>
                          <CRow className="justify-content-left" style={{textAlign:'center'}}>
                            <span className="h5" style={{color:"#000000"}}>{course.coursename}</span>
                          </CRow>
                          <CRow className="justify-content-left" style={{textAlign:'center'}}>
                            <span className="h6" style={{color:"#000000"}}>{sectionList.filter(section => section.courseid === course.courseid).length + ' Sections'}</span>
                          </CRow>
                        </CCardBody>
                      </CCol>
                      <CCol md="6">
                        <CCardBody style={{marginTop:'15px'}}>
                          <CRow  style={{display:'flex',justifyContent: 'flex-end',textAlign:'right'}}>
                            <CButton size="lg" block style={{color:"#ffffff",background:'#3399ff', marginRight:"20px", width:'130px'}} to={`/auth/course/${course.courseid}`} >{'Access Now'}</CButton>
                          </CRow>
                        </CCardBody>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CCard>
            </CCol>
          </CRow>
          ))}
        </CContainer>
      </CContainer>
    </div>
  );
}
