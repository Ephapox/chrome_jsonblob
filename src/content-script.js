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
const clearBlobsClass = "jsonblobMenu__clearBlobs";

const templates = {
  blob: _.template(`
  <div class='jsonblobMenu__item'>
    <a href='https://jsonblob.com/<%= id %>' target='_blank'><%= id %></a>
    <div>
      <span data-blob-id=<%= id %> class='jsonblobMenu__itemView'>View</span>
      <span data-blob-id=<%= id %> class='jsonblobMenu__itemEdit'>Edit</span>
      <span data-blob-id=<%= id %> class='jsonblobMenu__itemRemove'>Remove</span>
    </div>
  </div>
  `)
};

const EVENTS = {
  init: [
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
              uiService.updateSavedBlobs(
                uiService.$(savedBlobClass), 
                blobs, 
                templates.blob, 
                EVENTS.updateBlobs, 
                jsonEditor
              );
            })
            .catch(errorHandlerService);
        } catch(e) {
          console.log("invalid json!");
        }
      }
    },
    {
      event: "click",
      className: clearBlobsClass,
      data: [],
      handler: function onClearBlobsClick($appMenu, jsonEditor) {
        jsonblobStorageService.clearBlobs()
          .then(jsonblobStorageService.getAllBlobs)
          .then(blobs => {
            uiService.updateSavedBlobs(
              uiService.$(savedBlobClass), 
              blobs, 
              templates.blob, 
              EVENTS.updateBlobs, 
              jsonEditor
            );
            jsonEditor.setMode("code");
            jsonEditor.set({});
          });
      }
    } 
  ],
  updateBlobs: [
    {
      event: "click",
      className: "jsonblobMenu__itemView",
      data: [],
      handler: function onViewBlobClick(e, jsonEditor) {
        jsonblobApiService
          .getBlob(e.target.dataset.blobId)
          .then((blob) => {
            jsonEditor.set(blob);
            jsonEditor.setMode('view');
          });
      }
    },
    {
      event: "click",
      className: "jsonblobMenu__itemEdit",
      data: [],
      handler: function onEditBlobClick(e, jsonEditor) {
        var blobId = e.target.dataset.blobId;

        if(e.target.innerHTML === "Edit") {
          e.target.innerHTML = "Update";
          jsonblobApiService.getBlob(blobId)
            .then(blob => {
              jsonEditor.setMode('code');
              jsonEditor.set(blob);
            });
        } else if(e.target.innerHTML === 'Update') {
          e.target.innerHTML = "Edit";
          let jsonObj = jsonEditor.get();
          jsonblobApiService.updateBlob(blobId, jsonObj)
            .then(res => res.json())
            .then(json => {
              jsonEditor.setMode('view');
              jsonEditor.set(json);
            });
        }
      }
    },
    {
      event: "click",
      className: "jsonblobMenu__itemRemove",
      data: [],
      handler: function onRemoveBlobClick(e, jsonEditor) {
        var blobId = e.target.dataset.blobId;

        jsonblobStorageService.removeBlob(blobId)
          .then(jsonblobStorageService.getAllBlobs)
          .then(blobs => {
            uiService.updateSavedBlobs(
              uiService.$(savedBlobClass), 
              blobs, 
              templates.blob, 
              EVENTS.updateBlobs, 
              jsonEditor
            );
            jsonEditor.setMode("code");
            jsonEditor.set({});
          });
        jsonblobApiService
          .removeBlob(blobId)
          .catch(errorHandlerService);
      }
    }
  ]
};

let $body = document.querySelector("body");
appendMenu($body, menuTemplate, menuClass)
  .then($appMenu => {
    let $savedBlobs = uiService.$(savedBlobClass);
    let jsonEditor = initializeJSONEditor(JSONEditorConfig, $appMenu);
    initializeDomEventHandlers($appMenu, jsonEditor, EVENTS.init);
    jsonblobStorageService.getAllBlobs()
      .then(blobs => {
        uiService.updateSavedBlobs($savedBlobs, blobs, templates.blob, EVENTS.updateBlobs, jsonEditor);
      });
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
