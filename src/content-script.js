const config = require('./config.js');
let css = require('style-loader!css-loader!./index.css');

const ON_MESSAGE = {
  browserActionClick: {
    func: browserActionClick,
  }
};

function browserActionClick(message) {
  let $menu = document.getElementById(config.ids.MENU_ID);
  toggleMenu($menu);
}

function contentMessageHandler(message, sender, sendResponse) {
  ON_MESSAGE[message.type].func(message);
}

function iframeMessageReceiver(event) {
  if(event.origin === config.urls.ORIGIN) {
    window.open(event.data.url);
  }
}

function appendMenu(parentElement, MENU_ID, MENU_URL) {
  let iframe = document.createElement("iframe"); 
  iframe.src = MENU_URL;
  iframe.id = MENU_ID;
  parentElement.appendChild(iframe);
  document.getElementById(MENU_ID).style.display = "none";
}

function toggleMenu($menu) {
  if($menu.style.display === 'none') {
    $menu.style.display = 'block';
  } else {
    $menu.style.display = 'none';
  }
}

chrome.runtime.onMessage.addListener(contentMessageHandler);
window.addEventListener("message", iframeMessageReceiver, false);

let $body = document.querySelector("body");
appendMenu($body, config.ids.MENU_ID, config.urls.MENU_URL)

