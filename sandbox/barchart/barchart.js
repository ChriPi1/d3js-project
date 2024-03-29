let dataset = [ 50, 100, 200, 170, 201];
let height = 400;
let width = 400;

let svg = d3.select("body").select("#barChartContainer")
   .append("svg")
   .attr("width", width)
   .attr("height", height)
   .attr("viewbox", "0 0 30 30");

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", (d, i) => i*60 )
   .attr("y", (d) => height - d )
   .attr("width", 50)
   .attr("height", (d) => d)
   .attr("fill", "#0082b4");
