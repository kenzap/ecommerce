
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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
  var formatStatus = function formatStatus(__, st) {
    st = parseInt(st);
    switch (st) {
      case 0:
        return '<div class="badge bg-warning text-dark fw-light">' + __('Draft') + '</div>';
      case 1:
        return '<div class="badge bg-primary fw-light">' + __('Published') + '</div>';
      case 3:
        return '<div class="badge bg-secondary fw-light">' + __('Unpublished') + '</div>';
      default:
        return '<div class="badge bg-secondary fw-light">' + __('Drafts') + '</div>';
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
  var initFooter = function initFooter(_this) {
    var left = __html('E-commerce 2.1.1 by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>');
    var right = "";
    document.querySelector("footer .row").innerHTML = "\n    <div class=\"d-sm-flex justify-content-center justify-content-sm-between\">\n        <span class=\"text-muted text-center text-sm-left d-block d-sm-inline-block\">".concat(left, "</span>\n        <span class=\"float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted\">").concat(right, "</span>\n    </div>");
  };

  var productListContent = function productListContent() {
    return "\n    <div class=\"container\">\n\n        <div class=\"d-md-flex justify-content-between bd-highlight mb-3\">\n            <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n            <button class=\"btn btn-primary btn-add mt-3 mb-1 mt-md-0 mb-md-0\" type=\"button\">".concat(__html('Add product'), "</button>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card\">\n                <div class=\"card border-white shadow-sm border-0\">\n                    <div class=\"card-body p-0\">\n                        <div class=\"no-footer\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <div class=\"table-responsive\">\n                                        <table class=\"table table-hover table-borderless align-middle table-striped table-p-list mb-0\" style=\"min-width: 800px;\">\n                                            <thead>\n\n                                            </thead>\n                                            <tbody>\n\n                                            </tbody>\n                                        </table>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"row my-2\">\n                                <div class=\"col-sm-12 col-md-5 d-flex align-items-center\">\n                                    <div class=\"dataTables_info mx-2 text-secondary fw-lighter \" id=\"listing_info\"\n                                        role=\"status\" aria-live=\"polite\">&nbsp;</div>\n                                </div>\n                                <div class=\"col-sm-12 col-md-7\">\n                                    <div class=\"dataTables_paginate paging_simple_numbers m-2\" id=\"listing_paginate\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"modal\" tabindex=\"-1\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <h5 class=\"modal-title\"></h5>\n                    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                </div>\n                <div class=\"modal-body\">\n\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                    <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"position-fixed bottom-0 p-2 m-4 end-0 align-items-center\">\n        <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\"\n            aria-atomic=\"true\" data-bs-delay=\"3000\">\n            <div class=\"d-flex\">\n                <div class=\"toast-body\"></div>\n                <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\"\n                    aria-label=\"Close\"></button>\n            </div>\n        </div>\n    </div>\n    \n    ");
  };

  var ProductList = _createClass(function ProductList() {
    var _this = this;
    _classCallCheck(this, ProductList);
    _defineProperty(this, "getData", function () {
      if (_this.state.firstLoad) showLoader();
      var s = document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';
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
            products: {
              type: 'find',
              key: 'ecommerce-product',
              fields: ['_id', 'id', 'img', 'status', 'price', 'title', 'updated'],
              limit: _this.state.limit,
              offset: s.length > 0 ? 0 : getPageNumber() * _this.state.limit - _this.state.limit,
              search: {
                field: 'title',
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
        hideLoader();
        if (response.success) {
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
      document.querySelector('#contents').innerHTML = productListContent();
    });
    _defineProperty(this, "render", function (response) {
      if (_this.state.firstLoad) {
        initBreadcrumbs([{
          link: link('https://dashboard.kenzap.cloud'),
          text: __html('Home')
        }, {
          link: link('/'),
          text: __html('E-commerce')
        }, {
          text: __html('Product list')
        }]);
        document.querySelector(".table thead").innerHTML = "\n                <tr>\n                    <th>\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"#212529\" class=\"bi justify-content-end bi-search mb-1\" viewBox=\"0 0 16 16\" >\n                            <path d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z\"></path>\n                        </svg>\n                    </th>\n                    <th>\n                        <div class=\"search-cont input-group input-group-sm mb-0 justify-content-start\">     \n                            <input type=\"text\" placeholder=\"".concat(__html('Search products'), "\" class=\"form-control border-top-0 border-start-0 border-end-0 rounded-0\" aria-label=\"").concat(__html('Search products'), "\" aria-describedby=\"inputGroup-sizing-sm\" style=\"max-width: 200px;\">\n                        </div>\n                        <span>").concat(__html("Title"), "</span>\n                    </th>\n                    <th>").concat(__html("Status"), "</th>\n                    <th>").concat(__html("Price"), "</th>\n                    <th>").concat(__html("Last change"), "</th>\n                    <th></th>\n                </tr>");
      }
      if (response.products.length == 0) {
        document.querySelector(".table tbody").innerHTML = "<tr><td colspan=\"6\">".concat(__html("No products to display."), "</td></tr>");
        return;
      }
      var sid = getSiteId();
      _this.state.settings = response.settings;
      var list = '';
      for (var i in response.products) {
        var img = 'https://cdn.kenzap.com/loading.png';
        if (typeof response.products[i].img === 'undefined') response.products[i].img = [];
        if (response.products[i].img[0]) img = CDN + '/S' + sid + '/product-' + response.products[i]._id + '-1-100x100.jpeg?' + response.products[i].updated;
        list += "\n                <tr>\n                    <td>\n                        <div class=\"timgc\">\n                            <a href=\"".concat(link('/product-edit/?id=' + response.products[i]._id), "\"><img src=\"").concat(img, "\" data-srcset=\"").concat(img, "\" class=\"img-fluid rounded\" alt=\"").concat(__attr("Product placeholder"), "\" srcset=\"").concat(img, "\" ></a>\n                        </div>\n                    </td>\n                    <td class=\"destt\" style=\"max-width:250px;min-width:250px;\">\n                        <div class=\"my-1\"> \n                            <a class=\"text-body\" href=\"").concat(link('/product-edit/?id=' + response.products[i]._id), "\" >").concat(response.products[i].title, "<i style=\"color:#9b9b9b;font-size:15px;margin-left:8px;\" title=\"").concat(__attr("Edit product"), "\" class=\"mdi mdi-pencil menu-icon edit-page\"></i></a>\n                        </div>\n                    </td>\n                    <td>\n                        <span>").concat(formatStatus(__, response.products[i].status), "</span>\n                    </td>\n                    <td>\n                        <span>").concat(priceFormat(_this, response.products[i].price), "</span>\n                    </td>\n                    <td>\n                        <span>").concat(formatTime(__, response.products[i].updated), "</span>\n                    </td>\n                    <td class=\"text-end\"> \n                        <a href=\"#\" data-id=\"").concat(response.products[i]._id, "\" class=\"remove-product text-danger me-2\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\">\n                                <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/>\n                                <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/>\n                            </svg>\n                        </a>\n                        <i title=\"").concat(__attr("Remove this product"), "\" data-key=\"").concat(response.products[i].id, "\" class=\"mdi mdi-trash-can-outline list-icon remove-product\"></i>\n                    </td>\n                </tr>");
      }
      document.querySelector(".table tbody").innerHTML = list;
    });
    _defineProperty(this, "initListeners", function () {
      onClick('.remove-product', _this.listeners.removeProduct);
      onClick('.table-p-list .bi-search', _this.listeners.searchProductsActivate);
      if (!_this.state.firstLoad) return;
      onClick('.btn-add', _this.addProduct);
      onClick('.btn-modal', _this.listeners.modalSuccessBtn);
    });
    _defineProperty(this, "listeners", {
      removeProduct: function removeProduct(e) {
        e.preventDefault();
        var c = confirm(__html('Completely remove this product?'));
        if (!c) return;
        fetch('https://api-v1.kenzap.cloud/', {
          method: 'post',
          headers: H(),
          body: JSON.stringify({
            query: {
              product: {
                type: 'delete',
                key: 'ecommerce-product',
                id: e.currentTarget.dataset.id
              }
            }
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            _this.getData();
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          parseApiError(error);
        });
      },
      searchProductsActivate: function searchProductsActivate(e) {
        e.preventDefault();
        document.querySelector('.table-p-list thead tr th:nth-child(2) span').style.display = 'none';
        document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'flex';
        document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont input').focus();
        onKeyUp('.table-p-list thead tr th:nth-child(2) .search-cont input', _this.listeners.searchProducts);
      },
      searchProducts: function searchProducts(e) {
        e.preventDefault();
        _this.getData();
      },
      modalSuccessBtn: function modalSuccessBtn(e) {
        _this.listeners.modalSuccessBtnFunc(e);
      },
      modalSuccessBtnFunc: null
    });
    _defineProperty(this, "addProduct", function (e) {
      var modal = document.querySelector(".modal");
      var modalCont = new bootstrap.Modal(modal);
      modal.querySelector(".modal-title").innerHTML = __html('Add Product');
      modal.querySelector(".btn-primary").innerHTML = __html('Add');
      modal.querySelector(".btn-secondary").innerHTML = __html('Cancel');
      var title = '',
        sdesc = '',
        price = '';
      var modalHTml = "\n        <div class=\"form-cont\">\n            <div class=\"form-group mb-3\">\n                <label for=\"p-title\" class=\"form-label\">".concat(__html('Title'), "</label>\n                <input type=\"text\" class=\"form-control\" id=\"p-title\" autocomplete=\"off\" placeholder=\"\" value=\"").concat(title, "\">\n            </div>\n            <div class=\"form-group mb-3\">\n                <label for=\"p-sdesc\" class=\"form-label\">").concat(__html('Short description'), "</label>\n                <input type=\"text\" class=\"form-control\" id=\"p-sdesc\" autocomplete=\"off\" placeholder=\"\" value=\"").concat(sdesc, "\">\n            </div>\n            <div class=\"form-group mb-3\">\n                <label for=\"p-price\" class=\"form-label\">").concat(__html('Price'), "</label>\n                <input type=\"text\" class=\"form-control\" id=\"p-price\" autocomplete=\"off\" placeholder=\"\" value=\"").concat(price, "\">\n            </div>\n        </div>");
      modal.querySelector(".modal-body").innerHTML = modalHTml;
      onlyNumbers('#p-price', [8, 46, 190]);
      _this.listeners.modalSuccessBtnFunc = function (e) {
        e.preventDefault();
        var data = {};
        data.title = modal.querySelector("#p-title").value.trim();
        data.sdesc = modal.querySelector("#p-sdesc").value.trim();
        data.price = modal.querySelector("#p-price").value.trim();
        data.status = "0";
        data.img = [];
        data.cats = [];
        if (data.title.length < 2) {
          alert(__html('Please provide longer title'));
          return;
        }
        fetch('https://api-v1.kenzap.cloud/', {
          method: 'post',
          headers: H(),
          body: JSON.stringify({
            query: {
              product: {
                type: 'create',
                key: 'ecommerce-product',
                data: data
              }
            }
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            window.location.href = link("/product-edit/?id=".concat(response.product.id));
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          parseApiError(error);
        });
      };
      modalCont.show();
      setTimeout(function () {
        return modal.querySelector("#p-title").focus();
      }, 100);
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
      limit: 10
    };
    this.getData();
  });
  new ProductList();

})();
//# sourceMappingURL=index.js.map
