const api = require('./menu.api.js');

const templates = {
  blobId: `
  <p class="blobId">%%blobId%%</p>
  `
};

const render = {
  validId: validId
};

let blobIdContainer   = document.querySelector(".blobIdContainer");
let blobInput         = document.querySelector(".blobInput");

blobInput.addEventListener("keyup", e => {
  if(e.keyCode === 13) {
    api.getBlob(e.target.value)
      .then(render.validId)
      .catch(err => {
        console.log(err);
      });
  }
  return false;
});

function validId(res) {
  console.log(res);
  //templates.blobId.replace("%%blobId%%", );
};

chrome.storage.sync.set({
  'blobIds':[] 
});

chrome.storage.sync.get('blobIds', blobIds => {
  console.log(blobIds);
});


