# Creating a Chrome extension with GitHub Copilot on a livestream 

- I asked Copilot Chat what the structure of a Chrome extension should look like (not everyone has access to this. And it didn’t include that I would need a service worker)
<img width="1040" alt="Screen Shot 2023-04-11 at 11 32 37 AM" src="https://user-images.githubusercontent.com/22990146/231248902-95016f3c-1a76-4beb-9c81-4cd2baa36397.png">

- Chatted with my twitch stream followers and they suggested I add a service worker
= Create folder in Visual Studio Code (or your preferred IDE)
### Create a manifest file
- Inside folder, create filed called manifest.json
- In your manifest.json describe your desired manifest.json here
```json
Manifest for Chrome extension that clears browser cache.
manifest_version: 3
Permissions for the extension are: storage, tabs, browsingData
```
- Press enter and initiate suggestions from GitHub by typing a curly brace
```json
 {

 }
```
- Inside the curly brace, GitHub Copilot should suggest the correct manifest
- Delete the lines you wrote to describe the manifest.json
- Final manifest.json should look like
```json
{
   "name": "Clear Cache",
   "version": "1.0",
   "manifest_version": 3,
   "description": "Clears browser cache",
   "permissions": [
       "storage",
       "tabs",
       "browsingData"
   ],
   "action": {
       "default_popup": "popup.html"
   },
   "background": {
       "service_worker": "background.js"
   }
}
```

### Create a service worker

- I had no clue why I needed to make a service worker. I learned about it from Twitch stream vieweres. I asked Copilot Chat and ChatGPT about what it is and why I would need it. I used Copilot labs to give me an explanation of deifferent parts of the code. 
- Create file called background.js
- Background.js is our service worker. Write a comment at the top of my life that says,
```js
/* 
Service Worker for Google Chrome Extension 
Handles when extension is installed
Handles when message is received
*/
```
- On the next lines, write a comment for the first function that says
```js
// console.log when extension is installed
```
- Let GitHub Copilot suggest
```js
chrome.runtime.onInstalled.addListener(function() {
   console.log("Extension installed");
});


```

- Write a comment that says, 
```js
// send response when message is received and console.log when message is received
```
- Let GitHub Copilot suggest the following
```js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
   console.log("Message received");
   sendResponse("Message received");
});

```
- The final file should look like this:
```js
/*
Service Worker for Google Chrome Extension
Handles when extension is installed
Handles when message is received
*/


// console.log when extension is installed
chrome.runtime.onInstalled.addListener(function() {
   console.log("Extension installed");
});


// send response when message is received and console.log when message is received
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
   console.log("Message received");
   sendResponse("Message received");
});
  
```

### Create the HTML
- Create your HTML file. This will hold the structure of your content in the Chrome extension.
- Write a comment in your HTML, so GitHub Copilot can help you write the HTML
```html
<!--
   HTML for Chrome extension that clears browser cache.
   Connect to javascript file called popup.js and CSS file called style.css
   Will render the following buttons with id's:
   - "All History"
   - "Past Month"
   - "Past Week"
   - "Past Day"
   - "Past Hour"
   - "Past Minute"


   Will render an empty paragraph with id "lastCleared"
-->

```
- Let GitHub Copilot suggest the following:
```html
<!DOCTYPE html>
<html>
   <head>
       <meta charset="utf-8">
       <title>Clear Cache</title>
       <link rel="stylesheet" href="style.css">
   </head>
   <body>
       <h1>Clear Cache</h1>
       <button id="allHistory">All History</button>
       <button id="pastMonth">Past Month</button>
       <button id="pastWeek">Past Week</button>
       <button id="pastDay">Past Day</button>
       <button id="pastHour">Past Hour</button>
       <button id="pastMinute">Past Minute</button>
       <p id="lastCleared"></p>
       <script src="popup.js"></script>
   </body>
</html>

```
### Test the Chrome extension
- Let’s test the Chrome extension before we add any interactivity or styles
- Navigate to chrome://extensions/ in your browser
- Turn developer mode on
<img width="1507" alt="Screen Shot 2023-04-11 at 12 26 34 PM" src="https://user-images.githubusercontent.com/22990146/231249485-10fb905c-9d8b-45d2-8e9d-276669505c27.png">
- Press load unpacked
<img width="625" alt="Screen Shot 2023-04-11 at 12 28 03 PM" src="https://user-images.githubusercontent.com/22990146/231249682-fcdd9886-a867-46e3-aaeb-6dee818360b0.png">
- This will ask you to upload the folder that holds your Chrome extension
<img width="1260" alt="Screen Shot 2023-04-11 at 12 29 03 PM" src="https://user-images.githubusercontent.com/22990146/231249808-5b188cee-9f9b-4a47-9315-42eaea7224e7.png">
- Once loaded, you should be able to test your extension. Here’s what mine looked like. Results may vary:
<img width="209" alt="Screen Shot 2023-04-11 at 12 30 01 PM" src="https://user-images.githubusercontent.com/22990146/231249916-0a85dc29-3f21-4f10-9093-7bb24e141ee0.png">

