// Sample data for the bar chart
const data = [
  { country: "USA", value: 300 },
  { country: "China", value: 250 },
  { country: "Japan", value: 180 },
  { country: "Germany", value: 150 },
];

// Define chart dimensions (margins are recommended for labels and axes)
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Select the SVG element
const svg = d3
  .select("#bar-chart")
  .append("g") // Create a group element for positioning
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Define scales for x-axis (categorical) and y-axis (numerical)
const xScale = d3
  .scaleBand()
  .domain(data.map((d) => d.country)) // Get country names for x-axis
  .range([0, width]) // Set range for x-axis positions
  .padding(0.2); // Add some padding between bars

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d.value)]) // Set domain based on data values
  .range([height, 0]); // Invert range for bars to grow upwards

// Create the x-axis
svg
  .append("g")
  .attr("transform", `translate(0, ${height})`) // Position at bottom
  .call(d3.axisBottom(xScale));

// Create the y-axis
svg.append("g").call(d3.axisLeft(yScale));

// Add bars to the chart
svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d) => xScale(d.country)) // Set x position based on country
  .attr("y", (d) => yScale(d.value)) // Set y position based on value
  .attr("width", xScale.bandwidth()) // Set bar width based on scale band
  .attr("height", (d) => height - yScale(d.value)) // Set bar height
  .attr("fill", "steelblue"); // Set bar color

// Add labels for each bar (optional)
svg
  .selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .attr("x", (d) => xScale(d.country) + xScale.bandwidth() / 2) // Center text
  .attr("y", (d) => yScale(d.value) - 5) // Position above bar
  .text((d) => d.value);
