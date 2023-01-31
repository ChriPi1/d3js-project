const w = 750;
const h = 500;
const padding = 50;

// Load SVG from external source
d3.csv('https://raw.githubusercontent.com/MxBurger/Sample-Data/main/SampleData.csv', function (d) {
return [
  +d['Time'],
  +d['Winter'],
  +d['Spring'],
  +d['Summer'],
  +d['Fall']
]
}).then(calculatePlot);

function calculatePlot(data) {

  //axis
  const xMin = 1;
  const xMax = 24;
  const yMin = 5;
  const yMax = 40;

  //set x and y-axis scales
  const xScale = d3.scaleLinear()
    .domain([xMin, xMax])
    .range([padding, w - padding]);
  const yScale = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([h - padding, padding]);

  const svg = d3.select('#lineChartContainer')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

    // draw lines
  svg.append('path')
    .datum(data)
    .attr('stroke', 'blue')
    .attr('stroke-width', 3)
    .attr('stroke-dasharray', "2")
    .attr('fill', 'none')
    .attr('d', d3.line()
    .x((d) => xScale(d[0]))
    .y(yScale(0)))
    .transition()
    .duration(1000)
    .attr('d', d3.line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1])));

  svg.append('path')
    .datum(data)
    .attr('stroke', 'red')
    .attr('stroke-width', 3)
    .attr('stroke-dasharray', "4 2 2")
    .attr('fill', 'none')
    .attr('d', d3.line()
    .x((d) => xScale(d[0]))
    .y(yScale(0)))
    .transition()
    .duration(1000)
    .attr('d', d3.line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[2])));

    svg.append('path')
      .datum(data)
      .attr('stroke', 'yellow')
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', "2 2")
      .attr('fill', 'none')
      .attr('d', d3.line()
      .x((d) => xScale(d[0]))
      .y(yScale(0)))
      .transition()
      .duration(1000)
      .attr('d', d3.line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[3])));

    svg.append('path')
      .datum(data)
      .attr('stroke', 'green')
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', "4")
      .attr('fill', 'none')
      .attr('d', d3.line()
      .x((d) => xScale(d[0]))
      .y(yScale(0)))
      .transition()
      .duration(1000)
      .attr('d', d3.line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[4])));

    //x-axis
    svg.append('g')
      .style('font-size', '12px')
      .attr('transform', 'translate(0,' + (h - padding) + ')')
      .call(d3.axisBottom(xScale));

    //y-axis
    svg.append('g')
      .style('font-size', '12px')
      .attr('transform', 'translate(' + padding + ',0)')
      .call(d3.axisLeft(yScale));

    //x-axis label
    svg.append('text')
      .attr('x', w/2)
      .attr('y', h - 15)
      .attr('text-anchor', 'middle')
      .text('Time [h]');

    //y-axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(15,' + h/2 + ')rotate(-90)')
      .text('Active Power [kW]');

    //legend-lines
    svg.append('path')
      .datum([[2, 38], [3, 38]])
      .attr('stroke', 'blue')
      .attr('stroke-dasharray', "2")
      .attr('stroke-width', 3)
      .attr('d', d3.line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1])));

    svg.append('path')
      .datum([[2, 36], [3, 36]])
      .attr('stroke', 'red')
      .attr('stroke-dasharray', "4 2 2")
      .attr('stroke-width', 3)
      .attr('d', d3.line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1])));

    svg.append('path')
      .datum([[2, 34], [3, 34]])
      .attr('stroke', 'yellow')
      .attr('stroke-dasharray', "2 2")
      .attr('stroke-width', 3)
      .attr('d', d3.line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1])));

    svg.append('path')
      .datum([[2, 32], [3, 32]])
      .attr('stroke', 'green')
      .attr('stroke-dasharray', "4")
      .attr('stroke-width', 3)
      .attr('d', d3.line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1])));

    //legend-text
    svg.append('text')
      .attr('x', xScale(4))
      .attr('y', yScale(38))
      .attr('alignment-baseline', 'central')
      .style('font-size', '16px')
      .text('Winter');

    svg.append('text')
      .attr('x', xScale(4))
      .attr('y', yScale(36))
      .attr('alignment-baseline', 'central')
      .style('font-size', '16px')
      .text('Spring');

    svg.append('text')
      .attr('x', xScale(4))
      .attr('y', yScale(34))
      .attr('alignment-baseline', 'central')
      .style('font-size', '16px')
      .text('Summer');

    svg.append('text')
      .attr('x', xScale(4))
      .attr('y', yScale(32))
      .attr('alignment-baseline', 'central')
      .style('font-size', '16px')
      .text('Fall');

    //hovering circles
    svg.selectAll('circle_winter')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d[0]))
      .attr('cy', (d) => yScale(d[1]))
      .attr('r', 4)
      .attr('fill', 'blue')
      .attr('class', 'points')
      .style('pointer-events', 'all')
      .append('title')
      .text(function (d) {
        return (
          'Time: ' + d[0] + 'h' + '\n' + 'Active Power: ' + d[1] + 'kW'
        );
    });

    svg.selectAll('circle_spring')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d[0]))
      .attr('cy', (d) => yScale(d[2]))
      .attr('r', 4)
      .attr('fill', 'red')
      .attr('class', 'points')
      .style('pointer-events', 'all')
      .append('title')
      .text(function (d) {
        return (
          'Time: ' + d[0] + 'h' + '\n' + 'Active Power: ' + d[2] + 'kW'
        );
    });

    svg.selectAll('circle_summer')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d[0]))
      .attr('cy', (d) => yScale(d[3]))
      .attr('r', 4)
      .attr('fill', 'yellow')
      .attr('class', 'points')
      .style('pointer-events', 'all')
      .append('title')
      .text(function (d) {
        return (
          'Time: ' + d[0] + 'h' + '\n' + 'Active Power: ' + d[3] + 'kW'
        );
    });

    svg.selectAll('circle_fall')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d[0]))
      .attr('cy', (d) => yScale(d[4]))
      .attr('r', 4)
      .attr('fill', 'green')
      .attr('class', 'points')
      .style('pointer-events', 'all')
      .append('title')
      .text(function (d) {
        return (
          'Time: ' + d[0] + 'h' + '\n' + 'Active Power: ' + d[4] + 'kW'
        );
    });
}