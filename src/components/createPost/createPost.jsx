import React, { useState } from 'react'
import Modal from '../Modal/Modal';
import { RxCross1 } from "react-icons/rx";

const createPost = () => {

  return (
    <div className="createPost">
            <Modal>
              <div className="create-post-wraper">
                <div className="create-post-header">
                  <span> Create new post </span>
                  <span className="closeBtn">
                    {" "}
                    <RxCross1 />{" "}
                  </span>
                </div>
                <div className="post-form">
                  <input type="text" placeholder="Name" />
                  <input type="text" placeholder="Author Photo" />
                  <input type="text" placeholder="Post Content" />
                  <input type="text" placeholder="Post Photo" />
                  <button type="submit"> Upload </button>
                </div>
              </div>
            </Modal>
          <button > Create Post </button>
        </div>
  )
}

export default createPost
