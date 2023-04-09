// import Layout from '../../components/layout';

export default function Item(props:any) {
  return 

<div dangerouslySetInnerHTML={{ __html: props.contentHtml }} />

}

// export async function getStaticPaths() {
//   // Return a list of possible value for id

// //   return {
// //     paths,
// //     fallback: false,
// //   };
// }