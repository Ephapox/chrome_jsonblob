const _ = require('lodash');

const jsonblobStorageService = {
  getAllBlobs: getAllBlobs,
  saveBlob: saveBlob,
  editBlob: editBlob,
  removeBlob: removeBlob,
  clearBlobs
};

let _blobStorage = {};

function getAllBlobs() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, blobs => {
      console.log(blobs);
      _blobStorage = blobs;
      return resolve(blobs);
    });
  });
}

function saveBlob(blob) {
  _blobStorage[blob.id] = blob;
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

function removeBlob(blobId) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.remove(
      blobId,
      function() {
        if(chrome.runtime.lastError) {
          return reject({type: "chrome storage set error"});
        }
        return resolve();
      }
    );
  });
}

function clearBlobs() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.clear(() => {
      if(chrome.runtime.lastError) {
        return reject({type: "chrome storage clear error"});
      }
      return resolve();
    });
  });
}

module.exports = jsonblobStorageService;
