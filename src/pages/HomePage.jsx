import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import BubbleMenu from '../components/Bubblemenu';
import ContactForm from '../components/ContactForm';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { num: '01', title: 'Web Platforms', desc: 'Marketing sites to full SaaS applications — React, Next.js, MERN, built for speed and SEO from day one.', icon: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 21h8" /></> },
  { num: '02', title: 'Mobile Apps', desc: 'Cross-platform apps that share a codebase with your web product, so features ship once, not twice.', icon: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></> },
  { num: '03', title: 'AI Products', desc: 'LLM-powered tools — email automation, resume analysis, chat assistants — built on Gemini and Claude APIs.', icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></> },
  { num: '04', title: 'ERP Systems', desc: 'Custom operational software — school management, inventory, workflow tools tailored to how your team actually works.', icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></> },
  { num: '05', title: 'CRM & CLM', desc: 'Client and contract lifecycle tools that keep sales, delivery, and renewals in one system of record.', icon: <path d="M17 20a5 5 0 00-10 0M12 12a4 4 0 100-8 4 4 0 000 8z" /> },
  { num: '06', title: 'SEO & GEO', desc: 'Technical SEO and generative-engine optimization so your business surfaces in both search and AI answers.', icon: <><path d="M3 12l4-8 4 8 4-8 4 8" /><path d="M3 18h18" /></> }
];

const WHY_POINTS = [
  { title: 'Direct to the founder', desc: 'You talk to the person writing your code — no account managers, no lost-in-translation briefs.' },
  { title: 'Full-stack by default', desc: 'Frontend, backend, database, deployment — one coherent build instead of stitched-together vendors.' },
  { title: 'AI-native tooling', desc: 'Every product is built with a path to AI features — automation, generation, or analysis — from day one.' },
  { title: 'QA is not an afterthought', desc: 'Test coverage and E2E automation are part of delivery, not a favor.' }
];

/**
 * The layers we own on a typical build. Every technology listed here is one
 * already used in the shipped work on the portfolio page - this diagram is a
 * factual summary of the stack, not a capability wish-list.
 */
const STACK_LAYERS = [
  { layer: 'Interface', tech: 'React · Next.js', note: 'What your users touch' },
  { layer: 'Application', tech: 'Node.js · Express · Python', note: 'Business logic and APIs' },
  { layer: 'Data', tech: 'MongoDB · PostgreSQL', note: 'Schema, migrations, integrity' },
  { layer: 'Intelligence', tech: 'Gemini · Claude APIs', note: 'Automation and generation' },
  { layer: 'Quality', tech: 'Playwright E2E', note: 'Regression suites before release' },
  { layer: 'Delivery', tech: 'AWS · Google OAuth', note: 'Deployment, auth, monitoring' }
];

const PRICING = [
  { tier: 'Project', amt: 'Fixed scope', small: '/ one-off', desc: 'A defined deliverable, quoted after scoping.', features: ['Website or MVP build', 'Fixed timeline & price', '2 rounds of revisions', '30-day post-launch support'], btn: 'Get a quote', featured: false },
  { tier: 'Retainer', amt: 'Monthly', small: '/ ongoing', desc: 'For products that keep evolving.', features: ['Dedicated build hours each month', 'Feature roadmap ownership', 'Priority turnaround', 'Direct Slack/WhatsApp line'], btn: 'Start a retainer', featured: true },
  { tier: 'Consulting', amt: 'Hourly', small: '/ advisory', desc: 'Architecture reviews, audits, and unblocking.', features: ['Technical audits', 'AI-integration strategy', 'Code & QA review', 'No minimum commitment'], btn: 'Book a session', featured: false }
];

