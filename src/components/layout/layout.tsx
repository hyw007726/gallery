import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/components/Layout.module.css";
import HeaderLogo from "../../../public/icons/logo.svg";
import { useContext, useState, useRef } from "react";
import AuthContext from "@/components/context/AuthContext";
import path from "path";
import fs from "fs";
import { ImageModel } from "@/types/imageModel";
import generateRandomId from "@/utils/generateRandomId";
import Avatar from "react-avatar";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import type { MenuProps } from "antd";
import { Button, Dropdown, message } from "antd";
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();

const Layout = ({
  children,
  setFrameSrc,
  setShowAuth,
}: {
  children: React.ReactNode;
  setFrameSrc: (src: string) => void;
  setShowAuth: (showAuth: boolean) => void;
}) => {
  const items: MenuProps["items"] = [
    {
      key: "email",
      label: "Login with email",
      onClick: () => {
        setFrameSrc(publicRuntimeConfig.HOST+"/auth/login");
        setShowAuth(true);
      },
    },
    // {
    //   key: "google",
    //   label: "Login with Google",
    //   onClick: () => signIn("google", { callbackUrl: publicRuntimeConfig.PAGE_ENTRY}),
    // },
    // {
    //   key: "linkedin",
    //   label: "Login with LinkedIn",
    //   onClick: () => signIn("linkedin"),
    // },
    {
      key: "github",
      label: "Login with GitHub",
      onClick: () => signIn("github"),
    },
    {
      key: "signup",
      label: "Sign up with email",
      onClick: () => {
        setFrameSrc(publicRuntimeConfig.HOST+"/auth/sign_up");
        setShowAuth(true);
      },
    },
    // {
    //   key: 'login',
    //   label: 'Login',
    //   children: [
    //     {
    //       key: 'email',
    //       label: 'Login with email',
    //       onClick: () => {
    //         setFrameSrc("http://localhost:8080/auth/login");
    //         setShowAuth(true);

    //       }
    //     },
    //     {
    //       key: 'google',
    //       label: 'Login with Google',
    //       onClick: () => signIn('google'),

    //     },
    //     {
    //       key: 'github',
    //       label: 'Login with GitHub',
    //       onClick: () => signIn('github'),
    //     },
    //     {
    //       key: 'signup',
    //       label: 'Sign up with email',
    //       onClick: () => {
    //         setFrameSrc("http://localhost:8080/auth/sign_up");
    //         setShowAuth(true);
    //       },
    //     },
    //   ]
    // }
  ];
  const router = useRouter();
  const { isAuthed, setIsAuthed, currentUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);

  const handleAuth = (e: any) => {
    if (e.target.id == "login") {
      // signIn();
      // setFrameSrc("/api/signin");
      // setFrameSrc("http://localhost:8080/auth/login");
      // setShowAuth(true);
    } else if (e.target.id == "sign_up") {
      // setFrameSrc("http://localhost:8080/auth/sign_up");
      // setShowAuth(true);
    } else if (e.target.id == "logout") {
      console.log("logout");
      message.success("Logged out");
      setIsAuthed(false);
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("image");
      sessionStorage.removeItem("name");
      signOut();
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Gallery</title>
        <meta name="description" content="Gallery developed by Wesley" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <HeaderLogo className={styles.icon} />
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link className={styles.link} href="/">
                Gallery
              </Link>
            </li>
            {isAuthed && (
              <>
                <li
                  className={styles.navItem}
                  id="space"
                  onClick={() => router.push("/my_space")}
                >
                  My space
                </li>
                {" "}
                <li
                  className={styles.navItem}
                  id="upload"
                  // onClick={ ()=>fileInputRef.current?.click()}
                  onClick={() => router.push("/upload")}
                >
                  {/* <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={()=>handleUpload()}
                    multiple
                  /> */}
                  Upload
                </li>{" "}
                
                <li
                  className={styles.navItem}
                  id="account"
                  onClick={() => router.push("/account")}
                >
                  Account
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className={styles.navItem}>
          {isAuthed ? (
            <span className={styles.logout}>
              {
              currentUser?.avatarPath?(
                <Image
                  alt=""
                  onClick={() => setShowLogout(!showLogout)}
                  src={currentUser.avatarPath}
                  width={50}
                  height={50}
                  priority
                  unoptimized
                ></Image>
              ) : (
                <Avatar
                  name={currentUser?.nickname || currentUser?.email || "G"}
                  size="5vh"
                  round={true}
                  onClick={() => setShowLogout(!showLogout)}
                />
              )
              }
              <div
                id="logout"
                style={{
                  display: showLogout ? "block" : "none",
                  textAlign: "center",
                  fontSize: "0.5rem",
                }}
                onClick={(e) => handleAuth(e)}
              >
                Log out
              </div>
            </span>
          ) : (
            <Dropdown menu={{ items }} arrow>
              <span>Login</span>
            </Dropdown>
          )}{" "}
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer></footer>
    </>
  );
};
export default Layout;
