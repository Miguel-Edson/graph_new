// HighlightNodes.tsx
import { FC, useEffect, useState } from "react";
import { useSigma } from "@react-sigma/core";

const HighlightNodes: FC = () => {
  const sigma = useSigma();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    // Definir as funções listener.
    const handleEnterNode = (payload: { node: string }) => {
      setHoveredNode(payload.node);
    };

    const handleLeaveNode = () => {
      setHoveredNode(null);
    };

    // Configura os eventos de mouse
    sigma.on("enterNode", handleEnterNode);
    sigma.on("leaveNode", handleLeaveNode);

    // Limpa os event listeners quando o componente é desmontado
    return () => {
      sigma.off("enterNode", handleEnterNode);
      sigma.off("leaveNode", handleLeaveNode);
    };
  }, [sigma]);

  useEffect(() => {
    // Este useEffect precisa rodar APENAS quando o grafo já foi carregado
    // e a instância do sigma está pronta.
    // Usamos um truque aqui: verificamos se o grafo tem pelo menos um nó
    // para garantir que ele foi populado.
    const graph = sigma.getGraph();
    if (graph.order === 0) return; // Grafo vazio, espere carregar

    // Primeiro, resetamos o estado de 'highlighted' e 'dimmed' de todos os nós e arestas
    graph.forEachNode((node) => {
      graph.setNodeAttribute(node, "highlighted", false);
      graph.setNodeAttribute(node, "dimmed", false); // Usamos dimmed, não hidden
    });
    graph.forEachEdge((edge) => {
      graph.setEdgeAttribute(edge, "dimmed", false); // Usamos dimmed, não hidden
    });

    if (hoveredNode) {
      // 1. Marca o nó "hovered" como destacado
      graph.setNodeAttribute(hoveredNode, "highlighted", true);

      // 2. Itera sobre todos os nós para definir se devem ser "dimmed" ou não
      graph.forEachNode((node) => {
        // Se o nó é o nó "hovered" OU tem uma aresta com ele, NÃO é dimmed
        if (node === hoveredNode || graph.hasEdge(hoveredNode, node) || graph.hasEdge(node, hoveredNode)) {
          graph.setNodeAttribute(node, "dimmed", false);
        } else {
          // Caso contrário, é dimmed
          graph.setNodeAttribute(node, "dimmed", true);
        }
      });

      // 3. Itera sobre todas as arestas para definir se devem ser "dimmed" ou não
      graph.forEachEdge((edge) => {
        const source = graph.source(edge);
        const target = graph.target(edge);
        // Se a aresta está conectada ao nó "hovered", NÃO é dimmed
        if (source === hoveredNode || target === hoveredNode) {
          graph.setEdgeAttribute(edge, "dimmed", false);
        } else {
          // Caso contrário, é dimmed
          graph.setEdgeAttribute(edge, "dimmed", true);
        }
      });
    }

    // Finalmente, forçamos o Sigma a redesenhar o grafo
    sigma.refresh();
  }, [hoveredNode, sigma]); // Dependência do sigma é importante aqui

  return null;
};

export default HighlightNodes;