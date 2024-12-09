import React, { useState } from 'react';
import * as d3 from 'd3';

function Graph1({ data }) {
  return (
    <div style={{ flex: 1, border: '1px solid black', margin: '5px', padding: '10px' }}>
      <h3>Visualization</h3>
      {data ? (
        <svg width="100%" height="100%">
          {/* Render specific graph using D3 here */}
        </svg>
      ) : (
        <p>Upload a JSON file to display the graph</p>
      )}
    </div>
  );
}

export default Graph1;
