import React, {useEffect, FC, CSSProperties } from "react";

import { SigmaContainer, ControlsContainer, ZoomControl, SearchControl, FullScreenControl } from "@react-sigma/core";
import {  useLoadGraph } from "@react-sigma/core";

import { MultiDirectedGraph } from "graphology";


import "@react-sigma/core/lib/react-sigma.min.css";

const MyGraph: FC = () => {
    const loadGraph = useLoadGraph();
  
    useEffect(() => {
      // Create the graph
      const graph = new MultiDirectedGraph();
      graph.addNode("A", { x: 0, y: 0, label: "Node A", size: 10 });
      graph.addNode("B", { x: 1, y: 1, label: "Node B", size: 10 });
      graph.addEdgeWithKey("rel1", "A", "B", { label: "REL_1" });
      loadGraph(graph);
    }, [loadGraph]);
  
    return null;
  };
export const Complete: FC<{ style?: CSSProperties }> = ({ style }) => {
  
  return (
    <SigmaContainer settings={{ allowInvalidContainer: true }} style={style}>
        <MyGraph />
        <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
        <FullScreenControl />
        {/* <LayoutsControl /> */}
      </ControlsContainer>
      <ControlsContainer position={"top-right"}>
        <SearchControl style={{ width: "200px" }} />
      </ControlsContainer>
    </SigmaContainer>
  );
};