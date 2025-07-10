// import { FC, CSSProperties, useEffect, useState } from "react";
// import { MultiDirectedGraph } from "graphology";
// import React from "react";
// import { SigmaContainer, useLoadGraph, useSigma } from "@react-sigma/core"; // Importe useLoadGraph e useSigma
// import "@react-sigma/core/lib/react-sigma.min.css";
// import { ControlsContainer, ZoomControl, SearchControl, FullScreenControl } from "@react-sigma/core";

// const HighlightNodes: FC = () => {
//   const sigma = useSigma();
//   const [hoveredNode, setHoveredNode] = useState<string | null>(null);

//   useEffect(() => {
//     // Definir as funções listener. O TypeScript vai inferir o tipo de "payload" corretamente.
//     // O payload para 'enterNode' e 'leaveNode' contém uma propriedade 'node'.
//     const handleEnterNode = (payload: { node: string }) => {
//       setHoveredNode(payload.node);
//     };

//     const handleLeaveNode = () => {
//       setHoveredNode(null);
//     };

//     // Configura os eventos de mouse
//     sigma.on("enterNode", handleEnterNode);
//     sigma.on("leaveNode", handleLeaveNode);

//     // Limpa os event listeners quando o componente é desmontado
//     return () => {
//       sigma.off("enterNode", handleEnterNode); // Passa a referência da função
//       sigma.off("leaveNode", handleLeaveNode); // Passa a referência da função
//     };
//   }, [sigma]);

//   useEffect(() => {
//     const graph = sigma.getGraph();

//     // Resetar o estado de highlight de todos os nós
//     graph.forEachNode((node) => {
//       graph.setNodeAttribute(node, "highlighted", false);
//       graph.setNodeAttribute(node, "hidden", false);
//     });
//     graph.forEachEdge((edge) => {
//       graph.setEdgeAttribute(edge, "hidden", false);
//     });

//     if (hoveredNode) {
//       // Highlight do nó hovered
//       graph.setNodeAttribute(hoveredNode, "highlighted", true);

//       // Marca nós conectados e esconde os não conectados
//       graph.forEachNode((node) => {
//         if (node === hoveredNode || graph.hasEdge(hoveredNode, node) || graph.hasEdge(node, hoveredNode)) {
//           graph.setNodeAttribute(node, "hidden", false);
//         } else {
//           graph.setNodeAttribute(node, "hidden", true);
//         }
//       });

//       // Esconde arestas que não estão conectadas ao nó hovered
//       graph.forEachEdge((edge) => {
//         const source = graph.source(edge);
//         const target = graph.target(edge);
//         if (source === hoveredNode || target === hoveredNode) {
//           graph.setEdgeAttribute(edge, "hidden", false);
//         } else {
//           graph.setEdgeAttribute(edge, "hidden", true);
//         }
//       });
//     }

//     sigma.refresh(); // Atualiza o grafo para aplicar as mudanças
//   }, [hoveredNode, sigma]);

//   return null;
// };
// export const LoadGraphWithProp: FC<{ style: CSSProperties }> = ({ style }) => {
//   const [graph, setGraph] = useState<MultiDirectedGraph | null>(null);

//   useEffect(() => {
//     fetch("/KnowledgeBaseOptimized.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const g = new MultiDirectedGraph();
//         const nodeSet = new Set<string>();

//         const nodePositions: Record<string, { x: number; y: number }> = {};
//         const columnX = [0, 10, 20, 30];
//         const columnYCounter = [0, 0, 0, 0];

//         const addNode = (id: string, column: number, color: string) => {
//           if (!nodeSet.has(id)) {
//             const y = -columnYCounter[column]++;
//             g.addNode(id, {
//               label: id,
//               x: columnX[column],
//               y,
//               size: 10,
//               color,
//               originalColor: color, // Armazena a cor original
//               highlighted: false, // Adiciona a propriedade highlighted
//               hidden: false, // Adiciona a propriedade hidden
//             });
//             nodeSet.add(id);
//           }
//         };

