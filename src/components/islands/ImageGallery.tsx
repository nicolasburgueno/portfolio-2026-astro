import { useState, useEffect, useCallback } from 'react';

interface Props {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, goTo]);

  const handleError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const mainHasError = imageErrors[activeIndex];

  return (
    <div className="w-full">
      {/* Main image */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          aspectRatio: '16/9',
          background: 'linear-gradient(135deg, #0c1219 0%, #111827 50%, #0F151F 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {mainHasError ? (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0c1219 0%, #111827 100%)' }}
          >
            <span
              className="font-sans font-bold text-center px-8 select-none"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                color: 'rgba(71,180,204,0.12)',
                letterSpacing: '-0.04em',
              }}
            >
              {title}
            </span>
          </div>
        ) : (
          <img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${title} screenshot ${activeIndex + 1}`}
            onError={() => handleError(activeIndex)}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            style={{ display: 'block' }}
          />
        )}

        {/* Arrow nav — only shown when multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
              }}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
              }}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div
            className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs font-sans"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((src, i) => {
            const hasError = imageErrors[i];
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="flex-shrink-0 rounded-lg overflow-hidden"
                style={{
                  width: '80px',
                  height: '52px',
                  border: isActive
                    ? '2px solid rgba(71,180,204,0.8)'
                    : '2px solid rgba(255,255,255,0.08)',
                  opacity: isActive ? 1 : 0.55,
                  transition: 'border-color 0.2s, opacity 0.2s',
                  cursor: 'pointer',
                  background: '#0c1219',
                }}
                aria-label={`View image ${i + 1}`}
              >
                {hasError ? (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: '#111827' }}
                  >
                    <span style={{ color: 'rgba(71,180,204,0.3)', fontSize: '10px' }}>
                      {i + 1}
                    </span>
                  </div>
                ) : (
                  <img
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    onError={() => handleError(i)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
