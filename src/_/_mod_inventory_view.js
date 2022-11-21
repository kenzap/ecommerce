import { H, __html, __attr, html, attr, showLoader, hideLoader, parseApiError, getCookie, onClick, onKeyUp, simulateClick, getSiteId, toast, link } from '@kenzap/k-cloud';
import { formatStatus, priceFormat, formatTime, stockBadge, simpleTags, getPageNumber, onlyNumbers, formatTimeDetailed, mt } from "../_/_helpers.js"
import { inventoryEdit } from "../_/_mod_inventory_edit.js"

// html inventory list loader
export const inventoryView = (_this) => {

    // console.log(_this.state.response.inventory);
    // console.log(_this.state.id);

    let inventory = { img: [], price: 0, price_per_unit: 0, price_per_unit_prev: 0, status: "1", tags: [], stock_amount: 0, stock_unit: "kg", stock_warning: "", title: "", updated: 0 };

    inventory = (_this.state.response.inventory.filter((el) => { return el._id == _this.state.id; }))[0];

    inventory.stock_amount = parseFloat(inventory.stock_amount);

    if(!inventory.price) inventory.price = 0;

    console.log(inventory);

    let modal = document.querySelector(".modal");
    let modalCont = new bootstrap.Modal(modal);
    modal.querySelector(".modal-dialog").classList.add('modal-fullscreen');
    modal.querySelector(".modal-title").innerHTML = '<div class="d-flex align-items-center">' + html(inventory.title) + '<div class="fs-6 ms-2">' + stockBadge(_this, inventory) + '</div></div>';
    modal.querySelector('.modal-footer').innerHTML = `
        <button type="button" class="btn btn-danger btn-modal btn-deduct btn-stock-update d-none">${ __html('Deduct') }</button>
        <button type="button" class="btn btn-success btn-modal btn-top-up btn-stock-update d-none">${ __html('Top up') }</button>
        <button type="button" class="btn btn-primary btn-modal btn-settings">${ __html('Settings') }</button>
        <button class="btn btn-outline-secondary remove-application btn-lg d-none" type="button" title="${ __html('Remove application.') }"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></span></button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${ __html('Close') }</button>
    `;

    // console.log(_this.state.settings);

    let modalHTml = `

    <h4 class="card-title mb-lg-4 mt-sm-3 mt-3 mb-0">${__html('Live stock')}</h4>
    <div class="form-text d-flex">
        <div class="d-flex align-items-center">
            <div>${ inventory.stock_amount } ${ inventory.stock_unit }</div>
            <div id="stock_arrow" class="triangle_down mx-2"></div>
        </div>
        <div class="d-flex align-items-center ms-2">
            <div>${ priceFormat(_this, inventory.price_per_unit_prev - inventory.price_per_unit) }</div>
            <div id="price_arrow" class="${ (inventory.price_per_unit_prev - inventory.price_per_unit) >= 0 ? 'triangle_down triangle_green' : 'triangle_up triangle_red' } mx-2"></div>
        </div>
        <div class="d-flex align-items-center ms-2">
            <div>${__html('5 days')}</div>
            <div class="mx-2 d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="form-group row mb-lg-3 mt-1">
            <div id="live_stock" style="width: 100%; height: 320px;"></div>
        </div>
    </div>

    <h4 class="card-title mb-lg-4 mt-sm-0 mt-3">${__html('History')}</h4>

    <div class="row mb-4">
        <div class="col-sm-12">
            <div class="table-responsive-">
                <table class="table table-hover table-borderless align-middle table-striped table-history-list mb-0" style="">
                    <thead>
                        <tr>
                            <th>
                                ${ __html("Details") }
                            </th>
                            <th>
                                ${ __html('Amount') }
                            </th>
                            <th>
                              
                            </th>
                        </tr>
                    </thead>
                    <tbody id="inventory-history">
                        <tr>
                            <td colspan="3">
                                ${ __html("Loading") }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <div class="row mb-4">
        <div class="col-lg-5">
            <div class="form-group row mb-lg-3 mt-1">
            <label class="col-sm-3 col-form-label">${__html('Details')}</label>
            <div class="col-sm-9">  
                <input id="details" type="text" class="form-control inp mb-sm-2" name="details" aria-label="details" aria-describedby="basic-addon-details" value="" autocomplete="off">
                <p class="form-text d-none">${__html('Use tagging for inventory grouping.')}</p>
            </div>
            </div>
        </div>
        <div class="col-lg-5">
            <div class="form-group row mb-lg-3 mt-1">
            <label class="col-sm-3 col-form-label">${__html('Amount')}</label>
            <div class="col-sm-9">
                <div class="input-group mb-sm-2">           
                    <input id="stock_amount" type="text" class="form-control inp" name="stock_amount" aria-label="Current stock amount" aria-describedby="basic-addon1" value="" autocomplete="off">
                    <span class="input-group-text" id="stock_amount_unit">${ inventory.stock_unit }</span>
                </div>
                <p class="form-text d-none">${__html('Use tagging for inventory grouping.')}</p>
            </div>
            </div>
        </div>
        <div class="col-lg-5">
            <div class="form-group row mb-lg-3 mt-1">
            <label class="col-sm-3 col-form-label">${__html('Total price')}</label>
            <div class="col-sm-9">
                <div class="input-group mb-sm-2">           
                    <input id="price" type="text" class="form-control inp" name="stock_price" aria-label="Price" aria-describedby="basic-addon2" value="0" autocomplete="off">
                    <span class="input-group-text" id="price_cur">${ html(_this.state.settings.currency_symb ? _this.state.settings.currency_symb : '') }</span>
                </div>
                <p class="form-text d-none">${__html('Use tagging for inventory grouping.')}</p>
            </div>
            </div>
        </div>
    </div>

    `;

    modal.querySelector(".modal-body").innerHTML = modalHTml;

    let liveStock = () => {
        var data = google.visualization.arrayToDataTable([
            [__html('Day'),         __html('Stock amount ('+inventory.stock_unit+')')],
            [__html('-7 days'),      inventory.stock_amount+9.0],
            [__html('-6 days'),      inventory.stock_amount+8.1],
            [__html('-5 days'),      inventory.stock_amount+7.5],
            [__html('-4 days'),      inventory.stock_amount+6.0],
            [__html('-3 days'),      inventory.stock_amount+3.5],
            [__html('-2 days'),      inventory.stock_amount+1.5],
            [__html('Yesterday'),    inventory.stock_amount+0.3],
            [__html('Today'),        inventory.stock_amount]
            ]);
        
            var options = {
                // title: 'The decline of \'The 39 Steps\'',
                vAxis: {
                    title: __html('Stock amount ('+inventory.stock_unit+')')
                },
                isStacked: true,
                legend: { position: 'left' },
            };
        
            var chart = new google.visualization.SteppedAreaChart(modal.querySelector('#live_stock'));
        
            chart.draw(data, options);        
    }
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(liveStock);

    // // init tags
    // let tags = modal.querySelector('#tags');
    // if (inventory.tags) tags.setAttribute('data-simple-tags', inventory.tags );
    // const sTags = new simpleTags(tags);

    // restrict to numbers only
    onlyNumbers('#price', [8, 46, 190, 189]);
    // onlyNumbers('#stock_warning', [8, 46, 190]);
    onlyNumbers('#stock_amount', [8, 46, 190, 189]);

    // // stock unit changed
    // modal.querySelector("#stock_unit").addEventListener('change', e => {

    //     e.preventDefault();

    //     modal.querySelector("#stock_warning_unit").innerHTML = e.currentTarget.value;
    //     modal.querySelector("#stock_amount_unit").innerHTML = e.currentTarget.value;
    // });

    // btn settings
    modal.querySelector(".btn-settings").addEventListener('click', e => {

        _this.state.action = 'edit';

        modalCont.hide();

        inventoryEdit(_this);
    });
    
    let topupBtns = (e) => {

        let amount = parseFloat(e.currentTarget.value);

        if(e.currentTarget.value.length == 0){

            modal.querySelector(".btn-top-up").classList.add("d-none");
            modal.querySelector(".btn-deduct").classList.add("d-none");    
            return;
        }
   
        if(amount < 0){

            modal.querySelector(".btn-top-up").classList.add("d-none");
            modal.querySelector(".btn-deduct").classList.remove("d-none");
            modal.querySelector("#price").setAttribute('disabled', true);
            modal.querySelector("#price").value = "";

            return;
        }

        if(amount > 0){

            modal.querySelector(".btn-top-up").classList.remove("d-none");
            modal.querySelector(".btn-deduct").classList.add("d-none");
            modal.querySelector("#price").removeAttribute('disabled');

            return;
        }
    }

    modal.querySelector("#stock_amount").addEventListener('keyup', e => {

        topupBtns(e);
    });

    modal.querySelector("#stock_amount").addEventListener('click', e => {

        topupBtns(e);
    });

    // create inventory history record
    [...modal.querySelectorAll(".btn-stock-update")].forEach(btn => {

        btn.addEventListener('click', e => {

            e.preventDefault();

            // ui is blocked
            if(modal.querySelector('.btn-stock-update').dataset.loading) return false;

            const d = new Date();

            let data = {};
            data.iid = _this.state.id;
            data.details = modal.querySelector("#details").value.trim();
            data.price = modal.querySelector("#price").value.trim();
            data.stock_unit = modal.querySelector("#stock_amount_unit").innerHTML.trim();
            data.amount = modal.querySelector("#stock_amount").value.trim();
            data.ym = d.getFullYear() + '' + mt(d.getMonth()+1);
            data.ymd = d.getFullYear() + '' + mt(d.getMonth()+1) + mt(d.getDay());
            data.time = Math.round(d.getTime()/1000);

            if(data.details.length<2){ alert( __html('Please provide longer description') ); return; }
            if(data.amount.length==0){ alert( __html('Please enter amount') ); return; }
            if(data.amount > 0 && data.price.length==0){ alert( __html('Please enter price') ); return; }

            // create query
            let query = {
                update: {
                    type:       'create',
                    key:        'ecommerce-inventory-history',   
                    data:       data
                }
            }

            // update query
            // if(_this.state.action == 'edit' && _this.state.id){

            //     query.update.type = 'update';
            //     query.update.id = _this.state.id;
            // }
                    
            // show loading
            _this.state.btnHTML = modal.querySelector('.btn-stock-update').innerHTML;
            modal.querySelector('.btn-stock-update').dataset.loading = true;
            modal.querySelector('.btn-stock-update').innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' + __html('Loading..');
    
            // send data
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: query
                }) 
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    // restore loading button state
                    // modal.querySelector('.btn-stock-update').dataset.loading = "";
                    // modal.querySelector('.btn-stock-update').innerHTML =  _this.state.btnHTML;

                    updateStock(_this, data);

                    // _this.getData();

                    // toast(__html('Stock updated'));

                    // open product editing page
                    // window.location.href = link(`/product-edit/?id=${ response.product.id}`)

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); });
        });
    });

    // update stock amounts
    let updateStock = (_this, data) => {

        // calculate new average price normalised by the amount
        // 5kg / 6 EUR -  10kg / 13 EUR
        // 3kg           10kg         = 13kg       
        // 1.2 EUR ..... 1.3 EUR .... = 1.3EUR
        // let ratio = parseFloat(data.amount) / parseFloat(inventory.stock_amount) * 100;
        // let price_avg_new = parseFloat(data.price) / parseFloat(data.amount);

        if(!inventory.price) inventory.price = 0;
        // let price_avg = (parseFloat(data.price) + parseFloat(inventory.price)) / (parseFloat(data.amount) + parseFloat(inventory.stock_amount));

        console.log(data);
        console.log(inventory);
        // console.log(price_avg);

        // return;

        let data_query = null;
        // top up
        if(data.amount > 0){

            data_query = {
                stock_amount: Math.round((parseFloat(inventory.stock_amount) + parseFloat(data.amount))*1000)/1000,
                price_per_unit: Math.round(parseFloat(data.price)/parseFloat(data.amount)*100)/100,
                price_per_unit_prev: Math.round(parseFloat(inventory.price) / parseFloat(inventory.stock_amount)*100)/100,
                price: Math.round(parseFloat(data.price)*100)/100,
                price_prev: inventory.price
            }

        // deduction
        }else{

            data_query = {
                stock_amount: Math.round((parseFloat(inventory.stock_amount) + parseFloat(data.amount))*1000)/1000,
            }
        }

        // structure stock update query
        let query = {
            update: {
                type:       'update',
                id:         _this.state.id,
                key:        'ecommerce-inventory',   
                data:       data_query
            }
        }

        console.log(query);
        // return;

        // update query
        // if(_this.state.action == 'edit' && _this.state.id){

        //     query.update.type = 'update';
        //     query.update.id = _this.state.id;
        // }
        
        // send data
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: query
            }) 
        })
        .then(response => response.json())
        .then(response => {

            if (response.success){

                // restore loading button state
                modal.querySelector('.btn-stock-update').dataset.loading = "";
                modal.querySelector('.btn-stock-update').innerHTML =  _this.state.btnHTML;

                modalCont.hide();

                // updateStock(_this, data);

                // getHistory(_this);

                _this.getData();

                toast(__html('Stock updated'));


                // open product editing page
                // window.location.href = link(`/product-edit/?id=${ response.product.id}`)

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    }

    // copy row
    let copyRow = (_this, id) => {

        console.log(id);

        let row = _this.state.history.filter((el) => { return el._id == id; })[0];

        document.querySelector('#details').value = row.details;
        document.querySelector('#stock_amount').value = row.amount;
        document.querySelector('#price').value = row.price;

        simulateClick(document.querySelector("#stock_amount"));

        document.querySelector("#stock_amount").focus();

        toast(__html('Row copied'));
    }

    // remove record from history table
    let removeHistoryRow = (_this, id) => {

        // send data
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    history: {
                        type:       'delete',
                        key:        'ecommerce-inventory-history',   
                        id:         id,
                    }
                }
            }) 
        })
        .then(response => response.json())
        .then(response => {

            // // restore loading button state
            // modal.querySelector('.btn-add-item').dataset.loading = "";
            // modal.querySelector('.btn-add-item').innerHTML = btnHTML;

            if (response.success){

                getHistory(_this);

                toast(__html('Record removed'));

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    }

    // load inventory top up/deduct history table
    let getHistory = (_this) => {

        // send data
        _this.state.limit = 10;
        let s = "";
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    history: {
                        type:       'find',
                        key:        'ecommerce-inventory-history',
                        fields:     ['_id', 'details', 'price', 'price_per_unit', 'stock_unit', 'amount', 'time', 'updated'],
                        limit:      _this.state.limit,
                        term:[
                            {
                                "field": "iid",
                                "relation": "=",
                                "type": "string",
                                "value":_this.state.id
                            }
                        ],
                        offset:     s.length > 0 ? 0 : getPageNumber() * _this.state.limit - _this.state.limit, // automatically calculate the offset of table pagination
                        search:     {                                                           // if s is empty search query is ignored
                                        field: 'details',
                                        s: s
                                    },
                        sortby:     {
                                        field: 'created',
                                        order: 'DESC'
                                    },
                    },
                }
            }) 
        })
        .then(response => response.json())
        .then(response => {

            if (response.success){

                _this.state.history = response.history;

                // table is empty
                if(response.history.length == 0){
                    
                    document.querySelector("#inventory-history").innerHTML = `<tr><td colspan="2" class="form-text">${ __html("No data to display.") }</td></tr>`;
                    return;
                }

                // load table data
                document.querySelector("#inventory-history").innerHTML = response.history.map((history, i) => {

                    return `
                        <tr>
                            <td data-id="${ attr(history._id) }">
                                ${ history.details }
                                <div class="form-text">${ formatTime(_this, history.time) } / ${ priceFormat(_this, history.price) }</div>
                            </td>
                            <td data-id="${ attr(history._id) }">
                                <div class="fw-bold ${ (history.amount < 0 ? 'text-danger' : 'text-success' ) }">${ (history.amount < 0 ? '' : '+' ) + history.amount + history.stock_unit }</div>
                            </td>
                            <td class="text-end d-none-">
                                <div class="dropdown inventoryHistoryActionsCont">
                                    <svg id="inventoryHistoryActions${i}" data-bs-toggle="dropdown" data-boundary="viewport" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical dropdown-toggle po" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                    </svg>
                                    <ul class="dropdown-menu" aria-labelledby="inventoryHistoryActions${i}">
                                        <li><a class="dropdown-item po" href="#" data-action="copy" data-id="${ attr(history._id) }" data-index="${ i }">${ __html('Copy') }</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item po" href="#" data-action="remove" data-id="${ attr(history._id) }" data-index="${ i }">${ __html('Remove') }</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>`;

                }).join('');

                // remove from table
                [...document.querySelectorAll(".inventoryHistoryActionsCont .dropdown-item")].forEach(row => {
                // [...document.querySelectorAll("#inventory-history tr td")].forEach(row => {
                
                    row.addEventListener("click", (e)=> {

                        switch(e.currentTarget.dataset.action){

                            case 'copy':

                                copyRow(_this, e.currentTarget.dataset.id);
                            break;
                            case 'remove':

                                if(!confirm(__html('Remove this record?'))) return;

                                removeHistoryRow(_this, e.currentTarget.dataset.id);
                            break;
                        } 
                    });
                });

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    }
    
    getHistory(_this);

    modalCont.show();

    // setTimeout( () => modal.querySelector("#title").focus(), 100);
}