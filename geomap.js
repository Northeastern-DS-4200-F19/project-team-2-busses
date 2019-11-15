function map(data) {
  
  var osmTiles = L.tileLayer("http://tiles.mapc.org/basemap/{z}/{x}/{y}.png", {
    attribution:
      'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
    maxZoom: 17,
    minZoom: 13
  });

  var map = L.map("map")
    .addLayer(osmTiles)
    .setView([42.35, -71.08], 13);

  //append a svg level to the leaflet map
  var svg = d3.select(map.getPanes().overlayPane).append("svg");

  var g = svg.append("g").attr("class", "leaflet-zoom-hide");

  //function chart(data) {
  var featuresdata = data.features.filter(function(d) {
    return d.properties.route == 1 || 43 || 751 || 748;
  });

  var transform = d3.geoTransform({
    point: projectPoint
  });

  var d3path = d3.geoPath().projection(transform);

  // Use Leaflet to implement a D3 geometric transformation.
  // the latLngToLayerPoint is a Leaflet conversion method:
  //Returns the map layer point that corresponds to the given geographical
  // coordinates (useful for placing overlays on the map).
  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }

  function applyLatLngToLayer(d) {
    var y = d.geometry.coordinates[1];
    var x = d.geometry.coordinates[0];
    return map.latLngToLayerPoint(new L.LatLng(y, x));
  }

  var toLine = d3
    .line()
    //.curve(d3.curveLinear)
    .x(function(d) {
      return applyLatLngToLayer(d).x;
    })
    .y(function(d) {
      return applyLatLngToLayer(d).y;
    });

  var linePath = g
    .selectAll(".lineConnect")
    .data([featuresdata])
    .enter()
    .append("path")
    .attr("class", "lineConnect");

  var ptFeatures = g
    .selectAll("circle")
    .data(featuresdata)
    .enter()
    .append("circle")
    .attr("r", 6)
    .attr("id", function(d){
        return d.properties.id; //<-- Sets the ID of the point to the stops name
      })
    .attr("fill", function(features) {
      return features.properties.color;
    })
    .attr("stroke", "black")
    // .on("mouseover", function(features) {
    //     d3.select(this).style("fill", "#ffff00");
    //     console.log(features);
    //     //highlight(features);
    //   })
        .on("mouseover", function(features) {
            return mapMouseOver(features);
        })
        .on("mouseout", function(features) {
            return mapMouseOverEnd(features);
        })
    //   .on("mouseout", function(d) {
    //     d3.select(this).style("fill",  function(features) {
    //         return features.properties.color;
    //       })
    //   });

  // this puts stuff on the map!
  map.on("zoom", reset);
  reset();

  function reset() {
    var bounds = d3path.bounds(data),
      topLeft = bounds[0],
      bottomRight = bounds[1];

    // for the points we need to convert from latlong
    // to map units

    ptFeatures.attr("transform", function(d) {
      return (
        "translate(" +
        applyLatLngToLayer(d).x +
        "," +
        applyLatLngToLayer(d).y +
        ")"
      );
    });

    // Setting the size and location of the overall SVG container
    svg
      .attr("width", bottomRight[0] - topLeft[0] + 120)
      .attr("height", bottomRight[1] - topLeft[1] + 120)
      .style("left", topLeft[0] - 50 + "px")
      .style("top", topLeft[1] - 50 + "px");
    // linePath.attr("d", d3path);
    linePath.attr("d", toLine);
    // ptPath.attr("d", d3path);
    g.attr(
      "transform",
      "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")"
    );
  }

  function mapMouseOver(d) {

    d3.selectAll(("#" + d.properties.id))
      .style("fill", "#ffff00")
      .style("stroke", "#000000");
  
  };


  function mapMouseOverEnd(d) {
    d3.selectAll(("#" + d.properties.id))
    .style("fill", d.properties.color)
    .style("stroke", "#000000");
  }


  //}

  //return chart
}
