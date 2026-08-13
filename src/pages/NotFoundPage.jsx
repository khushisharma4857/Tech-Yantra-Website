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
    >
      <SEO
        title="404 — Page Not Found | Tech Yantra"
        description="The page you are looking for does not exist."
        url="https://techyantra.org/404"
      />

      <div className="bg-grid" aria-hidden="true" />
      <BubbleMenu />

      <main id="main-content" className="notfound">
        <p className="notfound-code" aria-hidden="true">404</p>
        <h1>Signal lost</h1>
        <p className="notfound-copy">
          We couldn't find the page you're looking for. It may have been moved or
          deleted — or the link that brought you here is out of date.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn-primary"><span>Return to home</span></Link>
          <Link to="/work" className="btn-secondary">Browse recent work</Link>
        </div>

        {/* A dead end is a bad place to lose someone - offer the routes they
            were most likely looking for. */}
        <nav className="notfound-links" aria-label="Popular pages">
          <span className="notfound-links-label">Popular pages</span>
          <ul>
            <li><Link to="/#services">Services</Link></li>
            <li><Link to="/#pricing">Pricing</Link></li>
            <li><Link to="/work">Portfolio</Link></li>
            <li><Link to="/#contact">Contact</Link></li>
          </ul>
        </nav>
      </main>
    </motion.div>
  );
}
