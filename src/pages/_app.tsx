import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {AuthContextProvider} from '@/components/context/AuthContext'
import {useEffect,useState} from 'react'
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import Layout from '@/components/layout/layout'
import Frame from '@/components/frame'
import { DataContextProvider } from '@/components/context/DataContext';
import path from "path";
import fs from "fs";
import { ImageModel } from '@/types/imageModel';
import generateRandomId from '@/utils/generateRandomId';
import { useSession } from "next-auth/react";
import {getSession,signOut} from "next-auth/react"
import { App as Messenger } from 'antd';
import { Affix, Button } from 'antd';
import { QRCode } from 'antd';
import Link from 'next/link';
import { userModel } from '@/types/userModel';
import {getProfile,handleOAuthEmail} from '@/services/getProfile';
import {message} from 'antd';
import getConfig from 'next/config'
import { notification } from 'antd';


export default function App({ Component, pageProps}: AppProps) {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  // console.log( publicRuntimeConfig);
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  const [frameSrc, setFrameSrc] = useState(publicRuntimeConfig.HOST+"/auth/login");
  const [isAuthed, setIsAuthed] = useState(false);
  const [initialProps, setInitialProps] = useState({});
  const [currentUser, setCurrentUser] = useState<userModel|null>(null);

useEffect(  () => {
 async function fetchInitialProps() {
  const result = await fetch("/api/getInitialProps");
  const images:ImageModel[]= await result.json();
  if(images){
    setInitialProps(images);
  }
  }
  fetchInitialProps();
}, []);

useEffect(() => {
  if(!sessionStorage.getItem('id')||!currentUser){
  notification.success({
    message: `Welcome to AI Gallery!`,
    description: `Try out OpenAI's DALL·E model, which generates images based on text input! You can login, comment, upload, and let your imagination run wild. Give it a try and see what kind of images you can create!`,
    placement: 'bottomLeft',
    duration:100,
  });
}
}, []);

useEffect(() => {
  const userId = sessionStorage.getItem('id');

  if(userId){
  
    getProfile(parseInt(userId)).then(res=>{
      setCurrentUser(res);
      setIsAuthed(true);
    }
    )
  }else{
    getSession().then(res=>{
      if(res?.user?.email){
        const currentUser : userModel ={
          id:0,
          email:res.user.email,
          nickname:res.user.name??res.user.email,
          avatarPath:res.user.image??undefined,
        }
        handleOAuthEmail(currentUser).then(res=>{
          if(res){
            console.log(res);
            sessionStorage.setItem('id', res.id.toString());
          setCurrentUser(res);
          setIsAuthed(true);
          }else{
            console.log(res);
            message.config({
              top: 300,
              duration: 5,
            })
            message.error("Email already exists. Please login with email.");
            signOut();
          }
        }
        )
      }
      // if(res?.user?.name){
      //   sessionStorage.setItem('name', res.user.name);
  
      // }
      // if(res?.user?.image){
      //   sessionStorage.setItem('image', res.user.image);
      // }
    })
  }
  //Handle oauth login

  // if(typeof window !== 'undefined'){
  //   const user=sessionStorage.getItem('user');
  //   if(user){
  //     setIsAuthed(true);
  //   }
  // }

}, []);

  useEffect(() => {
    //Handle traditional login
    const handleMessage = (event: MessageEvent) => {
      const message = event.data.toString();
      // var user=message.indexOf("email=");
      // sessionStorage.setItem('user', message.substring(user+6).split(';')[0]);
      var id=message.indexOf("id=");
      if (id!=-1) {
        const userId=message.substring(id+3).split(';')[0];
        setShowAuth(false);
        sessionStorage.setItem('id', userId);
        getProfile(parseInt(userId)).then(res=>{
          setCurrentUser(res);
          setIsAuthed(true);
        }
        )
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleMaskClick = () => {
    setShowAuth(false);
  };

  return <Messenger><AuthContextProvider authContext={{isAuthed, setIsAuthed, currentUser, setCurrentUser}}>
  {showAuth && (
      <div className="frameMask" onClick={() => handleMaskClick()}>
        <Frame src={frameSrc} />
      </div>
    )}
<Layout setFrameSrc={setFrameSrc} setShowAuth={setShowAuth}>
 <Component {...pageProps} initialProps={initialProps} />
  </Layout>
  {/* <Affix style={{marginLeft:"5px"}} offsetBottom={20}>
    <Link href="mailto:hanya@tcd.ie">    <QRCode value="mailto:hanya@tcd.ie" />    <Button type="primary">
          Email me
        </Button></Link>
      </Affix> */}

        {/* <form action="" style={{width:"15vw",fontSize:"1.2vh", textAlign:"center",position:'absolute',bottom:'0',left:'0',display:"flex",flexDirection:"column",padding:"2vh"}}>
          <div>Find a bug? Tell Wesley immediately</div>
          <textarea id="report" style={{height:"3rem", margin:"1vh 0",padding:"0.5vh 0.5vw",resize:"none"}} />
          <button type="submit">Report</button>
        </form> */}

</AuthContextProvider>
</Messenger>
  // <DataContextProvider dataContext={{data,setData}}>

  //   </DataContextProvider>
}
