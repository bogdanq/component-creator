import { useMemo } from "react";
import ReactFlow, {
  useNodesState,
  Controls,
  Background,
  SelectionMode,
} from "reactflow";
import "reactflow/dist/style.css";
import { Selection } from "./selection";
import { ZeroPanel, ZeroBlockWrapper } from "./zero-panel";

const initialNodes = [
  {
    id: "2",
    type: "selectorNode",
    data: { label: "Node 2" },
    position: { x: 300, y: 300 },
    dragHandle: "dragHandle",
  },
];

export const ZeroBlock = () => {
  const [nodes] = useNodesState(initialNodes);

  const nodeTypes = useMemo(() => {
    return {
      // область с елементами
      selectorNode: () => (
        <ZeroBlockWrapper className="zero-panel">
          <ZeroPanel />
        </ZeroBlockWrapper>
      ),
    };
  }, []);

  return (
    <>
      <ReactFlow
        panOnScroll
        nodeTypes={nodeTypes}
        nodes={nodes}
        selectNodesOnDrag={false}
        panOnDrag={false}
        zoomOnDoubleClick={false}
        selectionMode={SelectionMode.Partial}
      >
        <Controls showInteractive={false} />
        <Background />
        <Selection />
      </ReactFlow>
    </>
  );
};
