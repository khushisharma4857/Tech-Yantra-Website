import { Link } from 'react-router-dom';
import BubbleMenu from '../components/Bubblemenu';

const projects = [
  {
    tag: 'Flagship SaaS', title: 'YantraMail AI',
    desc: 'MERN-stack email assistant with Google OAuth, Gmail API, and Gemini AI — drafts, triages, and sends on the user\'s behalf.',
    stack: ['MongoDB', 'Express', 'React', 'Gemini API'], alt: false,
    icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>
  },
  {
    tag: 'QA Platform', title: 'TestCart AI',
    desc: 'A working MERN e-commerce storefront paired with a full QA suite — test case management, AI-generated cases, bug tracking, Playwright E2E.',
    stack: ['MERN', 'Playwright', 'AI Test-gen'], alt: true,
    icon: <><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h2l2.4 12.4a2 2 0 002 1.6h8.6a2 2 0 002-1.6L21 7H6" /></>
  },
  {
    tag: 'ERP', title: 'School Management ERP',
    desc: 'Attendance, fees, and academic records in one dashboard, replacing spreadsheets across departments.',
    stack: ['Node.js', 'MongoDB'], alt: false,
    icon: <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M5 10.5V16c0 1.5 3 3 7 3s7-1.5 7-3v-5.5" /></>
  },
  {
    tag: 'CRM', title: 'Dental Practice CRM',
    desc: 'Patient records, appointment pipelines, and follow-up automation for a multi-chair clinic.',
    stack: ['React', 'PostgreSQL'], alt: true,
    icon: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /><path d="M8 14l2.5 2.5L16 11" /></>
  },
  {
    tag: 'Web + Automation', title: 'Ashnoor Machine Tools',
    desc: 'Industrial manufacturer site with SEO, GEO, WhatsApp automation, and CLM software delivered as one engagement.',
    stack: ['SEO', 'WhatsApp API', 'CLM'], alt: false,
    icon: <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.1-3.1a4 4 0 01-5.4 5.4L6 21l-3-3 9.4-9.4a4 4 0 015.4-5.4l-3.1 3.1z" />
  }
];

export default function WorkPage() {
  return (
    <>
      <div className="bg-grid" />
      <BubbleMenu />

      <header style={{ paddingTop: '160px', paddingBottom: '80px', maxWidth: '1400px', margin: '0 auto', textAlign: 'center', paddingLeft: '48px', paddingRight: '48px' }}>
        <span className="tag" style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--primary)', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>Portfolio</span>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: '24px' }}>Products shipped,<br />not mockups.</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>Hover or tap over any card to reveal the architecture, stack, and business impact behind the build.</p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', maxWidth: '1400px', margin: '0 auto', padding: '0 48px 120px' }}>
        {projects.map((project, i) => (
          <div key={i} style={{ perspective: '1000px', height: '420px', cursor: 'pointer' }}>
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
    </>
  );
}