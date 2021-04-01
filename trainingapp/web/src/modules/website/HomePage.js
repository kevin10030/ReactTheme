import React from "react";

import { CAlert, CBadge, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow, CContainer,
         CButton, CSpinner,CInputGroup,CInput,CInputGroupAppend,CInputCheckbox, CFormGroup,CLabel
} from  '@coreui/react'

import { Hidden } from "@material-ui/core";

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

import home_top from "../../assets/images/home/home_top.png"
import home_icon_logic from "../../assets/images/home/home_icon_logic.png"
import home_icon_innovation from "../../assets/images/home/home_icon_innovation.png"
import home_icon_creativity from "../../assets/images/home/home_icon_creativity.png"
import home_icon_problemsolving from "../../assets/images/home/home_icon_problemsolving.png"
import home_icon_analytical_thinking from "../../assets/images/home/home_icon_analytical_thinking.png"
import home_icon_teamwork from "../../assets/images/home/home_icon_teamwork.png"
import home_second_image from "../../assets/images/home/home_second_image.png"
import home_second_checkbox from "../../assets/images/home/home_second_checkbox.png"
import home_third_bg from "../../assets/images/home/home_third_bg.png";
import home_third_image1 from "../../assets/images/home/home_third_image1.png";
import home_third_image2 from "../../assets/images/home/home_third_image2.png";
import home_third_image3 from "../../assets/images/home/home_third_image3.png";
import home_third_checkbox from "../../assets/images/home/home_third_checkbox.png";
import home_aboutus_image from "../../assets/images/home/home_aboutus_image.png"
import home_point_better_future from "../../assets/images/home/home_point_better_future.png"
import home_point_qualified_trainer from "../../assets/images/home/home_point_qualified_trainer.png"
import home_point_job_oppurtunity from "../../assets/images/home/home_point_job_oppurtunity.png"

import home_stemlearning_image1 from "../../assets/images/home/home_stemlearning_image1.png"
import home_stemlearning_image2 from "../../assets/images/home/home_stemlearning_image2.png"
import home_stemlearning_image3 from "../../assets/images/home/home_stemlearning_image3.png"

import home_cout_bg from "../../assets/images/home/home_cout_bg.png"

import home_freetrial_bg from "../../assets/images/home/home_freetrial_bg.png"

import home_blog_image1 from "../../assets/images/home/home_blog_image1.png"
import home_blog_image2 from "../../assets/images/home/home_blog_image2.png"
import home_blog_image3 from "../../assets/images/home/home_blog_image3.png"

import home_tesimonials_image1 from "../../assets/images/home/home_tesimonials_image1.png"
import tesimonials from "../../assets/images/home/tesimonials.png"

