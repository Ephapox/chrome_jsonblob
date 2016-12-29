const _ = require('lodash');

const jsonblobStorageService = {
  getAllBlobs: getAllBlobs,
  saveBlob: saveBlob,
  editBlob: editBlob,
  removeBlob: removeBlob
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

function removeBlob(blobId) {
  _blobStorage.jsonblobs = _blobStorage.jsonblobs.filter(blob => {
    return blobId !== blob.id;
  });

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

module.exports = jsonblobStorageService;
