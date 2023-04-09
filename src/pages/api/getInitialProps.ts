// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import path from "path";
import { ImageModel } from "../../types/imageModel";
import { NextPageContext } from "next";
import generateRandomId  from "../../utils/generateRandomId";
import moment from "moment";
type Data = {
  images: ImageModel[]
}

export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const images:ImageModel[]=[];
    const dirPath = path.join(process.cwd(), "public/fallbackImages/");
    // console.log(dirPath)
    const filenames = fs.readdirSync(dirPath);
    
    filenames.forEach((filename,index) => {
      // console.log(filename);
      let now = moment().subtract(29-index, "day").valueOf();
      const imageModel:ImageModel={
        id: generateRandomId(8),
        filename: '/fallbackImages/'+filename,
        uploader: {
          email: "test@test.com",
          nickname: "Admin",
          avatarPath: "/icons/logo.svg",
          isAdmin: true
        },
        caption:`Fall back images created by Admin`,
        uploadTime:now,
        comments:[]
      };
    
      images.push(imageModel);
    });
    // await new Promise(resolve => setTimeout(resolve, 2000));


  res.status(200).json({ images: images })
}
