import { useState, useEffect, useCallback, useRef } from 'react';

interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}

interface Props {
  items: TestimonialItem[];
}

const AUTO_ADVANCE_MS = 7000;

export default function TestimonialsSpotlight({ items }: Props) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);
  const quoteRef = useRef<HTMLElement>(null);

  const goTo = useCallback((index: number, dir: 'next' | 'prev' = 'next') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setProgress(0);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 350);
  }, [animating]);

  const next = useCallback(() => {
    goTo((active + 1) % items.length, 'next');
  }, [active, items.length, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + items.length) % items.length, 'prev');
  }, [active, items.length, goTo]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    progressRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setProgress((p) => Math.min(p + (100 / (AUTO_ADVANCE_MS / 100)), 100));
      }
    }, 100);

    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActive((a) => {
          const next = (a + 1) % items.length;
          setDirection('next');
          setAnimating(true);
          setTimeout(() => setAnimating(false), 350);
          setProgress(0);
          return next;
        });
      }
    }, AUTO_ADVANCE_MS);
  }, [items.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [startTimer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Capture wheel events inside the quote — prevents Lenis / page scroll from
  // interfering. Uses { passive: false } so we can call preventDefault().
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const isScrollable = scrollHeight > clientHeight;
      if (!isScrollable) return;
      const atTop = scrollTop === 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
      if (!atTop && !atBottom) {
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += e.deltaY;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [active]);

  const item = items[active];

  return (
    <div
      className="spotlight-root"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Progress bar */}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Main quote area */}
      <div className={`spotlight-stage ${animating ? (direction === 'next' ? 'exit-left' : 'exit-right') : 'enter'}`}>
        {/* Background quote mark */}
        <div className="bg-quote" aria-hidden="true">"</div>

        {/* Quote text — data-lenis-prevent stops Lenis from intercepting wheel here */}
        <blockquote
          className="spotlight-quote"
          ref={quoteRef as any}
          data-lenis-prevent
        >
          {item.text}
        </blockquote>

        {/* Author */}
        <div className="spotlight-author">
          <div className="author-photo-wrap">
            <img
              src={item.image}
              alt={item.name}
              className="author-photo"
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = 'none';
                const fb = t.nextElementSibling as HTMLElement;
                if (fb) fb.style.display = 'flex';
              }}
            />
            <div className="author-fallback" style={{ display: 'none' }}>
              {item.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
            </div>
          </div>
          <div className="author-info">
            <span className="author-name">{item.name}</span>
            <span className="author-role">{item.role}</span>
            <span className="author-company">{item.company}</span>
          </div>
          {/* Nav arrows */}
          <div className="nav-arrows">
            <button onClick={prev} className="nav-btn" aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span className="nav-count">{active + 1} / {items.length}</span>
            <button onClick={next} className="nav-btn" aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Avatar strip */}
      <div className="avatar-strip">
        {items.map((t, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > active ? 'next' : 'prev')}
            className={`avatar-btn ${i === active ? 'active' : ''}`}
            aria-label={t.name}
            title={t.name}
          >
            <img
              src={t.image}
              alt={t.name}
              className="avatar-thumb"
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = 'none';
                const fb = img.nextElementSibling as HTMLElement;
                if (fb) fb.style.display = 'flex';
              }}
            />
            <div className="avatar-fallback-sm" style={{ display: 'none' }}>
              {t.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
            </div>
          </button>
        ))}
      </div>

      <style>{`
        .spotlight-root {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
          width: 100%;
        }

        /* On md+ the root fills the flex parent (sp-body) */
        @media (min-width: 768px) {
          .spotlight-root {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
            max-width: 100%;
          }
        }

        /* Progress bar */
        .progress-track {
          height: 2px;
          background: rgba(71,180,204,0.12);
          border-radius: 2px;
          margin-bottom: 28px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .progress-fill {
          height: 100%;
          background: var(--color-accent, #47B4CC);
          border-radius: 2px;
          transition: width 0.1s linear;
        }

        /* Stage — fixed height on mobile, fills flex on desktop */
        .spotlight-stage {
          height: 480px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          padding: 48px 56px;
          border-radius: 20px;
          border: 1px solid rgba(71,180,204,0.12);
          background: rgba(17,24,39,0.6);
          backdrop-filter: blur(12px);
          overflow: hidden;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        @media (min-width: 768px) {
          .spotlight-stage {
            height: auto;
            flex: 1;
            min-height: 0;
          }
        }

        .spotlight-stage.enter {
          opacity: 1;
          transform: translateX(0);
        }
        .spotlight-stage.exit-left {
          opacity: 0;
          transform: translateX(-24px);
        }
        .spotlight-stage.exit-right {
          opacity: 0;
          transform: translateX(24px);
        }

        /* Background quote mark */
        .bg-quote {
          position: absolute;
          top: -20px;
          left: 32px;
          font-size: 14rem;
          line-height: 1;
          font-family: Georgia, serif;
          color: var(--color-accent, #47B4CC);
          opacity: 0.04;
          pointer-events: none;
          user-select: none;
        }

        /* Quote text — fills available height, scrolls internally */
        .spotlight-quote {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          line-height: 1.8;
          color: var(--color-text, #CBD5E1);
          position: relative;
          z-index: 1;
          margin: 0;
          quotes: none;
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(71,180,204,0.35) transparent;
        }
        .spotlight-quote::-webkit-scrollbar {
          width: 6px;
          cursor: pointer;
        }
        .spotlight-quote::-webkit-scrollbar-track {
          background: transparent;
          cursor: pointer;
        }
        .spotlight-quote::-webkit-scrollbar-thumb {
          background: rgba(71,180,204,0.35);
          border-radius: 3px;
          cursor: pointer;
        }
        .spotlight-quote::-webkit-scrollbar-thumb:hover {
          background: rgba(71,180,204,0.6);
        }

        /* Author row */
        .spotlight-author {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          z-index: 1;
          flex-wrap: wrap;
          flex-shrink: 0;
        }

        .author-photo-wrap {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          position: relative;
        }

        .author-photo {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--color-accent, #47B4CC);
          box-shadow: 0 0 16px rgba(71,180,204,0.3);
        }

        .author-fallback {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(71,180,204,0.12);
          border: 2px solid var(--color-accent, #47B4CC);
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-accent, #47B4CC);
        }

        .author-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .author-name {
          font-family: var(--font-sans, sans-serif);
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-bright, #F0F6FF);
        }

        .author-role {
          font-size: 0.8rem;
          color: var(--color-accent, #47B4CC);
        }

        .author-company {
          font-size: 0.75rem;
          color: var(--color-secondary, #8892A4);
        }

        /* Nav arrows */
        .nav-arrows {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: auto;
        }

        .nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(71,180,204,0.2);
          background: rgba(71,180,204,0.06);
          color: var(--color-accent, #47B4CC);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }

        .nav-btn:hover {
          background: rgba(71,180,204,0.15);
          border-color: rgba(71,180,204,0.4);
        }

        .nav-count {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--color-secondary, #8892A4);
          min-width: 40px;
          text-align: center;
        }

        /* Avatar strip */
        .avatar-strip {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
          flex-wrap: wrap;
          flex-shrink: 0;
        }

        .avatar-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: none;
          padding: 0;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.2s, opacity 0.2s;
          opacity: 0.45;
          position: relative;
        }

        .avatar-btn:hover {
          opacity: 0.8;
          transform: scale(1.08);
        }

        .avatar-btn.active {
          border-color: var(--color-accent, #47B4CC);
          opacity: 1;
          transform: scale(1.12);
          box-shadow: 0 0 12px rgba(71,180,204,0.4);
        }

        .avatar-thumb {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        .avatar-fallback-sm {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(71,180,204,0.12);
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-accent, #47B4CC);
        }

        @media (max-width: 640px) {
          .spotlight-stage {
            padding: 28px 24px;
            height: 420px;
          }
          .bg-quote { font-size: 8rem; }
          .spotlight-quote { font-size: 0.9rem; }
        }
      `}</style>
    </div>
  );
}
