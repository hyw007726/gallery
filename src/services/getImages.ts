import { ImageModel } from "@/types/imageModel";
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();
export async function getImages(daysBefore:number) {
  // test: http://localhost:8080/api/getImages?since=1677583148409

    const response = await fetch(publicRuntimeConfig.HOST+"/api/getImages?since="+daysBefore, {
        method: "GET",
      });
      const jsonData:ImageModel[] = await response.json();//image model
      // console.log('data from getImages');
      // console.log(jsonData);
      if(Array.isArray(jsonData)) {
      const images: ImageModel[] = jsonData.map((data:ImageModel) => {
        const image:ImageModel = {} as ImageModel;
        image.id = data.id;
        image.filename = publicRuntimeConfig.UPLOADS_FOLDER+data.filename;
        image.caption = data.caption;
        image.uploadTime = data.uploadTime;
        image.uploader = data.uploader;
        image.comments=data.comments;
        return image;
      });
      console.log(images);
      return images;
    }else{
      return [];
    }
}


export async function getImagesByUserId(id:number, daysBefore:number) {
    const response = await fetch(publicRuntimeConfig.HOST+"/api/getImagesByUser?id="+id+"&since="+daysBefore, {
        method: "GET",
      });
      const jsonData:ImageModel[] = await response.json();//image model
      
      const images: ImageModel[] = jsonData.map((data:ImageModel) => {
        return {...data, filename:publicRuntimeConfig.UPLOADS_FOLDER+data.filename};
      });
     
      return images;
}