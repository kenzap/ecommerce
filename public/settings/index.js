
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

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
              "'": '&#39;',
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
  var getCurrencies = function getCurrencies() {
    return [{
      "name": "Afghan Afghani",
      "code": "AFA",
      "symbol": "؋"
    }, {
      "name": "Albanian Lek",
      "code": "ALL",
      "symbol": "Lek"
    }, {
      "name": "Algerian Dinar",
      "code": "DZD",
      "symbol": "دج"
    }, {
      "name": "Angolan Kwanza",
      "code": "AOA",
      "symbol": "Kz"
    }, {
      "name": "Argentine Peso",
      "code": "ARS",
      "symbol": "$"
    }, {
      "name": "Armenian Dram",
      "code": "AMD",
      "symbol": "֏"
    }, {
      "name": "Aruban Florin",
      "code": "AWG",
      "symbol": "ƒ"
    }, {
      "name": "Australian Dollar",
      "code": "AUD",
      "symbol": "$"
    }, {
      "name": "Azerbaijani Manat",
      "code": "AZN",
      "symbol": "m"
    }, {
      "name": "Bahamian Dollar",
      "code": "BSD",
      "symbol": "B$"
    }, {
      "name": "Bahraini Dinar",
      "code": "BHD",
      "symbol": ".د.ب"
    }, {
      "name": "Bangladeshi Taka",
      "code": "BDT",
      "symbol": "৳"
    }, {
      "name": "Barbadian Dollar",
      "code": "BBD",
      "symbol": "Bds$"
    }, {
      "name": "Belarusian Ruble",
      "code": "BYR",
      "symbol": "Br"
    }, {
      "name": "Belgian Franc",
      "code": "BEF",
      "symbol": "fr"
    }, {
      "name": "Belize Dollar",
      "code": "BZD",
      "symbol": "$"
    }, {
      "name": "Bermudan Dollar",
      "code": "BMD",
      "symbol": "$"
    }, {
      "name": "Bhutanese Ngultrum",
      "code": "BTN",
      "symbol": "Nu."
    }, {
      "name": "Bitcoin",
      "code": "BTC",
      "symbol": "฿"
    }, {
      "name": "Bolivian Boliviano",
      "code": "BOB",
      "symbol": "Bs."
    }, {
      "name": "Bosnia-Herzegovina Convertible Mark",
      "code": "BAM",
      "symbol": "KM"
    }, {
      "name": "Botswanan Pula",
      "code": "BWP",
      "symbol": "P"
    }, {
      "name": "Brazilian Real",
      "code": "BRL",
      "symbol": "R$"
    }, {
      "name": "British Pound Sterling",
      "code": "GBP",
      "symbol": "£"
    }, {
      "name": "Brunei Dollar",
      "code": "BND",
      "symbol": "B$"
    }, {
      "name": "Bulgarian Lev",
      "code": "BGN",
      "symbol": "Лв."
    }, {
      "name": "Burundian Franc",
      "code": "BIF",
      "symbol": "FBu"
    }, {
      "name": "Cambodian Riel",
      "code": "KHR",
      "symbol": "KHR"
    }, {
      "name": "Canadian Dollar",
      "code": "CAD",
      "symbol": "$"
    }, {
      "name": "Cape Verdean Escudo",
      "code": "CVE",
      "symbol": "$"
    }, {
      "name": "Cayman Islands Dollar",
      "code": "KYD",
      "symbol": "$"
    }, {
      "name": "CFA Franc BCEAO",
      "code": "XOF",
      "symbol": "CFA"
    }, {
      "name": "CFA Franc BEAC",
      "code": "XAF",
      "symbol": "FCFA"
    }, {
      "name": "CFP Franc",
      "code": "XPF",
      "symbol": "₣"
    }, {
      "name": "Chilean Peso",
      "code": "CLP",
      "symbol": "$"
    }, {
      "name": "Chinese Yuan",
      "code": "CNY",
      "symbol": "¥"
    }, {
      "name": "Colombian Peso",
      "code": "COP",
      "symbol": "$"
    }, {
      "name": "Comorian Franc",
      "code": "KMF",
      "symbol": "CF"
    }, {
      "name": "Congolese Franc",
      "code": "CDF",
      "symbol": "FC"
    }, {
      "name": "Costa Rican Colón",
      "code": "CRC",
      "symbol": "₡"
    }, {
      "name": "Croatian Kuna",
      "code": "HRK",
      "symbol": "kn"
    }, {
      "name": "Cuban Convertible Peso",
      "code": "CUC",
      "symbol": "$, CUC"
    }, {
      "name": "Czech Republic Koruna",
      "code": "CZK",
      "symbol": "Kč"
    }, {
      "name": "Danish Krone",
      "code": "DKK",
      "symbol": "Kr."
    }, {
      "name": "Djiboutian Franc",
      "code": "DJF",
      "symbol": "Fdj"
    }, {
      "name": "Dominican Peso",
      "code": "DOP",
      "symbol": "$"
    }, {
      "name": "East Caribbean Dollar",
      "code": "XCD",
      "symbol": "$"
    }, {
      "name": "Egyptian Pound",
      "code": "EGP",
      "symbol": "ج.م"
    }, {
      "name": "Eritrean Nakfa",
      "code": "ERN",
      "symbol": "Nfk"
    }, {
      "name": "Estonian Kroon",
      "code": "EEK",
      "symbol": "kr"
    }, {
      "name": "Ethiopian Birr",
      "code": "ETB",
      "symbol": "Nkf"
    }, {
      "name": "Euro",
      "code": "EUR",
      "symbol": "€"
    }, {
      "name": "Falkland Islands Pound",
      "code": "FKP",
      "symbol": "£"
    }, {
      "name": "Fijian Dollar",
      "code": "FJD",
      "symbol": "FJ$"
    }, {
      "name": "Gambian Dalasi",
      "code": "GMD",
      "symbol": "D"
    }, {
      "name": "Georgian Lari",
      "code": "GEL",
      "symbol": "ლ"
    }, {
      "name": "German Mark",
      "code": "DEM",
      "symbol": "DM"
    }, {
      "name": "Ghanaian Cedi",
      "code": "GHS",
      "symbol": "GH₵"
    }, {
      "name": "Gibraltar Pound",
      "code": "GIP",
      "symbol": "£"
    }, {
      "name": "Greek Drachma",
      "code": "GRD",
      "symbol": "₯, Δρχ, Δρ"
    }, {
      "name": "Guatemalan Quetzal",
      "code": "GTQ",
      "symbol": "Q"
    }, {
      "name": "Guinean Franc",
      "code": "GNF",
      "symbol": "FG"
    }, {
      "name": "Guyanaese Dollar",
      "code": "GYD",
      "symbol": "$"
    }, {
      "name": "Haitian Gourde",
      "code": "HTG",
      "symbol": "G"
    }, {
      "name": "Honduran Lempira",
      "code": "HNL",
      "symbol": "L"
    }, {
      "name": "Hong Kong Dollar",
      "code": "HKD",
      "symbol": "$"
    }, {
      "name": "Hungarian Forint",
      "code": "HUF",
      "symbol": "Ft"
    }, {
      "name": "Icelandic króna",
      "code": "ISK",
      "symbol": "kr"
    }, {
      "name": "Indian Rupee",
      "code": "INR",
      "symbol": "₹"
    }, {
      "name": "Indonesian Rupiah",
      "code": "IDR",
      "symbol": "Rp"
    }, {
      "name": "Iranian Rial",
      "code": "IRR",
      "symbol": "﷼"
    }, {
      "name": "Iraqi Dinar",
      "code": "IQD",
      "symbol": "د.ع"
    }, {
      "name": "Israeli New Sheqel",
      "code": "ILS",
      "symbol": "₪"
    }, {
      "name": "Italian Lira",
      "code": "ITL",
      "symbol": "L,£"
    }, {
      "name": "Jamaican Dollar",
      "code": "JMD",
      "symbol": "J$"
    }, {
      "name": "Japanese Yen",
      "code": "JPY",
      "symbol": "¥"
    }, {
      "name": "Jordanian Dinar",
      "code": "JOD",
      "symbol": "ا.د"
    }, {
      "name": "Kazakhstani Tenge",
      "code": "KZT",
      "symbol": "лв"
    }, {
      "name": "Kenyan Shilling",
      "code": "KES",
      "symbol": "KSh"
    }, {
      "name": "Kuwaiti Dinar",
      "code": "KWD",
      "symbol": "ك.د"
    }, {
      "name": "Kyrgystani Som",
      "code": "KGS",
      "symbol": "лв"
    }, {
      "name": "Laotian Kip",
      "code": "LAK",
      "symbol": "₭"
    }, {
      "name": "Latvian Lats",
      "code": "LVL",
      "symbol": "Ls"
    }, {
      "name": "Lebanese Pound",
      "code": "LBP",
      "symbol": "£"
    }, {
      "name": "Lesotho Loti",
      "code": "LSL",
      "symbol": "L"
    }, {
      "name": "Liberian Dollar",
      "code": "LRD",
      "symbol": "$"
    }, {
      "name": "Libyan Dinar",
      "code": "LYD",
      "symbol": "د.ل"
    }, {
      "name": "Lithuanian Litas",
      "code": "LTL",
      "symbol": "Lt"
    }, {
      "name": "Macanese Pataca",
      "code": "MOP",
      "symbol": "$"
    }, {
      "name": "Macedonian Denar",
      "code": "MKD",
      "symbol": "ден"
    }, {
      "name": "Malagasy Ariary",
      "code": "MGA",
      "symbol": "Ar"
    }, {
      "name": "Malawian Kwacha",
      "code": "MWK",
      "symbol": "MK"
    }, {
      "name": "Malaysian Ringgit",
      "code": "MYR",
      "symbol": "RM"
    }, {
      "name": "Maldivian Rufiyaa",
      "code": "MVR",
      "symbol": "Rf"
    }, {
      "name": "Mauritanian Ouguiya",
      "code": "MRO",
      "symbol": "MRU"
    }, {
      "name": "Mauritian Rupee",
      "code": "MUR",
      "symbol": "₨"
    }, {
      "name": "Mexican Peso",
      "code": "MXN",
      "symbol": "$"
    }, {
      "name": "Moldovan Leu",
      "code": "MDL",
      "symbol": "L"
    }, {
      "name": "Mongolian Tugrik",
      "code": "MNT",
      "symbol": "₮"
    }, {
      "name": "Moroccan Dirham",
      "code": "MAD",
      "symbol": "MAD"
    }, {
      "name": "Mozambican Metical",
      "code": "MZM",
      "symbol": "MT"
    }, {
      "name": "Myanmar Kyat",
      "code": "MMK",
      "symbol": "K"
    }, {
      "name": "Namibian Dollar",
      "code": "NAD",
      "symbol": "$"
    }, {
      "name": "Nepalese Rupee",
      "code": "NPR",
      "symbol": "₨"
    }, {
      "name": "Netherlands Antillean Guilder",
      "code": "ANG",
      "symbol": "ƒ"
    }, {
      "name": "New Taiwan Dollar",
      "code": "TWD",
      "symbol": "$"
    }, {
      "name": "New Zealand Dollar",
      "code": "NZD",
      "symbol": "$"
    }, {
      "name": "Nicaraguan Córdoba",
      "code": "NIO",
      "symbol": "C$"
    }, {
      "name": "Nigerian Naira",
      "code": "NGN",
      "symbol": "₦"
    }, {
      "name": "North Korean Won",
      "code": "KPW",
      "symbol": "₩"
    }, {
      "name": "Norwegian Krone",
      "code": "NOK",
      "symbol": "kr"
    }, {
      "name": "Omani Rial",
      "code": "OMR",
      "symbol": ".ع.ر"
    }, {
      "name": "Pakistani Rupee",
      "code": "PKR",
      "symbol": "₨"
    }, {
      "name": "Panamanian Balboa",
      "code": "PAB",
      "symbol": "B/."
    }, {
      "name": "Papua New Guinean Kina",
      "code": "PGK",
      "symbol": "K"
    }, {
      "name": "Paraguayan Guarani",
      "code": "PYG",
      "symbol": "₲"
    }, {
      "name": "Peruvian Nuevo Sol",
      "code": "PEN",
      "symbol": "S/."
    }, {
      "name": "Philippine Peso",
      "code": "PHP",
      "symbol": "₱"
    }, {
      "name": "Polish Zloty",
      "code": "PLN",
      "symbol": "zł"
    }, {
      "name": "Qatari Rial",
      "code": "QAR",
      "symbol": "ق.ر"
    }, {
      "name": "Romanian Leu",
      "code": "RON",
      "symbol": "lei"
    }, {
      "name": "Russian Ruble",
      "code": "RUB",
      "symbol": "₽"
    }, {
      "name": "Rwandan Franc",
      "code": "RWF",
      "symbol": "FRw"
    }, {
      "name": "Salvadoran Colón",
      "code": "SVC",
      "symbol": "₡"
    }, {
      "name": "Samoan Tala",
      "code": "WST",
      "symbol": "SAT"
    }, {
      "name": "Saudi Riyal",
      "code": "SAR",
      "symbol": "﷼"
    }, {
      "name": "Serbian Dinar",
      "code": "RSD",
      "symbol": "din"
    }, {
      "name": "Seychellois Rupee",
      "code": "SCR",
      "symbol": "SRe"
    }, {
      "name": "Sierra Leonean Leone",
      "code": "SLL",
      "symbol": "Le"
    }, {
      "name": "Singapore Dollar",
      "code": "SGD",
      "symbol": "$"
    }, {
      "name": "Slovak Koruna",
      "code": "SKK",
      "symbol": "Sk"
    }, {
      "name": "Solomon Islands Dollar",
      "code": "SBD",
      "symbol": "Si$"
    }, {
      "name": "Somali Shilling",
      "code": "SOS",
      "symbol": "Sh.so."
    }, {
      "name": "South African Rand",
      "code": "ZAR",
      "symbol": "R"
    }, {
      "name": "South Korean Won",
      "code": "KRW",
      "symbol": "₩"
    }, {
      "name": "Special Drawing Rights",
      "code": "XDR",
      "symbol": "SDR"
    }, {
      "name": "Sri Lankan Rupee",
      "code": "LKR",
      "symbol": "Rs"
    }, {
      "name": "St. Helena Pound",
      "code": "SHP",
      "symbol": "£"
    }, {
      "name": "Sudanese Pound",
      "code": "SDG",
      "symbol": ".س.ج"
    }, {
      "name": "Surinamese Dollar",
      "code": "SRD",
      "symbol": "$"
    }, {
      "name": "Swazi Lilangeni",
      "code": "SZL",
      "symbol": "E"
    }, {
      "name": "Swedish Krona",
      "code": "SEK",
      "symbol": "kr"
    }, {
      "name": "Swiss Franc",
      "code": "CHF",
      "symbol": "CHf"
    }, {
      "name": "Syrian Pound",
      "code": "SYP",
      "symbol": "LS"
    }, {
      "name": "São Tomé and Príncipe Dobra",
      "code": "STD",
      "symbol": "Db"
    }, {
      "name": "Tajikistani Somoni",
      "code": "TJS",
      "symbol": "SM"
    }, {
      "name": "Tanzanian Shilling",
      "code": "TZS",
      "symbol": "TSh"
    }, {
      "name": "Thai Baht",
      "code": "THB",
      "symbol": "฿"
    }, {
      "name": "Tongan Pa'anga",
      "code": "TOP",
      "symbol": "$"
    }, {
      "name": "Trinidad & Tobago Dollar",
      "code": "TTD",
      "symbol": "$"
    }, {
      "name": "Tunisian Dinar",
      "code": "TND",
      "symbol": "ت.د"
    }, {
      "name": "Turkish Lira",
      "code": "TRY",
      "symbol": "₺"
    }, {
      "name": "Turkmenistani Manat",
      "code": "TMT",
      "symbol": "T"
    }, {
      "name": "Ugandan Shilling",
      "code": "UGX",
      "symbol": "USh"
    }, {
      "name": "Ukrainian Hryvnia",
      "code": "UAH",
      "symbol": "₴"
    }, {
      "name": "United Arab Emirates Dirham",
      "code": "AED",
      "symbol": "إ.د"
    }, {
      "name": "Uruguayan Peso",
      "code": "UYU",
      "symbol": "$"
    }, {
      "name": "US Dollar",
      "code": "USD",
      "symbol": "$"
    }, {
      "name": "Uzbekistan Som",
      "code": "UZS",
      "symbol": "лв"
    }, {
      "name": "Vanuatu Vatu",
      "code": "VUV",
      "symbol": "VT"
    }, {
      "name": "Venezuelan  Bolívar",
      "code": "VEF",
      "symbol": "Bs"
    }, {
      "name": "Vietnamese Dong",
      "code": "VND",
      "symbol": "₫"
    }, {
      "name": "Yemeni Rial",
      "code": "YER",
      "symbol": "﷼"
    }, {
      "name": "Zambian Kwacha",
      "code": "ZMK",
      "symbol": "ZK"
    }];
  };

  var HTMLContent = function HTMLContent(__) {
    return "\n    <div class=\"container p-edit\">\n        <div class=\"d-md-flex justify-content-between bd-highlight mb-3\">\n            <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n            <button class=\"btn btn-primary btn-save mt-3 mb-1 mt-md-0 mb-md-0\" type=\"button\">".concat(__html('Save changes'), "</button>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card\">\n              <div class=\"card border-white shadow-sm p-sm-3 \">\n                <nav class=\"nav tab-content mb-4\" role=\"tablist\">\n                    <div class=\"nav nav-tabs\" id=\"nav-tab\" role=\"tablist\">\n                        <a class=\"nav-link active\" id=\"nav-notifications-link\" data-bs-toggle=\"tab\" data-bs-target=\"#nav-notifications\" type=\"button\" role=\"tab\" aria-controls=\"nav-notifications\" aria-selected=\"true\" href=\"#\">").concat(__html('General'), "</a>\n                        <a class=\"nav-link d-none\" id=\"nav-currency-link\" data-bs-toggle=\"tab\" data-bs-target=\"#nav-currency\" type=\"button\" role=\"tab\" aria-controls=\"nav-currency\" aria-selected=\"true\" href=\"#\">").concat(__html('Currency &amp; Tax'), "</a>\n                        <a class=\"nav-link\" id=\"nav-payout-link\" data-bs-toggle=\"tab\" data-bs-target=\"#nav-payout\" type=\"button\" role=\"tab\" aria-controls=\"nav-payout\" aria-selected=\"true\"  href=\"#\">").concat(__html('Payout'), "</a>\n                        <a class=\"nav-link\" id=\"nav-tax-link\" data-bs-toggle=\"tab\" data-bs-target=\"#nav-tax\" type=\"button\" role=\"tab\" aria-controls=\"nav-tax\" aria-selected=\"true\"  href=\"#\">").concat(__html('Legal'), "</a>\n                    </div>\n                </nav>\n                <div class=\"card-body tab-content\" id=\"nav-tabContent\">\n                  <div class=\"tab-pane fade show active\" id=\"nav-notifications\" role=\"tabpanel\" aria-labelledby=\"nav-notifications-link\">\n                    \n                    <h4 id=\"h-orders\" class=\"card-title mb-4\">").concat(__html('Orders'), "</h4>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Order ID'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"last_order_id\" type=\"text\" class=\"form-control inp\" name=\"last_order_id\" data-type=\"emails\">\n                            <p class=\"form-text\">").concat(__html('Define next new order ID number.'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Auto complete'), "</label>\n                          <div class=\"col-sm-9\">\n                            <select id=\"auto_complete\" class=\"form-select inp\" name=\"auto_complete\" data-type=\"select\">\n                                <option value=\"\">").concat(__html('None'), "</option>\n                                <option value=\"60\">").concat(__html('1 minute'), "</option>\n                                <option value=\"300\">").concat(__html('5 minutes'), "</option>\n                                <option value=\"1200\">").concat(__html('20 minutes'), "</option>\n                                <option value=\"3600\">").concat(__html('1 hour'), "</option>\n                                <option value=\"43200\">").concat(__html('12 hours'), "</option>\n                                <option value=\"86400\">").concat(__html('24 hours'), "</option>\n                            </select>\n                            <p class=\"form-text\">").concat(__html('Auto complete orders after certain amount of time.'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    \n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Tables'), "</label>\n                          <div class=\"col-sm-9\">\n                            <div class=\"form-check\">\n                              <input id=\"tables\" class=\"form-check-input inp\" name=\"tables\" type=\"checkbox\" value=\"1\" data-type=\"checkbox\">\n                              <label class=\"form-check-label\" for=\"tables\">\n                                ").concat(__html('Table mode'), "\n                              </label>\n                            </div>\n                            <p class=\"form-text\">").concat(__html('Enable table mode in orders dashboard.'), "</p>\n                          </div> \n                        </div>\n                      </div>\n          \n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('List of tables'), "</label>\n                          <div class=\"col-sm-9\">\n                            <textarea id=\"table_list\" class=\"form-control inp\" name=\"table_list\" rows=\"4\" data-type=\"text\" style=\"font-size:13px;font-family: monospace;\"></textarea>\n                            <p class=\"form-text\">").concat(__html('Provide one table per line. Example: 5.'), "</p>\n                          </div> \n                        </div>\n                      </div>\n                    </div>\n                    \n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Products'), "</label>\n                          <div class=\"col-sm-9\">\n                            <div class=\"form-check\">\n                              <input id=\"add_products\" class=\"form-check-input inp\" name=\"add_products\" type=\"checkbox\" value=\"1\" data-type=\"checkbox\">\n                              <label class=\"form-check-label\" for=\"check\">\n                                ").concat(__html('Auto add products'), "\n                              </label>\n                            </div>\n                            <p class=\"form-text\">").concat(__html('Automatically add products to new orders.'), "</p>\n                          </div> \n                        </div>\n                      </div>\n          \n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('List of products'), "</label>\n                          <div class=\"col-sm-9\">\n                            <textarea id=\"add_products_list\" class=\"form-control inp\" name=\"add_products_list\" rows=\"2\" data-type=\"text\" style=\"font-size:13px;font-family: monospace;\"></textarea>\n                            <p class=\"form-text\">").concat(__html('Provide one product ID per line. Example: e98d438cby6g..'), "</p>\n                          </div> \n                        </div>\n                      </div>\n                    </div>\n\n                    <h4 id=\"h-notifications\" class=\"card-title mb-4 mt-4\">").concat(__html('Notifications'), "</h4>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('New order'), "</label>\n                          <div class=\"col-sm-9\">\n                            <select id=\"notify_new_order\" class=\"form-select inp\" name=\"notify_new_order\" data-type=\"select\">\n                                <option value=\"\">").concat(__html('None'), "</option>\n                                <option value=\"client\">").concat(__html('Client'), "</option>\n                                <option value=\"admin\">").concat(__html('Administrator'), "</option>\n                                <option value=\"both\">").concat(__html('Client and administrator'), "</option>\n                            </select>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Emails'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"notify_new_order_emails\" type=\"text\" class=\"form-control inp\" name=\"notify_new_order_emails\" data-type=\"emails\">\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Cancelled order'), "</label>\n                          <div class=\"col-sm-9\">\n                            <select id=\"notify_cancel_order\" class=\"form-select inp\" name=\"notify_cancel_order\" data-type=\"select\">\n                                <option value=\"\">").concat(__html('None'), "</option>\n                                <option value=\"client\">").concat(__html('Client'), "</option>\n                                <option value=\"admin\">").concat(__html('Administrator'), "</option>\n                                <option value=\"both\">").concat(__html('Client and administrator'), "</option>\n                            </select>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Emails'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"notify_cancel_order_emails\" type=\"text\" class=\"form-control inp\" name=\"notify_cancel_order_emails\" data-type=\"emails\">\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Processing order'), "</label>\n                          <div class=\"col-sm-9\">\n                            <select id=\"notify_proc_order\" class=\"form-select inp\" name=\"notify_proc_order\" data-type=\"select\">\n                                <option value=\"\">").concat(__html('None'), "</option>\n                                <option value=\"client\">").concat(__html('Client'), "</option>\n                                <option value=\"admin\">").concat(__html('Administrator'), "</option>\n                                <option value=\"both\">").concat(__html('Client and administrator'), "</option>\n                            </select>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Emails'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"notify_proc_order_emails\" type=\"text\" class=\"form-control inp\" name=\"notify_proc_order_emails\" data-type=\"emails\">\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Refunded order'), "</label>\n                          <div class=\"col-sm-9\">\n                            <select id=\"notify_refunded_order\" class=\"form-select inp\" name=\"notify_refunded_order\" data-type=\"select\">\n                                <option value=\"\">").concat(__html('None'), "</option>\n                                <option value=\"client\">").concat(__html('Client'), "</option>\n                                <option value=\"admin\">").concat(__html('Administrator'), "</option>\n                                <option value=\"both\">").concat(__html('Client and administrator'), "</option>\n                            </select>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Emails'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"notify_refunded_order_emails\" type=\"text\" class=\"form-control inp\" name=\"notify_refunded_order_emails\" data-type=\"emails\">\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Completed order'), "</label>\n                          <div class=\"col-sm-9\">\n                            <select id=\"notify_completed_order\" class=\"form-select inp\" name=\"notify_completed_order\" data-type=\"select\">\n                                <option value=\"\">").concat(__html('None'), "</option>\n                                <option value=\"client\">").concat(__html('Client'), "</option>\n                                <option value=\"admin\">").concat(__html('Administrator'), "</option>\n                                <option value=\"both\">").concat(__html('Client and administrator'), "</option>\n                            </select>\n                            <p class=\"form-text\">").concat(__html('Choose how to trigger notifications.'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Emails'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"notify_completed_order_emails\" type=\"text\" class=\"form-control inp\" name=\"notify_completed_order_emails\" data-type=\"emails\">\n                            <p class=\"form-text d-none\">").concat(__html('Example: alex@kenzap.com, orders@kenzap.com'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Low stock'), "</label>\n                          <div class=\"col-sm-9\">\n                            <select id=\"notify_low_stock\" class=\"form-select inp\" name=\"notify_low_stock\" data-type=\"select\">\n                                <option value=\"\">").concat(__html('None'), "</option>\n                                <option value=\"dashboard\">").concat(__html('Via dashboard'), "</option>\n                                <option value=\"email\">").concat(__html('Via email'), "</option>\n                                <option value=\"all\">").concat(__html('Via dashboard and email'), "</option>\n                            </select>\n                            <p class=\"form-text\">").concat(__html('Product low stock notification settings.'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Emails'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"notify_low_stock_emails\" type=\"text\" class=\"form-control inp\" name=\"notify_low_stock_emails\" data-type=\"emails\">\n                            <p class=\"form-text\">").concat(__html('Example: alex@kenzap.com, orders@kenzap.com'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n\n                    <h4 id=\"h-currency\" class=\"card-title mb-4 mt-4\">").concat(__html('Currency'), "</h4>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Currency'), "</label>\n                          <div class=\"col-sm-9\">\n                            <select id=\"currency\" class=\"form-select inp\" name=\"currency\" data-type=\"select\">\n                              \n                            \n                            </select>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Currency symbol'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"currency_symb\" type=\"text\" class=\"form-select inp\" name=\"currency_symb\" value=\"\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Position'), "</label>\n                          <div class=\"col-sm-9\">\n                            <select id=\"currency_symb_loc\" class=\"form-select inp\" name=\"currency_symb_loc\" data-type=\"select\">\n                              <option value=\"left\">").concat(__html('Left'), "</option>\n                              <option value=\"right\">").concat(__html('Right'), "</option>\n                              <option value=\"left_space\">").concat(__html('Left with space'), "</option>\n                              <option value=\"right_space\">").concat(__html('Right with space'), "</option>\n                            </select>\n                            <p class=\"form-text\">").concat(__html('Currency position symbol.'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n\n                      </div>\n                    </div>\n\n                    <h4 id=\"h-tax\" class=\"card-title mb-4 mt-4\">").concat(__html('Tax'), "</h4>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Tax'), "</label>\n                          <div class=\"col-sm-9\">\n                            <div class=\"form-check\">\n                              <input id=\"tax_calc\" class=\"form-check-input inp\" name=\"tax_calc\" type=\"checkbox\" value=\"1\" data-type=\"checkbox\">\n                              <label class=\"form-check-label\" for=\"tax_calc\">\n                                ").concat(__html('Calculate'), "\n                              </label>\n                            </div>\n                            <p class=\"form-text\">").concat(__html('Enable tax calculations when processing orders.'), "</p>\n                          </div> \n                        </div>\n                      </div>\n          \n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Geolocation'), "</label>\n                          <div class=\"col-sm-9\">\n                            <div class=\"form-check\">\n                              <input id=\"tax_percent_auto\" class=\"form-check-input inp\" name=\"tax_percent_auto\" type=\"checkbox\" value=\"1\" data-type=\"checkbox\">\n                              <label class=\"form-check-label\" for=\"tax_percent_auto\">\n                                ").concat(__html('Auto tax rate'), "\n                              </label>\n                            </div>\n                            <p class=\"form-text\">").concat(__html('Automatically detect tax rate whenever applicable.'), "</p>\n                          </div> \n                        </div>\n                      </div>\n                    </div>\n\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Percent'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"tax_percent\" type=\"text\" class=\"form-control inp\" placeholder=\"21\" name=\"tax_percent\" data-type=\"text\">\n                            <p class=\"form-text\">").concat(__html('Default tax rate. Example, 9 or 21. Use numeric value.'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Display'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"tax_display\" type=\"text\" class=\"form-control inp\" placeholder=\"VAT\" name=\"tax_display\" data-type=\"text\">\n                            <p class=\"form-text\">").concat(__html('Tax title. Example, VAT or GST.'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n\n                    <h4 id=\"h-fees\" class=\"card-title mb-4 mt-4\">").concat(__html('Fees'), "</h4>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Service'), "</label>\n                          <div class=\"col-sm-9\">\n                            <div class=\"form-check\">\n                              <input id=\"fee_calc\" class=\"form-check-input inp\" name=\"fee_calc\" type=\"checkbox\" value=\"1\" data-type=\"checkbox\">\n                              <label class=\"form-check-label\" for=\"fee_calc\">\n                                ").concat(__html('Calculate'), "\n                              </label>\n                            </div>\n                            <p class=\"form-text\">").concat(__html('Calculate service fee when processing orders.'), "</p>\n                          </div> \n                        </div>\n                      </div>\n          \n                      <div class=\"col-lg-6 d-none\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Geolocation'), "</label>\n                          <div class=\"col-sm-9\">\n                            <div class=\"form-check\">\n                              <input id=\"tax_auto_rate\" class=\"form-check-input inp\" name=\"tax_auto_rate\" type=\"checkbox\" value=\"1\" data-type=\"checkbox\">\n                              <label class=\"form-check-label\" for=\"tax_auto_rate\">\n                                ").concat(__html('Auto tax rate'), "\n                              </label>\n                            </div>\n                            <p class=\"form-text\">").concat(__html('Automatically detect tax rate whenever applicable.'), "</p>\n                          </div> \n                        </div>\n                      </div>\n                    </div>\n\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Percent'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"fee_percent\" type=\"text\" class=\"form-control inp\" placeholder=\"5\" name=\"fee_percent\" data-type=\"text\">\n                            <p class=\"form-text\">").concat(__html('Default fee rate. Example, 5 or 7. Use numeric value.'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Display'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"fee_display\" type=\"text\" class=\"form-control inp\" placeholder=\"Service fee\" name=\"fee_display\" data-type=\"text\">\n                            <p class=\"form-text\">").concat(__html('Fee title. Example, Service fee.'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n\n                    <h4 id=\"h-payment\" class=\"card-title mb-4 mt-4\">").concat(__html('Payment'), "</h4>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Methods'), "</label>\n                          <div class=\"col-sm-9\">\n                            <div class=\"form-check\">\n                              <input id=\"custom_payment_method\" class=\"form-check-input inp\" name=\"custom_payment_method\" type=\"checkbox\" value=\"1\" data-type=\"checkbox\">\n                              <label class=\"form-check-label\" for=\"custom_payment_method\">\n                                ").concat(__html('Custom methods'), "\n                              </label>\n                            </div>\n                            <p class=\"form-text\">").concat(__html('Allow changing of payment method in the dashboard.'), "</p>\n                          </div> \n                        </div>\n                      </div>\n          \n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('List of Methods'), "</label>\n                          <div class=\"col-sm-9\">\n                            <textarea id=\"payment_methods\" class=\"form-control inp\" name=\"payment_methods\" rows=\"4\" data-type=\"text\" style=\"font-size:13px;font-family: monospace;\"></textarea>\n                            <p class=\"form-text\">").concat(__html('Provide list of available payment methods. Example: PayPal, PayNow.'), "</p>\n                          </div> \n                        </div>\n                      </div>\n                    </div>\n\n                    <h4 id=\"h-discounts\" class=\"card-title mb-4 mt-4\">").concat(__html('Discounts'), "</h4>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Coupons'), "</label>\n                          <div class=\"col-sm-9\">\n                            <div class=\"form-check\">\n                              <input id=\"coupons\" class=\"form-check-input inp\" name=\"coupons\" type=\"checkbox\" value=\"1\" data-type=\"checkbox\">\n                              <label class=\"form-check-label\" for=\"coupons\">\n                                ").concat(__html('Enable coupons'), "\n                              </label>\n                            </div>\n                            <p class=\"form-text\">").concat(__html('Allow use of coupons upon checkout.'), "</p>\n                          </div> \n                        </div>\n                      </div>\n          \n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('List of coupons'), "</label>\n                          <div class=\"col-sm-9\">\n                            <textarea id=\"coupon_list\" class=\"form-control inp\" name=\"coupon_list\" rows=\"2\" data-type=\"text\" style=\"font-size:13px;font-family: monospace;\"></textarea>\n                            <p class=\"form-text\">").concat(__html('Provide one coupon and its discount rate per line. Example: BESTDEALS 15.'), "</p>\n                          </div> \n                        </div>\n                      </div>\n                    </div>\n\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Products'), "</label>\n                          <div class=\"col-sm-9\">\n                            <div class=\"form-check\">\n                              <input id=\"product_discounts\" class=\"form-check-input inp\" name=\"product_discounts\" type=\"checkbox\" value=\"1\" data-type=\"checkbox\">\n                              <label class=\"form-check-label\" for=\"product_discounts\">\n                                ").concat(__html('Product discounts'), "\n                              </label>\n                            </div>\n                            <p class=\"form-text\">").concat(__html('Enable or disable all discounts defined under individual products page.'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6 d-none\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('List of hours'), "</label>\n                          <div class=\"col-sm-9\">\n                            <textarea id=\"happy_hours_list\" class=\"form-control inp\" name=\"happy_hours_list\" rows=\"2\" data-type=\"text\" style=\"font-size:13px;font-family: monospace;\"></textarea>\n                            <p class=\"form-text\">").concat(__html('Provide one happy hour, its discount per line. Example: Monday 15:00-17:30 10.'), "</p>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n\n                    <h4 id=\"h-printing\" class=\"card-title mb-4 mt-4\">").concat(__html('Printing'), "</h4>\n\n                      <div class=\"row\">\n\n                        <div class=\"col-xl-6\">\n                          <div class=\"form-group row mb-3 mt-1\">\n                            <label class=\"col-sm-3 col-form-label d-none\">").concat(__html('Printers'), "</label>\n                            <div class=\"col-sm-12\">\n\n                              <input id=\"printers\" class=\"form-control inp d-none\" name=\"printers\" type=\"text\" value=\"1\" data-type=\"text\">\n                              \n                              <table class=\"printer-table order-form mb-3\">\n                                <theader>\n                                  <tr><th><div class=\"me-1 me-sm-3\">").concat(__html('Device ID'), "</div></th><th class=\"tp\"><div class=\"me-1 me-sm-3\">").concat(__html('Type'), "</div></th><th class=\"tp\"><div class=\"me-1 me-sm-3\">").concat(__html('Paper'), "</div></th><th class=\"printer-ip-th d-none\"><div class=\"me-1 me-sm-3 \">").concat(__html('IP Address'), "</div></th><th></th></tr>\n                                  <tr class=\"new-item-row\">\n                                      <td>\n                                        <div class=\"me-1 me-sm-3 mt-2\">\n                                            <input type=\"text\" value=\"\" autocomplete=\"off\" placeholder=\"").concat(__html('AW4FROYNFRGV'), "\" class=\"form-control form-control-sm printer-idd\" style=\"max-width: 156px;\" data-id=\"\" data-index=\"\" list=\"item-suggestions\">\n                                        </div>\n                                      </td>\n                                      <td class=\"printer-type\">\n                                          <div class=\"me-1 me-sm-3 mt-2\">\n                                            <button class=\"form-control form-control-sm dropdown-toggle\" type=\"button\" id=\"printer_type\"  data-value=\"\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n                                              ").concat(__html('Select'), "\n                                            </button>\n                                            <ul class=\"dropdown-menu\" aria-labelledby=\"printer_type\">\n                                              <li><a class=\"dropdown-item\" data-value=\"bluetooth\" href=\"#\"><img style=\"height:24px\" src=\"/assets/img/bluetooth.webp\" > ").concat(__html('bluetooth'), "</a></li>\n                                              <li><a class=\"dropdown-item\" data-value=\"ethernet\" href=\"#\"><img style=\"height:24px\" src=\"/assets/img/ethernet.png\" > ").concat(__html('ethernet'), "</a></li>\n                                              <li><a class=\"dropdown-item\" data-value=\"usb\" href=\"#\"><img style=\"height:24px\" src=\"/assets/img/usb.png\" > ").concat(__html('usb'), "</a></li>\n                                            </ul>\n                                          </div>\n                                      </td>\n                                      <td class=\"printer-paper-type\">\n                                          <div class=\"me-1 me-sm-3 mt-2\">\n                                            <button class=\"form-control form-control-sm dropdown-toggle\" type=\"button\" id=\"printer_paper_type\"  data-value=\"\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n                                              ").concat(__html('Select'), "\n                                            </button>\n                                            <ul class=\"dropdown-menu\" aria-labelledby=\"printer_paper_type\">\n                                              <li><a class=\"dropdown-item\" data-value=\"58\" href=\"#\">").concat(__html('58mm'), "</a></li>\n                                              <li><a class=\"dropdown-item\" data-value=\"80\" href=\"#\">").concat(__html('80mm'), "</a></li>\n                                            </ul>\n                                          </div>\n                                      </td>\n                                      <td class=\"printer-ip-td d-none\">\n                                        <div class=\"me-1 me-sm-3 mt-2\"> \n                                          <input type=\"text\" value=\"\" autocomplete=\"off\" placeholder=\"").concat(__html('192.168.1.12'), "\" class=\"form-control form-control-sm printer-ip\" style=\"max-width: 156px;\" data-id=\"\" data-index=\"\" >\n                                        </div>\n                                      </td>\n                                      <td class=\"align-middle text-center pt-2\"> \n                                          <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 16 16\" width=\"24\" height=\"24\" class=\"bi bi-plus-circle text-success align-middle add-printer po\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"></path><path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"></path></svg>\n                                      </td>\n                                  </tr>\n                                </theader>\n                                <tbody>\n\n\n                                </tbody>\n                              </table>\n                              <p class=\"form-text\">").concat(__html('List all printers connected to the Cloud.'), "</p>\n                            </div>\n                          </div>\n                        </div>\n                        <div class=\"col-xl-6\">\n                          <div class=\"form-group row mb-3 mt-1\">\n                            <label class=\"col-sm-3 col-form-label\">").concat(__html('Action'), "</label>\n                            <div class=\"col-sm-9\">\n                              <select id=\"print_action\" class=\"form-select inp\" name=\"print_action\" data-type=\"select\">\n                                <option value=\"system\">").concat(__html('Default printing dialogue'), "</option>\n                                <option value=\"app\">").concat(__html('Kenzap print app'), "</option>\n                              </select>\n                              <p class=\"form-text\">").concat(__html('Choose action when printing icon is clicked.'), "</p>\n                            </div> \n                          </div>\n                        </div>\n                      </div>\n\n                      <div class=\"border-top my-3 mb-5 d-none\"></div>\n\n                      <h4 id=\"h-templates\" class=\"card-title mb-4 mt-4\">").concat(__html('Templates'), "</h4>\n\n                      <input id=\"templates\" class=\"form-control inp d-none\" name=\"templates\" type=\"text\" value=\"\" data-type=\"text\">\n\n                      <div id=\"templates-list\" class=\"accordion accordion-flush templates-list\" > </div>\n\n                      <div class=\"row\">\n                        <div class=\"col-lg-12\">\n                          <div class=\"text-end \"> \n                            <button class=\"btn btn-outline-primary btn-template-new mt-5 mb-1 mt-md-4 mb-md-0 d-flex align-items-center\" type=\"button\"><svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" class=\"bi bi-plus-circle align-middle me-2 po\" ><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"></path><path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"></path></svg>").concat(__html('New template'), "</button>\n                          </div>\n                        </div>\n                      </div>\n\n                      <div class=\"row d-none\">\n                        <div class=\"col-lg-6\">\n                          <div class=\"form-group row mb-3 mt-1\">\n                            <label class=\"col-sm-3 col-form-label\">").concat(__html('QR code'), "</label>\n                            <div class=\"col-sm-9\">\n                              <div class=\"form-check\">\n                                <input id=\"qr_print\" class=\"form-check-input inp\" name=\"qr_print\" type=\"checkbox\" value=\"1\" data-type=\"checkbox\">\n                                <label class=\"form-check-label\" for=\"qr_print\">\n                                  ").concat(__html('QR code printing'), "\n                                </label>\n                              </div>\n                              <p class=\"form-text\">").concat(__html('Allow "Scan me to order" QR-code printing from orders dashboard.'), "</p>\n                            </div>\n                          </div>\n                        </div>\n                        <div class=\"col-lg-6\">\n                          <div class=\"form-group row mb-3 mt-1\">\n                            <label class=\"col-sm-3 col-form-label\">").concat(__html('QR printing'), "</label>\n                            <div class=\"col-sm-9\">\n                              <textarea id=\"qr_template\" class=\"form-control inp\" name=\"qr_template\" rows=\"10\" data-type=\"text\" style=\"font-size:13px;font-family: monospace;\"></textarea>\n                              <p class=\"form-text\">").concat(__html('Default "Scan me to order" template for printers.'), "</p>\n                            </div> \n                          </div>\n                        </div>\n                      </div>\n\n\n                    </div>\n\n                    <div class=\"tab-pane fade\" id=\"nav-currency\" role=\"tabpanel\" aria-labelledby=\"nav-currency-link\">\n                      <br>\n                      <hr>\n                      <br>\n                      <br>\n                    </div>\n                    \n                    <div class=\"tab-pane fade\" id=\"nav-tax\" role=\"tabpanel\" aria-labelledby=\"nav-tax-link\">\n                    <h4 id=\"h-tax\" class=\"card-title mb-4\">").concat(__html('Your tax information'), "</h4>\n                    <p class=\"card-description\"> ").concat(__html('Invoice info (this information will be not revealed public)'), " </p>\n\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Tax ID'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"vat\" type=\"text\" class=\"form-control inp\" name=\"vat\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Email'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"email\" type=\"email\" class=\"form-control inp\" name=\"email\" data-type=\"email\">\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Company'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"company\" type=\"text\" class=\"form-control inp inp\" name=\"company\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Type'), "</label>\n                          <div class=\"col-sm-4\">\n                            <div class=\"form-check\">\n                              <label class=\"form-check-label\">\n                                <input type=\"radio\" class=\"form-check-input inp\" name=\"entity_type\" value=\"individual\" data-type=\"radio\" checked=\"true\">\n                                ").concat(__html('Individual'), "\n                                <i class=\"input-helper\"></i></label>\n                            </div>\n                          </div>\n                          <div class=\"col-sm-5\">\n                            <div class=\"form-check\">\n                              <label class=\"form-check-label\">\n                                <input type=\"radio\" class=\"form-check-input inp\" name=\"entity_type\" value=\"business\" data-type=\"radio\">\n                                ").concat(__html('Business'), "\n                                <i class=\"input-helper\"></i></label>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <p class=\"card-description\">\n                        ").concat(__html('Address'), "\n                    </p>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\"> ").concat(__html('Address 1'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"addr1\" type=\"text\" class=\"form-control inp\" name=\"addr1\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('State'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"state\" type=\"text\" class=\"form-control inp\" name=\"state\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Address 2'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"addr2\" type=\"text\" class=\"form-control inp\" name=\"addr2\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Postcode'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"post\" type=\"text\" class=\"form-control inp\" name=\"post\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('City'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"city\" type=\"text\" class=\"form-control inp\" name=\"city\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Country'), "</label>\n                          <div class=\"col-sm-9\">\n                            <select id=\"country\" class=\"form-select inp\" name=\"country\" data-type=\"select\">\n                              \n                            </select>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n\n                    <br>\n                    <hr>\n                    <br>\n                    <br>\n                    </div>\n                    <div class=\"tab-pane fade\" id=\"nav-payout\" role=\"tabpanel\" aria-labelledby=\"nav-payout-link\">\n                    <h4 id=\"h-payout\" class=\"card-title mb-4\" title=\"payouts\">").concat(__html('Payout data'), "</h4>\n                    <p class=\"card-description\">").concat(__html('This information is used to process your earnings as part of Kenzap Affiliate or Kenzap Designing programs.'), "</p>\n\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html("Bank account holder's name"), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"y1\" type=\"text\" class=\"form-control inp\" name=\"y1\" minlength=\"2\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('IBAN/Account Nr.'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"y2\" type=\"text\" class=\"form-control inp\" name=\"y2\" minlength=\"2\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('SWIFT Code'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"y3\" type=\"text\" class=\"form-control inp\" name=\"y3\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Bank name'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"y4\" type=\"text\" class=\"form-control inp\" name=\"y4\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Bank branch city'), "</label>\n                          <div class=\"col-sm-9\">\n                            <input id=\"y5\" type=\"text\" class=\"form-control inp\" name=\"y5\" data-type=\"text\">\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-lg-6\">\n                        <div class=\"form-group row mb-3 mt-1\">\n                          <label class=\"col-sm-3 col-form-label\">").concat(__html('Bank branch country'), "</label>\n                          <div class=\"col-sm-9\">\n                            <select id=\"y6\" class=\"form-select inp\" name=\"y6\" data-type=\"select\">\n                              \n                            </select>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    </div>\n\n                </div>\n              </div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"position-fixed bottom-0 p-2 m-4 end-0 align-items-center\" >   \n      <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\" data-bs-delay=\"3000\">\n        <div class=\"d-flex\">  \n          <div class=\"toast-body\"></div>\n          <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n        </div>\n      </div>\n    </div>\n    ");
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

  var printerSettings = {
    _this: null,
    templateDefault: {
      'auto_print': [],
      'user_print': [],
      'template': '',
      'type': 'receipt',
      'user': ''
    },
    init: function init(_this) {
      printerSettings._this = _this;
      printerSettings.renderSettings(_this);
    },
    renderSettings: function renderSettings(_this) {
      var printers = [];
      if (_this.state.response.settings.printers) printers = _this.state.response.settings.printers;

      if (Array.isArray(printers)) {
        printers.forEach(function (printer, i) {
          document.querySelector('.printer-table tbody').insertAdjacentHTML("beforeend", printerSettings.structPrinterRow(printer, i));
        });
      } else {
        printers = [];
        document.querySelector('#printers').value = '[]';
      }

      document.querySelector('#printers').value = JSON.stringify(printers);
      printerSettings.renderTemplatesSettings(_this);
      printerSettings.initListeners(_this);
    },
    renderTemplatesSettings: function renderTemplatesSettings(_this) {
      if (!_this.state.response.settings['templates']) _this.state.response.settings['templates'] = [];
      if (_this.state.response.settings['templates'].length == 0) _this.state.response.settings['templates'].push(printerSettings.templateDefault);
      var html = '';

      _this.state.response.settings['templates'].forEach(function (template, i) {
        html += printerSettings.structPrintTemplateItem(_this, i + 1, true);
      });

      document.querySelector('#templates-list').innerHTML = html;
      printerSettings.templateListeners(_this);
    },
    initListeners: function initListeners(_this) {
      var printers = document.querySelector('#printers').value;

      if (printers) {
        printers = JSON.parse(printers);
      } else {
        printers = [];
      }

      onClick(".btn-template-new", function (e) {
        _this.state.response.settings["templates"].push(printerSettings.templateDefault);

        document.querySelector('#templates-list').insertAdjacentHTML("beforeend", printerSettings.structPrintTemplateItem(_this, _this.state.response.settings["templates"].length, true));
        printerSettings.templateListeners(_this);
      });
      onClick(".printer-type .dropdown-item", function (e) {
        printerSettings.modelSelect(e);
      });
      onClick(".printer-paper-type .dropdown-item", function (e) {
        printerSettings.paperSelect(e);
      });
      onClick('.remove-printer', printerSettings.removePrinter);
      onClick(".add-printer", function (e) {
        e.preventDefault();
        var obj = {};
        obj.idd = document.querySelector('.printer-idd').value;
        obj.type = document.querySelector('.printer-type button').dataset.value;
        obj.paper = document.querySelector('.printer-paper-type button').dataset.value;
        obj.ip = document.querySelector('.printer-ip').value;

        if (obj.idd.length < 1 || obj.type.length < 1) {
          alert(__("Fill in all fields first!"));
          return false;
        }

        document.querySelector('.printer-idd').value = '';
        document.querySelector('.printer-type button').dataset.value = '';
        document.querySelector('.printer-ip').value = '';
        var printers = document.querySelector('#printers').value;
        console.log(printers);

        if (printers) {
          printers = JSON.parse(printers);
        } else {
          printers = [];
        }

        if (Array.isArray(printers)) {
          printers.push(obj);
        } else {
          printers = [];
        }

        document.querySelector('#printers').value = JSON.stringify(printers);
        document.querySelector('.printer-table tbody').insertAdjacentHTML("beforeend", printerSettings.structPrinterRow(obj, printers.length - 1));
        onClick('.remove-printer', printerSettings.removePrinter);
        printerSettings.renderTemplatesSettings(_this);
      });
    },
    templateListeners: function templateListeners(_this) {
      onClick('.remove-template', printerSettings.removeTemplateRow);
      onChange('.template_auto_print_action', function (e) {
        if (e.currentTarget.value == '') e.currentTarget.parentElement.querySelector('.template_auto_print').classList.add('d-none');
        if (e.currentTarget.value != '') e.currentTarget.parentElement.querySelector('.template_auto_print').classList.remove('d-none');
      });
      onClick('.test-template', function (e) {
        var printers = document.querySelector('#printers').value;

        if (printers) {
          printers = JSON.parse(printers);
        } else {
          printers = [];
        }

        var pi = parseInt(e.currentTarget.dataset.index);
        if (!confirm(__("Send this template to %1$ printer %2$?", printers[pi].type, pi + 1 + "-" + printers[pi].idd))) return;
        var template = {};
        template['template'] = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.template').value;
        template['type'] = "receipt";
        template['user'] = "";
        template['user_print'] = [];
        printers[pi].index = pi + 1;
        template['user_print'].push(printers[pi]);
        console.log(template);
        printReceipt(_this, "test", "user", template);
      });
    },
    saveFile: function saveFile(blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        var a = document.createElement('a');
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        setTimeout(function () {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 0);
      }
    },
    removeTemplateRow: function removeTemplateRow(e) {
      console.log(e.currentTarget.dataset.index);
      if (confirm(__('Remove this template?'))) document.querySelector('.templates-list .accordion-item[data-index="' + e.currentTarget.dataset.index + '"]').remove();
    },
    modelSelect: function modelSelect(e) {
      e.preventDefault();
      document.querySelector(".printer-type button").innerHTML = e.currentTarget.innerHTML;
      document.querySelector(".printer-type button").dataset.value = e.currentTarget.dataset.value;

      if (e.currentTarget.dataset.value == "ethernet") {
        document.querySelector('.printer-ip-th').classList.remove("d-none");
        document.querySelector('.printer-ip-td').classList.remove("d-none");
      }

      if (e.currentTarget.dataset.value == "bluetooth" || e.currentTarget.dataset.value == "usb") {
        document.querySelector('.printer-ip-th').classList.add("d-none");
        document.querySelector('.printer-ip-td').classList.add("d-none");
      }
    },
    paperSelect: function paperSelect(e) {
      e.preventDefault();
      document.querySelector(".printer-paper-type button").innerHTML = e.currentTarget.innerHTML;
      document.querySelector(".printer-paper-type button").dataset.value = e.currentTarget.dataset.value;
    },
    removePrinter: function removePrinter(e) {
      e.preventDefault();
      var c = confirm(__('Remove this record?'));
      if (!c) return;
      var i = e.currentTarget.dataset.i;
      var printers = JSON.parse(document.querySelector('#printers').value);
      printers.splice(i, 1);
      document.querySelector('#printers').value = JSON.stringify(printers);
      e.currentTarget.parentElement.parentElement.remove();
      printerSettings.renderTemplatesSettings(printerSettings._this);
    },
    save: function save(_this, data) {
      data['templates'] = [];

      if (document.querySelector(".templates-list .accordion-item")) {
        var _iterator = _createForOfIteratorHelper(document.querySelectorAll(".templates-list .accordion-item")),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var tl = _step.value;
            var obj = {};
            obj['template'] = tl.querySelector('.template').value;
            obj['type'] = tl.querySelector('.template_type').value;
            obj['user'] = tl.querySelector('.template_user').value;
            obj['user_print'] = [];
            obj['auto_print_action'] = tl.querySelector('.template_auto_print_action').value;
            obj['auto_print'] = [];

            if (tl.querySelector('input.template_auto_print:checked')) {
              var _iterator2 = _createForOfIteratorHelper(tl.querySelectorAll("input.template_auto_print:checked")),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var tap = _step2.value;
                  obj['auto_print'].push({
                    index: tap.dataset.index,
                    idd: tap.dataset.idd,
                    type: tap.dataset.type,
                    ip: tap.dataset.ip,
                    paper: tap.dataset.paper
                  });
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }

            if (tl.querySelector('input.template_user_print:checked')) {
              var _iterator3 = _createForOfIteratorHelper(tl.querySelectorAll("input.template_user_print:checked")),
                  _step3;

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var uap = _step3.value;
                  obj['user_print'].push({
                    index: uap.dataset.index,
                    idd: uap.dataset.idd,
                    type: uap.dataset.type,
                    ip: uap.dataset.ip,
                    paper: uap.dataset.paper
                  });
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }

            data['templates'].push(obj);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return data;
    },
    structPrinterRow: function structPrinterRow(obj, i) {
      return "\n      <tr class=\"printer-row form-text\" >\n          <td class=\"tp\">\n              <div class=\"me-1 me-sm-3 my-1 \">\n              ".concat(i + 1, "-").concat(obj.idd, "\n              </div>\n          </td>\n          <td>\n              <div class=\"me-1 me-sm-3 my-1\">\n                ").concat(obj.type == "bluetooth" ? '<img style="height:20px" src="/assets/img/bluetooth.webp" >' : '', " \n                ").concat(obj.type == "ethernet" ? '<img style="height:20px" src="/assets/img/ethernet.png" >' : '', " \n                ").concat(obj.type == "usb" ? '<img style="height:20px" src="/assets/img/usb.png" >' : '', " \n                ").concat(obj.type, "\n              </div>\n          </td>\n          <td>\n              <div class=\"me-1 me-sm-3 my-1\">\n                ").concat(obj.paper == "58" || !obj.paper ? __html('58mm') : '', " \n                ").concat(obj.paper == "80" ? __html('80mm') : '', "\n              </div>\n          </td>\n          <td class=\"\">\n              <div class=\"me-1 me-sm-3 my-1\">\n                  ").concat(obj.ip, "\n              </div>\n          </td>\n          <td class=\"align-middle text-center pt-2\"> \n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"#ff0079\" class=\"remove-printer bi bi-x-circle po\" data-i=\"").concat(i, "\" viewBox=\"0 0 16 16\">\n                  <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"></path>\n                  <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\"></path>\n              </svg>\n          </td>\n      </tr>");
    },
    structPrintTemplateItem: function structPrintTemplateItem(_this, i) {
      var show = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var template = _this.state.response.settings["templates"][i - 1];
      var printers = document.querySelector('#printers').value;

      if (printers) {
        printers = JSON.parse(printers);
      } else {
        printers = [];
      }

      var auto_printers = '';
      printers.forEach(function (printer, ip) {
        var checked = "";
        if (!template['auto_print']) template['auto_print'] = [];
        template['auto_print'].filter(function (ap) {
          if (ap.idd == printer.idd && ap.index == ip + 1) {
            checked = "checked";
          }
        });
        auto_printers += "\n        <div class=\"form-check\">\n          <input id=\"auto_print".concat(ip + 1, "\" class=\"form-check-input template_auto_print\" name=\"auto_print\" type=\"checkbox\" value=\"1\" data-index=\"").concat(ip + 1, "\" data-idd=\"").concat(printer.idd, "\" data-type=\"").concat(printer.type, "\" data-ip=\"").concat(printer.ip, "\" data-paper=\"").concat(printer.paper, "\" data-value=\"\" data-type=\"checkbox\" ").concat(checked, ">\n          <label class=\"form-check-label\" for=\"auto_print").concat(ip + 1, "\">\n            ").concat(ip + 1, "-").concat(printer.idd, " \n\n            ").concat(printer.type == "bluetooth" ? '<img style="height:20px" src="/assets/img/bluetooth.webp" >' : '', " \n            ").concat(printer.type == "ethernet" ? '<img style="height:20px" src="/assets/img/ethernet.png" >' : '', " \n            ").concat(printer.type == "usb" ? '<img style="height:20px" src="/assets/img/usb.png" >' : '', " \n\n          </label>\n        </div>\n      ");
      });
      var users = '';

      _this.state.response.users.forEach(function (user, iu) {
        users += "<option value=\"".concat(user.id, "\" ").concat(template.user == user.id ? "selected" : "", ">").concat(user.name, "</option>");
      });

      var user_printers = '';
      printers.forEach(function (printer, ip) {
        var checked = "";
        if (!template['user_print']) template['user_print'] = [];
        template['user_print'].filter(function (ap) {
          if (ap.idd == printer.idd && ap.index == ip + 1) {
            checked = "checked";
          }
        });
        user_printers += "\n        <div class=\"form-check clearfix\">\n          <input id=\"user_print".concat(ip + 1, "\" class=\"form-check-input template_user_print\" name=\"user_print\" type=\"checkbox\" value=\"1\" data-index=\"").concat(ip + 1, "\" data-idd=\"").concat(printer.idd, "\" data-type=\"").concat(printer.type, "\" data-ip=\"").concat(printer.ip, "\" data-paper=\"").concat(printer.paper, "\" data-value=\"\" data-type=\"checkbox\" ").concat(checked, ">\n          <label class=\"form-check-label\" for=\"user_print").concat(ip + 1, "\">\n            ").concat(ip + 1, "-").concat(printer.idd, "\n\n            ").concat(printer.type == "bluetooth" ? '<img style="height:20px" src="/assets/img/bluetooth.webp" >' : '', " \n            ").concat(printer.type == "ethernet" ? '<img style="height:20px" src="/assets/img/ethernet.png" >' : '', " \n            ").concat(printer.type == "usb" ? '<img style="height:20px" src="/assets/img/usb.png" >' : '', " \n\n          </label>\n          <div class=\"d-inline   me-1\" style=\"float:right;\" title=\"").concat(__attr("click for test print"), "\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\" fill=\"currentColor\" class=\"bi bi-printer test-template ms-2 po text-primary\" viewBox=\"0 0 16 16\" data-index=\"").concat(ip, "\">\n                    <path d=\"M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z\"></path>\n                    <path d=\"M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z\"></path>\n            </svg>\n          </div>\n        </div>\n      ");
      });
      return "\n    <div class=\"accordion-item border-0 mb-3\" data-index=\"".concat(i - 1, "\" >\n      <h2 class=\"accordion-header\" id=\"flush-heading-").concat(i, "\">\n        <button class=\"accordion-button ").concat(i == 1 || show ? "" : "collapsed", "\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse-").concat(i, "\" aria-expanded=\"").concat((i || show) == 1 ? "true" : "false", "\" aria-controls=\"flush-collapse-").concat(i, "\">\n          ").concat(__html("Template #%1$", i), "\n        </button>\n      </h2>\n      <div id=\"flush-collapse-").concat(i, "\" class=\"accordion-collapse collapse ").concat(i == 1 || show ? "show" : "", " mt-3\" aria-labelledby=\"flush-heading-").concat(i, "\" data-bs-parent=\"#templates-list\">\n        <div class=\"accordion-body\">\n        \n          <div class=\"row inp-list\">\n\n            <div class=\"col-lg-6 \">\n              <div class=\"form-group row mb-3 mt-1\">\n                <div class=\"col-sm-12\" >\n                  <textarea class=\"form-control template inp\" name=\"template\" rows=\"20\" data-type=\"text\" style=\"font-size:13px;font-family: monospace;\">").concat(template.template, "</textarea>\n                  <p class=\"form-text\">").concat(__html('Template code.'), "</p>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"col-lg-6\">\n              <div class=\"form-group row mb-3 mt-1 \">\n                <label class=\"col-sm-3 col-form-label\">").concat(__html('Template type'), "</label>\n                <div class=\"col-sm-9\">\n                  <select class=\"form-select template_type\" name=\"template_type\" data-type=\"select\">\n                    <option value=\"receipt\" ").concat(template.type == "receipt" ? "selected" : "", ">").concat(__html('Receipt'), "</option>\n                    <option value=\"invoice\" ").concat(template.type == "invoice" ? "selected" : "", ">").concat(__html('Invoice'), "</option>\n                    <option value=\"qr\" ").concat(template.type == "qr" ? "selected" : "", ">").concat(__html('QR-code'), "</option>\n                  </select>\n                  <p class=\"form-text\">").concat(__html('QR-code receipt type adds extra button to the orders page.'), "</p>\n                </div> \n              </div>\n              <div class=\"form-group row mb-3 mt-1 \">\n                <label class=\"col-sm-3 col-form-label\">").concat(__html('Default for'), "</label>\n                <div class=\"col-sm-9\">\n                  <select class=\"form-select template_user mb-2 mt-1\" name=\"template_user\" data-type=\"select\">\n                    <option value=\"\">").concat(__html('All users'), "</option>\n                    ").concat(users, "\n                  </select>\n                  <div class=\"template_user_print\">\n                    ").concat(user_printers, "\n                  </div>\n                  <p class=\"form-text\">").concat(__html('Assign this receipt to one of the selected users and printers.'), "</p>\n                </div> \n              </div>\n              <div class=\"form-group row mb-3 mt-1 \">\n                <label class=\"col-sm-3 col-form-label\">").concat(__html('Auto print'), "</label>\n                <div class=\"col-sm-9\" >\n                  <select class=\"form-select template_auto_print_action mb-2 mt-1\" name=\"template_auto_print_action\" data-type=\"select\">\n                    <option value=\"\">").concat(__html('Never'), "</option>\n                    <option value=\"new\" ").concat(template.auto_print_action == "new" ? "selected" : "", ">").concat(__html('New order'), "</option>\n                    <option value=\"completed\" ").concat(template.auto_print_action == "completed" ? "selected" : "", ">").concat(__html('Completed order'), "</option>\n                    <option value=\"canceled\" ").concat(template.auto_print_action == "canceled" ? "selected" : "", ">").concat(__html('Canceled order'), "</option>\n                    <option value=\"failed\" ").concat(template.auto_print_action == "failed" ? "selected" : "", ">").concat(__html('Failed order'), "</option>\n                  </select>\n                  <div class=\"template_auto_print ").concat(template.auto_print_action == "" ? "d-none" : "", "\" >\n                    ").concat(auto_printers, "\n                  </div>\n                  <p class=\"form-text\">").concat(__html('Auto print this template when selected action is triggered.'), "</p>\n                </div> \n              </div>\n              <div class=\"form-group mb-3 mt-1 \">\n                <button class=\"d-none btn btn-sm btn-outline-success test-template mt-5 mb-1 mt-md-4 mb-md-0 d-flex align-items-center ms-auto bd-highlight\" type=\"button\" data-index=\"").concat(i - 1, "\">").concat(__html('Test print'), "</button>\n                <button class=\"btn btn-sm btn-outline-danger remove-template mt-5 mb-1 mt-md-4 mb-md-0 d-flex align-items-center ms-auto bd-highlight\" type=\"button\" data-index=\"").concat(i - 1, "\">").concat(__html('Remove template'), "</button>\n              </div>\n            </div>\n\n            <div class=\"col-lg-6 d-none\">\n\n            </div>\n\n            <div class=\"col-lg-6 d-none\">\n              <div class=\"form-group row mb-3 mt-1\">\n                <div class=\"col-sm-12\" >\n                  <iframe class=\"template-preview\" style=\"width:600px;min-height:400px\" srcdoc=\"").concat(html(template.template), "\"></iframe>\n                  <p class=\"form-text\">").concat(__html('Template preview.'), "</p>\n                </div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n      </div>\n    </div>");
    }
  };

  var _this = {
    state: {
      firstLoad: true,
      response: null,
      limit: 10
    },
    init: function init() {
      _this.getData();
    },
    getData: function getData() {
      if (_this.state.firstLoad) showLoader();
      document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          query: {
            user: {
              type: 'authenticate',
              fields: ['avatar'],
              token: getCookie('kenzap_token')
            },
            users: {
              type: 'users',
              fields: ['id', 'name']
            },
            locale: {
              type: 'locale',
              source: ['extension'],
              key: 'ecommerce'
            },
            settings: {
              type: 'get',
              key: 'ecommerce-settings',
              fields: '*'
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        _this.state.settings = response.settings;
        _this.state.user = response.user;
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
      _this.state.response = response;

      if (_this.state.firstLoad) {
        initBreadcrumbs([{
          link: link('https://dashboard.kenzap.cloud'),
          text: __('Dashboard')
        }, {
          link: link('/'),
          text: __('E-commerce')
        }, {
          text: __('Settings')
        }]);
      }

      var coptions = '<option value="">' + __('Choose currency') + '</option>';

      var _iterator = _createForOfIteratorHelper(getCurrencies()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var c = _step.value;
          coptions += "<option value=\"".concat(c.code, "\">").concat(__(c.name), " (").concat(__(c.code), ")</option>");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      document.querySelector("#currency").innerHTML = coptions;

      for (var field in response.settings) {
        if (typeof response.settings[field] === "undefined") continue;
        if (response.settings[field] == "") continue;
        if (document.querySelector("[name='" + field + "']")) switch (document.querySelector("[name='" + field + "']").dataset.type) {
          case 'text':
          case 'email':
          case 'emails':
          case 'select':
          case 'textarea':
            document.querySelector("#" + field).value = response.settings[field];
            break;

          case 'checkbox':
            document.querySelector("#" + field).checked = response.settings[field] == "1" ? true : false;
            break;

          case 'radio':
            document.querySelector("[name='" + field + "'][value='" + response.settings[field] + "']").checked = true;
            break;
        }
      }

      var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll('.inp-local')),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _field = _step2.value;

          switch (document.querySelector("[name='" + _field.name + "']").dataset.type) {
            case 'text':
            case 'email':
            case 'emails':
            case 'select':
            case 'textarea':
              _field.value = localStorage.hasOwnProperty(_field.name) ? localStorage.getItem(_field.name) : "";
              break;

            case 'checkbox':
              console.log(localStorage.hasOwnProperty(_field.name) ? localStorage.getItem(_field.name) : false);
              _field.checked = localStorage.hasOwnProperty(_field.name) ? localStorage.getItem(_field.name) == "true" ? true : false : false;
              break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      printerSettings.init(_this);
    },
    initListeners: function initListeners() {
      if (!_this.state.firstLoad) return;
      onClick('.btn-save', _this.saveSettings);
    },
    listeners: {
      removeProduct: function removeProduct(e) {
        e.preventDefault();
        var c = confirm(__('Completely remove this product?'));
        if (!c) return;
        fetch('https://api-v1.kenzap.cloud/', {
          method: 'post',
          headers: headers,
          body: JSON.stringify({
            query: {
              product: {
                type: 'delete',
                key: 'product',
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
    },
    saveSettings: function saveSettings(e) {
      e.preventDefault();
      var data = {};

      var _iterator3 = _createForOfIteratorHelper(document.querySelectorAll('.inp')),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var s = _step3.value;

          switch (s.dataset.type) {
            case 'text':
            case 'email':
            case 'emails':
            case 'select':
            case 'textarea':
              data[s.id] = s.value;
              break;

            case 'checkbox':
              data[s.id] = s.checked ? s.value : "";
              break;

            case 'radio':
              data[s.name] = s.parentElement.parentElement.parentElement.parentElement.querySelector('input:checked').value;
              break;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var _iterator4 = _createForOfIteratorHelper(document.querySelectorAll('.inp-local')),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var field = _step4.value;

          switch (document.querySelector("[name='" + field.name + "']").dataset.type) {
            case 'text':
            case 'email':
            case 'emails':
            case 'select':
            case 'textarea':
              localStorage.setItem(field.name, field.value);
              break;

            case 'checkbox':
              localStorage.setItem(field.name, field.checked);
              break;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      if (_this.state.response.settings.last_order_id == data.last_order_id) {
        delete data.last_order_id;
      }

      if (data['printers']) data['printers'] = JSON.parse(data['printers']);
      data = printerSettings.save(_this, data);
      console.log(data);
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          query: {
            settings: {
              type: 'set',
              key: 'ecommerce-settings',
              data: data
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          toast('Changes applied');
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    },
    initFooter: function initFooter$1() {
      initFooter(__('Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>'), '');
    }
  };

  _this.init();

})();
//# sourceMappingURL=index.js.map
