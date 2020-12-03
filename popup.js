
var colorPicker;

function changeColor() {
  var currentColor = colorPicker.value;
  console.log(currentColor);
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "changeColor","color": currentColor});
  });
}

function resetColor() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "resetColor"});
  });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("changeColor").addEventListener("click", changeColor);
  document.getElementById("resetColor").addEventListener("click", resetColor);
  //set color in the color widget to be the stored color (if it exists)
  colorPicker = document.getElementById("colorPicker");
  chrome.storage.sync.get(['bumble_custom_color'], function(items) {
    var color = items["bumble_custom_color"];
    if (color == undefined) { // no specified color
        return;
    } else{
      colorPicker.value = color;
    }
  });
});