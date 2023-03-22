import Link from 'next/link';

// import someDatabaseSDK from 'someDatabaseSDK'

// const databaseClient = someDatabaseSDK.createClient(...)

export default function FirstPost(
    // props
) {
    return <h1>First Post <h1 className="title">
    Welcome to <a href="https://nextjs.org">Next.js!</a>
  </h1><h1 className="title">
  Read <Link href="/">this page!</Link>
</h1></h1>;
  }
  
  export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    // const data = ...
  
    // fetch post data from an external API endpoint
    // const res = await fetch('..');
    // return res.json();

      // fetch post data from a database; only run on server-side; build time only; not suitable for dynamic data on every request
//   return databaseClient.query('SELECT posts...')
    return {
      props: {
        // data
    }
    }
  }

  export async function getServerSideProps(
    // context
    ) {
    return {
      props: {
        // props for your component
      },
    };
  }