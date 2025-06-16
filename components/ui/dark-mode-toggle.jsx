import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('dark_mode') === 'true'
    setEnabled(stored)
    if (stored) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    if (next) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('dark_mode', next.toString())
  }

  return (
    <button
      onClick={toggle}
      className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {enabled ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}
