import { userModel } from "@/types/userModel";
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();

async function uploadProfile(id:number,formData:FormData):Promise<userModel> {
    const response = await fetch(publicRuntimeConfig.HOST+"/api/set_profile?uploadPath="+publicRuntimeConfig.UPLOADS_FOLDER, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `${id}`
          }
      });
      return await response.json();
      // if (response.ok) {
      //   const data = await response.json();
      //   console.log(data);
      // }

          //using next serverless service
    // const response = await fetch("/api/set_profile", {
    //     method: "POST",
    //     body: formData,
    //     mode: 'no-cors'
    //   });
}

export default uploadProfile