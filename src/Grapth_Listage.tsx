import { FC, CSSProperties, useEffect, useState } from "react";
import { MultiDirectedGraph } from "graphology";
import React from "react";
import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

export const LoadGraphWithProp: FC<{ style: CSSProperties }> = ({ style }) => {
  const [graph, setGraph] = useState<MultiDirectedGraph | null>(null);

  useEffect(() => {
    fetch("/KnowledgeBaseOptimized.json")
      .then((res) => res.json())
      .then((data) => {
        const g = new MultiDirectedGraph();
        const nodeSet = new Set<string>();

        const nodePositions: Record<string, { x: number; y: number }> = {};
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
              color
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
            size: 2
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
            size: 2
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
            size: 2
          });
        }

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

export default LoadGraphWithProp;
