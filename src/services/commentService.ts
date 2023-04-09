import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();

export async function postComment(commenter:number,imageId:number,content:string,isLike:boolean) {

  const response = await fetch(publicRuntimeConfig.HOST+`/api/postComment?commenter=${commenter}&image=${imageId}&content=${content}&isLike=${isLike}`, {
        method: "GET",
      });
      return await response.json();
}
export async function getComments(imageId:number) {

  const response = await fetch(publicRuntimeConfig.HOST+`/api/getComments?image=${imageId}`, {
      method: "GET",
      });
      const result = await response.json();
  return result;
      
}
export async function deleteComment(commentId:string) {
  const user = sessionStorage.getItem('id');
  // console.log(user);
  const response = await fetch(publicRuntimeConfig.HOST+`/api/deleteComment?id=${commentId}`, {
      method: "DELETE",
      headers: {
      "Authorization": `${user}`
      }
      });
      const result = await response.text();
  return result;
}
export async function editComment(commentId:string, content:string) {
  const user = sessionStorage.getItem('id');
  const response = await fetch(publicRuntimeConfig.HOST+`/api/updateComment?id=${commentId}&content=${content}`, {
      method: "PUT",
      headers: {
      "Authorization": `${user}`
      }
      });
      const result = await response.json();
  return result;
}