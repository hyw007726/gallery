// export default function generateRandomId(length: number): string {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
  
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
  
//     return result;
//   }
  export default function generateRandomId(length: number): number {
  
    return parseInt(Math.random().toString().substring(2, length));
  }