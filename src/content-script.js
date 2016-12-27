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
  search: false,
};

const errorHandlerService = function(e) {
  console.log(e);
}

const menuClass = "jsonblobMenuContainer";
const JSONEditorClass = "jsonblobMenu__jsonEditor";
const savedBlobClass = "jsonblobMenu__blobs";
const addBlobClass = "jsonblobMenu__addBlob";

const EVENTS = [
  {
    event: "click",
    className: addBlobClass,
    data: [],
    handler: function onAddBlobClick($appMenu, jsonEditor) {
      try {
        let jsonEditorData = jsonEditor.get();
        
        jsonblobApiService.createBlob(jsonEditorData)
          .then(res => {
            let blobId = res.headers.get('x-jsonblob');
            jsonblobStorageService.saveBlob({
              name: new Date(Date.now()).toString(),
              id: blobId
            });
          })
          .then(jsonblobStorageService.getAllBlobs)
          .then(blobs => {
            uiService.updateSavedBlobs(uiService.$(savedBlobClass), blobs);
          })
          .catch(errorHandlerService);
      } catch(e) {
        console.log("invalid json!");
      }
    }
  }
];

let $body = document.querySelector("body");
appendMenu($body, menuTemplate, menuClass)
  .then($appMenu => {
    let $savedBlobs = uiService.$(savedBlobClass);
    let jsonEditor = initializeJSONEditor(JSONEditorConfig, $appMenu);
    initializeDomEventHandlers($appMenu, jsonEditor, EVENTS);
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
  return jsonEditor;
}

function initializeDomEventHandlers($appMenu, jsonEditor, EVENTS) {
  let handlerData = [$appMenu, jsonEditor];
  EVENTS.forEach(event => {
    let eventData = handlerData.concat(event.data);
    $appMenu
      .querySelector(`.${event.className}`)
      .addEventListener(event.event, e => {
        event.handler.apply(this, eventData);
      });
  });
}

function toggleMenu($menu) {
  if($menu.style.display === 'none') {
    $menu.style.display = 'block';
  } else {
    $menu.style.display = 'none';
  }
}
