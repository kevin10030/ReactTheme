import React from "react";
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
  CSpinner
} from '@coreui/react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import axios from 'axios';
import Config from "../../common/Config"

import { NavLink as RouterLink, Route } from "react-router-dom";

import styles from "../../assets/material/jss/material-dashboard-pro-react/views/pricingPageStyle.js";
const useStyles = makeStyles(styles);

export default function SectionsPage(props) {
  const { useState } = React;
  const classes = useStyles();
  const [details, setDetails] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [currentPagination, setCurrentPagination] = useState(5)
  const getLastVal = (currentPage) => {
    if (currentPage * currentPagination < sectionList.length)
      return currentPage * currentPagination;
    return sectionList.length;
  }

  const fields = [
    { key: 'sectionname', label:'Section Name', _style: { width: '30%' } },
  ]

  const [loading, setLoading] = React.useState(false)
  const [sectionList, setSectionList] = React.useState([])


  React.useEffect(() => {
    getSectionList();
  }, []);

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



  return (
    <div className={classes.container}>
      {/* <CContainer style={{marginBottom:0}}>
       <CRow className="justify-content-center">
         <Fade in={loading} ><CSpinner grow color="primary" style={{textAlign:'center', height:'20'}}/></Fade>
       </CRow>
      </CContainer> */}
      <CContainer>
        <CContainer >
          <CRow className="justify-content-center">
            <CCol xl="6">
              <CCard custom>
                <CCardHeader style={{paddingBottom:"0px"}}>
                  <h5><span style={{color:"#000000", textAlign:'center'}}> Sections </span></h5>
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    items={sectionList}
                    fields={fields}
                    // columnFilter
                    tableFilter={false}
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
                      setCurrentPage(val)
                    }
                    }
                    // onPagesChange={(val) => console.log('new pages:', val)}
                    onPaginationChange={(val) => {
                      setCurrentPagination(val);
                    }}
                    scopedSlots={{
                      'sectionname':
                      (item) => (
                        <td>
                          <CLink  to={`/auth/section/${item.sectionid}`}>{item.sectionname}</CLink>
                        </td>
                      )
                    }}
                  />
                  <div style={{ textAlign: 'right' }}>{
                    ((currentPage - 1) * currentPagination + 1) + '-' + getLastVal(currentPage) + ' of ' + sectionList.length
                  }
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </CContainer>
    </div>
  );
}
