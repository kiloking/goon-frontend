import React from 'react'
import Posts from './Posts'
function Main(props) {
    return (
        <div className="main">
            <Posts data={props.data} fetchPostComment={props.fetchPostComment}/>
            {props.loading ? <div className="loading">Loading...</div> : null }
        </div>
    )
}

export default Main
