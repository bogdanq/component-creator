import { useStore } from 'reactflow'

export const useZoom = () => {
  const zoom = useStore((s) => {
    const zoom = s.transform[2]

    return zoom
  })

  return zoom
}
