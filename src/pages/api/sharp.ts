import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';

async function generateBlurredImage(url:string) {
  // Load the original image from the specified URL
  const image = sharp(Buffer.from(await fetch(url).then(res => res.arrayBuffer())));

  // Generate a blurred version of the image
  const blurredImage = await image.clone().blur(20).jpeg({ quality: 50 }).toBuffer();
  const blurredImageDataUrl = `data:image/jpeg;base64,${blurredImage.toString('base64')}`;

  return blurredImageDataUrl;
}

export default async function handler(  req: NextApiRequest,
  res: NextApiResponse) {
  const { url } = req.query;

  try {
    if(!url) {
      throw new Error('No URL specified');
    }
    // Generate the blurred image data
    const blurredImageData = await generateBlurredImage(url.toString());

    // Send the blurred image data as the response
    res.setHeader('Content-Type', 'text/plain');
    res.send(blurredImageData);
  } catch (error) {
    console.error('Failed to generate blurred image:', error);
    res.status(500).send('Internal Server Error');
  }
}
