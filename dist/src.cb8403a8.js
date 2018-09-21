// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"index.js":[function(require,module,exports) {
// Breaking out API object to display
function displaySearchDataOnPage(searchResultsArr) {
  //console.log(searchResultsArr);
  mainNode.innerHTML = "";
  var numberOfResults = searchResultsArr.totalResults;
  var searchArr = searchResultsArr.Search;
  searchArr.forEach(function (content) {
    //console.log(content);
    createContentOverview(content);
  });
}
// Show if error with API call
function displayErrorToUser(error) {}

//nodes we are listening out for
var mainNode = document.querySelector("main");

//Create the search previews Poster + Title + Year + Try to pull in rating
function createContentOverview(content) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "content-overview";

  var overviewMarkUp = "\n      <a href=\"\">\n        <img src=" + content.Poster + " alt=\"" + content.Title + " class=\"parent-img\">\n      </a>\n        <h4>" + content.Title + "</h4>\n        <p>" + content.Year + "</p>\n        <p>IMDB: " + content.imdbID + "</p>\n  ";
  var contentOverviewNode = document.createElement("div");
  contentOverviewNode.innerHTML = overviewMarkUp;
  contentOverviewNode.className = className;

  mainNode.appendChild(contentOverviewNode);

  //pull in content data for on hover information
  fetchContentDetails(content).then(function (contentBody) {
    var hoverMarkUp = "\n          <p>Save</p>\n          <p>Watched</p>\n          <p>" + contentBody.Ratings.Value + "</p>\n          <p>" + contentBody.Runtime + "</p>\n    ";
    var hoverDetailsNode = document.createElement("div");
    hoverDetailsNode.innerHTML = detailsMarkUp;
    hoverDetailsNode.className = "hover-details";
    console.log(hoverMarkUp);
    mainNode.appendChild(hoverDetailsNode);

    //// Create content details and append it to main class
    var detailsMarkUp = "\n\n          <img src=" + contentBody.Poster + " alt=\"" + contentBody.Title + " class=\"parent-img\">\n\n          <h4>" + contentBody.Title + "</h4>\n          <p>" + contentBody.Year + "</p>\n          <p>" + contentBody.Rated + "</p>\n          <p>" + contentBody.Runtime + "</p>\n\n          <button class=\"play-button\"></button>\n          <button class=\"watch-trailer-button\"></button>\n\n          <p>Watched</p>\n          <p>Save</p>\n    ";
    var contentDetailsNode = document.createElement("div");
    contentDetailsNode.innerHTML = detailsMarkUp;
    contentDetailsNode.className = "content-details";
    console.log(detailsMarkUp);

    mainNode.appendChild(contentDetailsNode);
  });
  // // NEW BODY DETAILS FROM CONTENT

  // //create details node
}

//fecth the content details from search
function fetchContentDetails(content) {
  //fetch extra movie data using imdbNumber
  var contentImdbID = content.imdbID;
  var result = fetch("http://www.omdbapi.com/?i=" + contentImdbID + "&apikey=edd66bb").then(function (response) {
    return response.json();
  }).then(function (body) {
    //console.log(body);
    return body;
  });
  //result = body;
  return result;
}

///Main fetch function
var fetchAPI = function fetchAPI(fetchURL) {
  fetch(fetchURL).then(function (response) {
    return response.json();
  }).then(function (body) {
    //console.log(body);
    displaySearchDataOnPage(body);
  }).catch(function (error) {
    displayErrorToUser(error);
  });
};

// create search parameters to put into movie database
function createSearchParameters(searchInput) {
  //console.log(searchInput);
  var searchURL = "s=" + searchInput;

  return buildURL(searchURL);
}

// function createContentParameters(imdbNumber) {
//   const contentURL = `i=${imdbNumber}`;
//
//   buildURL(contentURL);
// }

var buildURL = function buildURL(param) {
  //Build my api string
  var omdbURL = "http://www.omdbapi.com/?";
  var apiKey = "&apikey=edd66bb";
  var fetchURL = "" + omdbURL + param + apiKey;
  fetchAPI(fetchURL);
};

//Search feature
var searchSubmit = document.querySelector("form");

searchSubmit.addEventListener("submit", function (searchEvent) {
  searchEvent.preventDefault();
  //console.log(searchEvent.target);
  var searchInput = document.querySelector(".search__input");
  //console.log(searchInput.value);
  createSearchParameters(searchInput.value);
});

//click on content Poster to reveal details

// function findCurrentDate() {
//   let currentTime = new Date();
//   let currentYear = currentTime.getFullYear();
//   // Calling load of api for first time
//   createSearchParameters(currentYear);
// }

// Find currentYear to load Api with up to date movies
//findCurrentDate();
createSearchParameters("hangover");
},{}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63193' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.cb8403a8.map