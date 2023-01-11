
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35733/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /**
   * @name initHeader
   * @description Initiates Kenzap Cloud extension header and related scripts. Verifies user sessions, handles SSO, does cloud space navigation, initializes i18n localization. 
   * @param {object} response
   */
  const initHeader = (response) => {

      // cache header from backend
      if(response.header) localStorage.setItem('header', response.header);
    
      // load header to html if not present
      if(!document.querySelector("#k-script")){
    
          let child = document.createElement('div');
          child.innerHTML = localStorage.getItem('header');
          child = child.firstChild;
          document.body.prepend(child);
    
          // run header scripts
          Function(document.querySelector("#k-script").innerHTML).call('test');
      }
    
      // load locales if present
      if(response.locale) window.i18n.init(response.locale); 
  };

  /*
   * Translates string based on preloaded i18n locale values.
   * 
   * @param text {String} text to translate
   * @param cb {Function} callback function to escape text variable
   * @param p {String} list of parameters, to be replaced with %1$, %2$..
   * @returns {String} - text
   */
  const __esc = (text, cb, ...p) => {

      let match = (input, pa) => {

          pa.forEach((p, i) => { input = input.replace('%'+(i+1)+'$', p); }); 
          
          return input;
      };

      if(typeof window.i18n === 'undefined') return match(text, p);
      if(window.i18n.state.locale.values[text] === undefined) return match(text, p);

      return match(cb(window.i18n.state.locale.values[text]), p);
  };

  /*
   * Converts special characters `&`, `<`, `>`, `"`, `'` to HTML entities.
   * 
   * @param text {String}  text
   * @returns {String} - text
   */
  const attr = (text) => {

      text = String(text);

      if(text.length === 0){
  		return '';
  	}

      return text.replace(/[&<>'"]/g, tag => (
          {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              "'": '&apos;',
              '"': '&quot;'
          } [tag]));
  };

  /*
   * Converts special characters `&`, `<`, `>`, `"`, `'` to HTML entities and does translation
   * 
   * @param text {String}  text
   * @returns {String} - text
   */
  const __attr = (text, ...p) => {

      text = String(text);

      if(text.length === 0){
  		return '';
  	}

      let cb = (text) => {

          return text.replace(/[<>'"]/g, tag => (
              {
                  '&': '&amp;',
                  '<': '&lt;',
                  '>': '&gt;',
                  "'": '&apos;',
                  '"': '&quot;'
              } [tag]));
      };

      return __esc(text, cb, ...p);
  };

  /*
   * Converts special characters `&`, `<`, `>`, `"`, `'` to HTML entities.
   * 
   * @param text {String}  text
   * @returns {String} - text
   */
  const html = (text) => {

      text = String(text);

      if(text.length === 0){
  		return '';
  	}

      return text.replace(/[&<>'"]/g, tag => (
          {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              "'": '&apos;',
              '"': '&quot;'
          } [tag]));
  };

  /*
   * Converts special characters `&`, `<`, `>`, `"`, `'` to HTML entities and does translations
   * 
   * @param text {String}  text
   * @returns {String} - text
   */
  const __html = (text, ...p) => {

      text = String(text);

      if(text.length === 0){
  		return '';
  	}

      let cb = (text) => {

          return text.replace(/[&<>'"]/g, tag => (
              {
                  '&': '&amp;',
                  '<': '&lt;',
                  '>': '&gt;',
                  "'": '&apos;',
                  '"': '&quot;'
              } [tag]));
      };

      return __esc(text, cb, ...p);
  };

  /**
   * @name showLoader
   * @description Initiates full screen three dots loader.
   */
  const showLoader = () => {

      let el = document.querySelector(".loader");
      if (el) el.style.display = 'block';
  };

  /**
   * @name hideLoader
   * @description Removes full screen three dots loader.
   */
  const hideLoader = () => {

      let el = document.querySelector(".loader");
      if (el) el.style.display = 'none';
  };

  /**
   * @name link
   * @description Handles Cloud navigation links between extensions and its pages. Takes care of custom url parameters.
   * @param {string} slug - Any inbound link
   * 
   * @returns {string} link - Returns original link with kenzp cloud space ID identifier.
   */
  const link = (slug) => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let sid = urlParams.get('sid') ? urlParams.get('sid') : "";

      let postfix = slug.indexOf('?') == -1 ? '?sid='+sid : '&sid='+sid;

      return slug + postfix;
  };

  /**
   * @name getSiteId
   * @description Gets current Kenzap Cloud space ID identifier from the URL.
   * 
   * @returns {string} id - Kenzap Cloud space ID.
   */
  const getSiteId = () => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get('sid') ? urlParams.get('sid') : "";

      return id;
  };

  /**
   * @name spaceID
   * @description Gets current Kenzap Cloud space ID identifier from the URL.
   * 
   * @returns {string} id - Kenzap Cloud space ID.
   */
   const spaceID = () => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get('sid') ? urlParams.get('sid') : "";

      return id;
  };

  /**
   * @name setCookie
   * @description Set cookie by its name to all .kenzap.cloud subdomains
   * @param {string} name - Cookie name.
   * @param {string} value - Cookie value.
   * @param {string} days - Number of days when cookie expires.
   */
   const setCookie = (name, value, days) => {

      let expires = "";
      if (days) {
          let date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = ";expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (escape(value) || "") + expires + ";path=/;domain=.kenzap.cloud"; 
  };

  /**
   * @name getCookie
   * @description Read cookie by its name.
   * @param {string} cname - Cookie name.
   * 
   * @returns {string} value - Cookie value.
   */
  const getCookie = (cname) => {

      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  };

  /**
   * @name checkHeader
   * @description This function tracks UI updates, creates header version checksum and compares it after every page reload
   * @param {object} object - API response.
   */
   const checkHeader = () => {

      let version = (localStorage.hasOwnProperty('header') && localStorage.hasOwnProperty('header-version')) ? localStorage.getItem('header-version') : 0;
      let check = window.location.hostname + '/' + spaceID() + '/' + getCookie('locale');
      if(check != getCookie('check')){ version = 0; console.log('refresh'); }
      
      setCookie('check', check, 5);

      return version
  };

  /**
   * @name headers
   * @description Default headers object for all Kenzap Cloud fetch queries.
   * @param {object} headers
   */
   const H = () => {

      return {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
          'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
          'Kenzap-Header': checkHeader(),
          'Kenzap-Token': getCookie('kenzap_token'),
          'Kenzap-Sid': spaceID()
      }
  };

  /**
   * @name headers
   * @description Default headers object for all Kenzap Cloud fetch queries. 
   * @param {object} headers
   * @deprecated
   */
   ({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
      'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
      'Kenzap-Header': checkHeader(),
      'Kenzap-Token': getCookie('kenzap_token'),
      'Kenzap-Sid': spaceID(),
  });

  /**
   * @name parseApiError
   * @description Set default logics for different API Error responses.
   * @param {object} object - API response.
   */
   const parseApiError = (data) => {

      // outout to frontend console
      console.log(data);

      // unstructured failure
      if(isNaN(data.code)){
      
          // structure failure data
          let log = data;
          try{ log = JSON.stringify(log); }catch(e){ }

          let params = new URLSearchParams();
          params.append("cmd", "report");
          params.append("sid", spaceID());
          params.append("token", getCookie('kenzap_token'));
          params.append("data", log);
          
          // report error
          fetch('https://api-v1.kenzap.cloud/error/', { method: 'post', headers: { 'Accept': 'application/json', 'Content-type': 'application/x-www-form-urlencoded', }, body: params });

          alert('Can not connect to Kenzap Cloud');  
          return;
      }
      
      // handle cloud error codes
      switch(data.code){

          // unauthorized
          case 401:

              // dev mode
              if(window.location.href.indexOf('localhost')!=-1){ 

                  alert(data.reason); 
                  return; 
              }

              // production mode
              location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+window.location.href; break;
          
          // something else
          default:

              alert(data.reason); 
              break;
      }
  };

  /**
   * @name initBreadcrumbs
   * @description Render ui breadcrumbs.
   * @param {array} data - List of link objects containing link text and url. If url is missing then renders breadcrumb as static text. Requires html holder with .bc class.
   */
  const initBreadcrumbs = (data) => {

      let html = '<ol class="breadcrumb mt-2 mb-0">';
      for(let bc of data){
          
          if(typeof(bc.link) === 'undefined'){

              html += `<li class="breadcrumb-item">${ bc.text }</li>`;
          }else {

              html += `<li class="breadcrumb-item"><a href="${ bc.link }">${ bc.text }</a></li>`;
          }
      }
      html += '</ol>';
      
      document.querySelector(".bc").innerHTML = html;
  };

  /**
   * @name onClick
   * @description One row click event listener declaration. Works with one or many HTML selectors.
   * @param {string} sel - HTML selector, id, class, etc.
   * @param {string} fn - callback function fired on click event.
   */
  const onClick = (sel, fn) => {

      if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

          e.removeEventListener('click', fn, true);
          e.addEventListener('click', fn, true);
      }
  };

  /**
   * @name onKeyUp
   * @description One row key up event listener declaration. Works with one or many HTML selectors.
   * @param {string} sel - HTML selector, id, class, etc.
   * @param {string} fn - callback function fired on click event.
   */
  const onKeyUp = (sel, fn) => {

      if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

          e.removeEventListener('keyup', fn, true);
          e.addEventListener('keyup', fn, true);
      }
  };

  /**
   * @name simulateClick
   * @description Trigger on click event without user interaction.
   * @param {string} elem - HTML selector, id, class, etc.
   */
   const simulateClick = (elem) => {

  	// create our event (with options)
  	let evt = new MouseEvent('click', {
  		bubbles: true,
  		cancelable: true,
  		view: window
  	});

  	// if cancelled, don't dispatch the event
  	!elem.dispatchEvent(evt);
  };

  /**
   * @name toast
   * @description Triggers toast notification. Adds toast html to the page if missing.
   * @param {string} text - Toast notification.
   */
   const toast = (text) => {

      // only add once
      if(!document.querySelector(".toast")){

          let html = `
        <div class="toast-cont position-fixed bottom-0 p-2 m-4 end-0 align-items-center" style="z-index:10000;">
            <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
                <div class="d-flex">
                    <div class="toast-body"></div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>`;
          if(document.querySelector('body > div')) document.querySelector('body > div').insertAdjacentHTML('afterend', html);
      }

      let toast = new bootstrap.Toast(document.querySelector('.toast'));
      document.querySelector('.toast .toast-body').innerHTML = text;  
      toast.show();
  };

  var mt = function mt(val) {
    return ("" + val).length < 2 ? "0" + val : val;
  };
  var replaceQueryParam = function replaceQueryParam(param, newval, search) {
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');
    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
  };
  var getPageNumber = function getPageNumber() {
    var urlParams = new URLSearchParams(window.location.search);
    var page = urlParams.get('page') ? urlParams.get('page') : 1;
    return parseInt(page);
  };
  var getPagination = function getPagination(__, meta, cb) {
    if (typeof meta === 'undefined') {
      document.querySelector("#listing_info").innerHTML = __('no records to display');
      return;
    }
    var offset = meta.limit + meta.offset;
    if (offset > meta.total_records) offset = meta.total_records;
    document.querySelector("#listing_info").innerHTML = __("Showing %1$ to %2$ of %3$ entries", 1 + meta.offset, offset, meta.total_records);
    var pbc = Math.ceil(meta.total_records / meta.limit);
    document.querySelector("#listing_paginate").style.display = pbc < 2 ? "none" : "block";
    var page = getPageNumber();
    var html = '<ul class="pagination d-flex justify-content-end pagination-flat mb-0">';
    html += '<li class="paginate_button page-item previous" id="listing_previous"><a href="#" aria-controls="order-listing" data-type="prev" data-page="0" tabindex="0" class="page-link"><span aria-hidden="true">&laquo;</span></li>';
    var i = 0;
    while (i < pbc) {
      i++;
      if (i >= page - 3 && i <= page || i <= page + 3 && i >= page) {
        html += '<li class="paginate_button page-item ' + (page == i ? 'active' : '') + '"><a href="#" aria-controls="order-listing" data-type="page" data-page="' + i + '" tabindex="0" class="page-link">' + (page == i ? i : i) + '</a></li>';
      }
    }
    html += '<li class="paginate_button page-item next" id="order-listing_next"><a href="#" aria-controls="order-listing" data-type="next" data-page="2" tabindex="0" class="page-link"><span aria-hidden="true">&raquo;</span></a></li>';
    html += '</ul>';
    document.querySelector("#listing_paginate").innerHTML = html;
    var page_link = document.querySelectorAll(".page-link");
    var _iterator = _createForOfIteratorHelper(page_link),
      _step;
    try {
      var _loop = function _loop() {
        var l = _step.value;
        l.addEventListener('click', function (e) {
          var p = parseInt(getPageNumber());
          var ps = p;
          switch (l.dataset.type) {
            case 'prev':
              p -= 1;
              if (p < 1) p = 1;
              break;
            case 'page':
              p = l.dataset.page;
              break;
            case 'next':
              p += 1;
              if (p > pbc) p = pbc;
              break;
          }
          if (window.history.replaceState) {
            var str = window.location.search;
            str = replaceQueryParam('page', p, str);
            window.history.replaceState("kenzap-cloud", document.title, window.location.pathname + str);
          }
          if (ps != p) cb();
          e.preventDefault();
          return false;
        });
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  var stockBadge = function stockBadge(_this, inventory) {
    if (inventory.stock_amount <= 0) {
      return '<div data-stock="out" class="badge bg-danger text-light fw-light">' + __html('Out of stock') + '</div>';
    } else if (inventory.stock_warning >= inventory.stock_amount) {
      return '<div data-stock="low" class="badge bg-warning text-dark fw-light">' + __html('Low stock') + '</div>';
    } else {
      return '<div data-stock="in" class="badge bg-success text-light fw-light">' + __html('In stock') + '</div>';
    }
  };
  var priceFormat = function priceFormat(_this, price) {
    price = makeNumber(price);
    price = (Math.round(parseFloat(price) * 100) / 100).toFixed(2);
    switch (_this.state.settings.currency_symb_loc) {
      case 'left':
        price = _this.state.settings.currency_symb + ' ' + price;
        break;
      case 'right':
        price = price + _this.state.settings.currency_symb;
        break;
    }
    return price;
  };
  var makeNumber = function makeNumber(price) {
    price = price ? price : 0;
    price = parseFloat(price);
    price = Math.round(price * 100) / 100;
    return price;
  };
  var formatTime = function formatTime(__, timestamp) {
    var d = new Date(parseInt(timestamp) * 1000);
    return d.toLocaleDateString();
  };
  var onlyNumbers = function onlyNumbers(sel, chars) {
    if (!document.querySelector(sel)) return;
    chars.push.apply(chars, [9, 37, 38, 39, 40, 98, 100, 102, 104]);
    _toConsumableArray(document.querySelectorAll(sel)).forEach(function (el) {
      el.addEventListener('keydown', function (e) {
        var key = e.key.toLowerCase();
        if (key == 'control' || key == 'meta') {
          window[key] = true;
        }
        console.log(key.length + " / " + isNumber + " / " + e.which);
        var isNumber = key >= '0' && key <= '9';
        if ((window['control'] || window['meta']) && [86, 88, 65, 67, 90].includes(e.which)) {
          console.log("pushing");
          return true;
        }
        if (!isNumber && !chars.includes(e.which)) {
          e.preventDefault();
          return false;
        }
      });
      el.addEventListener('keyup', function (e) {
        var key = e.key.toLowerCase();
        if (key == 'control' || key == 'meta') {
          window[key] = false;
        }
      });
    });
  };
  var simpleTags = function simpleTags(element) {
    if (!element) {
      throw new Error("DOM Element is undifined! Please choose HTML target element.");
    }
    var DOMParent = element;
    var DOMList;
    var DOMInput;
    var dataAttribute;
    var arrayOfList;
    function DOMCreate() {
      var ul = document.createElement("ul");
      var input = document.createElement("input");
      input.setAttribute('placeholder', __html('new tag'));
      DOMParent.appendChild(ul);
      DOMParent.appendChild(input);
      DOMList = DOMParent.firstElementChild;
      DOMInput = DOMParent.lastElementChild;
    }
    function DOMRender() {
      DOMList.innerHTML = "";
      arrayOfList.forEach(function (currentValue, index) {
        if (currentValue) {
          var li = document.createElement("li");
          li.innerHTML = "".concat(currentValue, " <a>&times;</a>");
          li.querySelector("a").addEventListener("click", function () {
            onDelete(index);
          });
          DOMList.appendChild(li);
        }
      });
      setAttribute();
    }
    function onKeyUp() {
      DOMInput.addEventListener("keyup", function (event) {
        var text = this.value.trim();
        if (text.includes(",") || event.keyCode === 13) {
          if (text.replace(",", "") !== "") {
            arrayOfList.push(text.replace(",", ""));
          }
          this.value = "";
        }
        DOMRender();
      });
    }
    function onDelete(id) {
      arrayOfList = arrayOfList.filter(function (currentValue, index) {
        if (index === id) {
          return false;
        }
        return currentValue;
      });
      DOMRender();
    }
    function getAttribute() {
      dataAttribute = DOMParent.getAttribute("data-simple-tags");
      dataAttribute = dataAttribute.split(",");
      arrayOfList = dataAttribute.map(function (currentValue) {
        return currentValue.trim();
      });
    }
    function setAttribute() {
      DOMParent.setAttribute("data-simple-tags", arrayOfList.toString());
    }
    getAttribute();
    DOMCreate();
    DOMRender();
    onKeyUp();
  };
  var initFooter = function initFooter(_this) {
    var left = __html('E-commerce 2.1.1 by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>');
    var right = "";
    document.querySelector("footer .row").innerHTML = "\n    <div class=\"d-sm-flex justify-content-center justify-content-sm-between\">\n        <span class=\"text-muted text-center text-sm-left d-block d-sm-inline-block\">".concat(left, "</span>\n        <span class=\"float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted\">").concat(right, "</span>\n    </div>");
  };

  var inventoryListContent = function inventoryListContent(__) {
    return "\n    <div class=\"container\">\n\n        <div class=\"d-md-flex justify-content-between bd-highlight mb-3\">\n            <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n            <button class=\"btn btn-primary btn-add mt-3 mb-1 mt-md-0 mb-md-0\" type=\"button\">".concat(__('Add item'), "</button>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card\">\n                <div class=\"card border-white shadow-sm border-0\">\n                    <div class=\"card-body p-0\">\n                        <div class=\"no-footer\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <div class=\"table-responsive\">\n                                        <table class=\"table table-hover table-borderless align-middle table-striped table-p-list mb-0\" >\n                                            <thead>\n\n                                            </thead>\n                                            <tbody>\n\n                                            </tbody>\n                                        </table>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"row my-2\">\n                                <div class=\"col-sm-12 col-md-5 d-flex align-items-center\">\n                                    <div class=\"dataTables_info mx-2 text-secondary fw-lighter \" id=\"listing_info\" role=\"status\" aria-live=\"polite\">&nbsp;</div>\n                                </div>\n                                <div class=\"col-sm-12 col-md-7\">\n                                    <div class=\"dataTables_paginate paging_simple_numbers m-2\" id=\"listing_paginate\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"modal\" tabindex=\"-1\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <h3 class=\"modal-title\"></h3>\n                    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                </div>\n                <div class=\"modal-body\">\n\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                    <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n                </div>\n            </div>\n        </div>\n    </div>\n    \n    ");
  };

  var inventoryEdit = function inventoryEdit(_this) {
    var inventory = {
      img: [],
      price: 0,
      price_per_unit: 0,
      price_per_unit_prev: 0,
      status: "1",
      tags: [],
      stock_amount: 0,
      stock_unit: "kg",
      stock_warning: "",
      title: "",
      write_off: {
        type: "never",
        dof: [],
        time: '0',
        amount: 0
      },
      updated: 0
    };
    if (_this.state.action == 'edit' && _this.state.id) {
      inventory = _this.state.response.inventory.filter(function (el) {
        return el._id == _this.state.id;
      })[0];
    }
    var modal = document.querySelector(".modal");
    var modalCont = new bootstrap.Modal(modal);
    modal.querySelector(".modal-dialog").classList.add('modal-fullscreen');
    modal.querySelector(".modal-title").innerHTML = _this.state.action == 'edit' ? __html('Edit Item') : __html('Add Item');
    modal.querySelector('.modal-footer').innerHTML = "\n        <button type=\"button\" class=\"btn btn-primary btn-modal btn-add-item\">".concat(_this.state.action == 'edit' ? __html('Update') : __html('Add'), "</button>\n        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">").concat(__html('Cancel'), "</button>\n        <button class=\"btn btn-danger btn-remove-item btn-lg- ").concat(_this.state.action == 'edit' ? '' : 'd-none', "\" type=\"button\" title=\"").concat(__html('Remove application.'), "\"><span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"><path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/><path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/></svg></span></button>\n    ");
    var modalHTml = "\n\n    <h4 class=\"card-title mb-lg-4 mt-sm-3 mt-3\">".concat(__html('Item'), "</h4>\n    <div class=\"row\">\n        <div class=\"col-lg-6\">\n            <div class=\"form-group row mb-lg-3 mt-1\">\n            <label class=\"col-sm-3 col-form-label\">").concat(__html('Title'), "</label>\n            <div class=\"col-sm-9\">\n                <input id=\"title\" type=\"text\" class=\"form-control inp\" name=\"title\" data-type=\"emails\" value=\"").concat(inventory.title, "\"  autocomplete=\"off\">\n                <p class=\"form-text\">").concat(__html('Item description.'), "</p>\n            </div>\n            </div>\n        </div>\n        <div class=\"col-lg-6\">\n            <div class=\"form-group row mb-lg-3 mt-1\">\n            <label class=\"col-sm-3 col-form-label\">").concat(__html('Price per 1 '), "<span id=\"price_stock_unit\">").concat(inventory.stock_unit, "</span></label>\n            <div class=\"col-sm-9\">\n                <div class=\"input-group\">\n                    <input id=\"price_per_unit\" type=\"text\" class=\"form-control inp\" name=\"price_per_unit\" aria-label=\"Current stock amount\" aria-describedby=\"basic-addon1\" value=\"").concat(inventory.price_per_unit ? inventory.price_per_unit : 0, "\" autocomplete=\"off\">\n                    <span class=\"input-group-text\" id=\"price_curr\">").concat(html(_this.state.settings.currency_symb ? _this.state.settings.currency_symb : ''), "</span>\n                </div>\n                <p class=\"form-text\">").concat(__html('Price per one stock measurement unit.'), "</p>\n            </div>\n            </div>\n        </div>\n    </div>\n\n    <h4 class=\"card-title mb-lg-4 mt-sm-0 mt-3\">").concat(__html('Stock'), "</h4>\n    <div class=\"row\">\n        <div class=\"col-lg-6\">\n            <div class=\"form-group row mb-lg-3 mt-1\">\n            <label class=\"col-sm-3 col-form-label\">").concat(__html('Stock unit'), "</label>\n            <div class=\"col-sm-9\">\n                <select id=\"stock_unit\" class=\"form-select inp\" name=\"stock_unit\" data-type=\"select\">\n                    <option value=\"g\" ").concat(inventory.stock_unit == 'g' ? 'selected' : '', ">").concat(__html('g'), "</option>\n                    <option value=\"kg\" ").concat(inventory.stock_unit == 'kg' ? 'selected' : '', ">").concat(__html('kg'), "</option>\n                    <option value=\"set\" ").concat(inventory.stock_unit == 'set' ? 'selected' : '', ">").concat(__html('set'), "</option>\n                    <option value=\"pc\" ").concat(inventory.stock_unit == 'pc' ? 'selected' : '', ">").concat(__html('piece'), "</option>\n                    <option value=\"l\" ").concat(inventory.stock_unit == 'l' ? 'selected' : '', ">").concat(__html('liter'), "</option>\n                </select>\n                <p class=\"form-text\">").concat(__html('Stock measurement unit for inventory deductions.'), "</p>\n            </div>\n            </div>\n        </div>\n        <div class=\"col-lg-6\">\n            <div class=\"form-group row mb-lg-3 mt-1\">\n            <label class=\"col-sm-3 col-form-label\">").concat(__html('Current stock'), "</label>\n            <div class=\"col-sm-9\">\n                <div class=\"input-group\">\n                    <input id=\"stock_amount\" type=\"text\" class=\"form-control inp\" name=\"stock_amount\" aria-label=\"Current stock amount\" aria-describedby=\"basic-addon1\" value=\"").concat(inventory.stock_amount, "\" autocomplete=\"off\">\n                    <span class=\"input-group-text\" id=\"stock_amount_unit\">").concat(inventory.stock_unit, "</span>\n                </div>\n                <p class=\"form-text\">").concat(__html('Current stock amount.'), "</p>\n            </div>\n            </div>\n        </div>\n        <div class=\"col-lg-6\">\n            <div class=\"form-group row mb-lg-3 mt-1\">\n            <label class=\"col-sm-3 col-form-label\">").concat(__html('Low stock'), "</label>\n            <div class=\"col-sm-9\">\n                <div class=\"input-group\">\n                    <input id=\"stock_warning\" type=\"text\" class=\"form-control inp\" name=\"stock_warning\" aria-label=\"Low stock warning\" aria-describedby=\"basic-addon2\" value=\"").concat(inventory.stock_warning, "\" autocomplete=\"off\">\n                    <span class=\"input-group-text\" id=\"stock_warning_unit\">").concat(inventory.stock_unit, "</span>\n                </div>\n                <p class=\"form-text\">").concat(__html('Trigger alert when stock drops below this value.'), "</p>\n            </div>\n            </div>\n        </div>\n    </div>\n\n    <h4 class=\"card-title mb-lg-4 mt-sm-0 mt-3\">").concat(__html('Write-off'), "</h4>\n    <div class=\"row\">\n        <div class=\"col-lg-6\">\n            <div class=\"form-group row mb-lg-3 mt-1\">\n            <label class=\"col-sm-3 col-form-label\">").concat(__html('Auto deduction'), "</label>\n            <div class=\"col-sm-9\">\n                <div class=\"input-group\">\n                    <select id=\"write_off\" class=\"form-select inp\" name=\"write_off\" data-type=\"select\">\n                        <option value=\"never\" ").concat(inventory.write_off.type == 'never' ? 'selected' : '', ">").concat(__html('Never'), "</option>\n                        <option value=\"daily\" ").concat(inventory.write_off.type == 'daily' ? 'selected' : '', ">").concat(__html('Daily'), "</option>\n                        <option value=\"ai\" ").concat(inventory.write_off.type == 'ai' ? 'selected' : '', ">").concat(__html('AI-driven'), "</option>\n                    </select>\n                </div>\n                <p class=\"form-text\">").concat(__html('Trigger alert when stock drops below this value.'), "</p>\n            </div>\n            </div>\n            <div class=\"form-group row mb-lg-3 mt-1 write_off_cont ").concat(inventory.write_off.type == 'never' ? 'd-none' : '', "\">\n                <label class=\"col-sm-3 col-form-label\">").concat(__html('Days of week'), "</label>\n                <div class=\"col-sm-9\">\n                    <div class=\"form-check\">\n                        <label for=\"week-monday\" class=\"form-check-label form-label\">\n                            <input id=\"week-monday\" type=\"checkbox\" class=\"form-check-input \" ").concat('', " value=\"1\">\n                            ").concat(__html('Monday'), "\n                        </label>\n                    </div>\n                    <div class=\"form-check\">\n                        <label for=\"week-tuesday\" class=\"form-check-label form-label\">\n                            <input id=\"week-tuesday\" type=\"checkbox\" class=\"form-check-input\" ").concat('', " value=\"1\">\n                            ").concat(__html('Tuesday'), "\n                        </label>\n                    </div>\n                    <div class=\"form-check\">\n                        <label id=\"week-wednesday\" class=\"form-check-label form-label\">\n                            <input id=\"week-wednesday\" type=\"checkbox\" class=\"form-check-input\" ").concat('', " value=\"1\">\n                            ").concat(__html('Wednesday'), "\n                        </label>\n                    </div>\n                    <div class=\"form-check\">\n                        <label id=\"week-thursday\" class=\"form-check-label form-label\">\n                            <input id=\"week-thursday\" type=\"checkbox\" class=\"form-check-input\" ").concat('', " value=\"1\">\n                            ").concat(__html('Thursday'), "\n                        </label>\n                    </div>\n                    <div class=\"form-check\">\n                        <label id=\"week-friday\" class=\"form-check-label form-label\">\n                            <input id=\"week-friday\" type=\"checkbox\" class=\"form-check-input\" ").concat('', " value=\"1\">\n                            ").concat(__html('Friday'), "\n                        </label>\n                    </div>\n                    <div class=\"form-check\">\n                        <label id=\"week-saturday\" class=\"form-check-label form-label\">\n                            <input id=\"week-saturday\" type=\"checkbox\" class=\"form-check-input\" ").concat('', " value=\"1\">\n                            ").concat(__html('Saturday'), "\n                        </label>\n                    </div>\n                    <div class=\"form-check\">\n                        <label id=\"week-sunday\" class=\"form-check-label form-label\">\n                            <input id=\"week-sunday\" type=\"checkbox\" class=\"form-check-input\" ").concat('', " value=\"1\">\n                            ").concat(__html('Sunday'), "\n                        </label>\n                    </div>\n                    <p class=\"form-text\">").concat(__html('Days of the week when discount is available.'), "</p>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-lg-6 write_off_cont ").concat(inventory.write_off.type == 'never' ? 'd-none' : '', "\">\n            <div class=\"form-group row mb-lg-3 mt-1\">\n                <label class=\"col-sm-3 col-form-label\">").concat(__html('Amount'), "</label>\n                <div class=\"col-sm-9\">\n                    <div class=\"input-group\">\n                        <input id=\"write_off_amount\" type=\"text\" class=\"form-control inp\" name=\"write_off_amount\" aria-label=\"write off stock amount\" aria-describedby=\"basic-addon1\" value=\"").concat(inventory.write_off.amount ? inventory.write_off.amount : 0, "\" autocomplete=\"off\">\n                        <span class=\"input-group-text\" id=\"write_off_amount_unit\">").concat(inventory.stock_unit, "</span>\n                    </div>\n                    <p class=\"form-text\">").concat(__html('Amount to deduct from current stock amount.'), "</p>\n                </div>\n            </div>\n            <div class=\"form-group row mb-lg-3 mt-1\">\n                <label class=\"col-sm-3 col-form-label\">").concat(__html('When'), "</label>\n                <div class=\"col-sm-9\">\n                    <select id=\"write_off_time\" class=\"form-select inp\" name=\"write_off_time\" data-type=\"select\">\n                        <option value=\"2\" ").concat(inventory.write_off.time == '2' ? 'selected' : '', ">").concat(__html('2:00 AM'), "</option>\n                        <option value=\"4\" ").concat(inventory.write_off.time == '4' ? 'selected' : '', ">").concat(__html('4:00 AM'), "</option>\n                        <option value=\"6\" ").concat(inventory.write_off.time == '6' ? 'selected' : '', ">").concat(__html('6:00 AM'), "</option>\n                        <option value=\"8\" ").concat(inventory.write_off.time == '8' ? 'selected' : '', ">").concat(__html('8:00 AM'), "</option>\n                        <option value=\"10\" ").concat(inventory.write_off.time == '10' ? 'selected' : '', ">").concat(__html('10:00 AM'), "</option>\n                        <option value=\"12\" ").concat(inventory.write_off.time == '12' ? 'selected' : '', ">").concat(__html('12:00 PM'), "</option>\n                        <option value=\"14\" ").concat(inventory.write_off.time == '14' ? 'selected' : '', ">").concat(__html('14:00 PM'), "</option>\n                        <option value=\"16\" ").concat(inventory.write_off.time == '16' ? 'selected' : '', ">").concat(__html('16:00 PM'), "</option>\n                        <option value=\"18\" ").concat(inventory.write_off.time == '18' ? 'selected' : '', ">").concat(__html('18:00 PM'), "</option>\n                        <option value=\"20\" ").concat(inventory.write_off.time == '20' ? 'selected' : '', ">").concat(__html('20:00 PM'), "</option>\n                        <option value=\"22\" ").concat(inventory.write_off.time == '22' ? 'selected' : '', ">").concat(__html('22:00 PM'), "</option>\n                    </select>\n                    <p class=\"form-text\">").concat(__html('Local time when deduction is called.'), "</p>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <h4 class=\"card-title mb-lg-4 mt-sm-0 mt-3\">").concat(__html('Tagging'), "</h4>\n    <div class=\"row\">\n        <div class=\"col-lg-6\">\n            <div class=\"form-group row mb-lg-3 mt-1\">\n            <label class=\"col-sm-3 col-form-label\">").concat(__html('Tags'), "</label>\n            <div class=\"col-sm-9\">\n                <div class=\"form-group\">\n                    <div id=\"tags\" class=\"simple-tags\" data-simple-tags=\"\"></div>\n                </div>\n                <p class=\"form-text\">").concat(__html('Use tagging for inventory grouping.'), "</p>\n            </div>\n            </div>\n        </div>\n    </div>\n    ");
    modal.querySelector(".modal-body").innerHTML = modalHTml;
    modal.querySelector(".modal-body").innerHTML;
    var tags = modal.querySelector('#tags');
    if (inventory.tags) tags.setAttribute('data-simple-tags', inventory.tags);
    new simpleTags(tags);
    onlyNumbers('#price', [8, 46, 190]);
    onlyNumbers('#stock_amount', [8, 46, 190, 189, 229]);
    onlyNumbers('#stock_warning', [8, 46, 190]);
    modal.querySelector("#stock_unit").addEventListener('change', function (e) {
      e.preventDefault();
      modal.querySelector("#stock_warning_unit").innerHTML = e.currentTarget.value;
      modal.querySelector("#stock_amount_unit").innerHTML = e.currentTarget.value;
      modal.querySelector("#write_off_amount_unit").innerHTML = e.currentTarget.value;
      modal.querySelector("#price_stock_unit").innerHTML = e.currentTarget.value;
    });
    modal.querySelector("#write_off").addEventListener('change', function (e) {
      e.preventDefault();
      _toConsumableArray(modal.querySelectorAll(".write_off_cont")).forEach(function (el) {
        el.classList.add('d-none');
      });
      switch (e.currentTarget.value) {
        case 'never':
          break;
        default:
          _toConsumableArray(modal.querySelectorAll(".write_off_cont")).forEach(function (el) {
            el.classList.remove('d-none');
          });
          break;
      }
    });
    modal.querySelector(".btn-add-item").addEventListener('click', function (e) {
      e.preventDefault();
      if (modal.querySelector('.btn-add-item').dataset.loading) return false;
      var data = {
        write_off: {}
      };
      data.title = modal.querySelector("#title").value.trim();
      data.price_per_unit = parseFloat(modal.querySelector("#price_per_unit").value.trim());
      data.stock_unit = modal.querySelector("#stock_unit").value.trim();
      data.stock_amount = parseFloat(modal.querySelector("#stock_amount").value.trim());
      data.stock_warning = parseFloat(modal.querySelector("#stock_warning").value.trim());
      data.write_off.type = modal.querySelector("#write_off").value.trim();
      data.write_off.time = modal.querySelector("#write_off_time").value.trim();
      data.write_off.amount = parseFloat(modal.querySelector("#write_off_amount").value.trim());
      data.tags = [];
      _toConsumableArray(modal.querySelectorAll('#tags ul li')).forEach(function (tag) {
        data.tags.push(tag.innerHTML.replace('<a>×</a>', '').trim());
      });
      data.status = "1";
      data.img = [];
      data.cats = [];
      if (data.title.length < 2) {
        alert(__html('Please provide longer title'));
        return;
      }
      if (data.price_per_unit.length == 0) {
        data.price_per_unit = '0';
      }
      if (data.stock_amount == 0) data.stock_amount = '0';
      if (data.stock_warning.length < 2) {
        data.stock_warning = 0;
      }
      data.price_per_unit_prev = data.price_per_unit;
      var query = {
        update: {
          type: 'create',
          key: 'ecommerce-inventory',
          data: data
        }
      };
      if (_this.state.action == 'edit' && _this.state.id) {
        query.update.type = 'update';
        query.update.id = _this.state.id;
      }
      var btnHTML = modal.querySelector('.btn-add-item').innerHTML;
      modal.querySelector('.btn-add-item').dataset.loading = true;
      modal.querySelector('.btn-add-item').innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' + __html('Loading..');
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: query
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        modal.querySelector('.btn-add-item').dataset.loading = "";
        modal.querySelector('.btn-add-item').innerHTML = btnHTML;
        if (response.success) {
          modalCont.hide();
          _this.getData();
          toast(_this.state.action == 'edit' ? __html('Item updated') : __html('Item created'));
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    });
    modal.querySelector(".btn-remove-item").addEventListener('click', function (e) {
      e.preventDefault();
      if (modal.querySelector('.btn-add-item').dataset.loading) return false;
      if (!confirm(__html('Completely remove from inventory?'))) return;
      var btnHTML = modal.querySelector('.btn-remove-item').innerHTML;
      modal.querySelector('.btn-add-item').dataset.loading = true;
      modal.querySelector('.btn-remove-item').innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' + __html('Loading..');
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            product: {
              type: 'delete',
              key: 'ecommerce-inventory',
              id: _this.state.id
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        modal.querySelector('.btn-add-item').dataset.loading = "";
        modal.querySelector('.btn-add-item').innerHTML = btnHTML;
        if (response.success) {
          modalCont.hide();
          _this.getData();
          toast(__html('Item removed'));
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    });
    modalCont.show();
    if (_this.state.action != 'edit') {
      setTimeout(function () {
        return modal.querySelector("#title").focus();
      }, 100);
    }
  };

  var inventoryView = function inventoryView(_this) {
    var inventory = {
      img: [],
      price: 0,
      price_per_unit: 0,
      price_per_unit_prev: 0,
      status: "1",
      tags: [],
      stock_amount: 0,
      stock_unit: "kg",
      stock_warning: "",
      title: "",
      updated: 0
    };
    inventory = _this.state.response.inventory.filter(function (el) {
      return el._id == _this.state.id;
    })[0];
    inventory.stock_amount = parseFloat(inventory.stock_amount);
    if (!inventory.price) inventory.price = 0;
    var modal = document.querySelector(".modal");
    var modalCont = new bootstrap.Modal(modal);
    modal.querySelector(".modal-dialog").classList.add('modal-fullscreen');
    modal.querySelector(".modal-title").innerHTML = '<div class="d-flex align-items-center">' + html(inventory.title) + '<div class="fs-6 ms-2">' + stockBadge(_this, inventory) + '</div></div>';
    modal.querySelector('.modal-footer').innerHTML = "\n        <button type=\"button\" class=\"btn btn-danger btn-modal btn-deduct btn-stock-update d-none\">".concat(__html('Deduct'), "</button>\n        <button type=\"button\" class=\"btn btn-success btn-modal btn-top-up btn-stock-update d-none\">").concat(__html('Top up'), "</button>\n        <button type=\"button\" class=\"btn btn-primary btn-modal btn-settings\">").concat(__html('Settings'), "</button>\n        <button class=\"btn btn-outline-secondary remove-application btn-lg d-none\" type=\"button\" title=\"").concat(__html('Remove application.'), "\"><span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"><path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/><path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/></svg></span></button>\n        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">").concat(__html('Close'), "</button>\n    ");
    var modalHTml = "\n\n    <h4 class=\"card-title mb-lg-4 mt-sm-3 mt-3 mb-0\">".concat(__html('Live stock'), "</h4>\n    <div class=\"form-text d-flex\">\n        <div class=\"d-flex align-items-center\">\n            <div>").concat(parseFloat(inventory.stock_amount).toFixed(2), " ").concat(inventory.stock_unit, "</div>\n            <div id=\"stock_arrow\" class=\"triangle_down mx-2\"></div>\n        </div>\n        <div class=\"d-flex align-items-center ms-2\">\n            <div>").concat(priceFormat(_this, parseFloat(inventory.price_per_unit)), "</div>\n            <div id=\"price_arrow\" class=\"").concat(parseFloat(inventory.price_per_unit_prev) - parseFloat(inventory.price_per_unit) >= 0 ? 'triangle_down triangle_green' : 'triangle_up triangle_red', " mx-2\"></div>\n        </div>\n        <div class=\"d-flex align-items-center ms-2\">\n            <div>").concat(__html('5 days'), "</div>\n            <div class=\"mx-2 d-flex\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" fill=\"currentColor\" class=\"bi bi-clock-history\" viewBox=\"0 0 16 16\">\n                    <path d=\"M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z\"/>\n                    <path d=\"M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z\"/>\n                    <path d=\"M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z\"/>\n                </svg>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n            <div class=\"form-group row mb-lg-3 mt-1\"></div>\n            <div id=\"live_stock\" style=\"width: 100%; height: 320px;\"></div>\n        </div>\n    </div>\n\n    <h4 class=\"card-title mb-lg-4 mt-sm-0 mt-3\">").concat(__html('History'), "</h4>\n\n    <div class=\"row mb-4\">\n        <div class=\"col-sm-12\">\n            <div class=\"table-responsive-\">\n                <table class=\"table table-hover table-borderless align-middle table-striped table-history-list mb-0\" style=\"\">\n                    <thead>\n                        <tr>\n                            <th>\n                                ").concat(__html("Details"), "\n                            </th>\n                            <th>\n                                ").concat(__html('Amount'), "\n                            </th>\n                            <th>\n                              \n                            </th>\n                        </tr>\n                    </thead>\n                    <tbody id=\"inventory-history\">\n                        <tr>\n                            <td colspan=\"3\">\n                                ").concat(__html("Loading"), "\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"row mb-4\">\n        <div class=\"col-lg-5\">\n            <div class=\"form-group row mb-lg-3 mt-1\">\n            <label class=\"col-sm-3 col-form-label\">").concat(__html('Details'), "</label>\n            <div class=\"col-sm-9\">  \n                <input id=\"details\" type=\"text\" class=\"form-control inp mb-sm-2\" name=\"details\" aria-label=\"details\" aria-describedby=\"basic-addon-details\" value=\"\" autocomplete=\"off\">\n                <p class=\"form-text d-none\">").concat(__html('Use tagging for inventory grouping.'), "</p>\n            </div>\n            </div>\n        </div>\n        <div class=\"col-lg-5\">\n            <div class=\"form-group row mb-lg-3 mt-1\">\n            <label class=\"col-sm-3 col-form-label\">").concat(__html('Amount'), "</label>\n            <div class=\"col-sm-9\">\n                <div class=\"input-group mb-sm-2\">           \n                    <input id=\"stock_amount\" type=\"text\" class=\"form-control inp\" name=\"stock_amount\" aria-label=\"Current stock amount\" aria-describedby=\"basic-addon1\" value=\"\" autocomplete=\"off\">\n                    <span class=\"input-group-text\" id=\"stock_amount_unit\">").concat(inventory.stock_unit, "</span>\n                </div>\n                <p class=\"form-text d-none\">").concat(__html('Use tagging for inventory grouping.'), "</p>\n            </div>\n            </div>\n        </div>\n        <div class=\"col-lg-5\">\n            <div class=\"form-group row mb-lg-3 mt-1\">\n            <label class=\"col-sm-3 col-form-label\">").concat(__html('Total price'), "</label>\n            <div class=\"col-sm-9\">\n                <div class=\"input-group mb-sm-2\">           \n                    <input id=\"stock_price\" type=\"text\" class=\"form-control inp\" name=\"stock_price\" aria-label=\"Price\" aria-describedby=\"basic-addon2\" value=\"0\" autocomplete=\"off\">\n                    <span class=\"input-group-text\" id=\"price_cur\">").concat(html(_this.state.settings.currency_symb ? _this.state.settings.currency_symb : ''), "</span>\n                </div>\n                <p class=\"form-text d-none\">").concat(__html('Use tagging for inventory grouping.'), "</p>\n            </div>\n            </div>\n        </div>\n    </div>\n\n    ");
    modal.querySelector(".modal-body").innerHTML = modalHTml;
    var liveStock = function liveStock() {
      var data = google.visualization.arrayToDataTable([[__html('Day'), __html('Stock amount (' + inventory.stock_unit + ')')], [__html('-7 days'), inventory.stock_amount + 9.0], [__html('-6 days'), inventory.stock_amount + 8.1], [__html('-5 days'), inventory.stock_amount + 7.5], [__html('-4 days'), inventory.stock_amount + 6.0], [__html('-3 days'), inventory.stock_amount + 3.5], [__html('-2 days'), inventory.stock_amount + 1.5], [__html('Yesterday'), inventory.stock_amount + 0.3], [__html('Today'), inventory.stock_amount]]);
      var options = {
        vAxis: {
          title: __html('Stock amount (' + inventory.stock_unit + ')')
        },
        isStacked: true,
        legend: {
          position: 'left'
        }
      };
      var chart = new google.visualization.SteppedAreaChart(modal.querySelector('#live_stock'));
      chart.draw(data, options);
    };
    google.charts.load('current', {
      'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(liveStock);
    onlyNumbers('#stock_price', [8, 46, 190, 189, 229]);
    onlyNumbers('#stock_amount', [8, 46, 190, 189, 229]);
    modal.querySelector(".btn-settings").addEventListener('click', function (e) {
      _this.state.action = 'edit';
      modalCont.hide();
      inventoryEdit(_this);
    });
    var topupBtns = function topupBtns(e) {
      var amount = parseFloat(e.currentTarget.value);
      if (e.currentTarget.value.length == 0) {
        modal.querySelector(".btn-top-up").classList.add("d-none");
        modal.querySelector(".btn-deduct").classList.add("d-none");
        return;
      }
      if (amount < 0) {
        modal.querySelector(".btn-top-up").classList.add("d-none");
        modal.querySelector(".btn-deduct").classList.remove("d-none");
        modal.querySelector("#stock_price").setAttribute('disabled', true);
        modal.querySelector("#stock_price").value = "";
        return;
      }
      if (amount > 0) {
        modal.querySelector(".btn-top-up").classList.remove("d-none");
        modal.querySelector(".btn-deduct").classList.add("d-none");
        modal.querySelector("#stock_price").removeAttribute('disabled');
        return;
      }
    };
    modal.querySelector("#stock_amount").addEventListener('keyup', function (e) {
      topupBtns(e);
    });
    modal.querySelector("#stock_amount").addEventListener('click', function (e) {
      topupBtns(e);
    });
    _toConsumableArray(modal.querySelectorAll(".btn-stock-update")).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (modal.querySelector('.btn-stock-update').dataset.loading) return false;
        var d = new Date();
        var data = {};
        data.iid = _this.state.id;
        data.details = modal.querySelector("#details").value.trim();
        data.price = modal.querySelector("#stock_price").value.trim();
        data.stock_unit = modal.querySelector("#stock_amount_unit").innerHTML.trim();
        data.amount = parseFloat(modal.querySelector("#stock_amount").value.trim());
        data.ym = d.getFullYear() + '' + mt(d.getMonth() + 1);
        data.ymd = d.getFullYear() + '' + mt(d.getMonth() + 1) + mt(d.getDay());
        data.time = Math.round(d.getTime() / 1000);
        if (data.details.length < 2) {
          alert(__html('Please provide longer description'));
          return;
        }
        if (data.amount.length == 0) {
          alert(__html('Please enter amount'));
          return;
        }
        if (data.amount > 0 && data.price.length == 0) {
          alert(__html('Please enter price'));
          return;
        }
        if (data.price.length > 0) data.price = parseFloat(data.price);
        var query = {
          update: {
            type: 'create',
            key: 'ecommerce-inventory-history',
            data: data
          }
        };
        _this.state.btnHTML = modal.querySelector('.btn-stock-update').innerHTML;
        modal.querySelector('.btn-stock-update').dataset.loading = true;
        modal.querySelector('.btn-stock-update').innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' + __html('Loading..');
        fetch('https://api-v1.kenzap.cloud/', {
          method: 'post',
          headers: H(),
          body: JSON.stringify({
            query: query
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            updateStock(_this, inventory, data);
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          parseApiError(error);
        });
      });
    });
    var updateStock = function updateStock(_this, inventory, data) {
      if (!inventory.price) inventory.price = 0;
      var data_query = null;
      console.log(inventory);
      console.log(data);
      if (data.amount > 0) {
        data_query = {
          stock_amount: parseFloat(inventory.stock_amount) + parseFloat(data.amount),
          price_per_unit: Math.round(parseFloat(data.price) / parseFloat(data.amount) * 100) / 100,
          price_per_unit_prev: Math.round(parseFloat(inventory.price) / parseFloat(inventory.stock_amount) * 100) / 100,
          price: Math.round(parseFloat(data.price) * 100) / 100,
          price_prev: inventory.price
        };
      } else {
        data_query = {
          stock_amount: parseFloat(inventory.stock_amount) + parseFloat(data.amount)
        };
      }
      var query = {
        update: {
          type: 'update',
          id: _this.state.id,
          key: 'ecommerce-inventory',
          data: data_query
        }
      };
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: query
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          modal.querySelector('.btn-stock-update').dataset.loading = "";
          modal.querySelector('.btn-stock-update').innerHTML = _this.state.btnHTML;
          modalCont.hide();
          _this.getData();
          toast(__html('Stock updated'));
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    };
    var copyRow = function copyRow(_this, id) {
      console.log(id);
      var row = _this.state.history.filter(function (el) {
        return el._id == id;
      })[0];
      document.querySelector('#details').value = row.details;
      document.querySelector('#stock_amount').value = row.amount;
      document.querySelector('#stock_price').value = row.price;
      simulateClick(document.querySelector("#stock_amount"));
      document.querySelector("#stock_amount").focus();
      toast(__html('Row copied'));
    };
    var removeHistoryRow = function removeHistoryRow(_this, id) {
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            history: {
              type: 'delete',
              key: 'ecommerce-inventory-history',
              id: id
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          getHistory(_this);
          toast(__html('Record removed'));
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    };
    var getHistory = function getHistory(_this) {
      var limit = 10;
      var s = "";
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            history: {
              type: 'find',
              key: 'ecommerce-inventory-history',
              fields: ['_id', 'details', 'price', 'price_per_unit', 'stock_unit', 'amount', 'time', 'updated'],
              limit: limit,
              term: [{
                "field": "iid",
                "relation": "=",
                "type": "string",
                "value": _this.state.id
              }],
              offset: s.length > 0 ? 0 : getPageNumber() * limit - limit,
              search: {
                field: 'details',
                s: s
              },
              sortby: {
                field: 'created',
                order: 'DESC'
              }
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          _this.state.history = response.history;
          if (response.history.length == 0) {
            document.querySelector("#inventory-history").innerHTML = "<tr><td colspan=\"2\" class=\"form-text\">".concat(__html("No data to display."), "</td></tr>");
            return;
          }
          if (response.history) document.querySelector("#inventory-history").innerHTML = response.history.map(function (history, i) {
            return "\n                        <tr>\n                            <td data-id=\"".concat(attr(history._id), "\">\n                                ").concat(history.details, "\n                                <div class=\"form-text\">").concat(formatTime(_this, history.time), " / ").concat(priceFormat(_this, history.price), "</div>\n                            </td>\n                            <td data-id=\"").concat(attr(history._id), "\">\n                                <div class=\"fw-bold ").concat(history.amount < 0 ? 'text-danger' : 'text-success', "\">").concat((history.amount < 0 ? '' : '+') + history.amount + history.stock_unit, "</div>\n                            </td>\n                            <td class=\"text-end d-none-\">\n                                <div class=\"dropdown inventoryHistoryActionsCont\">\n                                    <svg id=\"inventoryHistoryActions").concat(i, "\" data-bs-toggle=\"dropdown\" data-boundary=\"viewport\" aria-expanded=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"bi bi-three-dots-vertical dropdown-toggle po\" viewBox=\"0 0 16 16\">\n                                        <path d=\"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\"/>\n                                    </svg>\n                                    <ul class=\"dropdown-menu\" aria-labelledby=\"inventoryHistoryActions").concat(i, "\">\n                                        <li><a class=\"dropdown-item po\" href=\"#\" data-action=\"copy\" data-id=\"").concat(attr(history._id), "\" data-index=\"").concat(i, "\">").concat(__html('Copy'), "</a></li>\n                                        <li><hr class=\"dropdown-divider\"></li>\n                                        <li><a class=\"dropdown-item po\" href=\"#\" data-action=\"remove\" data-id=\"").concat(attr(history._id), "\" data-index=\"").concat(i, "\">").concat(__html('Remove'), "</a></li>\n                                    </ul>\n                                </div>\n                            </td>\n                        </tr>");
          }).join('');
          _toConsumableArray(document.querySelectorAll(".inventoryHistoryActionsCont .dropdown-item")).forEach(function (row) {
            row.addEventListener("click", function (e) {
              switch (e.currentTarget.dataset.action) {
                case 'copy':
                  copyRow(_this, e.currentTarget.dataset.id);
                  break;
                case 'remove':
                  if (!confirm(__html('Remove this record?'))) return;
                  removeHistoryRow(_this, e.currentTarget.dataset.id);
                  break;
              }
            });
          });
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    };
    getHistory(_this);
    modalCont.show();
  };

  var categoryTable = function categoryTable(_this) {
    var modal = document.querySelector(".modal");
    _this.state.modalCont = new bootstrap.Modal(modal);
    modal.querySelector(".modal-dialog").classList.add('modal-lg');
    modal.querySelector(".modal-title").innerHTML = __html('Sort by Tag');
    modal.querySelector('.modal-footer').innerHTML = "\n        <button type=\"button\" class=\"btn btn-success btn-modal btn-add btn-inventory-add d-none\">".concat(__html('Add'), "</button>\n        <button class=\"btn btn-outline-secondary remove-application btn-lg d-none\" type=\"button\" title=\"").concat(__html('Remove application.'), "\"><span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"><path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/><path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/></svg></span></button>\n        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">").concat(__html('Close'), "</button>\n    ");
    modal.querySelector(".modal-body").innerHTML = "\n        <div class=\"row mb-4\">\n            <div class=\"col-sm-12\">\n                <div class=\"table-responsive-\">\n                    <table class=\"table table-hover table-borderless align-middle table-striped table-inventory-list mb-0\" style=\"\">\n                        <tbody id=\"category-list\">\n                            <tr>\n                                <td >\n                                    ".concat(__html("Loading"), "\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n    ");
    var loadCategories = function loadCategories(_this) {
      var tags = [];
      var limit = 250;
      var s = "";
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            inventory: {
              type: 'find',
              key: 'ecommerce-inventory',
              fields: ['_id', 'tags'],
              limit: limit,
              offset: s.length > 0 ? 0 : getPageNumber() * limit - limit,
              term: [{
                type: 'string',
                field: 'tags',
                value: '[]',
                relation: '!='
              }]
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          _this.state.inventory = response.inventory;
          if (response.inventory.length == 0) {
            document.querySelector("#category-list").innerHTML = "<tr><td colspan=\"2\" class=\"form-text\">".concat(__html("No data to display."), "</td></tr>");
            return;
          }
          console.log(response.inventory);
          response.inventory.forEach(function (inventory, i) {
            inventory.tags.forEach(function (tag, i) {
              var exists = tags.filter(function (cat) {
                return tag == cat.title;
              });
              if (exists.length == 0) tags.push({
                title: tag
              });
            });
          });
          console.log(tags);
          document.querySelector("#category-list").innerHTML = tags.map(function (tag, i) {
            return "\n                        <tr>\n                            <td class=\"add-inventory-item\" data-tag=\"".concat(attr(tag.title), "\">\n                                ").concat(html(tag.title), "\n                            </td>\n                            <td class=\"text-end d-none- add-inventory-item\" data-index=\"").concat(i, "\" data-tag=\"").concat(attr(tag.title), "\">\n                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-plus-circle text-success po\" viewBox=\"0 0 16 16\">\n                                    <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"/>\n                                    <path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"/>\n                                </svg>\n                            </td>\n                        </tr>");
          }).join('');
          _toConsumableArray(document.querySelectorAll(".add-inventory-item")).forEach(function (item) {
            item.addEventListener('click', function (el) {
              _this.state.tag = item.dataset.tag;
              _this.state.modalCont.hide();
              _this.getData();
            });
          });
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    };
    loadCategories(_this);
    _this.state.modalCont.show();
  };

  var Inventory = _createClass(function Inventory() {
    var _this = this;
    _classCallCheck(this, Inventory);
    _defineProperty(this, "getData", function () {
      if (_this.state.firstLoad) showLoader();
      var s = document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';
      var term = [];
      if (document.querySelector('.select-stock-btn')) if (document.querySelector('.select-stock-btn').dataset.key == "in") {
        term.push({
          type: 'string',
          field: 'stock_amount',
          value: 0,
          relation: '!='
        });
      }
      if (document.querySelector('.select-stock-btn')) if (document.querySelector('.select-stock-btn').dataset.key == "out") {
        term.push({
          type: 'string',
          field: 'stock_amount',
          value: 0,
          relation: '='
        });
      }
      var sort = [];
      if (document.querySelector('.select-title-btn')) if (document.querySelector('.select-title-btn').dataset.key == "title") {
        sort.push({
          field: 'title',
          order: 'ASC'
        });
      }
      if (document.querySelector('.select-title-btn')) if (document.querySelector('.select-title-btn').dataset.key == "updated") {
        sort.push({
          field: 'updated',
          order: 'DESC'
        });
      }
      if (sort.length == 0) {
        sort.push({
          field: 'title',
          order: 'ASC'
        });
      }
      var search = {};
      if (_this.state.tag) {
        console.log("tag: " + _this.state.tag);
        document.querySelector('.select-title-btn').innerHTML = __html('Tag %1$', '<span class="fw-light">' + _this.state.tag + '</span>');
        search = {
          field: 'tags',
          s: _this.state.tag
        };
      }
      if (s) {
        search = {
          field: 'title',
          s: s
        };
      }
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            user: {
              type: 'authenticate',
              fields: ['avatar'],
              token: getCookie('kenzap_token')
            },
            locale: {
              type: 'locale',
              source: ['extension'],
              key: 'ecommerce'
            },
            settings: {
              type: 'get',
              key: 'ecommerce-settings',
              fields: ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_auto_rate', 'tax_rate', 'tax_display', 'fee_calc', 'fee_percent', 'fee_display']
            },
            inventory: {
              type: 'find',
              key: 'ecommerce-inventory',
              fields: ['_id', 'id', 'img', 'status', 'tags', 'price', 'price_prev', 'price_per_unit', 'price_per_unit_prev', 'write_off', 'title', 'stock_amount', 'stock_unit', 'stock_warning', 'updated'],
              limit: _this.state.limit,
              offset: s.length > 0 ? 0 : getPageNumber() * _this.state.limit - _this.state.limit,
              search: search,
              sortby: sort,
              term: term
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        hideLoader();
        if (response.success) {
          _this.state.settings = response.settings;
          _this.state.response = response;
          initHeader(response);
          _this.html();
          _this.render(response);
          _this.initListeners();
          _this.initPagination(response);
          initFooter();
          _this.state.firstLoad = false;
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    });
    _defineProperty(this, "authUser", function (response) {
      if (response.user) {
        if (response.user.success == true) ;
      }
    });
    _defineProperty(this, "html", function () {
      if (!_this.state.firstLoad) return;
      document.querySelector('#contents').innerHTML = inventoryListContent(__);
    });
    _defineProperty(this, "render", function (response) {
      console.log(response);
      var self = _this;
      if (_this.state.firstLoad) {
        initBreadcrumbs([{
          link: link('https://dashboard.kenzap.cloud'),
          text: __html('Home')
        }, {
          link: link('/'),
          text: __html('E-commerce')
        }, {
          text: __html('Inventory')
        }]);
        document.querySelector(".table thead").innerHTML = "\n                <tr>\n                    <th class=\"align-middle text-center\">\n                        <div class=\"d-block m-auto\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19\" height=\"19\" fill=\"#212529\" class=\"bi justify-content-end bi-search\" viewBox=\"0 0 16 16\" >\n                                <path d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z\"></path>\n                            </svg>\n                        </div>\n                    </th>\n                    <th class=\"align-middle\">\n                        <div class=\"search-cont input-group input-group-sm mb-0 justify-content-start\">     \n                            <div class=\"input-group\">\n                                <input type=\"text\" placeholder=\"".concat(__html('Search inventory'), "\" class=\"form-control border-top-0 border-start-0 border-end-0 rounded-0 pe-4\" aria-label=\"").concat(__html('Search inventory'), "\" aria-describedby=\"inputGroup-sizing-sm\" style=\"max-width: 200px;\">\n                                <button type=\"button\" class=\"btn bg-transparent btn-search-clear\" style=\"margin-left: -32px; z-index: 100;\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-x-circle\" viewBox=\"0 0 16 16\">\n                                        <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"/>\n                                        <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\"/>\n                                    </svg>\n                                </button>\n                            </div>\n                        </div>\n                        <div class=\"st-opts st-table dropdown dropstart-\">\n                            <a class=\"text-black text-dark text-decoration-none fw-bolder border-0 dropdown-toggle select-title-btn\" data-key=\"key\" href=\"#\" role=\"button\" id=\"order-updated\" data-id=\"updated\" data-value=\"\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">").concat(__html('Title'), "</a>\n                            <ul class=\"dropdown-menu select-title\" aria-labelledby=\"order-title\">\n                                <li><a class=\"dppi dropdown-item\" data-key=\"title\" href=\"#\" >").concat(__html('Title'), "</a></li>\n                                <li><a class=\"dppi dropdown-item\" data-key=\"updated\" href=\"#\" >").concat(__html('Updated'), "</a></li>\n                                <li><a class=\"dppi dropdown-item\" data-key=\"tag\" href=\"#\" >").concat(__html('Tag'), "</a></li>\n                            </ul>\n                        </div>\n                    </th>\n                    <th class=\"align-middle\">\n                        <a class=\"text-black text-dark text-decoration-none fw-bolder border-0 dropdown-toggle select-stock-btn\" href=\"#\" data-key=\"\" role=\"button\" id=\"order-updated\" data-id=\"updated\" data-value=\"\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">").concat(__html('All'), "</a>\n                        <ul class=\"dropdown-menu select-stock\" aria-labelledby=\"order-stock\">\n                            <li><a class=\"dppi dropdown-item\" data-key=\"\" href=\"#\" >").concat(__html('All'), "</a></li>\n                            <li><a class=\"dppi dropdown-item\" data-key=\"in\" href=\"#\" >").concat(__html('In stock'), "</a></li>\n                            <li><a class=\"dppi dropdown-item d-none\" data-key=\"low\" href=\"#\" >").concat(__html('Low stock'), "</a></li>\n                            <li><a class=\"dppi dropdown-item\" data-key=\"out\" href=\"#\" >").concat(__html('Out of stock'), "</a></li>\n                        </ul>\n                    </th>\n                    <th class=\"align-middle d-none d-sm-table-cell\">\n                        ").concat(__html("Price"), "\n                    </th>\n                    <th class=\"align-middle d-none d-sm-table-cell\">\n                        ").concat(__html('Updated'), "\n                    </th>\n                    <th class=\"d-none\"></th>\n                </tr>");
      }
      if (response.inventory.length == 0) {
        document.querySelector(".table tbody").innerHTML = "<tr><td colspan=\"6\" class=\"form-text\">".concat(__html("No items to display."), "</td></tr>");
        return;
      }
      var sid = getSiteId();
      var list = '';
      for (var i in response.inventory) {
        if (!response.inventory[i].stock_warning) response.inventory[i].stock_warning = 0;
        response.inventory[i].stock_warning = parseFloat(response.inventory[i].stock_warning);
        response.inventory[i].stock_amount = parseFloat(response.inventory[i].stock_amount);
        var img = 'https://cdn.kenzap.com/loading.png';
        if (typeof response.inventory[i].img === 'undefined') response.inventory[i].img = [];
        if (response.inventory[i].img[0]) img = CDN + '/S' + sid + '/product-' + response.inventory[i]._id + '-1-100x100.jpeg?' + response.inventory[i].updated;
        list += "\n                <tr>\n                    <td>\n                        <div class=\"timgc view-item\" data-id=\"".concat(attr(response.inventory[i]._id), "\">\n                            <a href=\"#\"><img src=\"").concat(img, "\" data-srcset=\"").concat(img, "\" class=\"img-fluid rounded\" alt=\"").concat(__attr("Product placeholder"), "\" srcset=\"").concat(img, "\" ></a>\n                        </div>\n                    </td>\n                    <td class=\"destt view-item\" data-id=\"").concat(attr(response.inventory[i]._id), "\" style=\"max-width:250px;min-width:120px;\">\n                        <div class=\"my-1\"> \n                            <a class=\"text-body\" href=\"#\" >").concat(response.inventory[i].title, "</a>\n                            <div class=\"form-text form-text d-flex fst-italic my-0\">\n                                <div class=\"d-flex align-items-center\">\n                                    <div>").concat(parseFloat(response.inventory[i].stock_amount).toFixed(2), " ").concat(response.inventory[i].stock_unit, "</div>\n                                    <div id=\"stock_arrow\" class=\"triangle_down mx-2\"></div>\n                                </div>\n                                <div class=\"d-flex align-items-center ms-1\">\n                                    <div>").concat(priceFormat(self, parseFloat(response.inventory[i].price_per_unit)), "</div>\n                                    <div id=\"price_arrow\" class=\"").concat(parseFloat(response.inventory[i].price_per_unit_prev) - parseFloat(response.inventory[i].price_per_unit) > 0 ? 'triangle_down triangle_green' : '', " ").concat(parseFloat(response.inventory[i].price_per_unit_prev) - parseFloat(response.inventory[i].price_per_unit) < 0 ? 'triangle_up triangle_red' : '', " mx-2\"></div>\n                                </div>\n                            </div>\n                        </div>\n                    </td>\n                    <td>\n                        <span>").concat(stockBadge(self, response.inventory[i]), "</span>\n                    </td>\n                    <td class=\"d-none d-sm-table-cell\">\n                        <span>").concat(priceFormat(self, response.inventory[i].price), "</span>\n                    </td>\n                    <td class=\"d-none d-sm-table-cell\">\n                        <span>").concat(formatTime(__, response.inventory[i].updated), "</span>\n                    </td>\n                    <td class=\"text-end d-none\">\n\n                    </td>\n                </tr>");
      }
      document.querySelector(".table tbody").innerHTML = list;
      if (response.inventory.length < 2) {
        document.querySelector(".table tbody").style.height = "150px";
      } else {
        document.querySelector(".table tbody").style.height = "auto";
      }
    });
    _defineProperty(this, "initListeners", function () {
      onClick('.view-item', function (e) {
        _this.viewItem(e);
      });
      onClick('.table-p-list .bi-search', _this.listeners.searchInventoryActivate);
      onClick('.table-p-list .btn-search-clear', _this.listeners.searchInventoryDeactivate);
      onClick('.table-p-list .inventoryActionsCont .dropdown-item', _this.listeners.tableAction);
      onClick('.select-stock a', _this.listeners.stockSort);
      onClick('.select-title a', _this.listeners.titleSort);
      if (!_this.state.firstLoad) return;
      onClick('.btn-add', _this.addItem);
    });
    _defineProperty(this, "listeners", {
      titleSort: function titleSort(e) {
        e.preventDefault();
        _this.state.tag = "";
        if (e.currentTarget.dataset.key == 'tag') {
          categoryTable(_this);
        } else {
          document.querySelector('.select-title-btn').innerHTML = e.currentTarget.innerHTML;
          document.querySelector('.select-title-btn').dataset.key = e.currentTarget.dataset.key;
          _this.getData();
        }
      },
      stockSort: function stockSort(e) {
        e.preventDefault();
        document.querySelector('.select-stock-btn').innerHTML = e.currentTarget.innerHTML;
        document.querySelector('.select-stock-btn').dataset.key = e.currentTarget.dataset.key;
        _this.getData();
      },
      searchInventoryActivate: function searchInventoryActivate(e) {
        e.preventDefault();
        document.querySelector('.table-p-list thead tr th:nth-child(2) .st-table').style.display = 'none';
        document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'flex';
        document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont input').focus();
        onKeyUp('.table-p-list thead tr th:nth-child(2) .search-cont input', _this.listeners.searchInventory);
      },
      searchInventoryDeactivate: function searchInventoryDeactivate(e) {
        e.preventDefault();
        document.querySelector('.table-p-list thead tr th:nth-child(2) .st-table').style.display = 'block';
        document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'none';
        document.querySelector('.search-cont input').value = "";
        setTimeout(function () {
          _this.getData();
        }, 500);
      },
      tableAction: function tableAction(e) {
        e.preventDefault();
        _this.state.id = e.currentTarget.dataset.id;
        switch (e.currentTarget.dataset.action) {
          case 'edit':
            _this.editItem(e);
            break;
        }
      },
      searchInventory: function searchInventory(e) {
        e.preventDefault();
        _this.getData();
      }
    });
    _defineProperty(this, "viewItem", function (e) {
      _this.state.id = e.currentTarget.dataset.id;
      inventoryView(_this);
    });
    _defineProperty(this, "editItem", function (e) {
      _this.state.action = 'edit';
      inventoryEdit(_this);
    });
    _defineProperty(this, "addItem", function (e) {
      _this.state.action = 'add';
      inventoryEdit(_this);
    });
    _defineProperty(this, "initPagination", function (response) {
      getPagination(__, response.meta, _this.getData);
    });
    _defineProperty(this, "initFooter", function () {
      initFooter(__html('Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>'));
    });
    this.state = {
      firstLoad: true,
      settings: {},
      limit: 50
    };
    this.getData();
  });
  new Inventory();

})();
//# sourceMappingURL=index.js.map
