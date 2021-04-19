import React, { useState, useEffect }  from 'react'
import Header from './Header'
import Main from './Main'
import CreatePost from './CreatePost'
import MainNotice from './MainNotice'

import {apiUrl} from './apiUrl';

function App() {
  const [hasError, setErrors] = useState(false);

  const [data, setData] = useState([]);
  
  const [isBottom, setIsBottom] = useState(false);
  const [pageNumber , setPageNumber] = useState(0)
  const [dataLength, setDataLength] = useState(0);
  const [perPage] = useState(4)
  const [loading , setLoading] = useState(false)
  async function fetchData() {
    const res = await fetch(apiUrl +"/api/posts");
    res
      .json()
      .then(res => {
          setDataLength(res.length)
          if(data.length === dataLength) {
            return
          }        
          const sorted = [...res].sort((a,b) =>b.upvote - a.upvote)
          var slice = paginate(sorted)
          setData( p =>[ ...p  , ...slice])
          

      }
          
      )
      .catch(err => setErrors(err));
  }
  const loadMore = ()=>{
    setPageNumber(pageNumber => pageNumber+1)
    setIsBottom(false)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
    if(data.length === dataLength) return
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[pageNumber,dataLength]);
  useEffect(() => {
    
    if (isBottom) {
      setLoading(true)
      console.log('isBottom')
      setTimeout(()=>{
        loadMore()
      },2000)
    }

  }, [isBottom]);

  function paginate(items) {
    var start = perPage * pageNumber;
		console.log(start, start + perPage)
		return items.slice(start, start + perPage);
  }
  function handleScroll() {
    const scrollTop = (document.documentElement
      && document.documentElement.scrollTop)
      || document.body.scrollTop;
    const scrollHeight = (document.documentElement
      && document.documentElement.scrollHeight)
      || document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight){
      setIsBottom(true);
    }
  }
  function fetchPostData(data){
    console.log(data)
    fetch(apiUrl +"/api/posts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // body 將 json 轉字串送出
      body: JSON.stringify({
        title: data.subject,
        author: data.name, 
        host:data.host,
        partner:data.partner,
        category:data.category
      })
    }).then((response) => {
        return response.json(); 
      }).then((jsonData) => {
        console.log(jsonData);
        console.log('已發佈完成。')
        fetchData()
      }).catch((err) => {
        console.log('錯誤:', err);
    })

  }
 

  function fetchPostComment(msg){
    fetch(apiUrl +"/api/posts/"+msg.postid+"/comments", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      // body 將 json 轉字串送出
      body: JSON.stringify({
        push_content: msg.push_content
      })
    }).then((response) => {
        return response.json(); 
      }).then((jsonData) => {
        console.log('已發佈完成。')
        fetchData()
      }).catch((err) => {
        console.log('錯誤:', err);
    })
  }
  return (
    <div className="App container"  >
      <Header/>
      
      <Main data={data} fetchPostComment={fetchPostComment} loading={loading}/>
     
      <CreatePost  fetchPostData={fetchPostData}/>
      <MainNotice/>
      
    </div>
  );
}

export default App;
