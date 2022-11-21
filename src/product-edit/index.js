// js dependencies
import { H, __html, __attr, showLoader, hideLoader, initHeader, initBreadcrumbs, parseApiError, getCookie, onClick, onChange, simulateClick, spaceID, loadScript, toast, link } from '@kenzap/k-cloud';
import { getProductId, makeNumber, numsOnly, priceFormat, onlyNumbers, loadAddon, initFooter } from "../_/_helpers.js"
import { simpleTags } from "../_/_ui.js"
import { HTMLContent } from "../_/_cnt_product_edit.js"
import { inventoryTable } from "../_/_mod_product_edit_inventory_edit.js"

// where everything happens
const _this = {

    init: () => {
        
        _this.getData(); 
    },
    state: {
        ajaxQueue: 0,
        settings: {}, // where all requested settings are cached
    },
    getData: () => {

        // block ui during load
        showLoader();

        let id = getProductId();
        let sid = spaceID();

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
                    product: {
                        type:       'find',
                        key:        'ecommerce-product',
                        id:         id,   
                        fields:     ['_id', 'id', 'img', 'status', 'price', 'discounts', 'variations', 'title', 'sdesc', 'ldesc', 'stock', 'cats', 'updated']
                    },
                    settings: {
                        type:       'get',
                        key:        'ecommerce-settings',
                        fields:     ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_auto_rate', 'tax_rate', 'tax_display', 'scripts_product_edit', 'addons'],
                    },
                    locale: {
                        type:       'locale',
                        source:      ['extension'],
                        key:         'ecommerce',
                    }
                }
            }) 
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if (!response.success){ parseApiError(response); return; }

            if (response.success){

                _this.state.response = response;
                _this.state.settings = response.settings;

                // init header
                initHeader(response);
  
                // get core html content 
                document.querySelector('#contents').innerHTML = HTMLContent(__);

                // check product response
                if (response.product.length == 0) {
             
                    // $(".list").html(/*html*/`<tr><td colspan="3">No products to display. Please create one by clicking on the button above.</td></tr>`);
                    // $( "#loader" ).fadeOut( "fast" );
                    _this.initListeners('all');
                    return;
                }

                // let st = parseInt(data.list[i].status);
                let img = 'https://cdn.kenzap.com/loading.png';

                // if(typeof(response.product[i].img) !== 'undefined' && response.product[i].img[0] == 'true') img = 'https://preview.kenzap.cloud/S1000452/_site/images/product-'+response.product[i].id+'-1-100x100.jpeg?1630925420';
                
                // bind frontend data
                _this.renderPage(response.product);

                // load images if any
                _this.loadImages(response.product);

                // init page listeners
                _this.initListeners('all');

                // footer note
                initFooter(_this);

                // load addons
                if(response.settings.addons) if(response.settings.addons.product_edit) response.settings.addons.product_edit.forEach(obj => { loadAddon(obj.src, obj.version); })

            }
        })
        .catch(error => { parseApiError(error); });
    },
    renderPage: (product) => {

        let d = document;

        // initiate breadcrumbs
        initBreadcrumbs(
            [
                { link: link('https://dashboard.kenzap.cloud'), text: __html('Home') },
                { link: link('/'), text: __html('E-commerce') },
                { link: link('/product-list/'), text: __html('Product List') },
                { text: __html('Product Edit') }
            ]
        );

        // general section
        d.querySelector("#p-title").value = product.title;
        d.querySelector("#p-sdesc").value = product.sdesc;
        d.querySelector("#p-ldesc").value = product.ldesc;

        // price section
        d.querySelector("#p-price").value = product.price; onlyNumbers('#p-price', [8, 46, 190]);
        // d.querySelector("#p-priced").value = product.priced;
        d.querySelector("#p-price-symb").innerHTML = _this.state.settings['currency_symb'] ? _this.state.settings['currency_symb'] : "";

        // discounts 
        document.querySelector(".discount-blocks").dataset.data = encodeURIComponent(JSON.stringify(product.discounts ? product.discounts : []));
        _this.renderDiscounts();

        // price variation section
        // console.log(product.variations);
        for(let m in product.variations){ 

            let vr = product.variations[m];
            let data = []; data['title'] = vr['title']; data['type'] = vr['type']; data['required'] = vr['required']; data['index'] = m;
  
            d.querySelector(".variation-blocks").innerHTML += _this.structMixBlock(data);

            for(let n in vr['data']){
  
              let vrd = vr['data'][n];
              let data = []; 
              data['title'] = vrd['title'];
              data['price'] = vrd['price'];
              data['type'] = vr['type'];
  
              // console.log(data['title']);
              d.querySelector(".var-block[data-index='"+m+"'] .offer-pricef").innerHTML += _this.structMixRow(data);
            }
        }

        // inventory
        if(!product['stock']) product['stock'] = { management: false, sku: "", qty: 0, low_threshold: 0, inventory: [] };

        for(let el of document.querySelectorAll('.stock-cont')){ product['stock']['management'] == true ? el.classList.remove('d-none') : el.classList.add('d-none'); }
        document.querySelector('#stock_sku').value = product['stock']['sku'] ? product['stock']['sku'] : "";
        document.querySelector('#stock_management').checked = product['stock']['management']; //  == "1" ? true: false;
        document.querySelector('#stock_quantity').value = product['stock']['qty'] ? makeNumber(product['stock']['qty']) : 0;
        document.querySelector('#stock_low_threshold').value = product['stock']['low_threshold'] ? makeNumber(product['stock']['low_threshold']) : 0;

        // init status box
        document.querySelector('#p-status'+product.status).checked = true;

        // init categories
        let pcats = document.querySelector('#p-cats');
        if (product.cats) pcats.setAttribute('data-simple-tags', product.cats);
        const tags = new simpleTags(__, pcats);
        
        // render inventory table fot stock
        inventoryTable(_this);
    },
    initListeners: (type = 'partial') => {

        // console.log('initListeners ');

        // listeners that can be initiated only once
        if(type == 'all'){

            // product save button
            onClick('.btn-save', _this.listeners.saveProduct);
            
            // modal success button
            onClick('.p-modal .btn-primary', _this.listeners.modalSuccessBtn);
        }

        // add discount
        onClick('.add-discount', _this.listeners.addDiscountBlock);

        // add variation block
        onClick('.add-mix-block', _this.listeners.addMixBlock);
        
        // edit variation block
        onClick('.edit-block', _this.listeners.editBlock);

        // remove variation block
        onClick('.remove-block', _this.listeners.removeBlock);

        // add variation option
        onClick('.add-mix', _this.listeners.addMixOption);

        // remove variation option
        onClick('.remove-option', _this.listeners.removeOption);

        // stock management enable disable
        onClick('.stock-management', _this.listeners.stockManagement);
    },
    listeners: {

        editBlock: (e) => {

            e.preventDefault();

            let amb = document.querySelector('.add-mix-block');
            amb.dataset.action = 'edit';
            amb.dataset.index = e.currentTarget.dataset.index;
            setTimeout(() => simulateClick(amb), 10);

            console.log('editBlock');
        },

        removeBlock: (e) => {

            e.preventDefault();

            let c = confirm(__html('Remove entire block?'));
            if(c){ 
                e.currentTarget.parentNode.parentNode.remove();
                // e.currentTarget.parentElement.parentElement.remove();
             }

            console.log('removeBlock');
        },

        addMixBlock: (e) => {

            e.preventDefault();

            let action = e.currentTarget.dataset.action; // $(this).attr('data-action');
            let index = e.currentTarget.dataset.index; // $(this).attr('data-index');
            e.currentTarget.dataset.action = 'add'; // $(this).attr('data-action', 'add');

            console.log('index: ' + index);

            // init defaults
            let modal_title = __html('Add Variation Block');
            let title = "";
            let type = "";
            let required = 0;
            let modal_btn = __html('Add'), modal_cancel_btn = __html('Cancel');

            // override defaults in editing mode
            if(action == 'edit'){

                modal_title = __html('Edit Variation Block');

                title = document.querySelector(".var-block[data-index='"+index+"']").dataset.title;
                type  = document.querySelector(".var-block[data-index='"+index+"']").dataset.type;
                required = parseInt(document.querySelector(".var-block[data-index='"+index+"']").dataset.required);

                modal_btn = __html('Save');
                // console.log(variations);
            }

            let pmodal = document.querySelector(".p-modal");
            let pmodalCont = new bootstrap.Modal(pmodal);
            
            pmodal.querySelector(".modal-title").innerHTML = modal_title;
            pmodal.querySelector(".btn-primary").innerHTML = modal_btn;
            pmodal.querySelector(".btn-secondary").innerHTML = modal_cancel_btn;

            pmodalCont.show();

            let modalHTml = `
            <div class="form-cont">
                <div class="form-group mb-3">
                    <label for="mtitle" class="form-label">${ __html('Save') }</label>
                    <input type="text" class="form-control" id="mtitle" autocomplete="off" placeholder="Rice type" value="${ title }">
                </div>
                <div class="form-group mb-3">
                    <label for="mtype" class="form-label">${ __html('Input type') }</label>
                    <select id="mtype" class="form-control " >
                        <option ${ type=='radio'?'selected="selected"':'' } value="radio">${ __html('Radio buttons') }</option>
                        <option ${ type=='checkbox'?'selected="selected"':'' } value="checkbox">${ __html('Checkboxes') }</option>
                    </select>
                    <p class="form-text">${ __html('Define how this renders on frontend.') }</p>
                </div>
                <div class="form-group mb-3">
                    <div class="form-check">
                        <label for="id="mtype"" class="form-check-label form-label">
                            <input id="mrequired" type="checkbox" class="form-check-input" ${ required==1?'checked="checked"':'' } value="1">
                            ${ __html('Required') }
                        </label>
                    </div>
                    <p class="form-text">${ __html('Make this variation mandatory for users.') }</p>
                </div>
                <div class="form-group mb-3 dn">
                    <label for="mtype" class="form-label">${ __html('Minimum required') }</label>
                    <select id="mtype" class="form-control" >
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
            </div>`;

            pmodal.querySelector(".modal-body").innerHTML = modalHTml;

            setTimeout( () => pmodal.querySelector("#mtitle").focus(),100 );

            _this.listeners.modalSuccessBtnFunc = (e) => {

                e.preventDefault();

                let mtitle = pmodal.querySelector(".p-modal #mtitle").value;
                let mtype = pmodal.querySelector(".p-modal #mtype").value;
                let mrequired = pmodal.querySelector(".p-modal #mrequired:checked");
                mrequired = mrequired == null ? 0 : mrequired.value == "1" ? 1 : 0;
            
                if(mtitle.length<2){ alert(__html('Please provide longer title')); return; }

                // add mix and match
                let data = []; data['title'] = mtitle; data['type'] = mtype; data['required'] = mrequired; data['index'] = document.querySelectorAll(".var-block").length;
                if(action == 'edit'){

                    document.querySelector(".var-block[data-index='"+index+"']").dataset.title = mtitle;
                    document.querySelector(".var-block[data-index='"+index+"']").dataset.type = mtype;
                    document.querySelector(".var-block[data-index='"+index+"']").dataset.required = mrequired;
                    document.querySelector(".var-block[data-index='"+index+"'] .title").innerHTML = mtitle;
                }

                if(action == 'add'){

                    if(document.querySelector(".variation-blocks .var-block") == null){
                        document.querySelector(".variation-blocks").innerHTML = _this.structMixBlock(data);
                    }else{
                        document.querySelector(".variation-blocks .var-block:last-of-type").insertAdjacentHTML('afterend', _this.structMixBlock(data));
                    }
                }

                pmodalCont.hide();

                setTimeout(() => _this.initListeners('partial'), 10);
            }

           //  console.log('addMixBlock');
        },

        addMixOption: (e) => {

            let block_el = e.currentTarget;
            e.preventDefault();

            let pmodal = document.querySelector(".p-modal");
            let pmodalCont = new bootstrap.Modal(pmodal);
            
            pmodalCont.show();

            pmodal.querySelector(".modal-title").innerHTML = __html('Add Variation');
            pmodal.querySelector(".btn-primary").innerHTML = __html('Add');
            pmodal.querySelector(".btn-secondary").innerHTML = __html('Cancel');

            let modalHTML = `
            <div class="form-cont">
                <div class="form-group">
                    <label for="mtitle" class="form-label">${ __html('Title') }</label>
                    <input type="text" class="form-control" id="mtitle" autocomplete="off" placeholder="${ __html('Brown rice') }">
                </div>
                <div class="form-group mt-3">
                    <label for="mprice" class="form-label">${ __html('Price') }</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input id="mprice" type="text" class="form-control" placeholder="0.00" value="" >
                        <p class="form-text">${ __html('You can change default currency under Dashboard &gt; Settings.') }</p>
                    </div>
                </div>
            </div>`;

            pmodal.querySelector(".modal-body").innerHTML = modalHTML;

            setTimeout( () => pmodal.querySelector("#mtitle").focus(),100 );

            _this.listeners.modalSuccessBtnFunc = (e) => {

                e.preventDefault();

                // validate
                let mtitle = pmodal.querySelector(".p-modal #mtitle").value;
                let mprice = pmodal.querySelector(".p-modal #mprice").value;
                if(mtitle.length<2){ alert("Please provide longer title"); return; }

                let data = []; data['title'] = mtitle; data['price'] = mprice; data['type'] = block_el.parentElement.parentElement.dataset.type;
                let sel = ".var-block[data-index='"+block_el.parentElement.parentElement.dataset.index+"']";
                console.log(sel);
                
                if(document.querySelector(sel + " .offer-pricef li") == null){
                    document.querySelector(sel + " .offer-pricef").innerHTML = _this.structMixRow(data);
                }else{
                    document.querySelector(sel + " .offer-pricef li:last-of-type").insertAdjacentHTML('afterend', _this.structMixRow(data));
                }

                pmodalCont.hide();

                setTimeout(() => _this.initListeners('partial'), 10);
            };
        },

        removeOption: (e) => {

            e.preventDefault();
            
            if( confirm('Remove option?') ) e.currentTarget.parentElement.remove();
        },

        removeDiscount: (e) => {

            e.preventDefault();
            
            if( confirm('Remove discount?') ){
                 
                e.currentTarget.parentElement.remove();

                let discounts = JSON.parse(decodeURIComponent(document.querySelector('.discount-blocks').dataset.data));

                discounts.splice(e.currentTarget.dataset.index, 1);

                document.querySelector(".discount-blocks").dataset.data = encodeURIComponent(JSON.stringify(discounts));
            }
        },

        addDiscountBlock: (e) => {

            e.preventDefault();

            let action = e.currentTarget.dataset.action; // $(this).attr('data-action');
            let index = e.currentTarget.dataset.index; // $(this).attr('data-index');
            e.currentTarget.dataset.action = 'add'; // $(this).attr('data-action', 'add');

            // init defaults
            let modal_title = __html('Add discount');
            let title = "";
            let type = "";
            let availability = "";
            let required = 0;
            let modal_btn = __html('Add'), modal_cancel_btn = __html('Cancel');

            // override defaults in editing mode
            if(action == 'edit'){

                modal_title = __html('Edit Variation Block');

                title = document.querySelector(".var-block[data-index='"+index+"']").dataset.title;
                type  = document.querySelector(".var-block[data-index='"+index+"']").dataset.type;
                required = parseInt(document.querySelector(".var-block[data-index='"+index+"']").dataset.required);

                modal_btn = __html('Save');
                // console.log(variations);
            }

            let pmodal = document.querySelector(".p-modal");
            let pmodalCont = new bootstrap.Modal(pmodal);
            
            pmodal.querySelector(".modal-title").innerHTML = modal_title;
            pmodal.querySelector(".btn-primary").innerHTML = modal_btn;
            pmodal.querySelector(".btn-secondary").innerHTML = modal_cancel_btn;

            pmodalCont.show();

            let modalHTml = `
            <div class="form-cont">
                <div class="form-group mb-3">
                    <div class="row">
                        <div class="col-lg-6">
                            <label for="discount-type" class="form-label">${ __html('Type') }</label>
                            <select id="discount-type" class="form-control" >
                                <option ${ type=='percent'?'selected="selected"':'' } value="percent">${ __html('By percent') }</option>
                                <option ${ type=='value'?'selected="selected"':'' } value="value">${ __html('By value') }</option>
                                <option ${ type=='never'?'selected="selected"':'' } value="never">${ __html('never discount') }</option>
                            </select>
                        </div>
                        <div id="discount-percent-cont" class="col-lg-6">
                            <label for="discount-percent" class="form-label">${ __html('Percent %') }</label>
                            <input type="text" class="form-control" id="discount-percent" autocomplete="off" placeholder="${ __html('5') }">
                        </div>
                        <div id="discount-value-cont" class="col-lg-6 d-none">
                            <label for="discount-value" class="form-label">${ __html('Value') }</label>
                            <input type="text" class="form-control" id="discount-value" autocomplete="off" placeholder="${ __html('12.00') }">
                        </div>
                    </div>
                    <p class="form-text discount-hint-cont">${ __html('Define how big is the discount (numeric value only).') }</p>
                    <p class="form-text discount-never-cont d-none">${ __html('Never apply general discount for this product') }</p>
                </div>
                <div class="discount-availability-cont form-group mb-3">
                    <label for="discount-availability" class="form-label">${ __html('Availability') }</label>
                    <select id="discount-availability" class="form-control " >
                        <option ${ availability=='admin'?'selected="selected"':'' } value="admin">${ __html('Admin') }</option>
                        <option ${ availability=='always'?'selected="selected"':'' } value="always">${ __html('Always') }</option>
                        <option ${ availability=='hourly'?'selected="selected"':'' } value="hourly">${ __html('Hourly') }</option>
                        <option ${ availability=='weekly'?'selected="selected"':'' } value="weekly">${ __html('Weekly') }</option>
                        <option class="d-none" ${ availability=='monthly'?'selected="selected"':'' } value="monthly">${ __html('Monthly') }</option>
                    </select>
                    <p class="form-text">${ __html('Restrict discount availability.') }</p>
                </div>
                <div id="discount-weekly" class="discount-weekly-cont form-group mb-3 d-none">
                    <label for="mtype" class="form-label">${ __html('Days of week') }</label>
                    <div class="form-check">
                        <label for="week-monday" class="form-check-label form-label">
                            <input id="week-monday" type="checkbox" class="form-check-input " ${ required==1?'checked="checked"':'' } value="1">
                            ${ __html('Monday') }
                        </label>
                    </div>
                    <div class="form-check">
                        <label for="week-tuesday" class="form-check-label form-label">
                            <input id="week-tuesday" type="checkbox" class="form-check-input" ${ required==1?'checked="checked"':'' } value="1">
                            ${ __html('Tuesday') }
                        </label>
                    </div>
                    <div class="form-check">
                        <label id="week-wednesday" class="form-check-label form-label">
                            <input id="week-wednesday" type="checkbox" class="form-check-input" ${ required==1?'checked="checked"':'' } value="1">
                            ${ __html('Wednesday') }
                        </label>
                    </div>
                    <div class="form-check">
                        <label id="week-thursday" class="form-check-label form-label">
                            <input id="week-thursday" type="checkbox" class="form-check-input" ${ required==1?'checked="checked"':'' } value="1">
                            ${ __html('Thursday') }
                        </label>
                    </div>
                    <div class="form-check">
                        <label id="week-friday" class="form-check-label form-label">
                            <input id="week-friday" type="checkbox" class="form-check-input" ${ required==1?'checked="checked"':'' } value="1">
                            ${ __html('Friday') }
                        </label>
                    </div>
                    <div class="form-check">
                        <label id="week-saturday" class="form-check-label form-label">
                            <input id="week-saturday" type="checkbox" class="form-check-input" ${ required==1?'checked="checked"':'' } value="1">
                            ${ __html('Saturday') }
                        </label>
                    </div>
                    <div class="form-check">
                        <label id="week-sunday" class="form-check-label form-label">
                            <input id="week-sunday" type="checkbox" class="form-check-input" ${ required==1?'checked="checked"':'' } value="1">
                            ${ __html('Sunday') }
                        </label>
                    </div>
                    <p class="form-text">${ __html('Days of the week when discount is available.') }</p>
                </div>
                <div id="discount-hourly" class="form-group discount-hourly-cont mb-3 d-none">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group mb-3 mt-1">
                                <label for="discount-hour-from" class="form-label">${ __html('From') }</label>
                                <input id="discount-hour-from" type="text" class="form-control" maxlength="5" autocomplete="off" placeholder="${ __html('12:00') }">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3 mt-1">
                                <label for="discount-hour-to" class="form-label">${ __html('To') }</label>
                                <input id="discount-hour-to" type="text" class="form-control" maxlength="5" autocomplete="off" placeholder="${ __html('17:00') }">
                            </div>
                        </div>
                    </div>
                    <p class="form-text">${ __html('Time range when discount is available.') }</p>
                </div>
                <div class="form-group discount-note-cont mb-3">
                    <div class="form-group mb-3 mt-1">
                        <label for="discount-note" class="form-label">${ __html('Note') }</label>
                        <input id="discount-note" type="text" class="form-control" maxlength="25" autocomplete="off" placeholder="${ __html('') }">
                        <p class="form-text">${ __html('Example: •happy hour promo.') }</p>
                    </div>
                </div> 
            </div>`;

            pmodal.querySelector(".modal-body").innerHTML = modalHTml;

            setTimeout( () => pmodal.querySelector("#discount-type").focus(), 100 );

            // discount modal listeners
            onChange('#discount-availability', (e) => {
                
                // discount-availability
                console.log(e.currentTarget.value);

                switch(e.currentTarget.value){

                    case 'admin':
                        document.querySelector('#discount-weekly').classList.add('d-none');
                        document.querySelector('#discount-hourly').classList.add('d-none');
                    break;
                    case 'always':
                        document.querySelector('#discount-weekly').classList.add('d-none');
                        document.querySelector('#discount-hourly').classList.add('d-none');
                    break;
                    case 'hourly':
                        document.querySelector('#discount-weekly').classList.add('d-none');
                        document.querySelector('#discount-hourly').classList.remove('d-none');
                    break;
                    case 'weekly':
                        document.querySelector('#discount-weekly').classList.remove('d-none');
                        document.querySelector('#discount-hourly').classList.remove('d-none');
                    break;
                };
            });

            // percent number only
            onlyNumbers('#discount-percent', [8]);

            // value number only
            onlyNumbers('#discount-value', [8, 46]);

            // time from number only
            onlyNumbers('#discount-hour-from', [8, 58]);
            
            // time to number only
            onlyNumbers('#discount-hour-to', [8, 58]);

            // discount type
            onChange('#discount-type', (e) => {
                
                // discount-availability
                console.log(e.currentTarget.value);

                document.querySelector('.discount-never-cont').classList.add('d-none');
                document.querySelector('.discount-hint-cont').classList.remove('d-none');
                document.querySelector('.discount-availability-cont').classList.remove('d-none');
                document.querySelector('.discount-hint-cont').classList.remove('d-none');

                switch(e.currentTarget.value){

                    case 'percent':
                        document.querySelector('#discount-percent-cont').classList.remove('d-none');
                        document.querySelector('#discount-value-cont').classList.add('d-none');
                    break;
                    case 'value':
                        document.querySelector('#discount-percent-cont').classList.add('d-none');
                        document.querySelector('#discount-value-cont').classList.remove('d-none');
                    break;
                    case 'never':
                        document.querySelector('#discount-percent-cont').classList.add('d-none');
                        document.querySelector('#discount-value-cont').classList.add('d-none');
                        document.querySelector('.discount-never-cont').classList.remove('d-none');
                        document.querySelector('.discount-availability-cont').classList.add('d-none');
                        document.querySelector('.discount-hint-cont').classList.add('d-none');
                    break;
                };
            });

            _this.listeners.modalSuccessBtnFunc = (e) => {

                e.preventDefault();

                let obj = {}, allow = true;

                document.querySelector(".form-cont").classList.add("was-validated"); 
                document.querySelector("#discount-percent").setCustomValidity("");
                document.querySelector("#discount-hour-from").setCustomValidity("");
                document.querySelector("#discount-hour-to").setCustomValidity("");

                // get discount list
                let discounts = document.querySelector(".discount-blocks").dataset.data;
                if(!discounts){ 

                    discounts = [];
                }else{

                    discounts = JSON.parse(decodeURIComponent(discounts))
                }

                // discount note
                obj.note = document.querySelector("#discount-note").value;

                // discount type
                obj.type = document.querySelector("#discount-type").value;

                if(obj.type == 'percent'){

                    // get value
                    obj.percent = document.querySelector("#discount-percent").value;
                    
                    // validate
                    if(obj.percent==""){

                        document.querySelector("#discount-percent").setCustomValidity("Percent field can not be empty.");
                        allow = false;
                        // alert('Percent field can not be empty.'); 
                        // return false; 
                    }

                }else if(obj.type == 'value'){

                    // get value
                    obj.value = document.querySelector("#discount-value").value;

                    // validate
                    if(obj.value==""){

                        document.querySelector("#discount-value").setCustomValidity("Value field can not be empty.");
                        allow = false;
                        // alert('Value field can not be empty.'); 
                        // return false; 
                    }
                }else if(obj.type == 'value'){

                    // get value
                    obj.value = "-";
                }

                // discount availability
                obj.availability = document.querySelector("#discount-availability").value;

                if(obj.availability == 'always') {

                }else if(obj.availability == 'admin') {

                }else if(obj.availability == 'hourly') {
                    
                    // iterate available hours
                    obj.hours = { from: document.querySelector("#discount-hour-from").value, to: document.querySelector("#discount-hour-to").value };

                    // validate
                    if(obj.hours.from.length<2) {

                        document.querySelector("#discount-hour-from").setCustomValidity("Wrong time format");
                        allow = false;
                    }

                    // validate
                    if(obj.hours.to.length<2) {

                        document.querySelector("#discount-hour-to").setCustomValidity("Wrong time format");
                        allow = false;
                    }
                   
                }else if(obj.availability == 'weekly') {

                    // iterate available hours
                    obj.hours = { from: document.querySelector("#discount-hour-from").value, to: document.querySelector("#discount-hour-to").value };
                    
                    // validate
                    if(obj.hours.from.length<2) {

                        document.querySelector("#discount-hour-from").setCustomValidity("Wrong time format");
                        allow = false;
                    }

                    // validate
                    if(obj.hours.to.length<2) {

                        document.querySelector("#discount-hour-to").setCustomValidity("Wrong time format");
                        allow = false;
                    }

                    // iterate available weeks
                    obj.dow = [];
                    for(let el of document.querySelectorAll('#discount-weekly input')) {
                        obj.dow.push(el.checked)
                    }
                }

                if(!allow){ alert('Please enter all fields correctly.'); return; }
                
                discounts.push(obj);

                document.querySelector(".discount-blocks").dataset.data = encodeURIComponent(JSON.stringify(discounts));

                _this.renderDiscounts();

                console.log(obj);

                pmodalCont.hide();

                setTimeout(() => _this.initListeners('partial'), 10);
            }

           //  console.log('addMixBlock');
        },

        saveProduct: (e) => {
            
            e.preventDefault();

            let data = {};

            // iterate through input fields
            for( let inp of document.querySelectorAll('.inp') ){

                data[inp.id.replace("p-","")] = inp.value.trim();
            }

            // map categories
            data["cats"] = [];
            for( let cat of document.querySelectorAll('#p-cats ul li') ){

                data["cats"].push(cat.innerHTML.replace('<a>×</a>','').trim());
            }
             
            // link uploaded images
            data["img"] = [];
            for( let img of document.querySelectorAll('.p-img') ){

                let tf = !img.getAttribute('src').includes("placeholder") ? true : false;
                data["img"].push(tf);
            }

            // discount list
            data["discounts"] = JSON.parse(decodeURIComponent(document.querySelector('.discount-blocks').dataset.data));

            // inventory
            data["stock"] = { inventory: _this.state.response.product.stock.inventory };
            data['stock']['sku'] = document.querySelector('#stock_sku').value;
            data['stock']['management'] = document.querySelector('#stock_management').checked;
            data['stock']['qty'] = document.querySelector('#stock_quantity').value; 
            data['stock']['low_threshold'] = document.querySelector('#stock_low_threshold').value;
            
            // status
            data["status"] = document.querySelector('input[name="p-status"]:checked').value;
   
            // map mix and match
            data["variations"] = [];
            let block_index = 0;
            for( let block of document.querySelectorAll('.variation-blocks .var-block') ){

                let option_index = 0;
                for( let option of block.querySelectorAll('.offer-pricef li') ){

                    if(typeof(data["variations"][block_index]) === 'undefined')
                    data["variations"][block_index] = 
                    { 
                        'title': block.getAttribute('data-title'),
                        'type': block.getAttribute('data-type'),
                        'required': block.getAttribute('data-required'),
                        'data': []
                    };
                    
                    data["variations"][block_index]['data'][option_index] = 
                    {
                        'title': option.getAttribute('data-title'),
                        'price': option.getAttribute('data-price'),
                        'cond': option.getAttribute('data-cond')
                    };
                    option_index++;
                }
                block_index++;
            }

            // inventory table
            // [...document.querySelectorAll('.inventory-history tr td')].forEach(row => {

            //     row.
            // });
            // console.log(data);
        
            let id = getProductId();
            let sid = spaceID();

            showLoader();

            // send data
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        product: {
                            type:       'update',
                            key:        'ecommerce-product',
                            id:         id,         
                            sid:        sid,
                            data:       data
                        }
                    }
                }) 
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    // upload desc images
                    _this.uploadImages();
                    
                }else{

                    parseApiError(response);
                }
                
                console.log('Success:', response);
            })
            .catch(error => { parseApiError(error); });
        },

        openImage: (e) => {

            e.preventDefault();
            simulateClick(document.querySelector(".aif-"+e.currentTarget.dataset.index));
        },

        previewImage: (e) => {

            e.preventDefault();

            let input = e.currentTarget;

            if (input.files && input.files[0]) {

                // check image type
                if(input.files[0].type != 'image/jpeg' && input.files[0].type != 'image/jpg' && input.files[0].type != 'image/png'){

                    toast( __html("Please provide image in JPEG format") );
                    return;
                }
          
                // check image size
                if(input.files[0].size > 5000000){

                    toast( __html("Please provide image less than 5 MB in size!") );
                    return;
                }

                let index = input.dataset.index;
                let reader = new FileReader();
                reader.onload = function(e) {
                  
                    // console.log('target '+e.currentTarget.result);
                    document.querySelector('.images-'+index).setAttribute('src', e.currentTarget.result);
                }
                reader.readAsDataURL(input.files[0]);

                e.currentTarget.parentElement.querySelector('.remove').classList.remove("hd");
            }
        },

        removeImage: (e) => {

            let index = e.currentTarget.parentElement.dataset.index;
            document.querySelector('.aif-' + index).value = '';
            document.querySelector('.images-'+index).setAttribute('src', 'https://account.kenzap.com/images/placeholder.jpg');
            e.currentTarget.classList.add("hd");

            // $(this).addClass("hd");
            // $(".aif-"+$(this).parent().data("index")).val('');
            // $(".images-"+$(this).parent().data("index")).attr('src','https://account.kenzap.com/images/placeholder.jpg');
            // $(this).addClass("hd");
        },

        modalSuccessBtn: (e) => {
            
            console.log('calling modalSuccessBtnFunc');
            _this.listeners.modalSuccessBtnFunc(e);
        },

        stockManagement: (e) => {

            for(let el of document.querySelectorAll('.stock-cont')){
                e.currentTarget.checked ? el.classList.remove('d-none') : el.classList.add('d-none');
                e.currentTarget.value = e.currentTarget.checked ? "1" : "0";
            }

        },

        modalSuccessBtnFunc: null
    },

    structMixBlock: (data) => {

        let html = `
        <div class="mb-4 var-block mw" data-title="${ data.title }" data-type="${ data.type }" data-required="${ data.required }" data-index="${ data.index }" >
            <label for="offer-pricef" class="form-label pb-2"><span class="title">${ data.title }</span>
                &nbsp;&nbsp;
                <svg class="bi bi-pencil-fill edit-block ms-3" title="edit block" data-index="${ data.index }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
                <svg class="bi bi-trash remove-block ms-3" title="edit block" data-index="${ data.index }"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>\
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                </svg>
            </label>
            <div class="list-wrapper">
                <ul class="d-flex flex-column-reverse offer-pricef" >
                
                </ul>
            </div>
            <p class="form-text"><a class="add-mix" href="#">${ __html('+ add option') }</a> ${ __html('to differentiate price offering.') }</p>
            <div class="add-mix-ctn d-none"><a class="add-mix" href="#">${ __html('+ add option') }</a></div>
        </div>`;
    
        return html;
    },
    structMixRow: (data) => {

        return `
        <li data-title="${ data.title }" data-price="${ data.price }" data-cond="" class="pt-2 pb-2"><div class="form-check"><label class="form-check-label form-label"><input class="${ data.type } form-check-input" type="${ data.type }" checked="" data-ft="${ data.title }">${ data.title } &nbsp;&nbsp;&nbsp; ${ priceFormat(_this, data.price) }</label></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" class="remove-option bi bi-x-circle" viewBox="0 0 16 16">\
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </li>`;
    },
    loadImages: (product) => {

        let d = document;
        let lang = 'en';
        let offer_id = '0';
        let id = getProductId();
        let sid = spaceID();
        let t = '';
        for(let i=0;i<5;i++){
     
          let img = (product.img !== undefined && product.img[i] == 'true') ? 'https://preview.kenzap.cloud/S'+spaceID()+'/_site/images/product-'+product.id+'-'+(i+1)+'-100x100.jpeg?'+product.updated:'https://account.kenzap.com/images/placeholder.jpg';
          t+=`\
          <div class="p-img-cont float-start">\
            <p data-index="${i}">\
              <img class="p-img images-${i}" data-index="${i}" width="100" height="100" src="${img}" />\
              <span class="remove hd" title="${ __html('Remove') }">×</span>\
            </p>\
            <input type="file" name="img[]" data-type="search" data-index="${i}" class="file aif-${i} d-none">\
          </div>`;
        }
        
        d.querySelector(".ic").innerHTML = t;
    
        // new image listener
        onClick('.p-img-cont img', _this.listeners.openImage);

        // new remove listener
        onClick('.p-img-cont .remove', _this.listeners.removeImage);

        // image preview listener
        onChange('.p-img-cont .file', _this.listeners.previewImage);
    
        // iterate all images
        for(let fi=0; fi<5; fi++){
    
            // async load image to verify if it exists on CDN 
            let image_url = CDN+'/S'+sid+'/product-'+id+'-'+(parseInt(fi)+1)+'-250.jpeg?'+product.updated;
            setTimeout(function(img, sel, _fi){
        
                let allow = true;
                if(typeof(product.img)!=="undefined"){ if(!product.img[_fi]) allow = false; }
                if(allow){

                    let i = new Image();
                    i.onload = function(){
                        d.querySelector(sel+_fi).setAttribute('src', img);
                        d.querySelector(sel+_fi).parentElement.querySelector('.remove').classList.remove('hd');
                    };
                    i.src=img;
                }
            }, 300, image_url, ".images-", fi );
        }
    },
    // general method for image upload
    uploadImages: () => {

        if( document.querySelector(".imgupnote") ) document.querySelector(".imgupnote").remove();

        let fi = 0;
        for( let fileEl of document.querySelectorAll(".file") ){

            fi += 1;

            let id = getProductId();
            let sid = spaceID();

            // console.log(file);
            let file = fileEl.files[0];
            if(typeof(file) === "undefined") continue;

            // TODO add global sizes setting 
            let fd = new FormData();
            // let sizes = document.querySelector("body").dataset.sizes;
            let sizes = '1000|500|250|100x100';

            fd.append('id', id);
            fd.append('sid', sid);
            fd.append('pid', id);
            fd.append('key', 'image');
            fd.append('sizes', sizes);
            // fd.append('field', file);
            fd.append('file', file);
            fd.append('slug', 'product-'+id+'-'+fi);
            fd.append('token', getCookie('kenzap_token'));

            // clear input file so that its not updated again
            file.value = '';

            _this.state.ajaxQueue+=1;

            fetch("https://api-v1.kenzap.cloud/upload/",{
                body: fd,
                method: "post"
            })
            .then(response => response.json())
            .then(response => {

                _this.state.ajaxQueue -= 1;
                if(response.success && _this.state.ajaxQueue == 0){

                    toast( __html("Product updated") );

                    // hide UI loader
                    hideLoader();
                }
            });
        }
        
        // image upload notice
        if(_this.state.ajaxQueue == 0){

            toast( __html("Product updated") );

            hideLoader();
        }
    },
    // render discounts
    renderDiscounts: () => {

        let discounts = document.querySelector('.discount-blocks').dataset.data;
        let dow = [__html('Monday'), __html('Tuesday'), __html('Wednesday'), __html('Thursday'), __html('Friday'), __html('Saturday'), __html('Sunday')];
        
        discounts = JSON.parse(decodeURIComponent(discounts));

        let html = '';
        discounts.forEach((el, index) => {

            let dv = el.type == 'value' ? priceFormat(_this, el.value) : el.percent + '% (' + priceFormat(_this, (makeNumber(document.querySelector("#p-price").value) * ((100-el.percent)/100))) + ')';

            let time = '';
            switch(el.availability){

                case 'admin': time = __html('Admin') + ' ' + dv; break;
                case 'always': time = __html('Always') + ' ' + dv; break;
                case 'hourly': time = el.hours.from + '-' + el.hours.to + ' ' + dv; break;
                case 'weekly': el.dow.forEach((day, index) => { time += day == true ? dow[index] + ' ' : ''; }); time += '<b>' + el.hours.from + '-' + el.hours.to + '</b> ' + dv; break;
            }

            if(el.type=="never") time = __html('Avoid discount calculation for this product.');

            html +=`
            <li class="form-text mb-2" >
                ${ time }
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" class="remove-discount bi bi-x-circle" data-index=${ index } viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
            </li>`;

        });

        if(html == ''){
            document.querySelector('.discount-list').classList.add('d-none');
        }else{
            document.querySelector('.discount-list').classList.remove('d-none');
        }

        document.querySelector('.discount-blocks ul').innerHTML = html; 

        // remove discount listener
        onClick('.remove-discount', _this.listeners.removeDiscount);
    }
}

_this.init();