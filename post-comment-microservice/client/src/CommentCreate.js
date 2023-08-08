import React, { useState } from "react";
import axios from "axios";
function CommentCreate({ postId }) {
  const [comment, setComment] = useState("");

  const onSubmit =async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:5001/post/${postId}/comments`,{
        comment
    });

    setComment('')
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input value={comment} onChange={(e) => setComment(e.target.value)} className="form-control"
            type="text"/>
        </div>
        <button className="btn btn-primary mt-3">Comment !t</button>
      </form>
    </div>
  );
}

export default CommentCreate;
