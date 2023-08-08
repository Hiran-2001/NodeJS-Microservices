import React, { useEffect, useState } from "react";
import axios from "axios";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const fetchComment = async () => {
    const res = await axios.get(
      `http://localhost:5001/post/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(()=>{
    fetchComment()
  },[]);

  const renderComments = comments.map(comment=>{
    return <li key={comment.id}>{comment.comment}</li>
  })
  return <div>
    {renderComments}
  </div>;
}

export default CommentList;
