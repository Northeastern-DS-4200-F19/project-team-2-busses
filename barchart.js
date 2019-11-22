function route1() {
  var margin = { top: 50, right: 50, bottom: 170, left: 100 };
  var width = 400 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  //create the svg
  var svg = d3
    .select("#route1bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand().range([0, width]);

  var y = d3.scaleLinear().range([height, 0]);

  d3.json("stopskey.json").then(function(data) {
    console.log(data);

    data = data.filter(function(d) {
      return d.route == 1;
    });

    //d3.select("#direction").on("change", update1);
    update1();
    function update1() {
      console.log(d3.select("#direction").property("checked"));
      dat = data;

      if (d3.select("#direction").property("checked")) {
        dat = dat.filter(function(d) {
          return d.outbound === 1;
        });
        console.log(dat);
      } else {
        dat = dat.filter(function(d) {
          return d.outbound == 0;
        });
        console.log(dat);
      }

      svg.selectAll(".bar").remove();
      svg.selectAll(".axis").remove();
      //format the data
      dat.forEach(function(d) {
        d.avMinDelay = +d.avMinDelay;
      });

      x.domain(
        dat.map(function(d) {
          return d.name;
        })
      );
      y.domain([
        0,
        d3.max(dat, function(d) {
          return d.avMinDelay;
        })
      ]);

      //add X Axis
      var xAvis = svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .attr("class", "axis");
      //add Y axis
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis");

      var bars = svg
        .selectAll(".bar")
        .data(dat)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("id", function(d) {
          return "s" + d.stopid; //<-- Sets the ID of the point to the stops name
        })
        .attr("x", function(d) {
          return x(d.name);
        })
        .attr("width", x.bandwidth())
        .attr("y", function(d) {
          return y(d.avMinDelay);
        })
        .attr("height", function(d) {
          return height - y(d.avMinDelay);
        })
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
        .on("mouseover", function(d) {
          return barMouseOver(d);
        })
        .on("mouseout", function(d) {
          return barMouseOverEnd(d);
        });
    }
  });

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Route 1 Average Minute Delay");

  // text label for the y axis
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Minutes");

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
//route1();

function route43() {
  var margin = { top: 50, right: 50, bottom: 170, left: 80 };
  var width = 400 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  //create the svg
  var svg = d3
    .select("#route43bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand().range([0, width]);

  var y = d3.scaleLinear().range([height, 0]);

  d3.json("stopskey.json").then(function(data) {
    console.log(data);
    data = data.filter(function(d) {
      return d.route == 43;
    });
    //d3.select("#direction").on("change", update43);
    update43();
    function update43() {
      console.log(d3.select("#direction").property("checked"));
      dat = data;

      if (d3.select("#direction").property("checked")) {
        dat = dat.filter(function(d) {
          return d.outbound === 1;
        });
        console.log(dat);
      } else {
        dat = dat.filter(function(d) {
          return d.outbound == 0;
        });
        console.log(dat);
      }

      svg.selectAll(".bar").remove();
      svg.selectAll(".axis").remove();
      //format the data
      dat.forEach(function(d) {
        d.avMinDelay = +d.avMinDelay;
      });

      x.domain(
        dat.map(function(d) {
          return d.name;
        })
      );
      y.domain([
        0,
        d3.max(dat, function(d) {
          return d.avMinDelay;
        })
      ]);

      //add X Axis
      var xAvis = svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .attr("class", "axis");
      //add Y axis
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis");

      var bars = svg
        .selectAll(".bar")
        .data(dat)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("id", function(d) {
          return "s" + d.stopid; //<-- Sets the ID of the point to the stops name
        })
        .attr("x", function(d) {
          return x(d.name);
        })
        .attr("width", x.bandwidth())
        .attr("y", function(d) {
          return y(d.avMinDelay);
        })
        .attr("height", function(d) {
          return height - y(d.avMinDelay);
        })
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
        .attr("stroke", "#000000")
        .on("mouseover", function(d) {
          return barMouseOver(d);
        })
        .on("mouseout", function(d) {
          return barMouseOverEnd(d);
        });
    }
  });

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Route 43 Average Minute Delay");

  // text label for the y axis
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Minutes");

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

function routesl4() {
  var margin = { top: 50, right: 50, bottom: 170, left: 80 };
  var width = 400 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  //create the svg
  var svg = d3
    .select("#routesl4bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand().range([0, width]);

  var y = d3.scaleLinear().range([height, 0]);

  d3.json("stopskey.json").then(function(data) {
    console.log(data);
    data = data.filter(function(d) {
      return d.route == "sl4";
    });
    //d3.select("#direction").on("change", updatesl4);
    updatesl4();
    function updatesl4() {
      console.log(d3.select("#direction").property("checked"));
      dat = data;

      if (d3.select("#direction").property("checked")) {
        dat = dat.filter(function(d) {
          return d.outbound === 1;
        });
        console.log(dat);
      } else {
        dat = dat.filter(function(d) {
          return d.outbound == 0;
        });
        console.log(dat);
      }

      svg.selectAll(".bar").remove();
      svg.selectAll(".axis").remove();
      //format the data
      dat.forEach(function(d) {
        d.avMinDelay = +d.avMinDelay;
      });

      x.domain(
        dat.map(function(d) {
          return d.name;
        })
      );
      y.domain([
        0,
        d3.max(dat, function(d) {
          return d.avMinDelay;
        })
      ]);

      //add X Axis
      var xAvis = svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .attr("class", "axis");
      //add Y axis
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis");

      var bars = svg
        .selectAll(".bar")
        .data(dat)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("id", function(d) {
          return "s" + d.stopid; //<-- Sets the ID of the point to the stops name
        })
        .attr("x", function(d) {
          return x(d.name);
        })
        .attr("width", x.bandwidth())
        .attr("y", function(d) {
          return y(d.avMinDelay);
        })
        .attr("height", function(d) {
          return height - y(d.avMinDelay);
        })
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
        .attr("stroke", "#000000")
        .on("mouseover", function(d) {
          return barMouseOver(d);
        })
        .on("mouseout", function(d) {
          return barMouseOverEnd(d);
        });
    }
  });

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Route SL5 Average Minute Delay");

  // text label for the y axis
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Minutes");

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

function routesl5() {
  var margin = { top: 50, right: 50, bottom: 170, left: 80 };
  var width = 400 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  //create the svg
  var svg = d3
    .select("#routesl5bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand().range([0, width]);

  var y = d3.scaleLinear().range([height, 0]);

  d3.json("stopskey.json").then(function(data) {
    console.log(data);
    data = data.filter(function(d) {
      return d.route == "sl5";
    });
    //d3.select("#direction").on("change", updatesl5);
    //.on("change", updateStops);
    updatesl5();
    function updatesl5() {
      console.log(d3.select("#direction").property("checked"));
      dat = data;

      if (d3.select("#direction").property("checked")) {
        dat = dat.filter(function(d) {
          return d.outbound === 1;
        });
        console.log(dat);
      } else {
        dat = dat.filter(function(d) {
          return d.outbound == 0;
        });
        console.log(dat);
      }

      svg.selectAll(".bar").remove();
      svg.selectAll(".axis").remove();
      //format the data
      dat.forEach(function(d) {
        d.avMinDelay = +d.avMinDelay;
      });

      x.domain(
        dat.map(function(d) {
          return d.name;
        })
      );
      y.domain([
        0,
        d3.max(dat, function(d) {
          return d.avMinDelay;
        })
      ]);

      //add X Axis
      var xAvis = svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .attr("class", "axis");
      //add Y axis
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis");

      var bars = svg
        .selectAll(".bar")
        .data(dat)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("id", function(d) {
          return "s" + d.stopid; //<-- Sets the ID of the point to the stops name
        })
        .attr("x", function(d) {
          return x(d.name);
        })
        .attr("width", x.bandwidth())
        .attr("y", function(d) {
          return y(d.avMinDelay);
        })
        .attr("height", function(d) {
          return height - y(d.avMinDelay);
        })
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
        .attr("stroke", "#000000")
        .on("mouseover", function(d) {
          return barMouseOver(d);
        })
        .on("mouseout", function(d) {
          return barMouseOverEnd(d);
        });
    }
  });

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Route SL5 Average Minute Delay");

  // text label for the y axis
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Minutes");

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
