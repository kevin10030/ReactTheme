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

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import axios from 'axios';
import Config from "../../common/Config"

import { NavLink as RouterLink, Route } from "react-router-dom";
import ReactPlayer from 'react-player';

import styles from "../../assets/material/jss/material-dashboard-pro-react/views/pricingPageStyle.js";
const useStyles = makeStyles(styles);

const useStyles1 = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));



export default function TopicsPage(props) {
  const { useState } = React;
  const classes = useStyles();
  const classes1 = useStyles1();

  const [details, setDetails] = useState([])
  const toggleDetails = (id) => {
    const position = details.indexOf(id)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, id]
    }
    setDetails(newDetails)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [currentPagination, setCurrentPagination] = useState(5)
  const getLastVal = (currentPage) => {
    if (currentPage * currentPagination < topicList.length)
      return currentPage * currentPagination;
    return topicList.length;
  }

  const fields = [
    { key: 'topicname', label:'Topic Name', _style: { width: '30%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    },
  ]

  const [loading, setLoading] = React.useState(false)
  const [topicList, setTopicList] = React.useState([])
  const [topic, setTopic] = useState({})
  const [status, setStatus] = useState("")

  const [content, setContent] = React.useState('');
  const [videoPath, setVideoPath] = React.useState('');

  React.useEffect(() => {
    getTopicList();
  }, []);

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

  const downloadData = (item) => {
    fetch(process.env.REACT_APP_AWS_BUCKET_CLOUDFRONT_URL + '/' + item.uploadedfile)
        .then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = item.uploadedfile;
                a.click();
            });
            //window.location.href = response.url;
    });
  }


  const [playing, setPlaying] = React.useState(false)
  const [playbackRate, setPlaybackRate] = React.useState(1)
  const [timecodeDisplay, setTimecodeDisplay] = React.useState(null)
  var timecodeTimer = null;
  var seekInterval = 2.5
  const [player, setPlayer] = React.useState(null)

  // To convert the seconds into a nice timecode to display when user seeks
  function toMMSS(sec) {
    var sec_num = parseInt(sec, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
  }

  const ref = (player) => {
    setPlayer(player)
  }

  // Function to seek backwards and display a timecode overlay
  const seekBack =() => {
    const timecodeDisplayTime = 1200;
    player.seekTo(player.getCurrentTime() - seekInterval);
    const seconds = player.getCurrentTime();
    setTimecodeDisplay(toMMSS(seconds))
    if (timecodeTimer) {
        clearTimeout(timecodeTimer);
        timecodeTimer = setTimeout(() => setTimecodeDisplay(null), timecodeDisplayTime);
    }
    else timecodeTimer = setTimeout(() => setTimecodeDisplay(null), timecodeDisplayTime);
  }

  // Function to seek forwards and display a timecode overlay
  const seekForward = () => {
    const timecodeDisplayTime = 1200;
    player.seekTo(player.getCurrentTime() + seekInterval);
    const seconds = player.getCurrentTime();
    setTimecodeDisplay(toMMSS(seconds))
    if (timecodeTimer) {
        clearTimeout(timecodeTimer);
        timecodeTimer = setTimeout(() => setTimecodeDisplay(null), timecodeDisplayTime);
    }
    else timecodeTimer = setTimeout(() => setTimecodeDisplay(null), timecodeDisplayTime);
  }

  // Extra buttons below the player for seeking and speed control
  const PlayerControls = () => {
    return (
         <div className="player-controls">
             <div className="controls-centered">
                {
                  playbackRate === 0.5 ? <button className="mini-btn" style={{ marginRight: '5px' }} onClick={() => setPlaybackRate(0.5)}   disabled>0.5x</button>
                  : <button className="mini-btn" style={{ marginRight: '5px' }} onClick={() => setPlaybackRate(0.5)}>0.5x</button>
                }
                {
                  playbackRate === 0.75 ? <button className="mini-btn" style={{ marginRight: '5px' }} onClick={() => setPlaybackRate(0.75)} disabled>0.75x</button>
                  : <button className="mini-btn" style={{ marginRight: '5px' }} onClick={() => setPlaybackRate(0.75)}   >0.75x</button>
                }
                {
                  playbackRate === 1 ?<button className="mini-btn" style={{ marginRight: '5px' }} onClick={() => setPlaybackRate(1)}  disabled>1x</button>
                  :<button className="mini-btn" style={{ marginRight: '5px' }} onClick={() => setPlaybackRate(1)} >1x</button>
                }
                {
                  playbackRate === 1.5 ? <button className="mini-btn" style={{ marginRight: '5px' }} onClick={() => setPlaybackRate(1.5)} disabled>1.5x</button>
                  :<button className="mini-btn" style={{ marginRight: '5px' }} onClick={() => setPlaybackRate(1.5)}>1.5x</button>
                }
                {
                  playbackRate === 2 ? <button className="mini-btn"  onClick={() => setPlaybackRate(2)} disabled>2x</button>
                  :<button className="mini-btn"  onClick={() => setPlaybackRate(2)}>2x</button>
                }
             </div>
             <div className="controls-left">
                 <button className="mini-btn" onClick={seekBack}>{`<<`}</button>
             </div>
             <div className="controls-right">
                 <button className="mini-btn" onClick={seekForward}>{`>>`}</button>
             </div>
             <style jsx>{`
                 .player-controls {
                     margin-top: 0.5em;
                     margin-bottom: 0.5em;
                     font-size: 13px;
                     display: flex;
                 }
                 .controls-left {
                     order: -1;
                 }
                 .controls-centered {
                     flex: 1;
                     text-align: center;
                 }
                 .mini-btn {
                     background: white;
                     font: inherit;
                     padding: 0.1em 0.4em;
                     margin: 0 0.1em;
                     border: 0.5px solid grey;
                     border-radius: 5px;
                 }
                 .mini-btn:active {
                     background: #eee;
                 }
                 .mini-btn:focus {
                     outline: none;
                 }
                 .mini-btn:hover {
                     cursor: pointer;
                 }
                 .mini-btn-right {
                     float: right;
                 }
             `}</style>
         </div>
     )
 }

  return (
    <div className={classes.container}>
      {/* <CContainer style={{marginBottom:0}}>
       <CRow className="justify-content-center">
         <Fade in={loading} ><CSpinner grow color="primary" style={{textAlign:'center', height:'20'}}/></Fade>
       </CRow>
      </CContainer> */}
      <CContainer>
        <CContainer >
          <CRow>
            <CCol xl="5">
              <CCard custom>
                <CCardHeader style={{paddingBottom:"0px"}}>
                  <h5><span style={{color:"#000000", textAlign:'center'}}> Topics </span></h5>
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    items={topicList}
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
                      'topicname':
                      (item) => (
                        <td>
                          {item.topicname}
                          {/* <CLink  to={`/modules/admin/courses/${props.match.params.id}/${item.sectionid}`}>{item.sectionname}</CLink> */}
                        </td>
                      ),
                      'show_details':
                        item => {
                          return (
                            <td className="py-2">
                              <IconButton
                                className={clsx(classes1.expand, {
                                  [classes1.expandOpen]: details.includes(item.topicid)?true:false,
                                })}
                                onClick={() => {toggleDetails(item.topicid)}}
                                aria-expanded={details.includes(item.topicid)?true:false}
                                aria-label="show more"
                                style={{width:24, height:24, maringLeft:0, padding:0}}>
                                <ExpandMoreIcon style={{maring:0, padding:0}}/>
                              </IconButton>

                              {/* <CButton
                                color="primary"
                                variant="outline"
                                shape="square"
                                size="sm"
                                onClick={() => { toggleDetails(item.id) }}
                              >
                                { details.includes(item.id) ? 'Hide' : 'Show' }
                              </CButton> */}
                            </td>
                          )
                        },
                      'details':
                          item => {
                            return (
                            <CCollapse show={details.includes(item.topicid)}>
                              <CCardBody>
                                <CRow>
                                  <CCol md="4">
                                    <CButton size="sm" color="primary" style={{width:"100px"}} onClick={(e)=>{e.preventDefault(); setTopic(item); setContent(item.content); setStatus("Content")}}>Content</CButton>
                                  </CCol>
                                  <CCol md="4">
                                    <CButton size="sm" color="primary" style={{width:"100px"}} onClick={(e)=>{e.preventDefault(); setTopic(item); setVideoPath(process.env.REACT_APP_AWS_BUCKET_CLOUDFRONT_URL + '/' + item.videofile); setStatus("Video")}}>Video</CButton>
                                  </CCol>
                                  <CCol md="4">
                                    <CButton size="sm" color="primary" style={{width:"100px"}} onClick={(e)=>{e.preventDefault(); setTopic(item); downloadData(item); setStatus("Download File") }}>Download File</CButton>
                                  </CCol>
                                </CRow>
                              </CCardBody>
                            </CCollapse>
                          )
                        }
                    }}
                  />
                  <div style={{ textAlign: 'right' }}>{
                    ((currentPage - 1) * currentPagination + 1) + '-' + getLastVal(currentPage) + ' of ' + topicList.length
                  }
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xl="7">
              <CCard custom>
                  <CCardHeader style={{paddingBottom:"0px"}}>
                    <h5><span style={{color:"#000000", textAlign:'center'}}> {"Topic " + status + " (" + topic.topicname + ")"} </span></h5>
                  </CCardHeader>
                  <CCardBody style={{height:'400px'}}>
                    {
                      status === "Video"?
                        <div>
                          <ReactPlayer url={videoPath} controls width="100%" height="100%"
                                      config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                      onContextMenu={e => e.preventDefault()}
                                      ref={ref}
                                      playbackRate={playbackRate}
                                      onPlay={() => setPlaying(true)}
                                      onPause={() => setPlaying(false)}
                                      playing={playing}

                            />
                            {PlayerControls()}
                          </div>
                      :
                        <span style={{textAlign:"justify", color:"#000000"}}>{content}</span>
                    }
                  </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </CContainer>
    </div>
  );
}
