import React, { useEffect, FC, CSSProperties } from "react";
import { SigmaContainer, ControlsContainer, ZoomControl, SearchControl, FullScreenControl } from "@react-sigma/core";
import { useLoadGraph } from "@react-sigma/core";
import { MultiDirectedGraph } from "graphology";
import Papa from "papaparse";

import "@react-sigma/core/lib/react-sigma.min.css";

const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvggiYGn68_awUbWuyg-Qoz2NdbqAIqe_KOr3_VbaiOu7oN_6JYsj2Tutli1ilFa0_OI4PlST8N0ln/pub?gid=0&single=true&output=csv";

interface Data {
  name: string;
  category?: string;
  column: number;
}

const MyGraph: FC = () => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new MultiDirectedGraph();
    const columnYPositions: Record<number, number> = {}; // Controla a posição vertical de cada coluna

    Papa.parse<Data>(url, {
      download: true,
      header: true,
      complete: (results) => {
        const data = results.data as Data[];
        data.forEach((node) => {
          const { name, category, column } = node;

          // Inicializa a posição da coluna, se necessário
          if (columnYPositions[column] === undefined) {
            columnYPositions[column] = 0;
          }

          if (!graph.hasNode(name)) {
            graph.addNode(name, {
              x: column * 100, // Espaça as colunas horizontalmente
              y: columnYPositions[column] * 50, // Espaça os nós verticalmente dentro da coluna
              label: name,
              size: 10,
              color: category === "A" ? "red" : category === "B" ? "blue" : "green",
              borderStyle: category === "A" ? "solid" : "dotted", // Defina o estilo aqui

            });

            // Incrementa a posição vertical da coluna
            columnYPositions[column] -= 1;
          }
        });

        // Adicionar algumas conexões (opcional)
        graph.addEdgeWithKey("rel1", "Node1", "Node2", { label: "Edge 1" });
        graph.addEdgeWithKey("rel2", "Node3", "Node4", { label: "Edge 2" });

        loadGraph(graph);
      },
    });
  }, [loadGraph]);

  return null;
};

export const Loading: FC<{ style?: CSSProperties }> = ({ style }) => (
  <SigmaContainer settings={{ allowInvalidContainer: true }} style={style}>
    <MyGraph />
    <ControlsContainer position={"bottom-right"}>
      <ZoomControl />
      <FullScreenControl />
    </ControlsContainer>
    <ControlsContainer position={"top-right"}>
      <SearchControl style={{ width: "200px" }} />
    </ControlsContainer>
  </SigmaContainer>
);
