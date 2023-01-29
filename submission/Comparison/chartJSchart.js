//using th d3.csv function to load the external csv-source
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
    new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: data.map(function(value,index) { return value[0]; }),
          datasets: [{ 
              data: data.map(function(value,index) { return value[1]; }),
              label: "Winter",
              borderColor: "blue",
              borderDash: [10,5],
              fill: false,
              lineTension: 0
            }, { 
              data: data.map(function(value,index) { return value[2]; }),
              label: "Spring",
              borderColor: "red",
              borderDash: [10,5],
              fill: false,
              lineTension: 0
            }, { 
                data: data.map(function(value,index) { return value[3]; }),
                label: "Summer",
                borderColor: "yellow",
                borderDash: [10,5],
                fill: false,
                lineTension: 0
              },
              { 
                data: data.map(function(value,index) { return value[4]; }),
                label: "Fall",
                borderColor: "green",
                borderDash: [10,5],
                fill: false,
                lineTension: 0
              }
          ]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: { display:false },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time [h]'
                      }
                }],
                yAxes: [{
                    gridLines: { display:false},
                    scaleLabel: {
                        display: true,
                        labelString: 'Active Power [kW]'
                    }   
                }]
            },
            elements: {
                point:{ radius: 0 }
            },
            legend: { position: 'chartArea'}
        }
    });
}
