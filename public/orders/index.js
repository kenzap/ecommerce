
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35732/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
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
   * @param p {String} list of parameters, to be replaced with %1$, %2$..
   * @returns {String} - text
   */
  const __$1 = (text, ...p) => {

      let match = (input, pa) => {

          pa.forEach((p, i) => { input = input.replace('%'+(i+1)+'$', p); }); 
          
          return input;
      };

      if(typeof window.i18n === 'undefined') return match(text, p);
      if(window.i18n.state.locale.values[text] === undefined) return match(text, p);

      return match(window.i18n.state.locale.values[text], p);
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

      text = __$1(text, ...p);

      return text.replace(/[&<>'"]/g, tag => (
          {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              "'": '&#39;',
              '"': '&quot;'
          } [tag]));
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
   * @name initFooter
   * @description Removes full screen three dots loader.
   * @param {string} left - Text or html code to be present on the left bottom side of screen
   * @param {string} right - Text or html code to be present on the left bottom side of screen
   */
  const initFooter = (left, right) => {

      document.querySelector("footer .row").innerHTML = `
    <div class="d-sm-flex justify-content-center justify-content-sm-between">
        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">${left}</span>
        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">${right}</span>
    </div>`;
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
   const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
      'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
      'Kenzap-Header': checkHeader(),
      'Kenzap-Token': getCookie('kenzap_token'),
      'Kenzap-Sid': spaceID(),
  };

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
  const onClick$1 = (sel, fn) => {

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
   * @name onChange
   * @description One row change event listener declaration. Works with one or many HTML selectors.
   * @param {string} sel - HTML selector, id, class, etc.
   * @param {string} fn - callback function fired on click event.
   */
  const onChange = (sel, fn) => {

      if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

          e.removeEventListener('change', fn, true);
          e.addEventListener('change', fn, true);
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
        <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">
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
  var getPageNumber = function getPageNumber() {
    var urlParams = new URLSearchParams(window.location.search);
    var page = urlParams.get('page') ? urlParams.get('page') : 1;
    return parseInt(page);
  };
  var priceFormat = function priceFormat(_this, price) {
    price = makeNumber(price);
    price = (Math.round(parseFloat(price) * 100) / 100).toFixed(2);

    switch (_this.state.settings.currency_symb_loc) {
      case 'left':
        price = _this.state.settings.currency_symb + price;
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
  var onlyNumbers = function onlyNumbers(sel, chars) {
    if (!document.querySelector(sel)) return;
    document.querySelector(sel).addEventListener('keypress', function (e) {
      if (!chars.includes(e.which) && isNaN(String.fromCharCode(e.which)) || e.which == 32 || document.querySelector(sel).value.includes(String.fromCharCode(e.which)) && chars.includes(e.which)) {
        e.preventDefault();
        return false;
      }
    });
  };
  var onClick = function onClick(sel, fn) {
    if (document.querySelector(sel)) {
      var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll(sel)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var e = _step2.value;
          e.removeEventListener('click', fn, true);
          e.addEventListener('click', fn, true);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  };
  var timeConverterAgo = function timeConverterAgo(__, now, time) {
    now = parseInt(now);
    time = parseInt(time);
    var past = now - time;
    if (past < 60) return __('moments ago');
    if (past < 3600) return parseInt(past / 60) + ' ' + __('minutes ago');
    if (past < 86400) return parseInt(past / 60 / 60) + ' ' + __('hours ago');
    var a = new Date(time * 1000);
    var months = [__('Jan'), __('Feb'), __('Mar'), __('Apr'), __('May'), __('Jun'), __('Jul'), __('Aug'), __('Sep'), __('Oct'), __('Nov'), __('Dec')];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    a.getHours();
    a.getMinutes();
    a.getSeconds();
    var time = date + ' ' + month + ' ' + year;
    return time;
  };
  var parseVariations = function parseVariations(_this, product) {
    var html_vars = '';
    if (_typeof(product.variations !== 'undefined')) for (var v in product.variations) {
      var type = '';
      if (product.variations[v].type == 'checkbox') type = 'check';
      if (product.variations[v].type == 'radio') type = 'radio';
      html_vars += '\
        <b>' + __html(product.variations[v].title) + (product.variations[v].required == '1' ? ' <span class="tag">' + __html('required') + '</span>' : '') + '</b>\
        <div class="kp-' + type + '" >';

      for (var d in product.variations[v].data) {
        var checked = false;
        product.variations[v].data[d]['price'] = makeNumber(product.variations[v].data[d]['price']);

        switch (type) {
          case 'check':
            html_vars += '\
                    <label>\
                        <input type="checkbox" data-required="' + product.variations[v].required + '" data-indexv="' + v + '" data-index="' + d + '" data-title="' + product.variations[v].data[d]['title'] + '" data-titlev="' + __(product.variations[v].title) + '" data-price="' + product.variations[v].data[d]['price'] + '" ' + (checked ? 'checked="checked"' : '') + '>\
                        <div class="checkbox">\
                            <svg width="20px" height="20px" viewBox="0 0 20 20">\
                                <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>\
                                <polyline points="4 11 8 15 16 6"></polyline>\
                            </svg>\
                        </div>\
                        <span>' + __html(product.variations[v].data[d]['title']) + '</span>\
                        <div class="price">+ ' + priceFormat(_this, product.variations[v].data[d]['price']) + '</div>\
                    </label>';
            break;

          case 'radio':
            html_vars += '\
                    <label>\
                        <input type="radio" data-required="' + product.variations[v].required + '" data-indexv="' + v + '" name="radio' + v + '" data-index="' + d + '" data-title="' + product.variations[v].data[d]['title'] + '" data-titlev="' + __(product.variations[v].title) + '" data-price="' + product.variations[v].data[d]['price'] + '" ' + (checked ? 'checked="checked"' : '') + ' />\
                        <span>' + __html(product.variations[v].data[d]['title']) + '</span>\
                        <div class="price">+ ' + priceFormat(_this, product.variations[v].data[d]['price']) + '</div>\
                    </label>';
            break;
        }
      }

      html_vars += '</div>';
    }
    return html_vars;
  };
  var escape$1 = function escape(htmlStr) {
    return htmlStr.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };
  var unescape = function unescape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, "\"");
    htmlStr = htmlStr.replace(/&#39;/g, "\'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    return htmlStr;
  };
  var ecommerceUpdates = function ecommerceUpdates(_this, source, cb) {
    fetch('https://api-v1.kenzap.cloud/ecommerce/', {
      method: 'post',
      headers: headers,
      body: JSON.stringify({
        query: {
          updates: {
            type: 'updates',
            source: source
          }
        }
      })
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.success) {
        cb(response);
        renderNotifications(_this, response.messages);
      }
    })["catch"](function (error) {});
  };
  var isMobile = function isMobile() {
    var nav = navigator.userAgent.toLowerCase();
    return nav.match(/iphone/i) || nav.match(/ipod/i) || nav.match(/ipad/i) || nav.match(/android/i);
  };
  var playSound = function playSound(_this, max) {
    _this.state.playSound.n = 0;
    if (_this.state.playSound.timer) clearInterval(_this.state.playSound.timer);
    if (_this.state.playSound.allowed) _this.state.playSound.audio.play();

    try {
      if (_this.state.playSound.allowed && isMobile()) window.navigator.vibrate(200);
    } catch (_unused) {}

    if (max == 1) return;
    _this.state.playSound.timer = setInterval(function () {
      if (!_this.state.playSound.allowed) return;

      _this.state.playSound.audio.play();

      if (_this.state.playSound.n > max) {
        clearInterval(_this.state.playSound.timer);
      }

      _this.state.playSound.n += 1;
    }, 5000);
  };
  var renderNotifications = function renderNotifications(_this, messages) {
    var html = '';
    var play = false;
    messages.forEach(function (msg) {
      if (!_this.state.playSound.nids.includes(msg._id)) {
        _this.state.playSound.nids.push(msg._id);

        play = true;
      }

      if (!document.querySelector('#contents .container [data-id="' + msg._id + '"]')) {
        html += "\n\n            <div class=\"alert alert-".concat(msg.color, " alert-dismissible fade show\" role=\"alert\" data-id=\"").concat(msg._id, "\">\n                <div class=\"d-flex align-items-center\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-exclamation-square flex-shrink-0 me-2\" viewBox=\"0 0 16 16\">\n                        <path d=\"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z\"/>\n                        <path d=\"M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z\"/>\n                    </svg>\n                    <div>\n                    ").concat(msg.msg, "\n                    </div>\n                </div>\n                <button type=\"button\" class=\"btn-close btn-dismiss-notify\" data-bs-dismiss=\"alert\" aria-label=\"Close\" data-id=\"").concat(msg._id, "\"></button>\n            </div>");
      }
    });

    if (play) {
      playSound(_this, 1);

      _this.getData();
    }

    if (document.querySelector('#contents .container')) document.querySelector('#contents .container').insertAdjacentHTML("afterbegin", html);
    onClick('.btn-dismiss-notify', function (e) {
      fetch('https://api-v1.kenzap.cloud/ecommerce/', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          query: {
            updates: {
              type: 'dismiss',
              id: e.currentTarget.dataset.id
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) ;
      })["catch"](function (error) {});
    });

    if (document.querySelector('.order-details')) {
      var _iterator3 = _createForOfIteratorHelper(document.querySelectorAll('.order-details')),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var el = _step3.value;
          if (el.dataset.assigned == "1") return;
          el.dataset.assigned = 1;
          el.addEventListener('click', function (e) {
            var el = document.querySelector(".view-order[data-id='" + e.currentTarget.dataset.id + "']");
            simulateClick(el);
          }, true);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  };
  var getProductsById = function getProductsById(_this, products, cb) {
    fetch('https://api-v1.kenzap.cloud/', {
      method: 'post',
      headers: headers,
      body: JSON.stringify({
        query: {
          products: {
            type: 'find',
            fields: '*',
            key: 'ecommerce-product',
            id: products,
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
        response.products.forEach(function (product, i) {
          _this.state.orderSingle.items.push({
            cats: [],
            id: product._id,
            index: i,
            note: "",
            price: product.price,
            qty: 1,
            sdesc: __html(product.sdesc),
            title: __html(product.title),
            total: product.price,
            type: "new",
            variations: []
          });
        });
        cb(_this);
      }
    })["catch"](function (error) {
      console.log(error);
      parseApiError(error);
    });
  };

  var printReceipt = function printReceipt(_this, _id, type, template) {
    var debug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var o = {},
        data = {},
        date = new Date();

    if (_id == "test") {
      o = {
        _id: "test",
        id: "test",
        created: 1649831099,
        from: "dine-in",
        idd: "",
        items: [{
          cats: [],
          id: "02de5fc62938ba0b031b4e80e962bac15a7285d8",
          index: "0",
          note: "",
          price: 45,
          qty: 2,
          sdesc: "Salted Egg Crab",
          title: "咸蛋螃蟹",
          total: 45,
          type: "new",
          variations: []
        }, {
          cats: [],
          id: "69ae96cfb7b25c358dd07560fc55e7d83cae2eb7",
          index: "0",
          note: "",
          price: 45,
          qty: 1,
          sdesc: "Kam Heong Crab",
          title: "金香螃蟹",
          total: 45,
          type: "new",
          variations: []
        }, {
          cats: ['Other'],
          id: "a678f2b21a3a3f7e97b6707d8223f32d17ecbefa",
          index: "0",
          note: "",
          price: 10,
          qty: 12,
          sdesc: "",
          title: "鱼鳔羮",
          total: 10,
          type: "new",
          variations: []
        }, {
          cats: ['Other'],
          id: "a678f2b21a3a3f7e97b6707d8223f32d17ecbefa",
          index: "0",
          note: "",
          price: 25,
          qty: 1,
          sdesc: "",
          title: "螃蟹米粉汤 (粗/幼米粉）",
          total: 25,
          type: "new",
          variations: []
        }, {
          cats: ['Other'],
          id: "a678f2b21a3a3f7e97b6707d8223f32d17ecbefa",
          index: "0",
          note: "",
          price: 4,
          qty: 1,
          sdesc: "",
          title: "Fied Chicken Noodles",
          total: 4,
          type: "new",
          variations: []
        }],
        kid: "0",
        name: "dine-in",
        note: "",
        sid: spaceID,
        status: "new",
        price: {
          discount_percent: 10,
          discount_total: 11.105,
          discount_value: 0,
          fee_total: 0,
          grand_total: 99.95,
          payment_method: "Cash",
          tax_percent: 0,
          tax_total: 0,
          total: 111.05
        },
        step: 1,
        table: "table test",
        total: 111.05,
        total_all: 99.95,
        updated: 1649833845
      };
    } else {
      o = _this.state.orders.filter(function (order) {
        return order._id == _id;
      })[0], data = {}, date = new Date();
    }

    data.debug = debug;

    if (!template) {
      var templates = _this.state.settings['templates'].filter(function (template) {
        return template.type == "receipt" && template.user == _this.state.user.id;
      });

      if (templates.length == 0) templates = _this.state.settings['templates'].filter(function (template) {
        return template.type == "receipt" && template.user == "";
      });
      data.print = templates.length > 0 ? templates[0].template : "Kenzap Cloud: no receipt template found";
      template = templates.length > 0 ? templates[0] : {};
    } else {
      data.print = template.template;
    }

    console.log(template);
    var cols_p = data.print.indexOf('[W:');
    var cols = 20;

    if (cols_p != -1) {
      cols = parseInt(data.print.substr(cols_p + 3, 2));
      data.print = data.print.substr(0, cols_p) + data.print.substr(cols_p + 6, data.print.length);
    }

    data.print = data.print.replace(/{{order_id}}/g, o.id);
    data.print = data.print.replace(/{{order_table}}/g, o.table ? o.table : "");
    data.print = data.print.replace(/{{date_time}}/g, date.toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short'
    }));
    data.print = data.print.replace(/{{order_items}}/g, getPrintItems(_this, o, '', cols));
    var matches = data.print.matchAll(/{{order_items:(.*?):start}}/g);
    Array.from(matches, function (x) {
      return x[1];
    }).forEach(function (cat) {
      var items_restricted = getPrintItems(_this, o, cat, cols);
      var replace = "{{order_items:" + cat + "}}";
      var re = new RegExp(replace, "g");
      data.print = data.print.replace(re, items_restricted);

      if (items_restricted.length < 2) {
        var start = data.print.indexOf("{{order_items:" + cat + ":start}}");
        var end = data.print.indexOf("{{order_items:" + cat + ":end}}") + ("{{order_items:" + cat + ":end}}").length;
        data.print = data.print.slice(0, start) + data.print.slice(end);
      } else {
        replace = "\n{{order_items:" + cat + ":start}}";
        re = new RegExp(replace, "g");
        data.print = data.print.replace(re, '');
        replace = "\n{{order_items:" + cat + ":end}}";
        re = new RegExp(replace, "g");
        data.print = data.print.replace(re, '');
      }
    });
    var note = !o.note || o.note == '<br>' ? '' : o.note;

    if (note.length > 0) {
      data.print = data.print.replace(/{{order_note}}/g, '[C]================================\n' + note + '\n[C]================================\n');
    }

    data.print = data.print.replace(/{{total}}/g, priceFormat(_this, o.price.total));
    data.print = data.print.replace(/{{tax_total}}/g, priceFormat(_this, o.price.tax_total));
    data.print = data.print.replace(/{{discount_total}}/g, priceFormat(_this, o.price.discount_total));
    data.print = data.print.replace(/{{grand_total}}/g, priceFormat(_this, o.price.grand_total));
    var order_totals = '';
    order_totals += '[L]' + __('Subtotal') + '[R]' + priceFormat(_this, o.price.total) + '\n';
    if (o.price.discount_total > 0) order_totals += '[L]' + __('Discount') + '[R]-' + priceFormat(_this, o.price.discount_total) + '\n';
    if (o.price.fee_total > 0) order_totals += '[L]' + _this.state.settings.fee_display + '[R]' + priceFormat(_this, o.price.fee_total) + '\n';
    if (o.price.tax_total > 0) order_totals += '[L]' + _this.state.settings.tax_display + '[R]' + priceFormat(_this, o.price.tax_total) + '\n';
    if (o.price.grand_total > 0) order_totals += '[L]' + __('Grand Total') + '[R]' + priceFormat(_this, o.price.grand_total);
    data.print = data.print.replace(/{{order_totals}}/g, order_totals);
    if (document.querySelector('#qr-number')) data.print = data.print.replace(/{{qr_number}}/g, document.querySelector('#qr-number').value);

    if (data.debug) {
      console.log(data.print);
    }

    var printers = type == "user" ? template["user_print"] : template["auto_print"];
    data["user"] = _this.state.user.id;
    data["printers"] = printers;
    data["type"] = "receipt";
    data.print = processStyling(data.print, cols);
    fetch('https://api-print.kenzap.cloud:5001/', {
      method: 'post',
      headers: headers,
      body: JSON.stringify({
        query: {
          print: {
            type: 'print',
            data: data,
            sid: spaceID()
          }
        }
      })
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.success) {
        toast(__('Printing order #' + o.id));
      } else {
        parseApiError(response);
      }
    })["catch"](function (error) {
      parseApiError(error);
    });
    _this.state.printRequest = null;
    return true;
  };
  var processStyling = function processStyling(print, cols) {
    var rows = print.split('\n');
    var output = "";

    var _iterator = _createForOfIteratorHelper(rows),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _row = _step.value;
        var max_char = cols;

        var s = _row.indexOf('[S]');

        var r = _row.indexOf('[R]');

        var l = _row.indexOf('[L]');

        var c = _row.indexOf('[C]');

        max_char -= countDoubledChars(_row) ? countDoubledChars(_row) : 1;

        if (s != -1) {
          _row = _row.substr(0, s) + _row.substr(s + 3, _row.length);
        }

        if (r != -1) {
          var spaceN = max_char - (_row.substr(0, r) + _row.substr(r + 3, _row.length)).length;

          if (l != -1) spaceN += 3;
          if (c != -1) spaceN += 3;
          _row = _row.substr(0, r) + addSpaces(spaceN) + _row.substr(r + 3, _row.length);
        }

        if (l != -1) {
          var _spaceN = max_char - (_row.substr(0, l) + _row.substr(l + 3, _row.length)).length;

          _row = _row.substr(0, l) + _row.substr(l + 3, _row.length) + addSpaces(_spaceN);
        }

        if (c != -1) {
          var _spaceN2 = max_char - (_row.substr(0, r) + _row.substr(r + 3, _row.length)).length;

          _row = addSpaces(Math.floor(_spaceN2 / 2)) + _row.substr(0, c) + _row.substr(c + 3, _row.length) + addSpaces(Math.ceil(_spaceN2 / 2));
        }

        var empty = 0;

        _toConsumableArray(_row).forEach(function (_char) {
          if (_char == " ") empty += 1;
        });

        if (empty >= max_char) _row = "";
        output += _row + "\n";
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return output;
  };
  var addSpaces = function addSpaces(l) {
    var s = "";

    for (var i = 0; i <= l; i++) {
      s += " ";
    }

    return s;
  };
  var row = function row(txt, start_ofst, end_ofst, cols) {
    cols -= 1;
    var output = '',
        ofst = 0;
    var first_row = true;

    for (var i = 0; i < txt.length; i++) {
      output += txt[i];
      ofst += 1 + countDoubledChars(txt[i]);

      if (first_row && ofst >= cols - (start_ofst + end_ofst)) {
        output += '\n[L]';
        ofst = 0;
        first_row = false;
      }

      if (ofst >= cols - end_ofst) {
        output += '\n[L]';
        ofst = 0;
      }
    }

    return output;
  };
  var countDoubledChars = function countDoubledChars(text) {
    var cjkRegEx = /[\u3400-\u4db5\u4e00-\u9fa5\uf900-\ufa2d]/;
    var wordCount = 0;
    var inWord = false;
    var length = text.length;

    for (var i = 0; i < length; i++) {
      var curChar = text.charAt(i);

      if (cjkRegEx.test(curChar)) {
        wordCount += inWord ? 2 : 1;
        inWord = false;
      }
    }

    return wordCount;
  };
  var getPrintItems = function getPrintItems(_this, o, cat, cols) {
    var items = '';

    for (var i in o.items) {
      if (o.items[i].cats == undefined) o.items[i].cats = [];
      if (!o.items[i].cats.includes(cat) && cat.length > 0) continue;
      var total = priceFormat(_this, o.items[i].total);
      items += "[L]".concat(o.items[i].qty, " X ").concat(row(__(o.items[i].title), (o.items[i].qty + "").length + 3, (total + "").length, cols), "[R]").concat(total, "\n");

      for (var v in o.items[i].variations) {
        items += "[L] ".concat(row(__(o.items[i].variations[v].title), 1, 0, cols), ":");

        for (var l in o.items[i].variations[v].list) {
          items += " ".concat(__(o.items[i].variations[v].list[l].title), ",");
        }

        if (items.endsWith(',')) items = items.substring(0, items.length - 1) + '\n';
        if (!items.endsWith('\n')) items = items + '\n';
      }
    }

    if (items.endsWith('\n')) items = items.substring(0, items.length - 1);
    return items;
  };
  var printQR = function printQR(_this, qrnum) {
    var data = {};
    data.debug = false;

    var templates = _this.state.settings['templates'].filter(function (template) {
      return template.type == "qr" && (template.user == "" || template.user == _this.state.user.id);
    });

    data.print = templates.length > 0 ? templates[0].template : "Kenzap Cloud: no qr template found";
    data.print = data.print.replace(/{{qr_link}}/g, 'http://' + _this.state.qr_settings.slug + '.kenzap.site');
    qrnum = qrnum ? qrnum : document.querySelector('#qr-number').value;
    data.print = data.print.replace(/{{qr_number}}/g, qrnum);
    var cols_p = data.print.indexOf('[W:');
    var cols = 20;

    if (cols_p != -1) {
      cols = parseInt(data.print.substr(cols_p + 3, 2));
      data.print = data.print.substr(0, cols_p) + data.print.substr(cols_p + 6, data.print.length);
    }

    data.print = processStyling(data.print, cols);
    console.log(data.print);
    var printers = templates[0]["user_print"];
    data["user"] = _this.state.user.id;
    data["printers"] = printers;
    data["type"] = "qr";
    fetch('https://api-print.kenzap.cloud:5001/', {
      method: 'post',
      headers: headers,
      body: JSON.stringify({
        query: {
          print: {
            type: 'print',
            data: data,
            sid: spaceID()
          }
        }
      })
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.success) {
        toast(__('Printing'));
      } else {
        parseApiError(response);
      }
    })["catch"](function (error) {
      parseApiError(error);
    });
  };
  var autoPrint = function autoPrint(_this) {
    var templates = _this.state.settings['templates'].filter(function (template) {
      return template.auto_print_action == "new" && template.type == "receipt" && (template.user == "" || template.user == _this.state.user.id);
    });

    if (templates.length == 0) return false;
    autoPrintLoop(_this, templates[0]);
    setInterval(function (_this) {
      autoPrintLoop(_this, templates[0]);
    }, 7000, _this);
  };
  var autoPrintLoop = function autoPrintLoop(_this, template) {
    var last_print_id = localStorage.hasOwnProperty("last_print_id") ? localStorage.getItem("last_print_id") : 0;
    var i = _this.state.orders.length;

    while (i > 0) {
      i--;

      if (_this.state.orders[i].status == "new" && parseInt(_this.state.orders[i].id) > last_print_id) {
        localStorage.setItem("last_print_id", _this.state.orders[i].id);
        printReceipt(_this, _this.state.orders[i]._id, "auto", template);
        return false;
      }
    }
  };
  var isPrintQREnabled = function isPrintQREnabled(_this) {
    var templates = _this.state.settings['templates'].filter(function (template) {
      return template.type == "qr" && (template.user == "" || template.user == _this.state.user.id);
    });

    return templates.length > 0 ? true : false;
  };

  var tables = {
    _this: null,
    firstLoad: true,
    state: {
      orderSingle: null
    },
    render: function render(_this, e) {
      if (_this.state.settings.tables != "1") return;

      var table_list = _this.state.settings.table_list.trim().split('\n');

      var html = "<div id=\"table_list\" class=\"row row-cols-1 row-cols-lg-5 row-cols-md-3 row-cols-sm-2 g-3 mb-3\">";

      _this.state.orders.forEach(function (o) {
        if (o.table) if (o.table.length > 0) if (!table_list.includes(o.table)) table_list.push(o.table);
      });

      table_list.forEach(function (el, i) {
        html += tables.structTableCard(_this, i, el, {
          orders: _this.state.orders,
          meta: _this.state.meta
        });
      });
      html += '</div>';
      if (document.querySelector('#table_list')) document.querySelector('#table_list').remove();
      document.querySelector('#orders-after-header').insertAdjacentHTML("beforeend", html);

      if (tables.firstLoad) {
        tables.firstLoad = false;
        onClick$1('.print-qr', function (e) {
          e.preventDefault();
          printQR(_this, e.currentTarget.dataset.qrnum);
        });
      }
    },
    renderField: function renderField(_this, a, item, x) {
      var html = '';

      switch (a.e) {
        case 'price':
          html = "<div data-id=\"".concat(x, "\" data-type=\"key-number\" class=\"").concat(a.classList ? a.classList : "", " ms-2 d-inline-block\" ").concat(a.editable ? 'contenteditable="true"' : '', " data-id=\"").concat(x, "\" data-value=\"").concat(item, "\">").concat(priceFormat(_this, item), "</div>");
          return html;

        case 'text':
          html = "<div data-id=\"".concat(x, "\" data-type=\"text\" class=\"").concat(a.classList ? a.classList : "", " ms-2 d-inline-block\" ").concat(a.editable ? 'contenteditable="true"' : '', " data-id=\"").concat(x, "\">").concat(item, "</div>");
          return html;

        case 'textarea':
          return '<textarea type="text" rows="4" class="form-control order-form pv " data-type="textarea" id="' + x + '" value="' + item + '">' + item + '</textarea>';

        case 'items':
          html = "<table class=\"items order-form\" data-type=\"items\"><tr><th><div class=\"me-1 me-sm-3\">".concat(__('Product'), "</div></th><th class=\"qty\"><div class=\"me-1 me-sm-3\">").concat(__('Qty'), "</div></th><th class=\"tp\"><div class=\"me-1 me-sm-3\">").concat(__('Total'), "</div></th><th></th></tr>");

          for (var _x in item) {
            html += preview.structOrderItemTable(_this, _x, item, false);
          }

          html += "<tr class=\"new-item-row\">\n                            <td>\n                                <div class=\"me-1 me-sm-3 mt-2\">\n                                    <input type=\"text\" value=\"\" autocomplete=\"off\" placeholder=\"".concat(__('Search..'), "\" class=\"form-control edit-item\" data-id=\"\" data-index=\"\" list=\"item-suggestions\">\n                                    <span class=\"select-list-group__toggle\"> </span>\n                                    <ul class=\"s-list my-1 shadow-sm\" data-toggle=\"false\"></ul>\n                                    <datalist id=\"item-suggestions\" class=\"fs-12 d-none\"></datalist>\n                                </div>\n                            </td>\n                            <td class=\"qty\">\n                                <div class=\"me-1 me-sm-3 mt-2\">\n                                    <input type=\"text\" value=\"\" autocomplete=\"off\" class=\"form-control text-right edit-qty\">\n                                </div>\n                            </td>\n                            <td class=\"tp\">\n                                <div class=\"me-1 me-sm-3 mt-2\">\n                                    <input type=\"text\" value=\"\" autocomplete=\"off\" class=\"form-control edit-tp\">\n                                </div>\n                            </td>\n                            <td class=\"align-middle text-center pt-2\"> \n                                <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 16 16\" width=\"24\" height=\"24\" class=\"bi bi-plus-circle text-success align-middle add-item\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"></path><path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"></path></svg>\n                            </td>\n                        </tr>");
          html += "</table><div class=\"item-vars-input mt-3\"> </div>";
          return html;

        default:
          if (x == '_id') item = item.substr(0, 6);
          html = "<div data-id=\"".concat(x, "\" data-type=\"text\" class=\"").concat(a.classList ? a.classList : "", " ms-2 d-inline-block\" ").concat(a.editable ? 'contenteditable="true"' : '', " data-id=\"").concat(x, "\">").concat(item, "</div>");
          return html;
      }
    },
    structTableCard: function structTableCard(_this, i, el, response) {
      var ii = 0;
      var order = {};
      var id_last = 0;
      response.orders.forEach(function (o, index) {
        if (o.table == el + '' && o.id > id_last) {
          ii = index;
          order = o;
          id_last = o.id;
        }
      });
      order = order ? order : {};
      order['id'] = order.id ? order.id : "";
      order['_id'] = order._id ? order._id : "";
      order['created'] = order.created ? order.created : "";
      var classes = "";

      var _id_header = order._id ? order._id : "",
          _id_body = _id_header;

      switch (order['status']) {
        case 'new':
          classes = "text-dark bg-warning";
          break;

        case 'paid':
          classes = "text-white bg-primary";
          break;

        case 'processing':
          classes = "text-white bg-primary";
          break;

        case 'completed':
          classes = "text-white bg-secondary";
          _id_body = "";
          break;

        case 'failed':
          classes = "text-white bg-danger";
          _id_body = "";
          break;

        case 'refunded':
          classes = "text-white bg-danger";
          _id_body = "";
          break;

        default:
          classes = "text-white bg-secondary";
          _id_body = "";
          break;
      }

      return "\n    <div class=\"col\">\n        <div class=\"card ".concat(classes, " mb-2 \" style=\"max-width: 18rem;\">\n            <div class=\"card-header view-order po ").concat(_id_header && order['status'] == 'completed' ? "bg-success" : "", "\" data-id=\"").concat(_id_header, "\" data-table=\"").concat(el, "\" ").concat(_id_header ? 'data-index="' + ii + '"' : '', "\">").concat(order.id ? __html("last order #%1$", order.id) : "&nbsp;", "</div>\n            <div class=\"card-body d-flex align-items-center justify-content-center view-order po\" style=\"min-height:140px;\" data-id=\"").concat(_id_body, "\" data-table=\"").concat(el, "\" ").concat(_id_body ? 'data-index="' + ii + '"' : '', "\">\n                <h5 class=\"card-title\">").concat(__("Table %1$", el), "</h5>\n            </div>\n            <div class=\"card-footer d-flex justify-content-between\">\n                ").concat(order['created'] ? timeConverterAgo(__, response.meta.time, order['created']) : '&nbsp;', "\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-qr-code-scan print-qr po ").concat(_this.state.settings.qr_print ? "" : "d-none", " \" viewBox=\"0 0 16 16\" data-qrnum=\"").concat(el, "\">\n                    <path d=\"M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z\"></path>\n                    <path d=\"M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z\"></path>\n                    <path d=\"M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z\"></path>\n                    <path d=\"M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z\"></path>\n                    <path d=\"M12 9h2V8h-2v1Z\"></path>\n                </svg>\n            </div>\n        </div>\n    </div>");
    }
  };

  var preview$1 = {
    _this: null,
    state: {
      orderSingle: null
    },
    renderOrder: function renderOrder(_this, e) {
      _this.state.changes = false;
      _this.modal = document.querySelector(".order-modal");
      _this.modalCont = new bootstrap.Modal(_this.modal);
      _this.modalOpen = true;
      _this.rowMark = -1;
      var i = e.currentTarget.dataset.index;
      history.pushState({
        pageID: 'orders'
      }, 'Orders', window.location.pathname + window.location.search + "#editing");

      _this.modal.addEventListener('hide.bs.modal', function (e) {
        if (window.location.href.indexOf("#editing") == -1) return;
        history.pushState({
          pageID: 'orders'
        }, 'Orders', window.location.pathname + window.location.search);
      });

      if (typeof i === 'undefined') {
        _this.state.orderSingle = {
          _id: "new",
          created: 1649831099,
          from: "dine-in",
          id: "",
          idd: "",
          items: [],
          kid: "0",
          name: "dine-in",
          note: "",
          sid: spaceID,
          status: "new",
          price: {
            'discount_percent': 0
          },
          step: 1,
          table: e.currentTarget.dataset.table ? e.currentTarget.dataset.table : "-",
          total: 0,
          updated: 1649833845
        };

        if (_this.state.orderSingle._id == 'new' && _this.state.settings.add_products == "1") {
          var products = _this.state.settings.add_products_list.trim().split('\n');

          getProductsById(_this, products, preview$1.renderOrderUI);
        } else {
          preview$1.renderOrderUI(_this);
        }
      } else {
        _this.state.orderSingle = _this.state.orders[i];
        preview$1.renderOrderUI(_this);
      }

      onClick$1('.print-order', function (e) {
        e.preventDefault();
        _this.state.printRequest = e.currentTarget.dataset.id;
        simulateClick(_this.modal.querySelector(".btn-confirm"));
      });

      _this.listeners.modalSuccessBtnFunc = function (e) {
        e.preventDefault();

        _this.updateOrder(i, _this.state.orderSingle._id);
      };

      onClick$1('.st-modal li a', function (e) {
        e.preventDefault();
        preview$1._this.state.changes = true;
        var osm = document.querySelector('#order-status-modal');
        osm.innerHTML = _this.state.statuses[e.currentTarget.dataset.key].text;
        osm.dataset.value = e.currentTarget.dataset.key;
        var list = [];
        Object.keys(_this.state.statuses).forEach(function (key) {
          list = _this.state.statuses[key]["class"].split(' ');
          list.forEach(function (key) {
            osm.classList.remove(key);
          });
        });
        list = _this.state.statuses[e.currentTarget.dataset.key]["class"].split(' ');
        list.forEach(function (key) {
          osm.classList.add(key);
        });
      });
    },
    renderOrderUI: function renderOrderUI(_this) {
      var _fields;

      preview$1.state.orderSingle = _this.state.orderSingle;
      var items = '';
      Object.keys(_this.state.statuses).forEach(function (key, index) {
        items += "<li><a class=\"dppi dropdown-item\" data-key=\"".concat(key, "\" href=\"#\">").concat(_this.state.statuses[key].text, "</a></li>");
      });
      var statusSelect = "\n        <div class=\"d-flex justify-content-between\">\n            <div class=\"st-modal st-opts mb-3 me-1 me-sm-3 dropdown\">\n                <a class=\"btn btn-sm ".concat(_this.state.statuses[_this.state.orderSingle['status']]["class"], " dropdown-toggle order-form\" data-id=\"status\" data-type=\"key\" data-value=\"").concat(_this.state.orderSingle['status'], "\" href=\"#\" role=\"button\" id=\"order-status-modal\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\" >\n                    ").concat(_this.state.statuses[_this.state.orderSingle['status']].text, "\n                </a>\n                <ul class=\"dropdown-menu\" aria-labelledby=\"order-status-modal\">\n                    ").concat(items, "\n                </ul>\n            </div>\n            <a href=\"#\" data-index=\"0\" class=\"print-order text-success\" data-id=").concat(preview$1.state.orderSingle._id, ">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" fill=\"currentColor\" class=\"bi bi-printer\" viewBox=\"0 0 16 16\">\n                    <path d=\"M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z\"></path>\n                    <path d=\"M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z\"></path>\n                </svg>\n            </a>\n        </div>\n        ");

      _this.modal.querySelector(".modal-dialog").classList.add('modal-fullscreen');

      _this.modal.querySelector(".modal-header .modal-title").innerHTML = isNaN(_this.state.orderSingle['from']) ? _this.state.orderSingle['from'] : '#' + _this.state.orderSingle['from'];
      _this.modal.querySelector(".modal-footer .btn-confirm").innerHTML = _this.state.orderSingle._id == "new" ? __('Create') : __('Update');
      _this.modal.querySelector(".btn-confirm").dataset.loading = false;
      _this.modal.querySelector(".modal-footer .btn-secondary").innerHTML = __('Close');
      var html = statusSelect;
      var fields = (_fields = {
        id: {
          l: __("ID"),
          classList: "order-form"
        },
        from: {
          l: __("From"),
          e: "text",
          editable: true,
          classList: "order-form"
        },
        table: {
          l: __("Table"),
          e: "text",
          editable: true,
          classList: "order-form"
        },
        items: {
          l: "",
          e: "items"
        },
        fname: {
          l: __("Name"),
          e: "text"
        },
        lname: {
          l: __("Surname"),
          e: "text"
        },
        bios: {
          l: __("Bios"),
          e: "textarea"
        },
        avatar: {
          l: __("Avatar"),
          e: "text"
        },
        email: {
          l: __("Email"),
          e: "text"
        },
        countryr: {
          l: __("Country"),
          e: "text"
        },
        cityr: {
          l: __("City"),
          e: "text"
        },
        addr1: {
          l: __("Address 1"),
          e: "textarea"
        },
        addr2: {
          l: __("Address 2"),
          e: "textarea"
        },
        post: {
          l: __("Post"),
          e: "text"
        },
        state: {
          l: __("State"),
          e: "text"
        },
        c1: {
          l: __("Whatsapp"),
          e: "text"
        },
        c2: {
          l: __("Messenger"),
          e: "text"
        },
        c3: {
          l: __("Line"),
          e: "text"
        },
        c4: {
          l: __("Email"),
          e: "text"
        },
        c5: {
          l: __("Telegram"),
          e: "text"
        }
      }, _defineProperty(_fields, "email", {
        l: __("Email"),
        e: "text"
      }), _defineProperty(_fields, "bio", {
        l: __("Bio"),
        e: "text"
      }), _defineProperty(_fields, "y1", {
        l: __("Name"),
        e: "text"
      }), _defineProperty(_fields, "y2", {
        l: __("IBAN"),
        e: "text"
      }), _defineProperty(_fields, "y3", {
        l: __("SWIFT"),
        e: "text"
      }), _defineProperty(_fields, "y4", {
        l: __("Bank"),
        e: "text"
      }), _defineProperty(_fields, "y5", {
        l: __("Bank city"),
        e: "text"
      }), _defineProperty(_fields, "y6", {
        l: __("Bank country"),
        e: "text"
      }), _defineProperty(_fields, "note", {
        l: __("Note"),
        e: "textarea"
      }), _defineProperty(_fields, "s3", {
        l: __("Link 3"),
        e: "text"
      }), _defineProperty(_fields, "company", {
        l: __("Company"),
        e: "text"
      }), _defineProperty(_fields, "vat", {
        l: __("Tax ID"),
        e: "text"
      }), _defineProperty(_fields, "grade", {
        l: __("Grade"),
        e: "text"
      }), _defineProperty(_fields, "kenzap_ida", {
        l: __("Kenzap IDA"),
        e: "text"
      }), _fields);

      for (var x in fields) {
        if (_this.state.orderSingle[x] === undefined) continue;
        var val = _this.state.orderSingle[x];
        var field = fields[x].l;
        html += "\n            <div class=\"mb-3 mt-3 order-row keyx-".concat(x, " ").concat(x == '_id' || x == 'from' ? "elipsized" : "", "\"  >\n                <b>").concat(field, "</b>").concat(preview$1.renderField(_this, fields[x], val, x), "\n            </div>");
      }

      setTimeout(function () {
        preview$1.refreshTotals();
      }, 100);
      html += '';
      _this.modal.querySelector(".modal-body").innerHTML = '<div class="modal-body-cont">' + html + '</div>';

      _this.modalCont.show();

      preview$1.tableOrderItemListeners();
      preview$1.suggestOrderItem(_this);

      _this.modal.querySelector(".edit-item").addEventListener('blur', function (e) {
        setTimeout(function () {
          document.querySelector('.s-list').dataset.toggle = false;
        }, 500);
      });

      preview$1.addOrderItem(_this);
      if (_this.state.orderSingle._id == 'new') preview$1.refreshTotals();
      if (_this.state.orderSingle._id == 'new') setTimeout(function () {
        document.querySelector('.edit-item').focus();
      }, 300);
    },
    newOrder: function newOrder(_this) {
      preview$1._this = _this;
      onClick$1('.add-order', function (e) {
        preview$1.renderOrder(_this, e);
      });
    },
    viewOrder: function viewOrder(_this) {
      preview$1._this = _this;
      onClick$1('.view-order', function (e) {
        preview$1.renderOrder(_this, e);
      });
    },
    renderField: function renderField(_this, a, item, x) {
      var html = '';

      switch (a.e) {
        case 'price':
          html = "<div data-id=\"".concat(x, "\" data-type=\"key-number\" class=\"").concat(a.classList ? a.classList : "", " ms-2 d-inline-block\" ").concat(a.editable ? 'contenteditable="true"' : '', " data-id=\"").concat(x, "\" data-value=\"").concat(item, "\">").concat(priceFormat(_this, item), "</div>");
          return html;

        case 'text':
          html = "<div data-id=\"".concat(x, "\" data-type=\"text\" class=\"").concat(a.classList ? a.classList : "", " ms-2 d-inline-block p-1\" ").concat(a.editable ? 'contenteditable="true"' : '', " data-id=\"").concat(x, "\" style=\"min-width:50px;\">").concat(item, "</div>");
          return html;

        case 'textarea':
          return '<textarea type="text" rows="4" class="form-control order-form pv " data-type="textarea" id="' + x + '" value="' + item + '">' + item + '</textarea>';

        case 'items':
          html = "<table class=\"items order-form\" data-type=\"items\"><tr><th><div class=\"me-1 me-sm-3\">".concat(__('Product'), "</div></th><th class=\"qty\"><div class=\"me-1 me-sm-3\">").concat(__('Qty'), "</div></th><th class=\"tp\"><div class=\"me-1 me-sm-3\">").concat(__('Total'), "</div></th><th></th></tr>");

          for (var _x in item) {
            html += preview$1.structOrderItemTable(_this, _x, item, false);
          }

          html += "<tr class=\"new-item-row\">\n                            <td>\n                                <div class=\"me-1 me-sm-3 mt-2\">\n                                    <input type=\"text\" value=\"\" autocomplete=\"off\" placeholder=\"".concat(__('Search..'), "\" class=\"form-control edit-item\" data-id=\"\" data-cats=\"\" data-index=\"\" list=\"item-suggestions\">\n                                    <span class=\"select-list-group__toggle\"> </span>\n                                    <ul class=\"s-list my-1 shadow-sm\" data-toggle=\"false\"></ul>\n                                    <datalist id=\"item-suggestions\" class=\"fs-12 d-none\"></datalist>\n                                </div>\n                            </td>\n                            <td class=\"qty\">\n                                <div class=\"me-1 me-sm-3 mt-2\">\n                                    <input type=\"text\" value=\"\" autocomplete=\"off\" class=\"form-control text-right edit-qty\">\n                                </div>\n                            </td>\n                            <td class=\"tp\">\n                                <div class=\"me-1 me-sm-3 mt-2 d-flex\">\n                                    <select class=\"form-select form-select edit-discount me-2 d-none\" data-type=\"select\" aria-label=\"Default payment method\">\n                                        <option value=\"\" selected=\"\">%</option>\n                                        <option value=\"eNets\">eNets</option>\n                                        <option value=\"PayNow\">PayNow</option>\n                                    </select>\n                                    <input type=\"text\" value=\"\" autocomplete=\"off\" class=\"form-control edit-tp\">\n                                </div>\n                            </td>\n                            <td class=\"align-middle text-center pt-2\"> \n                                <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 16 16\" width=\"24\" height=\"24\" class=\"bi bi-plus-circle text-success align-middle add-item\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"></path><path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"></path></svg>\n                            </td>\n                        </tr>");
          html += "</table><div class=\"item-vars-input mt-3\"> </div>";
          return html;

        default:
          if (x == '_id') item = item.substr(0, 6);
          html = "<div data-id=\"".concat(x, "\" data-type=\"text\" class=\"").concat(a.classList ? a.classList : "", " ms-2 d-inline-block\" ").concat(a.editable ? 'contenteditable="true"' : '', " data-id=\"").concat(x, "\">").concat(item, "</div>");
          return html;
      }
    },
    itemOptions: function itemOptions(item) {
      var options = "\n\n        <div class=\"dropdown text-center\">\n            <a  href=\"#\" role=\"button\" id=\"order-item-options\" data-id=\"status\" data-value=\"\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-three-dots-vertical order-item-options\" viewBox=\"0 0 16 16\"><path d=\"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\"/></svg>\n            </a>\n            <ul class=\"dropdown-menu\" aria-labelledby=\"order-item-options\" >\n                <li><a class=\"oio dropdown-item edit-item-note\" data-key=\"edit-item-note\" href=\"#\">".concat(__('Add note'), "</a></li>\n                <li><a class=\"oio dropdown-item d-none\" data-key=\"edit-item-variation\" href=\"#\">").concat(__('Add variation'), "</a></li>\n                <li><a class=\"oio dropdown-ite d-none\" data-key=\"edit-item-price\" href=\"#\">").concat(__('Adjust price'), "</a></li>\n                <li><a class=\"oio dropdown-item text-danger remove-item\" data-key=\"remove-item\" href=\"#\">").concat(__('Remove'), "</a></li>\n            </ul>\n        </div>\n    ");
      return options;
    },
    structOrderItemTable: function structOrderItemTable(_this, x, item) {
      var isNew = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      if (_this.created != item[x].created) {
        _this.rowMark += 1;
      }

      _this.created = item[x].created;
      item[x].cats = item[x].cats ? item[x].cats : [];
      var vars = '',
          output = '';

      for (var v in item[x].variations) {
        var list = '';

        for (var l in item[x].variations[v].list) {
          list += __html(item[x].variations[v].list[l].title) + " ";
        }

        vars += '<div><b class="me-1">' + __html(item[x].variations[v].title) + "</b> <span>" + list + "</span></div> ";
        if (item[x].variations[v].note !== undefined && item[x].variations[v].note.length > 0) vars += "<div><b>" + __('Note') + "</b> " + item[x].variations[v].note + "</div> ";
      }

      var item_discount = "";
      if (item[x].discount_percent) item_discount = " (-" + item[x].discount_percent + "%)";
      if (item[x].discount_value) item_discount = " (-" + priceFormat(_this, item[x].discount_value) + ")";
      if (!item[x].discounts) item[x].discounts = [];
      item[x].discounts.forEach(function (obj) {
        if (obj.type == "never") item[x].discount_type = "never";
      });
      output += '<tr class="order-item-row-active row-mark' + _this.rowMark + '" data-created="' + item[x].created + '" data-x="' + x + '" data-id="' + item[x].id + '" data-vars="' + escape$1(JSON.stringify(item[x].variations)) + '" data-cats="' + escape$1(JSON.stringify(item[x].cats)) + '" data-discounts="' + escape$1(JSON.stringify(item[x].discounts)) + '">';
      output += '<td><div class="item-title" contenteditable="false" data-value="' + item[x].title + '" data-sdesc="' + (item[x].sdesc ? item[x].sdesc : "") + '">' + __html(item[x].title) + '</div><div class="item-note text-muted mb-1 ' + ((item[x].note.length == 0 || item[x].note == '<br>') && !isNew ? "d-none" : "") + '" contenteditable="true" data-value="' + item[x].note + '">' + item[x].note + '</div><div class="vars border-primary item-variations my-1 ps-2 text-secondary" data-value="">' + vars + '</div></td><td class="qty"><div class="me-1 me-sm-3 item-qty" data-value="' + item[x].qty + '">' + item[x].qty + '</div></td><td class="tp"><div class="me-1 me-sm-3 item-total" data-price="' + item[x].price + '" data-value="' + item[x].total + '" data-discount_type="' + (item[x].discount_type ? item[x].discount_type : "") + '" data-discount_percent="' + (item[x].discount_percent ? item[x].discount_percent : "") + '" data-discount_value="' + (item[x].discount_value ? item[x].discount_value : "") + '">' + priceFormat(_this, item[x].total) + item_discount + '</div><td class="' + (options ? '' : 'd-none') + '">' + preview$1.itemOptions(item[x]) + '</td></td>';
      output += '</tr>';
      return output;
    },
    suggestOrderItem: function suggestOrderItem(_this) {
      onKeyUp('.edit-item', function (e) {
        var key = e.keyCode || e.charCode;

        if (key >= 34 && key <= 45) {
          return;
        }

        var s = e.currentTarget.value;
        if (s.length == 1) document.querySelector('.modal-body').scrollTo({
          top: document.querySelector('.edit-item').getBoundingClientRect().top - document.querySelector('.modal-body-cont').getBoundingClientRect().top - 20,
          behavior: "smooth"
        });

        if (s.length == 0 || e.currentTarget !== document.activeElement) {
          document.querySelector('.s-list').dataset.toggle = false;
          return;
        }

        fetch('https://api-v1.kenzap.cloud/', {
          method: 'post',
          headers: headers,
          body: JSON.stringify({
            query: {
              products: {
                type: 'find',
                key: 'ecommerce-product',
                fields: ['_id', 'id', 'img', 'status', 'cats', 'variations', 'price', 'discounts', 'title'],
                limit: _this.state.slist,
                term: [{
                  type: "string",
                  field: "status",
                  relation: "=",
                  value: "1"
                }],
                offset: s.length > 0 ? 0 : getPageNumber() * _this.state.slist - _this.state.slist,
                search: {
                  field: 'title',
                  s: s
                },
                sortby: {
                  field: 'title',
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
            _this.state.productsSuggestions = response.products;
            var options = "";
            response.products.forEach(function (product, index) {
              options += "<li class=\"s-list-item py-1\" data-id=\"".concat(product._id, "\" data-title=\"").concat(product.title, "\" data-index=\"").concat(index, "\"  data-display=\"true\" data-highlight=\"false\">").concat(product.title, "</li>");
            });
            document.querySelector('.s-list').innerHTML = options;
            document.querySelector('.s-list').dataset.toggle = true;
            onClick$1('.s-list-item', function (e) {
              var index = e.currentTarget.dataset.index;
              console.log(_this.state.productsSuggestions[index]);
              document.querySelector('.edit-item').dataset.index = index;
              document.querySelector('.edit-item').dataset.id = _this.state.productsSuggestions[index]._id;
              document.querySelector('.edit-item').dataset.cats = JSON.stringify(_this.state.productsSuggestions[index].cats);
              document.querySelector('.edit-item').value = _this.state.productsSuggestions[index].title;
              document.querySelector('.edit-item').dataset.discounts = JSON.stringify(_this.state.productsSuggestions[index].discounts);
              document.querySelector('.edit-qty').value = 1;
              document.querySelector('.edit-qty').dataset.price = _this.state.productsSuggestions[index].price;
              document.querySelector('.edit-tp').value = _this.state.productsSuggestions[index].price;
              document.querySelector('.edit-tp').dataset.price = _this.state.productsSuggestions[index].price;
              document.querySelector('.s-list').dataset.toggle = false;
              document.querySelector('.edit-discount').classList.add('d-none');
              if (_this.state.productsSuggestions[index].discounts) if (_this.state.productsSuggestions[index].discounts.length > 0) {
                var discount_options = '<option value="">%</option>';

                _this.state.productsSuggestions[index].discounts.forEach(function (discount) {
                  if (discount.availability == "admin" && discount.type == "percent") {
                    discount_options += '<option data-type="percent" value="' + discount.percent + '">-' + discount.percent + '%</option>';
                    document.querySelector('.edit-discount').classList.remove('d-none');
                  }

                  if (discount.availability == "admin" && discount.type == "value") {
                    discount_options += '<option data-type="value" value="' + discount.value + '">-' + priceFormat(preview$1._this, discount.value) + '</option>';
                    document.querySelector('.edit-discount').classList.remove('d-none');
                  }

                  if (discount.type == "never") ;
                });

                document.querySelector('.edit-discount').innerHTML = discount_options;
                onChange('.edit-discount', function (e) {
                  setTimeout(function () {
                    calcItemTotal();
                  }, 300);
                });
              }

              var calcItemTotal = function calcItemTotal() {
                var discount_type = document.querySelector('.edit-discount').options[document.querySelector('.edit-discount').selectedIndex].dataset.type;
                var total = parseFloat(document.querySelector('.edit-qty').value) * parseFloat(document.querySelector('.edit-qty').dataset.price);

                if (isNaN(total)) {
                  total = "";
                } else {
                  if (discount_type == "percent") {
                    total = total - total * parseInt(document.querySelector('.edit-discount').value) / 100;
                  }

                  if (discount_type == "value") {
                    total = total - parseFloat(document.querySelector('.edit-discount').value);
                  }
                }

                document.querySelector('.edit-tp').value = total;
              };

              document.querySelector('.edit-qty').addEventListener('keypress', function (e) {
                if (e.which != 8 && isNaN(String.fromCharCode(e.which))) {
                  e.preventDefault();
                  return false;
                }
              });
              document.querySelector('.edit-qty').addEventListener('keydown', function (e) {
                setTimeout(function () {
                  calcItemTotal();
                }, 300);
              });
              document.querySelector('.edit-tp').addEventListener('keypress', function (e) {
                if (e.which != 8 && e.which != 46 && isNaN(String.fromCharCode(e.which))) {
                  e.preventDefault();
                  return false;
                }
              });
              document.querySelector('.edit-qty').focus();
              document.querySelector('.edit-qty').select();
              document.querySelector('.item-vars-input').innerHTML = parseVariations(_this, _this.state.productsSuggestions[index]);
            });
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          console.log(error);
          parseApiError(error);
        });
      });
    },
    tableOrderItemListeners: function tableOrderItemListeners(e) {
      onClick$1('.edit-item-note', function (e) {
        e.preventDefault();
        var noteEl = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.item-note');
        noteEl.classList.remove('d-none');
        noteEl.focus();
        preview$1._this.state.changes = true;
      });
      onClick$1('.remove-item', function (e) {
        e.preventDefault();
        e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        preview$1.refreshTotals();
        preview$1._this.state.changes = true;
      });
    },
    refreshTotals: function refreshTotals() {
      var html = "",
          grand_total_temp = 0;

      var _iterator = _createForOfIteratorHelper(document.querySelectorAll('.item-total')),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _price = _step.value;
          grand_total_temp += makeNumber(_price.dataset.value);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var price = {
        grand_total: 0,
        total: makeNumber(grand_total_temp),
        discount_percent: document.querySelector('.discount-percent-inp') ? parseInt(document.querySelector('.discount-percent-inp').value) : preview$1.state.orderSingle['price']['discount_percent'] ? preview$1.state.orderSingle['price']['discount_percent'] : 0,
        discount_value: document.querySelector('.discount-value-inp') ? parseFloat(document.querySelector('.discount-value-inp').value) : preview$1.state.orderSingle['price']['discount_value'] ? preview$1.state.orderSingle['price']['discount_value'] : 0,
        discount_total: 0,
        fee_total: 0,
        tax_total: 0,
        tax_percent: 0
      };
      var ordertotalsubtotal = "<div class=\"mb-2 mt-2 order-total-subtotal order-row text-right elipsized keyx-total\">\n                <b>".concat(__html('Subtotal'), "</b><div class=\"ms-2 d-inline-block\" data-type=\"key-number\" >").concat(priceFormat(preview$1._this, price.total), "</div>\n             </div>");
      html += ordertotalsubtotal;

      if (preview$1._this.state.settings.custom_payment_method == "1") {
        var options = '';

        preview$1._this.state.settings.payment_methods.trim().split('\n').forEach(function (el, i) {
          options += "<option value=\"".concat(el, "\" ").concat(preview$1.state.orderSingle.price['payment_method'] == el ? 'selected' : '', " >").concat(el, "</option>");
        });

        var ordertotalpaymentmethod = "<div class=\"mb-2 mt-2 order-total-payment_method order-row text-right keyx-payment_method\">\n                    <b>".concat(__('Payment'), "</b>\n                    <div class=\"ms-2 d-inline-block\" >\n                        <select class=\"form-select form-select-sm payment-method-select\" data-type=\"select\" aria-label=\"Default payment method\">\n                            ").concat(options, "\n                        </select>\n                    </div>\n                </div>");
        html += ordertotalpaymentmethod;
      }

      if (document.querySelector('.order-total-subtotal')) {
        document.querySelector('.order-total-subtotal').outerHTML = ordertotalsubtotal;
      }

      html += "<div class=\"mb-2 mt-2 order-total-discount d-flex align-items-center justify-content-end bd-highlight order-row keyx-total\">\n                <div class=\"dropdown\">\n                    <button class=\"btn border-0 dropdown-toggle fw-bold\" type=\"button\" id=\"discount-type\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n                    ".concat(parseFloat(price.discount_value) > 0 ? __('Discount by value') : __('Discount by %'), "\n                    </button>\n                    <ul class=\"dropdown-menu discount-type-option\" aria-labelledby=\"discount-type\">\n                        <li><a class=\"dropdown-item\" data-type=\"percent\" href=\"#\">").concat(__('Discount by %'), "</a></li>\n                        <li><a class=\"dropdown-item\" data-type=\"value\" href=\"#\">").concat(__('Discount by value'), "</a></li>\n                    </ul>\n                </div>\n                <div class=\"ms-2 d-inline-block\" data-type=\"key-number\" >\n                    <input type=\"text\" autocomplete=\"off\" maxlength=\"3\" class=\"discount-percent-inp form-control form-control-sm text-end ").concat(parseFloat(price.discount_value) > 0 ? 'd-none' : '', "\" value=\"").concat(price.discount_percent, "\" style=\"max-width:50px;\">\n                    <input type=\"text\" autocomplete=\"off\" class=\"discount-value-inp ").concat(parseFloat(price.discount_value) > 0 ? '' : 'd-none', " form-control form-control-sm text-end\" value=\"").concat(price.discount_value, "\" style=\"max-width:120px;\">\n                </div>\n            </div>");

      if (parseInt(price.discount_percent) > 0) {
        price.discount_total = 0;

        var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll('.item-total')),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var item_price = _step2.value;
            if (item_price.dataset.discount_type != 'never') price.discount_total += makeNumber(parseInt(price.discount_percent) * makeNumber(item_price.dataset.value)) / 100;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        grand_total_temp -= price.discount_total;
      }

      if (parseFloat(price.discount_value) > 0) {
        if (parseFloat(price.discount_value) > 0) {
          grand_total_temp -= price.discount_value;
        }
      }

      if (preview$1._this.state.settings.fee_calc == "1") {
        price.fee_total = makeNumber(preview$1._this.state.settings.fee_percent * grand_total_temp) / 100;
        price.fee_percent = makeNumber(preview$1._this.state.settings.fee_percent);
        var ordertotalfee = "<div class=\"mb-2 mt-2 order-total-fee order-row text-right elipsized\">\n                    <b>".concat(__(preview$1._this.state.settings.fee_display), "</b><div class=\"ms-2 d-inline-block\" data-type=\"key-number\" >").concat(priceFormat(preview$1._this, price.fee_total), "</div>\n                 </div>");
        html += ordertotalfee;

        if (document.querySelector('.order-total-fee')) {
          document.querySelector('.order-total-fee').outerHTML = ordertotalfee;
        }

        grand_total_temp += price.fee_total;
      }

      if (preview$1._this.state.settings.tax_calc == "1") {
        price.tax_total = makeNumber(grand_total_temp * parseFloat(preview$1._this.state.settings.tax_percent) / 100);
        price.tax_percent = makeNumber(preview$1._this.state.settings.tax_percent);
        var ordertotaltax = "<div class=\"mb-2 mt-2 order-total-tax order-row text-right elipsized\">\n                    <b>".concat(preview$1._this.state.settings.tax_display, "</b><div class=\"ms-2 d-inline-block\" data-type=\"key-number\" >").concat(priceFormat(preview$1._this, price.tax_total), "</div>\n                 </div>");
        html += ordertotaltax;

        if (document.querySelector('.order-total-tax')) {
          document.querySelector('.order-total-tax').outerHTML = ordertotaltax;
        }

        grand_total_temp += price.tax_total;
      }

      price.grand_total = makeNumber(grand_total_temp);
      var ordertotalgrandtotal = "<div class=\"mb-2 mt-2 order-total-grandtotal order-row text-right elipsized\">\n                <b>".concat(__html('Grand Total'), "</b><div class=\"ms-2 d-inline-block\" data-type=\"key-number\" >").concat(priceFormat(preview$1._this, price.grand_total), "</div>\n             </div>");
      html += ordertotalgrandtotal;

      if (document.querySelector('.order-total-grandtotal')) {
        document.querySelector('.order-total-grandtotal').outerHTML = ordertotalgrandtotal;
      }

      if (document.querySelector('.order-total')) {
        document.querySelector('.order-total').dataset.price = encodeURIComponent(JSON.stringify(price));
      } else {
        document.querySelector('.modal-body-cont').insertAdjacentHTML("beforeend", "<div class=\"mt-5 order-total order-form text-end\" data-type=\"price\" data-price=\"".concat(encodeURIComponent(JSON.stringify(price)), "\">").concat(html, "</div>"));
        onClick$1('.discount-type-option li a', function (e) {
          e.preventDefault();
          document.querySelector('#discount-type').dataset.type = e.currentTarget.dataset.type;
          console.log(e.currentTarget.dataset.type);

          switch (e.currentTarget.dataset.type) {
            case 'value':
              document.querySelector('#discount-type').innerHTML = __html('Discount by value');
              document.querySelector('.discount-value-inp').style.maxWidth = '120px';
              document.querySelector('.discount-value-inp').classList.remove('d-none');
              document.querySelector('.discount-percent-inp').classList.add('d-none');
              document.querySelector('.discount-percent-inp').value = 0;
              break;

            case 'percent':
              document.querySelector('#discount-type').innerHTML = __html('Discount by %');
              document.querySelector('.discount-percent-inp').style.maxWidth = '70px';
              document.querySelector('.discount-value-inp').classList.add('d-none');
              document.querySelector('.discount-percent-inp').classList.remove('d-none');
              document.querySelector('.discount-value-inp').value = 0;
              break;
          }

          preview$1._this.state.changes = true;
          preview$1.refreshTotals();
        });
        onlyNumbers('.discount-percent-inp', [8]);
        onKeyUp('.discount-percent-inp', function (e) {
          if (parseInt(e.currentTarget.value) > 100 || parseInt(e.currentTarget.value) < 0) {
            e.currentTarget.setCustomValidity("wrong percent value");
          } else {
            e.currentTarget.setCustomValidity("");
          }

          e.currentTarget.parentElement.classList.add("was-validated");
          e.currentTarget.style.maxWidth = '70px';
          preview$1.refreshTotals();
        });
        onlyNumbers('.discount-value-inp', [8, 46]);
        onKeyUp('.discount-value-inp', function (e) {
          if (parseInt(e.currentTarget.value) < 0 || parseInt(e.currentTarget.value) > price.total) {
            e.currentTarget.setCustomValidity("wrong discount value");
          } else {
            e.currentTarget.setCustomValidity("");
          }

          e.currentTarget.parentElement.classList.add("was-validated");
          e.currentTarget.style.maxWidth = '120px';
          preview$1._this.state.changes = true;
          preview$1.refreshTotals();
        });
      }
    },
    addOrderItem: function addOrderItem(_this) {
      onClick$1('.add-item', function (e) {
        var x = 0,
            itemArr = [],
            item = {};
        item.id = document.querySelector('.edit-item').dataset.id;
        item.cats = JSON.parse(document.querySelector('.edit-item').dataset.cats);
        item.title = document.querySelector('.edit-item').value;
        item.total = parseFloat(document.querySelector('.edit-tp').value);
        item.price = parseInt(document.querySelector('.edit-tp').dataset.price);
        item.discounts = JSON.parse(document.querySelector('.edit-item').dataset.discounts);
        item.qty = parseInt(document.querySelector('.edit-qty').value);
        item.note = "";
        item.created = preview$1.state.orderSingle.updated;
        item.variations = [];
        var discount_type = document.querySelector('.edit-discount').options[document.querySelector('.edit-discount').selectedIndex].dataset.type;

        if (discount_type == "percent") {
          item.discount_percent = document.querySelector('.edit-discount').value;
        }

        if (discount_type == "value") {
          item.discount_value = document.querySelector('.edit-discount').value;
        }

        var count = 0;
        var list = document.querySelectorAll(".item-vars-input input");

        var _iterator3 = _createForOfIteratorHelper(list),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var inp = _step3.value;
            var v = count;

            if (inp.checked) {
              if (!item.variations[v]) item.variations[v] = {};
              if (!item.variations[v].list) item.variations[v].list = {};
              if (!item.variations[v].title) item.variations[v].title = inp.dataset.titlev;
              item.variations[v].list["_" + inp.dataset.index] = {
                title: inp.dataset.title,
                price: parseFloat(inp.dataset.price)
              };
              item.total += item.qty * parseFloat(inp.dataset.price);
              count += 1;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        if (item.title.length < 2) {
          alert(__('Incorrect product data'));
          return;
        }

        itemArr.push(item);
        var itemRow = preview$1.structOrderItemTable(_this, x, itemArr, true);
        document.querySelector('.new-item-row').insertAdjacentHTML("beforebegin", itemRow);
        preview$1.tableOrderItemListeners();
        preview$1.refreshTotals();
        document.querySelector('.edit-item').value = "";
        document.querySelector('.edit-tp').value = "";
        document.querySelector('.edit-qty').value = "";
        document.querySelector('.edit-discount').value = "";
        document.querySelector(".item-vars-input").innerHTML = "";
        setTimeout(function () {
          document.querySelector('.edit-item').focus();
        }, 300);
        preview$1._this.state.changes = true;
      });
    }
  };

  var HTMLContent = function HTMLContent() {
    return "\n      <div class=\"container ec-orders\">\n        <div class=\"d-md-flex justify-content-between bd-highlight mb-3\">\n            <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n            <button class=\"btn btn-primary add-order btn-add mt-3 mb-1 mt-md-0 mb-md-0\" type=\"button\">".concat(__html('New order'), "</button>\n        </div>\n        <div class=\"d-md-flex justify-content-between bd-highlight mb-3\">\n          <div>\n            <div class=\"col-md-12 page-title\">\n              <div class=\"st-opts st-table dropdown\">\n                  <a class=\"btn btn-outline-secondary dropdown-toggle\" href=\"#\" role=\"button\" id=\"order-status\" data-id=\"status\" data-value=\"\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n                    ").concat(__html('All'), "\n                  </a>\n                  <ul class=\"dropdown-menu\" aria-labelledby=\"order-status\">\n                    <li><a class=\"dppi dropdown-item\" data-key=\"\" href=\"#\" >").concat(__html('All'), "</a></li>\n                    <li><a class=\"dppi dropdown-item\" data-key=\"new\" href=\"#\" >").concat(__html('New'), "</a></li>\n                    <li><a class=\"dppi dropdown-item\" data-key=\"paid\" href=\"#\" >").concat(__html('Paid'), "</a></li>\n                    <li><a class=\"dppi dropdown-item\" data-key=\"processing\" href=\"#\" >").concat(__html('Processing'), "</a></li>\n                    <li><a class=\"dppi dropdown-item\" data-key=\"completed\" href=\"#\" >").concat(__html('Completed'), "</a></li>\n                    <li><a class=\"dppi dropdown-item\" data-key=\"canceled\" href=\"#\" >").concat(__html('Canceled'), "</a></li>\n                    <li><a class=\"dppi dropdown-item\" data-key=\"failed\" href=\"#\" >").concat(__html('Failed'), "</a></li>\n                    <li><a class=\"dppi dropdown-item\" data-key=\"refunded\" href=\"#\" >").concat(__html('Refunded'), "</a></li>\n                  </ul>\n              </div>\n              <div class=\"st-opts\" >\n                <div class=\"input-group-sm mb-0 justify-content-start mb-sm-0\" >\n                  <input id=\"usearch\" type=\"text\" class=\"inp form-control search-input\" autocomplete=\"off\" placeholder=\"").concat(__html('Search order'), "\">\n                </div>\n                <!-- <a id=\"viewSum\" href=\"#\" style=\"margin-left:16px;\">view summary</a> -->\n              </div>\n            </div>\n          </div>\n          <div class=\"qr-print-cnt d-none align-self-center my-3 my-md-0\">\n            <div class=\"d-inline-block\">\n              <input id=\"qr-number\" type=\"text\" class=\"inp form-control form-control-sm qr-number p-0 px-2 me-2 ms-0\" autocomplete=\"off\" style=\"max-width:100px;\" placeholder=\"").concat(__('QR number'), "\">\n            </div>\n            <div class=\"d-inline-block\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" fill=\"currentColor\" class=\"bi bi-qr-code-scan print-qr po\" viewBox=\"0 0 16 16\">\n                <path d=\"M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z\"/>\n                <path d=\"M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z\"/>\n                <path d=\"M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z\"/>\n                <path d=\"M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z\"/>\n                <path d=\"M12 9h2V8h-2v1Z\"/>\n              </svg>\n            </div>\n          </div> \n        </div>\n\n        <div id=\"orders-after-header\">\n\n\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card\">\n            <div class=\"card border-white shadow-sm border-0\">\n              <div class=\"card-body p-0\">\n \n                <div class=\"table-responsive\">\n                  <table class=\"table table-hover table-borderless align-middle table-striped table-p-list mb-0\">\n                    <thead>\n                      <tr>\n                        <th><span class=\"ps-1\">").concat(__html('From'), "</span></th>\n                        <th class=\"d-none d-sm-table-cell\">").concat(__html('Status'), "</th>\n                        <th>").concat(__html('Subtotal'), "</th>\n                        <th class=\"d-none d-sm-table-cell\">").concat(__html('Time'), "</th>\n                        <th></th>\n                      </tr>\n                    </thead>\n                    <tbody class=\"list\">\n\n                    </tbody>\n                  </table>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"modal order-modal\" tabindex=\"-1\" data-backdrop=\"static\" data-keyboard=\"false\">\n        <div class=\"modal-dialog \">\n          <div class=\"modal-content\">\n              <div class=\"modal-header\">\n                <h5 class=\"modal-title\"></h5>\n                <button type=\"button\" class=\"btn-close align-self-start-remove\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n              </div>\n              <div class=\"modal-body\">\n              \n              </div>\n              <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-primary btn-confirm\"></button>\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n              </div>\n          </div>\n        </div>\n      </div>\n\n    ");
  };

  var _this = {
    state: {
      firstLoad: true,
      changes: false,
      modalCont: null,
      modalOpen: false,
      playSound: {
        allowed: false,
        ids: null,
        nids: [],
        n: 0,
        max_times: 5,
        timer: null,
        audio: new Audio('https://kenzap.com/static/swiftly.mp3')
      },
      orderIDs: [],
      printLink: null,
      printRequest: null,
      user: {},
      orders: [],
      settings: {},
      qr_settings: {},
      orderSingle: [],
      updates: {
        last_order_id: '',
        last_order_update: 0
      },
      playTitleTimer: null,
      refreshTimer: null,
      statuses: [],
      limit: 200,
      slistLimit: 10,
      productsSuggestions: []
    },
    init: function init() {
      _this.getData();

      var cb = function cb(response) {
        if (_this.state.firstLoad) {
          _this.state.updates.last_order_id = response.last_order_id;
          _this.state.updates.last_order_update = response.last_order_update;
        }

        if (response.last_order_update != _this.state.updates.last_order_update) {
          playSound(_this, 1);

          _this.getData();

          _this.state.updates.last_order_id = response.last_order_id;
          _this.state.updates.last_order_update = response.last_order_update;
        }
      };

      _this.state.refreshTimer = setInterval(function () {
        ecommerceUpdates(_this, ['messages', 'last_order_id'], cb);
      }, 5000);
    },
    getData: function getData() {
      if (_this.state.firstLoad) showLoader();

      if (_this.state.printRequest) {
        printReceipt(_this, _this.state.printRequest, "user");
      }

      var s = document.querySelector('.search-input') ? document.querySelector('.search-input').value : '';
      var term = document.querySelector('#order-status') ? document.querySelector('#order-status').dataset.value : '';

      if (document.querySelector('body.modal-open')) {
        return;
      }

      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          query: {
            user: {
              type: 'authenticate',
              fields: ['avatar', 'id'],
              token: getCookie('kenzap_token')
            },
            locale: {
              type: 'locale',
              source: ['extension'],
              key: 'ecommerce'
            },
            orders: {
              type: 'find',
              key: 'ecommerce-order',
              fields: '*',
              term: term != '' ? 'status=\'' + term + '\'' : '',
              limit: _this.state.limit,
              search: {
                field: 'from',
                s: s
              },
              sortby: {
                field: 'created',
                order: 'DESC'
              }
            },
            settings: {
              type: 'get',
              key: 'ecommerce-settings',
              fields: ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_percent_auto', 'tax_percent', 'tax_display', 'fee_calc', 'fee_percent', 'fee_display', 'payment_methods', 'custom_payment_method', 'tables', 'table_list', 'add_products', 'add_products_list', 'templates']
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        hideLoader();

        if (response.success) {
          initHeader(response);

          _this.loadPageStructure();

          _this.renderPage(response);

          _this.initListeners();

          _this.initFooter();

          _this.state.firstLoad = false;
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    },
    authUser: function authUser(response) {
      if (response.user) {
        if (response.user.success == true) ;
      }
    },
    loadPageStructure: function loadPageStructure() {
      if (!_this.state.firstLoad) return;
      document.querySelector('#contents').innerHTML = HTMLContent();
    },
    renderPage: function renderPage(response) {
      if (_this.state.firstLoad) {
        initBreadcrumbs([{
          link: link('https://dashboard.kenzap.cloud'),
          text: __html('Dashboard')
        }, {
          link: link('/'),
          text: __html('E-commerce')
        }, {
          text: __html('Orders')
        }]);
        _this.state.statuses = {
          'new': {
            text: __html('New'),
            "class": 'btn-warning text-dark fw-light'
          },
          'paid': {
            text: __html('Paid'),
            "class": 'btn-primary fw-light'
          },
          'processing': {
            text: __html('Processing'),
            "class": 'btn-primary fw-light'
          },
          'completed': {
            text: __html('Completed'),
            "class": 'btn-success fw-light'
          },
          'canceled': {
            text: __html('Canceled'),
            "class": 'btn-secondary fw-light'
          },
          'failed': {
            text: __html('Failed'),
            "class": 'btn-danger fw-light'
          },
          'refunded': {
            text: __html('Refunded'),
            "class": 'btn-danger fw-light'
          }
        };
      }

      _this.state.user = response.user;
      _this.state.orders = response.orders;
      _this.state.meta = response.meta;
      _this.state.settings = response.settings;

      if (!_this.state.settings['templates']) {
        _this.state.settings['templates'] = [];
      }

      _this.state.settings.qr_print = isPrintQREnabled(_this);

      if (_this.state.settings.qr_print) {
        document.querySelector(".qr-print-cnt").classList.remove('d-none');
      }

      if (response.orders.length == 0) {
        document.querySelector(".table tbody").innerHTML = "<tr><td colspan=\"5\">".concat(__html("No orders to display."), "</td></tr>");
        return;
      }

      var orderIDsTemp = [];
      _this.state.newOrderCount = [];
      var list = '',
          new_ids = '';

      for (var i in response.orders) {
        orderIDsTemp.push(response.orders[i]._id);
        if (typeof response.orders[i].status === 'undefined') response.orders[i].status = 'new';
        if (response.orders[i].status == 'new') new_ids += response.orders[i].id;
        var applink = {
          "print": "[C]<u><font size=\"big\">ORDER{{order_id_short}}</font></u>\n[C]Fu Zhen Seafood\n[C]<u type=double>{{date_time}}</u>\n[C]\n[C]================================\" \n[L]\n[L]<b>BEAUTIFUL SHIRT</b>[R]9.99€\n[L]  + Size : S\n[L]\n[L]<b>AWESOME HAT</b>[R]24.99€\n[L]  + Size : 57/58\n[L]\n[C]--------------------------------\n[R]TOTAL PRICE :[R]34.98€\n[R]TAX :[R]4.23€"
        };
        var classN = _this.state.orderIDs.includes(response.orders[i]._id) || _this.state.firstLoad ? '' : 'new';
        list += "\n            <tr class=\"".concat(classN, "\">\n              <td class=\"details view-order\" data-id=\"").concat(response.orders[i]._id, "\" data-index=\"").concat(i, "\">\n                <div class=\"ps-1\" >\n                  <b class=\"\">").concat(response.orders[i].id, "</b> ").concat(response.orders[i].from, "\n                  <div class=\" elipsized fst-italic\">").concat(response.orders[i].note ? response.orders[i].note : "", "</div>\n                  <div class=\" d-sm-none\"> <span class=\"me-2\">").concat(_this.getStatus(response.orders[i].status), "</span> <span class=\"text-muted\">").concat(timeConverterAgo(__, response.meta.time, response.orders[i].created), "</span> </div>\n                </div>\n              </td>\n              <td class=\"d-none d-sm-table-cell\">\n                <span class=\"fs-12\">").concat(_this.getStatus(response.orders[i].status), "</span>\n              </td>\n              <td>\n                <span style=\"font-size:18px;\">").concat(priceFormat(_this, response.orders[i].total), "</span>\n              </td>\n              <td class=\"d-none d-sm-table-cell\">\n                <span style=\"font-size:18px;\">").concat(timeConverterAgo(__, response.meta.time, response.orders[i].created), "</span>\n              </td>\n              <td class=\"last\">\n                <a href=\"#\" data-id=\"").concat(response.orders[i]._id, "\" data-index=\"").concat(i, "\" class=\"view-order text-success d-none me-4\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-eye\" viewBox=\"0 0 16 16\">\n                    <path d=\"M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z\"/>\n                    <path d=\"M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z\"/>\n                </svg></a>\n                <a href=\"kenzapprint://kenzapprint.app?data=").concat(encodeURIComponent(JSON.stringify(applink)), "\" data-id=\"").concat(response.orders[i]._id, "\" data-index=\"").concat(i, "\" class=\"print-order-dis d-none text-success me-2\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"bi bi-printer me-2\" viewBox=\"0 0 16 16\">\n                    <path d=\"M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z\"/>\n                    <path d=\"M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z\"/>\n                </svg></a>\n                <a href=\"#\" data-id=\"").concat(response.orders[i]._id, "\" data-index=\"").concat(i, "\" class=\"remove-order text-danger me-2\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19\" height=\"19\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\">\n                    <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/>\n                    <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/>\n                </svg></a>\n              </td>\n            </tr>");
      }

      if (_this.state.playSound.ids && _this.state.playSound.ids != new_ids && _this.state.playSound.ids.length < new_ids.length) {
        playSound(_this, 3);
      }

      _this.state.playSound.ids = new_ids;
      _this.state.orderIDs = orderIDsTemp;
      document.querySelector(".table tbody").innerHTML = list;
    },
    getStatus: function getStatus(status) {
      return "<div class=\"badge ".concat(_this.state.statuses[status]["class"], "\">").concat(_this.state.statuses[status].text, "</div>");
    },
    initListeners: function initListeners() {
      tables.render(_this);
      preview$1.viewOrder(_this);
      onClick$1('.remove-order', _this.listeners.removeOrder);
      onClick$1('.st-table li a', _this.listeners.changeStatus);
      if (!_this.state.firstLoad) return;
      autoPrint(_this);
      preview$1.newOrder(_this);
      onClick$1('.modal .btn-primary', _this.listeners.modalSuccessBtn);
      onKeyUp('.search-input', _this.listeners.searchOrders);
      document.body.addEventListener('touchstart', function () {
        _this.state.playSound.allowed = true;
      }, false);
      document.body.addEventListener('mousedown', function () {
        _this.state.playSound.allowed = true;
      }, false);
      window.addEventListener("hashchange", function (e) {
        if (_this.modalCont) {
          e.preventDefault();
          _this.modalOpen = false;

          _this.modalCont.hide();

          return false;
        }
      });
    },
    listeners: {
      newOrder: function newOrder(e) {},
      changeStatus: function changeStatus(e) {
        e.preventDefault();
        var os = document.querySelector('#order-status');

        if (e.currentTarget.dataset.key == "") {
          os.innerHTML = __html('All');
          os.dataset.value = '';
        } else {
          os.innerHTML = _this.state.statuses[e.currentTarget.dataset.key].text;
          os.dataset.value = e.currentTarget.dataset.key;
        }

        var list = [];
        Object.keys(_this.state.statuses).forEach(function (key) {
          list = _this.state.statuses[key]["class"].split(' ');
          list.forEach(function (key) {
            os.classList.remove(key);
          });
          os.classList.remove('btn-outline-secondary');
        });

        if (e.currentTarget.dataset.key == '') {
          os.classList.add('btn-outline-secondary');
        } else {
          list = _this.state.statuses[e.currentTarget.dataset.key]["class"].split(' ');
          list.forEach(function (key) {
            os.classList.add(key);
          });
        }

        _this.getData();
      },
      removeOrder: function removeOrder(e) {
        e.preventDefault();
        var c = confirm(__('Completely remove this order?'));
        if (!c) return;
        fetch('https://api-v1.kenzap.cloud/ecommerce/', {
          method: 'post',
          headers: headers,
          body: JSON.stringify({
            query: {
              product: {
                type: 'delete-order',
                id: e.currentTarget.dataset.id,
                sid: spaceID()
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
      searchOrders: function searchOrders(e) {
        e.preventDefault();

        _this.getData();
      },
      modalSuccessBtn: function modalSuccessBtn(e) {
        _this.listeners.modalSuccessBtnFunc(e);
      },
      modalSuccessBtnFunc: null
    },
    updateOrder: function updateOrder(i, id) {
      if (!_this.state.changes && _this.state.printRequest) {
        printReceipt(_this, _this.state.printRequest, "user");

        _this.modalCont.hide();

        return;
      }

      var modal = document.querySelector(".modal");
      if (modal.querySelector(".btn-confirm").dataset.loading === 'true') return;
      modal.querySelector(".btn-confirm").dataset.loading = true;
      modal.querySelector(".btn-confirm").innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' + __html('Loading..');
      var data = {};

      var _iterator = _createForOfIteratorHelper(document.querySelectorAll('.order-form')),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var s = _step.value;

          switch (s.dataset.type) {
            case 'key':
              data[s.dataset.id] = s.dataset.value;
              break;

            case 'key-number':
              data[s.dataset.id] = makeNumber(s.dataset.value);
              break;

            case 'items':
              data['items'] = [];

              var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll('.order-item-row-active')),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var item = _step2.value;
                  var vars = JSON.parse(unescape(item.dataset.vars));
                  var cats = JSON.parse(unescape(item.dataset.cats));
                  var discounts = JSON.parse(unescape(item.dataset.discounts));
                  var obj = {
                    "id": item.dataset.id,
                    "qty": parseInt(item.querySelector('.item-qty').dataset.value),
                    "cats": cats ? cats : [],
                    "discounts": discounts ? discounts : [],
                    "note": item.querySelector('.item-note').innerHTML,
                    "type": "new",
                    "index": "0",
                    "price": parseFloat(item.querySelector('.item-total').dataset.price),
                    "sdesc": item.querySelector('.item-title').dataset.sdesc,
                    "title": item.querySelector('.item-title').dataset.value,
                    "total": parseFloat(item.querySelector('.item-total').dataset.value),
                    "variations": id == 'new' ? [] : vars ? vars : []
                  };

                  if (item.querySelector('.item-total').dataset.discount_percent) {
                    obj.discount_percent = item.querySelector('.item-total').dataset.discount_percent;
                  }

                  if (item.querySelector('.item-total').dataset.discount_value) {
                    obj.discount_value = item.querySelector('.edit-total').dataset.discount_value;
                  }

                  data['items'].push(obj);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

              break;

            case 'text':
              data[s.dataset.id] = s.innerHTML;
              break;

            case 'email':
            case 'emails':
            case 'select':
            case 'textarea':
              data[s.id] = s.value;
              break;

            case 'radio':
              data[s.id] = s.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('input:checked').value;
              break;

            case 'price':
              data['price'] = JSON.parse(decodeURIComponent(s.dataset.price));
              data['total'] = data['price']['total'];
              data['total_all'] = data['price']['grand_total'];
              if (document.querySelector(".payment-method-select")) data['price']['payment_method'] = document.querySelector(".payment-method-select").value;
              break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var dateObj = new Date();
      data['created_ymd'] = dateObj.getUTCFullYear() + '' + mt(dateObj.getUTCMonth() + 1) + '' + mt(dateObj.getUTCDate());
      data['created_ym'] = dateObj.getUTCFullYear() + '' + mt(dateObj.getUTCMonth() + 1);
      data['created_y'] = dateObj.getUTCFullYear() + '';
      data['printed'] = _this.state.printRequest ? true : false;
      data['notify'] = false;
      preview$1._this.state.changes = false;

      if (id == 'new') {
        data['name'] = data['from'];
        data['customer'] = {
          "first_name": data['from'],
          "last_name": "",
          "kid": 0
        };
        fetch('https://api-v1.kenzap.cloud/ecommerce/', {
          method: 'post',
          headers: headers,
          body: JSON.stringify({
            query: {
              order: {
                type: 'create-order',
                key: 'ecommerce-order',
                data: data
              }
            }
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            _this.modalCont.hide();

            toast(__('Order created'));
            if (_this.state.printRequest == 'new') _this.state.printRequest = data._id;

            _this.getData();
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          parseApiError(error);
        });
      } else {
        fetch('https://api-v1.kenzap.cloud/ecommerce/', {
          method: 'post',
          headers: headers,
          body: JSON.stringify({
            query: {
              order: {
                type: 'update-order',
                id: id,
                sid: spaceID(),
                data: data
              }
            }
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            _this.modalCont.hide();

            toast(__('Order updated'));

            _this.getData();
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          parseApiError(error);
        });
      }
    },
    initFooter: function initFooter$1() {
      initFooter(__('Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>'), '');
    }
  };

  _this.init();

})();
//# sourceMappingURL=index.js.map
