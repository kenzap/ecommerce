// js dependencies
import { H, __html, __attr, html, attr, showLoader, hideLoader, initHeader, initBreadcrumbs, parseApiError, getCookie, onClick, onKeyUp, getSiteId, toast, link } from '@kenzap/k-cloud';
import { getPageNumber, getPagination, formatStatus, priceFormat, formatTime, stockBadge, simpleTags, onlyNumbers, initFooter } from "../_/_helpers.js"
import { inventoryListContent } from "../_/_cnt_inventory_list.js"
import { inventoryEdit } from "../_/_mod_inventory_edit.js"
import { inventoryView } from "../_/_mod_inventory_view.js"
import { categoryTable } from "../_/_mod_inventory_category_table.js"

// where everything happens
const _this = {
  
    state:{
        firstLoad: true,
        settings: {},
        limit: 50, // number of records to load per table
    },
    init: () => {
         
        _this.getData();
    },
    getData: () => {

        // show loader during first load
        if (_this.state.firstLoad) showLoader();

        // search content
        let s = document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';

        // struct term
        let term = [];

        // in stock
        if(document.querySelector('.select-stock-btn')) if(document.querySelector('.select-stock-btn').dataset.key == "in"){
         
            term.push(
                {
                    type:       'string',
                    field:      'stock_amount',
                    value:      0,
                    relation:   '!='
                }
            )
        }
        
        // out of stock
        if(document.querySelector('.select-stock-btn')) if(document.querySelector('.select-stock-btn').dataset.key == "out"){
         
            term.push(
                {
                    type:       'string',
                    field:      'stock_amount',
                    value:      0,
                    relation:   '='
                }
            )
        }

        // struct sort
        let sort = [];

        // sort by alphabetically
        if(document.querySelector('.select-title-btn')) if(document.querySelector('.select-title-btn').dataset.key == "title"){
         
            sort.push(
                {
                    field:      'title',
                    order:      'ASC'
                }
            )
        }

        // sort by updated
        if(document.querySelector('.select-title-btn')) if(document.querySelector('.select-title-btn').dataset.key == "updated"){
         
            sort.push(
                {
                    field:      'updated',
                    order:      'DESC'
                }
            )
        }

        // sort default
        if(sort.length == 0){

            sort.push(
                {
                    field:      'title',
                    order:      'ASC'
                }
            )
        }

        let search = {};
        
        // filter by tag
        if(_this.state.tag){

            console.log("tag: " + _this.state.tag);

            document.querySelector('.select-title-btn').innerHTML = __html('Tag %1$', '<span class="fw-light">' + _this.state.tag + '</span>');

            search =
                {                                                           // if s is empty search query is ignored
                    field: 'tags',
                    s: _this.state.tag
                }
        }

        // search
        if(s){

            search =
                {                                                           // if s is empty search query is ignored
                    field: 'title',
                    s: s
                }
        }

        // do API query
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    user: {
                        type:       'authenticate',
                        fields:     ['avatar'],
                        token:      getCookie('kenzap_token')
                    },
                    locale: {
                        type:       'locale',
                        // locale:      localStorage.hasOwnProperty('locale') ? localStorage.getItem('locale') : "en",
                        source:      ['extension'],
                        key:         'ecommerce',
                    },
                    settings: {
                        type:       'get',
                        key:        'ecommerce-settings',
                        fields:     ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_auto_rate', 'tax_rate', 'tax_display', 'fee_calc', 'fee_percent', 'fee_display'],
                    },
                    inventory: {
                        type:       'find',
                        key:        'ecommerce-inventory',
                        fields:     ['_id', 'id', 'img', 'status', 'tags', 'price', 'price_prev', 'price_per_unit', 'price_per_unit_prev', 'write_off', 'title', 'stock_amount', 'stock_unit', 'stock_warning', 'updated'],
                        limit:      _this.state.limit,
                        offset:     s.length > 0 ? 0 : getPageNumber() * _this.state.limit - _this.state.limit,    // automatically calculate the offset of table pagination
                        search:     search,
                        sortby:     sort,
                        term:       term
                        // groupby:    [
                        //                 {
                        //                     field: 'created',
                        //                 }
                        //             ]
                    },
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if(response.success){

                _this.state.settings = response.settings;
                _this.state.response = response;

                // init header
                initHeader(response);

                // get core html content 
                _this.loadPageStructure();  

                // render table
                _this.renderPage(response);

                // bind content listeners
                _this.initListeners();
            
                // init pagination
                _this.initPagination(response);

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
        document.querySelector('#contents').innerHTML = inventoryListContent(__);
    },
    renderPage: (response) => {

        console.log(response)

        if(_this.state.firstLoad){

            // initiate breadcrumbs
            initBreadcrumbs(
                [
                    { link: link('https://dashboard.kenzap.cloud'), text: __html('Home') },
                    { link: link('/'), text: __html('E-commerce') },
                    { text: __html('Inventory') }
                ]
            );

            // init table header
            document.querySelector(".table thead").innerHTML = `
                <tr>
                    <th class="align-middle text-center">
                        <div class="d-block m-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#212529" class="bi justify-content-end bi-search" viewBox="0 0 16 16" >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                            </svg>
                        </div>
                    </th>
                    <th class="align-middle">
                        <div class="search-cont input-group input-group-sm mb-0 justify-content-start">     
                            <div class="input-group">
                                <input type="text" placeholder="${ __html('Search inventory') }" class="form-control border-top-0 border-start-0 border-end-0 rounded-0 pe-4" aria-label="${ __html('Search inventory') }" aria-describedby="inputGroup-sizing-sm" style="max-width: 200px;">
                                <button type="button" class="btn bg-transparent btn-search-clear" style="margin-left: -32px; z-index: 100;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="st-opts st-table dropdown dropstart-">
                            <a class="text-black text-dark text-decoration-none fw-bolder border-0 dropdown-toggle select-title-btn" data-key="key" href="#" role="button" id="order-updated" data-id="updated" data-value="" data-bs-toggle="dropdown" aria-expanded="false">${ __html('Title') }</a>
                            <ul class="dropdown-menu select-title" aria-labelledby="order-title">
                                <li><a class="dppi dropdown-item" data-key="title" href="#" >${ __html('Title') }</a></li>
                                <li><a class="dppi dropdown-item" data-key="updated" href="#" >${ __html('Updated') }</a></li>
                                <li><a class="dppi dropdown-item" data-key="tag" href="#" >${ __html('Tag') }</a></li>
                            </ul>
                        </div>
                    </th>
                    <th class="align-middle">
                        <a class="text-black text-dark text-decoration-none fw-bolder border-0 dropdown-toggle select-stock-btn" href="#" data-key="" role="button" id="order-updated" data-id="updated" data-value="" data-bs-toggle="dropdown" aria-expanded="false">${ __html('All') }</a>
                        <ul class="dropdown-menu select-stock" aria-labelledby="order-stock">
                            <li><a class="dppi dropdown-item" data-key="" href="#" >${ __html('All') }</a></li>
                            <li><a class="dppi dropdown-item" data-key="in" href="#" >${ __html('In stock') }</a></li>
                            <li><a class="dppi dropdown-item d-none" data-key="low" href="#" >${ __html('Low stock') }</a></li>
                            <li><a class="dppi dropdown-item" data-key="out" href="#" >${ __html('Out of stock') }</a></li>
                        </ul>
                    </th>
                    <th class="align-middle d-none d-sm-table-cell">
                        ${ __html("Price") }
                    </th>
                    <th class="align-middle d-none d-sm-table-cell">
                        ${ __html('Updated') }
                    </th>
                    <th class="d-none"></th>
                </tr>`;

        }

        // no inventory in the list
        if (response.inventory.length == 0) {

            document.querySelector(".table tbody").innerHTML = `<tr><td colspan="6" class="form-text">${ __html("No items to display.") }</td></tr>`;
            return;
        }

        let sid = getSiteId();

        // generate website table
        let list = '';
        for (let i in response.inventory) {

            // normalise inventory values
            if(!response.inventory[i].stock_warning) response.inventory[i].stock_warning = 0;
            response.inventory[i].stock_warning = parseFloat(response.inventory[i].stock_warning);
            response.inventory[i].stock_amount = parseFloat(response.inventory[i].stock_amount);

            let allow = true;

            // if(response.inventory.stock_amount <= 0 && document.querySelector('.select-stock-btn').dataset.key == "out"){

            //     allow = true;
            // }else if(response.inventory.stock_warning >= response.inventory.stock_amount && document.querySelector('.select-stock-btn').dataset.key == "low"){

            //     allow = true;
            // }
 
            // // in stock
            // if(response.inventory[i].stock_warning < response.inventory[i].stock_amount && document.querySelector('.select-stock-btn').dataset.key == "in"){

            //     allow = true;
            // }

            // // low stock
            // if(response.inventory[i].stock_warning >= response.inventory[i].stock_amount && response.inventory[i].stock_amount > 0 && document.querySelector('.select-stock-btn').dataset.key == "low"){

            //     allow = true;
            // }

            // // out of stock
            // if(response.inventory[i].stock_amount <= 0 && document.querySelector('.select-stock-btn').dataset.key == "out"){

            //     allow = true;
            // }
            
            // // all
            // if(document.querySelector('.select-stock-btn').dataset.key == ""){

            //    allow = true;
            // }
            
            // if(allow){

            // set inventory image
            let img = 'https://cdn.kenzap.com/loading.png';
            if(typeof(response.inventory[i].img) === 'undefined') response.inventory[i].img = [];
            if(response.inventory[i].img[0]) img = CDN + '/S'+sid+'/product-'+response.inventory[i]._id+'-1-100x100.jpeg?'+response.inventory[i].updated;
      
            list += `
                <tr>
                    <td>
                        <div class="timgc view-item" data-id="${ attr(response.inventory[i]._id) }">
                            <a href="#"><img src="${ img }" data-srcset="${ img }" class="img-fluid rounded" alt="${ __attr("Product placeholder") }" srcset="${ img }" ></a>
                        </div>
                    </td>
                    <td class="destt view-item" data-id="${ attr(response.inventory[i]._id) }" style="max-width:250px;min-width:120px;">
                        <div class="my-1"> 
                            <a class="text-body" href="#" >${ response.inventory[i].title }</a>
                            <div class="form-text form-text d-flex fst-italic my-0">
                                <div class="d-flex align-items-center">
                                    <div>${ parseFloat(response.inventory[i].stock_amount).toFixed(2) } ${ response.inventory[i].stock_unit }</div>
                                    <div id="stock_arrow" class="triangle_down mx-2"></div>
                                </div>
                                <div class="d-flex align-items-center ms-1">
                                    <div>${ priceFormat(_this, parseFloat(response.inventory[i].price_per_unit)) }</div>
                                    <div id="price_arrow" class="${ (parseFloat(response.inventory[i].price_per_unit_prev) - parseFloat(response.inventory[i].price_per_unit)) > 0 ? 'triangle_down triangle_green' : '' } ${ (parseFloat(response.inventory[i].price_per_unit_prev) - parseFloat(response.inventory[i].price_per_unit)) < 0 ? 'triangle_up triangle_red' : '' } mx-2"></div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span>${ stockBadge(_this, response.inventory[i]) }</span>
                    </td>
                    <td class="d-none d-sm-table-cell">
                        <span>${ priceFormat(_this, response.inventory[i].price) }</span>
                    </td>
                    <td class="d-none d-sm-table-cell">
                        <span>${ formatTime(__, response.inventory[i].updated) }</span>
                    </td>
                    <td class="text-end d-none">

                    </td>
                </tr>`; 
            // }
        }

        // provide result to the page
        document.querySelector(".table tbody").innerHTML = list;

        if(response.inventory.length < 2){ document.querySelector(".table tbody").style.height = "150px"; }else{ document.querySelector(".table tbody").style.height = "auto"; }
    },
    initListeners: () => {

        // remove product
        onClick('.remove-product', _this.listeners.removeProduct);
        
        // view item
        onClick('.view-item', e => {

            _this.viewItem(e);
        });

        // search inventory activation
        onClick('.table-p-list .bi-search', _this.listeners.searchInventoryActivate);

        // search inventory hide
        onClick('.table-p-list .btn-search-clear', _this.listeners.searchInventoryDeactivate);

        // search inventory activation
        onClick('.table-p-list .inventoryActionsCont .dropdown-item', _this.listeners.tableAction);

        // stock sort select
        onClick('.select-stock a', _this.listeners.stockSort)

        // title sort select
        onClick('.select-title a', _this.listeners.titleSort)

        // break here if initListeners is called more than once
        if(!_this.state.firstLoad) return;

        // add product modal
        onClick('.btn-add', _this.addItem);

        // add product confirm
        // onClick('.btn-modal', _this.listeners.modalSuccessBtn);
    },
    listeners: {

        titleSort: (e) => {

            e.preventDefault();

            _this.state.tag = "";

            // pick category first
            if(e.currentTarget.dataset.key == 'tag'){

                categoryTable(_this)
            }else{

                document.querySelector('.select-title-btn').innerHTML = e.currentTarget.innerHTML;
                document.querySelector('.select-title-btn').dataset.key = e.currentTarget.dataset.key;

                _this.getData();
            }
        },

        stockSort: (e) => {

            e.preventDefault();

            _this.state.tag = "";

            document.querySelector('.select-stock-btn').innerHTML = e.currentTarget.innerHTML;
            document.querySelector('.select-stock-btn').dataset.key = e.currentTarget.dataset.key;

            _this.getData();
        },

        removeProduct: (e) => {

            e.preventDefault();

            let c = confirm( __attr('Completely remove this product?') );

            if(!c) return;
  
            // send data
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        product: {
                            type:       'delete',
                            key:        'ecommerce-inventory',   
                            id:         e.currentTarget.dataset.id,
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    // modalCont.hide();

                    _this.getData();

                }else{

                    parseApiError(response);
                }
                
            })
            .catch(error => { parseApiError(error); });
        },
 
        searchInventoryActivate: (e) => {

            e.preventDefault();

            document.querySelector('.table-p-list thead tr th:nth-child(2) .st-table').style.display = 'none';
            document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'flex';
            document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont input').focus();

            // search inventory
            onKeyUp('.table-p-list thead tr th:nth-child(2) .search-cont input', _this.listeners.searchInventory);
        },

        searchInventoryDeactivate: (e) => {

            e.preventDefault();

            document.querySelector('.table-p-list thead tr th:nth-child(2) .st-table').style.display = 'block';
            document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'none';
            document.querySelector('.search-cont input').value = "";

            setTimeout(()=>{ _this.getData(); },500);
        },

        tableAction: (e) => {

            e.preventDefault();

            _this.state.id = e.currentTarget.dataset.id;

            // alert(_this.state.id);

            switch(e.currentTarget.dataset.action){

                case 'edit':

                    _this.editItem(e);

                break;
            }
        },
 
        searchInventory: (e) => {

            e.preventDefault();

            _this.getData();
        },

        // modalSuccessBtn: (e) => {
            
        //     console.log('calling modalSuccessBtnFunc');
        //     _this.listeners.modalSuccessBtnFunc(e);
        // },

        // modalSuccessBtnFunc: null
    },
    viewItem: (e) => {

        _this.state.id = e.currentTarget.dataset.id;

        inventoryView(_this);
    },
    editItem: (e) => {

        _this.state.action = 'edit';

        inventoryEdit(_this);
    },
    addItem: (e) => {

        _this.state.action = 'add';

        inventoryEdit(_this);
    },
    initPagination: (response) => {

        getPagination(__, response.meta, _this.getData);
    },
    initFooter: () => {
        
        initFooter(__html('Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>'), '');
    }
}

_this.init();