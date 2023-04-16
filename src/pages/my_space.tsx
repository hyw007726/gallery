import React, { Component,useState,useEffect, useContext } from 'react'
import styles from "@/styles/pages/Space.module.css";
import DateGroup from "@/components/dateGroup";
import { ImageModel } from "@/types/imageModel";
import moment from "moment";
import { getImagesByUserId } from "@/services/getImages";
import Loading from '@/components/layout/loading';
import { Empty } from 'antd';
import AuthContext from '@/components/context/AuthContext';
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default function My_space(){
  const [images, setImages] = useState<ImageModel[]|null>(null);
  const {currentUser} = useContext(AuthContext);
  const [groupInView, setGroupInView] = useState(0);
  
  useEffect(() => {
    let now = moment();
    if(currentUser?.id){
      getImagesByUserId(currentUser.id,now.subtract(publicRuntimeConfig.SHOW_IMAGES_SINCE_DAYS, "day").valueOf())
      .then((res)=>{
          if(JSON.stringify(res)!==JSON.stringify(images)){
            setImages(res);
          }
      })
    }
  },[images,currentUser]);

  if(!currentUser){
    return <div className={styles.noImages}>Please login first</div>
  }else if (images==null) {
    return <Loading />;
  } else if(images.length==0){
    return <div className={styles.noImages}><Empty description={"You haven't uploaded any images"} /></div>
  } else{
  
  const imageGroups: ImageModel[][] = new Array(publicRuntimeConfig.SHOW_IMAGES_SINCE_DAYS);;
  let now = moment();
  let timestamps: number[] = new Array(publicRuntimeConfig.SHOW_IMAGES_SINCE_DAYS);
  
  for (let i = 0; i < publicRuntimeConfig.SHOW_IMAGES_SINCE_DAYS; i++) {
    let timestamp = now.subtract(i, "day").valueOf();
    timestamps[i] = timestamp;
    imageGroups[i] = [];
  }
// console.log(timestamps);
  images.forEach((item) => {
    // console.log(item.uploadTime);
    for (let i = 0; i < timestamps.length; i++) {
      if (item.uploadTime > timestamps[i]) {
        imageGroups[i].unshift(item);
        break;
      }
    }
  });

    return (
      <>
      <div className={styles.content}>
        {imageGroups.map((images, i) => {
          if (images.length > 0 ){
            return (
              <DateGroup
                key={timestamps[i]}
                date={timestamps[i]}
                images={images}
                mutation={setImages}
              />
            );
          }else{
            return null;
          }
      
        })}

      </div>
    </>
    )
      }
}