var margin = { top: 80, right: 80, bottom: 80, left: 80 };

var width = 600 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

//create the svg and target the route 1 container
var svg = d3
  .select("#route-1-parallel-vis")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


