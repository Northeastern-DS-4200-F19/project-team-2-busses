//Route 1 Avergae Minute Delay barchart
function route1freq() {
  var margin = { top: 50, right: 230, bottom: 30, left: 240 },
    width = 800 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  //create the svg
  var svg = d3
    .select("#route1freq")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear().range([0, width]);

  // set the ranges
  var y = d3
    .scaleBand()
    .range([height, 0])
    .padding(0.1);

  d3.json("data/stopskey.json").then(function(data) {
    //filter the data for the respective route
    data = data.filter(function(d) {
      return d.route == 1;
    });

    //check box event for switching the direction
    d3.select("#direction").on("change.route1Freq", update1freq);
    update1freq();
    function update1freq() {
      dat = data;

      if (d3.select("#direction").property("checked")) {
        dat = dat.filter(function(d) {
          return d.outbound === 1;
        });
      } else {
        dat = dat.filter(function(d) {
          return d.outbound == 0;
        });
      }

      //resets the bars and axes
      svg.selectAll(".bar").remove();
      svg.selectAll(".axis").remove();

      //format the data
      dat.forEach(function(d) {
        d.avFreqDelay = +d.avFreqDelay;
      });

      // Create Tooltips
      var tip = d3
        .tip()
        .attr("class", "d3-tip")
        .direction("e")
        .offset([0, 5])
        .html(function(d) {
          var content =
            "<span style='margin-left: 2.5px;'><b>" +
            d.name +
            "</b></span><br>";
          content +=
            `
                   <table style="margin-top: 2.5px;">
                           <tr><td>Route: </td><td style="text-align: right">` +
            d.route +
            `</td></tr>
                           <tr><td>Average Minute Delay: </td><td style="text-align: right">` +
            d.avMinDelay +
            `</td></tr>
                           <tr><td>Average Frequency of Delay: </td><td style="text-align: right">` +
            d.avFreqDelay +
            `</td></tr>
                   </table>
                   `;
          return content;
        });
      svg.call(tip);

      y.domain(
        dat.map(function(d) {
          return d.name;
        })
      );
      x.domain([
        0,
        d3.max(dat, function(d) {
          return d.avMinDelay;
        })
      ]);

      // append the rectangles for the bar chart
      svg
        .selectAll(".bar")
        .data(dat)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("id", function(d) {
          return "s" + d.stopid; //<-- Sets the ID of the point to the stops name
        })
        .attr("y", function(d) {
          return y(d.name);
        })
        .attr("width", function(d) {
          return x(d.avMinDelay);
        })
        .attr("height", y.bandwidth())
        .attr("fill", function(d) {
          if (d.route == 1) {
            return "#cc79a1";
          } else if (d.route == 43) {
            return "#a24700";
          } else if (d.route == "sl4") {
            return "#0072b2";
          } else if (d.route == "sl5") {
            return "#009e73";
          }
        })
        .attr("stroke", "#000000")
        .on("mouseover.tip", tip.show)
        .on("mouseout.tip", tip.hide)
        .on("mouseover.select", function(d) {
          return barMouseOver(d);
        })
        .on("mouseout.select", function(d) {
          return barMouseOverEnd(d);
        });

      // add the x Axis
      svg
        .append("g")
        .attr("transform", `translate(0,0)`)
        .attr("class", "axis")
        .call(d3.axisTop(x));

      // add the y Axis
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis");

      //highlights the bar in yellow whne hovered over
      function barMouseOver(d) {
        d3.selectAll("#" + "s" + d.stopid)
          .style("fill", "#ffff00")
          .style("stroke", "#000000");
      }

      //returns the bar back to original color
      function barMouseOverEnd(d) {
        d3.selectAll("#" + "s" + d.stopid)
          .style("fill", function(d) {
            if (d.route == 1) {
              return "#cc79a1";
            } else if (d.route == 43) {
              return "#a24700";
            } else if (d.route == "sl4") {
              return "#0072b2";
            } else if (d.route == "sl5") {
              return "#009e73";
            }
          })
          .style("stroke", "#000000");
      }
    }

    //Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Route 1 Frequency of Delay");
  });
}

