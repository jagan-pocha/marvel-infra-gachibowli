import { Suspense, lazy, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import QABot from './components/QABot/QABot'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import NotFound from './pages/NotFound/NotFound'

const Home       = lazy(() => import('./pages/Home/Home'))
const About      = lazy(() => import('./pages/About/About'))
const Amenities  = lazy(() => import('./pages/Amenities/Amenities'))
const FloorPlans = lazy(() => import('./pages/FloorPlans/FloorPlans'))
const Gallery    = lazy(() => import('./pages/Gallery/Gallery'))
const Contact    = lazy(() => import('./pages/Contact/Contact'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="w-8 h-8 rounded-full border-2"
        style={{ borderColor: 'var(--border-subtle)', borderTopColor: 'var(--accent)' }}
      />
    </div>
  )
}

function PageTransition({ children }) {
  return (
    <motion.div
      className="w-full min-w-0"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ScrollToTop() {
  const location = useLocation()
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.pathname])

  return null
}

function AppRoutes() {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <QABot />
      <ErrorBoundary>
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/"            element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about"       element={<PageTransition><About /></PageTransition>} />
              <Route path="/amenities"   element={<PageTransition><Amenities /></PageTransition>} />
              <Route path="/floor-plans" element={<PageTransition><FloorPlans /></PageTransition>} />
              <Route path="/gallery"     element={<PageTransition><Gallery /></PageTransition>} />
              <Route path="/contact"     element={<PageTransition><Contact /></PageTransition>} />
              <Route path="*"            element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </ErrorBoundary>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}
