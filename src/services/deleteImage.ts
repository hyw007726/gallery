import { ImageModel } from "@/types/imageModel";
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();

export async function deleteImageById(id:number) {

    const response = await fetch(publicRuntimeConfig.HOST+`/api/removeImageById?imageId=${id}`, {
        method: "DELETE",
        });
        return await response.text();//image model
}

// Path: gallery/src/services/getImages.ts
            