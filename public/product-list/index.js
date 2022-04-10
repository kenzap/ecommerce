(function (kCloud) {
    'use strict';

    const replaceQueryParam = (param, newval, search) => {

        let regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
        let query = search.replace(regex, "$1").replace(/&$/, '');

        return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
    };

    const getPageNumber = () => {

        let urlParams = new URLSearchParams(window.location.search);
        let page = urlParams.get('page') ? urlParams.get('page') : 1;

        return parseInt(page);
    };

    const getPagination = (__, meta, cb) => {

        if(typeof(meta) === 'undefined'){ document.querySelector("#listing_info").innerHTML = __('no records to display'); return; }

        let offset = meta.limit+meta.offset;
        if(offset>meta.total_records) offset = meta.total_records;

        document.querySelector("#listing_info").innerHTML = __("Showing %1$ to %2$ of %3$ entries", (1+meta.offset), (offset), meta.total_records);
        //  "Showing "+(1+meta.offset)+" to "+(offset)+" of "+meta.total_records+" entries";

        let pbc = Math.ceil(meta.total_records / meta.limit);
        document.querySelector("#listing_paginate").style.display = (pbc < 2) ? "none" : "block";

        let page = getPageNumber(); 
        let html = '<ul class="pagination d-flex justify-content-end pagination-flat">';
        html += '<li class="paginate_button page-item previous" id="listing_previous"><a href="#" aria-controls="order-listing" data-type="prev" data-page="0" tabindex="0" class="page-link"><span aria-hidden="true">&laquo;</span></li>';
        let i = 0;
        while(i<pbc){

            i++; 
            if(((i >= page-3) && (i <= page)) || ((i <= page+3) && (i >=page))){

                html += '<li class="paginate_button page-item '+((page==i)?'active':'')+'"><a href="#" aria-controls="order-listing" data-type="page" data-page="'+i+'" tabindex="0" class="page-link">'+(page==i?i:i)+'</a></li>';      
            }
        }  
        html += '<li class="paginate_button page-item next" id="order-listing_next"><a href="#" aria-controls="order-listing" data-type="next" data-page="2" tabindex="0" class="page-link"><span aria-hidden="true">&raquo;</span></a></li>';
        html += '</ul>';

        document.querySelector("#listing_paginate").innerHTML = html;

        let page_link = document.querySelectorAll(".page-link");
        for (const l of page_link) {
            l.addEventListener('click', function(e) {

                let p = parseInt(getPageNumber());
                let ps = p;
                switch(l.dataset.type){ 
                    case 'prev': p-=1; if(p<1) p = 1; break;
                    case 'page': p=l.dataset.page; break;
                    case 'next': p+=1; if(p>pbc) p = pbc; break;
                }
                
                // update url
                if (window.history.replaceState) {

                    // let url = window.location.href.split('/page');
                    // let urlF = (url[0]+'/page'+p).replace('//page', '/page');

                    let str = window.location.search;
                    str = replaceQueryParam('page', p, str);
                    // window.location = window.location.pathname + str

                    // prevents browser from storing history with each change:
                    window.history.replaceState("kenzap-cloud", document.title, window.location.pathname + str);
                }

                // only refresh if page differs
                if(ps!=p) cb();
                
                e.preventDefault();
                return false;
            });
        }
    };

    const formatStatus = (__, st) => {

        st = parseInt(st); 
        switch(st){ 
          case 0: return '<div class="badge bg-warning text-dark fw-light">' + __('Draft') + '</div>';
          case 1: return '<div class="badge bg-primary fw-light">' + __('Published') + '</div>';
          case 3: return '<div class="badge bg-secondary fw-light">' + __('Unpublished') + '</div>';
          default: return '<div class="badge bg-secondary fw-light">' + __('Drafts') + '</div>';
        }
    };

    const formatPrice = (price) => {

        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD", });
        if(typeof(price) === 'undefined' || price == '') price = 0;
        price = parseFloat(price);
        price = formatter.format(price);
        return price;
    };

    const formatTime = (__, timestamp) => {
    	
        let a = new Date(timestamp * 1000);
        let months = [__('Jan'), __('Feb'), __('Mar'), __('Apr'), __('May'), __('Jun'), __('Jul'), __('Aug'), __('Sep'), __('Oct'), __('Nov'), __('Dec')];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        a.getHours();
        a.getMinutes();
        a.getSeconds();
        let time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    };

    // html product list loader
    const productListContent = (__) => {

        return `
    <div class="container">

        <div class="d-flex justify-content-between bd-highlight mb-3">
            <nav class="bc" aria-label="breadcrumb"></nav>
            <button class="btn btn-primary btn-add" type="button">${ __('Add product') }</button>
        </div>

        <div class="row">
            <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
                <div class="card border-white shadow-sm">
                    <div class="card-body">
                        <div class="no-footer">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="table-responsive">
                                        <table
                                            class="table table-hover table-borderless align-middle table-striped table-p-list"
                                            style="min-width: 800px;">
                                            <thead>

                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 col-md-5">
                                    <div class="dataTables_info mt-3 text-secondary fw-lighter" id="listing_info"
                                        role="status" aria-live="polite">&nbsp;</div>
                                </div>
                                <div class="col-sm-12 col-md-7">
                                    <div class="dataTables_paginate paging_simple_numbers mt-3" id="listing_paginate">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-modal"></button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
                </div>
            </div>
        </div>
    </div>

    <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">
        <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive"
            aria-atomic="true" data-bs-delay="3000">
            <div class="d-flex">
                <div class="toast-body"></div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                    aria-label="Close"></button>
            </div>
        </div>
    </div>
    
    `;

    };

    // js dependencies

    // where everything happens
    const _this = {
      
        state:{
            firstLoad: true,
            limit: 10, // number of records to load per table
        },
        init: () => {
             
            _this.getData();
        },
        getData: () => {

            // show loader during first load
            if (_this.state.firstLoad) kCloud.showLoader();

            // search content
            let s = document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';

            // do API query
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: kCloud.headers,
                body: JSON.stringify({
                    query: {
                        user: {
                            type:       'authenticate',
                            fields:     ['avatar'],
                            token:      kCloud.getCookie('kenzap_token')
                        },
                        locale: {
                            type:       'locale',
                            // locale:      localStorage.hasOwnProperty('locale') ? localStorage.getItem('locale') : "en",
                            source:      ['extension'],
                            key:         'ecommerce',
                        },
                        products: {
                            type:       'find',
                            key:        'ecommerce-product',
                            fields:     ['_id', 'id', 'img', 'status', 'price', 'title', 'updated'],
                            limit:      _this.state.limit,
                            offset:     s.length > 0 ? 0 : getPageNumber() * _this.state.limit - _this.state.limit,    // automatically calculate the offset of table pagination
                            search:     {                                                           // if s is empty search query is ignored
                                            field: 'title',
                                            s: s
                                        },
                            sortby:     {
                                            field: 'created',
                                            order: 'DESC'
                                        },
                            // groupby:    [
                            //                 {
                            //                     field: 'created',
                            //                 }
                            //             ]
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {

                // hide UI loader
                kCloud.hideLoader();

                if(response.success){

                    // init header
                    kCloud.initHeader(response);

                    // get core html content 
                    _this.loadPageStructure();  

                    // render table
                    _this.renderPage(response);

                    // bind content listeners
                    _this.initListeners();
                
                    // init pagination
                    _this.initPagination(response);

                    // initiate footer
                    _this.initFooter();

                    // first load
                    _this.state.firstLoad = false;

                }else {

                    kCloud.parseApiError(response);
                }
            })
            .catch(error => { kCloud.parseApiError(error); });
        },
        authUser: (response) => {

            if(response.user){
                
                if(response.user.success == true);
            }
        },
        loadPageStructure: () => {
      
            if(!_this.state.firstLoad) return;

            // get core html content 
            document.querySelector('#contents').innerHTML = productListContent(__);
        },
        renderPage: (response) => {

            if(_this.state.firstLoad){

                // initiate breadcrumbs
                kCloud.initBreadcrumbs(
                    [
                        { link: kCloud.link('https://dashboard.kenzap.cloud'), text: __('Dashboard') },
                        { link: kCloud.link('/'), text: __('E-commerce') },
                        { text: __('Product list') }
                    ]
                );

                // init table header
                document.querySelector(".table thead").innerHTML = `
                <tr>
                    <th>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" class="bi justify-content-end bi-search mb-1" viewBox="0 0 16 16" >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                        </svg>
                    </th>
                    <th>
                        <div class="search-cont input-group input-group-sm mb-0 justify-content-start">     
                            <input type="text" placeholder="${ __('Search products') }" class="form-control border-top-0 border-start-0 border-end-0 rounded-0" aria-label="${ __('Search products') }" aria-describedby="inputGroup-sizing-sm" style="max-width: 200px;">
                        </div>
                        <span>${ __("Title") }</span>
                    </th>
                    <th>${ __("Status") }</th>
                    <th>${ __("Price") }</th>
                    <th>${ __("Last change") }</th>
                    <th></th>
                </tr>`;

            }

            // no products in the list
            if (response.products.length == 0) {

                document.querySelector(".table tbody").innerHTML = `<tr><td colspan="6">${ __("No products to display.") }</td></tr>`;
                return;
            }

            let sid = kCloud.getSiteId();

            // generate website table
            let list = '';
            for (let i in response.products) {

                let img = 'https://cdn.kenzap.com/loading.png';

                if(typeof(response.products[i].img) === 'undefined') response.products[i].img = [];
                if(response.products[i].img[0]) img = CDN + '/S'+sid+'/product-'+response.products[i]._id+'-1-100x100.jpeg?'+response.products[i].updated;
                  
                list += `
                <tr>
                    <td>
                        <div class="timgc">
                            <a href="${ kCloud.link('/product-edit/?id='+response.products[i]._id) }"><img src="${ img }" data-srcset="${ img }" class="img-fluid rounded" alt="${ __("Product placeholder") }" srcset="${ img }" ></a>
                        </div>
                    </td>
                    <td class="destt" style="max-width:250px;min-width:250px;">
                        <div class="mb-3 mt-3"> 
                            <a class="text-body" href="${ kCloud.link('/product-edit/?id='+response.products[i]._id) }" >${ response.products[i].title }<i style="color:#9b9b9b;font-size:15px;margin-left:8px;" title="${ __("Edit product") }" class="mdi mdi-pencil menu-icon edit-page"></i></a>
                        </div>
                    </td>
                    <td>
                        <span>${ formatStatus(__, response.products[i].status) }</span>
                    </td>
                    <td>
                        <span>${ formatPrice(response.products[i].price) }</span>
                    </td>
                    <td>
                        <span>${ formatTime(__, response.products[i].updated) }</span>
                    </td>
                    <td> 
                        <a href="#" data-id="${ response.products[i]._id }" class="remove-product text-danger ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </a>
                        <i title="${ __("Remove this product") }" data-key="${ response.products[i].id }" class="mdi mdi-trash-can-outline list-icon remove-product"></i>
                    </td>
                </tr>`; 
            }

            // provide result to the page
            document.querySelector(".table tbody").innerHTML = list;
        },
        initListeners: () => {

            // remove product
            kCloud.onClick('.remove-product', _this.listeners.removeProduct);

            // search products activation
            kCloud.onClick('.table-p-list .bi-search', _this.listeners.searchProductsActivate);

            // break here if initListeners is called more than once
            if(!_this.state.firstLoad) return;

            // add product modal
            kCloud.onClick('.btn-add', _this.addProduct);

            // add product confirm
            kCloud.onClick('.btn-modal', _this.listeners.modalSuccessBtn);
        },
        listeners: {

            removeProduct: (e) => {

                e.preventDefault();

                let c = confirm( __('Completely remove this product?') );

                if(!c) return;
      
                // send data
                fetch('https://api-v1.kenzap.cloud/', {
                    method: 'post',
                    headers: kCloud.headers,
                    body: JSON.stringify({
                        query: {
                            product: {
                                type:       'delete',
                                key:        'ecommerce-product',   
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

                    }else {

                        kCloud.parseApiError(response);
                    }
                    
                })
                .catch(error => { kCloud.parseApiError(error); });
            },
     
            searchProductsActivate: (e) => {

                e.preventDefault();

                document.querySelector('.table-p-list thead tr th:nth-child(2) span').style.display = 'none';
                document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'flex';
                document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont input').focus();

                // search products
                kCloud.onKeyUp('.table-p-list thead tr th:nth-child(2) .search-cont input', _this.listeners.searchProducts);
            },
     
            searchProducts: (e) => {

                e.preventDefault();

                _this.getData();
            },

            modalSuccessBtn: (e) => {
                
                console.log('calling modalSuccessBtnFunc');
                _this.listeners.modalSuccessBtnFunc(e);
            },

            modalSuccessBtnFunc: null
        },
        addProduct: (e) => {

            let modal = document.querySelector(".modal");
            let modalCont = new bootstrap.Modal(modal);
            
            modal.querySelector(".modal-title").innerHTML = __('Add Product');
            modal.querySelector(".btn-primary").innerHTML = __('Add');
            modal.querySelector(".btn-secondary").innerHTML = __('Cancel');
            let title = '', sdesc = '', price = '';
            let modalHTml = `\
        <div class="form-cont">\
            <div class="form-group mb-3">\
                <label for="p-title" class="form-label">${ __('Title') }</label>\
                <input type="text" class="form-control" id="p-title" autocomplete="off" placeholder="" value="${ title }">\
            </div>\
            <div class="form-group mb-3">\
                <label for="p-sdesc" class="form-label">${ __('Short description') }</label>\
                <input type="text" class="form-control" id="p-sdesc" autocomplete="off" placeholder="" value="${ sdesc }">\
            </div>\
            <div class="form-group mb-3">\
                <label for="p-price" class="form-label">${ __('Price') }</label>\
                <input type="text" class="form-control" id="p-price" autocomplete="off" placeholder="" value="${ price }">\
            </div>\
        </div>`;

            modal.querySelector(".modal-body").innerHTML = modalHTml;

            _this.listeners.modalSuccessBtnFunc = (e) => {

                e.preventDefault();

                let data = {};
                data.title = modal.querySelector("#p-title").value;
                data.sdesc = modal.querySelector("#p-sdesc").value;
                data.price = modal.querySelector("#p-price").value;
                data.status = "0";
                data.img = [];
                data.cats = [];

                if(data.title.length<2){ alert(__('Please provide longer title')); return; }

                // send data
                fetch('https://api-v1.kenzap.cloud/', {
                    method: 'post',
                    headers: kCloud.headers,
                    body: JSON.stringify({
                        query: {
                            product: {
                                type:       'create',
                                key:        'ecommerce-product',   
                                data:       data
                            }
                        }
                    }) 
                })
                .then(response => response.json())
                .then(response => {

                    if (response.success){

                        // open product editing page
                        window.location.href = `/product-edit/?id=${ response.product.id}`;

                    }else {

                        kCloud.parseApiError(response);
                    }
                })
                .catch(error => { kCloud.parseApiError(error); });
            };

            modalCont.show();

            setTimeout( () => modal.querySelector("#p-title").focus(),100 );

        },
        initPagination: (response) => {

            getPagination(__, response.meta, _this.getData);
        },
        initFooter: () => {
            
            kCloud.initFooter(__('Copyright © %1$ %2$ Kenzap%3$. All rights reserved.', new Date().getFullYear(), '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>'), __('Kenzap Cloud Services - Dashboard'));
        }
    };

    _this.init();

})(kCloud);
