import { useEffect, useState } from 'react'

export default function useScrollSpy(ids = [], options = {}) {
  const [activeId, setActiveId] = useState(ids[0] || '')

  useEffect(() => {
    if (!ids || ids.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { threshold: 0.25, ...options }
    )

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
      observer.disconnect()
    }
  }, [ids.join('|'), JSON.stringify(options)])

  return activeId
}
