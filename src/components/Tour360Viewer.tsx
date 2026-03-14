import { useState, useEffect } from 'react'
import {
  Maximize2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  X,
  Compass
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

interface Props {
  propertyTitle: string
  tourUrl?: string
}

export default function Tour360Viewer({ propertyTitle, tourUrl }: Props) {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  const [isOpen, setIsOpen] = useState(false)
  const [zoom, setZoom] = useState(75)
  const [rotation, setRotation] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const demoTourUrl =
    tourUrl ||
    'https://momento360.com/e/u/14a99095b5e8441fa93c6c8872e5ebb8?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true'

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  const zoomIn = () => setZoom((z) => Math.min(120, z + 5))
  const zoomOut = () => setZoom((z) => Math.max(50, z - 5))

  return (
    <>
      {/* BUTTON */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(true)}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white font-bold shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden"
      >
        <Compass className="w-5 h-5" />
        {isAr ? 'جولة 360°' : '360° Virtual Tour'}
      </motion.button>

      {/* MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            {/* HEADER */}
            <div className="p-4 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between">
              <div>
                <h3 className="text-white font-black text-xl">
                  {isAr ? 'جولة افتراضية 360°' : '360° Virtual Tour'}
                </h3>
                <p className="text-white/60 text-sm">{propertyTitle}</p>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={zoomOut}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
                >
                  <ZoomOut />
                </button>

                <span className="text-white font-bold px-2">{zoom}</span>

                <button
                  onClick={zoomIn}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
                >
                  <ZoomIn />
                </button>

                <button
                  onClick={() => setRotation((r) => r + 90)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
                >
                  <RotateCw />
                </button>

                <button
                  onClick={() => setFullscreen((f) => !f)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
                >
                  <Maximize2 />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg text-white"
                >
                  <X />
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex items-center justify-center p-6">
              <motion.div
                animate={{
                  scale: fullscreen ? 1 : zoom / 100,
                  rotate: rotation
                }}
                transition={{ duration: 0.3 }}
                className={`w-full ${
                  fullscreen ? 'max-w-none h-full' : 'max-w-7xl h-[75vh]'
                } rounded-3xl overflow-hidden shadow-2xl`}
              >
                <iframe
                  src={`${demoTourUrl}&field-of-view=${zoom}`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="xr-spatial-tracking; gyroscope; accelerometer"
                />
              </motion.div>
            </div>

            {/* FOOTER */}
            <div className="p-4 border-t border-white/10 bg-black/40 text-center text-white/60 text-sm">
              {isAr
                ? 'اسحب لتحريك المشهد • استخدم العجلة للتقريب • اضغط ESC للخروج'
                : 'Drag to move • Use wheel to zoom • Press ESC to exit'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}