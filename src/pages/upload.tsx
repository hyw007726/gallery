import React, { useContext, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/pages/Upload.module.css";
import uploadFormData from "@/services/uploadFormData";
import PlusIcon from "/public/icons/circle-plus.svg";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {message} from 'antd';
import AuthContext from "@/components/context/AuthContext";
import router from "next/router";

function Upload() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [captionList, setCaptionList] = React.useState<string[]>([]);
  const [imageList, setImageList] = React.useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {currentUser} = useContext(AuthContext);
 const [uploading, setUploading] = React.useState<boolean>(false);
  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.id);
    const caption = e.target.value;
    const newCaptionList = [...captionList];
    newCaptionList[index] = caption;
    setCaptionList(newCaptionList);
  };

  const handleRemove = (index: number) => {
    captionList.splice(index, 1);
    setCaptionList([...captionList]);
    const dataTransfer = new DataTransfer();
    if (imageList?.length) {
      const files = Array.from(imageList);
      files.forEach((file, i) => {
        if (i != index) dataTransfer.items.add(file);
      });
      setImageList(dataTransfer.files);
    }
  };
  const handleSelected = () => {
    const dataTransfer = new DataTransfer();
    var files: Array<File> = [];
    let newCaptions = [...captionList];
    if (imageList) {
      files = Array.from(imageList).reverse();
    }
    if (fileInputRef.current?.files) {
      Array.from(fileInputRef.current?.files)
        .reverse()
        .forEach((file, i) => {
          files.unshift(file);
          newCaptions.unshift("Untitiled");
        });
    }

    files.forEach((file, i) => {
      dataTransfer.items.add(file);
    });
    setImageList(dataTransfer.files);

    setCaptionList(newCaptions);
    // console.log(dataTransfer.files);
  };
  const handleSubmit = () => {
    if(!currentUser) {
      message.error('Please login to upload');
      return;
    }
    if(!imageList) {
      message.error('Please select at least one image');
      return;
    }
    const size= Array.from(imageList).reduce((acc, cur) => {
      if(cur.size > 10000000) {
        message.error(`Image ${cur.name} is larger than 10MB`);
        return acc;
      }
      return acc + cur.size
    }, 0);
    if(size > 10000000) {
       message.error('Total upload size cannot exceed 10MB');
       return;
     }
    const formData = new FormData();
    formData.append("captions", JSON.stringify(captionList));
    // captionList.forEach((caption, index) => {
    //   formData.append(`captions`, caption);
    // });
    // console.log(captionList);
    if (imageList && imageList.length) {
      for (let i = 0; i < imageList.length; i++) {
        formData.append(`images`, imageList[i]);
      }
      // console.log(`User ${sessionStorage.getItem("user")} is uploading ${imageList.length} images`);
    } else {
      message.error("Please select at least one image");
      return;
    }
   setUploading(true);
    uploadFormData(currentUser, formData).then((res) => {

      if(res.status === 200) {
        message.success('Uploaded!');
        setImageList(null);
        setCaptionList([]);
        router.push('/my_space');
      }
      setUploading(false);
    });
  };
  return (
    <div className={styles.mainContainer}>
      {/* Read for upload */}
      {/* <form className={styles.mainContainer} max-file-size="10MB" total-upload-limit="100MB"> */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={styles.addContainer}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={() => handleSelected()}
            multiple
            maxLength={5242880}
          />
          <PlusIcon className={styles.addIcon} />
          {/* <Image  onClick={ ()=>fileInputRef.current?.click()} src={plus} alt="" priority /> */}
          <div className={styles.addIconText}>Select image(s)</div>
        </div>
        {imageList &&
          Array.from(imageList).map((image, index) => {
            // console.log(image.name);
            return (
              <div className={styles.itemContainer} key={index}>
                  <div className={styles.captionLine}>
                  <label className={styles.label} htmlFor={index + ""}>
                    Title:
                  </label>
                  <input
                    className={styles.textInput}
                    type="text"
                    id={index + ""}
                    name={index + ""}
                    value={captionList[index] || "Untitled"}
                    onChange={handleCaptionChange}
                    required
                  />
                </div>
                <Image
                  className={styles.image}
                  src={URL.createObjectURL(image)}
                  width={300}
                  height={300}
                  alt=""
                  priority
                />
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              
              </div>
            );
          })}
        <div className={styles.buttonWrapper}>
        <button disabled={uploading} className={styles.submit} onClick={()=>handleSubmit()}>
          {uploading?"Uplaoding...": "Upload"}
        </button>
        </div>
      {/* </form> */}
    </div>
  );
}

export default Upload;
