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

import home_cout_bg from "../../assets/images/home/home_cout_bg.png"
import about_us_top  from "../../assets/images/home/about_us_top.png"
import about_us_blue_checkbox from "../../assets/images/home/about_us_blue_checkbox.png"
import home_second_checkbox from "../../assets/images/home/home_second_checkbox.png"
import about_us_vision  from "../../assets/images/home/about_us_vision.png"
import about_us_expertise_analytics from "../../assets/images/home/about_us_expertise_analytics.png"
import about_us_expertise_cloud from "../../assets/images/home/about_us_expertise_cloud.png"
import about_us_expertise_iot from "../../assets/images/home/about_us_expertise_iot.png"
import about_us_bottom from "../../assets/images/home/about_us_bottom.png"
import about_us_expertise_area from "../../assets/images/home/about_us_expertise_area.png"

import styles from "../../assets/material/jss/material-dashboard-pro-react/views/pricingPageStyle.js";
const useStyles1 = makeStyles(styles);

export default function AboutPage() {
  const classes1 = useStyles1();

  return (
    <div className={classes1.container} style={{width:"100%",padding:"0",margin:"0"}}>
      <div style={{backgroundImage: "url("+about_us_top+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <CRow className="justify-content-center" style={{margin:"0"}}>
          <Hidden smDown>
            <spin style={{paddingTop:"7rem",paddingBottom:"7rem", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#fff"}}>{'About Us'}</spin>
          </Hidden>
          <Hidden mdUp>
            <spin style={{paddingTop:"5rem",paddingBottom:"5rem", fontFamily:"Poppins-Bold", fontSize:"230%", color:"#fff"}}>{'About Us'}</spin>          
          </Hidden>
        </CRow>
      </div>
      <div style={{paddingTop:"3rem", paddingBottom:"0rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>        
        <Hidden smDown>
          <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"250%", color:"#000000"}}>{Config.aboutus_string1} </p>
          <div style={{paddingTop:"3rem", paddingBottom:"4rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
            <CRow  style={{margin:"0",paddingTop:"0"}}>
              <CCol md="1">
              </CCol>    
              <CCol md="4"  style={{padding:"0",paddingRight:"0rem"}}>             
                <div style={{float:"left", backgroundImage: "url("+about_us_vision+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'contain',width:"100%", height:"100%"}}/>                          
              </CCol> 
              <CCol md="6"  style={{padding:"0",marginLeft:"-5rem"}}>
                <div style={{marginTop:"3rem"}}>
                  <CRow style={{marginBottom:"0rem"}}>
                    <p style={{width:"100%",whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"150%", color:"#000"}}>{Config.aboutus_string1_sub1}</p>              
                  </CRow>
                  <CRow style={{marginBottom:"0.5rem"}}>
                    <spin style={{width:"100%",whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000", lineHeight:"1.7rem"}}>{Config.aboutus_string1_sub1_content}</spin>              
                  </CRow>
                </div>
                <div style={{marginLeft:"5rem",marginTop:"5rem"}}>
                  <CRow style={{marginBottom:"0rem"}}>
                    <p style={{width:"100%",whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"150%", color:"#000"}}>{Config.aboutus_string1_sub2}</p>              
                  </CRow>
                  <CRow style={{marginBottom:"1rem"}}>
                    <div style={{marginRight:"0.5rem", backgroundImage: "url("+about_us_blue_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                    <spin style={{whiteSpace: "pre",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000000",lineHeight:"1.7rem"}}>{Config.aboutus_string1_sub2_content1}</spin>
                  </CRow>
                  <CRow style={{marginBottom:"1rem"}}>
                    <div style={{marginRight:"0.5rem", backgroundImage: "url("+about_us_blue_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                    <spin style={{whiteSpace: "pre",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000000",lineHeight:"1.7rem"}}>{Config.aboutus_string1_sub2_content2}</spin>
                  </CRow>
                  <CRow style={{marginBottom:"1rem"}}>
                    <div style={{marginRight:"0.5rem", backgroundImage: "url("+about_us_blue_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                    <spin style={{whiteSpace: "pre",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000000",lineHeight:"1.7rem"}}>{Config.aboutus_string1_sub2_content3}</spin>
                  </CRow>
                </div>
              </CCol>    
              <CCol md="1"/>            
            </CRow>
          </div>
        </Hidden>
        <Hidden mdUp>
          <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"210%", color:"#000000"}}>{Config.aboutus_string1} </p>
          <div style={{paddingTop:"2rem", paddingBottom:"4rem",  paddingLeft:"1rem", paddingRight:"1rem", textAlign:"center"}}>
            <CRow  className="justify-content-center" style={{margin:"0",paddingTop:"0"}}>
              <CCol md="12"  style={{padding:"0",marginLeft:"0rem"}}>
                <div style={{marginTop:"0rem"}}>
                  <CRow style={{marginBottom:"0rem"}}>
                    <p style={{width:"100%",whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"150%", color:"#000"}}>{Config.aboutus_string1_sub1}</p>              
                  </CRow>
                  <CRow style={{marginBottom:"0.5rem"}}>
                    <spin style={{width:"100%",textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000", lineHeight:"1.7rem"}}>{Config.aboutus_string1_sub1_content_mobile}</spin>              
                  </CRow>
                </div>
                <div style={{marginLeft:"0rem",marginTop:"2rem"}}>
                  <CRow style={{marginBottom:"0rem"}}>
                    <p style={{width:"100%",whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"150%", color:"#000"}}>{Config.aboutus_string1_sub2}</p>              
                  </CRow>
                  <CRow style={{marginBottom:"1rem"}}>
                    <CCol className="col-1" style={{padding:"0"}}>                    
                      <div style={{marginRight:"0rem", backgroundImage: "url("+about_us_blue_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>                    
                    </CCol>
                    <CCol className="col-11" style={{padding:"0"}}>                    
                      <spin style={{float:"left",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000000",lineHeight:"1.7rem"}}>{Config.aboutus_string1_sub2_content1_mobile}</spin>
                    </CCol>
                  </CRow>
                  <CRow style={{marginBottom:"1rem"}}>
                    <CCol className="col-1" style={{padding:"0"}}>                    
                      <div style={{marginRight:"0rem", backgroundImage: "url("+about_us_blue_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                    </CCol>
                    <CCol className="col-11" style={{padding:"0"}}>                    
                      <spin style={{float:"left",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000000",lineHeight:"1.7rem"}}>{Config.aboutus_string1_sub2_content2}</spin>
                    </CCol>
                  </CRow>
                  <CRow style={{marginBottom:"1rem"}}>
                    <CCol className="col-1" style={{padding:"0"}}>                    
                      <div style={{marginRight:"0.5rem", backgroundImage: "url("+about_us_blue_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1.5rem", width:"1.5rem"}}/>
                    </CCol>
                    <CCol className="col-11" style={{padding:"0"}}>                    
                      <spin style={{float:"left",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#000000",lineHeight:"1.7rem"}}>{Config.aboutus_string1_sub2_content3}</spin>
                    </CCol>
                  </CRow>
                </div>
              </CCol>    
            </CRow>
          </div>
        </Hidden>
      </div> 

      <div style={{ backgroundImage: "url("+home_cout_bg+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <div style={{paddingTop:"3rem", paddingBottom:"2rem", paddingLeft:"2rem",paddingRight:"2rem", textAlign:"center"}}>
          <Hidden smDown>
            <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"150%", color:"#fff"}}>{Config.home_cout_string1} </p>
            <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"150%", color:"#fff"}}>{Config.home_cout_string2} </p>
          </Hidden>
          <Hidden mdUp>
            <p style={{fontFamily:"Poppins-Regular", fontSize:"110%", color:"#fff"}}>{Config.home_cout_string1} </p>
            <p style={{whiteSpace: "pre",fontFamily:"Poppins-Regular", fontSize:"110%", color:"#fff"}}>{Config.home_cout_string2} </p>
          </Hidden>
        </div>
      </div>

      <div>
        <div style={{ backgroundImage: "url("+about_us_expertise_area+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', width:"100%",height:"30rem"}}>
          <div style={{paddingTop:"4rem", textAlign:"center"}}>
            <Hidden smDown>
              <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"270%", color:"#fff"}}>{Config.aboutus_string2} </p>
            </Hidden>
            <Hidden mdUp>
              <p style={{whiteSpace: "pre",fontFamily:"Poppins-Bold", fontSize:"230%", color:"#fff"}}>{Config.aboutus_string2} </p>
            </Hidden>            
          </div>
        </div>
        <div style={{marginTop:"-17rem", paddingLeft:"4rem", paddingRight:"4rem", textAlign:"center"}}>
          <CRow className="justify-content-center">
            <CCol md="10">
              <CRow className="justify-content-center">
                <CCol md="4">
                  <div style={{paddingTop:"5rem", display:"flex",justifyContent:"center",alignItems:"center", backgroundImage: "url("+about_us_expertise_iot+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'contain',width:"100%", height:"23rem"}}>
                    <Hidden smDown>
                      <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff",lineHeight:"1.5rem"}}>{Config.aboutus_string2_content1}</p>                                  
                    </Hidden>
                    <Hidden mdUp>
                      <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"80%", color:"#fff",lineHeight:"1.5rem"}}>{Config.aboutus_string2_content1}</p>                                  
                    </Hidden>                    
                  </div>
                </CCol>
                <CCol md="4">
                  <div style={{paddingTop:"5rem", display:"flex",justifyContent:"center",alignItems:"center", backgroundImage: "url("+about_us_expertise_cloud+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'contain',width:"100%", height:"23rem"}}>
                    <Hidden smDown>
                      <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff",lineHeight:"1.5rem"}}>{Config.aboutus_string2_content2}</p>                                  
                    </Hidden>
                    <Hidden mdUp>
                      <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"80%", color:"#fff",lineHeight:"1.5rem"}}>{Config.aboutus_string2_content2}</p>                                  
                    </Hidden>
                  </div>
                </CCol>
                <CCol md="4">
                  <div style={{paddingTop:"5rem", display:"flex",justifyContent:"center",alignItems:"center", backgroundImage: "url("+about_us_expertise_analytics+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'contain',width:"100%", height:"23rem"}}>
                    <Hidden smDown>
                      <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"100%", color:"#fff",lineHeight:"1.5rem"}}>{Config.aboutus_string2_content3}</p>                                  
                    </Hidden>
                    <Hidden mdUp>
                      <p style={{whiteSpace: "pre",textAlign:"center", fontFamily:"Poppins-Regular", fontSize:"80%", color:"#fff",lineHeight:"1.5rem"}}>{Config.aboutus_string2_content3}</p>                                  
                    </Hidden>                    
                  </div>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </div>
      </div>

      <Hidden smDown>
        <div style={{paddingTop:"3rem", paddingBottom:"0rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
          <div style={{paddingTop:"3rem", paddingBottom:"4rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
            <CRow  style={{margin:"0",paddingTop:"0"}}>
              <CCol md="1">
              </CCol>    
              <CCol md="5"  style={{padding:"0",paddingRight:"2rem"}}> 
                <div style={{ backgroundImage: "url("+about_us_bottom+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'left', backgroundSize: 'contain',width:"100%", height:"100%"}}/>
              </CCol> 
              <CCol md="5"  style={{padding:"0",paddingLeft:"2rem"}}>
                <div>
                  <CRow style={{marginBottom:"0.5"}}>
                    <spin style={{whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#ff8b02"}}>{"About "}</spin>              
                    <spin style={{textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#028ed0"}}>{'Us'}</spin>              
                  </CRow>
                  <CRow style={{marginBottom:"1rem"}}>
                    <spin style={{width:"100%",whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#00000093",lineHeight:"1.5rem"}}>{Config.aboutus_string3}</spin>              
                  </CRow>
                  <div>
                    <CRow style={{marginBottom:"0rem"}}>
                      <p style={{width:"100%",whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"110%", color:"#000"}}>{Config.aboutus_string4}</p>              
                    </CRow>
                    <CRow style={{marginBottom:"0.5rem"}}>
                      <div style={{marginRight:"0.5rem", backgroundImage: "url("+home_second_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1rem", width:"1rem"}}/>
                      <spin style={{whiteSpace: "pre",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#00000093",lineHeight:"1.5rem"}}>{Config.aboutus_string4_content1}</spin>
                    </CRow>
                    <CRow style={{marginBottom:"0.5rem"}}>
                      <div style={{marginRight:"0.5rem", backgroundImage: "url("+home_second_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1rem", width:"1rem"}}/>
                      <spin style={{whiteSpace: "pre",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#00000093",lineHeight:"1.5rem"}}>{Config.aboutus_string4_content2}</spin>
                    </CRow>
                    <CRow style={{marginBottom:"0.5rem"}}>
                      <div style={{marginRight:"0.5rem", backgroundImage: "url("+home_second_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1rem", width:"1rem"}}/>
                      <spin style={{whiteSpace: "pre",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#00000093",lineHeight:"1.5rem"}}>{Config.aboutus_string4_content3}</spin>
                    </CRow>
                  </div>
                </div>
              </CCol>    
              <CCol md="1"/>            
            </CRow>
          </div>
        </div>    
      </Hidden>
      <Hidden mdUp>
        <div style={{paddingTop:"3rem", paddingBottom:"0rem",  paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
          <div style={{paddingTop:"3rem", paddingBottom:"4rem",  paddingLeft:"1rem", paddingRight:"1rem", textAlign:"center"}}>
            <CRow className="justify-content-center" style={{margin:"0",paddingTop:"0"}}>
              <CCol md="12"  style={{padding:"0",paddingLeft:"0rem"}}>
                <div>
                  <CRow style={{marginBottom:"0.5"}}>
                    <spin style={{whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#ff8b02"}}>{"About "}</spin>              
                    <spin style={{textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"270%", color:"#028ed0"}}>{'Us'}</spin>              
                  </CRow>
                  <CRow style={{marginBottom:"1rem"}}>
                    <spin style={{width:"100%",textAlign:"left", fontFamily:"Poppins-Regular", fontSize:"90%", color:"#00000093",lineHeight:"1.5rem"}}>{Config.aboutus_string3_mobile}</spin>              
                  </CRow>
                  <div>
                    <CRow style={{marginBottom:"0rem"}}>
                      <p style={{width:"100%",whiteSpace: "pre",textAlign:"left", fontFamily:"Poppins-Bold", fontSize:"110%", color:"#000"}}>{Config.aboutus_string4}</p>              
                    </CRow>
                    <CRow style={{marginBottom:"0.5rem"}}>
                      <CCol className="col-1" style={{padding:"0"}}>
                        <div style={{marginRight:"0.5rem", backgroundImage: "url("+home_second_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1rem", width:"1rem"}}/>
                      </CCol>
                      <CCol className="col-11" style={{padding:"0"}}>
                        <spin style={{float:"left",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#00000093",lineHeight:"1.5rem"}}>{Config.aboutus_string4_content1_mobile}</spin>
                      </CCol>
                    </CRow>
                    <CRow style={{marginBottom:"0.5rem"}}>
                      <CCol className="col-1" style={{padding:"0"}}>
                        <div style={{marginRight:"0.5rem", backgroundImage: "url("+home_second_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1rem", width:"1rem"}}/>
                      </CCol>
                      <CCol className="col-11" style={{padding:"0"}}>
                        <spin style={{float: "left",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#00000093",lineHeight:"1.5rem"}}>{Config.aboutus_string4_content2_mobile}</spin>
                      </CCol>
                    </CRow>
                    <CRow style={{marginBottom:"0.5rem"}}>
                      <CCol className="col-1" style={{padding:"0"}}>
                        <div style={{marginRight:"0.5rem", backgroundImage: "url("+home_second_checkbox+")",backgroundRepeat:'no-repeat',  backgroundPosition: 'center', backgroundSize: 'cover', height:"1rem", width:"1rem"}}/>
                      </CCol>
                      <CCol className="col-11" style={{padding:"0"}}>
                        <spin style={{float: "left",textAlign:"left",fontFamily:"Poppins-Regular", fontSize:"90%", color:"#00000093",lineHeight:"1.5rem"}}>{Config.aboutus_string4_content3_mobile}</spin>
                      </CCol>
                    </CRow>
                  </div>
                </div>
              </CCol>    
            </CRow>
          </div>
        </div>    
      </Hidden>

    </div>
  );
}
