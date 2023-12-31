import React, { useState, useEffect } from 'react'
import axios from "axios";
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
function PostList() {
    const [post, setPost] = useState({})

    const fetchPost = async () => {
        const res = await axios.get('http://localhost:5002/posts')
        console.log(res);
        setPost(res.data)
    };

    useEffect(()=>{
          fetchPost();
    },[])

     const renderPosts = Object.values(post).map(post=>{
        return <div className='card' style={{width:'30%', marginBottom:'20px'}} key={post.id}>
             <div className='card-body'>
                <h3>{post.title}</h3>
                <CommentList comments={post.comments}/>
                <CommentCreate postId={post.id}/>
             </div>   
        </div>
     })
     
    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderPosts}
        
        </div>
    )
}

export default PostList