import React from "react";


function CommentList({ comments }) {

  const renderComments = comments.map(comment=>{

    let approvedComment ;
    if(comment.status === "Approved"){
      approvedComment = comment.comment
    }
    if(comment.status === 'pending'){
      approvedComment = "Moderating";
    }
    if(comment.status === "Rejected"){
      approvedComment = `comment ${comment.status}`
    }
    return <li key={comment.id}>{approvedComment}</li>
  })
  return <div>
    {renderComments}
  </div>;
}

export default CommentList;
