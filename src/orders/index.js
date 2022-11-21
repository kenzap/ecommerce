// js dependencies
import { H, showLoader, hideLoader, initHeader, initBreadcrumbs, parseApiError, getCookie, onClick, onKeyUp, spaceID, toast, link, onChange, __html } from '@kenzap/k-cloud';
import { timeConverterAgo, priceFormat, getPageNumber, makeNumber, unescape, mt, playSound, ecommerceUpdates, initFooter } from "../_/_helpers.js"
import { tables } from "../_/_order_tables.js"
import { preview } from "../_/_order_preview.js"
import { HTMLContent } from "../_/_cnt_orders.js"
import { printReceipt, autoPrint, isPrintQREnabled } from "../_/_print.js"

// where everything happens
const _this = {
  
    state: {
        firstLoad: true,
        changes: false,
        modalCont: null,
        modalOpen: false,
        playSound: { allowed: false, ids: null, nids: [], n: 0, max_times: 5, timer: null, audio: new Audio('https://kenzap.com/static/swiftly.mp3') },
        orderIDs: [],
        printLink: null, // storing receipt print pending order 
        printRequest: null, // storing receipt print pending order 
        user: {}, // where user data is cached
        orders: [], // where all requested orders are cached
        settings: {}, // where all requested settings are cached
        qr_settings: {}, // where all requested settings are cached
        orderSingle: [], // where single order is stored during preview
        printQueue: [],
        updates: { last_order_id: '', last_order_update: 0 },
        playTitleTimer: null,
        refreshTimer: null,
        statuses: [],
        limit: 200, // number of records to load per table
        slistLimit: 10, // product suggestion fetch search limit
        productsSuggestions: []
    },
    init: () => {
         
        // load data
        _this.getData();

        // get latest orders and notifications
        let cb = (response) => { 

            if(_this.state.firstLoad){ 

                _this.state.updates.last_order_id = response.last_order_id;
                _this.state.updates.last_order_update = response.last_order_update;
            }

            // refresh if order list changes
            if(response.last_order_update != _this.state.updates.last_order_update){

                playSound(_this, 1);

                _this.getData();
                 
                _this.state.updates.last_order_id = response.last_order_id;
                _this.state.updates.last_order_update = response.last_order_update;
            }
        };

        // _this.playSound();

        // ecommerceUpdates(_this, ['messages', 'last_order_id'], cb);

        // turn on data polling for new orders
        _this.state.refreshTimer = setInterval(() => { ecommerceUpdates(_this, ['messages', 'last_order_id'], cb); }, 5000);
    },
    getData: () => {

        // show loader during first load
        if (_this.state.firstLoad) showLoader();

        if(_this.state.printRequest){

            // printReceipt(_this, _this.state.printRequest, "user");
            _this.state.printQueue.push({_id: _this.state.printRequest, type: "user", template: null});
        }

        // search content
        let s = document.querySelector('.search-input') ? document.querySelector('.search-input').value : '';

        // search term 
        let term = document.querySelector('#order-status') ? document.querySelector('#order-status').dataset.value: '';

        // skip refresh if modal is open
        if(document.querySelector('body.modal-open')){ return; }
        
        // do API query
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    user: {
                        type:       'authenticate',
                        fields:     ['avatar', 'id'],
                        token:      getCookie('kenzap_token')
                    },
                    locale: {
                        type:       'locale',
                        source:      ['extension'],
                        key:         'ecommerce',
                    },
                    orders: {
                        type:       'find',
                        key:        'ecommerce-order',
                        fields:     '*',
                        term:       term != '' ? 'status=\'' + term +'\'' : '',
                        limit:      _this.state.limit,
                        search:     {                                                           // if s is empty search query is ignored
                            field: 'from',
                            s: s
                        },
                        sortby:     {
                            field: 'created',
                            order: 'DESC'
                        }
                    },
                    // qr_settings: {
                    //     type:       'get',
                    //     key:        'qrmenu-settings',
                    //     fields:     ['slug'],
                    // },
                    settings: {
                        type:       'get',
                        key:        'ecommerce-settings',
                        fields:     ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_percent_auto', 'tax_percent', 'tax_display', 'fee_calc', 'fee_percent', 'fee_display', 'payment_methods', 'custom_payment_method', 'tables', 'table_list', 'add_products', 'add_products_list', 'templates'],
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if(response.success){
                
                // init header
                initHeader(response);

                // get core html content 
                _this.loadPageStructure();  

                // render table
                _this.renderPage(response);

                // bind content listeners
                _this.initListeners();
            
                // initiate footer
                initFooter(_this);

                // first load
                _this.state.firstLoad = false;

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    },
    authUser: (response) => {

        if(response.user){
            
            if(response.user.success == true){

                
            }
        }
    },
    loadPageStructure: () => {

        if(!_this.state.firstLoad) return;

        // get core html content 
        document.querySelector('#contents').innerHTML = HTMLContent();
    },
    renderPage: (response) => {

        if(_this.state.firstLoad){

            // initiate breadcrumbs
            initBreadcrumbs(
                [
                    { link: link('https://dashboard.kenzap.cloud'), text: __html('Home') },
                    { link: link('/'), text: __html('E-commerce') },
                    { text: __html('Orders') }
                ]
            );

            // initialize statuses
            _this.state.statuses = {
                'new': { 
                    text: __html('New'),
                    class: 'btn-warning text-dark fw-light'
                },
                'paid': {
                    text: __html('Paid'),
                    class: 'btn-primary fw-light'
                },
                'processing': { 
                    text: __html('Processing'),
                    class: 'btn-primary fw-light'
                },
                'completed': { 
                    text: __html('Completed'),
                    class: 'btn-success fw-light'
                },
                'canceled': { 
                    text: __html('Canceled'),
                    class: 'btn-secondary fw-light'
                },
                'failed': { 
                    text: __html('Failed'),
                    class: 'btn-danger fw-light'
                },
                'refunded': { 
                    text: __html('Refunded'),
                    class: 'btn-danger fw-light'
                }
            };
        }

        // cache orders globally
        _this.state.user = response.user;
        _this.state.orders = response.orders;
        _this.state.meta = response.meta;
        
        // console.log(_this.state.orders);

        // cache settings globally
        _this.state.settings = response.settings;
        // _this.state.qr_settings = response.qr_settings;

        if (!_this.state.settings['templates']){ _this.state.settings['templates'] = []; }

        // enable QR priting
        _this.state.settings.qr_print = isPrintQREnabled(_this);
        if (_this.state.settings.qr_print){ document.querySelector(".qr-print-cnt").classList.remove('d-none'); }

        // no orders in the list
        if (response.orders.length == 0){

            document.querySelector(".table tbody").innerHTML = `<tr><td colspan="5">${ __html("No orders to display.") }</td></tr>`;
            return;
        }

        // generate website table
        let orderIDsTemp = [];
        _this.state.newOrderCount = [];

        let list = '', new_ids = '';
        for (let i in response.orders){

            // save last order ID for ecommerceUpdates
            // if(i==0) _this.state.lastOrderID = response.orders[i]._id;

            let img = 'https://cdn.kenzap.com/loading.png';
            orderIDsTemp.push(response.orders[i]._id);

            if(typeof(response.orders[i].status) === 'undefined') response.orders[i].status = 'new';

            if(response.orders[i].status == 'new') new_ids += response.orders[i].id;
     
            let applink = {"print":"[C]<u><font size=\"big\">ORDER{{order_id_short}}</font></u>\n[C]Fu Zhen Seafood\n[C]<u type=double>{{date_time}}</u>\n[C]\n[C]================================\" \n[L]\n[L]<b>BEAUTIFUL SHIRT</b>[R]9.99€\n[L]  + Size : S\n[L]\n[L]<b>AWESOME HAT</b>[R]24.99€\n[L]  + Size : 57/58\n[L]\n[C]--------------------------------\n[R]TOTAL PRICE :[R]34.98€\n[R]TAX :[R]4.23€"};
            let classN = ((_this.state.orderIDs.includes(response.orders[i]._id) || _this.state.firstLoad)?'':'new');
            list += `
            <tr class="${ classN }">
              <td class="details view-order" data-id="${ response.orders[i]._id }" data-index="${ i }">
                <div class="ps-1" >
                  <b class="">${ (response.orders[i].id) }</b> ${ response.orders[i].from }
                  <div class=" elipsized fst-italic">${ response.orders[i].note ? response.orders[i].note : "" }</div>
                  <div class=" d-sm-none"> <span class="me-2">${ _this.getStatus(response.orders[i].status) }</span> <span class="text-muted">${ timeConverterAgo(__, response.meta.time, response.orders[i].created) }</span> </div>
                </div>
              </td>
              <td class="d-none d-sm-table-cell">
                <span class="fs-12">${ _this.getStatus(response.orders[i].status) }</span>
              </td>
              <td>
                <span style="font-size:18px;">${ priceFormat(_this, response.orders[i].total) }</span>
              </td>
              <td class="d-none d-sm-table-cell">
                <span style="font-size:18px;">${ timeConverterAgo(__, response.meta.time, response.orders[i].created) }</span>
              </td>
              <td class="last">
                <a href="#" data-id="${ response.orders[i]._id }" data-index="${ i }" class="view-order text-success d-none me-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg></a>
                <a href="kenzapprint://kenzapprint.app?data=${ encodeURIComponent(JSON.stringify(applink)) }" data-id="${ response.orders[i]._id }" data-index="${ i }" class="print-order-dis d-none text-success me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-printer me-2" viewBox="0 0 16 16">
                    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
                </svg></a>
                <a href="#" data-id="${ response.orders[i]._id }" data-index="${ i }" class="remove-order text-danger me-2"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg></a>
              </td>
            </tr>`;
        }
        
        // _this.state.playSoundNow = count_new > 0 ? true : false;
        // if(_this.state.playSound.ids != new_ids && !document.querySelector('body.modal-open')){ console.log('reload no'); }else{ console.log('reload yes'); _this.getData(); }

        // if(_this.state.playSound.ids){  }

        if(_this.state.playSound.ids && _this.state.playSound.ids!=new_ids && _this.state.playSound.ids.length < new_ids.length){ playSound(_this, 3); }

        _this.state.playSound.ids = new_ids;
        
        _this.state.orderIDs = orderIDsTemp;

        // provide result to the page
        document.querySelector(".table tbody").innerHTML = list;
    },
    // parse visual page status
    getStatus: (status) => {
    
        return `<div class="badge ${ _this.state.statuses[status].class }">${ _this.state.statuses[status].text }</div>`;
    },
    initListeners: () => {

        // view table mode
        tables.render(_this);

        // view order
        preview.viewOrder(_this);
        
        // remove order
        onClick('.remove-order', _this.listeners.removeOrder);

        // print order
        // print.viewOrder(_this);
        // onClick('.print-order', _this.listeners.printOrder);

        // table status change listener
        onClick('.st-table li a', _this.listeners.changeStatus);

        // break here if initListeners is called more than once
        if(!_this.state.firstLoad) return;

        // turn on auto printing 
        autoPrint(_this);

        // add new order listener
        preview.newOrder(_this);

        // modal success button
        onClick('.modal .btn-primary', _this.listeners.modalSuccessBtn);
        
        // search orders
        onKeyUp('.search-input', _this.listeners.searchOrders);

        // track first touch iteration to allow sound to play
        document.body.addEventListener('touchstart', function(){ _this.state.playSound.allowed = true ; }, false);
        document.body.addEventListener('mousedown', function(){ _this.state.playSound.allowed = true ; }, false);

        // android back pressed
        window.addEventListener("hashchange", function(e) {

            // close modal if still openned
            // if(window.location.href.indexOf("#editing")==-1) { e.preventDefault(); if(_this.modalCont){ _this.modalCont.hide(); } return false; }
            if(_this.modalCont){ e.preventDefault(); _this.modalOpen = false; _this.modalCont.hide(); return false; }
		});
    },
    listeners: {

        newOrder: (e) => {


        },
        changeStatus: (e) => {

            e.preventDefault();

            // console.log(e.currentTarget.dataset.key);

            let os = document.querySelector('#order-status');
            if(e.currentTarget.dataset.key == ""){
                os.innerHTML = __html('All')
                os.dataset.value = '';
            }else{
                os.innerHTML = _this.state.statuses[e.currentTarget.dataset.key].text;
                os.dataset.value = e.currentTarget.dataset.key;
            }

            let list = [];

            // clear previous classes
            Object.keys(_this.state.statuses).forEach((key) => {
                list = _this.state.statuses[key].class.split(' ');
                list.forEach((key) => { 
                    os.classList.remove(key);
                });
                os.classList.remove('btn-outline-secondary');
            });

            // add new classes
            if(e.currentTarget.dataset.key==''){
                
                os.classList.add('btn-outline-secondary');
            }else{
                list = _this.state.statuses[e.currentTarget.dataset.key].class.split(' ');
                list.forEach((key) => { 
                    os.classList.add(key);
                });
            }

            // reload table
            _this.getData();
        },
        removeOrder: (e) => {

            e.preventDefault();

            let c = confirm( __('Completely remove this order?') );

            if(!c) return;
  
            // send data
            fetch('https://api-v1.kenzap.cloud/ecommerce/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        product: {
                            type:       'delete-order',
                            id:         e.currentTarget.dataset.id,  
                            sid:        spaceID(),
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    // _this.modalCont.hide();

                    _this.getData();

                }else{

                
                    parseApiError(response);
                }
            })
            .catch(error => {
                parseApiError(error);
            });
        },
        searchOrders: (e) => {

            e.preventDefault();

            _this.getData();
        },

        modalSuccessBtn: (e) => {
            
            _this.listeners.modalSuccessBtnFunc(e);
        },

        modalSuccessBtnFunc: null
    },
    updateOrder: (i, id) => {

        // print immediately if order has no changes
        if(!_this.state.changes && _this.state.printRequest){ 

            _this.state.printQueue.push({_id: _this.state.printRequest, type: "user", template: null});
            // printReceipt(_this, _this.state.printRequest, "user");
            _this.modalCont.hide(); 
            return; 
        }

        let modal = document.querySelector(".modal");
        if(modal.querySelector(".btn-confirm").dataset.loading === 'true') return;
        modal.querySelector(".btn-confirm").dataset.loading = true;
        modal.querySelector(".btn-confirm").innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' + __html('Loading..');

        let data = {};

        // iterate through all fields
        for(let s of document.querySelectorAll('.order-form')){

            switch(s.dataset.type){
          
                // case 'html': data[s.dataset.id] = s.innerHTML; break;
                case 'key': 
                    data[s.dataset.id] = s.dataset.value; 
                    break;
                case 'key-number': 
                    data[s.dataset.id] = makeNumber(s.dataset.value); 
                    break;
                case 'items':   

                    // data['items'] = {};
                    data['items'] = [];
                    for(let item of document.querySelectorAll('.order-item-row-active')){

                        let vars = JSON.parse(unescape(item.dataset.vars));
                        let cats = JSON.parse(unescape(item.dataset.cats));
                        let discounts = JSON.parse(unescape(item.dataset.discounts));
                        let obj = {
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
                            // "priceF": parseFloat(item.querySelector('.item-total').dataset.value),
                            "total": parseFloat(item.querySelector('.item-total').dataset.value),
                            "variations": id == 'new' ? [] : vars ? vars : [],
                        }

                        // get discount
                        // let discount_type = document.querySelector('.edit-discount').options[document.querySelector('.edit-discount').selectedIndex].dataset.type;
                        if (item.querySelector('.item-total').dataset.discount_percent) { obj.discount_percent = item.querySelector('.item-total').dataset.discount_percent; }
                        if (item.querySelector('.item-total').dataset.discount_value) { obj.discount_value = item.querySelector('.edit-total').dataset.discount_value; }
                    
                        data['items'].push(obj);
                    }
                    
                break
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
                    if(document.querySelector(".payment-method-select")) data['price']['payment_method'] = document.querySelector(".payment-method-select").value;
                    break;
            }
        }


        // we use this data to generate analytical reports
        let dateObj = new Date();
        data['created_ymd'] = dateObj.getUTCFullYear() + '' + mt(dateObj.getUTCMonth() + 1) + '' + mt(dateObj.getUTCDate());
        data['created_ym'] = dateObj.getUTCFullYear() + '' + mt(dateObj.getUTCMonth() + 1);
        data['created_y'] = dateObj.getUTCFullYear() + '';
        data['printed'] = _this.state.printRequest ? true : false;
        data['notify'] = false;

        // console.log(data);

        preview._this.state.changes = false;

        // create new order
        if(id == 'new'){

            // additional required fields
            data['name'] = data['from'];
            data['customer'] = {
                "first_name": data['from'],
                "last_name": "",
                "kid": 0,
            };
            
            // get last order ID number
            fetch('https://api-v1.kenzap.cloud/ecommerce/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        order: {
                            type:       'create-order',
                            key:        'ecommerce-order',        
                            // sid:        localStorage.sid,
                            data:       data
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {
                
                if (response.success){

                    _this.modalCont.hide();

                    toast( __('Order created') );

                    if(_this.state.printRequest == 'new') _this.state.printRequest = data._id;
                    
                    _this.getData();
                                    
                }else{ parseApiError(response); }
            })
            .catch(error => { parseApiError(error); });

        // update existing order
        }else{

            // send data
            fetch('https://api-v1.kenzap.cloud/ecommerce/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        order: {
                            type:       'update-order',
                            id:         id,         
                            sid:        spaceID(),
                            data:       data
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    _this.modalCont.hide();

                    toast( __('Order updated') );

                    _this.getData();

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => {
                parseApiError(error);
            });
        }
    },
    initFooter: () => {
        
        initFooter(__('Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>'), '');
    }
}

_this.init();