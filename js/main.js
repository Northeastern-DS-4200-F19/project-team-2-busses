//  function getDirection() {
//   direction();
// }
// var directionDigit = getDirection();
// console.log(directionDigit);

d3.json("stopskey.json").then(function(collection) {
  //var direction = document.getElementById("outbound").checked;

  collection.forEach(function(d) {
    d.avMinDelay = +d.avMinDelay;
    d.avFreqDelay = +d.avFreqDelay;
    //console.log(d.avMinDelay)
  });

  
  // General event type for selections, used by d3-dispatch
  // https://github.com/d3/d3-dispatch
  const dispatchString = "selectionUpdated";
 
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

