import "./App.css";
import { useState } from "react";

function App() {
  let [postIndex, setPostIndex] = useState([
    {
      num: 1,
      postName: "오늘은 고양이를 봤다",
      postDate: "22/10/23",
      postContent: "너무너무 귀여웠다",
      postImg:
        "http://newsimg.hankookilbo.com/2019/04/29/201904291390027161_3.jpg",
      postHeart: 0,
    },
    {
      num: 2,
      postName: "너무너무 귀여운 고양이를 봤다",
      postDate: "22/10/22",
      postContent: "즐거웠다",
      postImg:
        "https://cdn.pixabay.com/photo/2017/08/07/16/36/cat-2605502__480.jpg",
      postHeart: 0,
    },
    {
      num: 3,
      postName: "고양이의 산책에 관한 고찰",
      postDate: "22/10/20",
      postContent: "고양이는 산책을 싫어할지도 모른다",
      postImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJlS8ZSWJemWw-anxpzqcWO_VoX1hvbphFXg&usqp=CAU",
      postHeart: 0,
    },
  ]);

  let [modalSwitch, setModalSwitch] = useState(false);
  return (
    <div className="App">
      {/* 네비게이션 바 */}
      <div className="blog-header">
        <div className="header-logo">
          <a href="#">My Blog</a>
        </div>
        <button
          onClick={() => {
            setModalSwitch(true);
          }}
        >
          💾
        </button>
      </div>
      {modalSwitch == true ? (
        <Modal
          setModalSwitch={setModalSwitch}
          setPostIndex={setPostIndex}
          postIndex={postIndex}
        ></Modal>
      ) : null}

      {/* 블로그 포스팅 부분  */}
      {postIndex.map(function (m, n) {
        return (
          <div className="blog-post">
            <div className="post-wrap">
              <div className="post-index">
                <div className="post-content-wrap">
                  <h3>{postIndex[n].postName}</h3>
                  <p>{postIndex[n].postDate}</p>
                  <span>{postIndex[n].postContent}</span>
                </div>
                <div className="post-img-wrap">
                  <img src={postIndex[n].postImg}></img>
                </div>
              </div>
              <div className="post-button-wrap">
                <button
                  className="post-delete-button"
                  onClick={() => {
                    let copy = [...postIndex];
                    copy.splice(n, 1);
                    setPostIndex(copy);
                  }}
                >
                  삭제
                </button>
                <div className="heart-box">
                  <span
                    className="post-heart-button"
                    onClick={() => {
                      let copy = [...postIndex];
                      copy[n].postHeart += 1;
                      setPostIndex(copy);
                    }}
                  >
                    ❤️
                  </span>
                  <span className="post-heart-count">
                    {postIndex[n].postHeart}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Modal(props) {
  class BlogPost {
    constructor(postName, postDate, postContent, postImg) {
      this.num = 0;
      this.postName = postName;
      this.postDate = postDate;
      this.postContent = postContent;
      this.postImg = postImg;
      this.postHeart = 0;
    }
  }

  let [title, setTitle] = useState("");
  let [date, setDate] = useState("");
  let [url, setUrl] = useState("");
  let [contents, setContents] = useState("");
  return (
    <div className="post-modal-overlay">
      <div className="post-modal-window">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let post = new BlogPost(title, date, contents, url);
            props.setPostIndex([post, ...props.postIndex]);
            props.setModalSwitch();
          }}
        >
          <span className="modal-close" onClick={props.setModalSwitch}>
            X
          </span>
          <span className="modal-title">Posting</span>
          <div className="modal-wrap">
            <div>
              <span>Title</span>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <span>Date</span>
              <input
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <span>Img Url</span>
              <input
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <span>Contents</span>
              <textarea
                onChange={(e) => {
                  setContents(e.target.value);
                }}
              ></textarea>
            </div>
            <button className="post-button">POST</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
