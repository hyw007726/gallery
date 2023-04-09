import React, { useContext, useEffect, useState } from "react";
import { CommentModel } from "@/types/commentModel";
import { Input, Button } from "antd";
import {
  getComments,
  postComment,
  deleteComment,
  editComment,
} from "@/services/commentService";
import { message } from "antd";
import { HeartTwoTone, HeartFilled } from "@ant-design/icons";
import styles from "@/styles/components/Comment.module.css";
import AuthContext from "./context/AuthContext";
function Comment(props: { imageId: number,comments:CommentModel[] }) {
  const { TextArea } = Input;
  const [value, setValue] = useState("");
  const [comments, setComments] = useState<CommentModel[]>(props.comments);
  const [editId, setEditId] = useState<string>("");
  const [likeId, setLikeId] = useState<string>("");
  const {currentUser} = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState<number>(0);
  useEffect(() => {
    setLikeCount(Array.isArray(props.comments)?props.comments.filter((item) => {
      if (currentUser && item.isLike && item.sender?.id ==currentUser.id) {
        setLikeId(item.id.toString());
      }
      return item.isLike;
    }).length:0)
  }, [props.comments,currentUser]);

  // useEffect(() => {
  //   getComments(props.imageId).then((res: CommentModel[]) => {

  //     if (!res) {
  //       message.error("Failed to get comments");
  //       return;
  //     }
  //     if (Array.isArray(res)) {
  //       setComments(res);
  //       setLikeCount(
  //         res.filter((item) => {
  //           if (currentUser && item.isLike && item.sender?.id ==currentUser.id) {
  //             setLikeId(item.id.toString());
  //           }
  //           return item.isLike;
  //         }).length
  //       );
  //     }
  //   });
  // }, [props,currentUser]);

  const handleSubmit = (isLike: boolean) => {
    if(!currentUser||!currentUser.id){
        message.config({
            top: (45 * window.innerHeight) / 100,
            duration: 2,
            maxCount: 3,
            rtl: false,
            prefixCls: "my-message",
        });
        message.info("Please login to like!");
        return;
    }
    if (isLike && !likeId) {
      postComment(currentUser.id,props.imageId, "", true).then((res) => {
        if (res) {
          if(!comments || comments.length==0){
            setComments([res]);
          }else{
          setComments([...comments, res]);
          }
          setValue("");
          setLikeId(res.id.toString());
          setLikeCount(likeCount + 1);
        }
      });
      return;
    }
    if (!value) {
      message.config({
        top: (45 * window.innerHeight) / 100,
        duration: 2,
        maxCount: 3,
        rtl: true,
        prefixCls: "my-message",
      });
      message.warning("Please input content");
      return;
    }
    if (editId) {
      editComment(editId, value).then((res) => {
        if (res) {
          setComments(
            comments.map((item) => (item.id === editId ? res : item))
          );
          setValue("");
          setEditId("");
        }
      });
    } else {
      postComment(currentUser.id,props.imageId, value, false).then((res) => {
        if (res) {
          setComments([...comments, res]);
          setValue("");
        }
      });
    }
  };
  const handleRemove = (id: string, isLike: boolean) => {
    deleteComment(id).then((res) => {
      if (res) {
        setComments(comments.filter((item) => item.id !== id));
        if (isLike) {
          setLikeId("");
          setLikeCount(likeCount - 1);
        }
      }
    });
  };
  const handleEdit = (id: string, content: string) => {
    setValue(content);
    setEditId(id);
  };

  if(value.trim().split(/\s+/).length>10||value.length>=50){
    message.info("You can only input less than 10 words or 50 characters");
    setValue(old=>old.slice(0,old.length-2));
  }
  return (
    <>
    <div className={styles.likeLine}>
      <span className={styles.like}>
        {likeId ? (
          <HeartFilled
            onClick={() => handleRemove(likeId, true)}
            style={{ color: "red" }}
          />
        ) : (
          <HeartTwoTone
            onClick={() => handleSubmit(true)}
            twoToneColor="#eb2f96"
          />
        )}
      </span>
      {
        <span
          style={{ visibility: likeCount != 0 ? "visible" : "hidden" }}
          className={styles.likeCount}
        >
          {likeCount + " Likes"}
        </span>
      }
      </div>
      <div className={styles.textContainer}>
        {comments &&
          comments.length > 0 &&
          comments.map((item) => {
            if (item.isLike) {
              return;
            }
            return (
              <div className={styles.commentThread} key={item.id}>
                <div style={{textAlign:"start"}}>
                 <span style={{fontWeight:"bolder"}} >{item.sender?.nickname ||
                    item.sender?.email ||
                    "Anonymous user"}</span> 
                  {": "} {item.content}{" "}<span style={{fontSize:"0.5rem",opacity:"0.5"}}>{new Date(item.post_time).toLocaleString()}</span>
                  {currentUser?.id==item.sender.id&&<div style={{ float: "right",marginRight:"2vw",color:"blue",fontSize:"0.5rem", cursor:"pointer" }}>
                    {/* <button onClick={() => handleEdit(item.id, item.content)}>
                      Edit
                    </button>{" "} */}
                    <span onClick={() => handleRemove(item.id, false)}>
                      Remove
                    </span>
                  </div>}
                </div>
              </div>
            );
          })}
      </div>
     <div className={styles.makeComment}>
        <TextArea minLength={1} maxLength={50} className={styles.textArea}
        disabled={!currentUser||!currentUser.id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Leave comments :"
          autoSize={{ minRows: 1, maxRows: 2 }}
        />
        {editId ? (
          <Button
            onClick={() => {
              setValue("");
              setEditId("");
            }}
          >
            Cancel
          </Button>
        ) : null}
        <Button    disabled={!currentUser||!currentUser.id}
 onClick={() => handleSubmit(false)}>
          {editId ? "Update" : "Submit"}
        </Button>
      </div>
    </>
  );
}

export default Comment;
