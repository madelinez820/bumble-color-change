function changeColor(c){
    var messages = document.getElementsByClassName('message-bubble');
    for(i = 0; i < messages.length; i++) {
        var m = messages[i];
        if (m.parentElement.parentElement.parentElement.classList.contains("message--in")){
            m.style.backgroundColor = c;
        }


    }   
}

function resetColor(){
    var messages = document.getElementsByClassName('message-bubble');
    for(i = 0; i < messages.length; i++) {
        messages[i].style.backgroundColor = "";
    }   
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "changeColor" ) {
       changeColor("#000");
      }
      if( request.message === "resetColor" ) {
          console.log("HI");
        resetColor();
      }
    }
  );