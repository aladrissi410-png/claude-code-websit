import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  {
    src: 'https://cdn3d.iconscout.com/3d/premium/thumb/cake-4993153-4160456.png',
    bg: '#D5A6A8',
    panel: '#E3C1C3',
  }, // Dusty Pink
  {
    src: 'https://cdn3d.iconscout.com/3d/premium/thumb/chocolate-cake-5026939-4185514.png',
    bg: '#FDE482',
    panel: '#FDE99D',
  }, // Playful Yellow
  {
    src: 'https://cdn3d.iconscout.com/3d/premium/thumb/birthday-cake-4993149-4160452.png',
    bg: '#A8D5BA',
    panel: '#C2E3D0',
  }, // Mint Green
  {
    src: 'https://cdn3d.iconscout.com/3d/premium/thumb/strawberry-cake-5026943-4185518.png',
    bg: '#B4A8D5',
    panel: '#CBC2E3',
  }, // Soft Lavender
];

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DURATION = 650;

type Role = 'center' | 'left' | 'right' | 'back';

interface Twinkle {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  star: boolean;
}

// Four-point star shape for the golden glimmer particles
const STAR_CLIP =
  'polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)';

function makeTwinkles(count: number): Twinkle[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 4 + Math.random() * 10,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 3,
    star: Math.random() > 0.45,
  }));
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  );

  const twinkles = useMemo(() => makeTwinkles(26), []);

  // Preload all 4 cake renders on mount
  useEffect(() => {
    IMAGES.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navigate = (dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (dir === 'next' ? (prev + 1) % 4 : (prev + 3) % 4));
    window.setTimeout(() => setIsAnimating(false), DURATION);
  };

  const roleOf = (index: number): Role => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 3) % 4) return 'left';
    if (index === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  const roleStyle = (role: Role): CSSProperties => {
    const base: CSSProperties = {
      position: 'absolute',
      aspectRatio: '1 / 1',
      transition: `transform ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, left ${DURATION}ms ${EASE}, bottom ${DURATION}ms ${EASE}, height ${DURATION}ms ${EASE}`,
      willChange: 'transform, filter, opacity',
    };
    switch (role) {
      case 'center':
        return {
          ...base,
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: 'none',
          opacity: 1,
          zIndex: 20,
          left: '50%',
          height: isMobile ? '50%' : '80%',
          bottom: isMobile ? '25%' : '5%',
        };
      case 'left':
        return {
          ...base,
          transform: 'translateX(-50%) scale(0.85)',
          filter: 'blur(3px)',
          opacity: 0.75,
          zIndex: 10,
          left: isMobile ? '15%' : '25%',
          height: isMobile ? '20%' : '40%',
          bottom: isMobile ? '35%' : '15%',
        };
      case 'right':
        return {
          ...base,
          transform: 'translateX(-50%) scale(0.85)',
          filter: 'blur(3px)',
          opacity: 0.75,
          zIndex: 10,
          left: isMobile ? '85%' : '75%',
          height: isMobile ? '20%' : '40%',
          bottom: isMobile ? '35%' : '15%',
        };
      case 'back':
        return {
          ...base,
          transform: 'translateX(-50%) scale(0.6)',
          filter: 'blur(6px)',
          opacity: 0.5,
          zIndex: 5,
          left: '50%',
          height: isMobile ? '15%' : '30%',
          bottom: isMobile ? '40%' : '20%',
        };
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: `background-color ${DURATION}ms ${EASE}`,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative w-full" style={{ height: '100vh', overflow: 'hidden' }}>
        {/* 1. Golden twinkle effect */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {twinkles.map((t, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                left: `${t.left}%`,
                top: `${t.top}%`,
                width: t.size,
                height: t.size,
                backgroundColor: '#D4AF37',
                clipPath: t.star ? STAR_CLIP : undefined,
                borderRadius: t.star ? undefined : '9999px',
                animation: `basty-twinkle ${t.duration}s ease-in-out ${t.delay}s infinite`,
                opacity: 0.2,
              }}
            />
          ))}
        </div>

        {/* 2. Giant ghost text */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2, top: '18%' }}
        >
          <h1
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(90px, 28vw, 380px)',
              fontWeight: 900,
              color: '#FFFFFF',
              opacity: 0.85,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              margin: 0,
            }}
          >
            CAKE ART
          </h1>
        </div>

        {/* 3. Top-left brand label */}
        <div className="absolute top-6 left-4 sm:left-8" style={{ zIndex: 60 }}>
          <span
            className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase text-white"
            style={{ opacity: 0.95, letterSpacing: '0.18em' }}
          >
            BASTY
          </span>
        </div>

        {/* 4. Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, index) => (
            <div key={item.src} style={roleStyle(roleOf(index))}>
              <img
                src={item.src}
                alt={`Custom cake design ${index + 1}`}
                draggable={false}
                className="drop-shadow-2xl"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                }}
              />
            </div>
          ))}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 360 }}
        >
          <p
            className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px] text-gray-900"
            style={{ opacity: 0.95, letterSpacing: '0.02em' }}
          >
            BASTY CUSTOM CAKES
          </p>
          <p
            className="hidden sm:block text-sm text-gray-800 font-medium mb-4 sm:mb-5"
            style={{ opacity: 0.85, lineHeight: 1.6 }}
          >
            Design your dream cake with our interactive 3D builder. From premium chocolate
            finishes to custom shapes, every detail is crafted to perfection. Delivered
            fresh. Order your masterpiece today.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous cake"
              onClick={() => navigate('prev')}
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-2 border-white bg-transparent text-white hover:scale-[1.08] hover:bg-white/20"
              style={{
                transition: 'transform 150ms, background-color 150ms',
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Next cake"
              onClick={() => navigate('next')}
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-2 border-white bg-transparent text-white hover:scale-[1.08] hover:bg-white/20"
              style={{
                transition: 'transform 150ms, background-color 150ms',
                cursor: 'pointer',
              }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* 6. Bottom-right link */}
        <a
          href="#design"
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center text-gray-900 no-underline opacity-95 hover:opacity-100"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
            transition: 'opacity 200ms',
          }}
        >
          DESIGN YOURS
          <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 ml-2" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  );
}
