
let color = "#000"; // TODO unhardcode

function changeColor() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "changeColor","color": color});
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