import React from 'react';
import LoadGraphWithProp from './GrapthWrapper2.tsx';
import LoadGraphWithHook from './GrapthWrapper3.tsx';
import {MultiDirectedGraph} from './GrapthWrapper4.tsx'
import {Complete} from './GrapthWrapper5.tsx'
import {Loading} from './GrapthLoad.tsx'
import './app.css';

function App() {
  return (
    <div >
      
      <div className="App">
      <h1>Teste 1</h1>
      </div>
    
      
      <div className='ex'>
        <h2>Exemplo 1</h2>
        <h4>LoadGraphWithProp</h4>

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
      <h4>LoadGraphWithHook</h4>
      <LoadGraphWithHook
        style={{
          width: "600px",
          height: "400px",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          margin: "20px auto",
          padding: "10px",
        }}/>
       </div>

      <div className='ex'>
      <h2>Exemplo 3</h2>
      <h4>MultiDirectedGraph</h4>
      <MultiDirectedGraph
        style={{
          width: "600px",
          height: "400px",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          margin: "20px auto",
          padding: "10px",
        }}/>
       </div>

       
      <div className='ex'>
      <h2>Exemplo 4</h2>
      <h4>Complete</h4>
      <Complete
        style={{
          width: "600px",
          height: "400px",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          margin: "20px auto",
          padding: "10px",
        }}/>
       </div>



      <div className='Dados da Planilha'>
      <h2>Exemplo 4</h2>
      <h4>Complete</h4>
      <Loading
        style={{
          width: "600px",
          height: "400px",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          margin: "20px auto",
          padding: "10px",
        }}/>
       </div>




    </div>



  );
}

export default App;