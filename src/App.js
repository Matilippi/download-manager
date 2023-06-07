
import './App.css';
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputURL from './components/InputURL';
import ActiveItem from './components/ActiveItem';




function App() {

  const [fileCount, setFileCount] = useState(0);
  const [activeItemList, setActiveItemList] = useState([]);
  const [newLink, setNewLink] = useState('');
  const [pausedList, setPausedList] = useState([])
  const [readyList, setReadyList] = useState([])


  useEffect(() => {
    if(activeItemList.length>0 ){ 
      startElementDownload(`file_${fileCount}`, `file_${fileCount}`,`progress_file_${fileCount}`, `percent_loaded_${fileCount}`,newLink, fileCount); 
      setFileCount(fileCount +1)
    }
  }, [activeItemList]);

  function initDownload (value){
    setActiveItemList([...activeItemList,{name: `file_${fileCount}`,id: fileCount, url: value}])
    setNewLink(value)
 }



  function startElementDownload(element_name, link_id,progress_id, span_percent_id, link_to_download, item_id){
    var ajax = new XMLHttpRequest()
    ajax.responseType ="blob";
    ajax.open("GET", link_to_download, true);
    ajax.send() 
    document.getElementById('button-pause-'+item_id)?.addEventListener('click', function (e){
      ajax.abort() 
    })
    ajax.onreadystatechange = function(e){
      if (this.readyState === 4 && this.status === 200){
        var obj = window.URL.createObjectURL(this.response);
        document.getElementById(link_id).setAttribute("href", obj)
        setReadyList([...readyList, item_id])
        /* setTimeout(function() {
          window.URL.revokeObjectURL(obj);
        }, 60*1000)   */
      }
    } 
    ajax.onprogress =function(e){  
      var progress = document.getElementById(progress_id)
      var progress_loaded = document.getElementById(span_percent_id)
      var percent =(e.loaded/e.total) * 100;
      progress.max = e.total
      progress.value = e. loaded;
      percent = Math.floor(percent)
      progress_loaded.innerHTML = percent + "%"
    } 
    return ajax
  }

 function onPaused(item){
    setPausedList([...pausedList, item])
 }
 function onResume(item){
  startElementDownload(`file_${item.id}`, `file_${item.id}`,`progress_file_${item.id}`, `percent_loaded_${item.id}`,item.url, item.id); 
 }
  return (
    <>
    <div className="downloadManager">

    <InputURL initDownload={initDownload}/>

    <div className="history-container">YOUR ACTIVE DOWNLOAD:</div>
    {activeItemList.length>0 ? activeItemList.map((item) => ( 
      <ActiveItem key={item.id} item={item} onPaused={onPaused} onResume={onResume} readyList={readyList}></ActiveItem>
    )): <></>}
    </div>
    </>
  )
}

export default App;
