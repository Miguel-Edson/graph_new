import React from 'react';
import './app.css';

import LoadGraphWithProp from './GrapthWrapper.tsx';

import GraphFromJson from './Grapth_Listage.tsx'

function App() {
  return (
    <div >
      
      <div className="App">
      <h1>Teste com Json</h1>
      </div>
    
      
      <div className='ex'>
        <h2>Exemplo 1</h2>
        <h4>Arquivo Local</h4>

        <LoadGraphWithProp  style={{
        width: "600px",
        height: "400px",
        backgroundColor: "#483D8B",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        margin: "20px auto",
        padding: "10px",
        }} />
      </div>

      <div className='ex'>
        <h2>Exemplo 2</h2>
        <h4>Usando banco de dados Real</h4>
        <p> Apenas ACC na 1 coluna </p>

        <GraphFromJson  style={{
        width: "600px",
        height: "400px",
        backgroundColor: "#483D8B",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        margin: "20px auto",
        padding: "10px",
        }} />
      </div>

      

    </div>



  );
}

export default App;