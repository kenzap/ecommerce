import { H, __attr, __html, showLoader, hideLoader, initHeader, initBreadcrumbs, parseApiError, getCookie, onClick, onKeyUp, getSiteId, link } from '@kenzap/k-cloud';
import { getPageNumber, getPagination, formatStatus, priceFormat, formatTime, onlyNumbers, initFooter, getAPI } from "../_/_helpers.js"
import { productListContent } from "../_/_cnt_product_list.js"

/**
 * Main product listing page of the dashboard.
 * Loads HTMLContent from _cnt_product_list.js file.
 * Renders product list in a dynamic table.
 * 
 * @version 1.0
 */
class ProductList {

    // construct class
    constructor(){
        
        this.state = {
            firstLoad: true,
            settings: {},
            limit: 10, // number of records to load per table
        };
    
        // connect to backend
        this.getData();
    }

    /**
     * Get data from the cloud and authenticate the user.
     * Load translation strings.
     * Get any additional data by extending the query object.
     * 
     * @version 1.0
     * @link https://developer.kenzap.cloud/
     */
    getData = () => {

        // show loader during first load
        if (this.state.firstLoad) showLoader();

        // search content
        let s = document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';

        // do API query
        fetch(getAPI(), {
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
                        source:      ['extension'],
                        key:         'ecommerce',
                    },
                    settings: {
                        type:       'get',
                        key:        'ecommerce-settings',
                        fields:     ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_auto_rate', 'tax_rate', 'tax_display', 'fee_calc', 'fee_percent', 'fee_display'],
                    },
                    products: {
                        type:       'find',
                        key:        'ecommerce-product',
                        fields:     ['_id', 'id', 'img', 'status', 'price', 'title', 'updated', 'created'],
                        limit:      this.state.limit,
                        offset:     s.length > 0 ? 0 : getPageNumber() * this.state.limit - this.state.limit,    // automatically calculate the offset of table pagination
                        search:     {                                                           // if s is empty search query is ignored
                                        field: 'title',
                                        s: s
                                    },
                        sortby:     {
                                        field: 'created',
                                        order: 'DESC'
                                    }
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
                this.html();  

                // render table
                this.render(response);

                // bind content listeners
                this.initListeners();
            
                // init pagination
                this.initPagination(response);

                // initiate footer
                initFooter(this);

                // first load
                this.state.firstLoad = false;

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    }

    authUser = (response) => {

        if(response.user){
            
            if(response.user.success == true){

                
            }
        }
    }

    html = () => {
  
        if(!this.state.firstLoad) return;

        // get core html content 
        document.querySelector('#contents').innerHTML = productListContent();
    }

    render = (response) => {

        if(this.state.firstLoad){

            // initiate breadcrumbs
            initBreadcrumbs(
                [
                    { link: link('https://dashboard.kenzap.cloud'), text: __html('Home') },
                    { link: link('/'), text: __html('E-commerce') },
                    { text: __html('Product list') }
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
                            <input type="text" placeholder="${ __html('Search products') }" class="form-control border-top-0 border-start-0 border-end-0 rounded-0" aria-label="${ __html('Search products') }" aria-describedby="inputGroup-sizing-sm" style="max-width: 200px;">
                        </div>
                        <span>${ __html("Title") }</span>
                    </th>
                    <th>${ __html("Status") }</th>
                    <th>${ __html("Price") }</th>
                    <th>${ __html("Last change") }</th>
                    <th></th>
                </tr>`;

        }

        // no products in the list
        if (response.products.length == 0) {

            document.querySelector(".table tbody").innerHTML = `<tr><td colspan="6">${ __html("No products to display.") }</td></tr>`;
            return;
        }

        let sid = getSiteId();

        this.state.settings = response.settings;

        // generate website table
        let list = '';
        for (let i in response.products) {

            // console.log(response.products[i].created);
            let img = 'https://cdn.kenzap.com/loading.png';

            if(typeof(response.products[i].img) === 'undefined') response.products[i].img = [];
            if(response.products[i].img[0]) parseInt(response.products[i].created) < 1677000000 ? img = CDN + '/S'+sid+'/product-'+response.products[i]._id+'-1-100x100.jpeg?'+response.products[i].updated : img = CDN + '/S'+sid+'/product-'+response.products[i]._id+'-1-100x100.webp?'+response.products[i].updated;
              
            list += `
                <tr>
                    <td>
                        <div class="timgc">
                            <a href="${ link('/product-edit/?id='+response.products[i]._id) }"><img src="${ img }" data-srcset="${ img }" class="img-fluid rounded" alt="${ __attr("Product placeholder") }" srcset="${ img }" ></a>
                        </div>
                    </td>
                    <td class="destt" style="max-width:250px;min-width:250px;">
                        <div class="my-1"> 
                            <a class="text-body" href="${ link('/product-edit/?id='+response.products[i]._id) }" >${ response.products[i].title }<i style="color:#9b9b9b;font-size:15px;margin-left:8px;" title="${ __attr("Edit product") }" class="mdi mdi-pencil menu-icon edit-page"></i></a>
                        </div>
                    </td>
                    <td>
                        <span>${ formatStatus(__, response.products[i].status) }</span>
                    </td>
                    <td>
                        <span>${ priceFormat(this, response.products[i].price) }</span>
                    </td>
                    <td>
                        <span>${ formatTime(__, response.products[i].updated) }</span>
                    </td>
                    <td class="text-end"> 
                        <a href="#" data-id="${ response.products[i]._id }" class="remove-product text-danger me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </a>
                        <i title="${ __attr("Remove this product") }" data-key="${ response.products[i].id }" class="mdi mdi-trash-can-outline list-icon remove-product"></i>
                    </td>
                </tr>`; 
        }

        // provide result to the page
        document.querySelector(".table tbody").innerHTML = list;
    }

    initListeners = () => {

        // remove product
        onClick('.remove-product', this.listeners.removeProduct);

        // search products activation
        onClick('.table-p-list .bi-search', this.listeners.searchProductsActivate);

        // break here if initListeners is called more than once
        if(!this.state.firstLoad) return;

        // add product modal
        onClick('.btn-add', this.addProduct);

        // add product confirm
        onClick('.btn-modal', this.listeners.modalSuccessBtn);
    }

    listeners = {

        removeProduct: (e) => {

            e.preventDefault();

            let c = confirm( __html('Completely remove this product?') );

            if(!c) return;
  
            // send data
            fetch(getAPI(), {
                method: 'post',
                headers: H(),
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

                    this.getData();

                }else{

                    parseApiError(response);
                }
                
            })
            .catch(error => { parseApiError(error); });
        },
 
        searchProductsActivate: (e) => {

            e.preventDefault();

            document.querySelector('.table-p-list thead tr th:nth-child(2) span').style.display = 'none';
            document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'flex';
            document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont input').focus();

            // search products
            onKeyUp('.table-p-list thead tr th:nth-child(2) .search-cont input', this.listeners.searchProducts);
        },
 
        searchProducts: (e) => {

            e.preventDefault();

            this.getData();
        },

        modalSuccessBtn: (e) => {
            
            this.listeners.modalSuccessBtnFunc(e);
        },

        modalSuccessBtnFunc: null
    }

    addProduct = (e) => {

        let modal = document.querySelector(".modal");
        let modalCont = new bootstrap.Modal(modal);
        
        modal.querySelector(".modal-title").innerHTML = __html('Add Product');
        modal.querySelector(".btn-primary").innerHTML = __html('Add');
        modal.querySelector(".btn-secondary").innerHTML = __html('Cancel');
        let d = ""; 
        let title = '', sdesc = '', price = '';
        let modalHTml = `
        <div class="form-cont">
            <div class="form-group mb-3">
                <label for="p-title" class="form-label">${ __html('Title') }</label>
                <input type="text" class="form-control" id="p-title" autocomplete="off" placeholder="" value="${ title }">
            </div>
            <div class="form-group mb-3">
                <label for="p-sdesc" class="form-label">${ __html('Short description') }</label>
                <input type="text" class="form-control" id="p-sdesc" autocomplete="off" placeholder="" value="${ sdesc }">
            </div>
            <div class="form-group mb-3">
                <label for="p-price" class="form-label">${ __html('Price') }</label>
                <input type="text" class="form-control" id="p-price" autocomplete="off" placeholder="" value="${ price }">
            </div>
        </div>`;

        modal.querySelector(".modal-body").innerHTML = modalHTml;

        onlyNumbers('#p-price', [8, 46, 190]);

        this.listeners.modalSuccessBtnFunc = (e) => {

            e.preventDefault();

            let data = {};
            data.title = modal.querySelector("#p-title").value.trim();
            data.sdesc = modal.querySelector("#p-sdesc").value.trim();
            data.price = modal.querySelector("#p-price").value.trim();
            data.status = "0";
            data.img = [];
            data.cats = [];

            if(data.title.length<2){ alert( __html('Please provide longer title') ); return; }

            // send data
            fetch(getAPI(), {
                method: 'post',
                headers: H(),
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
                    window.location.href = link(`/product-edit/?id=${ response.product.id}`)

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); });
        }

        modalCont.show();

        setTimeout( () => modal.querySelector("#p-title").focus(),100 );
    }

    initPagination = (response) => {

        getPagination(__, response.meta, this.getData);
    }

    initFooter = () => {
        
        initFooter( __html('Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>'), '' );
    }

}

new ProductList();