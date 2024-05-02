import { H, __html, showLoader, hideLoader, initHeader, initBreadcrumbs, parseApiError, getCookie, onClick, onKeyUp, toast, link } from '@kenzap/k-cloud';
import { getCurrencies, initFooter, getAPI } from "../_/_helpers.js"
import { HTMLContent } from "../_/_cnt_settings.js"
import { printerSettings } from "../_/_printer_settings.js"
import { Discounts } from "../_/_discount_settings.js"

/**
 * Settings page of the dashboard.
 * Loads HTMLContent from _cnt_settings.js file.
 * Renders settings options in tabbed view.
 * 
 * @version 1.0
 */
class Settings {

    // construct class
    constructor(){
        
        this.state = {
            firstLoad: true,
            response: null,
            limit: 10, // number of records to load per table
        };
    
        // connect to backend
        this.getData();
    }

    /**
     * Get data from the cloud and authenticate the user.
     * Load translation strings, settings and basic user info.
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
                    users: {
                        type:       'users',
                        fields:     ['id', 'name'],
                    },
                    locale: {
                        type:       'locale',
                        source:      ['extension'],
                        key:         'ecommerce',
                    },
                    settings: {
                        type:       'get',
                        key:        'ecommerce-settings',
                        fields:     '*',
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            this.state.settings = response.settings;
            this.state.user = response.user;

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

        this.state.discounts = new Discounts(this);
        
        // get core html content 
        document.querySelector('#contents').innerHTML = HTMLContent(this);
    }

    render = (response) => {

        this.state.response = response;

        if(this.state.firstLoad){

            // initiate breadcrumbs
            initBreadcrumbs(
                [
                    { link: link('https://dashboard.kenzap.cloud'), text: __html('Home') },
                    { link: link('/'), text: __html('E-commerce') },
                    { text: __html('Settings') }
                ]
            );
        }

        // setup currencies
        let coptions = '<option value="">'+__html('Choose currency')+'</option>';
        for (let c of getCurrencies()){

            coptions += `<option value="${ c.code }">${ __html(c.name) } (${ __html(c.code) })</option>`;
        }
        document.querySelector("#currency").innerHTML = coptions;

        // populate fields
        for (let field in response.settings){

            if(typeof(response.settings[field]) === "undefined") continue;
            if(response.settings[field] == "") continue;
            if(document.querySelector("[name='"+field+"']")) switch(document.querySelector("[name='"+field+"']").dataset.type){
        
                case 'text':   
                case 'email':  
                case 'emails':  
                case 'select':
                case 'textarea': document.querySelector("#"+field).value = response.settings[field]; break;
                case 'checkbox': document.querySelector("#"+field).checked = response.settings[field] == "1" ? true : false; break;
                case 'radio': document.querySelector("[name='"+field+"'][value='"+response.settings[field]+"']").checked = true; break;
            }
        }

        // local fields
        for(let field of document.querySelectorAll('.inp-local')){

            switch(document.querySelector("[name='"+field.name+"']").dataset.type){
        
                case 'text':   
                case 'email':  
                case 'emails':  
                case 'select':
                case 'textarea': field.value = localStorage.hasOwnProperty(field.name) ? localStorage.getItem(field.name) : ""; break;
                case 'checkbox': field.checked = localStorage.hasOwnProperty(field.name) ? localStorage.getItem(field.name) == "true" ? true : false : false; break;
            }
        }

        // printer settings
        printerSettings.init(this);

        // init discounts
        this.state.discounts.init(this);

        // webhooks
        if(response.settings.webhooks) response.settings.webhooks.forEach((hook, i) => {

            document.querySelector('[name="webhook1_trigger"]').value = hook['trigger'];
            document.querySelector('[name="webhook1_url"]').value = hook['url'];
        });
    }

    initListeners = () => {

        // break here if initListeners is called more than once
        if(!this.state.firstLoad) return;

        // add product modal
        onClick('.btn-save', this.saveSettings);
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
                            key:        'product',   
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

    saveSettings = (e) => {

        e.preventDefault();

        let data = {};

        // iterate through all fields
        for(let s of document.querySelectorAll('.inp')){

            switch(s.dataset.type){
          
                case 'text':   
                case 'email':  
                case 'emails':  
                case 'select':
                case 'textarea': data[s.id] = s.value; break;
                case 'checkbox': data[s.id] = s.checked ? s.value : ""; break;
                case 'radio': data[s.name] = s.parentElement.parentElement.parentElement.parentElement.querySelector('input:checked').value; break;
            }
        }

        // iterate through local stored fields
        for(let field of document.querySelectorAll('.inp-local')){

            switch(document.querySelector("[name='"+field.name+"']").dataset.type){
        
                case 'text':
                case 'email':
                case 'emails':
                case 'select':
                case 'textarea': localStorage.setItem(field.name, field.value); break;
                case 'checkbox': localStorage.setItem(field.name, field.checked); break;
                // case 'radio': document.querySelector("[name='"+field+"'][value='"+response.settings[field]+"']").checked = true; break;
            }
        }

        // do not save last_order_id if it was unchanged. Avoids conflicts.
        if(this.state.response.settings.last_order_id == data.last_order_id){

            delete data.last_order_id;
        }

        // normalize price array
        if(data['printers']) data['printers'] = JSON.parse(data['printers']);

        // get templates
        data = printerSettings.save(this, data);

        // get coupons
        data = this.state.discounts.save(data);

        // webhooks
        data.webhooks = [];
        for(let row of document.querySelectorAll('.webhook-list')){
            
            let obj = {};
            obj.trigger = row.querySelector('.webhook_trigger').value;
            obj.url = row.querySelector('.webhook_url').value;

            data.webhooks.push(obj);
        }
        
        console.log(data);

        // send data
        fetch(getAPI(), {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    settings: {
                        type:       'set',
                        key:        'ecommerce-settings',       
                        data:       data
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            if (response.success){

                toast('Changes applied');
            }else{

                parseApiError(response);
            }
            
        })
        .catch(error => { parseApiError(error); });
    }

    initFooter = () => {
        
        initFooter(__html('Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>'), '');
    }
}

new Settings();