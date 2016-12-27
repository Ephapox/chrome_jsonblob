const _ = require('lodash');

const jsonblobStorageService = {
  getAllBlobs: getAllBlobs,
  saveBlob: saveBlob,
  editBlob: editBlob
};

let _blobStorage = {};

function getAllBlobs() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("jsonblobs", blob => {
      console.log(blob);
      _blobStorage = blob;
      return resolve(blob);
    });
  });
}

function saveBlob(blob) {
  _blobStorage.jsonblobs.push(blob);
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(
      _blobStorage,
      function() {
        if(chrome.runtime.lastError) {
          return reject({type: "chrome storage set error"});
        }
        return resolve();
      }
    );
  });
}

function editBlob(blobId) {

}

module.exports = jsonblobStorageService;