### Add interactivity
- Create a file called popup.js to add some interactivity
- Inside popup.js, we’ll write a comment that will act as pseudocode for us but it will also act as prompt engineering for GitHub Copilot. 
```markdown
Pseudocode is a high-level description of a computer program or algorithm that uses natural language and some basic programming structures to outline the logic and flow of a program. It is a way to express the main steps of a program or algorithm without using the specific syntax of a particular programming language.
Pseudocode typically includes statements such as "if-then" statements, loops, and function calls, and may also include simple English-like descriptions of the steps involved in performing specific tasks. Pseudocode is often used as a tool to help programmers plan and design algorithms and programs before writing the actual code.
Pseudocode is not a formal language, and there are no strict rules for writing it. Its purpose is to provide a clear and concise representation of an algorithm or program, so that it can be easily understood by both programmers and non-programmers.
```


```js
/*
This program is a Chrome Extension that clears browser cache.
Handle on button click:
- button with id "allHistory" that clears all cache history
- button with id "pastMonth" that clears cache history from the past month
- button with id "pastWeek" that clears cache history from the past week
- button with id "pastDay" that clears cache history from the past day
- button with id "pastHour" that clears cache history from the past hour
- button with id "pastMinute" that clears cache history from the past minute


Create function that
- converts dates and times into human-readable format
- adds "Successfully cleared cache" with date and time in a paragraph with id "lastCleared"
*/

```

- Write another comment to prompt GitHub Copilot to write the first function
```js
// convert date and time into human-readable format

```

- On the next line, GitHub Copilot should suggest the following lines:
```js
function convertDate(date) {
   var date = new Date(date);
   var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   return date.toLocaleDateString("en-US", options);
}
```

- Write another comment that says
```js
// add successfully cleared cache into paragraph with id "lastCleared"

```

- GitHub Copilot should suggest 
```js
function addCleared() {
   var p = document.getElementById("lastCleared");
   var date = new Date();
   p.innerHTML = "Successfully cleared cache " + convertDate(date);
}
```

- Write a comment that says
```js
// clear all cache history
```
- GitHub Copilot should suggest
```js
document.getElementById("allHistory").addEventListener("click", function() {
   chrome.browsingData.removeCache({ "since": 0 }, function() {
       addCleared();
   });
});

```
- Write a comment that says
```js


// clear cache history from the past month

```

- GitHub Copilot should suggest
```js
document.getElementById("pastMonth").addEventListener("click", function() {
   var date = new Date();
   date.setMonth(date.getMonth() - 1);
   chrome.browsingData.removeCache({ "since": date.getTime() }, function() {
       addCleared();
   });
});
```

### AT THIS POINT GITHUB COPILOT SHOULD GENERATE EVERYTHING NEEDED, BUT JUST IN CASE, FOLLOW THESE STEPS
- Write a comment that says 
```js
// clear cache history from the past week

```

- GitHub Copilot should suggest
```js
document.getElementById("pastWeek").addEventListener("click", function() {
   var date = new Date();
   date.setDate(date.getDate() - 7);
   chrome.browsingData.removeCache({ "since": date.getTime() }, function() {
       addCleared();
   });
});

```

- Write a comment that says
```js
// clear cache history from the past day
```

- GitHub Copilot should suggest
```js
document.getElementById("pastDay").addEventListener("click", function() {
   var date = new Date();
   date.setDate(date.getDate() - 1);
   chrome.browsingData.removeCache({ "since": date.getTime() }, function() {
       addCleared();
   });
});
```

- Write a comment that says 
```js
// clear cache history from the past hour

```

- GitHub Copilot should suggest
```js
document.getElementById("pastHour").addEventListener("click", function() {
   var date = new Date();
   date.setHours(date.getHours() - 1);
   chrome.browsingData.removeCache({ "since": date.getTime() }, function() {
       addCleared();
   });
});
```

- Write a comment that says
```js
// clear cache history from the past minute

```

