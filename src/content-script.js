let css = require('style-loader!css-loader!./index.css');

const ON_MESSAGE = {
  browserActionClick: {
    func: browserActionClick,
  }
};

const MENU_ID = "jsonblobMenuContainer";
const MENU_URL = `chrome-extension://${chrome.runtime.id}/menu.html`;

function browserActionClick(message) {
  let $menu = document.getElementById(MENU_ID);
  toggleMenu($menu);
}

function contentMessageHandler(message, sender, sendResponse) {
  ON_MESSAGE[message.type].func(message);
}

function appendMenu(parentElement, MENU_ID) {
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
let $body = document.querySelector("body");
appendMenu($body, MENU_ID)

