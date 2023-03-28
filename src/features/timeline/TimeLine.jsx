import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import "./TimeLine.scss";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost, fetchPosts } from "./timelineAPI";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { makeDislike, makeLike, makeLove } from "./timelineSlice";


const TimeLine = () => {
  // create post modal
  const [modal, setModal] = useState(false);
  // action button modal
  const [actionModal, setActionModal] = useState(false);
  // delete modal show
  const [delModal, setDelModal] = useState(false);

  const dispatch = useDispatch()
  // get posts
  const posts = useSelector((state) => state.timeline.posts)
  // state for input field
  const [input, setInput] = useState({
    auth_name : "",
    auth_photo : "",
    content : "",
    photo : "",
    post_time : Date.now(),
    reactions : {
      love : 0,
      like : 0,
      dislike : 0
    }
  })

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const handlePostCreate = (e) => {
    e.preventDefault()
    setInput({
      auth_name : "",
      auth_photo : "",
      content : "",
      photo : "",
    })
    setModal(false)
    dispatch(createPost(input))
  }

  const handlePostDelete = (id) => {
    dispatch(deletePost(id))
    setActionModal(false)
  }

  useEffect(() => {
    dispatch(fetchPosts())
  },[dispatch])

  return (
    <div className="timeline-wraper">
      <div className="timeline-middle">
        <div className="createPost">
          {modal && (
            <Modal>
              <div className="create-post-wraper">
                <div className="create-post-header">
                  <span> Create new post </span>
                  <span onClick={() => setModal(!modal)} className="closeBtn">
                    {" "}
                    <RxCross1 />{" "}
                  </span>
                </div>
                <div className="post-form">
                  <input name="auth_name" onChange={handleInputChange} type="text" placeholder="Name" />
                  <input name="auth_photo" onChange={handleInputChange} type="text" placeholder="Author Photo" />
                  <input name="content" onChange={handleInputChange} type="text" placeholder="Post Content" />
                  <input name="photo" onChange={handleInputChange} type="text" placeholder="Post Photo" />
                  <button onClick={handlePostCreate} type="submit"> Done </button>
                </div>
              </div>
            </Modal>
          )}
          <button onClick={() => setModal(!modal)}> Create Post </button>
        </div>
        <div className="all-post">
          {
           [...posts].length > 0 ?
           [...posts].reverse().map(({auth_name, auth_photo, photo, content, post_time, id, reactions},index) => {
            return(
              <div className="single-post-wraper" key={index}>
              <div className="author-box">
                <div className="author-left">
                  <div className="author-post">
                    <img
                      src={auth_photo}
                      alt=""
                    />
                  </div>
                  <div className="author-info">
                    <h3> {auth_name} </h3>
                    <span> {formatDistanceToNow(post_time) === "less than a minute" ? "Just Now" : formatDistanceToNow(post_time) } </span>
                  </div>
                </div>
                <div className="author-right">
                  <span onClick={() => setActionModal(!actionModal)}>...</span>
                  {
                    actionModal &&
                    <Modal>
                      <div className="action-button">
                        <span onClick={() => handlePostDelete(id)}> Delete </span>
                        <span> Edit </span>
                        <span onClick={() => setActionModal(false)}> Cancel </span>
                      </div>
                    </Modal>
                  }
                  
                </div>
              </div>
              <div className="content">
                { content && <p> {content} </p> }
              </div>
              <div className="post-photo">
                {
                  photo && <img src={photo} alt="" />
                }
                
              </div>
              <div className="reaction-box">
                <div onClick={() => dispatch(makeLike(id))} className="like">
                  <i class="bx bx-like"></i>
                  <span>{ reactions.like }</span>
                </div>
                <div onClick={() => dispatch(makeDislike(id))} className="dislike">
                  <i class="bx bx-dislike"></i>
                  <span>{ reactions.dislike }</span>
                </div>
                <div onClick={() => dispatch(makeLove(id))} className="love">
                  <i class="bx bx-heart"></i>
                  <span>{ reactions.love }</span>
                </div>
              </div>
            </div>
            )
          }) : "No Posts Found"
          }
            
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
