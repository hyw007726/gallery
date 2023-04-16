import React, { useState, useContext, useEffect } from "react";
import { ImageModel } from "@/types/imageModel";
import styles from "@/styles/components/ImageContainer.module.css";
import Image from "next/image";
import { Dropdown, Image as ImageAnt } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { deleteImageById } from "@/services/deleteImage";
import router, { useRouter } from "next/router";
import { Button, message, Modal } from "antd";
import Comment from "./Comment";
import AuthContext from "@/components/context/AuthContext";
import { EyeOutlined } from "@ant-design/icons";

function ImageContainer(props: {
  image: ImageModel;
  inViewImageIndex: number;
  mutation: React.Dispatch<React.SetStateAction<ImageModel[] | null>>;
}) {
  const router = useRouter();
  const [isModalOpenRemove, setIsModalOpenRemove] = useState(false);
  const [showEye, setShowEye] = useState(false);
  // const [newName, setNewName] = useState("");
  // const handleRenameChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewName(e.target.value);
  // };
  // const handlOkRename = () => {
  //   //
  //   setIsModalOpenRemove(false);
  // };
  // const [blurredImageUrl, setBlurredImageUrl] = useState<string>("");

  // useEffect(() => {
  //   if(props.image.filename.substring(0,4)!=='http'){
  //     return;
  //   }
  //   async function fetchBlurredImage() {
  //     try {
  //       const response = await fetch(`/api/sharp?url=${encodeURIComponent(props.image.filename)}`);
  //       const url = await response.text();
  //       setBlurredImageUrl(url);
  //     } catch (error) {
  //       console.error('Failed to fetch blurred image:', error);
  //     }
  //   }

  //   fetchBlurredImage();
  // });

  const handleOkRemove = () => {
    handeDelete();
    setIsModalOpenRemove(false);
  };

  const handleCancel = () => {
    setIsModalOpenRemove(false);
    // setIsModalOpenRename(false);
  };
  const onClick: MenuProps["onClick"] = ({ key }) => {
    // if(key=='rename'){
    //   setIsModalOpenRename(true);
    // }
    if (key == "remove") {
      setIsModalOpenRemove(true);
    }
  };

  const items: MenuProps["items"] = [
    // {
    //   label: 'Rename',
    //   key: 'rename',
    // },
    {
      label: "Remove",
      key: "remove",
    },
  ];
  // console.log(image);
  const [visible, setVisible] = useState(false);
  const { currentUser } = useContext(AuthContext);
  function handeDelete(): void {
    if(!currentUser||!currentUser?.id){
      message.error("You need to login first");
      return;
    }
    if(props.image.uploader?.id!=currentUser?.id){
      message.error("You can only delete your own images");
      return;
    }
      // console.log(props.image);
      deleteImageById(props.image.id).then((res) => {
        //  console.log(res);
        props.mutation((prev) => {
          if (prev) {
            return prev.filter((image) => image.id != props.image.id);
          }
          return null;
        });
      });
    
  }

  return (
    <div
      className={
        props.inViewImageIndex == 0
          ? styles.targetImageInView
          : styles.targetImage
      }
    >
      <Modal
        title="Remove image"
        open={isModalOpenRemove}
        onOk={handleOkRemove}
        onCancel={handleCancel}
      >
        <p>Are you sure to remove this image?</p>
      </Modal>
      {/* <Modal title="Rename image" open={isModalOpenRename} onOk={handleOkRemove} onCancel={handleCancel}>
        <input type="text" onChange={(e)=>{handleRenameChange(e)}} />
      </Modal> */}
      <div className={styles.caption}>
        {props.image.caption}{" "}
        {props.image.uploader?.id &&
          currentUser?.id == props.image.uploader.id && (
            <Dropdown menu={{ items, onClick }}>
              <DownOutlined style={{ transform: "scale(0.5)" }} />
            </Dropdown>
          )}
      </div>
      <div className={styles.imageInfo}>
        {`Uploaded by ${
          props.image.uploader?.nickname ||
          props.image.uploader?.email ||
          "Anonymous user"
        }`} 
        <span style={{position:"relative",right:"-10vw",fontSize:"0.5rem",opacity:"0.5", width:"0vw",float:"right",whiteSpace:"nowrap"}} > {`${new Date(props.image.uploadTime).toLocaleString()}`}</span>
      </div>
      <div
        onMouseEnter={() => {
          setShowEye(true);
        }}
        onMouseLeave={() => {
          setShowEye(false);
        }}
        className={styles.imageContainer}
        onClick={() => setVisible(true)}
      >
        <EyeOutlined
          style={{ opacity: showEye ? "0.5" : "0" }}
          className={styles.eye}
          onClick={() => setVisible(true)}
        />
        <Image
          className={styles.image}
          src={props.image.filename}
          width={500}
          height={500}
          alt=""
          priority={props.inViewImageIndex == 0 ? true : false}
          loading={props.inViewImageIndex == 0 ? "eager" : "lazy"}
          // placeholder="blur"
          // blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAAAVFRUzMzM0NDRDQ0NFVVVXt7e3h4eGRkZHh4eHl5eX19fXx8fHx8fHyAgICBwcHB+fn5ISEhHR0dISEiIiJubm5GRkZJSUlKSkpPT09SUlJUVFRXV1dYWFhZWVlbW1tdXV1eXl5fHx8gICAiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLCwtLS0uLi4vLy8wMDAxMTEyMjIzMzM0NDQ1NTU2NjY3Nzc4ODg5OTk6Ojo8PD09PT4+Pj5BQUFGRkZJSUlKTk5OVVVVWVlZWlpaXl5eYGBhYWFiYmJkZGRlZWVnZ2dpaWlrZWVsbGxubm5xcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp9fX19gYGBhYWFhYmJiY2NjZGRkZWVlZmZmaWlpamJiYmpqbGxsdHR0dXV1d2dnZmZmam5ubnJycnZ2dnd3d3h4eXl5enp6enp9fX19gYGBhYWFiYmJiY2NjZGRkZWVlZmZmaWlpamJiYmpqbGxsdHR0dXV1d2dnZmZmam5ubnJycnZ2dnd3d3h4eXl5enp6enp9fX19gYGBhYWFiYmJiY2NjZGRkZWVlZmZmaWlpamJiYmpqbGxsdHR0dXV1d2dnZmZmam5ubnJycnZ2dnd3d3h4eXl5enp6enp9fX19gYGBhYWFiYmJiY2NjZGRkZWVlZmZmaWlpamJiYmpqbGxsdHR0dXV1d2dnZmZmam5ubnJycnZ2dnd3d3h4eXl5enp6enp9fX19gYGBhYWFiYmJiY2NjZGRkZWVlZmZmaWlpamJiYmpqbGxsdHR0dXV1d2dnZmZmam5ubnJycnZ2dnd3d3h4eXl5enp6enp9fX19gYGBhYWFiYmJiY2NjZGRkZWVlZmZmaWlpamJiYmpqbGxsdHR0dXV1d2dnZmZmam5ubnJyc"}
        />
        <div style={{ display: "none" }}>
          <ImageAnt.PreviewGroup
            preview={{
              visible,
              onVisibleChange: (vis: boolean) => setVisible(vis),
            }}
          >
            <ImageAnt src={props.image.filename} />
          </ImageAnt.PreviewGroup>
        </div>
      </div>

      {router.pathname != "/my_space" && props.inViewImageIndex == 0 && (
        <div className={styles.commentsContainer}>
          <Comment imageId={props.image.id} comments={props.image.comments}></Comment>
        </div>
      )}
    </div>
  );
}

export default ImageContainer;
