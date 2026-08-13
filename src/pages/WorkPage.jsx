import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { gsap } from 'gsap';
import BubbleMenu from '../components/Bubblemenu';

import { projects } from '../data/projects';

export default function WorkPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card', 
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

      <header style={{ paddingTop: '160px', paddingBottom: '80px', maxWidth: '1400px', margin: '0 auto', textAlign: 'center', paddingLeft: '48px', paddingRight: '48px' }}>
        <span className="tag" style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--primary)', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>Portfolio</span>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: '24px' }}>Products shipped,<br />not mockups.</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>Hover or tap over any card to reveal the architecture, stack, and business impact behind the build.</p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', maxWidth: '1400px', margin: '0 auto', padding: '0 48px 120px' }}>
        {projects.map((project, i) => (
          <div key={i} className="project-card" style={{ perspective: '1000px', height: '420px', cursor: 'pointer' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)', transformStyle: 'preserve-3d' }} 
                 className="flip-card-inner"
                 onMouseEnter={(e) => e.currentTarget.style.transform = 'rotateY(180deg)'}
                 onMouseLeave={(e) => e.currentTarget.style.transform = 'rotateY(0deg)'}>
              
              <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border)', background: project.alt ? 'linear-gradient(155deg, #111111, #3a3a3a)' : 'linear-gradient(155deg, #E30613, #7a0410)', color: '#fff' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', background: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '999px', letterSpacing: '.05em', alignSelf: 'flex-start', color: '#fff' }}>{project.tag}</span>
                <svg style={{ width: '48px', height: '48px', marginTop: 'auto', stroke: '#fff', strokeWidth: '1.3' }} viewBox="0 0 24 24" fill="none">{project.icon}</svg>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', opacity: 0.7, marginTop: '16px' }}>Hover or tap for details ↻</span>
              </div>
              
              <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
                <div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '12px', display: 'block' }}>{project.tag}</span>
                  <h3 style={{ fontFamily: 'var(--display)', fontSize: '24px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>{project.desc}</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.stack.map((tech, j) => (
                    <span key={j} style={{ fontFamily: 'var(--mono)', fontSize: '11px', background: 'var(--card)', padding: '6px 12px', borderRadius: '6px', color: 'var(--text-dim)', border: '1px solid var(--border)' }}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '48px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '14px' }}>
        <p>© 2026 Tech Yantra. <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Back to Home</Link></p>
      </footer>
    </motion.div>
  );
}