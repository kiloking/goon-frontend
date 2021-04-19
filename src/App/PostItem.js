import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp , faCaretDown , faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { useForm  } from "react-hook-form";
function PostItem(props) {
    const [isOpen, setIsOpen] = useState(false); 
    const [isExpand, setIsExpand] = useState(false); 
    const {title, upvote,  author, category, comment_count, host, partner, _id, comments} = props.post
    const [votes, setVotes] = useState(upvote || 0)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmitComment = (data,e) =>{
      props.fetchPostComment(data);
      e.target.reset();
      setIsOpen(!isOpen)
    } 

    function modifyUpVote( id){
      var newVotes = votes +1
      fetchPutVotes(newVotes,id)
    }
    function modifyDownVote( id){
      var newVotes = votes -1
      fetchPutVotes(newVotes,id)
    }
    function fetchPutVotes(newVotes,id){
      fetch("http://192.168.1.94:3001/api/posts"+'/'+id, {
        method: 'PUT',
        // headers 加入 json 格式
        headers: {
          'Content-Type': 'application/json'
        },
        // body 將 json 轉字串送出
        body: JSON.stringify({
          upvote:newVotes
        })
      }).then((response) => {
        setVotes(newVotes)
        }).catch((err) => {
          console.log('錯誤:', err);
      })
    }
    function handler(){
      setIsOpen(!isOpen)
    }
    function expandHandler(){
      setIsExpand(!isExpand)
    }
    return (
    <div className="post" >
      <div className="post_left">
        <FontAwesomeIcon icon={faCaretUp}  onClick={e=> modifyUpVote(_id)}/>
        <span>{votes}</span>
        <FontAwesomeIcon icon={faCaretDown} onClick={e=> modifyDownVote(_id)} />
      </div>
      {/* <div className="post_center">
        <div className="img"></div>
      </div> */}
      <div className="post_right">
      <div className="post_info">單元類型 <span>{category}</span> 由 <span>{author}</span> 提供</div>
      
        <h3> {title}</h3>
        <div className="post_info">
          推薦的講者 <span>{host}</span> and <span>{partner}</span>
        </div>
        <div className="post_info">
          {comments.length} 個推文 | <span className="pushBtn" onClick={handler}>我要說兩句(推文) </span> 
          <div className = { isOpen ? "pushCommentForm active" : "pushCommentForm"}>
            <form onSubmit={handleSubmit(onSubmitComment)}>
  
              <input type="text" id="push_content" {...register('push_content', { required: true, maxLength: 60 })} />
              <input type="hidden" id="hidden" value={_id} {...register('postid')} />
              <input type="submit" value="推文" />
            </form>
          </div> 
          
        </div>
        <div className={ isExpand ? "comments active" : "comments"}>
          {comments.map((data, index) => (
                <div className="comment" key={data._id}><span className="floor">{index+1}樓 : </span> <span>{data.push_content}</span>  <span className="time">{data.date.slice(5, 10)}{" "}{data.date.slice(11, 16)}</span></div>   
              ))
           } 
          
        </div>
        <div className="more">
          <FontAwesomeIcon icon={faEllipsisH} onClick={expandHandler}/>
        </div>
        
      </div>
    </div>
    )
}

export default PostItem
