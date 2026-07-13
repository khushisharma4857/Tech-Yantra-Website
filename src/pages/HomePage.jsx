import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BubbleMenu from '../components/Bubblemenu';
import Antigravity from '../components/Antigravity';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        gsap.to(glowRef.current, { left: e.clientX, top: e.clientY, duration: 0.6, ease: 'power2.out' });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.eyebrow', { opacity: 0, y: 20, duration: 0.6 })
        .from('.hero h1', { opacity: 0, y: 30, duration: 0.8 }, '-=.3')
        .from('.hero-left p', { opacity: 0, y: 20, duration: 0.6 }, '-=.4')
        .from('.stack-pills span', { opacity: 0, y: 12, stagger: 0.06, duration: 0.5 }, '-=.3')
        .from('.hero-actions > *', { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 }, '-=.2')
        .from('.hero-stats .stat', { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 }, '-=.3')
        .from('.yantra-wrap', { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.out' }, '-=1');

      gsap.to('#ring-outer', { rotation: 360, duration: 60, repeat: -1, ease: 'none' });
      gsap.to('#ring-mid', { rotation: -360, duration: 40, repeat: -1, ease: 'none' });
      gsap.to('#ring-inner', { rotation: 360, duration: 22, repeat: -1, ease: 'none' });

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

      gsap.utils.toArray('.price-card').forEach((card, i) => {
        gsap.from(card, { opacity: 0, y: 40, duration: 0.7, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%' } });
      });

      const textEl = document.getElementById('perspective-text');
      const container = document.querySelector('.perspective-container');
      if (textEl && container) {
        ScrollTrigger.create({
          trigger: container, start: 'top top', end: 'bottom bottom', scrub: true,
          onUpdate: (self) => {
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

  const handleCardMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px');
  };

  return (
    <>
      <div id="cursor-glow" ref={glowRef} />
      <div className="bg-grid" />
      <BubbleMenu />

      <section className="hero">
        <div className="hero-left">
          <div className="eyebrow">Full-stack software studio · Noida, IN</div>
          <h1>Instruments for<br /><span className="grad">precision-built</span> business.</h1>
          <p>Tech Yantra designs and ships production software — web platforms, AI products, ERP and CRM systems — engineered end-to-end by one full-stack team, not a relay of freelancers.</p>
          <div className="stack-pills">
            <span>Web Apps</span><span>AI / LLM Products</span><span>ERP</span><span>CRM</span><span>Automation</span>
          </div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}><span>Start a project →</span></button>
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
            <div className="yantra-glow" />
            <svg viewBox="0 0 500 500">
              <g id="ring-outer" style={{ transformOrigin: '250px 250px' }}>
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
              <g id="ring-mid" style={{ transformOrigin: '250px 250px' }}>
                <circle cx="250" cy="250" r="160" stroke="#111111" strokeWidth="1" opacity=".4" fill="none" />
              </g>
              <g id="ring-inner" style={{ transformOrigin: '250px 250px' }}>
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

      <div className="marquee-section">
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
            <div className="perspective-fade" />
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
          {[
            { num: '01', title: 'Web Platforms', desc: 'Marketing sites to full SaaS applications — React, Next.js, MERN, built for speed and SEO from day one.', icon: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 21h8" /></> },
            { num: '02', title: 'Mobile Apps', desc: 'Cross-platform apps that share a codebase with your web product, so features ship once, not twice.', icon: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></> },
            { num: '03', title: 'AI Products', desc: 'LLM-powered tools — email automation, resume analysis, chat assistants — built on Gemini and Claude APIs.', icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></> },
            { num: '04', title: 'ERP Systems', desc: 'Custom operational software — school management, inventory, workflow tools tailored to how your team actually works.', icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></> },
            { num: '05', title: 'CRM & CLM', desc: 'Client and contract lifecycle tools that keep sales, delivery, and renewals in one system of record.', icon: <path d="M17 20a5 5 0 00-10 0M12 12a4 4 0 100-8 4 4 0 000 8z" /> },
            { num: '06', title: 'SEO & GEO', desc: 'Technical SEO and generative-engine optimization so your business surfaces in both search and AI answers.', icon: <><path d="M3 12l4-8 4 8 4-8 4 8" /><path d="M3 18h18" /></> }
          ].map((service, i) => (
            <div key={i} className="service-card" onMouseMove={handleCardMouseMove}>
              <span className="service-num">{service.num}</span>
              <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">{service.icon}</svg>
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
            {[
              { title: 'Direct to the founder', desc: 'You talk to the person writing your code — no account managers, no lost-in-translation briefs.' },
              { title: 'Full-stack by default', desc: 'Frontend, backend, database, deployment — one coherent build instead of stitched-together vendors.' },
              { title: 'AI-native tooling', desc: 'Every product is built with a path to AI features — automation, generation, or analysis — from day one.' },
              { title: 'QA is not an afterthought', desc: 'Test coverage and E2E automation are part of delivery, not a favor.' }
            ].map((item, i) => (
              <div key={i} className="why-item">
                <span className="mark">→</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="why-visual">
            <svg width="70%" viewBox="0 0 200 200" fill="none">
              <rect x="20" y="20" width="160" height="160" rx="16" stroke="#E30613" strokeWidth="1" opacity=".3" />
              <rect x="45" y="45" width="110" height="110" rx="12" stroke="#111111" strokeWidth="1" opacity=".4" />
              <circle cx="100" cy="100" r="35" stroke="#E30613" strokeWidth="1.2" />
              <path d="M100 65v70M65 100h70" stroke="#E30613" strokeWidth="1" opacity=".5" />
            </svg>
          </div>
        </div>
      </section>

      <section className="section-pad" id="pricing">
        <div className="section-head reveal">
          <span className="tag">Engagement models</span>
          <h2>Scoped to how you want to work.</h2>
        </div>
        <div className="pricing-grid">
          {[
            { tier: 'Project', amt: 'Fixed scope', small: '/ one-off', desc: 'A defined deliverable, quoted after scoping.', features: ['Website or MVP build', 'Fixed timeline & price', '2 rounds of revisions', '30-day post-launch support'], btn: 'Get a quote', featured: false },
            { tier: 'Retainer', amt: 'Monthly', small: '/ ongoing', desc: 'For products that keep evolving.', features: ['Dedicated build hours each month', 'Feature roadmap ownership', 'Priority turnaround', 'Direct Slack/WhatsApp line'], btn: 'Start a retainer', featured: true },
            { tier: 'Consulting', amt: 'Hourly', small: '/ advisory', desc: 'Architecture reviews, audits, and unblocking.', features: ['Technical audits', 'AI-integration strategy', 'Code & QA review', 'No minimum commitment'], btn: 'Book a session', featured: false }
          ].map((plan, i) => (
            <div key={i} className={`price-card ${plan.featured ? 'featured' : ''}`}>
              <span className="tier">{plan.tier}</span>
              <div className="amt">{plan.amt}<small>{plan.small}</small></div>
              <p className="desc">{plan.desc}</p>
              <ul>{plan.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
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
              <div className="info-row"><span className="label">Email</span><span className="val">hello@techyantra.dev</span></div>
              <div className="info-row"><span className="label">Location</span><span className="val">Noida, India<small>Remote-first, works across time zones</small></span></div>
              <div className="info-row"><span className="label">Response</span><span className="val">Within 24 hours</span></div>
            </div>
          </div>
          <form className="contact-form reveal" onSubmit={(e) => { e.preventDefault(); e.target.querySelector('.submit-btn').innerText = 'Sent ✓'; }}>
            <div className="form-field"><label>Name</label><input type="text" placeholder="Your name" required /></div>
            <div className="form-field"><label>Email</label><input type="email" placeholder="you@company.com" required /></div>
            <div className="form-field"><label>Phone</label><input type="tel" placeholder="+91" /></div>
            <div className="form-field"><label>Company</label><input type="text" placeholder="Company name" /></div>
            <div className="form-field full"><label>Project budget</label>
              <select><option>Under ₹50k</option><option>₹50k – ₹2L</option><option>₹2L – ₹5L</option><option>₹5L+</option></select>
            </div>
            <div className="form-field full"><label>Message</label><textarea placeholder="What are you building?" required /></div>
            <button className="submit-btn" type="submit">Send message</button>
          </form>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <h3>TECH YANTRA</h3>
            <p>A full-stack software studio building web, AI, ERP, and CRM products end-to-end from Noida, India.</p>
          </div>
          <div className="footer-col"><h5>Services</h5>
            <a href="#services">Web Platforms</a><a href="#services">AI Products</a><a href="#services">ERP Systems</a><a href="#services">CRM & CLM</a>
          </div>
          <div className="footer-col"><h5>Company</h5>
            <Link to="/work">Work</Link><a href="#pricing">Pricing</a><a href="#contact">Contact</a>
          </div>
          <div className="footer-col"><h5>Connect</h5>
            <a href="#">GitHub</a><a href="#">LinkedIn</a><a href="#">Twitter / X</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Tech Yantra. All rights reserved.</p>
          <p>Built by Tech Yantra — instruments for modern business.</p>
        </div>
      </footer>
    </>
  );
}