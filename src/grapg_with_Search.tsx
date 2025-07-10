// LoadGraphWithProp.tsx
import { FC, CSSProperties, useEffect, useState } from "react";
import { MultiDirectedGraph } from "graphology";
import React from "react";
import { SigmaContainer } from "@react-sigma/core"; // Remova useLoadGraph se não estiver usando
import "@react-sigma/core/lib/react-sigma.min.css";
import { ControlsContainer, ZoomControl, SearchControl, FullScreenControl } from "@react-sigma/core";
import HighlightNodes from "./HighlightNodes.tsx"; // Importe o componente HighlightNodes

export const LoadGraphWithProp: FC<{ style: CSSProperties }> = ({ style }) => {
  const [graphData, setGraphData] = useState<MultiDirectedGraph | null>(null);

  useEffect(() => {
    fetch("/KnowledgeBaseOptimized.json")
      .then((res) => res.json())
      .then((data) => {
        const g = new MultiDirectedGraph();
        const nodeSet = new Set<string>();

        const columnX = [0, 10, 20, 30];
        const columnYCounter = [0, 0, 0, 0];

        const addNode = (id: string, column: number, color: string) => {
          if (!nodeSet.has(id)) {
            const y = -columnYCounter[column]++;
            g.addNode(id, {
              label: id,
              x: columnX[column],
              y,
              size: 10,
              color,
              originalColor: color, // Armazena a cor original
              highlighted: false, // Adiciona a propriedade highlighted
              dimmed: false,      // Adiciona a NOVA propriedade dimmed
            });
            nodeSet.add(id);
          }
        };

        // 1. vSensor → vFeature
        const sensorFeatures = data.KnowledgeRepresentation.edgeSensorFeature.EdgeSensorFeature;
        for (const item of sensorFeatures) {
          const sensorId = item.vSensor.typeSensor;
          const featureName = item.vFeature.featureName.name;
          const featureId = `${featureName}_${sensorId}`;

          addNode(sensorId, 0, "#1f77b4"); // Azul
          addNode(featureId, 1, "#ff7f0e"); // Laranja

          g.addEdge(sensorId, featureId, {
            label: `${sensorId} → ${featureId}`,
            size: 2,
            dimmed: false, // Adiciona a propriedade dimmed para as arestas
          });
        }

        // 2. vFeature → vModel
        const featureModels = data.KnowledgeRepresentation.edgeFeaturesModel.EdgeFeatureModel;
        for (const item of featureModels) {
          const featureName = item.vFeature.featureName.name;
          const sensorId = item.vFeature.featureName.idSensor;
          const featureId = `${featureName}_${sensorId}`;
          const modelId = item.vModel.modelName;

          addNode(featureId, 1, "#ff7f0e"); // Laranja
          addNode(modelId, 2, "#2ca02c"); // Verde

          g.addEdge(featureId, modelId, {
            label: `${featureId} → ${modelId}`,
            size: 2,
            dimmed: false,
          });
        }

        // 3. vModel → vFinalStatus
        const modelStatuses = data.KnowledgeRepresentation.edgeModelsFinalStatus.EdgeModelsFinalStatus;
        for (const item of modelStatuses) {
          const modelId = item.vModel.modelName;
          const finalStatusId = item.vFinalStatus.finalStatus;

          addNode(modelId, 2, "#2ca02c"); // Verde
          addNode(finalStatusId, 3, "#d62728"); // Vermelho

          g.addEdge(modelId, finalStatusId, {
            label: `${modelId} → ${finalStatusId}`,
            size: 2,
            dimmed: false,
          });
        }

        setGraphData(g);
      });
  }, []);

  if (!graphData) return <div>Carregando grafo...</div>;

  return (
    <SigmaContainer
      style={style}
      graph={graphData}
      settings={{
        allowInvalidContainer: true,
        defaultEdgeColor: "#888",
        edgeLabelSize: 10,
        renderEdgeLabels: true,
        edgeLabelColor: { color: "#000" },
        defaultEdgeType: "arrow",
        labelRenderedSizeThreshold: 0,
        edgeLabelFont: "Arial, sans-serif",
        edgeLabelWeight: "bold",
        // Customização de renderização para nós
        nodeReducer: (node, data) => {
          const newData = { ...data };
          if (newData.highlighted) {
            // Cor de destaque para o nó principal (vermelho)
            newData.color = "#FF0000"; 
          } else if (newData.dimmed) {
            // Cor cinza esmaecida para nós não conectados
            newData.color = "#D3D3D3"; // LightGray (ou um cinza de sua preferência)
            // Opcional: reduzir o tamanho ou a opacidade para deixá-los mais apagados
            // newData.size = data.size * 0.7; 
          } else {
            // Volta para a cor original para nós conectados (mas não o principal)
            newData.color = newData.originalColor;
          }
          return newData;
        },
        // Customização de renderização para arestas
        edgeReducer: (edge, data) => {
          const newData = { ...data };
          if (newData.dimmed) {
            newData.color = "#E0E0E0"; // Um cinza bem claro para arestas esmaecidas
          } else {
            newData.color = "#888"; // Cor original das arestas conectadas
          }
          return newData;
        },
      }}
    >
      <HighlightNodes /> {/* Adicione o componente HighlightNodes aqui */}

      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
        <FullScreenControl />
      </ControlsContainer>

      <ControlsContainer position={"top-right"}>
        <SearchControl style={{ width: "200px" }} />
      </ControlsContainer>
    </SigmaContainer>
  );
};

export default LoadGraphWithProp;