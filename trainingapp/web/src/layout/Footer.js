/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { CInput,CCardBody, CCol, CRow, CContainer,CButton} from  '@coreui/react'

import Config from "../common/Config"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { Hidden } from "@material-ui/core";

import footer_bg from "../assets/images/footer/footer_bg.png";
import footer_logo_white from "../assets/images/footer/footer_white_logo.png";

import footer_facebook_icon from "../assets/images/footer/footer_facebook_icon.png";
import footer_wechat from "../assets/images/footer/footer_wechat.png";
import footer_twitter from "../assets/images/footer/footer_twitter.png";
import footer_save from "../assets/images/footer/footer_save.png";

import styles from "../assets/material/jss/material-dashboard-pro-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
    const classes = useStyles();
    const { fluid, white, rtlActive } = props;
    var container = cx({
        [classes.container]: !fluid,
        [classes.containerFluid]: fluid,
        [classes.whiteColor]: white
    });
    var anchor =
        classes.a +
        cx({
            [" " + classes.whiteColor]: white
        });
    var block = cx({
        [classes.block]: true,
        [classes.whiteColor]: white,
        fontFamily:"Poppins-Regular",
        textTransform: "none"
    });
    return (
        <footer className = { classes.footer } style={{ backgroundImage: "url("+footer_bg+")",backgroundPosition: 'center',backgroundSize: 'cover',padding:0}}>
            <CContainer>
                <CRow className="justify-content-center" style={{paddingTop:"50px", paddingBottom:"80px", paddingLeft:"30px",paddingRight:"30px"}}>
                    <CCol md="6" >
                       <CCardBody style={{ backgroundImage: "url("+footer_logo_white+")",backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width:"140px", height:"65px"}}> </CCardBody>
                       <div style={{marginTop:"15px", marginBottom:"15px"}}>
                            <Hidden smDown>
                                <span style={{whiteSpace:"pre",fontFamily:"Poppins-Regular", fontSize:"90%"}}>
                                    {Config.footer_string1}
                                </span>                   
                            </Hidden>
                            <Hidden mdUp>
                                <span style={{fontFamily:"Poppins-Regular", fontSize:"90%"}}>
                                    {Config.footer_string1_mobile}
                                </span>                   
                            </Hidden>
                       </div>
                       <Hidden smDown>
                       <CRow style={{paddingRight:"70px"}}>
                            <CCol md="2" >
                                <CCardBody style={{cursor:"pointer", backgroundImage: "url("+footer_facebook_icon+")",backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width:"35px", height:"35px"}}> </CCardBody>
                            </CCol>
                            <CCol md="2" >
                                <CCardBody style={{cursor:"pointer", backgroundImage: "url("+footer_wechat+")",backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width:"35px", height:"35px"}}> </CCardBody>
                            </CCol>
                            <CCol md="2" >
                                <CCardBody style={{cursor:"pointer", backgroundImage: "url("+footer_twitter+")",backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width:"35px", height:"35px"}}> </CCardBody>
                            </CCol>
                            <CCol md="2" >
                                <CCardBody style={{cursor:"pointer", backgroundImage: "url("+footer_save+")",backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width:"35px", height:"35px"}}> </CCardBody>
                            </CCol>
                       </CRow> 
                       </Hidden>
                       <Hidden mdUp>
                        <CRow style={{paddingRight:"0px"}}>
                            <div style={{padding:"10px",marginRight:"0px"}}>
                            <CCardBody style={{cursor:"pointer", backgroundImage: "url("+footer_facebook_icon+")",backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width:"35px", height:"35px"}}> </CCardBody>
                            </div>
                            <div style={{padding:"10px",marginRight:"0px"}}>
                            <CCardBody style={{marginRight:"10px",cursor:"pointer", backgroundImage: "url("+footer_wechat+")",backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width:"35px", height:"35px"}}> </CCardBody>
                            </div>
                            <div style={{padding:"10px",marginRight:"0px"}}>
                            <CCardBody style={{marginRight:"10px",cursor:"pointer", backgroundImage: "url("+footer_twitter+")",backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width:"35px", height:"35px"}}> </CCardBody>
                            </div>
                            <div style={{padding:"10px",marginRight:"0px"}}>
                            <CCardBody style={{cursor:"pointer", backgroundImage: "url("+footer_save+")",backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width:"35px", height:"35px"}}> </CCardBody>
                            </div>
                        </CRow> 
                       </Hidden>
                    </CCol>
                    {/* <CCol md="4" >
                       <div style={{marginTop:"15px", marginBottom:"15px"}}> <span style={{fontFamily:"Poppins-Bold", fontSize:"140%"}}>NEWSLETTER</span> </div>
                       <div style={{marginTop:"15px", marginBottom:"15px"}}> <span style={{whiteSpace:"pre", fontFamily:"Poppins-Regular", fontSize:"90%"}}>{Config.newsletter_string1}</span> </div>
                        <CInput type="text"
                            placeholder="Enter mail id"
                            autoComplete="email"
                            type = "email"
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                            style={{border:"0",borderRadius:"0", background:"#ffffff",height:"40px",marginTop:"15px", marginBottom:"15px",marginRight:"15px", paddingTop:"10px",paddingLeft:"10px"}}
                            />                
                       <CButton style={{color:"black", background:"white", width:"120px", height:"45px"}}>
                            Submit
                       </CButton>
                    </CCol> */}
                    <Hidden smDown>
                        <CCol md="6" style={{paddingLeft:"50px"}} >
                        <div style={{marginTop:"15px", marginBottom:"15px"}}> <span style={{fontFamily:"Poppins-Bold", fontSize:"140%"}}>CONTACT US</span> </div>
                        <div style={{marginTop:"15px", marginBottom:"15px"}}> <span style={{whiteSpace:"pre",fontFamily:"Poppins-Regular", fontSize:"90%"}}>{Config.footer_contactus_string1}</span> </div>
                        <div style={{marginTop:"15px", marginBottom:"15px"}}> <span style={{whiteSpace:"pre",fontFamily:"Poppins-Regular", fontSize:"90%"}}>{Config.footer_contactus_string2}</span> </div>                                          
                        <div style={{marginTop:"15px", marginBottom:"15px"}}> <span style={{whiteSpace:"pre", fontFamily:"Poppins-Regular", fontSize:"90%"}}>{Config.footer_contactus_string3}</span> </div>                                          
                        </CCol>
                    </Hidden>
                    <Hidden mdUp>
                        <CCol md="6" style={{paddingLeft:"15px"}} >
                        <div style={{marginTop:"15px", marginBottom:"15px"}}> <span style={{fontFamily:"Poppins-Bold", fontSize:"140%"}}>CONTACT US</span> </div>
                        <div style={{marginTop:"15px", marginBottom:"15px"}}> <span style={{whiteSpace:"pre",fontFamily:"Poppins-Regular", fontSize:"90%"}}>{Config.footer_contactus_string1}</span> </div>
                        <div style={{marginTop:"15px", marginBottom:"15px"}}> <span style={{whiteSpace:"pre",fontFamily:"Poppins-Regular", fontSize:"90%"}}>{Config.footer_contactus_string2}</span> </div>                                          
                        <div style={{marginTop:"15px", marginBottom:"15px"}}> <span style={{fontFamily:"Poppins-Regular", fontSize:"90%"}}>{Config.footer_contactus_string3_mobile}</span> </div>                                          
                        </CCol>
                    </Hidden>
                </CRow>                
            </CContainer>
            <Hidden smDown>
                <div style={{background:"#ffffff3f", height:"75px"}}>
                    <div className={container} >
                        <div className = { classes.left } style={{margin:"13px"}} >
                            <List className = { classes.list } >
                                <ListItem className = { classes.inlineBlock } >
                                    <a href = "/#/auth/terms-and-conditions" className = { block } style={{fontFamily:"Poppins-Regular",textTransform: "none", fontSize:"110%"}}> { "Terms and Conditions" } </a>
                                </ListItem>
                                <ListItem className = { classes.inlineBlock } >
                                    <a href = "/#/auth/privacy-policy" className = { block } style={{fontFamily:"Poppins-Regular",textTransform: "none", fontSize:"110%"}}> { "Privacy Policy" } </a>
                                </ListItem>
                                <ListItem className = { classes.inlineBlock } >
                                    <a href = "/#/auth/about" className = { block } style={{fontFamily:"Poppins-Regular",textTransform: "none", fontSize:"110%"}}> { "About Us" } </a>
                                </ListItem>
                                <ListItem className = { classes.inlineBlock } >
                                    <a href = "/#/auth/why-us" className = { block } style={{fontFamily:"Poppins-Regular",textTransform: "none", fontSize:"110%"}}> { "Why Us" } </a>
                                </ListItem>                            
                                <ListItem className = { classes.inlineBlock } >
                                    <a href = "/#/auth/contact" className = { block } style={{fontFamily:"Poppins-Regular",textTransform: "none", fontSize:"110%"}}> { "Contact Us" } </a>
                                </ListItem>
                            </List>
                        </div>
                        <p className = { classes.right } style={{fontFamily:"Poppins-Regular", margin:"13px",fontSize:"110%"}}>
                            {'© Dataplush ' }
                            {new Date().getFullYear()}
                            {'.'}
                        </p>
                    </div>
                </div>
            </Hidden>

            <Hidden mdUp>
            
                <div style={{background:"#ffffff3f", height:"150px", display:"flex",justifyContent:'center',alignItems:'center'}}>
                    <div className={container} >
                        <div className = { classes.left } style={{margin:"8px"}} >
                            <List className = { classes.list } >
                                <ListItem className = { classes.inlineBlock } >
                                    <a href = "/#/auth/terms-and-conditions" className = { block } style={{fontFamily:"Poppins-Regular",textTransform: "none", fontSize:"80%"}}> { "Terms and Conditions" } </a>
                                </ListItem>
                                <ListItem className = { classes.inlineBlock } >
                                    <a href = "/#/auth/privacy-policy" className = { block } style={{fontFamily:"Poppins-Regular",textTransform: "none", fontSize:"80%"}}> { "Privacy Policy" } </a>
                                </ListItem>
                                <ListItem className = { classes.inlineBlock } >
                                    <a href = "/#/auth/about" className = { block } style={{fontFamily:"Poppins-Regular",textTransform: "none", fontSize:"80%"}}> { "About Us" } </a>
                                </ListItem>
                                <ListItem className = { classes.inlineBlock } >
                                    <a href = "/#/auth/why-us" className = { block } style={{fontFamily:"Poppins-Regular",textTransform: "none", fontSize:"80%"}}> { "Why Us" } </a>
                                </ListItem>                            
                                <ListItem className = { classes.inlineBlock } >
                                    <a href = "/#/auth/contact" className = { block } style={{fontFamily:"Poppins-Regular",textTransform: "none", fontSize:"80%"}}> { "Contact Us" } </a>
                                </ListItem>
                                <ListItem className = { classes.inlineBlock } >
                                    <p  style={{fontFamily:"Poppins-Regular", margin:"8px",fontSize:"80%"}}>
                                        {'© Dataplush ' }
                                        {new Date().getFullYear()}
                                        {'.'}
                                    </p>
                                </ListItem>
                            </List>
                        </div>
                        {/* <p className = { classes.right } style={{fontFamily:"Poppins-Regular", margin:"8px",fontSize:"80%"}}>
                            {'© Dataplush ' }
                            {new Date().getFullYear()}
                            {'.'}
                        </p> */}
                    </div>
                </div>
            </Hidden>
        </footer>
    );
}

Footer.propTypes = {
    fluid: PropTypes.bool,
    white: PropTypes.bool,
    rtlActive: PropTypes.bool
};
