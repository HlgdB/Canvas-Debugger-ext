let color = "#3aa757";
let list = [];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color, list });
  console.log('Default background color set to %cgreen', `color${color}`);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse("recieve message");
  console.log("message", message);
})