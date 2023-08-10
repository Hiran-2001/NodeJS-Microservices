import React from "react";


function CommentList({ comments }) {

  const renderComments = comments.map(comment=>{
    return <li key={comment.id}>{comment.comment}</li>
  })
  return <div>
    {renderComments}
  </div>;
}

export default CommentList;
