var margin = {top: 50, right: 50, bottom: 50, left: 50};

var width = 600 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

//create the svg
var svg = d3.select('#delay-vis').append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

d3.csv("data/route-43-inbound-delay.csv")
    .then(function(data){
        //console.log(data)

        //format the data 
        data.forEach(function(d){
            d.Delay = +d.Delay;
        });

        x.domain(data.map(function(d) {return d.Stop; }));
        y.domain([0, d3.max(data, function(d) {return d.Delay; })]);

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {return x(d.Stop); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) {return y(d.Delay); })
            .attr("height", function(d) {return height - y(d.Delay); });
    });

                
