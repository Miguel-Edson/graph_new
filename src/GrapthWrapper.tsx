import { FC, CSSProperties, useEffect, useState } from "react";
import { MultiDirectedGraph } from "graphology";
import React from "react";
import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

export const GraphFromJson: FC<{ style: CSSProperties }> = ({ style }) => {
  const [graph, setGraph] = useState<MultiDirectedGraph | null>(null);

  useEffect(() => {
    fetch("/arquivo2.json")
      .then((res) => res.json())
      .then((data) => {
        const g = new MultiDirectedGraph();
  
        const nodes = data.gexf.graph.nodes.node;
        const edges = data.gexf.graph.edges.edge;
  
        const nodeList = Array.isArray(nodes) ? nodes : [nodes];
        const edgeList = Array.isArray(edges) ? edges : [edges];
  
        // Categoriza os nós por prefixo do ID
        const columns = {
          A: { x: 0, color: "#1f77b4" }, // Azul
          B: { x: 4, color: "#ff7f0e" }, // Laranja
          C: { x: 8, color: "#2ca02c" }  // Verde
        };
  
        const columnCounters: { [key: string]: number } = {
          A: 0,
          B: 0,
          C: 0
        };
  
        nodeList.forEach((node: any) => {
          const id = node["@id"];
          const label = node["@label"] || id;
          const prefix = id.charAt(0) as "A" | "B" | "C";
  
          const { x, color } = columns[prefix];
          const y = columnCounters[prefix]++;
  
          g.addNode(id, {
            label,
            x,
            y: -y, // empilha de cima pra baixo
            size: 10,
            color
          });
        });
  
        edgeList.forEach((edge: any) => {
          g.addEdgeWithKey(
            edge["@id"],
            edge["@source"],
            edge["@target"],
            { label: edge["@label"] || "" }
          );
        });
  
        setGraph(g);
      });
  }, []);

  if (!graph) return <div>Carregando grafo...</div>;

  return (
    <SigmaContainer
      style={style}
      graph={graph}
      settings={{ allowInvalidContainer: true }}
    />
  );
};

export default GraphFromJson;
