import router from 'next/router';
import { userModel } from '../types/userModel';
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();
async function uploadFormData(user:userModel,formData:FormData) {

    const response = await fetch(publicRuntimeConfig.HOST+"/api/uploadImages", {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `${user.id}`,
          }
      });
      return response;
    

          //using next serverless service
    // const response = await fetch("/api/set_profile", {
    //     method: "POST",
    //     body: formData,
    //     mode: 'no-cors'
    //   });
}

export default uploadFormData