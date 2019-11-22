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

  // var width = map.getBounds().getEast() - map.getBounds().getWest();
  // var height = map.getBounds().getNorth() - map.getBounds().getSouth();
  // console.log(width);
  // console.log(height);

  var width = 1000;
  var height = 1000;
  //append a svg level to the leaflet map
  //var svg = d3.select(map.getPanes().overlayPane).append("svg");
  var svg = d3
    .select(map.getPanes().overlayPane)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  //var g = svg.append("g").attr("class", "leaflet-zoom-hide");

  var Brush = d3.brush().extent([
    [0, 0],
    [width, height]
  ]);
  //.on("start brush", brushed)
  //.on("end", brushEnd);

  svg.append("g").call(Brush);

  // var outbound = d.filter(function(d) {
  //   return d.outbound == 1;
  // });
  // console.log(outbound);
  // var inbound = d.filter(function(d) {
  //   return d.outbound == 0;
  // });

  // function whichDirection() {
  //     if(direction == 1) {
  //         var data = d.filter(function(d) {
  //           return d.outbound == 1;
  //         });
  //         return data;
  //     }else {
  //         var data = d.filter(function(d) {
  //           return d.outbound == 0;
  //         });
  //     }
  // }

  // var data = whichDirection();
  // console.log(data);
  // console.log(inbound);

  function mapPointX(d) {
    d.LatLng = new L.LatLng(d.latitude, d.longitude);
    var x = map.latLngToLayerPoint(d.LatLng).x;
    return x;
  }

  function mapPointY(d) {
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
      //console.log(data);
    } else {
      data = data.filter(function(d) {
        return d.outbound == 0;
      });
      //console.log(data);
    }

    if (!d3.select("#route1").property("checked")) {
      //console.log(d3.select("#route1").property("checked"));
      data = data.filter(function(d) {
        return d.route != 1;
      });
      //console.log(data);
    } else {
      console.log(d3.select("#route1").property("checked"));
      data = data;
      //console.log(data);
    }

    if (!d3.select("#route43").property("checked")) {
      //console.log(d3.select("#route43").property("checked"));
      data = data.filter(function(d) {
        return d.route != 43;
      });
      //console.log(data);
    } else {
      console.log(d3.select("#route43").property("checked"));
      data = data;
      //console.log(data);
    }
    if (!d3.select("#routesl4").property("checked")) {
      console.log(d3.select("#routesl4").property("checked"));
      data = data.filter(function(d) {
        return d.route != "sl4";
      });
      //console.log(data);
    } else {
      //console.log(d3.select("#routesl4").property("checked"));
      data = data;
      //console.log(data);
    }
    if (!d3.select("#routesl5").property("checked")) {
      //console.log(d3.select("#routesl5").property("checked"));
      data = data.filter(function(d) {
        return d.route != "sl5";
      });
      //console.log(data);
    } else {
      //console.log(d3.select("#routesl5").property("checked"));
      data = data;
      //console.log(data);
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
      .attr("cx", mapPointX)
      .attr("cy", mapPointY)
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
      .on("mouseover", function() {
        return mapMouseOver(d);
      })
      .on("mouseout", function(d) {
        return mapMouseOverEnd(d);
      })
      .raise();

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

  //console.log(d3.select("#route1").property("checked"));

  d3.select("#route1").on("change", updateStops);
  d3.select("#route43").on("change", updateStops);
  d3.select("#routesl4").on("change", updateStops);
  d3.select("#routesl5").on("change", updateStops);
  d3.select("#direction").on("change", updateStops);
  d3.selectAll(".reveal-btn").on("click", updateStops);
  updateStops();

  //   var line = d3
  //     .line()
  //     .x(function(d) {
  //       return mapPointX(d);
  //     })
  //     .y(function(d) {
  //       return mapPointY(d);
  //     })
  //     .curve(d3.curveCardinal.tension(0.5));

  //   svg
  //     .append("path")
  //     .data([outbound])
  //     .attr("d", line)
  //     .attr("class", "lineConnect");

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
    .attr("cx", mapPointX)
    .attr("cy", mapPointY)
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
      //d3.select(this).classed("mouseover", true)
      console.log(d);
      return mapMouseOver(d);
    })
    .on("mouseout", function(d) {
      //d3.select(this).classed("mouseover", false)
      return mapMouseOverEnd(d);
    })
    .raise();
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
