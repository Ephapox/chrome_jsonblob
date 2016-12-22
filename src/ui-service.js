const uiService = {
  updateSavedBlobs: updateSavedBlobs,
  $: $
};

function $(className) {
  return document.querySelector(`.${className}`);
}

function updateSavedBlobs($wrapper, blobs) {
  if(blobs.length) {
  } else {
    $wrapper.innerHTML = "You have no saved blobs.";
  }
}

module.exports = uiService;
