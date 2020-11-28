
let color = "#000000"; // TODO hardcoded

function changeColor() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    //TODO unhardcode color
    chrome.tabs.sendMessage(activeTab.id, {"message": "changeColor","color": "#000"});
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
});