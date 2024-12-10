import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function Graph1({ data }) {
    const svgRef = useRef();
    const [selectedOption, setSelectedOption] = useState("Sentiment"); // Track selected dropdown option
    const width = 1000;
    const height = 750;

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };

    useEffect(() => {
        if (!data) return;

        // Dropdown Menu
        const colorMenu = d3.select('#colorDropdown');

        colorMenu.selectAll("*").remove(); // Clear previous dropdown contents
        colorMenu.append("text")
            .style("fill", "black")
            .text("Color By: ");

        const selectMenu = colorMenu.append('select')
            .on("change", handleDropdownChange); // Attach event handler

        selectMenu.selectAll('option')
            .data(['Sentiment', 'Subjectivity'])
            .join('option')
            .attr('value', d => d)
            .text(d => d);

        // Set the dropdown value to match `selectedOption`
        selectMenu.property("value", selectedOption);

        // Scales
        const sentimentColorScale = d3.scaleLinear()
            .domain([-1, 0, 1])
            .range(["red", "#ECECEC", "green"]);

        const subjectivityColorScale = d3.scaleLinear()
            .domain([0, 1])
            .range(["#ECECEC", "#4467C4"]);

        // Select the SVG container
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous content

        // Function to create a vertical legend
        function createLegend(container, x, colorScale, domain, topLabel, bottomLabel) {
            const legendHeight = 150;
            const legendWidth = 20;

            // Create defs and gradient
            const defs = container.append("defs");
            const gradientId = `gradient-${Math.random().toString(36).substring(2)}`;
            const gradient = defs.append("linearGradient")
                .attr("id", gradientId)
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%");

            // Define gradient stops
            domain.forEach((d, i) => {
                gradient.append("stop")
                    .attr("offset", `${(i / (domain.length - 1)) * 100}%`)
                    .attr("stop-color", colorScale(d));
            });

            // Add legend group
            const legendGroup = container.append("g")
                .attr("transform", `translate(${x}, ${height / 2 - legendHeight / 2})`);

            // Add gradient rectangle
            legendGroup.append("rect")
                .attr("width", legendWidth)
                .attr("height", legendHeight)
                .style("fill", `url(#${gradientId})`);

            // Add top label
            legendGroup.append("text")
                .attr("x", legendWidth / 2)
                .attr("y", -10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .text(topLabel);

            // Add bottom label
            legendGroup.append("text")
                .attr("x", legendWidth / 2)
                .attr("y", legendHeight + 20)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .text(bottomLabel);
        }

        // Create a legend container
        const legendContainer = svg.append("g");

        // Render the appropriate legend based on selected option
        if (selectedOption === "Sentiment") {
            createLegend(legendContainer, 50, sentimentColorScale, [-1, 0, 1], "Positive", "Negative");
        } else if (selectedOption === "Subjectivity") {
            createLegend(legendContainer, 50, subjectivityColorScale, [0, 1], "Subjective", "Objective");
        }

    }, [data, selectedOption]); // Re-run effect when `data` or `selectedOption` changes

    return (
        <div style={{ flex: 1, margin: '5px', padding: '10px' }}>
            <div id="colorDropdown"></div>
            <svg ref={svgRef} width={width} height={height}></svg>
        </div>
    );
}

export default Graph1;
