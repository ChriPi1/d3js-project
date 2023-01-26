document.onload = OnInputAreaChanged();

function OnInputAreaChanged() {
    try{
    let actualSeatRows = JSON.parse(document.getElementById("inputArea").value);
    ComputeCinemaSeats(actualSeatRows);
    }
    catch {
    console.error("text input was not valid");
    }  
}

//does the cinema-view calculation
function ComputeCinemaSeats(seatRows) {
    //clear the old cinema setup
    d3.select("#cinemaHallContainer").selectAll("svg").remove();

    //calculate the new one
    const width = 1800, height = 600;

    //add parent svg
    let svg = d3.select("#cinemaHallContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //add child svg for each row
    let seats = svg.selectAll(".seatRow")
        .data(seatRows)
        .join('svg')
        .attr("y", function(d, i){ return i*150 });

    //add child svg for each seat
    let seat = seats.selectAll("svg")
        .data(d => d)           
        .join("svg")
        .attr("class", function(d, i) {
            if(d) {
                return "cinema-seat-occupied"
            }
            else {
                return "cinema-seat-free"
            }
        })
        .attr("x", function(d, i){ return i*150 })
        .attr("viewBox", "-1 -1 1800 600");

    //add child elements to each seat-svg (in this example inline, could be a loaded ressource)
    seat.append("rect")
        .attr("x", 20)
        .attr("y", 0)
        .attr("width", 100)
        .attr("height", 100)
        .attr("rx", 15)
        .attr("ry", 15);
    seat.append("rect")
        .attr("x", 20)
        .attr("y", 100)
        .attr("width", 100)
        .attr("height", 20)
        .attr("rx", 3)
        .attr("ry", 3);
    seat.append("rect")
        .attr("x", 0)
        .attr("y", 10)
        .attr("width", 20)
        .attr("height", 90)
        .attr("rx", 3)
        .attr("ry", 3);
    seat.append("rect")
        .attr("x", 120)
        .attr("y", 10)
        .attr("width", 20)
        .attr("height", 90)
        .attr("rx", 3)
        .attr("ry", 3);
    seat.append("rect")
        .attr("x", 35)
        .attr("y", 110)
        .attr("width", 70)
        .attr("height", 20)
        .attr("rx", 3)
        .attr("ry", 3);
    seat.append("ellipse")
        .attr("cx", 10)
        .attr("cy", 25)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", "#647687")
        .attr("stroke", "#314354")
    seat.append("path")
        .attr("d", "M 130 100 L 130 120 Q 130 130 120 130 L 80 130 Q 70 130 60 130 L 20 130 Q 10 130 10 120 L 10 100")
        .attr("fill", "none")
        .attr("stroke-width", 10)
        .attr("stroke-miterlimit", 10)
        .attr("stroke", "#314354");
}