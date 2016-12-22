const JSONEditor = require('jsoneditor');

const jsonblobStorageService = require('./jsonblob-storage-service');
const jsonblobApiService = require('./jsonblob-api-service');
const uiService = require('./ui-service');

let menuTemplate = require('html!./templates/main-menu.html');
let css = require('style-loader!css-loader!./index.css');
let jsoneditorCSS = require('style-loader!css-loader!../node_modules/jsoneditor/dist/jsoneditor.css');

const ON_MESSAGE = {
  browserActionClick: {
    func: browserActionClick,
  }
};

const JSONEditorConfig = {
  mode: 'code',
  search: false
};

const menuClass = "jsonblobMenuContainer";
const JSONEditorClass = "jsonblobMenu__jsonEditor";
const savedBlobClass = "jsonblobMenu__blobs";

let $body = document.querySelector("body");
appendMenu($body, menuTemplate, menuClass)
  .then($appMenu => {
    let $savedBlobs = uiService.$(savedBlobClass);
    initializeJSONEditor(JSONEditorConfig, $appMenu);
    jsonblobStorageService.getAllBlobs()
      .then(uiService.updateSavedBlobs.bind(this, $savedBlobs))
  });

chrome.runtime.onMessage.addListener(contentMessageHandler);

function browserActionClick(message) {
  let $menu = uiService.$(menuClass);
  toggleMenu($menu);
}

function contentMessageHandler(message, sender, sendResponse) {
  ON_MESSAGE[message.type].func(message);
}

function appendMenu(parentElement, menuTemplate, menuClassName) {
  let menuContainer = document.createElement('div');
  menuContainer.className = menuClassName;
  parentElement.appendChild(menuContainer);
  let $appContainer = uiService.$(menuClassName);
  $appContainer.innerHTML = menuTemplate;
  $appContainer.style.display = 'none';
  return Promise.resolve($appContainer);
}

function initializeJSONEditor(config, $appMenu) {
  let $jsonEditor = uiService.$(JSONEditorClass);
  jsonEditor = new JSONEditor($jsonEditor, config);
}

function toggleMenu($menu) {
  if($menu.style.display === 'none') {
    $menu.style.display = 'block';
  } else {
    $menu.style.display = 'none';
  }
}
