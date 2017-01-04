const config = require('./../config.js');

const iframeService = {
  messageContentScript: messageContentScript
};

function messageContentScript(message) {
  window.parent.postMessage(message, "*");
}

module.exports = iframeService;
