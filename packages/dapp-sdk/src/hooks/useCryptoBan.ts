import { useEffect, useState } from 'react'

const denyList = new Set(['CN'])

export function useCryptoBan() {
  const [location, setLocation] = useState<string>()
  const [ban, setBan] = useState<boolean>()

  useEffect(() => {
    fetch('https://www.cloudflare.com/cdn-cgi/trace')
      .then(res => res.text())
      .then(t => {
        let data = t.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"')
        data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}'
        const { loc } = JSON.parse(data)
        const location = loc.toUpperCase()
        setLocation(location)
        const ban = denyList.has(location)
        setBan(ban)
      })
      .catch(e => console.error(e))
  }, [])

  return {
    ban,
    location,
  }
}
