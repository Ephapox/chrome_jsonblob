const api = {
  protocol: {
    http: "http://jsonblob.com",
    https: "https://jsonblob.com"
  },
  apiEndpoints: {
    create: "/api/jsonBlob",
    get: "/api/jsonBlob/%%blobId%%",
    update: "/api/jsonBlob/%%blobId%%",
    remove: "/api/jsonBlob/%%blobId%%"
  }
};

const apiService = {
  getBlob: getBlob,
  createBlob: createBlob,
  updateBlob: updateBlob,
  removeBlob: removeBlob,
  setProtocol: function(protocol) {
    if(api.protocol.hasOwnProperty(protocol)) {
      API_DOMAIN = api.protocol[protocol];
    } else {
      throw Error("only https or http is allowed");
    }
  },
  getProtocol: function() {
    return API_DOMAIN;
  }
};

let API_DOMAIN = api.protocol.https;

function __json__(res) {
  return res.json();
};

function __status__(res) {
  if(res.status >= 200 && res.status < 300) {
    return Promise.resolve(res);
  } else {
    return Promise.reject(new Error(res.statusText));
  }
};

function getBlob(blobId) {
  return new Promise((resolve, reject) => {
    fetch(API_DOMAIN + api.apiEndpoints.get.replace("%%blobId%%", blobId))
      .then(__status__)
      .then(__json__)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject({
          message: "Invalid blob ID.",
          error: err
        });
      });
  });
};

function createBlob(obj) {
  return new Promise((resolve, reject) => {
    let fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    };
    fetch(API_DOMAIN + api.apiEndpoints.create, fetchConfig)
      .then(__status__)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
function updateBlob(obj, id) {
  return new Promise((resolve, reject) => {
    let fetchConfig = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
      redirect: 'follow'
    };
    fetch(API_DOMAIN + api.apiEndpoints.update.replace('%%blobId%%', id), fetchConfig)
      .then(__status__)
      .then(resolve)
      .catch(err => {
        console.log(err);
      });
  });
};
function removeBlob(id) {
  return new Promise((resolve, reject) => {
    let fetchConfig = {
      method: "DELETE"
    };
    fetch(API_DOMAIN + api.apiEndpoints.remove.replace('%%blobId%%', id), fetchConfig)
      .then(__status__)
      .then(resolve)
  });
};

module.exports = apiService;

