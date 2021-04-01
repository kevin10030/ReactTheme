import React from "react";

import {
  CRow,
  CCol,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { Hidden } from "@material-ui/core";

import { useTheme, makeStyles } from "@material-ui/core/styles";

import Config from "../../common/Config"

import why_us_top from "../../assets/images/home/why_us_top.png"
import why_us_stem from "../../assets/images/home/why_us_stem.png"
import why_us_stem2 from "../../assets/images/home/why_us_stem2.png"
import why_us_block1 from "../../assets/images/home/why_us_block1.png"
import why_us_block2 from "../../assets/images/home/why_us_block2.png"
import why_us_block3 from "../../assets/images/home/why_us_block3.png"

import styles from "../../assets/material/jss/material-dashboard-pro-react/views/pricingPageStyle.js";
const useStyles1 = makeStyles(styles);

export default function WhyUs() {
  const classes1 = useStyles1();

  return (
    <div className={classes1.container} style={{width:"100%",padding:"0",margin:"0"}}>
      <div style={{backgroundImage: "url("+why_us_top+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <CRow className="justify-content-center" style={{margin:"0"}}>
          <Hidden smDown>
            <spin style={{paddingTop:"7rem",paddingBottom:"7rem", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#fff"}}>{'Why Us'}</spin>
          </Hidden>
          <Hidden mdUp>
            <spin style={{paddingTop:"5rem",paddingBottom:"5rem", fontFamily:"Poppins-Bold", fontSize:"230%", color:"#fff"}}>{'Why Us'}</spin>
          </Hidden>
        </CRow>
      </div>
      <Hidden smDown>
        <div style={{paddingTop:"3rem", paddingBottom:"0rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
          <div style={{paddingTop:"3rem", paddingBottom:"4rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
            <CRow  style={{margin:"0",paddingTop:"0"}}>
              <CCol md="1">
              </CCol>    
              <CCol md="5"  style={{padding:"0",paddingRight:"2rem"}}> 
                <div style={{ backgroundImage: "url("+why_us_stem+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'cover',width:"100%", height:"100%"}}/>
              </CCol> 
              <CCol md="5"  style={{padding:"0",paddingLeft:"2rem"}}>
                <div style={{paddingTop:"2rem"}}>
                  <CRow style={{marginBottom:"0.5"}}>
                    <spin style={{width:"100%",whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#000"}}>{Config.whyus_string1}</spin>              
                  </CRow>
                  <CRow style={{marginBottom:"0.5rem"}}>
                    <spin style={{width:"100%",whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"150%", color:"#000"}}>{Config.whyus_string1_sub1}</spin>              
                  </CRow>
                  <CRow style={{marginBottom:"1rem", float:"left"}}>
                    <p style={{width:"100%",whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000",lineHeight:"2rem"}}>{Config.whyus_string1_sub2}</p>              
                  </CRow>
                  <CRow style={{marginBottom:"2rem",float:"left"}}>
                    <CButton style={{background:"#ff8b02",marginTop:"0",width:"13rem",height:"3.5rem", borderRadius:"0px"}}>
                      <spin style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff"}}>{Config.home_stemlearning_first_button_string}</spin>
                    </CButton>
                  </CRow>
                </div>
              </CCol>    
              <CCol md="1"/>            
            </CRow>
          </div>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div style={{paddingTop:"3rem", paddingBottom:"0rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
          <div style={{paddingTop:"0rem", paddingBottom:"4rem",  paddingLeft:"0rem", paddingRight:"0rem", textAlign:"center"}}>
            <CRow  style={{margin:"0",paddingTop:"0"}}>
              <CCol md="12"  style={{padding:"0",paddingLeft:"0rem"}}>
                <div style={{paddingTop:"2rem"}}>
                  <CRow style={{marginBottom:"0.5"}}>
                    <spin style={{width:"100%",whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Bold", fontSize:"250%", color:"#000"}}>{Config.whyus_string1}</spin>              
                  </CRow>
                  <CRow style={{marginBottom:"0.5rem"}}>
                    <spin style={{width:"100%",whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Bold", fontSize:"110%", color:"#000"}}>{Config.whyus_string1_sub1}</spin>              
                  </CRow>
                  <div style={{ backgroundImage: "url("+why_us_stem+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'cover',width:"100%", height:"200px"}}/>
                  <CRow style={{marginBottom:"0rem", float:"center"}}>
                    <p style={{width:"100%",whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"80%", color:"#000",lineHeight:"1.5rem"}}>{Config.whyus_string1_sub2_mobile}</p>              
                  </CRow>
                  <CRow style={{marginBottom:"2rem",float:"left"}}>
                    <CButton style={{background:"#ff8b02",marginTop:"0",width:"13rem",height:"3.5rem", borderRadius:"0px"}}>
                      <spin style={{fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff"}}>{Config.home_stemlearning_first_button_string}</spin>
                    </CButton>
                  </CRow>
                </div>
              </CCol>              
            </CRow>
          </div>
        </div>
      </Hidden>

      <div style={{paddingTop:"4rem", paddingBottom:"4rem",  paddingLeft:"4rem", paddingRight:"4rem", backgroundImage: "url("+why_us_stem2+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <CRow style={{margin:"0",paddingTop:"0"}}>
          <CCol md="6"  style={{padding:"0",paddingRight:"0rem"}}> 
            <CRow  style={{margin:"0",paddingLeft:"2rem"}}>
              <CCol md="6"  style={{padding:"0"}}> 
                <div style={{float:"right",display:"flex",justifyContent:"center",alignItems:"center", backgroundImage: "url("+why_us_block1+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'right', backgroundSize: 'contain',width:"15.3rem", height:"18rem"}}>
                  <div >
                    <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Bold", fontSize:"130%", color:"#fff",lineHeight:"2rem"}}>{Config.whyus_string2}</p>              
                    <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#fff",lineHeight:"2rem"}}>{Config.whyus_string2_sub1}</p>              
                  </div>
                </div>
                <div style={{float:"right",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"3rem", backgroundImage: "url("+why_us_block2+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'right', backgroundSize: 'contain',width:"15.3rem", height:"18rem"}}>
                  <div >
                    <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Bold", fontSize:"130%", color:"#fff",lineHeight:"2rem"}}>{Config.whyus_string2}</p>              
                    <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#fff",lineHeight:"2rem"}}>{Config.whyus_string2_sub1}</p>              
                  </div>
                </div>
              </CCol>                
              <CCol md="6"  style={{padding:"0"}}> 
                <div style={{float:"right",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"3rem", backgroundImage: "url("+why_us_block3+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'right', backgroundSize: 'contain',width:"15.3rem", height:"18rem"}}>
                  <div >
                    <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Bold", fontSize:"130%", color:"#fff",lineHeight:"2rem"}}>{Config.whyus_string2}</p>              
                    <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#fff",lineHeight:"2rem"}}>{Config.whyus_string2_sub1}</p>              
                  </div>
                </div>
                <div style={{float:"right",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"3rem", backgroundImage: "url("+why_us_block1+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'right', backgroundSize: 'contain',width:"15.3rem", height:"18rem"}}>
                  <div >
                    <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Bold", fontSize:"130%", color:"#fff",lineHeight:"2rem"}}>{Config.whyus_string2}</p>              
                    <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#fff",lineHeight:"2rem"}}>{Config.whyus_string2_sub1}</p>              
                  </div>
                </div>
              </CCol>
            </CRow>
          </CCol> 
          <CCol md="6">
          </CCol>
        </CRow>
      </div>
    </div>
  );
}
