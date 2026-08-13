import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { gsap } from 'gsap';
import BubbleMenu from '../components/Bubblemenu';

import { projects } from '../data/projects';

export default function WorkPage() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <SEO
        title="Portfolio & Recent Work | Tech Yantra"
        description="Explore our recent projects including AI-powered SaaS platforms, custom ERPs, and automated CRMs built by Tech Yantra."
        keywords="portfolio, projects, SaaS, ERP, CRM, Tech Yantra work"
        url="https://techyantra.org/work"
        schemaType="CollectionPage"
        isCollection={true}
      />

      <div className="bg-grid" />
      <BubbleMenu />

      <header className="work-header">
        <span className="tag">Portfolio</span>
        <h1>Products shipped,<br />not mockups.</h1>
        <p>
          Each build below was scoped, engineered, and deployed end-to-end in-house —
          with the stack and system design behind it laid out in full.
        </p>
      </header>

      <main id="main-content" className="work-grid">
        {projects.map(project => (
          <article key={project.title} className={`project-card ${project.alt ? 'is-alt' : ''}`}>
            <div className="project-card-head">
              <span className="project-tag">{project.tag}</span>
              <svg className="project-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {project.icon}
              </svg>
            </div>

            <div className="project-card-body">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-desc">{project.desc}</p>

              <div className="project-stack">
                <span className="project-stack-label">Built with</span>
                <ul>
                  {project.stack.map(tech => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </main>

      <section className="work-cta">
        <h2>Building something similar?</h2>
        <p>Tell us the problem and you'll get a rough scope and timeline within one business day.</p>
        <Link to="/#contact" className="btn-primary">
          <span>Start a project →</span>
        </Link>
      </section>

      <footer className="work-footer">
        <p>
          © {new Date().getFullYear()} Tech Yantra.{' '}
          <Link to="/">Back to home</Link>
        </p>
      </footer>
    </motion.div>
  );
}
