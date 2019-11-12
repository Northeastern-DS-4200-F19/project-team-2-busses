// initialize the map
var map = L.map("map").setView([42.35, -71.08], 13);

// load a tile layer
L.tileLayer("http://tiles.mapc.org/basemap/{z}/{x}/{y}.png", {
  attribution:
    'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
  maxZoom: 17,
  minZoom: 9
}).addTo(map);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     maxZoom: 17,
//     minZoom: 9
// }).addTo(map);

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
  g = svg.append("g").attr("class", "leaflet-zoom-hide");

d3.json("map.geojson").then(function(collection) {

  

  var featuresdata = collection.features.filter(function(d) {
    return d.properties.route == 1 || 43 || 751 || 748
  });

  var transform = d3.geoTransform({
    point: projectPoint
  });

  var d3path = d3.geoPath().projection(transform);

  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }

  var toLine = d3
    .line()
    .curve(d3.curveLinear)
    .x(function(d) {
      return applyLatLngToLayer(d).x;
    })
    .y(function(d) {
      return applyLatLngToLayer(d).y;
    });

  function applyLatLngToLayer(d) {
    var y = d.geometry.coordinates[1];
    var x = d.geometry.coordinates[0];
    return map.latLngToLayerPoint(new L.LatLng(y, x));
  }

  
  // here is the line between points
  var linePath = g
    .selectAll(".lineConnect")
    .data([featuresdata])
    .enter()
    .append("path")
    .attr("class", "lineConnect");

  // bus stop points
  var ptFeatures = g
    .selectAll("circle")
    .data(featuresdata)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", function(featuresdata) {
      return featuresdata.properties.color;
    })
    .attr("stroke", "black");
    

  map.on("viewreset", reset);

  // this puts stuff on the map!
  reset();

  function reset() {
    var bounds = d3path.bounds(collection),
        topLeft = bounds[0],
        bottomRight = bounds[1];
    
    
    // for the points we need to convert from latlong
    // to map units
    
    ptFeatures.attr("transform",
        function(d) {
            return "translate(" +
                applyLatLngToLayer(d).x + "," +
                applyLatLngToLayer(d).y + ")";
        });
    
    
    // Setting the size and location of the overall SVG container
    svg.attr("width", bottomRight[0] - topLeft[0] + 120)
        .attr("height", bottomRight[1] - topLeft[1] + 120)
        .style("left", topLeft[0] - 50 + "px")
        .style("top", topLeft[1] - 50 + "px");
    // linePath.attr("d", d3path);
    linePath.attr("d", toLine)
    // ptPath.attr("d", d3path);
    g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");
} 

});



