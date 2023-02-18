import { useEffect, useState } from 'react'

export const useLockAspectRatio = () => {
  const [isLockAspectRatio, setLockAspectRatio] = useState(false)

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const isCTRL = e.key === 'Shift'

      if (isCTRL && !isLockAspectRatio) {
        setLockAspectRatio(true)

        return
      }

      setLockAspectRatio(false)
    }

    const reset = () => {
      setLockAspectRatio(false)
    }

    document.addEventListener('keydown', listener)
    document.addEventListener('keyup', reset)

    return () => {
      document.removeEventListener('keydown', listener)
      document.removeEventListener('keyup', reset)
    }
  }, [isLockAspectRatio])

  return isLockAspectRatio
}
