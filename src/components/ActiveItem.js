import React, {useState, useRef, useEffect} from 'react'
import { Button } from 'react-bootstrap';

export default function ActiveItem({item, onPaused, onResume, readyList}){
      const [isPaused, setIsPaused] = useState(false);
      const [isItemReady, setIsItemReady] = useState(false);
      useEffect(() => {
            const itemFinished = readyList.find(i=>i===item.id)
            if(itemFinished=== item.id){
                  setIsItemReady(true)
            }

      }, [readyList]);
      return (
                  <div className="progress-container">
                        <span className="item-name">File_{item.id}</span>
                        <progress className="progressbar" id={"progress_file_"+item.id} value="0"></progress>
                        <span id={"percent_loaded_" + item.id}></span>
                        {isItemReady ? null :
                        <>
                        {isPaused === false ? 
                        <Button id={"button-pause-"+item.id} className="button-pause" onClick={()=>{setIsPaused(true); onPaused(item)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause-circle" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                              <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
                        </svg>
                        </Button> :
                        <Button id={"button-pause-"+item.id} className="button-pause" onClick={()=>{setIsPaused(false); onResume(item)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                              <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                        </svg>
                        </Button>
                        }
                        </>
                        }
                        
                  
                        <Button className="button-download" onClick={()=>{}}>
                        <a id={"file_"+ item.id} download={"file_"+item.id}>        
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                              </svg> 
                              {'Scarica'}
                        </a>
                        </Button>
                        <br />
                  </div>

      )
}