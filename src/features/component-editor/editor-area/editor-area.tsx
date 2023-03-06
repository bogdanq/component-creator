import { useCallback, useEffect, useRef, useMemo } from "react";
import { useStore } from "effector-react";
import ReactFlow, {
  useNodesState,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import { WithContentResizeble } from "./content-resizeble-wrapper";
import { ElementsTree } from "./elements-workspace";
import "reactflow/dist/style.css";
import {
  $activeElement,
  $componentsTree,
  handleAddActiveelements,
} from "../models";
import { useZoom } from "../hooks";

const initialNodes = [
  {
    id: "2",
    type: "selectorNode",
    data: { label: "Node 2" },
    position: { x: 300, y: 300 },
    dragHandle: "dragHandle",
  },
];

export const useElementsSelection = (activeElement: any | null, tree: any) => {
  const div = useRef(document.createElement("div"));
  const startPositions = useRef({ x: 0, y: 0 });

  const zoom = useZoom();

  const drowPoligon = useCallback(
    (e: any) => {
      if (activeElement || tree.activeElementsIds.length) {
        return;
      }

      div.current.className = "div";
      div.current.style.zIndex = "99999";

      const diffX = Math.abs(e.pageX - startPositions.current.x);
      const diffY = Math.abs(e.pageY - startPositions.current.y);

      const asixX = startPositions.current.x > e.pageX ? "left" : "right";
      const asixY = startPositions.current.y > e.pageY ? "top" : "bottom";

      div.current.style.width = `${diffX}px`;
      div.current.style.height = `${diffY}px`;

      if (asixX === "right") {
        div.current.style.left = `${startPositions.current.x}px`;
      }
      if (asixX === "left") {
        div.current.style.left = `${e.pageX}px`;
      }

      if (asixY === "bottom") {
        div.current.style.top = `${startPositions.current.y}px`;
      }
      if (asixY === "top") {
        div.current.style.top = `${e.pageY}px`;
      }

      document.body.appendChild(div.current);
    },
    [activeElement, tree]
  );

  useEffect(() => {
    const mousedown = (e: any) => {
      startPositions.current.x = e.pageX;
      startPositions.current.y = e.pageY;

      window.addEventListener("mousemove", drowPoligon);
    };

    const mouseup = (e: any) => {
      if (!!document.body.contains(div.current)) {
        div.current.remove();

        const rect = document.querySelector("#grid")?.getBoundingClientRect();

        if (!rect) {
          return tree;
        }

        const d = {
          startPositions: {
            x: (startPositions.current.x - rect.x) / zoom,
            y: (startPositions.current.y - rect.y) / zoom,
          },
          endPositions: {
            x: (e.pageX - rect.x) / zoom,
            y: (e.pageY - rect.y) / zoom,
          },
        };

        handleAddActiveelements(d);
      } else {
        handleAddActiveelements({
          startPositions: { x: 0, y: 0 },
          endPositions: { x: 0, y: 0 },
        });
      }

      window.removeEventListener("mousemove", drowPoligon);
    };

    window.addEventListener("mousedown", mousedown);
    window.addEventListener("mouseup", mouseup);

    return () => {
      window.removeEventListener("mousedown", mousedown);
      window.removeEventListener("mouseup", mouseup);
    };
  }, [drowPoligon, tree, zoom]);
};

const Poligon = () => {
  const activeElement = useStore($activeElement);
  const tree = useStore($componentsTree);

  useElementsSelection(activeElement, tree);

  return null;
};

// рабочая область с компонентами
export const EditorArea = () => {
  const [nodes] = useNodesState(initialNodes);

  const nodeTypes = useMemo(() => {
    return {
      // область с елементами
      selectorNode: () => (
        <WithContentResizeble>
          <ElementsTree />
        </WithContentResizeble>
      ),
    };
  }, []);

  return (
    <>
      <ReactFlow nodeTypes={nodeTypes} nodes={nodes} selectNodesOnDrag={false}>
        <MiniMap zoomable pannable style={{ marginRight: 330 }} />
        <Controls showInteractive={false} style={{ marginLeft: 160 }} />
        <Background />
        <Poligon />
      </ReactFlow>
    </>
  );
};
