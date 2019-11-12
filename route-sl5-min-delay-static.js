var margin = { top: 54, right: 60, bottom: 107, left: 88 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear().range([0, width]);

var y = d3.scale.ordinal().rangeRoundBands([0, height]);

var xAxis = d3.svg
  .axis()
  .scale(x)
  .orient("bottom")
  .ticks(10);

var yAxis = d3.svg
  .axis()
  .scale(y)
  .orient("left");

var svg = d3
  .select("#route-sl5-delay-vis")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg
  .append("text")
  .attr("x", 0)
  .attr("y", -35)
  .attr("dy", "0.71em")
  .attr("fill", "#000")
  .text("Route SL5 Delay")
  .style("font", "23px avenir")
  .style("fill", "#000000");

svg
  .append("text")
  .attr("x", -69)
  .attr("y", -8)
  .attr("dy", "0.71em")
  .attr("fill", "#000")
  .text("Stop")
  .style("font", "12px avenir")
  .style("fill", "#000000")
  .style("font-weight", "bold");







d3.csv("data/inbound-static-min-delay/route-sl5-inbound-delay.csv", function(error, data) {
  data.forEach(
    function(d) {
      d.Delay = +d.Delay;
      return d;
    },
    function(error, data) {
      if (error) throw error;
    }
  );

  

  x.domain([0, 10]);
  y.domain(
    data.map(function(d) {
      return d.Stop;
    })
  );

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text");

  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");
  //       .text("Value ($)");

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .style("fill", "steelblue")
    .attr("y", function(d) {
      return y(d.Stop);
    })
    .attr("width", function(d) {
      return x(d.Delay);
    })
    .attr("height", 13);

  svg
    .append("text")
    .attr("x", 350)
    .attr("y", 370)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .text("Delays Between Stops")
    .style("font", "12px avenir")
    .style("fill", "#000000")
    .style("font-weight", "bold");
});
