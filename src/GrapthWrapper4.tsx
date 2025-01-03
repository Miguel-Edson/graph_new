import React, { FC, useEffect, useMemo, CSSProperties } from "react";
import { MultiDirectedGraph as MultiGraphConstructor } from "graphology";
import EdgeCurveProgram, { DEFAULT_EDGE_CURVATURE, indexParallelEdgesIndex } from "@sigma/edge-curve";
import { EdgeArrowProgram } from "sigma/rendering";

import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

interface NodeType {
  x: number;
  y: number;
  label: string;
  size: number;
  color: string;
}

interface EdgeType {
  type?: string;
  label?: string;
  size?: number;
  curvature?: number;
  parallelIndex?: number;
  parallelMaxIndex?: number;
}

export const MyGraph: React.FC = () => {
  const loadGraph = useLoadGraph<NodeType, EdgeType>();

  useEffect(() => {
    // Create the graph
    const graph = new MultiGraphConstructor<NodeType, EdgeType>();

    // Adicionando nós com valores fixos
    graph.addNode("a", {
      x: 0,
      y: 0,
      size: 10, // Tamanho fixo
      color: "#FF5733", // Cor fixa
      label: "Node A", // Nome fixo
    });
    graph.addNode("b", {
      x: 1,
      y: -1,
      size: 12,
      color: "#33FF57",
      label: "Node B",
    });
    graph.addNode("c", {
      x: 3,
      y: -2,
      size: 14,
      color: "#3357FF",
      label: "Node C",
    });
    graph.addNode("d", {
      x: 1,
      y: -3,
      size: 16,
      color: "#FF33A6",
      label: "Node D",
    });
    graph.addNode("e", {
      x: 3,
      y: -4,
      size: 18,
      color: "#A633FF",
      label: "Node E",
    });
    graph.addNode("f", {
      x: 4,
      y: -5,
      size: 20,
      color: "#33FFF5",
      label: "Node F",
    });

    // Adicionando arestas com valores fixos
    graph.addEdge("a", "b", { label: "Edge AB", size: 3 });
    graph.addEdge("b", "c", { label: "Edge BC", size: 4 });
    graph.addEdge("b", "d", { label: "Edge BD", size: 2 });
    graph.addEdge("c", "b", { label: "Edge CB", size: 3 });
    graph.addEdge("c", "e", { label: "Edge CE", size: 5 });
    graph.addEdge("d", "c", { label: "Edge DC", size: 2 });
    graph.addEdge("d", "e", { label: "Edge DE", size: 3 });
    graph.addEdge("d", "e", { label: "Edge DE", size: 4 });
    graph.addEdge("d", "e", { label: "Edge DE", size: 2 });
    graph.addEdge("d", "e", { label: "Edge DE", size: 3 });
    graph.addEdge("e", "d", { label: "Edge ED", size: 1 });
    graph.addEdge("e", "f", { label: "Edge EF", size: 5 });
    graph.addEdge("f", "e", { label: "Edge FE", size: 4 });
    graph.addEdge("f", "e", { label: "Edge FE", size: 3 });

    // Use dedicated helper to identify parallel edges:
    indexParallelEdgesIndex(graph, { edgeIndexAttribute: "parallelIndex", edgeMaxIndexAttribute: "parallelMaxIndex" });

    // Adapt types and curvature of parallel edges for rendering:
    graph.forEachEdge((edge, { parallelIndex, parallelMaxIndex }) => {
      if (typeof parallelIndex === "number") {
        graph.mergeEdgeAttributes(edge, {
          type: "curved",
          curvature: DEFAULT_EDGE_CURVATURE + (3 * DEFAULT_EDGE_CURVATURE * parallelIndex) / (parallelMaxIndex || 1),
        });
      } else {
        graph.setEdgeAttribute(edge, "type", "straight");
      }
    });

    // load the graph in sigma
    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

export const MultiDirectedGraph: FC<{ style?: CSSProperties }> = ({ style }) => {
  // Sigma settings
  const settings = useMemo(
    () => ({
      allowInvalidContainer: true,
      renderEdgeLabels: true,
      defaultEdgeType: "straight",
      edgeProgramClasses: {
        straight: EdgeArrowProgram,
        curved: EdgeCurveProgram,
      },
    }),
    [],
  );

  return (
    <SigmaContainer style={style} graph={MultiGraphConstructor<NodeType, EdgeType>} settings={settings}>
      <MyGraph />
    </SigmaContainer>
  );
};
