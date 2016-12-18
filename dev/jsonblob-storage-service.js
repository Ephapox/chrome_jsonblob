const _ = require('lodash');

const jsonblobStorageService = {
  getAllBlobs: getAllBlobs,
  saveBlob: saveBlob,
  editBlob: editBlob
};

let _blobStorage = {
  jsonblobs: []
};

function getAllBlobs() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("jsonblobs", blob => {
      _blobStorage = {
        'jsonblobs': _.get(blob, 'jsonblobs', {
            'jsonblobs': []
        })
      };
      
      return resolve(_blobStorage);
    });
  });
}

function saveBlob(blob) {
  let blobExists = _.find(_blobStorage.jsonblobs, {id: blob.id});
  let newBlob = {
    'name': blob.name,
    'id': blob.id
  };
  if(blobExists) {
    blobExists = newBlob;
  } else {
    _blobStorage.jsonblobs.push(newBlob);
  }
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
