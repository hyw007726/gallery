import styles from "@/styles/pages/About.module.css";

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AiGallery</h1>
      <h3 style={{ textIndent: "1rem" }}>Developed by Wesley Han</h3>
      <div className={styles.paragraphs}>
      <p>Try out OpenAI&apos;s DALL·E model, which generates images based on text input! You can login, comment, upload, and let your imagination run wild. Give it a try and see what kind of images you can create!</p>
      <p>The frontend is built with TypeScript and React/Next.js with a few server-side rendering features using server&apos;s Node environment.</p>
      <p>For the UI and UX, I used many Ant Design components besides Next.js&apos;s built-in component. For the styling, I used the built-in CSS Modules.</p>
      <p>The backend is built with Java and Spring Boot. There are four layers: controller, repository, entity and service. The app is deployed on an AliCloud server. The database is MySQL.</p>
       <p>There are basically three entities or data models: Users, Images and Comments. I used JPA to map the object with the tables in backend, and created TypeScript types for the three models in frontend.</p>
       <p>For authentication,  the GitHub login is done with OAuth, but the email sign-up and login section is developed independently with Java&apos;s Thymeleaf template. Google&apos;s auth is okay in local environment but it requires domain name in production.</p>
      <p>User&apos;s password will be encrypted first before being saved in database. If you login with a GitHub account for the first time, you&apos;ll receive an email with a code for tradional login, so you won&apos;t have duplicate accounts with the same email address.</p>
      <p>For user&apos;s input sanitization, I set a list of keywords such as eval to avoid cross-site scripting attacks. Spring Boot&apos;s JPA also defends against SQL injection by default.</p>
      </div>
      <h4>&nbsp;&nbsp;GitHub repos: </h4>
       <h5>&nbsp;&nbsp;&nbsp;&nbsp; https://github.com/hyw007726/gallery &#40;frontend:&#41;</h5>
       <h5>&nbsp;&nbsp;&nbsp;&nbsp; https://github.com/hyw007726/gallery_backend &#40;backend&#41;</h5>
       <h4>Contact: hanya@tcd.ie</h4>
    </div>
  );
};
  
export default About;