//It is the same process for the charts below as well just for the three other routes

//Route 43 Average Miute Delay Barchart
function route43freq() {
  var margin = { top: 50, right: 230, bottom: 30, left: 240 },
    width = 800 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  //create the svg
  var svg = d3
    .select("#route43freq")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear().range([0, width]);

  // set the ranges
  var y = d3
    .scaleBand()
    .range([height, 0])
    .padding(0.1);

  d3.json("data/stopskey.json").then(function(data) {
    // dat = data.filter(function(d) {
    //   return d.outbound === 1;
    // });

    data = data.filter(function(d) {
      return d.route == 43;
    });

    d3.select("#direction").on("change.route43Freq", update43freq);
    update43freq();
    function update43freq() {
      dat = data;

      if (d3.select("#direction").property("checked")) {
        dat = dat.filter(function(d) {
          return d.outbound === 1;
        });
      } else {
        dat = dat.filter(function(d) {
          return d.outbound == 0;
        });
      }

      svg.selectAll(".bar").remove();
      svg.selectAll(".axis").remove();

      //format the data
      dat.forEach(function(d) {
        d.avMinDelay = +d.avMinDelay;
      });

      // Create Tooltips
      var tip = d3
        .tip()
        .attr("class", "d3-tip")
        .direction("e")
        .offset([0, 5])
        .html(function(d) {
          var content =
            "<span style='margin-left: 2.5px;'><b>" +
            d.name +
            "</b></span><br>";
          content +=
            `
                     <table style="margin-top: 2.5px;">
                             <tr><td>Route: </td><td style="text-align: right">` +
            d.route +
            `</td></tr>
                             <tr><td>Average Minute Delay: </td><td style="text-align: right">` +
            d.avMinDelay +
            `</td></tr>
                             <tr><td>Average Frequency of Delay: </td><td style="text-align: right">` +
            d.avFreqDelay +
            `</td></tr>
                     </table>
                     `;
          return content;
        });
      svg.call(tip);

      y.domain(
        dat.map(function(d) {
          return d.name;
        })
      );
      x.domain([
        0,
        d3.max(dat, function(d) {
          return d.avMinDelay;
        })
      ]);

      // append the rectangles for the bar chart
      svg
        .selectAll(".bar")
        .data(dat)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("id", function(d) {
          return "s" + d.stopid; //<-- Sets the ID of the point to the stops name
        })
        .attr("y", function(d) {
          return y(d.name);
        })
        .attr("width", function(d) {
          return x(d.avMinDelay);
        })
        .attr("height", y.bandwidth())
        .attr("fill", function(d) {
          if (d.route == 1) {
            return "#cc79a1";
          } else if (d.route == 43) {
            return "#a24700";
          } else if (d.route == "sl4") {
            return "#0072b2";
          } else if (d.route == "sl5") {
            return "#009e73";
          }
        })
        .attr("stroke", "#000000")
        .on("mouseover.tip", tip.show)
        .on("mouseout.tip", tip.hide)
        .on("mouseover.select", function(d) {
          return barMouseOver(d);
        })
        .on("mouseout.select", function(d) {
          return barMouseOverEnd(d);
        });

      // add the x Axis
      svg
        .append("g")
        .attr("transform", `translate(0,0)`)
        .attr("class", "axis")
        .call(d3.axisTop(x));

      // add the y Axis
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis");

      function barMouseOver(d) {
        d3.selectAll("#" + "s" + d.stopid)
          .style("fill", "#ffff00")
          .style("stroke", "#000000");
      }

      function barMouseOverEnd(d) {
        d3.selectAll("#" + "s" + d.stopid)
          .style("fill", function(d) {
            if (d.route == 1) {
              return "#cc79a1";
            } else if (d.route == 43) {
              return "#a24700";
            } else if (d.route == "sl4") {
              return "#0072b2";
            } else if (d.route == "sl5") {
              return "#009e73";
            }
          })
          .style("stroke", "#000000");
      }
    }

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Route 43 Frequency of Delay");
  });
}

