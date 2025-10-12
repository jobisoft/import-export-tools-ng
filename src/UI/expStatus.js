// expStatus.js

const currentFolderProgress = document.getElementById("msg-progress");
const currentFolder = document.getElementById("current-folder");
const totalFolderMsgCount = document.getElementById("total-folder-msg-count")
const okButton = document.getElementById("okButton");
const cancelButton = document.getElementById("cancelButton");
var cancelHandled = false;

// button listeners
async function okButtonListener(event) {
  messenger.runtime
    .sendMessage({
      command: "UI_EVENT",
      source: "expStatusWin",
      srcEvent: "OkClick",
    })
    .then(async () => {
      let window = await messenger.windows.getCurrent();
      messenger.windows.remove(window.id);
    });
}

async function cancelButtonListener(event) {
  await cancel();
}

async function cancel() {
  messenger.runtime
    .sendMessage({
      command: "UI_EVENT",
      source: "expStatusWin",
      srcEvent: "cancelClick",
    })
    .then(async () => {
      let window = await messenger.windows.getCurrent();
      messenger.windows.remove(window.id);
      cancelHandled = true;
    });
}

browser.runtime.onMessage.addListener(msg => {
  console.log(msg)
  currentFolder.innerText = msg.folderName;
  totalFolderMsgCount.innerText = msg.maxMsgCount;
  currentFolderProgress.max = msg.maxMsgCount;
  currentFolderProgress.value = msg.msgCount;
  //progressBarMaxLabel.innerText = update.maxMsgCount;

});

console.log("listener set")

document.addEventListener('DOMContentLoaded', () => {
  i18n.updateDocument();
  //okButton.addEventListener("click", okButtonListener);
  cancelButton.addEventListener("click", cancelButtonListener);

  
}, { once: true });

window.addEventListener("beforeunload", (event) => {
  if (!cancelHandled) {
    cancel();
  }
  console.log("close")
});

