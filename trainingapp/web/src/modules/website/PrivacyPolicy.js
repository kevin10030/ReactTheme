import React from "react";

import {
  CRow,
  CCol
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { Hidden } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";

import Config from "../../common/Config"

import privacy_policy from "../../assets/images/home/privacy_policy.png"


import styles from "../../assets/material/jss/material-dashboard-pro-react/views/pricingPageStyle.js";
const useStyles1 = makeStyles(styles);

export default function PrivacyPolicy() {
  const classes1 = useStyles1();

  return (
    <div className={classes1.container} style={{width:"100%",padding:"0",margin:"0"}}>
      <div style={{backgroundImage: "url("+privacy_policy+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <CRow className="justify-content-center" style={{margin:"0"}}>
          <Hidden smDown>
            <spin style={{paddingTop:"7rem",paddingBottom:"7rem", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#fff"}}>{'Privacy Policy'}</spin>
          </Hidden>
          <Hidden mdUp>
            <spin style={{paddingTop:"5rem",paddingBottom:"5rem", fontFamily:"Poppins-Bold", fontSize:"230%", color:"#fff"}}>{'Privacy Policy'}</spin>
          </Hidden>
        </CRow>
      </div>
      <div style={{paddingTop:"3rem", paddingBottom:"7rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
        <CRow className="justify-content-center">          
        <CCol md="10">
            <div style={{textAlign:"left"}}>
              <p style={{fontFamily:"Poppins-Bold", fontSize:"120%", color:"#000"}}>{Config.terms_string1}</p>
            </div>
            <div style={{textAlign:"left"}}>
              <Hidden smDown>
                <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string1}</p>
              </Hidden>
              <Hidden mdUp>
                <p style={{fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string1_mobile}</p>
              </Hidden>              
            </div>
            <div style={{textAlign:"left"}}>
              <p style={{fontFamily:"Poppins-Bold", fontSize:"120%", color:"#000"}}>{Config.terms_string2}</p>
            </div>
            <div style={{textAlign:"left"}}>
              <Hidden smDown>
                <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string2}</p>
              </Hidden>
              <Hidden mdUp>
                <span style={{fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string2_mobile1}</span><br/>
                <br/><br/>
                <span style={{fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string2_mobile2}</span><br/>
                <span style={{fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string2_mobile3}</span><br/>
                <span style={{fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string2_mobile4}</span><br/>
                <span style={{fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string2_mobile5}</span><br/>
                <br/><br/>
                <span style={{fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string2_mobile6}</span><br/>
                <br/><br/>
              </Hidden>
            </div>
            <div style={{textAlign:"left"}}>
              <p style={{fontFamily:"Poppins-Bold", fontSize:"120%", color:"#000"}}>{Config.terms_string3}</p>
            </div>
            <div style={{textAlign:"left"}}>
              <Hidden smDown>
                <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string3}</p>
              </Hidden>
              <Hidden mdUp>
                <p style={{fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string3_mobile}</p>
              </Hidden>
            </div>
            <div style={{textAlign:"left"}}>
              <p style={{fontFamily:"Poppins-Bold", fontSize:"120%", color:"#000"}}>{Config.terms_string4}</p>
            </div>
            <div style={{textAlign:"left"}}>
              <Hidden smDown>
                <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string4}</p>
              </Hidden>
              <Hidden mdUp>
                <p style={{fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string4_mobile}</p>
              </Hidden>
            </div>
            <div style={{textAlign:"left"}}>
              <p style={{fontFamily:"Poppins-Bold", fontSize:"120%", color:"#000"}}>{Config.terms_string5}</p>
            </div>
            <div style={{textAlign:"left"}}>
              <Hidden smDown>
                <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string5}</p>
              </Hidden>
              <Hidden mdUp>
                <p style={{fontFamily:"Poppins-Regular", fontSize:"110%", color:"#000"}}>{Config.terms_sub_string5_mobile}</p>
              </Hidden>
            </div>
          </CCol>
        </CRow>
      </div>    
    </div>
  );
}
