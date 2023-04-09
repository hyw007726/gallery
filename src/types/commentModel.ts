import { userModel } from "./userModel";

export type CommentModel = {
    id: string;
    post_time: number;
    targetImage: number;
    content:string;
    sender:userModel;
    isLike:boolean;
}