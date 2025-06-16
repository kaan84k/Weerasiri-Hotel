import '../styles/globals.css'
import { Poppins } from 'next/font/google'
import { useEffect, useState } from 'react'
import DarkModeToggle from '../components/ui/dark-mode-toggle'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const enabled = localStorage.getItem('dark_mode') === 'true'
    if (enabled) {
      document.documentElement.classList.add('dark')
    }
    setMounted(true)
  }, [])

  return (
    <main className={poppins.className}>
      {mounted && (
        <div className="fixed right-4 top-4 z-50">
          <DarkModeToggle />
        </div>
      )}
      <Component {...pageProps} />
    </main>
  )
}
