import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import BubbleMenu from '../components/Bubblemenu';

export default function NotFoundPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.05 }} 
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '24px'
      }}
    >
      <SEO 
        title="404 - Page Not Found | Tech Yantra"
        description="The page you are looking for does not exist."
      />
      <BubbleMenu />
      
      <div className="bg-grid" />
      
      <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(80px, 15vw, 160px)', fontWeight: 800, color: 'var(--primary)', lineHeight: 1, marginBottom: '24px' }}>404</h1>
      <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 600, marginBottom: '16px' }}>Signal Lost</h2>
      <p style={{ color: 'var(--text-dim)', fontSize: '18px', maxWidth: '400px', marginBottom: '40px', lineHeight: 1.6 }}>
        We couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      
      <Link to="/" className="btn-primary" style={{ display: 'inline-flex', padding: '16px 32px', background: 'var(--primary)', color: '#fff', textDecoration: 'none', borderRadius: '999px', fontWeight: 600, letterSpacing: '.05em' }}>
        Return to Base
      </Link>
    </motion.div>
  );
}
