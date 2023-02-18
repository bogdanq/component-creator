import { useMemo } from 'react'
import ReactFlow, {
  useNodesState,
  MiniMap,
  Controls,
  Background,
} from 'reactflow'
import { WithContentResizeble } from './content-resizeble-wrapper'
import { ElementsTree } from './elements-workspace'

import 'reactflow/dist/style.css'

const initialNodes = [
  {
    id: '2',
    type: 'selectorNode',
    data: { label: 'Node 2' },
    position: { x: 300, y: 300 },
    dragHandle: 'dragHandle',
  },
]

// рабочая область с компонентами
export const EditorArea = () => {
  const [nodes] = useNodesState(initialNodes)

  const nodeTypes = useMemo(() => {
    return {
      // область с елементами
      selectorNode: () => (
        <WithContentResizeble>
          <ElementsTree />
        </WithContentResizeble>
      ),
    }
  }, [])

  return (
    <>
      <ReactFlow nodeTypes={nodeTypes} nodes={nodes} selectNodesOnDrag={false}>
        <MiniMap zoomable pannable style={{ marginRight: 330 }} />
        <Controls showInteractive={false} style={{ marginLeft: 160 }} />
        <Background />
      </ReactFlow>
    </>
  )
}
