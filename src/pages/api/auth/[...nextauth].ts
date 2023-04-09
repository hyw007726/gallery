// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import LinkedInProvider from 'next-auth/providers/linkedin';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: '225684802849-vad0ugjh4b80m6isf7m7n9cts29ngk6f.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    GitHubProvider({
      clientId: 'a0ffcdad0c8bf46ccbe3',
      clientSecret: '3070ceeeb2ac9be897aab9f3067270ac2aa7ed29',
    }),
    LinkedInProvider({
      clientId: "789r2fk962psyx",
      clientSecret: "8COmbqnWVgt21gpL",
    }),
  ],
  secret:"secret",
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  // callbacks: {
  //   async redirect({url,baseUrl}){
  //     return "http://localhost:3000";
  //   }
  //   // async redirect(url, baseUrl) {
  //   //   return url.startsWith(baseUrl)
  //   //     ? url
  //   //     : process.env.NEXTAUTH_URL + url;
  //   // },
  // },
});
