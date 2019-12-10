//Calls all of the functions for the visualizations
//Loads the data for the map
d3.json("stopskey.json").then(function(collection) {
  collection.forEach(function(d) {
    d.avMinDelay = +d.avMinDelay;
    d.avFreqDelay = +d.avFreqDelay;
  });

  var geo = map(collection);
  route1();
  route43();
  routesl4();
  routesl5();
  route1freq();
  route43freq();
  routesl4freq();
  routesl5freq();
});
