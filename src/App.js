import React, { useState } from 'react';
import * as d3 from 'd3';
import Graph1 from './Graph1';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const parsedData = d3.csvParse(text);
      setData(parsedData);
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <h1>Upload a JSON File</h1>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'space-between',
        }}>
          <Graph1 data={data}/>
      </div>
    </div>
  );
}

export default App;
