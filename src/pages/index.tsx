import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/pages/Home.module.css";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useRef, useEffect, useState, useContext } from "react";
const inter = Inter({ subsets: ["latin"] });
import DateGroup from "@/components/dateGroup";
import { ImageModel } from "@/types/imageModel";
import Loading from "@/components/layout/loading";
import moment from "moment";
import { getImages } from "@/services/getImages";
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()


export default function Home(props: {
  initialProps: { images: ImageModel[] };
}) {

  const [images, setImages] = useState<ImageModel[]|null>([]);
  useEffect(() => {
    if (!props.initialProps.images){
      return;
    }
    
    let now = moment();
    getImages(now.subtract(publicRuntimeConfig.SHOW_IMAGES_SINCE_DAYS, "day").valueOf())
    .then((res)=>{

        let newList = [...res,...props.initialProps.images];

        if(JSON.stringify(newList)!==JSON.stringify(images)){
          setImages(newList);
        }
    })
    // return () => {images.splice(0,images.length)};
  },[props,images]);
 
  const [groupInView, setGroupInView] = useState(0);
  if (!props.initialProps.images) {
    return <Loading />;
  } else{
    if(images?.length==0){
    images?.push(...props.initialProps.images);
  }
}

  const imageGroups: ImageModel[][] = new Array(publicRuntimeConfig.SHOW_IMAGES_SINCE_DAYS);;
  let now = moment();
  let timestamps: number[] = new Array(publicRuntimeConfig.SHOW_IMAGES_SINCE_DAYS);
  
  for (let i = 0; i < publicRuntimeConfig.SHOW_IMAGES_SINCE_DAYS; i++) {
    let timestamp = now.subtract(i, "day").valueOf();
    timestamps[i] = timestamp;
    imageGroups[i] = [];
  }

  images?.forEach((item) => {

    for (let i = 0; i < timestamps.length; i++) {
      if (item.uploadTime > timestamps[i]) {
        imageGroups[i].push(item);
        break;
      }
    }
  });
  // console.log(imageGroups);
  //   const router = useRouter();
  //   const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     setLoading(false);
  //   }, [props]);
  //   // const {data,setData}=useContext(DataContext);
  //   // setData(props);
  // //  console.log(props);
  //   useEffect(() => {

  //   }, []);
  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

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
  );
}
