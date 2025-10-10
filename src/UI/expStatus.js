// expStatus.js

var progressBar = document.getElementById("msg-progress");
//var progressBarMaxLabel = document.getElementById("msg-progress-max-label");

var currentFolder = document.getElementById("current-folder");
var totalFolderMsgCount = document.getElementById("total-folder-msg-count")

browser.runtime.onMessage.addListener(update => {
  console.log(update)
  currentFolder.innerText = update.folderName;
  totalFolderMsgCount.innerText = update.maxMsgCount;
  progressBar.max = update.maxMsgCount;
  progressBar.value = update.msgCount;
  //progressBarMaxLabel.innerText = update.maxMsgCount;

});

console.log("listener set")

async function cancelClick() {
console.log("cancel")

}
document.addEventListener('DOMContentLoaded', () => {
  i18n.updateDocument();
}, { once: true });

async function onLoad() {
  console.log("load")

}

function onUnload() {
  console.log("close")

}


window.addEventListener("beforeunload", (event) => {
  console.log("close")
});

