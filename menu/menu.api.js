const api = {
  protocol: {
    http: "http://jsonblob.com",
    https: "https://jsonblob.com"
  },
  apiEndpoints: {
    create: "/api/jsonblob",
    get: "/api/jsonblob/%%blobId%%",
    update: "/api/jsonblob/%%blobId%%",
    remove: "/api/jsonblob/%%blobId%%"
  }
};

const config = {
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

const apiService = {
  config: config,
  getBlob: getBlob,
  createBlob: createBlob,
  updateBlob: updateBlob,
  removeBlob: removeBlob
};

let API_DOMAIN = api.protocol.https;

function __json__(res) {
  console.log(res);
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
      body: obj,
      redirect: 'follow'
    };
    fetch(API_DOMAIN + api.apiEndpoints.create, fetchConfig)
      .then(__status__)
      .then(__json__)
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
function updateBlob(id, obj) {
  return new Promise((resolve, reject) => {
    let fetchConfig = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: obj,
      redirect: 'follow'
    };
    fetch(API_DOMAIN + api.apiEndpoints.update.replace('%%blobId%%', id), fetchConfig)
      .then(__status__)
      .then(res => res.url)
      .then(resolve)
      .catch(err => {
        console.log(err);
      });
  });
};
function removeBlob() {};

module.exports = apiService;

