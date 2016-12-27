const _ = require('lodash');

const uiService = {
  updateSavedBlobs: updateSavedBlobs,
  $: $
};

const templates = {
  blob: _.template(`
  <div class='jsonblobMenu__item'>
    <p><%= id %><p>
    <div>
      <span data-blob-id=<%= id %>>View</span>
      <span data-blob-id=<%= id %>>Edit</span>
      <span data-blob-id=<%= id %>>Remove</span>
    </div>
  </div>
  `)
};

function $(className) {
  return document.querySelector(`.${className}`);
}

function updateSavedBlobs($wrapper, blobs) {
  console.log($wrapper, blobs);
  if(blobs.jsonblobs.length) {
    let blobHTML = '';
    blobs.jsonblobs.forEach(blob => {
      blobHTML += templates.blob({
        name: blob.name.toString(),
        id: blob.id
      });
    });
    $wrapper.innerHTML = blobHTML;
  } else {
    $wrapper.innerHTML = "You have no saved blobs.";
  }
}

module.exports = uiService;
