let dataset = [ 50, 100, 120, 170, 201];
let barChartHeight = 200;
let barChartWidth = 300;

let barChartSVG = d3.select("body").select("#barChartContainer")
   .append("svg")
   .attr("width", barChartWidth)
   .attr("height", barChartHeight)
   .attr("viewbox", "0 0 200 200");

barChartSVG.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i){ return i*60 })
   .attr("y", function(d){ return barChartHeight - d })
   .attr("width", 50)
   .attr("height", function(d) { return d })
   .attr("fill", "#0082b4")
   .attr("opacity", 0.5);
