import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface FallingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const staticImages = [
  { src: 'https://i.ibb.co/3ymJyyfx/Whats-App-Image-2026-02-01-at-02-30-00.jpg', x: 10, y: 15 },
  { src: 'https://i.ibb.co/zh5B2HB4/Whats-App-Image-2026-02-01-at-02-30-01-1.jpg', x: 85, y: 20 },
  { src: 'https://i.ibb.co/zVZbczSd/Whats-App-Image-2026-02-01-at-02-30-01-2.jpg', x: 15, y: 80 },
  { src: 'https://i.ibb.co/d4xQwZt8/Whats-App-Image-2026-02-01-at-02-30-01-3.jpg', x: 80, y: 75 },
  { src: 'https://i.ibb.co/xqQJz94C/Whats-App-Image-2026-02-01-at-02-30-01-4.jpg', x: 45, y: 10 },
  { src: 'https://i.ibb.co/fg3mgrV/Whats-App-Image-2026-02-01-at-02-30-01-5.jpg', x: 70, y: 40 },
  { src: 'https://i.ibb.co/jZ1xm5T8/Whats-App-Image-2026-02-01-at-02-30-01-6.jpg', x: 25, y: 60 },
  { src: 'https://i.ibb.co/cK7ykVhQ/Whats-App-Image-2026-02-01-at-02-30-01-7.jpg', x: 60, y: 85 },
  { src: 'https://i.ibb.co/hJ4DKdPy/Whats-App-Image-2026-02-01-at-02-30-01-8.jpg', x: 35, y: 25 },
  { src: 'https://i.ibb.co/QFcRShkk/Whats-App-Image-2026-02-01-at-02-30-01-9.jpg', x: 75, y: 15 },
  { src: 'https://i.ibb.co/X6ftTsB/Whats-App-Image-2026-02-01-at-02-30-01-10.jpg', x: 20, y: 45 },
  { src: 'https://i.ibb.co/mCSg9NpV/Whats-App-Image-2026-02-01-at-02-30-01-11.jpg', x: 55, y: 70 },
  { src: 'https://i.ibb.co/8nTPZf9H/Whats-App-Image-2026-02-01-at-02-30-01-12.jpg', x: 40, y: 55 },
  { src: 'https://i.ibb.co/fmzLH6f/Whats-App-Image-2026-02-01-at-02-30-01.jpg', x: 85, y: 50 },
];

export function SuccessScreen() {
  const [fallingHearts, setFallingHearts] = useState<FallingHeart[]>([]);

  useEffect(() => {
    const newHearts: FallingHeart[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      size: 20 + Math.random() * 25,
      rotation: Math.random() * 360,
    }));
    setFallingHearts(newHearts);
  }, []);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-100 to-red-100 p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Static Background Images */}
      {staticImages.map((image, index) => (
        <div
          key={index}
          className="absolute pointer-events-none select-none rounded-lg flex items-center justify-center"
          style={{
            width: '100px',
            height: '100px',
            opacity: 0.25,
            left: `${image.x}%`,
            top: `${image.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            backgroundColor: 'rgba(255, 182, 193, 0.2)',
            border: '1px solid rgba(255, 182, 193, 0.3)',
          }}
        >
          <img
            src={image.src}
            alt=""
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              // If image fails to load, keep the placeholder div
              e.currentTarget.style.display = 'none';
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center text-pink-300 text-xs">
            💖
          </div>
        </div>
      ))}
      {/* Heart rain */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {fallingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-400/60"
            style={{
              left: `${heart.left}%`,
              top: -50,
              fontSize: `${heart.size}px`,
            }}
            animate={{
              y: [0, window.innerHeight + 100],
              x: [0, Math.sin(heart.id) * 30],
              rotate: [heart.rotation, heart.rotation + 360],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Glowing particles */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(255, 182, 193, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(255, 182, 193, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(255, 182, 193, 0.4) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main Content Card */}
      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          duration: 1,
        }}
      >
        {/* Animated envelope/heart icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
        >
          <motion.div
            className="relative"
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="relative">
              <Heart className="w-32 h-32 text-rose-500 fill-rose-500" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              >
                <Heart className="w-32 h-32 text-rose-300 fill-rose-300" />
              </motion.div>
            </div>

            {/* Sparkles around heart */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [0, Math.cos((i / 4) * Math.PI * 2) * 60],
                  y: [0, Math.sin((i / 4) * Math.PI * 2) * 60],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeOut',
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 2,
            }}
          />

          {/* Glowing pulse behind text */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-3xl -z-10"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.h1
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.span
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              You just made my heart the happiest 💖
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-700 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            Kuchipuchiii, our date is officially confirmed — I can't wait to see you.
          </motion.p>

          {/* Special Image */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <div className="relative rounded-xl shadow-lg border-4 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center"
                 style={{ width: '300px', height: '300px' }}>
              <img
                src="https://i.ibb.co/S45YjWDG/Untitled-design.png"
                alt="Special message"
                className="rounded-xl max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  // Show fallback content
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex flex-col items-center justify-center h-full p-6 text-center">
                        <div class="text-6xl mb-4">💌</div>
                        <div class="text-pink-600 font-bold text-xl mb-2">Our Special Moment</div>
                        <div class="text-pink-500 text-sm">Together Forever</div>
                      </div>
                    `;
                  }
                }}
                loading="eager"
              />
            </div>
          </motion.div>

          {/* Romantic Message */}
          <motion.p
            className="text-xl text-pink-600 font-serif italic mt-10 text-center"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
          >
            Forever us, forever love… no nazar endlessly yourss
          </motion.p>

          {/* Decorative hearts */}
          <div className="flex justify-center gap-4 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              >
                <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating love particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${(i * 12.5) + 10}%`,
              top: '50%',
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeOut',
            }}
          >
            {['💕', '💖', '💗', '💘'][i % 4]}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
