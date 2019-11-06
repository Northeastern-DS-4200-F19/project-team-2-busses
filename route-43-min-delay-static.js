var margin = { top: 80, right: 80, bottom: 80, left: 80 };

var width = 600 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

//create the svg
var svg = d3
  .select("#route-43-delay-vis")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand().range([0, width]);

var y = d3.scaleLinear().range([height, 0]);

d3.csv("data/inbound-static-min-delay/route-43-inbound-delay.csv").then(
  function(data) {
    console.log(data);

    //format the data
    data.forEach(function(d) {
      d.Delay = +d.Delay;
    });

    x.domain(
      data.map(function(d) {
        return d.Stop;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.Delay;
      })
    ]);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return x(d.Stop);
      })
      .attr("width", x.bandwidth())
      .attr("y", function(d) {
        return y(d.Delay);
      })
      .attr("height", function(d) {
        return height - y(d.Delay);
      })
      .attr("fill", "#d55e00")
      .attr("stroke", "#a24700");

    //add X Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // text label for the x axis
    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
      )
      .style("text-anchor", "middle")
      .text("Stop");

    //add Y axis
    svg.append("g").call(d3.axisLeft(y));

    //add Y axis title
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Minute Delay");
  }
);
