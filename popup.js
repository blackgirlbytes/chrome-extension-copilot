/* 
The popup.js file for my Chrome extension will clear my browser's cache when a user clicks the button with id "clearCache".
*/

/*function that converts JavaScript date object to human readable string 
Format should be April 20, 2021 12:00 AM
*/

function convertDate(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime =
    month +
    "/" +
    day +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    ampm;
  return strTime;
}

// clear cache for the past hour when button with id "oneHour" is clicked

document.getElementById("pastHour").addEventListener("click", function () {
  var oneHourAgo = new Date().getTime() - 1000 * 60 * 60;
  chrome.browsingData.removeCache({ since: oneHourAgo }, function () {
    console.log("Cache cleared for the past hour.");
    showMessage();
  });
});

// clear cache for the past day when button with id "oneDay" is clicked

document.getElementById("pastDay").addEventListener("click", function () {
  var oneDayAgo = new Date().getTime() - 1000 * 60 * 60 * 24;
  chrome.browsingData.removeCache({ since: oneDayAgo }, function () {
    console.log("Cache cleared for the past day.");
    showMessage();
  });
});

// clear cache for the past minute when button with id "oneMinute" is clicked

document.getElementById("pastMinute").addEventListener("click", function () {
  var oneMinuteAgo = new Date().getTime() - 1000 * 60;
  chrome.browsingData.removeCache({ since: oneMinuteAgo }, function () {
    console.log("Cache cleared for the past minute.");
    showMessage();
  });
});

// clear cache for the past week when button with id "oneWeek" is clicked

document.getElementById("pastWeek").addEventListener("click", function () {
  var oneWeekAgo = new Date().getTime() - 1000 * 60 * 60 * 24 * 7;
  chrome.browsingData.removeCache({ since: oneWeekAgo }, function () {
    showMessage();
  });
});

// clear cache for the past month when button with id "oneMonth" is clicked

document.getElementById("pastMonth").addEventListener("click", function () {
  var oneMonthAgo = new Date().getTime() - 1000 * 60 * 60 * 24 * 30;
  chrome.browsingData.removeCache({ since: oneMonthAgo }, function () {
    showMessage();
  });
});

// clear all cache button with id "allHistory" is clicked

document.getElementById("allHistory").addEventListener("click", function () {
  chrome.browsingData.removeCache({}, function () {
    showMessage();
  });
});

// get lastClearedTime from chrome local storage and set it to lastClearedTime variable
function showMessage() {
  document.getElementById(
    "lastCleared"
  ).innerHTML = `Successfully cleared on: ${convertDate(new Date())}`;
}
