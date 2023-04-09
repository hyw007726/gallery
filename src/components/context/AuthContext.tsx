import { createContext, useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { App as Messenger } from "antd";
import { userModel } from "@/types/userModel";
interface ContextProps {
  isAuthed: boolean;
  setIsAuthed: (isAuthed: boolean) => void;
  currentUser: userModel | null;
  setCurrentUser: Dispatch<SetStateAction<userModel | null>>
}
const AuthContext = createContext<ContextProps>({
  isAuthed: false,
  setIsAuthed: () => {},
  currentUser: null,
  setCurrentUser: () => {},
});

function AuthContextProvider({
  children,
  authContext,
}: {
  children: React.ReactNode;
  authContext: {
    isAuthed: boolean;
    setIsAuthed: Dispatch<SetStateAction<boolean>>;
    currentUser: userModel | null;
    setCurrentUser: Dispatch<SetStateAction<userModel | null>>;
  };
}) {
  useEffect(() => {
    if(authContext.isAuthed){
    }
  }, [authContext]);
  // const { modal, notification } = Messenger.useApp();
  // useEffect(() => {
  // if(authContext.isAuthed){
  //   notification.success({
  //     message: `Logged in successfully`,
  //     description: 'Welcome back',
  //     placement: 'bottomRight',
  //   });
  // }
  // }, [authContext.isAuthed, notification]);
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
