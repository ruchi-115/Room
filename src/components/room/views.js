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
      wildlife: { center: [-2.572, 1.241, 4.95], width: 2.083 * 0.88, height: 1.386 * 0.86 },
      spotify: { center: [-2.275, 2.645, 4.95], width: 1.5 * 0.86, height: 1.1 * 0.84 },
      news: { center: [-0.586, 2.075, 4.95], width: 1.5 * 0.86, height: 2.259 * 0.9 },
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

export const PROJECTS = [
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
]
