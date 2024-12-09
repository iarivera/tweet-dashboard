import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Graph1({ data }) {
    const svgRef = useRef();
    const width = 1000;
    const height = 1000;

    useEffect(() => {
        if (!data) return;

        console.log(data);

        const colorMenu = d3.select('#colorDropdown');

        colorMenu.append("text")
            .style("fill", "black")
            .text("Color By: ");

        colorMenu.append('select')
            .selectAll('option')
            .data(['Sentiment', 'Subjectivity'])
            .join('option')
            .attr('value', d => d)
            .text(d => d); 

            

    }, [data])

    return (
        <div style={{ flex: 1, margin: '5px', padding: '10px' }}>
            <div id="colorDropdown"></div>
            <svg ref={svgRef} width={width} height={height}></svg>
        </div>
  );
}

export default Graph1;
