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

import 'quill/dist/quill.snow.css'

import axios from 'axios';
import Config from "../../common/Config"

import { NavLink as RouterLink, Route } from "react-router-dom";
import ReactPlayer from 'react-player';

import { Document, Page} from 'react-pdf';
import * as pdfjs from 'pdfjs-dist/es5/build/pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;



export default function TopicsDetailsPage(props) {
  const { useState } = React;

  const [loading, setLoading] = React.useState(false)
  const [topic, setTopic] = useState({})

  const [content, setContent] = React.useState('');
  const [videoPath, setVideoPath] = React.useState('');

  React.useEffect(() => {
    console.log(props)
    if(localStorage.getItem('topic') != null && localStorage.getItem('topic') != 'null') {
      var topic = JSON.parse(localStorage.getItem('topic'))
      setTopic(topic)
    }

    // getTopic();
  }, []);

  // const getTopic = async () => {

  //   setLoading(true)
  //   axios({
  //     url: Config.BACKEND_API_URL+'/topic/details/'+props.match.params.id,
  //     method: 'get'
  //   })
  //   .then(function (response) {      
  //     setTopic(response.data)
  //     console.log(response.data)
  //     setLoading(false)
  //     localStorage.setItem('topic', JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error.response)
  //     setLoading(false)
  //    });
  // };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
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
    <div className="animated fadeIn">
      {/* <CContainer style={{marginBottom:0}}>
       <CRow className="justify-content-center">
         <Fade in={loading} ><CSpinner grow color="primary" style={{textAlign:'center', height:'20'}}/></Fade>      
       </CRow>
      </CContainer> */}
      <CRow className="justify-content-center">            
        <CCol xl="12">
          
          {
          localStorage.getItem('topic') != null && localStorage.getItem('topic') != 'null' ?
          <CCard custom>
              <CCardHeader style={{paddingTop:"10px"}}>
                <h5 style={{ textAlign:'center', padding:"10px" }}><span style={{color:"#000000", fontFamily:"Poppins-Regular", fontSize:"100%"}}> {JSON.parse(localStorage.getItem('topic')).topicname} </span></h5>
              </CCardHeader>
              <CCardBody > 
                {
                  props.displayMode === 1 ?
                    <div class="ql-container">
                      <div class="ql-editor" style={{textAlign:"justify", color:"#000000", marginBottom:"10px", padding:"0"}} dangerouslySetInnerHTML={{__html:JSON.parse(localStorage.getItem('topic')).content}}/>
                    </div>
                  :
                    props.displayMode === 2 ?
                      JSON.parse(localStorage.getItem('topic')).videofile !== "null" ?                      
                          <div>
                          {/* <hr/> */}
                          <ReactPlayer url={process.env.REACT_APP_AWS_BUCKET_CLOUDFRONT_URL + '/' + JSON.parse(localStorage.getItem('topic')).videofile} controls width="100%" height="100%" 
                                      config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                      style={{height:"200px"}}
                                      onContextMenu={e => e.preventDefault()}
                                      ref={ref}
                                      playbackRate={playbackRate}
                                      onPlay={() => setPlaying(true)}
                                      onPause={() => setPlaying(false)}
                                      playing={playing}

                            />
                            {PlayerControls()}                        
                        </div>                    
                      :""
                    :
                      JSON.parse(localStorage.getItem('topic')).uploadedfile !== "null" ?
                        <div>
                            {/* <hr/> */}
                            <div>
                              <Document
                                file={process.env.REACT_APP_AWS_BUCKET_CLOUDFRONT_URL + '/' + JSON.parse(localStorage.getItem('topic')).uploadedfile}
                                onLoadSuccess={onDocumentLoadSuccess}
                                // options={options}
                              >
                                {
                                  Array.from(
                                    new Array(numPages),
                                    (el, index) => (
                                      <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                      />
                                    ),
                                  )
                                }
                              </Document>
                              {/* <p>Page {pageNumber} of {numPages}</p> */}
                            </div>
                          </div>                    
                        :""
                }

                <style jsx>{`
                .player-wrapper {
                  position: relative;
                  padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */
                }
                .react-player {
                  position: absolute;
                  top: 0;
                  left: 0;
                }
                .react-pdf__Document {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                }
                .react-pdf__Page {
                  max-width: calc(~"100% - 2em");
                  box-shadow: 0 0 8px rgba(0, 0, 0, .5);
                  margin: 1em;                  
                }
                .react-pdf__Page__canvas {
                  max-width: 100%;
                  height: auto !important;
                }
                .react-pdf__message {
                  padding: 20px;
                  color: black;
                }
                `
                }</style>
              </CCardBody>
          </CCard>
          :''
        }
        </CCol>
      </CRow>     
    </div>      
  );
}
