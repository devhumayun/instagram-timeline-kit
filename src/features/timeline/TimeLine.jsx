import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import "./TimeLine.scss";
import { RxCross1 } from "react-icons/rx";


const TimeLine = () => {

  const [modal, setModal] = useState(false);
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
                  <input type="text" placeholder="Name" />
                  <input type="text" placeholder="Author Photo" />
                  <input type="text" placeholder="Post Content" />
                  <input type="text" placeholder="Post Photo" />
                  <button type="submit"> Upload </button>
                </div>
              </div>
            </Modal>
          )}
          <button onClick={() => setModal(!modal)}> Create Post </button>
        </div>
        <div className="all-post">
              <div className="single-post-wraper">
                <div className="author-box">
                  <div className="author-left">
                    <div className="author-post">
                      <img
                        src="https://powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-01.png"
                        alt=""
                      />
                    </div>
                    <div className="author-info">
                      <h3> Humayun Kabir </h3>
                      <span> 12 min </span>
                    </div>
                  </div>
                  <div className="author-right">
                    <span>...</span>
                  </div>
                </div>
                <div className="content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tenetur explicabo quae ex odio dolores mollitia ratione.
                  </p>
                </div>
                <div className="post-photo">
                  <img
                    src="https://media.istockphoto.com/id/1268719270/photo/business-team-leader.jpg?b=1&s=170667a&w=0&k=20&c=xq7mq9TJeijN_yrqkVgiFgEN6ZkIOzTVFbTPF_IVJdM="
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
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
