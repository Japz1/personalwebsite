import { useMemo, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Lightbox from './components/Lightbox'
import VideoPlayer from './components/VideoPlayer'
import { PortfolioProvider } from './lib/PortfolioContext'
import Home from './pages/Home'
import Photography from './pages/Photography'
import Cinematography from './pages/Cinematography'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import type { Film, Photo, Viewer } from './types/content'

export default function App() {
  const location = useLocation()

  // Shared viewers used by the home page (gallery pages own their state).
  const [viewer, setViewer] = useState<Viewer>(null)

  const openPhotos = useMemo(
    () => (list: Photo[], id: string) => {
      const index = list.findIndex((photo) => photo.id === id)
      if (index >= 0) setViewer({ kind: 'photos', list, index })
    },
    [],
  )

  const openFilm = useMemo(() => (film: Film) => setViewer({ kind: 'film', film }), [])
  const closeViewer = useMemo(() => () => setViewer(null), [])

  const gallery = viewer?.kind === 'photos' ? viewer : null
  const singleFilm = viewer?.kind === 'film' ? viewer.film : null

  return (
    <PortfolioProvider>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home onOpenPhotos={openPhotos} onOpenFilm={openFilm} />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/cinematography" element={<Cinematography />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>

      {/* Kept mounted so their own exit animations can play when closing. */}
      <Lightbox
        photos={gallery ? gallery.list : []}
        index={gallery ? gallery.index : null}
        onIndexChange={(index) =>
          setViewer((prev) => (prev && prev.kind === 'photos' ? { ...prev, index } : prev))
        }
        onClose={closeViewer}
      />
      <VideoPlayer film={singleFilm} onClose={closeViewer} />
    </PortfolioProvider>
  )
}