//Route SL4 Average Minute Delay Chart

function routesl4freq() {
  var margin = { top: 50, right: 230, bottom: 30, left: 240 },
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  //create the svg
  var svg = d3
    .select("#routesl4freq")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear().range([0, width]);

  // set the ranges
  var y = d3
    .scaleBand()
    .range([height, 0])
    .padding(0.1);

  d3.json("data/stopskey.json").then(function(data) {
    data = data.filter(function(d) {
      return d.route == "sl4";
    });

    d3.select("#direction").on("change.routesl4Freq", updatesl4freq);
    updatesl4freq();
    function updatesl4freq() {
      dat = data;

      if (d3.select("#direction").property("checked")) {
        dat = dat.filter(function(d) {
          return d.outbound === 1;
        });
      } else {
        dat = dat.filter(function(d) {
          return d.outbound == 0;
        });
      }

      svg.selectAll(".bar").remove();
      svg.selectAll(".axis").remove();

      //format the data
      dat.forEach(function(d) {
        d.avMinDelay = +d.avMinDelay;
      });

      // Create Tooltips
      var tip = d3
        .tip()
        .attr("class", "d3-tip")
        .direction("e")
        .offset([0, 5])
        .html(function(d) {
          var content =
            "<span style='margin-left: 2.5px;'><b>" +
            d.name +
            "</b></span><br>";
          content +=
            `
                     <table style="margin-top: 2.5px;">
                             <tr><td>Route: </td><td style="text-align: right">` +
            d.route +
            `</td></tr>
                             <tr><td>Average Minute Delay: </td><td style="text-align: right">` +
            d.avMinDelay +
            `</td></tr>
                             <tr><td>Average Frequency of Delay: </td><td style="text-align: right">` +
            d.avFreqDelay +
            `</td></tr>
                     </table>
                     `;
          return content;
        });
      svg.call(tip);

      y.domain(
        dat.map(function(d) {
          return d.name;
        })
      );
      x.domain([
        0,
        d3.max(dat, function(d) {
          return d.avMinDelay;
        })
      ]);

      // append the rectangles for the bar chart
      svg
        .selectAll(".bar")
        .data(dat)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("id", function(d) {
          return "s" + d.stopid; //<-- Sets the ID of the point to the stops name
        })
        .attr("y", function(d) {
          return y(d.name);
        })
        .attr("width", function(d) {
          return x(d.avMinDelay);
        })
        .attr("height", y.bandwidth())
        .attr("fill", function(d) {
          if (d.route == 1) {
            return "#cc79a1";
          } else if (d.route == 43) {
            return "#a24700";
          } else if (d.route == "sl4") {
            return "#0072b2";
          } else if (d.route == "sl5") {
            return "#009e73";
          }
        })
        .attr("stroke", "#000000")
        .on("mouseover.tip", tip.show)
        .on("mouseout.tip", tip.hide)
        .on("mouseover.select", function(d) {
          return barMouseOver(d);
        })
        .on("mouseout.select", function(d) {
          return barMouseOverEnd(d);
        });

      // add the x Axis
      svg
        .append("g")
        .attr("transform", `translate(0,0)`)
        .attr("class", "axis")
        .call(d3.axisTop(x));

      // add the y Axis
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis");

      function barMouseOver(d) {
        d3.selectAll("#" + "s" + d.stopid)
          .style("fill", "#ffff00")
          .style("stroke", "#000000");
      }

      function barMouseOverEnd(d) {
        d3.selectAll("#" + "s" + d.stopid)
          .style("fill", function(d) {
            if (d.route == 1) {
              return "#cc79a1";
            } else if (d.route == 43) {
              return "#a24700";
            } else if (d.route == "sl4") {
              return "#0072b2";
            } else if (d.route == "sl5") {
              return "#009e73";
            }
          })
          .style("stroke", "#000000");
      }
    }

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Route SL4 Frequency of Delay");
  });
}

