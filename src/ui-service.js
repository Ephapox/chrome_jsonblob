const _ = require('lodash');

const uiService = {
  updateSavedBlobs: updateSavedBlobs,
  $: $
};



function $(className) {
  return document.querySelector(`.${className}`);
}

function updateSavedBlobs($wrapper, blobs, template, EVENTS, jsonEditor) {
  if(blobs.jsonblobs.length) {
    let blobHTML = '';
    blobs.jsonblobs.forEach(blob => {
      blobHTML += template({
        name: blob.name.toString(),
        id: blob.id
      });
    });
    $wrapper.innerHTML = blobHTML;
    EVENTS.forEach(event => {
      document.querySelectorAll(`.${event.className}`)
        .forEach(element => {
          element.addEventListener(event.event, e => {
            event.handler(e, jsonEditor);
          });
        })
    });
  } else {
    $wrapper.innerHTML = "You have no saved blobs.";
  }
}

module.exports = uiService;