// import  { useStyles }  from '../../Layout/Theme/PageTheme';
import styles from "../../assets/material/jss/material-dashboard-pro-react/views/pricingPageStyle.js";
const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function HomePage() {

  const classes = useStyles();
  const history = useHistory();
  // const loginUser = useSelector(state => state.loginUser);
  const [loginUser, setLoginUser] = React.useState(null)

  const [isLoading, setIsLoading] = React.useState(false)
  const [isAdding, setIsAdding] = React.useState(false)
  const [curCourseId, setCurCourseId] = React.useState('')

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

  const [tempValue, setTempValue] = React.useState("0rem")

  const [blogList, setBlogList] = React.useState([home_blog_image1, home_blog_image2, home_blog_image3])

  React.useEffect(() => {
    if(localStorage.getItem("logoutStatus")) {
      setToastClass('success');
      setToastMessage(localStorage.getItem("logoutStatus"));
      showToast(true);
      localStorage.removeItem("logoutStatus");
    }
    if(localStorage.getItem('loginUser') != null && localStorage.getItem('loginUser') != 'null') {
      var loginUser = JSON.parse(localStorage.getItem('loginUser'))
      setLoginUser(loginUser)
      console.log('loginUser2 ===> ' + JSON.stringify(loginUser));
      setUserId(loginUser.userId)
      setUserEmail(loginUser.email)
    }
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

  const getCourseList = async (orderlist, orderitemlist, paymentlist) => {
    setIsLoading(true)
    axios({
      url: Config.BACKEND_API_URL+'/admin/course/list',
      method: 'get'
    })
    .then(function (response) {
      var list = response.data.sort((a, b) => a.createdtime > b.createdtime ? 1 : -1)
      console.log(orderlist)
      console.log(orderitemlist)
      console.log(paymentlist)
      console.log(list)
      var loginUser = null
      if(localStorage.getItem('loginUser') != null && localStorage.getItem('loginUser') != 'null') {
        loginUser = JSON.parse(localStorage.getItem('loginUser'))
      }
      for(var i=0 ; i<list.length;i++)
      {
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
                    const payment = paymentlist.find(payment => payment.orderitemid === orderitemlist[j].orderitemid)
                    console.log(orderitemlist[j].orderitemid)
                    console.log(payment)
                    if(payment) {
                      const date =  new Date(Number(payment.updatedtime));
                      date.setMonth(date.getMonth() + parseInt(list[i].expiryduration))
                      if(date >= Date.now()) {
                        list[i]['isPurchased'] = true
                      } else list[i]['isPurchased'] = false
                    } else {
                      list[i]['isPurchased'] = false
                    }
                  } else if(order.status === "Admin assigned" ) {
                    list[i]['isPurchased'] = true
                  } else list[i]['isPurchased'] = false

                  break;
                }
            }
          }
        }
      }

      setCourseList(list);
      setIsLoading(false)
    })
    .catch(function (error) {
      console.log(error.response)
     });
  };

  const getPaymentList = async (orderlist, orderitemlist) => {
    setIsLoading(true)
    const paymentList = await axios({
      url: Config.BACKEND_API_URL + '/admin/payment/list',
      method: 'get'
    }).then(response => response.data).then((data) => {
      setIsLoading(false)
      return data.sort((a, b) => a.updatedtime > b.updatedtime ? -1 : 1)   //   descending
    }).catch(error => {
      setIsLoading(false)
    });

    getCourseList(orderlist, orderitemlist, paymentList);
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

     getPaymentList(orderlist, list)
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

  function addPayment(token, id) {
    //stripeToken, currency, useremail,courseid, coursename, amount, updatedby, updatedtime
    const cc = courseList.find(c => c.courseid === id);
    console.log(token + " " + cc.currency + " " + useremail + " " + cc.courseid + " " + cc.coursename + " " + cc.price + " " + userid)
    setIsAdding(true)
    axios({
      url: process.env.REACT_APP_AWS_API_ENDPOINT + '/user/payment/create',
      method: 'post',
      data: {
        'stripeToken': token,
        'currency': cc.currency,
        'useremail': useremail,
        'courseid': cc.courseid,
        'coursename':cc.coursename,
        'amount': cc.price.toString(),
        'updatedby': userid,
        'updatedtime': Date.now().toString()
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.data).then((data) => {
      console.log(data)

      setIsAdding(false)
      setToastClass('success');
      setToastMessage('Success: ' + data);
      showToast(true);

      var index = courseList.indexOf(cc);
      if(index != -1) {
        courseList[index]['isPurchased'] = true;
        setCourseList(courseList.map(a => ({...a})));
      }

    }).catch(error => {
      console.log(error)
      setIsAdding(false)
      setToastClass('Warning');
      if(error.response)
        setToastMessage(error.response.data);
      else
        setToastMessage(error)
      showToast(true);
    })
  }

  function onToken(token,course)
  {
    console.log('token:'+JSON.stringify(token))
    console.log(course.courseid)
    setCurCourseId(course.courseid)
    addPayment(token.id, course.courseid)

  }

  function gotoLabsSite()
  {
    if(localStorage.getItem('loginUser') != null && localStorage.getItem('loginUser') != 'null') 
    {
      var jwt = require('jsonwebtoken');
      var jwttoken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60),
      data: 'Scratch'
          }, 'godataplushscratch');
      console.log(jwttoken)
      // window.open('http://localhost:8601/?token='+jwttoken, '_blank')
      window.open('https://scratch.trainingapp.godataplush.com/?token='+jwttoken, '_blank')
    } else {
      setToastClass('success'); 
      setToastMessage('Please login'); 
      showToast(true);
    }    
  }

  return (
    <div className={classes.container} style={{width:"100%",padding:"0",margin:"0"}}>
      <Hidden smDown>
        <div style={{ backgroundImage: "url("+home_top+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover'}}>
          <CRow style={{margin:"0"}}>          
              <CCol md="6">
              </CCol>

              <CCol md="6" style={{paddingLeft:"5rem", paddingRight:"0", paddingTop:"10rem", paddingBottom:"10rem"}}>
                <p>
                <span style={{fontFamily:"Poppins-Bold", fontSize:"270%", color:"#17387b"}}>{Config.home_top_string1}</span>
                <span style={{whiteSpace: "pre", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#000000"}}>{Config.home_top_string2}</span>
                <span style={{whiteSpace: "pre", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#ff8b02"}}>{Config.home_top_string3}</span>
                </p>
                <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000000"}}> {Config.home_top_string4} </p>
                {/* <div>
                <CButton style={{background:"#ff8b02",marginTop:"1rem", width:"11rem",height:"3.5rem",borderRadius:"5px"}}>
                    <span style={{fontFamily:"Poppins-Bold", fontSize:"100%", color:"#fff"}}>{Config.home_top_button_string1}</span>
                    <br/>
                    <span style={{fontFamily:"Poppins-Light", fontSize:"100%", color:"#fff"}}>{Config.home_top_button_string2}</span>
                </CButton>
                </div> */}
              </CCol>
          </CRow>
        </div>
      </Hidden>          
      <Hidden mdUp>
        {/* <div style={{ backgroundImage: "url("+home_second_image+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'contain',width:"100%",height:"15rem"}}>
        </div> */}
        <div style={{paddignTop:"2rem",paddingLeft:"2rem", paddingRight:"2rem"}}>
          <div style={{ backgroundImage: "url("+home_top+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover',width:"100%",height:"200px"}}>
          </div>
          <CRow style={{margin:"0"}}>          
            <CCol md="12" style={{paddingLeft:"0rem", paddingRight:"0", paddingTop:"2rem", paddingBottom:"0rem"}}>
              <p>
              <span style={{fontFamily:"Poppins-Bold", fontSize:"180%", color:"#17387b"}}>{Config.home_top_string1}</span><br/>
              <span style={{fontFamily:"Poppins-Bold", fontSize:"180%", color:"#000000"}}>{Config.home_top_string2_mobile}</span><br/>
              <span style={{fontFamily:"Poppins-Bold", fontSize:"180%", color:"#ff8b02"}}>{Config.home_top_string3_mobile}</span><br/>
              </p>
              <p style={{fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000000"}}> {Config.home_top_string4_mobile} </p>
            </CCol>
          </CRow>
        </div>
      </Hidden>

      {/* Your kids will learn */}
      <Hidden smDown>
        <div style={{paddingTop:"4rem", paddingBottom:"7rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
          <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"270%", color:"#000000"}}>{Config.home_yourkids_willlearn} </p>
          <CRow className="justify-content-center" style={{margin:"0",paddingTop:"3rem"}}>
            <CCol md="1">
            </CCol>     
            <CCol md="5">
              <CRow>
                <CCol md="4">
                  <div style={{textAlign:"center"}}>
                    <div >
                      <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_icon_logic+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
                    </div>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#000000"}}>{Config.home_yourkids_string1}</span>
                  </div>
                </CCol>
                <CCol md="4">
                  <div style={{textAlign:"center"}}>
                    <div >
                      <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_icon_innovation+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
                    </div>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#000000"}}>{Config.home_yourkids_string2}</span>
                  </div>
                </CCol>
                <CCol md="4">
                  <div style={{textAlign:"center"}}>
                    <div >
                      <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_icon_creativity+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
                    </div>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#000000"}}>{Config.home_yourkids_string3}</span>
                  </div>
                </CCol>
              </CRow>
            </CCol>
            <CCol md="5">
              <CRow>
                <CCol md="4">
                  <div style={{textAlign:"center"}}>
                    <div >
                      <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_icon_problemsolving+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
                    </div>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#000000"}}>{Config.home_yourkids_string4}</span>
                  </div>
                </CCol>
                <CCol md="4">
                  <div style={{textAlign:"center"}}>
                    <div >
                      <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_icon_analytical_thinking+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
                    </div>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#000000"}}>{Config.home_yourkids_string5}</span>
                  </div>
                </CCol>
                <CCol md="4">
                  <div style={{textAlign:"center"}}>
                    <div >
                      <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_icon_teamwork+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
                    </div>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#000000"}}>{Config.home_yourkids_string6}</span>
                  </div>
                </CCol>
              </CRow>
            </CCol>
            <CCol md="1">
            </CCol>
          </CRow>
          {/* second image */}
          <CRow  className="justify-content-center" style={{margin:"0",paddingTop:"3rem"}}>

            <CCol md="1">
            </CCol>
            
            <CCol md="5">
              <div style={{paddingTop:"2rem", paddingLeft:"2rem"}}>
                <CRow style={{marginBottom:"1rem"}}>
                  <span style={{whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"200%", color:"#058fd1"}}>{Config.home_second_string1}</span>              
                </CRow>
                <CRow style={{marginBottom:"1rem"}}>
                  <div style={{marginRight:"0.5rem", backgroundImage: "url("+home_second_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"2rem", width:"2rem"}}/>
                  <span style={{fontFamily:"Poppins-Regular", fontSize:"150%", color:"#000000"}}>{Config.home_second_string2}</span>
                </CRow>
                <CRow style={{marginBottom:"1rem"}}>
                  <div style={{marginRight:"0.5rem", backgroundImage: "url("+home_second_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"2rem", width:"2rem"}}/>
                  <span style={{fontFamily:"Poppins-Regular", fontSize:"150%", color:"#000000"}}>{Config.home_second_string3}</span>
                </CRow>
                <CRow>
                  <div style={{marginRight:"0.5rem", backgroundImage: "url("+home_second_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"2rem", width:"2rem"}}/>
                  <span style={{fontFamily:"Poppins-Regular", fontSize:"150%", color:"#000000"}}>{Config.home_second_string4}</span>
                </CRow>
              </div>
            </CCol>
            <CCol md="6"> 
              <div style={{ backgroundImage: "url("+home_second_image+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'contain',width:"100%", height:"100%"}}/>
            </CCol>          
            <CCol md="1"/>
          </CRow>
        </div>
      </Hidden>

      <Hidden mdUp>
        <div style={{paddingTop:"4rem", paddingBottom:"3rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
          <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"210%", color:"#000000"}}>{Config.home_yourkids_willlearn} </p>
          <CRow className="justify-content-center" style={{margin:"0",paddingTop:"1rem"}}>
            <CCol md="1">
            </CCol>     
            <CCol md="5">
              <CRow>
                <CCol md="4">
                  <div style={{textAlign:"center"}}>
                    <div >
                      <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_icon_logic+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
                    </div>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#000000"}}>{Config.home_yourkids_string1}</span>
                  </div>
                </CCol>
                <CCol md="4">
                  <div style={{textAlign:"center"}}>
                    <div >
                      <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_icon_innovation+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
                    </div>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#000000"}}>{Config.home_yourkids_string2}</span>
                  </div>
                </CCol>
                <CCol md="4">
                  <div style={{textAlign:"center"}}>
                    <div >
                      <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_icon_creativity+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
                    </div>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#000000"}}>{Config.home_yourkids_string3}</span>
                  </div>
                </CCol>
              </CRow>
            </CCol>
            <CCol md="5">
              <CRow>
                <CCol md="4">
                  <div style={{textAlign:"center"}}>
                    <div >
                      <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_icon_problemsolving+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
                    </div>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#000000"}}>{Config.home_yourkids_string4}</span>
                  </div>
                </CCol>
                <CCol md="4">
                  <div style={{textAlign:"center"}}>
                    <div >
                      <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_icon_analytical_thinking+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
                    </div>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#000000"}}>{Config.home_yourkids_string5}</span>
                  </div>
                </CCol>
                <CCol md="4">
                  <div style={{textAlign:"center"}}>
                    <div >
                      <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_icon_teamwork+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
                    </div>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#000000"}}>{Config.home_yourkids_string6}</span>
                  </div>
                </CCol>
              </CRow>
            </CCol>
            <CCol md="1">
            </CCol>
          </CRow>
          {/* second image */}
          <CRow  className="justify-content-center" style={{margin:"0",paddingTop:"3rem"}}>
            <CCol md="5">
              <div style={{paddingTop:"0rem", paddingLeft:"0rem"}}>
                <CRow style={{marginBottom:"1rem"}}>
                  <span style={{textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"150%", color:"#058fd1"}}>{Config.home_second_string1_mobile}</span>              
                </CRow>
                <CRow style={{marginBottom:"1rem"}}>
                  <CCol className="col-1" style={{padding:"0"}}>
                    <div style={{marginRight:"0rem", backgroundImage: "url("+home_second_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                  </CCol>
                  <CCol className="col-11" style={{padding:"0", paddingLeft:"0.5rem"}}>
                    <span style={{float:"left",textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000000"}}>{Config.home_second_string2}</span>
                  </CCol>
                </CRow>
                <CRow style={{marginBottom:"1rem"}}>
                  <CCol className="col-1" style={{padding:"0"}}>
                    <div style={{marginRight:"0rem", backgroundImage: "url("+home_second_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                  </CCol>
                  <CCol className="col-11" style={{padding:"0", paddingLeft:"0.5rem"}}>
                    <span style={{float:"left",textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000000"}}>{Config.home_second_string3}</span>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol className="col-1" style={{padding:"0"}}>
                    <div style={{marginRight:"0rem", backgroundImage: "url("+home_second_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                  </CCol>
                  <CCol className="col-11" style={{padding:"0", paddingLeft:"0.5rem"}}>
                    <span style={{float:"left",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000000"}}>{Config.home_second_string4}</span>
                  </CCol>
                </CRow>
              </div>
            </CCol>
          </CRow>
        </div>
      </Hidden>

      {/* third  */}
      <Hidden smDown>
        <div style={{ backgroundImage: "url("+home_third_bg+")",backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
          <CRow style={{margin:"0", padding:"5rem"}}>
            <CCol md="6">  
              <CRow style={{margin:"0", width:"100%",height:"100%"}}>                                    
                <CCol xs="0" sm="0" md="1">
                </CCol>
                <CCol xs="12" sm="12" md="11">            
                  <div style={{ backgroundImage: "url("+home_third_image1+")",backgroundRepeat:'no-repeat', backgroundPosition: 'right', backgroundSize: 'cover', width:"100%", height:"67%"}}/>
                  <CRow style={{margin:"0",marginTop:"10px", width:"100%",height:"100%"}}>
                    <CCol md="6" style={{padding:"0", paddingRight:"10px"}}>                          
                      <div style={{ backgroundImage: "url("+home_third_image2+")",backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width:"100%", height:"33%"}}/>
                    </CCol>
                    <CCol md="6" style={{padding:"0", paddingLeft:"10px"}}>                          
                      <div style={{ backgroundImage: "url("+home_third_image3+")",backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width:"100%", height:"33%"}}/>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>
            <CCol md="6"> 
              <CRow style={{marginBottom:"1rem"}}> 
                <span style={{whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"180%", color:"#fff"}}>{Config.home_third_string1}</span> 
              </CRow>
              <CRow style={{marginBottom:"1rem"}}> 
                <span style={{whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#fff"}}>{Config.home_third_string2}</span>
              </CRow>
              <CRow style={{marginBottom:"1rem"}}>
                <div style={{marginRight:"0.5rem", backgroundImage: "url("+home_third_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"2rem", width:"2rem"}}/>
                <span style={{fontFamily:"Poppins-Bold", fontSize:"150%", color:"#fff"}}>{Config.home_third_string3}</span>
              </CRow>

              <CRow style={{marginBottom:"2rem"}}>
                <div style={{marginRight:"0.5rem", backgroundImage: "url("+home_third_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"2rem", width:"2rem"}}/>
                <span style={{fontFamily:"Poppins-Bold", fontSize:"150%", color:"#fff"}}>{Config.home_third_string4}</span>
              </CRow>
              <CRow style={{marginBottom:"0rem"}}>
                <span style={{whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"180%", color:"#fff"}}>{Config.home_third_string5}</span> 
              </CRow>
              {/* <CRow style={{marginBottom:"0"}}>
                <CButton style={{background:"#fff",marginTop:"0", paddingLeft:"1rem", paddingRight:"1rem", paddingTop:"5px", paddingBottom:"5px",borderRadius:"5px"}}>
                  <span style={{fontFamily:"Poppins-Bold", fontSize:"100%", color:"#ff8b02"}}>{Config.home_third_button_string1}</span>
                  <br/>
                  <span style={{fontFamily:"Poppins-Light", fontSize:"100%", color:"#ff8b02"}}>{Config.home_third_button_string2}</span>
                </CButton>
              </CRow> */}
            </CCol>
          </CRow>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div style={{ padding:"2rem", backgroundImage: "url("+home_third_bg+")",backgroundRepeat:'repeat', backgroundPosition: 'center', backgroundSize: 'contain'}}>
          <CRow style={{margin:"0", padding:"0rem",width:"100%",height:"200px"}}>
            <CCol md="12">  
              <div style={{ backgroundImage: "url("+home_third_image1+")",backgroundRepeat:'no-repeat', backgroundPosition: 'right', backgroundSize: 'cover', width:"100%", height:"100%"}}/>
            </CCol>
          </CRow>            
          <CRow style={{margin:"0", paddingTop:"2rem"}}>
            <CCol md="6"> 
              <CRow style={{marginBottom:"1rem"}}> 
                <span style={{textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"110%", color:"#fff"}}>{Config.home_third_string1_mobile}</span> 
              </CRow>
              <CRow style={{marginBottom:"1rem"}}> 
                <span style={{textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#fff"}}>{Config.home_third_string2_mobile}</span>
              </CRow>
              <CRow style={{marginBottom:"1rem"}}>
                <CCol className="col-1" style={{padding:"0"}}>
                  <div style={{marginRight:"0rem", backgroundImage: "url("+home_third_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                </CCol>
                <CCol className="col-11" style={{padding:"0", paddingLeft:"0.5rem"}}>
                  <span style={{float:"left",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"110%", color:"#fff"}}>{Config.home_third_string3}</span>
                </CCol>
              </CRow>
              <CRow style={{marginBottom:"2rem"}}>
                <CCol className="col-1" style={{padding:"0"}}>
                  <div style={{marginRight:"0rem", backgroundImage: "url("+home_third_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                </CCol>
                <CCol className="col-11" style={{padding:"0", paddingLeft:"0.5rem"}}>
                  <span style={{float:"left",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"110%", color:"#fff"}}>{Config.home_third_string4}</span>
                </CCol>
              </CRow>
              <CRow style={{marginBottom:"0rem"}}>
                <span style={{textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"110%", color:"#fff"}}>{Config.home_third_string5_mobile}</span> 
              </CRow>
              {/* <CRow style={{marginBottom:"0"}}>
                <CButton style={{background:"#fff",marginTop:"0", paddingLeft:"1rem", paddingRight:"1rem", paddingTop:"5px", paddingBottom:"5px",borderRadius:"5px"}}>
                  <span style={{fontFamily:"Poppins-Bold", fontSize:"100%", color:"#ff8b02"}}>{Config.home_third_button_string1}</span>
                  <br/>
                  <span style={{fontFamily:"Poppins-Light", fontSize:"100%", color:"#ff8b02"}}>{Config.home_third_button_string2}</span>
                </CButton>
              </CRow> */}
            </CCol>
          </CRow>
        </div>
      </Hidden>

      {/* About us  */}
      <Hidden smDown>
        <div style={{paddingTop:"4rem", paddingBottom:"4rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
          <CRow  style={{margin:"0",paddingTop:"0"}}>
            <CCol md="1">
            </CCol>     
            <CCol md="5">
              <div style={{paddingTop:"2rem", paddingLeft:"2rem"}}>
                <CRow style={{marginBottom:"0"}}>
                  <span style={{whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.home_aboutus_string1}</span>              
                </CRow>
                <CRow style={{marginBottom:"0.5rem"}}>
                  <span style={{whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"250%", color:"#000"}}>{Config.home_aboutus_string2}</span>              
                </CRow>
                <CRow style={{marginBottom:"1rem"}}>
                  <span style={{whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"100%", color:"#000"}}>{Config.home_aboutus_string3}</span>              
                </CRow>
                {/* <CRow style={{marginBottom:"0"}}>
                  <CButton style={{background:"#ff8b02",marginTop:"0",paddingTop:"0.7rem",paddingBottom:"0.7rem",paddingLeft:"1.5rem",paddingRight:"1.5rem", borderRadius:"0px"}}>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#fff"}}>{Config.home_aboutus_button_string1}</span>
                  </CButton>
                </CRow> */}
              </div>
            </CCol>    
            <CCol md="6"> 
            <div style={{ backgroundImage: "url("+home_aboutus_image+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'contain',width:"100%", height:"120%"}}/>
            </CCol>
          </CRow>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div style={{paddingTop:"2rem", paddingBottom:"2rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
          <CRow  style={{margin:"0",paddingTop:"0"}}>    
            <CCol md="12">
              <div style={{paddingTop:"2rem", paddingLeft:"0rem"}}>
                <CRow style={{marginBottom:"0"}}>
                  <span style={{whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.home_aboutus_string1}</span>              
                </CRow>
                <div style={{ backgroundImage: "url("+home_aboutus_image+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'contain',width:"100%", height:"200px"}}/>
                <CRow style={{marginBottom:"0.5rem"}}>
                  <span style={{whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"200%", color:"#000"}}>{Config.home_aboutus_string2}</span>              
                </CRow>
                <CRow style={{marginBottom:"1rem"}}>
                  <span style={{textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000"}}>{Config.home_aboutus_string3_mobile}</span>              
                </CRow>
                {/* <CRow style={{marginBottom:"0"}}>
                  <CButton style={{background:"#ff8b02",marginTop:"0",paddingTop:"0.7rem",paddingBottom:"0.7rem",paddingLeft:"1.5rem",paddingRight:"1.5rem", borderRadius:"0px"}}>
                    <span style={{fontFamily:"Poppins-Regular", fontSize:"120%", color:"#fff"}}>{Config.home_aboutus_button_string1}</span>
                  </CButton>
                </CRow> */}
              </div>
            </CCol>    
          </CRow>
        </div>
      </Hidden>

      {/* points */}      
      <div style={{background:"#fafafa", paddingTop:"4rem", paddingBottom:"4rem",  paddingLeft:"2.5rem", paddingRight:"2.5rem", textAlign:"center"}}>
        <CRow  style={{margin:"0",paddingTop:"0"}}>
          <CCol md="4">
            <div style={{textAlign:"center"}}>
              <div >
                <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_point_better_future+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
              </div>
              <div><span style={{fontFamily:"Poppins-Bold", fontSize:"120%", color:"#000000",marginBottom:"0.5rem"}}>{Config.home_points_string1}</span></div>
              <div><span style={{whiteSpace: "pre", fontFamily:"Poppins-Regular", fontSize:"80%", color:"#000000"}}>{Config.home_points_string1_exp}</span></div>
            </div>
          </CCol>
          <CCol md="4">
            <div style={{textAlign:"center"}}>
              <div >
                <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_point_qualified_trainer+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
              </div>
              <div><span style={{fontFamily:"Poppins-Bold", fontSize:"120%", color:"#000000",marginBottom:"0.5rem"}}>{Config.home_points_string2}</span></div>
              <div><span style={{whiteSpace: "pre", fontFamily:"Poppins-Regular", fontSize:"80%", color:"#000000"}}>{Config.home_points_string2_exp}</span></div>
            </div>
          </CCol>
          <CCol md="4">
            <div style={{textAlign:"center"}}>
              <div >
                <CCardBody style={{display:"inline-block", backgroundImage: "url("+home_point_job_oppurtunity+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"7rem", width:"7rem", marginBottom:"0.5rem"}}/>
              </div>
              <div><span style={{fontFamily:"Poppins-Bold", fontSize:"120%", color:"#000000",marginBottom:"0.5rem"}}>{Config.home_points_string3}</span></div>
              <div><span style={{whiteSpace: "pre", fontFamily:"Poppins-Regular", fontSize:"80%", color:"#000000"}}>{Config.home_points_string3_exp}</span></div>
            </div>
          </CCol>
        </CRow>
      </div>

      {/* STEM Learning */}
      <Hidden smDown>
        <div style={{paddingTop:"6rem", paddingBottom:"3rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
          <p style={{fontFamily:"Poppins-Bold", fontSize:"270%", color:"#000000"}}>{Config.home_stemlearning_string1} </p>
          <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000000"}}>{Config.home_stemlearning_string2} </p>
          
          <div style={{paddingTop:"3rem", paddingBottom:"4rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
            <CRow  style={{margin:"0",paddingTop:"0"}}>
              <CCol md="1">
              </CCol>    
              <CCol md="5"  style={{padding:"0",paddingRight:"2rem"}}> 
                <div style={{ backgroundImage: "url("+home_stemlearning_image1+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'cover',width:"100%", height:"100%"}}/>
              </CCol> 
              <CCol md="5"  style={{padding:"0",paddingLeft:"2rem"}}>
                <div style={{paddingTop:"2rem"}}>
                  <CRow style={{marginBottom:"0.5"}}>
                    <span style={{width:"100%",whiteSpace: "pre",textAlign:"right", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#000"}}>{Config.home_stemlearning_first_string1}</span>              
                  </CRow>
                  <CRow style={{marginBottom:"0.5rem"}}>
                    <span style={{width:"100%",whiteSpace: "pre",textAlign:"right", fontFamily:"Poppins-Bold", fontSize:"150%", color:"#000"}}>{Config.home_stemlearning_first_string2}</span>              
                  </CRow>
                  <CRow style={{marginBottom:"1rem", float:"right"}}>
                    <p style={{width:"100%",whiteSpace: "pre",textAlign:"right", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000",lineHeight:"2rem"}}>{Config.home_stemlearning_first_string3}</p>              
                  </CRow>
                  {/* <CRow style={{marginBottom:"2rem",float:"right"}}>
                    <CButton style={{background:"#ff8b02",marginTop:"0",width:"13rem",height:"3.5rem", borderRadius:"0px"}}>
                      <span style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff"}}>{Config.home_stemlearning_first_button_string}</span>
                    </CButton>
                  </CRow> */}
                </div>
              </CCol>    
              <CCol md="1"/>            
            </CRow>
          </div>

          <div style={{paddingTop:"3rem", paddingBottom:"0",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
            <CRow  style={{margin:"0",paddingTop:"0"}}>
              <CCol md="1"/>
              <CCol md="5" style={{padding:"0",paddingRight:"3rem"}}>
                <div style={{paddingTop:"2rem"}}>
                  <CRow style={{marginBottom:"0.5"}}>
                    <span style={{width:"100%",whiteSpace: "pre",textAlign:"right", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#000"}}>{Config.home_stemlearning_second_string1}</span>              
                  </CRow>
                  <CRow style={{marginBottom:"1rem", float:"right"}}>
                    <p style={{width:"100%",whiteSpace: "pre",textAlign:"right", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000",lineHeight:"2rem"}}>{Config.home_stemlearning_second_string2}</p>              
                  </CRow>
                  {/* <CRow style={{marginBottom:"2rem",float:"right"}}>
                    <CButton style={{background:"#01256e",marginTop:"0",width:"13rem",height:"3.5rem", borderRadius:"0px"}}>
                      <span style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff"}}>{Config.home_stemlearning_second_button_string}</span>
                    </CButton>
                  </CRow> */}
                </div>
              </CCol>   
              <CCol md="5" style={{padding:"0", paddingLeft:"5rem"}}> 
                <div style={{ backgroundImage: "url("+home_stemlearning_image2+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'cover',width:"100%", height:"100%"}}/>
              </CCol>  
              <CCol md="1"/>            
            </CRow>
          </div>

          <div style={{paddingTop:"3rem", paddingBottom:"0",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
            <CRow  style={{margin:"0",paddingTop:"0"}}>
              <CCol md="1"/>
              <CCol md="5"  style={{padding:"0",paddingRight:"2rem"}}> 
                <div style={{ backgroundImage: "url("+home_stemlearning_image3+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'cover',width:"100%", height:"100%"}}/>
              </CCol> 
              <CCol md="5"  style={{padding:"0",paddingLeft:"2rem"}}>
                <div style={{paddingTop:"2rem"}}>
                  <CRow style={{marginBottom:"0.5"}}>
                    <span style={{width:"100%",whiteSpace: "pre",textAlign:"right", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#000"}}>{Config.home_stemlearning_third_string1}</span>              
                  </CRow>
                  <CRow style={{marginBottom:"1rem", float:"right"}}>
                    <p style={{width:"100%",whiteSpace: "pre",textAlign:"right", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000",lineHeight:"2rem"}}>{Config.home_stemlearning_third_string2}</p>              
                  </CRow>
                  {/* <CRow style={{marginBottom:"2rem",float:"right"}}>
                    <CButton style={{background:"#028ed0",marginTop:"0",width:"13rem",height:"3.5rem", borderRadius:"0px"}}>
                      <span style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff"}}>{Config.home_stemlearning_third_button_string}</span>
                    </CButton>
                  </CRow> */}
                </div>
              </CCol> 
              <CCol md="1"/>               
            </CRow>
          </div>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div style={{paddingTop:"3rem", paddingBottom:"3rem",  paddingLeft:"1rem", paddingRight:"1rem", textAlign:"center"}}>
          <p style={{fontFamily:"Poppins-Bold", fontSize:"190%", color:"#000000"}}>{Config.home_stemlearning_string1} </p>
          <p style={{fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000000"}}>{Config.home_stemlearning_string2_mobile} </p>
          
          <div style={{paddingTop:"1rem", paddingBottom:"2rem",  paddingLeft:"1rem", paddingRight:"1rem", textAlign:"center"}}>
            <CRow  style={{margin:"0",paddingTop:"0"}}>
              <CCol md="12"  style={{padding:"0"}}>
                <div style={{paddingTop:"2rem"}}>
                  <CRow style={{marginBottom:"0.5"}}>
                    <span style={{width:"100%",whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Bold", fontSize:"180%", color:"#000"}}>{Config.home_stemlearning_first_string1}</span>              
                  </CRow>                  
                  <CRow style={{marginBottom:"0.5rem"}}>
                    <span style={{width:"100%",whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Bold", fontSize:"100%", color:"#000"}}>{Config.home_stemlearning_first_string2}</span>              
                  </CRow>
                  <div style={{ backgroundImage: "url("+home_stemlearning_image1+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'cover',width:"100%", height:"200px"}}/>
                  <CRow style={{marginBottom:"0rem", float:"center"}}>
                    <p style={{width:"100%",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"80%", color:"#000",lineHeight:"1.5rem"}}>{Config.home_stemlearning_first_string3_mobile}</p>              
                  </CRow>
                  {/* <CRow style={{marginBottom:"0rem",float:"right"}}>
                    <CButton style={{background:"#ff8b02",marginTop:"0",width:"13rem",height:"3.5rem", borderRadius:"0px"}}>
                      <span style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff"}}>{Config.home_stemlearning_first_button_string}</span>
                    </CButton>
                  </CRow> */}
                </div>
              </CCol>    
            </CRow>
          </div>

          <div style={{paddingTop:"1rem", paddingBottom:"0",  paddingLeft:"1rem", paddingRight:"1rem", textAlign:"center"}}>
            <CRow  style={{margin:"0",paddingTop:"0"}}>
              <CCol md="12" style={{padding:"0"}}>
                <div style={{paddingTop:"0rem"}}>
                  <CRow style={{marginBottom:"0.5"}}>
                    <span style={{width:"100%",whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Bold", fontSize:"180%", color:"#000"}}>{Config.home_stemlearning_second_string1}</span>              
                  </CRow>
                  <div style={{ backgroundImage: "url("+home_stemlearning_image2+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'cover',width:"100%", height:"200px"}}/>
                  <CRow style={{marginBottom:"0rem", float:"center"}}>
                    <p style={{width:"100%",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"80%", color:"#000",lineHeight:"1.5rem"}}>{Config.home_stemlearning_second_string2_mobile}</p>              
                  </CRow>
                  {/* <CRow style={{marginBottom:"0rem",float:"right"}}>
                    <CButton style={{background:"#01256e",marginTop:"0",width:"13rem",height:"3.5rem", borderRadius:"0px"}}>
                      <span style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff"}}>{Config.home_stemlearning_second_button_string}</span>
                    </CButton>
                  </CRow> */}
                </div>
              </CCol>             
            </CRow>
          </div>

          <div style={{paddingTop:"1rem", paddingBottom:"0",  paddingLeft:"1rem", paddingRight:"1rem", textAlign:"center"}}>
            <CRow  style={{margin:"0",paddingTop:"0"}}>
              <CCol md="12"  style={{padding:"0"}}>
                <div style={{paddingTop:"2rem"}}>
                  <CRow style={{marginBottom:"0.5"}}>
                    <span style={{width:"100%",whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Bold", fontSize:"180%", color:"#000"}}>{Config.home_stemlearning_third_string1}</span>              
                  </CRow>
                  <div style={{ backgroundImage: "url("+home_stemlearning_image3+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'cover',width:"100%", height:"200px"}}/>
                  <CRow style={{marginBottom:"0rem", float:"center"}}>
                    <p style={{width:"100%",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"80%", color:"#000",lineHeight:"1.5rem"}}>{Config.home_stemlearning_third_string2_mobile}</p>              
                  </CRow>
                  {/* <CRow style={{marginBottom:"0rem",float:"right"}}>
                    <CButton style={{background:"#028ed0",marginTop:"0",width:"13rem",height:"3.5rem", borderRadius:"0px"}}>
                      <span style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff"}}>{Config.home_stemlearning_third_button_string}</span>
                    </CButton>
                  </CRow> */}
                </div>
              </CCol> 
            </CRow>
          </div>
        </div>
      </Hidden>


      {/* Courses */}
      <div id= "buycourses" style={{paddingTop:"4rem", paddingBottom:"4rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
        <Hidden smDown>
          <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"270%", color:"#000000"}}>{Config.home_courses_string1} </p>
          <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"100%", color:"#000000"}}>{Config.home_courses_string2} </p>
        </Hidden>
        <Hidden mdUp>
          <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"210%", color:"#000000"}}>{Config.home_courses_string1} </p>
          <p style={{fontFamily:"Poppins-Regular", fontSize:"80%", color:"#000000"}}>{Config.home_courses_string2_mobile} </p>
        </Hidden>
        <CRow id="joincourses" style={{margin:"0",padding:"0",marginTop:"2rem", marginBottom:'1rem'}}>
          <CCol md="3" />
          <CCol md="6" >
            <CRow  style={{margin:"0",padding:"0"}}>
              <CCol md="1" />
              <CCol md="5" style={{margin:"0",padding:"0"}}>
                <div style={{background:"#ff8b02", width:"100%", height:"4.5rem",display:"flex", justifyContent: "center",alignItems: "center"}}>
                  <span style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"100%", color:"#fff"}}>Courses</span>
                </div>
              </CCol>
              <CCol md="5" style={{margin:"0",padding:"0"}}>
                <div style={{cursor:"pointer", background:"#0000001a", width:"100%", height:"4.5rem",display:"flex", justifyContent: "center",alignItems: "center"}} onClick={(e)=>{e.preventDefault(); gotoLabsSite(); }}>
                  <span style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"100%", color:"#0000007f"}}>Labs</span>
                </div>
              </CCol>
              <CCol md="1" />
            </CRow>
          </CCol>
          <CCol md="3" />
        </CRow>
        <CContainer style={{marginBottom:0}}>
          <CRow className="justify-content-center">
            <Fade in={isLoading} ><CSpinner grow color="primary" style={{textAlign:'center', height:'20'}}/></Fade>
          </CRow>
        </CContainer>
        <CContainer >
          <CRow className="justify-content-center">
            {courseList.map((course) => (
            <CCol xs="12" sm="12" md="4" >
              <CCard style={{borderRadius:'1rem', marginLeft:10,marginRight:10, background:"#f7f7f7"}}>
                <CCardHeader style={{borderTopLeftRadius:"1rem",borderTopRightRadius:"1rem", background:"#028ed020"}}>
                  <CRow className="justify-content-center" style={{textAlign:'center', marginTop:20}}>
                    <span className="h5" style={{fontFamily:"Poppins-Bold",color:"#000000"}}>{course.coursename}</span>
                  </CRow>
                  <CRow className="justify-content-center" style={{textAlign:'center'}}>
                    <span className="h6" style={{fontFamily:"Poppins-Regular", color:"#000000"}}>{sectionList.filter(section => section.courseid === course.courseid).length + ' Sections'}</span>
                  </CRow>
                </CCardHeader>
                <CCardBody style={{paddingLeft:'3px', paddingRight:'3px'}}>
                  {JSON.parse(JSON.parse(course.highlights)).map((highlight) => (
                  <CContainer>
                    <CRow className="justify-content-center" style={{textAlign:'center',marginBottom:20}}>
                      <table>
                        <tr>
                          <td><span className="h6" style={{fontFamily:"Poppins-Regular",color:"#000000"}}>{highlight.name}</span></td>
                        </tr>
                        <tr>
                          <td><span  style={{fontFamily:"Poppins-Regular",color:"#000000",fontSize:'3mm'}}>{highlight.content}</span></td>
                        </tr>
                      </table>
                    </CRow>
                  </CContainer>
                  ))}

                  <CContainer style={{textAlign:'center',marginBottom:30}}>
                    <CRow className="justify-content-center" >
                      <span className="h6" style={{fontFamily:"Poppins-Regular",color:"#000000"}}>Achievements</span>
                    </CRow>
                    <CRow className="justify-content-center" style={{color:'black'}} >
                      {/* <CCol xs="12" sm="8" md="6" xl="4" style={{padding:0}}>                     */}
                        <div style={{borderWidth:'1px',borderStyle:"solid",borderColor:"#ced2d8",borderRadius:"0.6rem",width:'6rem',height:'6rem',padding:"0.5rem"}}>
                          {/* <CRow className="justify-content-center" style={{height:'3rem', alignItems:'flex-end'}}> */}
                            {/* <CIcon name="cib-skype" style={{width:"2.5rem",height:"2.5rem"}} /> */}
                            <CCardBody  style={{backgroundImage:`url(${process.env.REACT_APP_AWS_BUCKET_CLOUDFRONT_URL + '/' + course.coursephoto})`,
                              width:"5rem", height:'5rem',backgroundRepeat:'no-repeat',
                              backgroundPosition: 'center',backgroundSize: 'cover'}}>                      
                            </CCardBody> 
                          {/* </CRow> */}
                          {/* <CRow className="justify-content-center" style={{height:'2.5rem',alignItems:'center'}}><span  style={{color:"#454545", fontSize:'2.5mm', width:"5rem"}}>Introduction to Coding</span></CRow> */}
                        </div>
                      {/* </CCol> */}
                    </CRow>
                  </CContainer>

                  <CContainer style={{textAlign:'center',marginBottom:20}}>
                    <CRow className="justify-content-center" >
                      <span className="h2" style={{fontFamily:"Poppins-Bold",color:"#000"}}>{course.currency + "$" + course.price}</span>
                    </CRow>
                    {/* <span >{courseid}</span> */}
                    {/* <span className="h6" style={{color:"#000000", background:"#fde4d0", padding:5}}>Price Per Class SGD$ 10</span> */}
                  </CContainer>

                  <CContainer style={{textAlign:'center'}}>
                    {
                      loginUser !== null ?
                        course.isPurchased === true?
                          <CButton size="lg" block style={{fontFamily:"Poppins-Bold",color:"#ffffff",background:'#3399ff', marginLeft:0,marginRight:0}} to={`/course/${course.courseid}`} onClick={(e)=>{localStorage.setItem('coursename', course.coursename); }} >{'Go'}</CButton>
                        :
                          isAdding?
                            <CButton size="lg" block style={{fontFamily:"Poppins-Bold",color:"#ffffff",background:"#01256e", marginLeft:0,marginRight:0}} onClick={(e) => { }} >
                                <CSpinner grow size="sm" className="mfe-1" hidden={!isAdding || (curCourseId!==course.courseid)} />
                                {'Buy Now'}
                            </CButton>
                          :
                          <StripeCheckout
                            name={course.coursename}
                            description={sectionList.filter(section => section.courseid === course.courseid).length + ' Sections'}
                            token={(token)=>{ onToken(token,course)}}
                            stripeKey={stripeKey}
                            email={useremail}
                            amount={parseInt(course.price) * 100} // cents
                            currency={course.currency}
                            image="https://stripe.com/img/documentation/checkout/marketplace.png"
                            zipCode={false}
                            allowRememberMe={false}
                          >
                            <CButton size="lg" block style={{fontFamily:"Poppins-Bold",color:"#ffffff",background:"#01256e", marginLeft:0,marginRight:0}} onClick={(e) => { }} >
                              <CSpinner grow size="sm" className="mfe-1" hidden={!isAdding || (curCourseId!==course.courseid)} />
                              {'Buy Now'}
                            </CButton>
                          </StripeCheckout>
                      :
                      <CButton size="lg" block style={{fontFamily:"Poppins-Bold",color:"#ffffff",background:"#01256e", marginLeft:0,marginRight:0}} onClick={ (e) => { e.preventDefault();   setToastClass('success'); setToastMessage('Please login'); showToast(true);}}>{'Buy Now'}</CButton>
                    }
                    <span  style={{fontFamily:"Poppins-Regular",color:"#000000", fontSize:'2.5mm'}}>Cancel Anytime. Same day 100% refund. No questions asked</span>
                  </CContainer>
                </CCardBody>
              </CCard>
            </CCol>
            ))}
          </CRow>
        </CContainer>  
      </div>     
      {/* cout */}
      <Hidden smDown>
      <div style={{ backgroundImage: "url("+home_cout_bg+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <div style={{paddingTop:"3rem", paddingBottom:"2rem", textAlign:"center"}}>
          <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"150%", color:"#fff"}}>{Config.home_cout_string1} </p>
          <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"150%", color:"#fff"}}>{Config.home_cout_string2} </p>
        </div>
      </div>
      </Hidden>
      {/* free trial   */}   
      {/* <Hidden smDown>
        <div style={{paddingTop:"5rem", paddingBottom:"6rem", paddingLeft:"0rem",paddingRight:"2rem", backgroundImage: "url("+home_freetrial_bg+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover'}}>
          <CRow style={{margin:"0"}}>
            <CCol md="7">
            </CCol>
            <CCol md="4" style={{paddingLeft:"0", paddingRight:"2rem", textAlign:"center"}}>          
              <div>
                <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"100%", color:"#00000085"}}>{Config.home_free_trial_string1} </p>
                <CInput
                  type="text"
                  placeholder={Config.home_free_trial_field_string1}
                  autoComplete="name"
                  required
                  style={{fontFamily:"Poppins-Regular", fontSize:"140%",padding:"1.8rem", marginBottom:"1.5rem"}}
                  />
                <CInputGroup style={{marginBottom:"1.5rem"}}>
                  <CInput
                    type="text"
                    placeholder={Config.home_free_trial_field_string2}
                    autoComplete="mobile"
                    required
                    style={{fontFamily:"Poppins-Regular", fontSize:"140%",padding:"1.8rem"}}
                    />
                    <CInputGroupAppend>
                      <CButton style={{background:"#ff8b02",marginTop:"0",width:"8rem",height:"100%", borderRadius:"5px"}}>
                        <span style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff"}}>Send OTP</span>
                      </CButton>
                    </CInputGroupAppend>
                </CInputGroup>
                <CInput
                  type="text"
                  placeholder={Config.home_free_trial_field_string3}
                  autoComplete="email"
                  required
                  style={{fontFamily:"Poppins-Regular", fontSize:"140%",padding:"1.8rem", marginBottom:"1.5rem"}}
                  />
                <CInput
                  type="text"
                  placeholder={Config.home_free_trial_field_string4}
                  autoComplete="state"
                  required
                  style={{fontFamily:"Poppins-Regular", fontSize:"140%",padding:"1.8rem", marginBottom:"1.5rem"}}
                  />
                <CInput
                  type="text"
                  placeholder={Config.home_free_trial_field_string5}
                  autoComplete="grade"
                  required
                  style={{fontFamily:"Poppins-Regular", fontSize:"140%",padding:"1.8rem", marginBottom:"1.5rem"}}
                  />          
                  <CFormGroup variant="custom-checkbox" className="pb-3">
                    <CInputCheckbox custom id="accept" name='checkbox' value='checkbox' />
                    <CLabel variant="custom-checkbox" htmlFor="accept" style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"100%", color:"#00000085"}}>{Config.home_free_trial_check_string} </CLabel>
                  </CFormGroup>                    
                  
                  <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"100%", color:"#ff8b02"}}>{Config.home_free_trial_string2} </p>
                  <CButton style={{background:"#ff8b02",marginTop:"0",width:"14rem",height:"3.2rem", borderRadius:"5px"}}>
                    <span style={{fontFamily:"Poppins-Bold", fontSize:"120%", color:"#fff"}}>{Config.home_free_trial_button_string}</span>
                  </CButton>
              </div>
            </CCol>
            <CCol md="1"/>
          </CRow>
        </div>
      </Hidden>
      <Hidden mdUp>
      <div style={{paddingTop:"5rem", paddingBottom:"6rem", paddingLeft:"2rem",paddingRight:"2rem"}}>
          <CRow className="justify-content-center" style={{margin:"0"}}>           
            <CCol md="6" style={{paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>          
              <div>
                <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"100%", color:"#00000085"}}>{Config.home_free_trial_string1} </p>
                <CInput
                  type="text"
                  placeholder={Config.home_free_trial_field_string1}
                  autoComplete="name"
                  required
                  style={{fontFamily:"Poppins-Regular", fontSize:"140%",padding:"1.8rem", marginBottom:"1.5rem"}}
                  />
                <CInputGroup style={{marginBottom:"1.5rem"}}>
                  <CInput
                    type="text"
                    placeholder={Config.home_free_trial_field_string2}
                    autoComplete="mobile"
                    required
                    style={{fontFamily:"Poppins-Regular", fontSize:"140%",padding:"1.8rem"}}
                    />
                    <CInputGroupAppend>
                      <CButton style={{background:"#ff8b02",marginTop:"0",width:"8rem",height:"100%", borderRadius:"5px"}}>
                        <span style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff"}}>Send OTP</span>
                      </CButton>
                    </CInputGroupAppend>
                </CInputGroup>
                <CInput
                  type="text"
                  placeholder={Config.home_free_trial_field_string3}
                  autoComplete="email"
                  required
                  style={{fontFamily:"Poppins-Regular", fontSize:"140%",padding:"1.8rem", marginBottom:"1.5rem"}}
                  />
                <CInput
                  type="text"
                  placeholder={Config.home_free_trial_field_string4}
                  autoComplete="state"
                  required
                  style={{fontFamily:"Poppins-Regular", fontSize:"140%",padding:"1.8rem", marginBottom:"1.5rem"}}
                  />
                <CInput
                  type="text"
                  placeholder={Config.home_free_trial_field_string5}
                  autoComplete="grade"
                  required
                  style={{fontFamily:"Poppins-Regular", fontSize:"140%",padding:"1.8rem", marginBottom:"1.5rem"}}
                  />          
                  <CFormGroup variant="custom-checkbox" className="pb-3">
                    <CInputCheckbox custom id="accept" name='checkbox' value='checkbox' />
                    <CLabel variant="custom-checkbox" htmlFor="accept" style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"100%", color:"#00000085"}}>{Config.home_free_trial_check_string} </CLabel>
                  </CFormGroup>                    
                  
                  <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"100%", color:"#ff8b02"}}>{Config.home_free_trial_string2} </p>
                  <CButton style={{background:"#ff8b02",marginTop:"0",width:"14rem",height:"3.2rem", borderRadius:"5px"}}>
                    <span style={{fontFamily:"Poppins-Bold", fontSize:"120%", color:"#fff"}}>{Config.home_free_trial_button_string}</span>
                  </CButton>
              </div>
            </CCol>
          </CRow>
        </div>
      </Hidden> */}
      {/* Blogs */}
      <div style={{paddingTop:"4rem", paddingBottom:"4rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
        <Hidden smDown>
        <p style={{paddingBottom:"2rem", whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"270%", color:"#000000"}}>{Config.home_blog_string1} </p>
        </Hidden>
        <Hidden mdUp>
        <p style={{paddingBottom:"2rem", whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"210%", color:"#000000"}}>{Config.home_blog_string1} </p>
        </Hidden>
          <CRow>
            <CCol md="1"/>
            <CCol md="10">
              <CRow className="justify-content-center">
                {blogList.map((blog) => (
                <CCol xs="12" sm="12" md="4" style={{margin:"0", padding:"0"}} >
                  <div style={{borderRadius:'1rem', marginLeft:5,marginRight:5, background:"#f7f7f7"}}>
                    <div style={{borderTopLeftRadius:"1rem",borderTopRightRadius:"1rem", backgroundImage: "url("+blog+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', width:"100%", height:"18rem"}}/>
                    <div style={{padding:'15px'}}>
                        <div style={{marginBottom:"1rem"}}>
                          <div style={{width:"11rem", height:"2.5rem", background:"#028ed0",display:"flex", justifyContent: "center",alignItems: "center"}}>
                            <span style={{fontFamily:"Poppins-Bold", fontSize:"90%", color:"#fff"}}>{Config.home_blog_card_button_string}</span>
                          </div>
                        </div>
                        <div style={{marginBottom:"1rem",textAlign:"left"}}>
                          <span style={{whiteSpace:"pre",fontFamily:"Poppins-Bold", fontSize:"130%", color:"#01256e"}}>{Config.home_blog_card_string1}</span>
                        </div>
                        <div style={{marginBottom:"1.5rem",textAlign:"left"}}>
                          <span style={{whiteSpace:"pre",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#00000099"}}>{Config.home_blog_card_string2}</span>
                        </div>
                        <hr style={{marginBottom:"1.5rem",background:"#00000019"}}/>
                        <CRow style={{margin:"0",padding:"0"}}>
                          <CCol md="6" style={{margin:"0",padding:"0"}}>
                            <div style={{textAlign:"left"}}>
                              <span style={{fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000000cc"}}>{'2 Comments'}</span>
                            </div>
                          </CCol>
                          <CCol md="6" style={{margin:"0",padding:"0"}}>
                            <div style={{textAlign:"right"}}>
                              <span style={{fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000000cc"}}>{'2 Likes'}</span>
                            </div>
                          </CCol>
                        </CRow>
                    </div>
                  </div>
                </CCol>
                ))}
              </CRow>
            </CCol>
            <CCol md="1"/>
          </CRow>
      </div> 

      {/* TESIMONIALS */}
      {/* <div style={{paddingTop:"3rem", paddingBottom:"3rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center", background:"#f7f7f7"}}>
        <Hidden smDown>
        <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"270%", color:"#000000"}}>{Config.home_tesimonials_string1} </p>
        </Hidden>
        <Hidden mdUp>
        <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"210%", color:"#000000"}}>{Config.home_tesimonials_string1} </p>
        </Hidden>
        <CRow className="justify-content-center">
          <CCol md="2"/>
          <CCol md="8">
            <CRow>
              <CCol md="4">
                <div style={{backgroundImage: "url("+home_tesimonials_image1+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'contain', width:"100%", height:"25rem"}}/>
              </CCol>
              <CCol md="8">
                <div style={{backgroundImage: "url("+tesimonials+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'contain', width:"100%", height:"25rem"}}/>
              </CCol>
            </CRow>
          </CCol>
          <CCol md="2"/>
        </CRow>        
      </div> */}

      <CContainer>
        <CRow className="justify-content-center">          
          <CCol sm="12" lg="6">
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={toast}
              autoHideDuration={3000}
              onClose={() => { showToast(false); }}>
              <Alert
                severity={toastClass}
                action={
                  <CButton  onClick={(e) => { e.preventDefault();  showToast(false); }}><CIcon name="cil-x" /></CButton>
                }
              >
                {toastMessage}
              </Alert>
            </Snackbar>
          </CCol>
        </CRow>
      </CContainer>

    </div>
  );
}
