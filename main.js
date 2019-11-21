//  function getDirection() {
//   direction();
// }
// var directionDigit = getDirection();
// console.log(directionDigit);

d3.json("stopskey.json").then(function(collection) {
  //var direction = document.getElementById("outbound").checked;

  collection.forEach(function(d) {
    d.avMinDelay = +d.avMinDelay;
    console.log(d.avMinDelay)
  });

  
  // General event type for selections, used by d3-dispatch
  // https://github.com/d3/d3-dispatch
  const dispatchString = "selectionUpdated";
  //console.log(collection);
  var geo = map(collection); //.selectionDispatcher(d3.dispatch(dispatchString));
  route1();

});

//trying to make a barchart here
function route1() {
  var margin = { top: 50, right: 50, bottom: 50, left: 50 };

var width = 600 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

//create the svg
var svg = d3
  .select("#route1")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand().range([0, width]);

var y = d3.scaleLinear().range([height, 0]);

d3.csv("stopsdelay.csv").then(function(data) {
  data = data.filter(function(d) {
    return d.route ==1; 
  })
  console.log(data)

  //format the data
  data.forEach(function(d) {
    d.avFreqDelay = +d.avFreqDelay;
  });

  x.domain(
    data.map(function(d) {
      return d.name;
    })
  );
  y.domain([
    0,
    d3.max(data, function(d) {
      return d.avFreqDelay;
    })
  ]);

  svg
    .selectAll(".bar")
    .data([data])
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.name);
    })
    .attr("width", x.bandwidth())
    .attr("y", function(d) {
      return y(d.avFreqDelay);
    })
    .attr("height", function(d) {
      return height - y(d.avFreqDelay);
    })
    .attr("fill", "#cc79a1")
    .attr("stroke", "#8e5470");

  //add X Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");



  //add Y axis
  svg
    .append("g")
    .call(d3.axisLeft(y))
    
});
}
