import { ImageModel } from "@/types/imageModel";
import { useState } from "react";
import styles from "@/styles/components/DateGroup.module.css";
import Image from "next/image";
import ImageContainer from "@/components/imageContainer";
import ChevronLeft from "/public/icons/chevron-left.svg";
import ChevronRight from "/public/icons/chevron-right.svg";
function DateGroup(props: { images: ImageModel[], date: number, mutation: React.Dispatch<React.SetStateAction<ImageModel[] | null>> }) {
  const length = props.images.length;
  const [imageInView, setImageInView] = useState(0);
  let date = new Date(props.date);
  const handleClickRight = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (imageInView < props.images.length - 1) setImageInView(imageInView + 1);
  };
  const handleClickLeft = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (imageInView > 0) setImageInView(imageInView - 1);
  };
//   console.log(props.images.length, imageInView);
  return (
    // <div><>{date.toDateString()}</></div>
    <>
     
      <div
        style={{ left: `${imageInView * -60}vw` }}
        className={styles.groupContainer}
      >
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