//Route SL5 Average Minute Delay Bar Chart

function routesl5freq() {
  var margin = { top: 50, right: 230, bottom: 30, left: 240 },
    width = 800 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  //create the svg
  var svg = d3
    .select("#routesl5freq")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear().range([0, width]);

  // set the ranges
  var y = d3
    .scaleBand()
    .range([height, 0])
    .padding(0.1);

  d3.json("data/stopskey.json").then(function(data) {
    data = data.filter(function(d) {
      return d.route == "sl5";
    });

    d3.select("#direction").on("change.routesl5Freq", updatesl5freq);
    updatesl5freq();
    function updatesl5freq() {
      dat = data;

      if (d3.select("#direction").property("checked")) {
        dat = dat.filter(function(d) {
          return d.outbound === 1;
        });
      } else {
        dat = dat.filter(function(d) {
          return d.outbound == 0;
        });
      }

      svg.selectAll(".bar").remove();
      svg.selectAll(".axis").remove();

      //format the data
      dat.forEach(function(d) {
        d.avMinDelay = +d.avMinDelay;
      });

      // Create Tooltips
      var tip = d3
        .tip()
        .attr("class", "d3-tip")
        .direction("e")
        .offset([0, 5])
        .html(function(d) {
          var content =
            "<span style='margin-left: 2.5px;'><b>" +
            d.name +
            "</b></span><br>";
          content +=
            `
                       <table style="margin-top: 2.5px;">
                               <tr><td>Route: </td><td style="text-align: right">` +
            d.route +
            `</td></tr>
                               <tr><td>Average Minute Delay: </td><td style="text-align: right">` +
            d.avMinDelay +
            `</td></tr>
                               <tr><td>Average Frequency of Delay: </td><td style="text-align: right">` +
            d.avFreqDelay +
            `</td></tr>
                       </table>
                       `;
          return content;
        });
      svg.call(tip);

      y.domain(
        dat.map(function(d) {
          return d.name;
        })
      );
      x.domain([
        0,
        d3.max(dat, function(d) {
          return d.avMinDelay;
        })
      ]);

      // append the rectangles for the bar chart
      svg
        .selectAll(".bar")
        .data(dat)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("id", function(d) {
          return "s" + d.stopid; //<-- Sets the ID of the point to the stops name
        })
        .attr("y", function(d) {
          return y(d.name);
        })
        .attr("width", function(d) {
          return x(d.avMinDelay);
        })
        .attr("height", y.bandwidth())
        .attr("fill", function(d) {
          if (d.route == 1) {
            return "#cc79a1";
          } else if (d.route == 43) {
            return "#a24700";
          } else if (d.route == "sl4") {
            return "#0072b2";
          } else if (d.route == "sl5") {
            return "#009e73";
          }
        })
        .attr("stroke", "#000000")
        .on("mouseover.tip", tip.show)
        .on("mouseout.tip", tip.hide)
        .on("mouseover.select", function(d) {
          return barMouseOver(d);
        })
        .on("mouseout.select", function(d) {
          return barMouseOverEnd(d);
        });

      // add the x Axis
      svg
        .append("g")
        .attr("transform", `translate(0,0)`)
        .attr("class", "axis")
        .call(d3.axisTop(x));

      // add the y Axis
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis");

      function barMouseOver(d) {
        d3.selectAll("#" + "s" + d.stopid)
          .style("fill", "#ffff00")
          .style("stroke", "#000000");
      }

      function barMouseOverEnd(d) {
        d3.selectAll("#" + "s" + d.stopid)
          .style("fill", function(d) {
            if (d.route == 1) {
              return "#cc79a1";
            } else if (d.route == 43) {
              return "#a24700";
            } else if (d.route == "sl4") {
              return "#0072b2";
            } else if (d.route == "sl5") {
              return "#009e73";
            }
          })
          .style("stroke", "#000000");
      }
    }

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Route SL5 Frequency of Delay");
  });
}
