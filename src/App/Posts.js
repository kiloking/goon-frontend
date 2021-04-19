import React, { useState, useEffect }  from 'react'
import PostItem from './PostItem'
function Posts(props) {
   
    return (
        <div className="posts">
           {
               props.data.map(post => (
                   <PostItem key={post._id} post={post} fetchPostComment={props.fetchPostComment}/>
               ))
           } 
        </div>
    )
}

export default Posts
