
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35734/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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

  var HTMLContent = function HTMLContent(__) {
    return "\n        <div class=\"container p-edit\">\n            <div class=\"d-flex justify-content-between bd-highlight mb-3\">\n                <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card\">\n                    <div class=\"card border-white shadow-sm p-sm-3 py-3\">\n                        <nav class=\"nav flex-column\">\n                            <a class=\"nav-link active fs-4 sales-report\" aria-current=\"page\" href=\"#\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-shop mb-1 me-3\" viewBox=\"0 0 16 16\">\n                            <path d=\"M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z\"/>\n                            </svg>".concat(__('Sales report'), "</a>\n\n                            <hr>\n                                               \n                            <a class=\"nav-link fs-4 products-report\" href=\"#\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-tags mb-1 me-3\" viewBox=\"0 0 16 16\">\n                            <path d=\"M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z\"/>\n                            <path d=\"M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z\"/>\n                            </svg>").concat(__('Top products'), "</a>\n\n                            <hr>\n                                                \n                            <a class=\"nav-link fs-4 disabled\" href=\"").concat(link('/settings/'), "\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-chat-left-dots mb-1 me-3\" viewBox=\"0 0 16 16\">\n                            <path d=\"M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z\"/>\n                            <path d=\"M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n                            </svg>").concat(__('Customers'), "</a>\n\n                            <hr>\n                                                \n                            <a class=\"nav-link fs-4 disabled\" href=\"").concat(link('/analytics/'), "\" tabindex=\"-1\" aria-disabled=\"true\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-graph-up me-3\" viewBox=\"0 0 16 16\">\n                            <path fill-rule=\"evenodd\" d=\"M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z\"></path>\n                            </svg>").concat(__('Custom'), "</a>\n                        </nav>\n                    </div>\n                </div>\n            </div>\n   \n            <div class=\"modal\" tabindex=\"-1\">\n                <div class=\"modal-dialog\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\"></h5>\n                            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                        </div>\n                        <div class=\"modal-body\">\n\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                            <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    ");
  };

  var mt = function mt(val) {
    return ("" + val).length < 2 ? "0" + val : val;
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

  var _this = {
    state: {
      firstLoad: true,
      ajaxQueue: 0,
      modalCont: null,
      settings: {},
      charts: {}
    },
    init: function init() {
      _this.getData();
    },
    getData: function getData() {
      if (_this.state.firstLoad) showLoader();
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          query: {
            locale: {
              type: 'locale',
              source: ['extension'],
              key: 'ecommerce'
            },
            settings: {
              type: 'get',
              key: 'ecommerce-settings',
              fields: ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_auto_rate', 'tax_rate', 'tax_display']
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        hideLoader();

        if (response.success) {
          initHeader(response);

          _this.loadHomeStructure();

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
    renderPage: function renderPage(response) {
      initBreadcrumbs([{
        link: link('https://dashboard.kenzap.cloud'),
        text: __('Dashboard')
      }, {
        link: link('/home/'),
        text: __('E-commerce')
      }, {
        text: __('Analytics')
      }]);
      _this.state.settings = response.settings;
    },
    initListeners: function initListeners() {
      onClick('.sales-report', _this.salesReport);
      onClick('.products-report', _this.productReport);
    },
    salesReport: function salesReport(e) {
      e.preventDefault();
      var modal = document.querySelector(".modal");
      _this.state.modalCont = new bootstrap.Modal(modal);
      modal.querySelector(".modal-dialog").classList.add("modal-fullscreen");
      var html_head = "\n        <input id=\"datepicker\" class=\"form-control form-control-sm mt-1 border-0\" placeholder=\"".concat(__('Today'), "\"/>\n        ");
      modal.querySelector(".modal-title").innerHTML = __('Sales report') + " " + html_head;
      modal.querySelector(".btn-primary").style.display = 'none';
      modal.querySelector(".btn-secondary").innerHTML = __('Close');
      modal.querySelector(".modal-body").innerHTML = "Loading..";
      var bookedDates = [];
      var picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: ['https://cdn.jsdelivr.net/npm/@easepick/bundle@1.1.7/dist/index.css', '/assets/css/date_picker.css'],
        plugins: ['RangePlugin', 'LockPlugin'],
        RangePlugin: {
          tooltipNumber: function tooltipNumber(num) {
            return num - 1;
          },
          locale: {
            one: __('day'),
            other: __('days')
          }
        },
        LockPlugin: {
          maxDate: new Date(),
          minDays: 1,
          inseparable: true,
          filter: function filter(date, picked) {
            if (picked.length === 1) {
              var incl = date.isBefore(picked[0]) ? '[)' : '(]';
              return !picked[0].isSame(date, 'day') && date.inArray(bookedDates, incl);
            }

            return date.inArray(bookedDates, '[)');
          }
        }
      });
      picker.on('select', function (e) {
        _this.salesReportData();
      }, {});

      _this.salesReportData();

      _this.state.modalCont.show();
    },
    salesReportData: function salesReportData(e) {
      var from = "";
      var to = "";
      var date = document.querySelector('#datepicker').value.split(' - ');

      if (date.length == 2) {
        from = date[0].trim() + 'T00:00:00.001Z';
        to = date[1].trim() + 'T23:59:59.001Z';
      } else {
        var dateObj = new Date();
        from = dateObj.getUTCFullYear() + '-' + mt(dateObj.getUTCMonth() + 1) + '-' + mt(dateObj.getUTCDate()) + 'T00:00:00.001Z';
        to = dateObj.getUTCFullYear() + '-' + mt(dateObj.getUTCMonth() + 1) + '-' + mt(dateObj.getUTCDate()) + 'T23:59:00.001Z';
      }

      console.log(Date.parse(from) + ' ' + Date.parse(to));
      console.log(from + ' ' + to);
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          query: {
            sales: {
              type: "find",
              key: "ecommerce-order",
              fields: ["status", "updated", "created_ymd"],
              sum: ["total", "total_all"],
              count: ["total"],
              term: [{
                "field": "created",
                "relation": ">=",
                "type": "numeric",
                "value": Date.parse(from) / 1000 | 0
              }, {
                "field": "status",
                "relation": "=",
                "type": "string",
                "value": "completed"
              }, {
                "field": "created",
                "relation": "<=",
                "type": "numeric",
                "value": Date.parse(to) / 1000 | 0
              }],
              groupby: [{
                "field": "created_ymd"
              }],
              sortby: {
                "field": "created_ymd",
                "order": "DESC"
              },
              limit: 40,
              offset: 0
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        hideLoader();

        if (response.success) {
          var ds = [['Period', 'Tax', 'Total']];
          var obj = {
            total: 0,
            total_all: 0
          };
          var obj_txt = {
            total: __('Subtotal'),
            total_all: __('Grand Total')
          };

          if (response.sales.length == 0) {
            document.querySelector(".modal-body").innerHTML = __('No data to display');
            return;
          }

          response.sales.forEach(function (el) {
            if (el.created_ymd) {
              el.total_sum = el.total_sum ? el.total_sum : 0;
              el.total_all_sum = el.total_all_sum ? el.total_all_sum : 0;
              obj.total += el.total_sum;
              obj.total_all += el.total_all_sum;
              ds.push([el.created_ymd, el.total_sum, el.total_all_sum]);
            }
          });
          var html_body = "<div id=\"sales-chart\" style=\"min-height:300px\"></div>";

          for (var i in obj) {
            html_body += "\n                    <div class=\"mb-3 mt-3 order-row\" >\n                        <b>".concat(obj_txt[i], "</b> ").concat(priceFormat(_this, obj[i]), "\n                    </div>");
          }

          document.querySelector(".modal-body").innerHTML = html_body;
          google.charts.load('current', {
            'packages': ['corechart']
          });
          google.charts.setOnLoadCallback(function () {
            var data = google.visualization.arrayToDataTable(ds);
            var options = {
              animation: {
                duration: 1000,
                easing: 'out'
              },
              hAxis: {
                titleTextStyle: {
                  color: '#1941df'
                },
                baselineColor: '#1941df',
                textStyle: {
                  color: '#212529',
                  fontSize: 12,
                  bold: true
                }
              },
              vAxis: {
                titleTextStyle: {
                  color: '#1941df'
                },
                minValue: 0,
                textStyle: {
                  color: '#212529',
                  fontSize: 12,
                  bold: true
                }
              },
              backgroundColor: {
                stroke: '#1941df',
                fill: 'transparent',
                strokeWidth: 0
              },
              colors: ['#dc3545', '#1941df', '#198754'],
              bar: {
                groupWidth: "95%"
              },
              legend: {
                position: "none"
              }
            };
            _this.state.charts.sales = new google.visualization.ColumnChart(document.getElementById('sales-chart'));

            _this.state.charts.sales.draw(data, options);
          });
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    },
    productReport: function productReport(e) {
      e.preventDefault();
      var modal = document.querySelector(".modal");
      _this.state.modalCont = new bootstrap.Modal(modal);
      modal.querySelector(".modal-dialog").classList.add("modal-fullscreen");
      var html_head = "\n        <input id=\"datepicker\" class=\"form-control form-control-sm mt-1 border-0\" placeholder=\"".concat(__('Today'), "\"/>\n        ");
      modal.querySelector(".modal-title").innerHTML = __('Top products') + " " + html_head;
      modal.querySelector(".btn-primary").style.display = 'none';
      modal.querySelector(".btn-secondary").innerHTML = __('Close');
      modal.querySelector(".modal-body").innerHTML = "Loading..";
      var bookedDates = [];
      var picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: ['https://cdn.jsdelivr.net/npm/@easepick/bundle@1.1.7/dist/index.css', '/assets/css/date_picker.css'],
        plugins: ['RangePlugin', 'LockPlugin'],
        RangePlugin: {
          tooltipNumber: function tooltipNumber(num) {
            return num - 1;
          },
          locale: {
            one: __('day'),
            other: __('days')
          }
        },
        LockPlugin: {
          maxDate: new Date(),
          minDays: 1,
          inseparable: true,
          filter: function filter(date, picked) {
            if (picked.length === 1) {
              var incl = date.isBefore(picked[0]) ? '[)' : '(]';
              return !picked[0].isSame(date, 'day') && date.inArray(bookedDates, incl);
            }

            return date.inArray(bookedDates, '[)');
          }
        }
      });
      picker.on('select', function (e) {
        _this.productsReportData();
      }, {});

      _this.productsReportData();

      _this.state.modalCont.show();
    },
    productsReportData: function productsReportData(e) {
      var from = "";
      var to = "";
      var date = document.querySelector('#datepicker').value.split(' - ');

      if (date.length == 2) {
        from = date[0].trim() + 'T00:00:00.001Z';
        to = date[1].trim() + 'T23:59:59.001Z';
      } else {
        var dateObj = new Date();
        from = dateObj.getUTCFullYear() + '-' + mt(dateObj.getUTCMonth() + 1) + '-' + mt(dateObj.getUTCDate()) + 'T00:00:00.001Z';
        to = dateObj.getUTCFullYear() + '-' + mt(dateObj.getUTCMonth() + 1) + '-' + mt(dateObj.getUTCDate()) + 'T23:59:00.001Z';
      }

      console.log(Date.parse(from) + ' ' + Date.parse(to));
      console.log(from + ' ' + to);
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          query: {
            products: {
              type: "find",
              key: "ecommerce-order",
              fields: ["items", "updated", "created_ymd"],
              term: [{
                "field": "created",
                "relation": ">=",
                "type": "numeric",
                "value": Date.parse(from) / 1000 | 0
              }, {
                "field": "status",
                "relation": "=",
                "type": "string",
                "value": "completed"
              }, {
                "field": "created",
                "relation": "<=",
                "type": "numeric",
                "value": Date.parse(to) / 1000 | 0
              }],
              sortby: {
                "field": "created",
                "order": "DESC"
              },
              limit: 1000,
              offset: 0
            },
            settings: {
              type: 'get',
              key: 'ecommerce-settings',
              fields: ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_auto_rate', 'tax_rate', 'tax_display']
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        hideLoader();

        if (response.success) {
          _this.state.settings = response.settings;
          var html = "\n                    <div class=\"table-responsive\">\n                        <table class=\"table table-hover table-borderless align-middle table-striped table-p-list mb-0\" style=\"min-width: 800px;\">\n                            <thead>\n                                <tr><th><div class=\"me-1 me-sm-3\">".concat(__('Product'), "</div></th><th class=\"qty\"><div class=\"me-1 me-sm-3\">").concat(__('Qty'), "</div></th><th class=\"tp\"><div class=\"me-1 me-sm-3\">").concat(__('Total'), "</div></th><th></th>\n                            </thead>\n                            <tbody>");
          var s = [],
              totals = {
            qty: 0,
            total: 0
          };
          response.products.forEach(function (o) {
            if (Array.isArray(o.items)) {
              o.items.forEach(function (p) {
                if (!s[p.id]) {
                  var _s$p$id;

                  s[p.id] = (_s$p$id = {
                    id: p.id,
                    title: p.title,
                    qty: p.qty
                  }, _defineProperty(_s$p$id, "qty", p.qty), _defineProperty(_s$p$id, "total", p.total), _s$p$id);
                } else {
                  s[p.id].qty += p.qty;
                  s[p.id].total += p.total;
                }
              });
            }
          });
          var list = Object.keys(s).map(function (key) {
            return s[key];
          });
          list.sort(function (a, b) {
            return b.qty - a.qty;
          });
          list.forEach(function (i) {
            var img = 'https://cdn.kenzap.com/loading.png';
            html += "\n                            <tr class=\"new-item-row\">\n                                <td class=\"d-none\">\n                                    <div class=\"timgc me-1 me-sm-3\">\n                                        <a href=\"".concat(link('/product-edit/?id=' + i.id), "\"><img src=\"").concat(img, "\" data-srcset=\"").concat(img, "\" class=\"img-fluid rounded\" alt=\"").concat(__("Product placeholder"), "\" srcset=\"").concat(img, "\" ></a>\n                                    </div>\n                                </td>\n                                <td class=\"destt\" style=\"max-width:250px;min-width:150px;\">\n                                    <div class=\"my-1\"> \n                                        <a class=\"text-body\" href=\"").concat(link('/product-edit/?id=' + i.id), "\" >").concat(i.title, "<i style=\"color:#9b9b9b;font-size:15px;margin-left:8px;\" title=\"").concat(__("Edit product"), "\" class=\"mdi mdi-pencil menu-icon edit-page\"></i></a>\n                                    </div>\n                                </td>\n                                <td class=\"qty\">\n                                    <div class=\"me-1 me-sm-3\">\n                                        ").concat(i.qty, "\n                                    </div>\n                                </td>\n                                <td class=\"tp\">\n                                    ").concat(priceFormat(_this, i.total), "\n                                </td>\n                                <td class=\"align-middle text-center\"> \n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 16 16\" width=\"24\" height=\"24\" class=\"bi bi-plus-circle text-success align-middle add-item\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"></path><path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"></path></svg>\n                                </td>\n                            </tr>");
            totals.qty += i.qty;
            totals.total += i.total;
          });
          if (list.length == 0) html += "<tr><td colspan=\"4\">".concat(__('No data to display'), "</td></tr>");
          if (list.length > 0) html += "<tr><td><b>".concat(__('Totals'), "</b></td><td>").concat(totals.qty, "</td><td>").concat(priceFormat(_this, totals.total), "</td><td> </td></tr>");
          html += "</tbody>\n                    </table>\n                </div>";
          document.querySelector(".modal-body").innerHTML = html;
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    },
    listeners: {
      modalSuccessBtn: function modalSuccessBtn(e) {
        _this.listeners.modalSuccessBtnFunc(e);
      },
      modalSuccessBtnFunc: null
    },
    loadHomeStructure: function loadHomeStructure() {
      if (!_this.state.firstLoad) return;
      document.querySelector('#contents').innerHTML = HTMLContent(__);
    },
    initFooter: function initFooter$1() {
      initFooter(__('Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>'), '');
    }
  };

  _this.init();

})();
//# sourceMappingURL=index.js.map
