// These scripts control the filtering

//A button that checks all the route filting boxes
function selectAll() {
  var items = document.getElementsByName("filter-btn");
  for (var i = 0; i < items.length; i++) {
    if (items[i].type == "checkbox") items[i].checked = true;
  }
}
//A button that unchecks all the route filting boxes
function UnSelectAll() {
  var items = document.getElementsByName("filter-btn");
  for (var i = 0; i < items.length; i++) {
    if (items[i].type == "checkbox") items[i].checked = false;
  }
}
