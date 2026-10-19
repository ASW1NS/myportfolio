
import "./App.css";
import Reveal from "./Reveal";
import { motion, useReducedMotion } from "motion/react";
import InteractiveProjectCard from "./InteractiveProjectCard";
import CursorParticles from "./CursorParticles";
import ConstellationBackground from "./ConstellationBackground";

const projects = [
  {
    title: "MedChecker",
    description:
      "A medicine availability checker that helps users find medicines at nearby pharmacies.",
    features: [
      "Medicine search",
      "Pharmacy inventory management",
    ],
    tech: ["React.js", "Flask", "SQLite"],
    github: "https://github.com/ASW1NS/medck",
  },
 
];

const skills = [
  "React.js",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Python",
  "Flask",
  "SQLite",
  "Git & GitHub",
];

function Navbar() {
  return (
    <header className="navbar">
      <a className="logo" href="#home">
        Aswin Suresh
      </a>

      <nav aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact" className="nav-button">
          Contact ↗
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <div className="availability">
          <span className="status-dot" />
          Open to jobs
        </div>


        
<motion.h1
  initial={{ opacity: 0, y: 35 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  
  <motion.span
    className="muted-title"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.3 }}
  >
    Developer in progress.
  </motion.span>
</motion.h1>


        
<motion.p
  className="hero-description"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.5 }}
>
  I'm an MCA student passionate about building
  useful applications, solving problems, and
  learning modern technologies.
</motion.p>


        <div className="hero-actions">
          <a className="primary-button" href="#projects">
            Explore my work ↗
          </a>
          <a className="secondary-button" href="#contact">
            Let's connect
          </a>
          <a
            className="secondary-button resume-button"
            href="/resume.pdf"
            download="Aswin-Suresh-Resume.pdf"
          >
            ↓ Download Resume
          </a>
        </div>

        <div className="social-links">
          <a
            href="https://github.com/ASW1NS"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>

          <a
            href="https://www.linkedin.com/in/aswin-suresh-790705274"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className="hero-art" aria-label="Animated code illustration">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />

        <div className="code-card">
          <div className="code-header">
            <span />
            <span />
            <span />
            <small>developer.jsx</small>
          </div>

          <pre>
            <code>
              <span className="purple">const</span>{" "}
              developer = {"{"}
              {"\n"}  name:{" "}
              <span className="green">"Aswin Suresh"</span>,
              {"\n"}  role:{" "}
              <span className="green">"Software Developer"</span>,
              {"\n"}  skills: [
              {"\n"}    <span className="green">"React"</span>,
              {"\n"}    <span className="green">"Python"</span>
              {"\n"}  ],
              {"\n"}  learning:{" "}
              <span className="orange">true</span>
              {"\n"}
              {"}"};
            </code>
          </pre>

          <div className="code-footer">
            <span className="status-dot" />
            Ready to build
          </div>
        </div>

        <div className="floating-tag tag-one">
          {"{ }"} React
        </div>

        <div className="floating-tag tag-two">
          ✦ Keep creating
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      className="section-wrap content-section"
      id="about"
    >
      <Reveal>
      <p className="eyebrow">01 / ABOUT ME</p>

      <h2>
        Curious mind.
        <br />
        <span className="gradient-text">
          Builder's mindset.
        </span>
      </h2>

      <p className="section-description">
        I'm an MCA student who enjoys developing web
        applications and exploring new technologies.
        I'm looking for an internship where I can
        contribute to real projects and grow as a developer.
      </p>
      </Reveal>
    </section>
  );
}

function Projects() {
  return (
    <section
      className="section-wrap content-section"
      id="projects"
    >
      <Reveal>
      <p className="eyebrow">02 / SELECTED WORK</p>

      <h2>
        Things I've built
        <span className="gradient-text">.</span>
      </h2>

      <div className="project-grid">
        {projects.map((project, index) => (
          <InteractiveProjectCard key={project.title}>
            <div className="project-top">
              <span>
                PROJECT {String(index + 1).padStart(2, "0")}
              </span>
              <span className="project-arrow">↗</span>
            </div>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <ul className="project-features">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
                ))}
            </ul>

            <div className="tech-list">
              {project.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <a
              className="project-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              View source code ↗
            </a>
          </InteractiveProjectCard>
        ))}
      </div>
      </Reveal>
    </section>
  );
}


function Skills() {
  return (
    <section
      className="section-wrap content-section"
      id="skills"
    >
      <Reveal>
        <p className="eyebrow">03 / MY TOOLKIT</p>

        <h2>
          Technologies I use
          <span className="gradient-text">.</span>
        </h2>

        <div className="skills-list">
          {skills.map((skill, index) => (
            <motion.span
              className="skill-pill"
              key={skill}
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              whileHover={{
                y: -5,
                scale: 1.05,
              }}
              viewport={{
                once: false,
                amount: 0.1,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.07,
                ease: "easeOut",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}


function Contact() {
  return (
    <section
      className="section-wrap contact-section"
      id="contact"
    >
      <Reveal>
      <p className="eyebrow">04 / CONTACT</p>

      <h2>Let's build something.</h2>

      <p>
        Interested in working together? I'd love to hear from you.
      </p>

      <a
        className="primary-button"
        href="https://mail.google.com/mail/?view=cm&fs=1&to=aswinsuresh259@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get in touch ↗
      </a>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      

      <p>@All Rights Reserved</p>

      <a href="#home">Back to top ↑</a>
    </footer>
  );
}

function App() {
  return (
    <>
    <ConstellationBackground />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
