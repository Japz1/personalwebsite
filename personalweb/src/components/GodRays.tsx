import { motion } from 'framer-motion'

/**
 * Realistic Cinematic God Rays Component
 *
 * Simulates genuine volumetric light shafts streaming diagonally from an overhead light source.
 * Employs SVG linear and radial light projections with conical beam falloffs,
 * optical dust motes / particulate diffusion, and gentle atmospheric swaying.
 * Uses a soft mask-image gradient to ensure 100% seamless transparency at the bottom edges.
 */
export default function GodRays() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{
        // Smooth, knee-free falloff so the light dissolves seamlessly into the
        // section background instead of leaving a horizontal break mid-hero.
        maskImage:
          'linear-gradient(to bottom, #000 0%, #000 48%, rgba(0,0,0,0.72) 66%, rgba(0,0,0,0.38) 80%, rgba(0,0,0,0.12) 91%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, #000 0%, #000 48%, rgba(0,0,0,0.72) 66%, rgba(0,0,0,0.38) 80%, rgba(0,0,0,0.12) 91%, transparent 100%)',
      }}
    >
      {/* 1. Deep Atmosphere Radial Glow (Light origin source at top-left) */}
      {/* Sized in % (not vw/vh) so it tracks the hero box even when the hero
          is taller than the viewport, keeping its edge off-screen. */}
      <div
        className="absolute -top-[25%] -left-[10%] w-[120%] h-[150%] opacity-60 mix-blend-screen pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 18% 12%, rgba(245, 238, 220, 0.28) 0%, rgba(234, 230, 223, 0.12) 25%, rgba(200, 190, 175, 0.04) 55%, transparent 75%)',
        }}
      />

      {/* 2. Main High-Definition Volumetric Light Shafts (SVG Ray Mesh) */}
      <motion.svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none"
        initial={{ opacity: 0.8 }}
        animate={{
          opacity: [0.75, 0.95, 0.8, 1, 0.75],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <defs>
          {/* Intense core ray gradient */}
          <linearGradient id="ray-bright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9EB" stopOpacity="0.45" />
            <stop offset="25%" stopColor="#EAE6DF" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#EAE6DF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#EAE6DF" stopOpacity="0" />
          </linearGradient>

          {/* Medium atmospheric ray gradient */}
          <linearGradient id="ray-medium" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.32" />
            <stop offset="35%" stopColor="#EAE6DF" stopOpacity="0.16" />
            <stop offset="75%" stopColor="#EAE6DF" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#EAE6DF" stopOpacity="0" />
          </linearGradient>

          {/* Soft ambient ray gradient */}
          <linearGradient id="ray-soft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0EAE1" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#E0D8CB" stopOpacity="0.09" />
            <stop offset="85%" stopColor="#E0D8CB" stopOpacity="0" />
          </linearGradient>

          {/* Blur filters for natural volumetric light diffusion */}
          <filter id="ray-blur-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="ray-blur-md" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id="ray-blur-lg" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="52" />
          </filter>
        </defs>

        {/* --- Primary Sharp Shafts (originating ~ (120, -60)) --- */}
        <g filter="url(#ray-blur-sm)">
          {/* Main dominant beam piercing through center */}
          <polygon points="120,-60 210,-60 1150,1100 850,1100" fill="url(#ray-bright)" />
          {/* Flanking sharp secondary beam */}
          <polygon points="170,-60 240,-60 1480,1100 1280,1100" fill="url(#ray-medium)" />
          {/* High left beam */}
          <polygon points="80,-60 140,-60 620,1100 440,1100" fill="url(#ray-medium)" />
        </g>

        {/* --- Secondary Broad Volumetric Beams --- */}
        <g filter="url(#ray-blur-md)">
          {/* Broad central wash */}
          <polygon points="100,-80 320,-80 1350,1100 780,1100" fill="url(#ray-medium)" />
          {/* Steep wide beam toward right bottom */}
          <polygon points="200,-80 360,-80 1700,1050 1450,1050" fill="url(#ray-soft)" />
          {/* Narrow beam cutting across center */}
          <polygon points="60,-80 110,-80 400,1100 280,1100" fill="url(#ray-soft)" />
        </g>

        {/* --- Soft Ambient Diffused Hazes --- */}
        <g filter="url(#ray-blur-lg)">
          <polygon points="0,-100 450,-100 1650,1100 600,1100" fill="url(#ray-soft)" />
        </g>
      </motion.svg>

      {/* 3. Dynamic Animated Secondary Light Sheen */}
      <motion.div
        className="absolute inset-0 mix-blend-screen pointer-events-none"
        style={{
          background:
            'conic-gradient(from 135deg at 10% 5%, transparent 0deg, rgba(245, 238, 222, 0.22) 18deg, transparent 32deg, rgba(234, 230, 223, 0.18) 42deg, transparent 58deg, rgba(245, 238, 222, 0.26) 72deg, transparent 90deg)',
          filter: 'blur(36px)',
        }}
        animate={{
          transform: [
            'rotate(0deg) scale(1)',
            'rotate(2.5deg) scale(1.04)',
            'rotate(-1.5deg) scale(0.98)',
            'rotate(0deg) scale(1)',
          ],
          opacity: [0.7, 0.95, 0.75, 0.7],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 4. Fine Atmospheric Shimmer / Floating Light Particles in the Beam */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage:
            'radial-gradient(1.5px 1.5px at 20% 30%, rgba(245, 238, 220, 0.6) 50%, transparent 100%), radial-gradient(2px 2px at 40% 50%, rgba(245, 238, 220, 0.5) 50%, transparent 100%), radial-gradient(1.5px 1.5px at 60% 40%, rgba(245, 238, 220, 0.55) 50%, transparent 100%), radial-gradient(2px 2px at 75% 65%, rgba(245, 238, 220, 0.45) 50%, transparent 100%), radial-gradient(1.5px 1.5px at 30% 70%, rgba(245, 238, 220, 0.4) 50%, transparent 100%), radial-gradient(2px 2px at 50% 25%, rgba(245, 238, 220, 0.5) 50%, transparent 100%)',
          backgroundSize: '400px 400px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px -60px', '80px -120px'],
          opacity: [0.4, 0.75, 0.4],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
