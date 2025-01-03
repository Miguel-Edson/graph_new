import React, { useEffect, useRef } from 'react';
import { SigmaContainer, useSigma } from '@react-sigma/core';
import Graph from 'graphology';
import circularLayout from 'graphology-layout/circular';

const GraphComponent = () => {
    const sigma = useSigma();
    const containerRef = useRef(null);

    useEffect(() => {
        const graph = new Graph();
        // Add nodes
        graph.addNode('n1', { label: 'Ella Fitzgerald: 1917', size: 25, color: 'red' });
        graph.addNode('n2', { label: 'Frank Sinatra: 1915', size: 25, color: 'red' });
        graph.addNode('n3', { label: 'Billie Holiday: 1915', size: 25, color: 'red' });
        graph.addNode('n4', { label: 'Louis Armstrong:1901 ', size: 25, color: 'yellow' });
        graph.addNode('n5', { label: 'Nina Simone : 1933', size: 25, color: 'orange' });
        graph.addNode('n6', { label: 'Nat King Cole : 1919', size: 25, color: 'red' });
        graph.addNode('n7', { label: 'Gregory Porter : 1971', size: 25, color: 'teal' });
        graph.addNode('n8', { label: 'Sarah Vaughan : 1924', size: 25, color: 'orange' });
        graph.addNode('n9', { label: ' Michael Bublé : 1975', size: 25, color: 'teal' });

        // Add edges - GROUPED / LINKED DECADES
        graph.addEdge('n1', 'n2');
        graph.addEdge('n1', 'n3');
        graph.addEdge('n1', 'n6');

        graph.addEdge('n2', 'n1');

        graph.addEdge('n3', 'n1');
        graph.addEdge('n5', 'n8');
        
        graph.addEdge('n7', 'n9');

    // Apply a circular layout
    circularLayout.assign(graph);
    if (sigma) {
        sigma.setGraph(graph);
        sigma.refresh();
      }
    }, [sigma]);
  
    return <div ref={containerRef}  />;
  };

  const GraphWrapper = () => (
    <SigmaContainer>
      <GraphComponent />
    </SigmaContainer>
  );
  
  export default GraphWrapper;