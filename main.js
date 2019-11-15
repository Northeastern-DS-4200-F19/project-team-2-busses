d3.json("data.geojson").then(function(collection) {
  // General event type for selections, used by d3-dispatch
  // https://github.com/d3/d3-dispatch
  const dispatchString = "selectionUpdated";
  console.log(collection);
  var geo = map(collection)//.selectionDispatcher(d3.dispatch(dispatchString));

  var features = collection.features.filter(function(d) {
    return d.properties.route == 1 || 43 || 751 || 748;
  });

  features.forEach(function(d) {
    d.Delay = +d.Delay;
  });

  let route1chart = barChart()
    .width(600)
    .height(500)
    .x(function(d) {
      return d.properties.name;
    })
    .y(function(d) {
      return d.properties.minuteDelay;
    });

  var route43chart = barChart()
    .width(600)
    .height(500)
    .x(function(d) {
      return d.properties.name;
    })
    .y(function(d) {
      return d.properties.minuteDelay;
    });

  var routesl4chart = barChart()
    .width(600)
    .height(500)
    .x(function(d) {
      return d.properties.name;
    })
    .y(function(d) {
      return d.properties.minuteDelay;
    });

  var routesl5chart = barChart()
    .width(600)
    .height(500)
    .x(function(d) {
      return d.properties.name;
    })
    .y(function(d) {
      return d.properties.minuteDelay;
    });

  var route1 = collection.features.filter(function(d) {
    return d.properties.route == 1;
  });
  d3.select("#route1")
    .datum(route1)
    .call(route1chart);

  var route43 = collection.features.filter(function(d) {
    return d.properties.route == 43;
  });
  d3.select("#route43")
    .datum(route43)
    .call(route43chart);

  var routesl4 = collection.features.filter(function(d) {
    return d.properties.route == 751;
  });
  d3.select("#routesl4")
    .datum(routesl4)
    .call(routesl4chart);

  var routesl5 = collection.features.filter(function(d) {
    return d.properties.route == 748;
  });
  d3.select("#routesl5")
    .datum(routesl5)
    .call(routesl5chart);

//d3.call(geo);
});
