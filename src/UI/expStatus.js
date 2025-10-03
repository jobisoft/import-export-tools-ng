// expStatus.js

var progressBar = document.getElementById("msg-progress");

browser.runtime.onMessage.addListener(update => {
  console.log(update)
  progressBar.max = update.maxMsgCount;
  progressBar.value = update.msgCount;

});

console.log("listener set")