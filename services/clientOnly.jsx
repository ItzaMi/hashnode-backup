/**
 * Reference post 👇
 * https://blog.logrocket.com/why-use-next-js-apollo/
 */

import { useEffect, useState } from 'react'

export default function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <div {...delegated}>{children}</div>
}
