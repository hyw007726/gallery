import { userModel } from '../types/userModel';
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();
async function uploadGenerated(user:userModel,prompt:string,generated:string) {

    const response = await fetch(publicRuntimeConfig.HOST+"/api/uploadGenerated", {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({id:`${user.id}`,prompt:prompt,generated:generated})
                });
      return response;
}
export default uploadGenerated;