- GitHub Copilot should suggest
```js
document.getElementById("pastMinute").addEventListener("click", function() {
   var date = new Date();
   date.setMinutes(date.getMinutes() - 1);
   chrome.browsingData.removeCache({ "since": date.getTime() }, function() {
       addCleared();
   });
});

```
- Here’s the final popup.js
```js
/*
This program is a Chrome Extension that clears browser cache.
Handle on button click:
- button with id "allHistory" that clears all cache history
- button with id "pastMonth" that clears cache history from the past month
- button with id "pastWeek" that clears cache history from the past week
- button with id "pastDay" that clears cache history from the past day
- button with id "pastHour" that clears cache history from the past hour
- button with id "pastMinute" that clears cache history from the past minute


Create function that
- converts dates and times into human-readable format
- adds "Successfully cleared cache" with date and time in a paragraph with id "lastCleared"
*/


// convert date and time into human-readable format
function convertDate(date) {
   var date = new Date(date);
   var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   return date.toLocaleDateString("en-US", options);
}


// add successfully cleared cache into paragraph with id "lastCleared"
function addCleared() {
   var p = document.getElementById("lastCleared");
   var date = new Date();
   p.innerHTML = "Successfully cleared cache " + convertDate(date);
}


// clear all cache history
document.getElementById("allHistory").addEventListener("click", function() {
   chrome.browsingData.removeCache({ "since": 0 }, function() {
       addCleared();
   });
});


// clear cache history from the past month
document.getElementById("pastMonth").addEventListener("click", function() {
   var date = new Date();
   date.setMonth(date.getMonth() - 1);
   chrome.browsingData.removeCache({ "since": date.getTime() }, function() {
       addCleared();
   });
});


// clear cache history from the past week
document.getElementById("pastWeek").addEventListener("click", function() {
   var date = new Date();
   date.setDate(date.getDate() - 7);
   chrome.browsingData.removeCache({ "since": date.getTime() }, function() {
       addCleared();
   });
});


// clear cache history from the past day
document.getElementById("pastDay").addEventListener("click", function() {
   var date = new Date();
   date.setDate(date.getDate() - 1);
   chrome.browsingData.removeCache({ "since": date.getTime() }, function() {
       addCleared();
   });
});


// clear cache history from the past hour
document.getElementById("pastHour").addEventListener("click", function() {
   var date = new Date();
   date.setHours(date.getHours() - 1);
   chrome.browsingData.removeCache({ "since": date.getTime() }, function() {
       addCleared();
   });
});


// clear cache history from the past minute
document.getElementById("pastMinute").addEventListener("click", function() {
   var date = new Date();
   date.setMinutes(date.getMinutes() - 1);
   chrome.browsingData.removeCache({ "since": date.getTime() }, function() {
       addCleared();
   });
});







```

### Add some styles

- Create a file called style.css
- Write a comment describing the style direction that GitHub Copilot should go in
```css
/* Style the Chrome extension's popup to be wider and taller
Use accessible friendly colors and fonts
Make h1 elements legible
Highlight when buttons are hovered over
Highlight when buttons are clicked
Align buttons in a column and center them but space them out evenly
Make paragraph bold and legible
*/

```

- Start typing the word body and GitHub Copilot should suggest
```css
body {
   background-color: #f1f1f1;
   font-family: Arial, Helvetica, sans-serif;
   font-size: 16px;
   color: #333;
   width: 400px;
   height: 400px;
}
```

- Keep tabbing until GitHub Copilot suggest all the styles
```css
body {
   background-color: #f1f1f1;
   font-family: Arial, Helvetica, sans-serif;
   font-size: 16px;
   color: #333;
   width: 400px;
   height: 400px;
}


h1 {
   font-size: 24px;
   color: #333;
   text-align: center;
}


button {
   background-color: #4CAF50;
   color: white;
   padding: 15px 32px;
   text-align: center;
   text-decoration: none;
   display: inline-block;
   font-size: 16px;
   margin: 4px 2px;
   cursor: pointer;
   border-radius: 8px;
}


button:hover {
   background-color: #45a049;
}


button:active {
   background-color: #3e8e41;
}


p {
   font-weight: bold;
   font-size: 18px;
   color: #333;
}

```

- Here’s the final results of the CSS file (results may vary)
```css
/* Style the Chrome extension's popup to be wider and taller
Use accessible friendly colors and fonts
Make h1 elements legible
Highlight when buttons are hovered over
Highlight when buttons are clicked
Align buttons in a column and center them but space them out evenly
Make paragraph bold and legible
*/


body {
   background-color: #f1f1f1;
   font-family: Arial, Helvetica, sans-serif;
   font-size: 16px;
   color: #333;
   width: 400px;
   height: 400px;
}


h1 {
   font-size: 24px;
   color: #333;
   text-align: center;
}


button {
   background-color: #4CAF50;
   color: white;
   padding: 15px 32px;
   text-align: center;
   text-decoration: none;
   display: inline-block;
   font-size: 16px;
   margin: 4px 2px;
   cursor: pointer;
   border-radius: 8px;
}


button:hover {
   background-color: #45a049;
}


button:active {
   background-color: #3e8e41;
}


p {
   font-weight: bold;
   font-size: 18px;
   color: #333;
}

```
### Let’s test it out

- All the code is written. So let’s test it out. Reload the changes into Chrome Extension by clicking load unpacked and the correct folder with the Chrome extension code
<img width="625" alt="Screen Shot 2023-04-11 at 12 28 03 PM" src="https://user-images.githubusercontent.com/22990146/231250683-c616c6d0-fd2e-4cca-b371-fc8e2bd466b9.png">
<img width="1260" alt="Screen Shot 2023-04-11 at 12 29 03 PM" src="https://user-images.githubusercontent.com/22990146/231250714-965fa9eb-3239-4910-9d57-a89f08a7ba53.png">

- Once it’s loaded, try out your extension. Results may vary. I tried it out a few times. Here are two examples of what it generated
<img width="406" alt="Screen Shot 2023-04-11 at 1 53 41 PM" src="https://user-images.githubusercontent.com/22990146/231250997-f03e1025-756a-4693-bced-c1a8d351d4d3.png">
<img width="401" alt="Screen Shot 2023-04-11 at 1 53 54 PM" src="https://user-images.githubusercontent.com/22990146/231251042-88429d0c-e421-44af-add9-455a208a730d.png">



