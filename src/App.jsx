// React Portfolio — Single-File Starter (with Navbar Shadow)
// Tailwind classes used for clean, modern look.

import { useMemo, useState, useEffect, useRef } from 'react';
import useScrollSpy from './hooks/useScrollSpy'
import { EMAIL } from './config'

// ---------- Editable content ----------
const NAME = 'Carl Davies';
const ROLE = 'Front-end Developer · React & Bootstrap (UK-based)';
const TAGLINE = "I craft fast, responsive websites with clean, accessible, colourful UI.";
// Hero image — replace with your own URL or local image
const HERO_IMAGE = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97';

const SKILLS = [
  'React', 'Bootstrap', 'Tailwind', 'JavaScript (ES202x)', 'HTML5/CSS3', 'Netlify', 'Figma', 'Git/GitHub'
];

const PROJECTS = [
  {
    title: 'The Manor House (Concept)',
    stack: ['Bootstrap', 'HTML', 'Netlify'],
    description:
      'Fine-dining concept site. Built mobile-first with Bootstrap 5. Focus on layout, typography and simple reservation form UI.',
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    live: 'https://the-manor-house.netlify.app/',
    code: '#',
    featured: true,
  },
  {
    title: 'SAYVA Travel',
    stack: ['React', 'Tailwind', 'HTML', 'CSS', 'JavaScript'],
    description:
      'Curated travel experiences platform. Features destination guides, tour packages, and seamless booking integration for adventure seekers.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
    live: 'https://sayva-travel.netlify.app/',
    code: '#',
    featured: true,
  },
  {
    title: 'OH MY COD Fish & Chips Shop',
    stack: ['React', 'Tailwind', 'HTML', 'CSS', 'JavaScript'],
    description:
      'Online ordering platform for a traditional fish and chips shop. Features menu browsing, shopping cart, and seamless checkout experience.',
    image: `${import.meta.env.BASE_URL}images/logo.png`,
    live: 'https://ohmycod.netlify.app/',
    code: '#',
    featured: true,
  },
];

// ---------- Helpers ----------
function classNames(...arr) { return arr.filter(Boolean).join(' '); }

