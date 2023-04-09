import { useRef, useEffect, useState } from "react";

export default function Frame(props: { src: string }) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
return (
<iframe
  ref={iframeRef}
  src={props.src}
    style={{  position: "relative",
    top: "20%",
    zIndex: "999",
    width: "40vw",
    height: "40vh",
    display: "block",
    border: "2px solid black",
    borderRadius: "2%",
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5), -5px -5px 5px rgba(0, 0, 0, 0.5)"
         }}
/>
)
}
