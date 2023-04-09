import { CommentModel } from "./commentModel";
import { userModel } from "./userModel";

export type ImageModel = {
    id: number;
    uploader: userModel;
    filename: string;
    caption:string;
    uploadTime:number;
    comments: CommentModel[];
}