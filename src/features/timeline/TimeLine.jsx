import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import "./TimeLine.scss";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { createPost, fetchPosts } from "./timelineAPI";

const TimeLine = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch()
  // get posts
  const posts = useSelector((state) => state.timeline.posts)
  // state for input field
  const [input, setInput] = useState({
    auth_name : "",
    auth_photo : "",
    content : "",
    photo : ""
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
      photo : ""
    })
    setModal(false)
    dispatch(createPost(input))
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
            posts.map(({auth_name, auth_photo, photo, content},index) => {
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
                      <span> 12 min </span>
                    </div>
                  </div>
                  <div className="author-right">
                    <span>...</span>
                  </div>
                </div>
                <div className="content">
                  <p>
                    {content}
                  </p>
                </div>
                <div className="post-photo">
                  <img
                    src={photo}
                    alt=""
                  />
                </div>
                <div className="reaction-box">
                  <div className="like">
                    <i class="bx bx-like"></i>
                    <span>10</span>
                  </div>
                  <div className="dislike">
                    <i class="bx bx-dislike"></i>
                    <span>2</span>
                  </div>
                  <div className="love">
                    <i class="bx bx-heart"></i>
                    <span>20</span>
                  </div>
                </div>
              </div>
              )
            })
          }
            
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
