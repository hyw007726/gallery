import styles from "@/styles/pages/About.module.css";

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AiGallery</h1>
      <h3 style={{ textIndent: "1rem" }}>Developed by Wesley Han</h3>
      <div className={styles.paragraphs}>
      <p>This is a website where you can try OpenAI&apos;s Dalle model to generate images based on text input. Feel free to login, comment, upload, or generate images with your imagination.</p>
      <p>The frontend is built with TypeScript and React with a few server-side rendering features from the Next.js&apos;s Node environment.</p>
      <p>For the UI and UX, I used many Ant Design components besides Next.js&apos;s Image component. For the styling, I used the built-in CSS Modules.</p>
      <p>The backend is built with Java and Spring Boot. There are four layers: controller, repository, entity and service. The app is deployed on an AliCloud server. The database is MySQL.</p>
       <p>There are basically three entities or data models: Users, Images and Comments. I used JPA to map the object with the tables in backend, and created TypeScript types for the three models in frontend.</p>
       <p>For the authentication,  the GitHub login is done with OAuth, but the email sign-up and login section is developed independently with Java&apos;s Thymeleaf template. Google&apos;s auth is okay in local environment but it requires domain name in production.</p>
        <p>The app hasn&apos;t used CDN service and the server is slow to visit because it&apos;s in China. I almost had the time to add a blur effect for the image optimisation.</p>
      </div>
      
    </div>
  );
};

export default About;
