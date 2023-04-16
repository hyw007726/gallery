import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/pages/Generate.module.css";
import uploadFormData from "@/services/uploadFormData";
import PlusIcon from "/public/icons/circle-plus.svg";
import { Button, Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import AuthContext from "@/components/context/AuthContext";
import router from "next/router";
import { Configuration, OpenAIApi } from "openai";
import getConfig from "next/config";
import uploadGenerated from "@/services/uploadGenerated";
import type { NotificationPlacement } from 'antd/es/notification/interface';

function Generate() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [loading, setLoading] = React.useState<boolean>(false);
  const { currentUser } = useContext(AuthContext);
  const [prompt, setPrompt] = React.useState<string>("");
  const [generated, setGenerated] = React.useState<string>("");
useEffect(()=>{
    if(!currentUser){
      notification.warning({
            message: `You haven't logged in!`,
            description: `Your imagination won't be saved! Sign up with us to save and share your big picture!`,
            duration: 5,
          });
    }
},[currentUser])

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };
 
  const submitPrompt = () => {
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const configuration = new Configuration({
      organization: publicRuntimeConfig.OPENAI_ORG,
      apiKey: publicRuntimeConfig.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    if (prompt === "") {
      message.error("Please enter a prompt");
      return;
    }
    setLoading(true);
    openai
      .createImage({
        prompt: prompt,
        n: 1,
        size: currentUser?"1024x1024":"256x256",
      })
      .then((res) => {
        // console.log(res.data.data[0].url);
        setPrompt("");
        if(res.status!==200){
            message.error("Can't generate image");
            setLoading(false);
        }else if (res.data.data[0].url) {
          setGenerated(res.data.data[0].url);
          message.success("Image generated!");
          setLoading(false);
          if(currentUser)
          uploadGenerated(currentUser,prompt,res.data.data[0].url).then((res)=>{
            if(res.status === 200){
                message.success("Image uploaded!");
               
            }else{
                message.error("Can't upload generated image");
                setLoading(false);
            }
            });
            
        }
      }).catch((err)=>{
          message.error("Illegal prompt! Please try again!");
          setLoading(false);
        });
  };

  return (
    <div className={styles.container}>
      <h3>Describe the image you want to generate:</h3>
      <div>
        <textarea
          className={styles.textArea}
          name="prompt"
          id="prompt"
          cols={30}
          rows={5}
          onChange={(e) => handleChangeInput(e)}
        ></textarea>
      </div>
      <Button disabled={loading} onClick={submitPrompt}>
        {" "}
        {loading ? "Generating" : "Generate"}{" "}
        <Spin
          style={{ display: loading ? "inline" : "none" }}
          className={styles.spin}
          indicator={antIcon}
        />{" "}
      </Button>
      {generated && (
        <div>
                 <Image
                    style={{width:currentUser?"60vw":"20vw"}}
                   className={styles.generatedImage}
                   src={generated}
                   width={300}
                   height={300}
                   alt=""
                   priority
                 />
    </div>)
        }
    </div>
    // <div className={styles.mainContainer}>
    //   {/* Read for upload */}
    //   {/* <form className={styles.mainContainer} max-file-size="10MB" total-upload-limit="100MB"> */}
    //     <div
    //       onClick={() => fileInputRef.current?.click()}
    //       className={styles.addContainer}
    //     >
    //       <input
    //         type="file"
    //         ref={fileInputRef}
    //         style={{ display: "none" }}
    //         accept="image/*"
    //         onChange={() => handleSelected()}
    //         multiple
    //         maxLength={5242880}
    //       />
    //       <PlusIcon className={styles.addIcon} />
    //       {/* <Image  onClick={ ()=>fileInputRef.current?.click()} src={plus} alt="" priority /> */}
    //       <div className={styles.addIconText}>Select image(s)</div>
    //     </div>
    //     {imageList &&
    //       Array.from(imageList).map((image, index) => {
    //         // console.log(image.name);
    //         return (
    //           <div className={styles.itemContainer} key={index}>
    //             <Image
    //               className={styles.image}
    //               src={URL.createObjectURL(image)}
    //               width={300}
    //               height={300}
    //               alt=""
    //               priority
    //             />
    //             <button
    //               className={styles.removeButton}
    //               onClick={() => handleRemove(index)}
    //             >
    //               Remove
    //             </button>
    //             <div className={styles.captionLine}>
    //               <label className={styles.label} htmlFor={index + ""}>
    //                 Title:
    //               </label>
    //               <input
    //                 className={styles.textInput}
    //                 type="text"
    //                 id={index + ""}
    //                 name={index + ""}
    //                 value={captionList[index] || "Untitled"}
    //                 onChange={handleCaptionChange}
    //                 required
    //               />
    //             </div>
    //           </div>
    //         );
    //       })}
    //     <div className={styles.buttonWrapper}>
    //     <button className={styles.submit} onClick={()=>handleSubmit()}>
    //       Upload   <Spin className={styles.spin} indicator={antIcon}/>
    //     </button>
    //     </div>

    //   {/* </form> */}
    // </div>
  );
}

export default Generate;
