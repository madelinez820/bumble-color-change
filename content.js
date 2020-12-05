/**
 * Changes every message bubble to the specified color (or back to bright yellow if no specified color is present)
 * @param {} c the color that the messages' background gets
 */
function changeColor(){
    chrome.storage.sync.get(['bumble_custom_color'], function(items) {
        var color = items["bumble_custom_color"];
        if (color == undefined) { // no specified color
            resetColor();
        } else{
            var messages = document.getElementsByClassName('message-bubble');
            for(i = 0; i < messages.length; i++) {
                var m = messages[i];
                if (m.parentElement.parentElement.parentElement.classList.contains("message--in")){
                    m.style.backgroundColor = color;
                }
            }  
        }
    });
}

/**
 * Resets every message bubble to the original color (bright yellow)
 */
function resetColor(){
    chrome.storage.sync.remove('bumble_custom_color');
    var messages = document.getElementsByClassName('message-bubble');
    for(i = 0; i < messages.length; i++) {
        messages[i].style.backgroundColor = "";
    }   
}

// responds to the change color and reset color requests from the popup's buttons 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "changeColor" ) {
            chrome.storage.sync.set({'bumble_custom_color': request.color}, function() {
                console.log('color stored as ' + request.color);
            });
            changeColor();
        }
        if( request.message === "resetColor") {
            resetColor();
        }
    }
);

// adds a mutator to check when the screen is on a different person's messages with you
var existCondition1 = setInterval(function() {
    if (document.getElementsByClassName("page__profile").length > 0) {
       clearInterval(existCondition1);
       addMutator("page__profile");
    }
   }, 100); // check every 100ms

// adds a mutator to check when a new message is received
var existCondition2 = setInterval(function() {
    if (document.getElementsByClassName("messages-list__conversation").length > 0) {
       clearInterval(existCondition2);
       addMutator("messages-list__conversation");
    }
   }, 100); // check every 100ms

/**
 * Helper function that fires (maybe a couple of times) when you click on another person
 */
function addMutator(ele){
    const targetNode = document.getElementsByClassName(ele)[0];
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        changeColor(); 
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}