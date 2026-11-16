// World-space targets measured from room.glb as it is placed in the scene
// (scale 1.5, position [-2.7, -3.2, 1.67], rotation [0, PI, 0]).
// `normal` points from the object toward where the camera should sit.
export const VIEWS = {
  about: {
    label: 'About me',
    center: [0.386, 0, -0.02],
    normal: [-1, 0, 0],
    width: 1.28,
    height: 0.76,
    fill: 0.9,
    anchors: {
      screen: { center: [0.38, 0, -0.02], width: 1.24, height: 0.72 },
    },
  },
  projects: {
    label: 'Projects',
    center: [-1.72, 1.876, 4.95],
    normal: [0, 0, -1],
    width: 3.9,
    height: 2.8,
    fill: 0.92,
    anchors: {
      frame0: { center: [-2.572, 1.241, 4.95], width: 2.083 * 0.88, height: 1.386 * 0.86 },
      frame1: { center: [-2.275, 2.645, 4.95], width: 1.5 * 0.86, height: 1.1 * 0.84 },
      frame2: { center: [-0.586, 2.075, 4.95], width: 1.5 * 0.86, height: 2.259 * 0.9 },
    },
  },
  contact: {
    label: 'Contact',
    center: [-0.28, 1.875, 0.45],
    normal: [-1, 0, 0],
    width: 2.9,
    height: 1.35,
    fill: 0.86,
    anchors: {
      shelf: { center: [-0.28, 1.875, 0.45], width: 2.9, height: 1.35 },
    },
  },
}

export const TABS = [
  { id: 'home', label: 'Room' },
  { id: 'about', label: 'About me' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const FRAMES_PER_PAGE = 3

export const SOCIALS = [
  { id: 'linkedin', label: 'LinkedIn', icon: '/socials/linkedin.svg', href: 'https://www.linkedin.com/in/ruchita-sonawale-475063196/' },
  { id: 'github', label: 'GitHub', icon: '/socials/github.svg', href: 'https://github.com/ruchi-115' },
]

export const RESUME_URL = 'https://drive.google.com/file/d/1rz6gI9Sx97oY6tWq6g-IhCZrbi2fmpK7/view?usp=sharing'

export const PROJECTS = [
  {
    id: 'nyc-transit-hub',
    title: 'NYC Transit Hub',
    image: '/projects/nyc-transit-hub.png',
    summary:
      'Live NYC transit dashboard with an interactive subway map, per-line train arrivals, LIRR and Metro-North views, and real-time service alerts.',
    tech: ['Next.js', 'React', 'Mapbox', 'MTA GTFS-RT'],
    href: 'https://null-pointer-eta.vercel.app/',
  },
  {
    id: 'pyramids',
    title: 'Pyramids: Three.js Experiments',
    image: '/projects/pyramids.png',
    summary:
      'A set of interactive 3D experiments built around pyramid geometry, exploring lighting, materials and camera motion in WebGL.',
    tech: ['Three.js', 'WebGL', 'JavaScript'],
    href: 'https://pyramid-eight.vercel.app/',
  },
  {
    id: 'codemaven',
    title: 'CodeMaven: Coding Mentor',
    image: '/projects/codemaven.png',
    summary:
      'AI coding extension built at HackNYU 2025. Real-time debugging help and instant code feedback from GPT-4, Claude and Gemini, right inside the IDE.',
    tech: ['TypeScript', 'React', 'Judge0 API', 'LLMs'],
    href: 'https://advanced-ai-code-editor-plum.vercel.app/',
  },
  {
    id: 'wildlife',
    title: 'Wildlife Detection',
    image: '/projects/wildlife-detection.png',
    summary:
      'Object detection model trained on camera-trap images to detect and classify species. Won 1st place at PRISM 2022.',
    tech: ['Python', 'Deep Learning', 'React', 'Next.js'],
    href: 'https://tx-03.netlify.app/',
  },
  {
    id: 'spotify',
    title: 'Spotify Clone',
    image: '/projects/spotify-clone.png',
    summary: 'A Spotify-style music player built with React, Firebase and Material UI.',
    tech: ['React', 'Firebase', 'Material UI'],
    href: 'https://spotify-clone-6de9b.web.app/',
  },
  {
    id: 'news',
    title: 'News-Events',
    image: '/projects/news-events.png',
    summary: 'A platform for promoting events and conferences, with event listings and detail pages.',
    tech: ['React', 'Next.js', 'Figma'],
    href: 'https://news-events.vercel.app/',
  },
  {
    id: 'planets',
    title: 'Planets',
    image: '/Planets.jpg',
    summary: 'A planet-themed website with GSAP-driven graphical animation.',
    tech: ['JavaScript', 'GSAP', 'CSS3'],
    href: 'https://planets-gilt.vercel.app/',
  },
  {
    id: 'ideacon',
    title: 'Ideacon',
    image: '/ideacon.png',
    summary: 'A global idea-sharing platform where great minds meet.',
    tech: ['React', 'Next.js'],
    href: 'https://ideacon-gdsc.vercel.app/',
  },
  {
    id: 'doctorbot',
    title: 'Doctorbot',
    image: '/projects/doctorbot.png',
    summary: 'A healthcare chatbot that offers personalized care and a better patient experience through text.',
    tech: ['JavaScript', 'Chatbot', 'Vercel'],
    href: 'https://doctor-chatbot-11.vercel.app/',
  },
  {
    id: 'blog',
    title: 'Blog Website',
    image: '/projects/blog.png',
    summary: 'A Medium-style blog built with Next.js and Sanity.io as the headless CMS.',
    tech: ['Next.js', 'Sanity.io'],
    href: 'https://next-sanity-blog-eta.vercel.app/',
  },
  {
    id: 'qr-plantae',
    title: 'QR-Plantae',
    image: '/projects/qr-plantae.png',
    summary: 'QR codes for your garden: scan a plant to get its details, consumer-driven tech at your fingertips.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    href: 'https://ruchi-115.github.io/Plantae-QR-Garden/',
  },
  {
    id: 'soundwave',
    title: 'Soundwave',
    image: '/projects/soundwave.png',
    summary: 'Frontend design for a music service platform.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    href: 'https://ruchi-115.github.io/Soundwave.github.io/index.html',
  },
]
