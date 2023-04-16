import { ImageModel } from "@/types/imageModel";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/components/DateGroup.module.css";
import Image from "next/image";
import ImageContainer from "@/components/imageContainer";
import ChevronLeft from "/public/icons/chevron-left.svg";
import ChevronRight from "/public/icons/chevron-right.svg";
import Card from "./Card";
function DateGroup(props: { images: ImageModel[], date: number, mutation: React.Dispatch<React.SetStateAction<ImageModel[] | null>> }) {
  const length = props.images.length;
  const [imageInView, setImageInView] = useState(0);
  let date = new Date(props.date);
  const [animationStyle, setAnimationStyle] = useState<
  { [key: string]: string}
  >({
    animationName: "none"
  });
  const groupContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const groupContainer = groupContainerRef.current;
    const handleAnimationEnd = () => {
      setAnimationStyle((prev) => ({ ...prev, animationName: "none",'left': prev['--toLeft'], }));
    };
    groupContainer?.addEventListener("animationend", handleAnimationEnd);

    return () => {
      groupContainer?.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  const handleClickRight = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (imageInView < props.images.length - 1){
      setImageInView(prev=>{    
       return prev+1;
      });
      setAnimationStyle(prev=>{
        return {
          ...prev,
          animationName: styles["slide"],
          animationDuration: "0.5s",
          animationFillMode: "both",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "1",
          '--fromLeft': `${-imageInView*60}vw`,
          '--toLeft':`${-(imageInView+1) * 60}vw`
        }
      });
    } 
  };
  const handleClickLeft = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (imageInView > 0){
      setImageInView(prev=>{
       return prev-1;
      });
      setAnimationStyle(prev=>{
        return {
          ...prev,
          animationName: styles["slide"],
          animationDuration: "0.5s",
          animationFillMode: "both",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "1",
          '--fromLeft': `${-imageInView*60}vw`,
          '--toLeft':`${-(imageInView-1) * 60}vw`
        }
      });
     } 
  };
  // const animationStyle = {
  //   animationName: styles[animation],
  //   animationDuration: "1s",
  //   animationFillMode: "forwards",
  //   animationTimingFunction: "ease-out",
  //   animationIterationCount: "1",
  //   '--fromLeft': `${imageInView * -60}vw`,
  //   '--toLeft':`${imageInView * -60}vw`
  // };
//   console.log(props.images.length, imageInView);

    // left: `${imageInView * -60}vw` 
  return (
    // <div><>{date.toDateString()}</></div>
    <>
      <div ref={groupContainerRef}
        style={animationStyle}
        className={styles.groupContainer}
      >
              <div className={styles.card}><Card date={props.date}></Card></div>

         <div style={{ left: `${imageInView * 60-4}vw` }}  className={styles.iconLayer} >
            <ChevronLeft className={styles.leftIcon}        onClick={handleClickLeft}
          style={{ opacity: `${imageInView == 0 ? 0.3 : 0.7}`,width: `5vw`,height:`5vh` }} />
            <ChevronRight className={styles.rightIcon}           onClick={handleClickRight}
          style={{ opacity: `${imageInView == length - 1 ? 0.3 : 0.7}`,width: `5vw`,height:`5vh`  }} />
      </div>
        {props.images.map((item, i) => {
          let inViewImageIndex = Math.abs(i - imageInView);
          return (
            <ImageContainer
              inViewImageIndex={inViewImageIndex}
              key={item.filename}
              image={item}
              mutation={props.mutation}
            />
          );
        })}
      </div>
    </>
  );
}

export default DateGroup;