// Build responsive Unsplash URLs (adds ? or & as needed)
function makeSrc(url, w) {
  if (!url) return '';
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}w=${w}&q=80&auto=format&fit=crop`;
}

// ---------- Section: Navbar ----------
function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  // Lock body scroll when mobile menu is open, close on Escape, trap focus and hide background from SR
  useEffect(() => {
    const body = typeof document !== 'undefined' ? document.body : null;
    if (!body) return;
    if (open) {
      const prevOverflow = body.style.overflow;
      body.style.overflow = 'hidden';

      // focus management
      const container = menuRef.current;
      const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
      const focusable = container ? Array.from(container.querySelectorAll(focusableSelector)).filter(el => !el.hasAttribute('disabled')) : [];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const prevActive = document.activeElement;
      if (first && typeof first.focus === 'function') first.focus();

      const onKey = (e) => {
        if (e.key === 'Escape') {
          setOpen(false);
          return;
        }
        if (e.key === 'Tab') {
          if (!focusable.length) return;
          // forward
          if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
          // backward
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        }
      };

      // hide the main content from assistive tech while menu is open
      const main = document.getElementById('main');
      if (main) main.setAttribute('aria-hidden', 'true');

      document.addEventListener('keydown', onKey);
      return () => {
        body.style.overflow = prevOverflow;
        document.removeEventListener('keydown', onKey);
        if (main) main.removeAttribute('aria-hidden');
        if (prevActive && typeof prevActive.focus === 'function') prevActive.focus();
      };
    }
  }, [open]);

  const links = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const active = useScrollSpy(links.map(l => l.id));

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/90 dark:bg-neutral-900/90 shadow-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="site-inner flex items-center justify-between py-2">
        <a href="#home" className="font-extrabold tracking-tight text-xl text-neutral-900 dark:text-white">{NAME}</a>

        <div className="md:hidden flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))} className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
            )}
          </button>
          <button aria-label="Menu" aria-expanded={open} aria-controls="mobile-menu" className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={() => setOpen(!open)}>
            <span className="text-2xl">☰</span>
          </button>
        </div>

        <nav className={classNames('md:flex items-center gap-6 text-sm', open ? 'block' : 'hidden md:block')}>
          {links.map(l => (
            <a key={l.href} href={l.href} aria-current={active === l.id ? 'page' : undefined} role="link" className={classNames('px-3 py-2 text-neutral-700 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-fuchsia-400', active === l.id && 'nav-link-active')}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="md:ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white dark:from-fuchsia-500 dark:to-rose-500 shadow-sm">
            <span>Enquire</span>
          </a>
        </nav>

        {open && (
          <div id="mobile-menu" className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <div ref={menuRef} className="absolute right-0 top-0 h-full w-3/4 bg-white dark:bg-neutral-900 p-6 shadow-xl">
              <button aria-label="Close menu" className="mb-6 p-2 rounded bg-neutral-100 dark:bg-neutral-800" onClick={() => setOpen(false)}>✕</button>
              <nav className="flex flex-col gap-4">
                {links.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} aria-current={active === l.id ? 'page' : undefined} className={classNames('text-lg py-2', active === l.id && 'nav-link-active')}>
                    {l.label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setOpen(false)} className="mt-4 inline-block px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white">Enquire</a>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

// ---------- Section: Hero ----------
function Hero() {
  return (
    <section id="home" className="bg-gradient-to-b from-rose-50 via-sky-50 to-emerald-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="md:pr-8 md:max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs mb-4">
            <span>Available for freelance work</span>
          </div>
              <h1 className="text-3xl md:text-4xl lg:text-4xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-indigo-700 via-fuchsia-700 to-rose-700 dark:from-fuchsia-400 dark:via-rose-400 dark:to-amber-400 bg-clip-text text-transparent">
                Front-end Developer
              </h1>
              <p className="mt-1 text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-fuchsia-700 to-rose-700">React & Bootstrap (UK-based)</p>
            <p className="mt-4 text-neutral-700 dark:text-neutral-300 text-lg lead">{TAGLINE}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#projects" className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-lg">View Projects</a>
            <a href="#contact" className="px-6 py-3 rounded-2xl border border-indigo-200 dark:border-fuchsia-700/60 bg-transparent">Contact</a>
          </div>
          <div className="mt-6">
            <a href={EMAIL} className="inline-flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 hover:underline">Email</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
            <img
              src={makeSrc(HERO_IMAGE, 800)}
              srcSet={`${makeSrc(HERO_IMAGE,480)} 480w, ${makeSrc(HERO_IMAGE,800)} 800w, ${makeSrc(HERO_IMAGE,1200)} 1200w`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              alt="Developer workspace — laptop and code"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-4 right-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 shadow-lg w-44">
            <p className="text-xs font-semibold">Quick facts</p>
            <ul className="mt-1 text-xs text-neutral-600 dark:text-neutral-300 list-disc pl-4">
              <li>4+ years building with React</li>
              <li>Bootstrap & Tailwind fluent</li>
              <li>Deployed 10+ projects</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section: Projects ----------
function Projects() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    if (!query) return PROJECTS;
    const q = query.toLowerCase();
    return PROJECTS.filter(p => p.title.toLowerCase().includes(q) || p.stack.join(' ').toLowerCase().includes(q));
  }, [query]);

  return (
    <section id="projects" className="py-16">
      <div className="site-inner">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">A few things I've built recently.</p>
          </div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter by title or stack…" className="w-full md:w-72 rounded-xl border border-indigo-200 dark:border-fuchsia-700/60 bg-white/70 dark:bg-neutral-900/70 px-4 py-2 outline-none focus:ring-2 focus:ring-fuchsia-600 dark:focus:ring-rose-400"/>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => {
            const isRemoteImage = /^https?:\/\//.test(p.image);
            const imageSrc = isRemoteImage ? makeSrc(p.image, 800) : p.image;
            const imageSrcSet = isRemoteImage
              ? `${makeSrc(p.image,480)} 480w, ${makeSrc(p.image,800)} 800w, ${makeSrc(p.image,1200)} 1200w`
              : undefined;

            return (
              <article key={i} className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={imageSrc}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    {...(isRemoteImage ? { srcSet: imageSrcSet, sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw' } : {})}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-40"></div>
                </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  {p.featured && <span className="text-[10px] px-2 py-1 rounded-full bg-gradient-to-r from-amber-300 to-rose-300 text-amber-900">Featured</span>}
                </div>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-neutral-600 dark:text-neutral-400">
                  {p.stack.map(s => (
                    <span key={s} className="px-2 py-1 rounded-full border border-neutral-200 dark:border-neutral-700">{s}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  {p.live !== '#' && <a className="text-sm font-medium underline" href={p.live} target="_blank" rel="noreferrer">Live</a>}
                  {p.code !== '#' && <a className="text-sm font-medium underline" href={p.code} target="_blank" rel="noreferrer">Code</a>}
                </div>
              </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Section: Skills ----------
function Skills() {
  return (
    <section id="skills" className="py-16 bg-gradient-to-b from-indigo-50 via-white to-rose-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
      <div className="site-inner">
        <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {SKILLS.map(s => (
            <li key={s} className="px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-fuchsia-700/60 bg-white/70 dark:bg-neutral-800/60 text-sm shadow-sm">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- Section: Contact ----------
function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    setSubmitted(true);
    // Auto-hide the success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-16">
      <div className="site-inner">
        <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">Let's build something great.</p>
        
        {submitted && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-800 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100">Message sent successfully!</h3>
                <p className="mt-1 text-sm text-green-800 dark:text-green-200">Thank you for reaching out. I'll review your message and get back to you as soon as possible.</p>
              </div>
            </div>
          </div>
        )}
        
        <form 
          className="mt-6 grid md:grid-cols-2 gap-4" 
          name="contact" 
          method="POST" 
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          
          <input 
            className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 py-3 bg-white/70 dark:bg-neutral-900/70 focus:ring-2 focus:ring-indigo-500 outline-none" 
            placeholder="Your name"
            name="name"
            type="text"
            required
          />
          <input 
            className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 py-3 bg-white/70 dark:bg-neutral-900/70 focus:ring-2 focus:ring-indigo-500 outline-none" 
            placeholder="Email"
            name="email"
            type="email"
            required
          />
          <textarea 
            className="md:col-span-2 rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 py-3 bg-white/70 dark:bg-neutral-900/70 focus:ring-2 focus:ring-indigo-500 outline-none" 
            rows={5} 
            placeholder="Message"
            name="message"
            required
          />
          <div>
            <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:opacity-90 transition-opacity shadow-md">Send message</button>
          </div>
        </form>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="py-10 border-t border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-indigo-50 via-sky-50 to-rose-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900">
      <div className="site-inner flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        <p className="text-center md:text-left">© {new Date().getFullYear()} {NAME}. All rights reserved.</p>
        <div>
          <a href={EMAIL} className="hover:underline">Email</a>
        </div>
      </div>
    </footer>
  );
}

// ---------- Page ----------
export default function PortfolioPage() {
  return (
    <main id="main" className="text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 font-sans">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