export default function HomePage() {
  const glowRef = useRef(null);

  // The cursor glow is meaningless without a mouse and costs a listener plus a
  // tween on every move, so it is only enabled for genuine pointer devices.
  // Resolved in a lazy initialiser rather than an effect so the element is
  // correct on first paint instead of triggering a second render.
  const [showGlow] = useState(
    () =>
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (!showGlow) return;

    const handleMouseMove = e => {
      if (glowRef.current) {
        gsap.to(glowRef.current, { left: e.clientX, top: e.clientY, duration: 0.6, ease: 'power2.out' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showGlow]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Land everything in its final state: these elements start hidden in
        // CSS, so skipping the tweens without this would leave blank sections.
        gsap.set('.reveal', { opacity: 1, y: 0 });
        document.querySelectorAll('.count').forEach(el => {
          el.innerText = el.getAttribute('data-target');
        });
        return;
      }

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.eyebrow', { opacity: 0, y: 20, duration: 0.6 })
        .from('.hero h1', { opacity: 0, y: 30, duration: 0.8 }, '-=.3')
        .from('.hero-left p', { opacity: 0, y: 20, duration: 0.6 }, '-=.4')
        .from('.stack-pills span', { opacity: 0, y: 12, stagger: 0.06, duration: 0.5 }, '-=.3')
        .from('.hero-actions > *', { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 }, '-=.2')
        .from('.hero-stats .stat', { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 }, '-=.3')
        .from('.yantra-wrap', { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.out' }, '-=1');

      // svgOrigin pins rotation to the viewBox coordinate (250,250) — the true
      // centre of the emblem. The previous CSS transform-origin resolved
      // against the group's own bounding box, so the outer ring orbited off
      // centre and clipped outside the viewport.
      gsap.to('#ring-outer', { rotation: 360, duration: 60, repeat: -1, ease: 'none', svgOrigin: '250 250' });
      gsap.to('#ring-mid', { rotation: -360, duration: 40, repeat: -1, ease: 'none', svgOrigin: '250 250' });
      gsap.to('#ring-inner', { rotation: 360, duration: 22, repeat: -1, ease: 'none', svgOrigin: '250 250' });

      document.querySelectorAll('.count').forEach(el => {
        const target = +el.getAttribute('data-target');
        ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: () => {
            gsap.to(el, {
              innerText: target, duration: 1.6, ease: 'power2.out', snap: { innerText: 1 },
              onUpdate: function () { el.innerText = Math.floor(el.innerText); }
            });
          }
        });
      });

      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });

      gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, { opacity: 0, y: 40, duration: 0.7, delay: i * 0.05, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%' } });
      });

      gsap.utils.toArray('.stack-layer').forEach((row, i) => {
        gsap.from(row, { opacity: 0, x: -18, duration: 0.5, delay: i * 0.06, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 92%' } });
      });

      gsap.utils.toArray('.price-card').forEach((card, i) => {
        gsap.from(card, { opacity: 0, y: 40, duration: 0.7, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%' } });
      });

      const textEl = document.getElementById('perspective-text');
      const container = document.querySelector('.perspective-container');
      if (textEl && container) {
        ScrollTrigger.create({
          trigger: container, start: 'top top', end: 'bottom bottom', scrub: true,
          onUpdate: self => {
            const ty = gsap.utils.interpolate(487, 0, self.progress);
            textEl.style.transform = `rotateX(30deg) translateY(${ty}px) translateZ(10px)`;
          }
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleCardMouseMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <SEO />
      {showGlow && <div id="cursor-glow" ref={glowRef} aria-hidden="true" />}
      <div className="bg-grid" aria-hidden="true" />
      <BubbleMenu />

      <main id="main-content">
        <section className="hero">
          <div className="hero-left">
            <div className="eyebrow">Full-stack software studio · Noida, IN</div>
            <h1>Instruments for<br /><span className="grad">precision-built</span> business.</h1>
            <p>Tech Yantra designs and ships production software — web platforms, AI products, ERP and CRM systems — engineered end-to-end by one full-stack team, not a relay of freelancers.</p>
            <div className="stack-pills">
              <span>Web Apps</span><span>AI / LLM Products</span><span>ERP</span><span>CRM</span><span>Automation</span>
            </div>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary"><span>Start a project →</span></a>
              <Link to="/work" className="btn-secondary">View recent work</Link>
            </div>
            <div className="hero-stats">
              <div className="stat"><b className="count" data-target="12">0</b><span>Projects shipped</span></div>
              <div className="stat"><b className="count" data-target="9">0</b><span>Clients served</span></div>
              <div className="stat"><b className="count" data-target="100">0</b><span>% in-house build</span></div>
            </div>
          </div>
          <div className="hero-right">
            <div className="yantra-wrap">
              <div className="yantra-glow" aria-hidden="true" />
              <svg viewBox="0 0 500 500" role="img" aria-label="Tech Yantra emblem: rotating rings labelled Web, AI, ERP, CRM and App around a central core.">
                <g id="ring-outer">
                  <circle cx="250" cy="250" r="220" stroke="#E30613" strokeWidth="1" opacity=".35" fill="none" strokeDasharray="2 8" />
                  <g id="nodes-outer">
                    {['WEB', 'AI', 'ERP', 'CRM', 'APP'].map((label, i) => {
                      const angle = (i / 5) * Math.PI * 2;
                      const r = 220;
                      return (
                        <g key={label}>
                          <circle cx={250 + r * Math.cos(angle)} cy={250 + r * Math.sin(angle)} r="14" fill="#ffffff" stroke="#E30613" strokeWidth="1.2" />
                          <text x={250 + r * Math.cos(angle)} y={250 + r * Math.sin(angle) + 3} textAnchor="middle" className="node-label" fontSize="8">{label}</text>
                        </g>
                      );
                    })}
                  </g>
                </g>
                <g id="ring-mid">
                  <circle cx="250" cy="250" r="160" stroke="#111111" strokeWidth="1" opacity=".4" fill="none" />
                </g>
                <g id="ring-inner">
                  <circle cx="250" cy="250" r="100" stroke="#E30613" strokeWidth="1.2" opacity=".55" fill="none" strokeDasharray="6 4" />
                </g>
                <polygon points="250,175 305,325 195,325" stroke="#111111" strokeWidth="1" fill="none" opacity=".5" />
                <polygon points="250,325 305,175 195,175" stroke="#E30613" strokeWidth="1" fill="none" opacity=".5" />
                <circle cx="250" cy="250" r="30" fill="#ffffff" stroke="#E30613" strokeWidth="1.5" />
                <circle cx="250" cy="250" r="4" fill="#E30613" />
                <text x="250" y="254" textAnchor="middle" className="node-label" fill="#E30613" fontSize="9">YANTRA</text>
              </svg>
            </div>
          </div>
        </section>

        <div className="marquee-section" aria-hidden="true">
          <div className="marquee-track">
            {Array(2).fill(['MERN STACK', 'PYTHON', 'GEMINI AI', 'GOOGLE OAUTH', 'PLAYWRIGHT', 'AWS', 'NEXT.JS', 'NODE.JS']).flat().map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>

        <div className="perspective-container">
          <div className="perspective-eyebrow"><span>scroll to read</span></div>
          <div className="perspective-sticky">
            <div className="perspective-text" id="perspective-text">
              A <span className="accent">yantra</span> is an instrument engineered for exactly one purpose.
              That's the standard we build to — software shaped around your business,
              not bent to fit someone else's template. One founder. One codebase.
              One outcome: work that runs the way <span className="accent">you</span> actually run.
              <div className="perspective-fade" aria-hidden="true" />
            </div>
          </div>
        </div>

        <section className="section-pad" id="services">
          <div className="section-head reveal">
            <span className="tag">What we build</span>
            <h2>Six disciplines, one team.</h2>
            <p>No handoffs between agencies. The person who scopes the work writes the code and ships it.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map(service => (
              <div key={service.num} className="service-card" onMouseMove={handleCardMouseMove}>
                <span className="service-num">{service.num}</span>
                <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">{service.icon}</svg>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="work-teaser">
          <span className="tag">Recent Work</span>
          <h2>Products shipped, not mockups.</h2>
          <p>From AI-powered SaaS platforms to custom ERPs, explore the detailed case studies of systems we've engineered end-to-end.</p>
          <Link to="/work" className="btn-primary"><span>Explore Full Portfolio →</span></Link>
        </section>

        <section className="section-pad">
          <div className="section-head reveal">
            <span className="tag">Why Tech Yantra</span>
            <h2>One builder. Zero relay.</h2>
          </div>
          <div className="why-grid">
            <div className="why-list">
              {WHY_POINTS.map(item => (
                <div key={item.title} className="why-item">
                  <span className="mark" aria-hidden="true">→</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Replaces a decorative crosshair graphic that carried no
                information. This shows the actual layers of a build and who
                owns them, which is the claim the section is making. */}
            <div className="stack-diagram">
              <div className="stack-diagram-head">
                <span className="stack-diagram-label">Typical build</span>
                <h3>Every layer, one team</h3>
              </div>

              <ol className="stack-layers">
                {STACK_LAYERS.map(row => (
                  <li key={row.layer} className="stack-layer">
                    <div className="stack-layer-main">
                      <span className="stack-layer-name">{row.layer}</span>
                      <span className="stack-layer-tech">{row.tech}</span>
                    </div>
                    <span className="stack-layer-note">{row.note}</span>
                  </li>
                ))}
              </ol>

              <p className="stack-diagram-foot">
                No layer is subcontracted out — the same team writes the interface,
                the API, the queries, and the deploy pipeline.
              </p>
            </div>
          </div>
        </section>

        <section className="section-pad" id="pricing">
          <div className="section-head reveal">
            <span className="tag">Engagement models</span>
            <h2>Scoped to how you want to work.</h2>
          </div>
          <div className="pricing-grid">
            {PRICING.map(plan => (
              <div key={plan.tier} className={`price-card ${plan.featured ? 'featured' : ''}`}>
                <span className="tier">{plan.tier}</span>
                <div className="amt">{plan.amt}<small>{plan.small}</small></div>
                <p className="desc">{plan.desc}</p>
                <ul>{plan.features.map(f => <li key={f}>{f}</li>)}</ul>
                <a href="#contact" className="price-btn">{plan.btn}</a>
              </div>
            ))}
          </div>
        </section>

        <section className="section-pad" id="contact">
          <div className="contact-wrap">
            <div className="reveal">
              <span className="tag">Get in touch</span>
              <h2>Tell us what you're building.</h2>
              <p>Share a few details and you'll hear back within one business day with next steps and a rough scope.</p>
              <div className="contact-info">
                <div className="info-row">
                  <span className="label">Email</span>
                  <span className="val"><a href="mailto:info@techyantra.org">info@techyantra.org</a></span>
                </div>
                <div className="info-row">
                  <span className="label">WhatsApp</span>
                  <span className="val">
                    <a href="https://wa.me/918607492753" target="_blank" rel="noopener noreferrer">+91 86074 92753</a>
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Location</span>
                  <span className="val">Noida, India<small>Remote-first, works across time zones</small></span>
                </div>
                <div className="info-row">
                  <span className="label">Response</span>
                  <span className="val">Within 24 hours</span>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <h3>TECH YANTRA</h3>
            <p>A full-stack software studio building web, AI, ERP, and CRM products end-to-end from Noida, India.</p>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <a href="#services">Web Platforms</a>
            <a href="#services">AI Products</a>
            <a href="#services">ERP Systems</a>
            <a href="#services">CRM & CLM</a>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <Link to="/work">Work</Link>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <a href="mailto:info@techyantra.org">info@techyantra.org</a>
            <a href="https://wa.me/918607492753" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Tech Yantra. All rights reserved.</p>
          <p>Built by Tech Yantra — instruments for modern business.</p>
        </div>
      </footer>
    </motion.div>
  );
}
