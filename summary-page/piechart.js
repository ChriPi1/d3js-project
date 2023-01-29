let pieChartData = [
  [0,  20, 30, 50],
  [10,  220, 60, 510],
  [21312, 1239, 1242, 9341]
];

let ma = 10;
let rad = 100;

//maps color to data-values
let sectionColor = d3.scaleOrdinal()
.domain(pieChartData)
.range(["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]);

//append a svg to body and center the coordinate system via translate
let pieChartSVG = d3.select("#selfExamplesChapter").select("#pieChartContainer")
.data(pieChartData)
.enter().append("svg")
.attr("width", (rad + ma) * 2)
.attr("height", (rad + ma) * 2)
.append("g")
.attr("transform", "translate(" + (rad + ma) + "," + (rad + ma) + ")");

//use the d3 pie layout to draw path(s)
pieChartSVG.selectAll("path")
.data(d3.pie())
.enter().append("path")
.attr("d", d3.arc()
.innerRadius(rad * 0.5)
.outerRadius(rad))
.style("fill", (d) => (sectionColor(d.data)))
.style("stroke", "black");