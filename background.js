chrome.runtime.onInstalled.addListener(function () {
    console.log('Extension installed');
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('Message received:', message);
    sendResponse('Message received');
});