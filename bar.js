/* global d3 */

function barChart() {
  var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 400,
    height = 400,
    innerWidth = width - margin.left - margin.right,
    innerHeight = height - margin.top - margin.bottom,
    xValue = function(d) {
      return d[0];
    },
    yValue = function(d) {
      return d[1];
    },
    xScale = d3.scaleBand().padding(0.1),
    yScale = d3.scaleLinear(),
    xLabelText = "",
    yLabelText = "",
    title = "",
    ourBrush = null,
    selectableElements = d3.select(null),
    dispatcher;

  function chart(selection) {
    selection.each(function(data) {
      // Select the svg element, if it exists.
      var svg = d3
        .select(this)
        .selectAll("svg")
        .data([data]);

      // Otherwise, create the skeletal chart.
      var svgEnter = svg.enter().append("svg");
      var gEnter = svgEnter.append("g");
      gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "y axis");

      // Update the outer dimensions.
      svg
        .merge(svgEnter)
        .attr("width", width)
        .attr("height", height);

      // Update the inner dimensions.
      var g = svg
        .merge(svgEnter)
        .select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      xScale.rangeRound([0, innerWidth]).domain(data.map(xValue));
      yScale.rangeRound([innerHeight, 0]).domain([0, d3.max(data, yValue)]);

      g.select(".x.axis")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

        //add y axis 
      g.select(".y.axis")
      .call(d3.axisLeft(yScale))
        // .call(d3.axisLeft(yScale).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

      var bars = g.selectAll(".bar").data(function(d) {
        return d;
      });

      bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .merge(bars)
        .attr("x", X)
        .attr("y", Y)
        .attr("id", function(d){
            return d.properties.id; //<-- Sets the ID of the point to the stops name
          })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
          return innerHeight - Y(d);
        })
        .attr("fill", function(features) {
          return features.properties.color;
        })
        .attr("stroke", "#000000")
        // .on("mouseover", function(features) {
        //     d3.select(this).style("fill", "#ffff00");
        //     console.log(features);
        //     //highlight(features);
        //   })
    
        //   .on("mouseout", function(d) {
        //     d3.select(this).style("fill",  function(features) {
        //         return features.properties.color;
        //       })
        //   });
        .on("mouseover", function(features) {
            return barMouseOver(features);
        })
        .on("mouseout", function(features) {
            return barMouseOverEnd(features);
        });

      bars.exit().remove();
    });


    function barMouseOver(d) {

        d3.selectAll(("#" + d.properties.id))
          .style("fill", "#ffff00")
          .style("stroke", "#000000");
      
      };
    
    
      function barMouseOverEnd(d) {
        d3.selectAll(("#" + d.properties.id))
        .style("fill", d.properties.color)
        .style("stroke", "#000000");
      }
  }

  // The x-accessor for the path generator; xScale ∘ xValue.
  function X(d) {
    return xScale(xValue(d));
  }

  // The y-accessor for the path generator; yScale ∘ yValue.
  function Y(d) {
    return yScale(yValue(d));
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  return chart;


  
}
