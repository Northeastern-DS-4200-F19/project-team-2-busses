function map(d) {
  var osmTiles = L.tileLayer("http://tiles.mapc.org/basemap/{z}/{x}/{y}.png", {
    attribution:
      'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
    maxZoom: 13,
    minZoom: 13
  });

  var map = L.map("map")
    .addLayer(osmTiles)
    .setView([42.35, -71.08], 13);

  map.scrollWheelZoom.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.dragging.disable();

  var width = 1000;
  var height = 1000;

  var svg = d3
    .select(map.getPanes().overlayPane)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var Brush = d3
    .brush()
    .extent([
      [0, 0],
      [width, height]
    ])
    .on("start brush", brushed)
    .on("end", brushEnd);

  //Highlighting and updating points
  function brushed() {
    if (d3.event.selection === null) return;
    let selected = d3.event.selection;
    //console.log(selected)
    stops.classed("burshedPoint", function(d) {
      if (isBrushed(selected, coordX(d), coordY(d))) {
        if (!brushedStops.has(this.id)) {
          brushedStops.add(this.id);
          console.log(d.stopid)
          //console.log(this.id);
          d3.select(this).attr("burshedPoint", "true");

          d3.selectAll("#" + "s" + d.stopid)
            .style("fill", "#ffff00")
            .style("stroke", "#000000");
        }
      }

      if (!isBrushed(selected, coordX(d), coordY(d))) {
        if (brushedStops.has(this.id)) {
         
          brushedStops.remove(this.id);
          d3.select(this).attr("burshedPoint", "false");
          d3.selectAll("#" + "s" +d.stopid)
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
      return isBrushed(selected, coordX(d), coordY(d));
    });
  }

  function isBrushed(selection, x, y) {
    return (
      selection[0][0] <= x && selection[1][0] >= x && selection[0][1] <= y && selection[1][1] >= y
    );
  }

  function brushEnd() {
    if (d3.event.sourceEvent.type != "end") {
      d3.select(this).call(Brush.move, null);
    }
  }

  function coordX(d) {
    d.LatLng = new L.LatLng(d.latitude, d.longitude);
    var x = map.latLngToLayerPoint(d.LatLng).x;
    return x;
  }

  function coordY(d) {
    d.LatLng = new L.LatLng(d.latitude, d.longitude);
    var y = map.latLngToLayerPoint(d.LatLng).y;
    return y;
  }

  function updateStops() {
    data = d;

    if (d3.select("#direction").property("checked")) {
      data = data.filter(function(d) {
        return d.outbound === 1;
      });
    } else {
      data = data.filter(function(d) {
        return d.outbound == 0;
      });
    }

    if (!d3.select("#route1").property("checked")) {
      data = data.filter(function(d) {
        return d.route != 1;
      });
    } else {
      console.log(d3.select("#route1").property("checked"));
      data = data;
    }

    if (!d3.select("#route43").property("checked")) {
      data = data.filter(function(d) {
        return d.route != 43;
      });
    } else {
      console.log(d3.select("#route43").property("checked"));
      data = data;
    }
    if (!d3.select("#routesl4").property("checked")) {
      console.log(d3.select("#routesl4").property("checked"));
      data = data.filter(function(d) {
        return d.route != "sl4";
      });
    } else {
      data = data;
    }
    if (!d3.select("#routesl5").property("checked")) {
      data = data.filter(function(d) {
        return d.route != "sl5";
      });
    } else {
      data = data;
    }

    svg.selectAll("circle").remove();
    stops = svg
      .selectAll("circle")
      .data(data, function(d) {
        return d;
      })
      .enter()
      .append("circle")
      .attr("id", function(d) {
        return "s" + d.stopid; //<-- Sets the ID of the point to the stops name
      })

      .attr("r", 5)
      .attr("cx", coordX)
      .attr("cy", coordY)
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
      .attr("stroke", "black")
      .on("mouseover", function(d) {
        console.log(d);
        return mapMouseOver(d);
      })
      .on("mouseout", function(d) {
        return mapMouseOverEnd(d);
      })
      .raise();

    svg.append("g").call(Brush);

    function mapMouseOver(d) {
      d3.selectAll("#" + "s" + d.stopid)
        .style("fill", "#ffff00")
        .style("stroke", "#000000");
    }
  
    function mapMouseOverEnd(d) {
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

  d3.select("#route1").on("change", updateStops);
  d3.select("#route43").on("change", updateStops);
  d3.select("#routesl4").on("change", updateStops);
  d3.select("#routesl5").on("change", updateStops);
  d3.select("#direction").on("change", updateStops);
  d3.selectAll(".reveal-btn").on("click", updateStops);
  updateStops();

  data = d.filter(function(d) {
    return d.outbound == 1;
  });

  var stops = svg
    .selectAll("circle")
    .data(data, function(d) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("id", function(d) {
      return "s" + d.stopid; //<-- Sets the ID of the point to the stops name
    })

    .attr("r", 5)
    .attr("cx", coordX)
    .attr("cy", coordY)
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
    .attr("stroke", "black")
    .on("mouseover", function(d) {
      console.log(d);
      return mapMouseOver(d);
    })
    .on("mouseout", function(d) {
      return mapMouseOverEnd(d);
    })
    .raise();
  svg.append("g").call(Brush);

  function mapMouseOver(d) {
    d3.selectAll("#" + "s" + d.stopid)
      .style("fill", "#ffff00")
      .style("stroke", "#000000");
  }

  function mapMouseOverEnd(d) {
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

function mapMouseOver(d) {
  d3.selectAll("#" + "s" + d.stopid)
    .style("fill", "#ffff00")
    .style("stroke", "#000000");
}

function mapMouseOverEnd(d) {
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

var brushedStops = d3.set();


