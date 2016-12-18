const jsonblobStorageService = require('./jsonblob-storage-service');
const jsonblobApiService = require('./jsonblob-api-service');
const uiService = require('./ui-service.js');

const ON_MESSAGE = {
  browserActionClick: {
    func: browserActionClick,
  }
};

uiService.init();

chrome.runtime.onMessage.addListener(contentMessageHandler);

function browserActionClick(message) {
  uiService.toggleMenu();
}

function contentMessageHandler(message, sender, sendResponse) {
  ON_MESSAGE[message.type].func(message);
}

