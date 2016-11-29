/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const api = __webpack_require__(1);

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




/***/ },
/* 1 */
/***/ function(module, exports) {

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



/***/ }
/******/ ]);