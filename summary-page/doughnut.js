const width = 620,
height = 300,
margin = 10;

const radius = 150
const svg = d3.select("#doughnut")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width/2},${height/2})`);

const demoData = {d3JS: 26, Highcharts: 21, ChartJS:18, EasyPieChart: 5, amCharts: 5, ChartistJS: 4, Other:21}

var color = d3.scaleOrdinal()
            .domain(["d3JS", "Highcharts", "ChartJS", "EasyPiechart", "amCharts", "ChartistJS", "Other"])
            .range(d3.schemeSpectral[10]);

const pie = d3.pie()
            .sort(null) 
            .value(d => d[1])
const data_ready = pie(Object.entries(demoData))

const arc = d3.arc()
            .innerRadius(radius * 0.5)        
            .outerRadius(radius * 0.8)

const outerArc = d3.arc()
                .innerRadius(radius * 0.9)
                .outerRadius(radius * 0.9)

//Basic doughnut chart
svg.selectAll('allSlices')
  .data(data_ready)
  .join('path')
  .attr('d', arc)
  .attr('fill', d => color(d.data[1]))
  .attr("stroke", "white")
  .style("stroke-width", "4px")
  .style("opacity", 0.5)

//polylines
svg.selectAll('allPolylines')
    .data(data_ready)
    .join('polyline')
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1.5)
    .attr('points', function(d) {
        const posA = arc.centroid(d)
        const posB = outerArc.centroid(d) 
        const posC = outerArc.centroid(d); 
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); 
        return [posA, posB, posC]
    })

//labels
svg.selectAll('allLabels')
    .data(data_ready)
    .join('text')
    .text(d => d.data[0] + " " + d.data[1] + "%")
    .attr('transform', function(d) {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
    })
    .style('text-anchor', function(d) {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
    })