//         // 1. vSensor → vFeature
//         const sensorFeatures = data.KnowledgeRepresentation.edgeSensorFeature.EdgeSensorFeature;
//         for (const item of sensorFeatures) {
//           const sensorId = item.vSensor.typeSensor;
//           const featureName = item.vFeature.featureName.name;
//           const featureId = `${featureName}_${sensorId}`;

//           addNode(sensorId, 0, "#1f77b4"); // Azul
//           addNode(featureId, 1, "#ff7f0e"); // Laranja

//           g.addEdge(sensorId, featureId, {
//             label: `${sensorId} → ${featureId}`,
//             size: 2,
//           });
//         }

//         // 2. vFeature → vModel
//         const featureModels = data.KnowledgeRepresentation.edgeFeaturesModel.EdgeFeatureModel;
//         for (const item of featureModels) {
//           const featureName = item.vFeature.featureName.name;
//           const sensorId = item.vFeature.featureName.idSensor;
//           const featureId = `${featureName}_${sensorId}`;
//           const modelId = item.vModel.modelName;

//           addNode(featureId, 1, "#ff7f0e"); // Laranja
//           addNode(modelId, 2, "#2ca02c"); // Verde

//           g.addEdge(featureId, modelId, {
//             label: `${featureId} → ${modelId}`,
//             size: 2
//           });
//         }

//         // 3. vModel → vFinalStatus
//         const modelStatuses = data.KnowledgeRepresentation.edgeModelsFinalStatus.EdgeModelsFinalStatus;
//         for (const item of modelStatuses) {
//           const modelId = item.vModel.modelName;
//           const finalStatusId = item.vFinalStatus.finalStatus;

//           addNode(modelId, 2, "#2ca02c"); // Verde
//           addNode(finalStatusId, 3, "#d62728"); // Vermelho

//           g.addEdge(modelId, finalStatusId, {
//             label: `${modelId} → ${finalStatusId}`,
//             size: 2
//           });
//         }

//         setGraph(g);
//       });
//   }, []);

//   if (!graph) return <div>Carregando grafo...</div>;

//   return (
//     <SigmaContainer
//   style={style}
//   graph={graph}
//   settings={{
//     allowInvalidContainer: true,
//     defaultEdgeColor: "#888",
//     edgeLabelSize: 10,
//     renderEdgeLabels: true,
//     edgeLabelColor: { color: "#000" },
//     defaultEdgeType: "arrow",
//     labelRenderedSizeThreshold: 0,
//     edgeLabelFont: "Arial, sans-serif",
//     edgeLabelWeight: "bold",
//     // Customização de renderização para nós
//     nodeReducer: (node, data) => {
//       const newData = { ...data };
//       if (newData.hidden) {
//         newData.color = "#ccc"; // Cinza para nós escondidos
//         newData.label = ""; // Esconde o label
//       } else if (newData.highlighted) {
//         newData.color = "#FF0000"; // Exemplo: Vermelho para o nó destacado
//         newData.label = data.label; // Mantém o label
//       } else {
//         newData.color = newData.originalColor; // Volta para a cor original
//         newData.label = data.label; // Mantém o label
//       }
//       return newData;
//     },
//     // Customização de renderização para arestas
//     edgeReducer: (edge, data) => {
//       const newData = { ...data };
//       if (newData.hidden) {
//         newData.color = "#eee"; // Cinza claro para arestas escondidas
//       } else {
//         newData.color = "#888"; // Cor original
//       }
//       return newData;
//     },
//   }}
// >
//       <HighlightNodes />
//       <ControlsContainer position={"bottom-right"}>
//         <ZoomControl />
//         <FullScreenControl />
//       </ControlsContainer>
      
//       <ControlsContainer position={"top-right"}>
//         <SearchControl style={{ width: "200px" }} />
//       </ControlsContainer>

//     </SigmaContainer>
//   );
// };

// export default LoadGraphWithProp;
