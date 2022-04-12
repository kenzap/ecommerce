
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35732/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

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
   * @name parseApiError
   * @description Set default logics for different API Error responses.
   * @param {object} object - API response.
   */
  const parseApiError = (data) => {

      console.log(data);

      // unstructured failure
      if(isNaN(data.code)){
      
          alert('Can not connect to Kenzap Cloud');  
          return;
      }
      
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
   * @name headers
   * @description Default headers object for all Kenzap Cloud fetch queries. 
   * @param {object} headers
   */
   const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
      'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
      'Kenzap-Header': (localStorage.hasOwnProperty('header') && localStorage.hasOwnProperty('header-version')) ? localStorage.getItem('header-version') : 0,
      'Kenzap-Token': getCookie('kenzap_token'),
      'Kenzap-Sid': getSiteId(),
  };

  var getPageNumber = function getPageNumber() {
    var urlParams = new URLSearchParams(window.location.search);
    var page = urlParams.get('page') ? urlParams.get('page') : 1;
    return parseInt(page);
  };
  var formatPrice = function formatPrice(price) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: "USD"
    });
    if (typeof price === 'undefined' || price == '') price = 0;
    price = parseFloat(price);
    price = formatter.format(price);
    return price;
  };
  var timeConverterAgo = function timeConverterAgo(now, time) {
    now = parseInt(now);
    time = parseInt(time);
    var past = now - time;
    if (past < 60) return 'moments ago';
    if (past < 3600) return parseInt(past / 60) + ' minutes ago';
    if (past < 86400) return parseInt(past / 60 / 24) + ' hours ago';
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

  var preview = {
    viewOrder: function viewOrder(_this) {
      onClick('.view-order', function (e) {
        var _fields;

        var modal = document.querySelector(".order-modal");
        var modalCont = new bootstrap.Modal(modal);
        var i = e.currentTarget.dataset.index;
        var items = '';
        Object.keys(_this.state.statuses).forEach(function (key, index) {
          items += "<li><a class=\"dppi dropdown-item\" data-key=\"".concat(key, "\" href=\"#\">").concat(_this.state.statuses[key].text, "</a></li>");
        });
        var statusSelect = "\n      <div class=\"st-modal st-opts mb-3 me-1 me-sm-3 dropdown\">\n          <a class=\"btn btn-sm ".concat(_this.state.statuses[_this.state.orders[i]['status']]["class"], " dropdown-toggle order-form\" data-id=\"status\" data-type=\"key\" data-value=\"").concat(_this.state.orders[i]['status'], "\" href=\"#\" role=\"button\" id=\"order-status-modal\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\" >\n              ").concat(_this.state.statuses[_this.state.orders[i]['status']].text, "\n          </a>\n          <ul class=\"dropdown-menu\" aria-labelledby=\"order-status-modal\">\n              ").concat(items, "\n          </ul>\n      </div>");
        modal.querySelector(".modal-dialog").classList.add('modal-dialog-wide');
        modal.querySelector(".modal-header .modal-title").innerHTML = _this.state.orders[i]['from'];
        modal.querySelector(".modal-footer .btn-primary").innerHTML = __('Update');
        modal.querySelector(".modal-footer .btn-secondary").innerHTML = __('Close');
        var html = statusSelect;
        var fields = (_fields = {
          _id: {
            l: __("ID")
          },
          from: {
            l: __("From"),
            e: "text",
            editable: true
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
        }), _defineProperty(_fields, "total", {
          l: __("Total"),
          e: "text"
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
          if (_this.state.orders[i][x] === undefined) continue;
          var val = _this.state.orders[i][x];
          var field = fields[x].l;

          if (x == 'total') {
            val = formatPrice(val);
          }

          html += "\n          <div class=\"mb-3 mt-3 order-row ".concat(x == '_id' || x == 'from' ? "elipsized" : "", "\" >\n              <b>").concat(field, "</b>&nbsp; ").concat(preview.renderField(fields[x], val, x), "\n          </div>");
        }

        html += '';
        modal.querySelector(".modal-body").innerHTML = html;
        modalCont.show();
        preview.tableOrderItemListeners();
        preview.suggestOrderItem(_this);
        modal.querySelector(".edit-item").addEventListener('blur', function (e) {
          setTimeout(function () {
            document.querySelector('.s-list').dataset.toggle = false;
          }, 500);
        });
        preview.addOrderItem(_this);

        _this.listeners.modalSuccessBtnFunc = function (e) {
          e.preventDefault();

          _this.updateOrder(_this.state.orders[i]._id);

          modalCont.hide();
        };

        onClick('.st-modal li a', function (e) {
          e.preventDefault();
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
      });
    },
    renderField: function renderField(a, item, x) {
      switch (a.e) {
        case 'text':
          return item;

        case 'textarea':
          return '<textarea type="text" rows="4" class="form-control order-form pv " data-type="textarea" id="' + x + '" value="' + item + '">' + item + '</textarea>';

        case 'items':
          var html = "<table class=\"items order-form\" data-type=\"items\"><tr><th><div class=\"me-1 me-sm-3\">".concat(__('Product'), "</div></th><th class=\"qty\"><div class=\"me-1 me-sm-3\">").concat(__('Qty'), "</div></th><th class=\"tp\"><div class=\"me-1 me-sm-3\">").concat(__('Total'), "</div></th><th></th></tr>");

          for (var _x in item) {
            html += preview.structOrderItemTable(_x, item);
          }

          html += "<tr class=\"new-item-row\">\n                        <td>\n                            <div class=\"me-1 me-sm-3\">\n                                <input type=\"text\" value=\"\" autocomplete=\"off\" placeholder=\"".concat(__('Search..'), "\" class=\"form-control edit-item\" data-id=\"\" data-index=\"\" list=\"item-suggestions\">\n                                <span class=\"select-list-group__toggle\"> </span>\n                                <ul class=\"s-list my-1 shadow-sm\" data-toggle=\"false\"></ul>\n                                <datalist id=\"item-suggestions\" class=\"fs-12 d-none\"></datalist>\n                            </div>\n                        </td>\n                        <td class=\"qty\">\n                            <div class=\"me-1 me-sm-3\">\n                                <input type=\"text\" value=\"\" autocomplete=\"off\" class=\"form-control text-right edit-qty\">\n                            </div>\n                        </td>\n                        <td class=\"tp\">\n                            <div class=\"me-1 me-sm-3\">\n                                <input type=\"text\" value=\"\" autocomplete=\"off\" class=\"form-control edit-tp\">\n                            </div>\n                        </td>\n                        <td class=\"align-middle text-center\"> \n                            <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 16 16\" width=\"24\" height=\"24\" class=\"bi bi-plus-circle text-success align-middle add-item\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"></path><path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"></path></svg>\n                        </td>\n                    </tr>");
          html += "</table>";
          return html;

        default:
          return item;
      }
    },
    itemOptions: function itemOptions(item) {
      var options = "\n\n        <div class=\"dropdown text-center\">\n            <a  href=\"#\" role=\"button\" id=\"order-item-options\" data-id=\"status\" data-value=\"\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-three-dots-vertical order-item-options\" viewBox=\"0 0 16 16\"><path d=\"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\"/></svg>\n            </a>\n            <ul class=\"dropdown-menu\" aria-labelledby=\"order-item-options\" >\n                <li><a class=\"oio dropdown-item edit-item-note\" data-key=\"edit-item-note\" href=\"#\">".concat(__('Add note'), "</a></li>\n                <li><a class=\"oio dropdown-item\" data-key=\"edit-item-variation\" href=\"#\">").concat(__('Add variation'), "</a></li>\n                <li><a class=\"oio dropdown-ite d-none\" data-key=\"edit-item-price\" href=\"#\">").concat(__('Adjust price'), "</a></li>\n                <li><a class=\"oio dropdown-item text-danger remove-item\" data-key=\"remove-item\" href=\"#\">").concat(__('Remove'), "</a></li>\n            </ul>\n        </div>\n    ");
      return options;
    },
    structOrderItemTable: function structOrderItemTable(x, item) {
      var vars = '',
          output = '';

      for (var v in item[x].variations) {
        var list = '';

        for (var l in item[x].variations[v].list) {
          list += item[x].variations[v].list[l].title + " ";
        }

        vars += '<div><b>' + item[x].variations[v].title + "</b> <span>" + list + "</span></div> ";
        if (item[x].variations[v].note !== undefined && item[x].variations[v].note.length > 0) vars += "<div><b>" + __('Note') + "</b> " + item[x].variations[v].note + "</div> ";
      }

      output += '<tr class="order-item-row-active" data-id="' + item[x].id + '">';
      output += '<td><div class="item-title" contenteditable="false" data-value="' + item[x].title + '" data-sdesc="' + item[x].sdesc + '">' + item[x].title + '</div><div class="item-note text-muted mb-1 ' + (item[x].note.length == 0 || item[x].note == '<br>' ? "d-none" : "") + '" contenteditable="true" data-value="' + item[x].note + '">' + item[x].note + '</div><div class="vars border-primary item-variations">' + vars + '</div></td><td class="qty"><div class="me-1 me-sm-3 item-qty" data-value="' + item[x].qty + '">' + item[x].qty + '</div></td><td class="tp"><div class="me-1 me-sm-3 item-pricef" data-price="' + item[x].price + '" data-value="' + item[x].priceF + '" >' + formatPrice(item[x].priceF) + '</div><td>' + preview.itemOptions(item[x]) + '</td></td>';
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
                fields: ['_id', 'id', 'img', 'status', 'price', 'title'],
                limit: _this.state.slist,
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
          console.log(response);

          if (response.success) {
            _this.state.productsSuggestions = response.products;
            var options = "";
            response.products.forEach(function (product, index) {
              options += "<li class=\"s-list-item py-1\" data-id=\"".concat(product._id, "\" data-title=\"").concat(product.title, "\" data-index=\"").concat(index, "\"  data-display=\"true\" data-highlight=\"false\">").concat(product.title, "</li>");
            });
            document.querySelector('.s-list').innerHTML = options;
            document.querySelector('.s-list').dataset.toggle = true;
            onClick('.s-list-item', function (e) {
              var index = e.currentTarget.dataset.index;
              document.querySelector('.edit-item').dataset.index = index;
              document.querySelector('.edit-item').dataset.id = _this.state.productsSuggestions[index]._id;
              document.querySelector('.edit-item').value = _this.state.productsSuggestions[index].title;
              document.querySelector('.edit-qty').value = 1;
              document.querySelector('.edit-qty').dataset.price = _this.state.productsSuggestions[index].price;
              document.querySelector('.edit-tp').value = _this.state.productsSuggestions[index].price;
              document.querySelector('.s-list').dataset.toggle = false;

              var calcPriceF = function calcPriceF() {
                var priceF = parseFloat(document.querySelector('.edit-qty').value) * parseFloat(document.querySelector('.edit-qty').dataset.price);
                if (isNaN(priceF)) priceF = "";
                document.querySelector('.edit-tp').value = priceF;
              };

              document.querySelector('.edit-qty').addEventListener('keypress', function (e) {
                console.log(e.which);

                if (e.which != 8 && isNaN(String.fromCharCode(e.which))) {
                  e.preventDefault();
                  return false;
                }
              });
              document.querySelector('.edit-qty').addEventListener('keydown', function (e) {
                console.log('keydown');
                setTimeout(function () {
                  calcPriceF();
                }, 300);
              });
              document.querySelector('.edit-tp').addEventListener('keypress', function (e) {
                console.log(e.which);

                if (e.which != 8 && e.which != 46 && isNaN(String.fromCharCode(e.which))) {
                  e.preventDefault();
                  return false;
                }
              });
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
      onClick('.edit-item-note', function (e) {
        var noteEl = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.item-note');
        console.log(noteEl);
        noteEl.classList.remove('d-none');
        noteEl.focus();
      });
      onClick('.remove-item', function (e) {
        e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
      });
    },
    addOrderItem: function addOrderItem(_this) {
      onClick('.add-item', function (e) {
        var x = 0,
            itemArr = [],
            item = {};
        item.id = document.querySelector('.edit-item').dataset.id;
        item.title = document.querySelector('.edit-item').value;
        item.priceF = document.querySelector('.edit-tp').value;
        item.qty = document.querySelector('.edit-qty').value;
        item.note = "";
        item.variations = [];

        if (item.title.length < 2) {
          alert(__('Incorrect product data'));
          return;
        }

        itemArr.push(item);
        var itemRow = preview.structOrderItemTable(x, itemArr);
        document.querySelector('.new-item-row').insertAdjacentHTML("beforebegin", itemRow);
        preview.tableOrderItemListeners();
        item.title = document.querySelector('.edit-item').value = "";
        item.priceF = document.querySelector('.edit-tp').value = "";
        item.qty = document.querySelector('.edit-qty').value = "";
      });
    }
  };

  var HTMLContent = function HTMLContent(__) {
    return "\n      <div class=\"container ec-orders\">\n        <div class=\"d-md-flex justify-content-between bd-highlight mb-3\">\n            <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n            <button class=\"btn btn-primary btn-add mt-3 mb-1 mt-md-0 mb-md-0\" type=\"button\">".concat(__('New order'), "</button>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-12 page-title\">\n            <div class=\"st-opts st-table mb-3 dropdown\">\n                <a class=\"btn btn-outline-secondary dropdown-toggle\" href=\"#\" role=\"button\" id=\"order-status\" data-id=\"status\" data-value=\"\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n                ").concat(__('All'), "\n                </a>\n                <ul class=\"dropdown-menu\" aria-labelledby=\"order-status\">\n                  <li><a class=\"dppi dropdown-item\" data-key=\"\" href=\"#\" >").concat(__('All'), "</a></li>\n                  <li><a class=\"dppi dropdown-item\" data-key=\"new\" href=\"#\" >").concat(__('New'), "</a></li>\n                  <li><a class=\"dppi dropdown-item\" data-key=\"paid\" href=\"#\" >").concat(__('Paid'), "</a></li>\n                  <li><a class=\"dppi dropdown-item\" data-key=\"processing\" href=\"#\" >").concat(__('Processing'), "</a></li>\n                  <li><a class=\"dppi dropdown-item\" data-key=\"completed\" href=\"#\" >").concat(__('Completed'), "</a></li>\n                  <li><a class=\"dppi dropdown-item\" data-key=\"canceled\" href=\"#\" >").concat(__('Canceled'), "</a></li>\n                  <li><a class=\"dppi dropdown-item\" data-key=\"failed\" href=\"#\" >").concat(__('Failed'), "</a></li>\n                  <li><a class=\"dppi dropdown-item\" data-key=\"refunded\" href=\"#\" >").concat(__('Refunded'), "</a></li>\n                </ul>\n            </div>\n            <div class=\"st-opts\" >\n              <div class=\"input-group-sm mb-0 justify-content-start mb-3 mb-sm-0\" >\n                <input id=\"usearch\" type=\"text\" class=\"inp form-control search-input\" autocomplete=\"off\" placeholder=\"").concat(__('Search order'), "\">\n              </div>\n              <!-- <a id=\"viewSum\" href=\"#\" style=\"margin-left:16px;\">view summary</a> -->\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card\">\n            <div class=\"card border-white shadow-sm border-0\">\n              <div class=\"card-body p-0\">\n \n                <div class=\"table-responsive\">\n                  <table class=\"table table-hover table-borderless align-middle table-striped table-p-list mb-0\">\n                    <thead>\n                      <tr>\n                        <th><span class=\"ps-1\">").concat(__('From'), "</span></th>\n                        <th class=\"d-none d-sm-table-cell\">").concat(__('Status'), "</th>\n                        <th>").concat(__('Total'), "</th>\n                        <th class=\"d-none d-sm-table-cell\">").concat(__('Time'), "</th>\n                        <th></th>\n                      </tr>\n                    </thead>\n                    <tbody class=\"list\">\n\n                    </tbody>\n                  </table>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"modal order-modal\" tabindex=\"-1\">\n        <div class=\"modal-dialog \">\n          <div class=\"modal-content\">\n              <div class=\"modal-header\">\n                <h5 class=\"modal-title\"></h5>\n                <button type=\"button\" class=\"btn-close align-self-start-remove\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n              </div>\n              <div class=\"modal-body\">\n              \n              </div>\n              <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-primary\"></button>\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n              </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"position-fixed bottom-0 p-sm-2 m-sm-4 end-0 align-items-center\" >   \n        <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\" data-bs-delay=\"3000\">\n          <div class=\"d-flex\">  \n            <div class=\"toast-body\"></div>\n            <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n          </div>\n        </div>\n      </div>\n    ");
  };

  var _this = {
    state: {
      firstLoad: true,
      firstTouch: true,
      playSoundNow: false,
      newOrderCount: 0,
      orderIDs: [],
      orders: [],
      playTitleTimer: null,
      refreshTimer: null,
      statuses: [],
      audio: new Audio('https://kenzap.com/static/swiftly.mp3'),
      limit: 50,
      slistLimit: 10,
      productsSuggestions: []
    },
    init: function init() {
      _this.getData();
    },
    getData: function getData() {
      if (_this.state.firstLoad) showLoader();
      var s = document.querySelector('.search-input') ? document.querySelector('.search-input').value : '';
      var term = document.querySelector('#order-status') ? document.querySelector('#order-status').dataset.value : '';
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
      document.querySelector('#contents').innerHTML = HTMLContent(__);
    },
    renderPage: function renderPage(response) {
      if (_this.state.firstLoad) {
        initBreadcrumbs([{
          link: link('https://dashboard.kenzap.cloud'),
          text: __('Dashboard')
        }, {
          link: link('/'),
          text: __('E-commerce')
        }, {
          text: __('Orders')
        }]);
        _this.state.statuses = {
          'new': {
            text: __('New'),
            "class": 'btn-warning text-dark fw-light'
          },
          'processing': {
            text: __('Processing'),
            "class": 'btn-primary fw-light'
          },
          'completed': {
            text: __('Completed'),
            "class": 'btn-success fw-light'
          },
          'canceled': {
            text: __('Canceled'),
            "class": 'btn-secondary fw-light'
          },
          'failed': {
            text: __('Failed'),
            "class": 'btn-danger fw-light'
          }
        };
      }

      _this.state.orders = response.orders;

      if (response.orders.length == 0) {
        document.querySelector(".table tbody").innerHTML = "<tr><td colspan=\"5\">".concat(__("No orders to display."), "</td></tr>");
        return;
      }

      var orderIDsTemp = [];
      _this.state.newOrderCount = [];
      var list = '',
          count_new = 0;

      for (var i in response.orders) {
        orderIDsTemp.push(response.orders[i]._id);
        if (typeof response.orders[i].status === 'undefined') response.orders[i].status = 'new';
        if (response.orders[i].status == 'new') count_new++;
        var classN = _this.state.orderIDs.includes(response.orders[i]._id) || _this.state.firstLoad ? '' : 'new';
        list += "\n            <tr class=\"".concat(classN, "\">\n              <td class=\"details\">\n                <div class=\"ps-1 view-order\" data-id=\"").concat(response.orders[i]._id, "\" data-index=\"").concat(i, "\">\n                  <b class=\"\">").concat(response.orders[i].from, "</b>\n                  <div class=\" elipsized fst-italic\">").concat(response.orders[i].note ? response.orders[i].note : "", "</div>\n                  <div class=\" d-sm-none\"> <span class=\"me-2\">").concat(_this.getStatus(response.orders[i].status), "</span> <span class=\"text-muted\">").concat(timeConverterAgo(response.meta.time, response.orders[i].created), "</span> </div>\n                </div>\n              </td>\n              <td class=\"d-none d-sm-table-cell\">\n                <span style=\"font-size:24px;\">").concat(_this.getStatus(response.orders[i].status), "</span>\n              </td>\n              <td>\n                <span style=\"font-size:18px;\">").concat(formatPrice(response.orders[i].total), "</span>\n              </td>\n              <td class=\"d-none d-sm-table-cell\">\n                <span style=\"font-size:18px;\">").concat(timeConverterAgo(response.meta.time, response.orders[i].created), "</span>\n              </td>\n              <td class=\"last\">\n                <a href=\"#\" data-id=\"").concat(response.orders[i]._id, "\" data-index=\"").concat(i, "\" class=\"view-order text-success d-none me-4\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-eye\" viewBox=\"0 0 16 16\">\n                    <path d=\"M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z\"/>\n                    <path d=\"M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z\"/>\n                </svg></a>\n                <a href=\"#\" data-id=\"").concat(response.orders[i]._id, "\" data-index=\"").concat(i, "\" class=\"remove-order text-danger me-2\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"22\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\">\n                    <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/>\n                    <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/>\n                </svg></a>\n              </td>\n            </tr>");
      }

      _this.state.playSoundNow = count_new > 0 ? true : false;
      _this.state.orderIDs = orderIDsTemp;
      document.querySelector(".table tbody").innerHTML = list;
    },
    getStatus: function getStatus(status) {
      return "<div class=\"badge ".concat(_this.state.statuses[status]["class"], "\">").concat(_this.state.statuses[status].text, "</div>");
    },
    playSound: function playSound() {
      console.log('playSound');

      _this.state.audio.play();
    },
    playTitle: function playTitle(msg) {},
    initListeners: function initListeners() {
      preview.viewOrder(_this);
      onClick('.remove-order', _this.listeners.removeOrder);
      onClick('.st-table li a', _this.listeners.changeStatus);
      if (!_this.state.firstLoad) return;
      onClick('.modal .btn-primary', _this.listeners.modalSuccessBtn);
      onKeyUp('.search-input', _this.listeners.searchOrders);
      document.body.addEventListener('touchstart', function () {
        if (_this.state.firstTouch) {
          _this.state.audio.play();

          _this.state.audio.pause();

          _this.state.audio.currentTime = 0;
          _this.state.firstTouch = false;
        } else {
          if (_this.state.playTitleTimer) clearInterval(_this.state.playTitleTimer);
          _this.state.playTitleTimer = setInterval(function () {
            if (_this.state.playSoundNow) _this.playSound();
          }, 6500);
        }
      }, false);
    },
    listeners: {
      changeStatus: function changeStatus(e) {
        e.preventDefault();
        var os = document.querySelector('#order-status');

        if (e.currentTarget.dataset.key == "") {
          os.innerHTML = __('All');
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
        });

        if (e.currentTarget.dataset.key == '') {
          os.classList.add('btn-primary');
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
        fetch('https://api-v1.kenzap.cloud/', {
          method: 'post',
          headers: headers,
          body: JSON.stringify({
            query: {
              product: {
                type: 'delete',
                key: 'ecommerce-order',
                id: e.currentTarget.dataset.id,
                sid: getSiteId()
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
    updateOrder: function updateOrder(id) {
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

            case 'items':
              data['items'] = {};

              var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll('.order-item-row-active')),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var item = _step2.value;
                  data['items'][item.dataset.id] = {
                    "id": item.dataset.id,
                    "qty": parseInt(item.querySelector('.item-qty').dataset.value),
                    "note": item.querySelector('.item-note').innerHTML,
                    "type": "new",
                    "index": "0",
                    "price": parseFloat(item.querySelector('.item-pricef').dataset.price),
                    "sdesc": item.querySelector('.item-title').dataset.sdesc,
                    "title": item.querySelector('.item-title').dataset.value,
                    "priceF": parseFloat(item.querySelector('.item-pricef').dataset.value),
                    "variations": []
                  };
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

              break;

            case 'text':
            case 'email':
            case 'emails':
            case 'select':
            case 'textarea':
              data[s.id] = s.value;
              break;

            case 'radio':
              data[s.id] = s.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('input:checked').value;
              break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          query: {
            settings: {
              type: 'update',
              key: 'ecommerce-order',
              sid: getSiteId(),
              id: id,
              data: data
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          var _toast = new bootstrap.Toast(document.querySelector('.toast'));

          document.querySelector('.toast .toast-body').innerHTML = __('Order updated');

          _toast.show();

          _this.getData();
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    },
    initFooter: function initFooter$1() {
      initFooter(__('Copyright © %1$ %2$ Kenzap%3$. All rights reserved.', new Date().getFullYear(), '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>'), __('Kenzap Cloud Services - Dashboard'));
    }
  };

  _this.init();

})();
//# sourceMappingURL=index.js.map
