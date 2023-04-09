import { userModel } from "@/types/userModel";
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();

export async function getProfile(id:number) {
    // const user = sessionStorage.getItem('user');
    const response = await fetch(publicRuntimeConfig.HOST+"/api/getProfile", {
        method: "GET",
        headers: {
            "Authorization": `${id}`
          }
      });
      return await response.json();
}
export async function handleOAuthEmail(user:userModel) {
    // const user = sessionStorage.getItem('user');
    const response = await fetch(publicRuntimeConfig.HOST+`/api/handleOAuthEmail?nickname=${user.nickname}&avatar=${user.avatarPath}`, {
        method: "GET",
        headers: {
            "Authorization": `${user.email}`
          }
      });
      if(response.status===200){
        return response.json();
      }else{
        return null;
      }
      
}
