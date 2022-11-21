import { H, __html, __attr, html, attr, showLoader, hideLoader, parseApiError, getCookie, onClick, onKeyUp, spaceID, simulateClick, getSiteId, toast, link } from '@kenzap/k-cloud';
import { formatStatus, priceFormat, formatTime, stockBadge, simpleTags, getPageNumber, getProductId, onlyNumbers, formatTimeDetailed, mt } from "../_/_helpers.js"
import { inventoryEdit } from "../_/_mod_inventory_edit.js"

// html inventory list loader
export const inventoryTable = (_this) => {

    if(!_this.state.response.product.stock.inventory) _this.state.response.product.stock.inventory = [];

    if(document.querySelector('.modal-backdrop')) document.querySelector('.modal-backdrop').remove();

    // populate inventory table
    document.querySelector('.inventory-cont').innerHTML = `
    <div class="table-responsive-">
        <table class="table table-hover table-borderless align-middle table-striped table-history-list mb-0" style="">
            <thead>
                <tr>
                    <th class="form-text">
                        ${ __html("Title") }
                    </th>
                    <th class="form-text">
                        ${ __html('Amount') }
                    </th>
                    <th class="form-text">
                        ${ __html('Price') }
                    </th>
                    <th>
                    
                    </th>
                </tr>
            </thead>
            <tbody id="inventory-history">

                ${
                    _this.state.response.product.stock.inventory.length == 0 ? `
                    <tr>
                        <td class="form-text" colspan="4">
                            ${ __html("no data to display") }
                        </td>
                    </tr>
                    ` : ''
                }

                ${ 
                    _this.state.response.product.stock.inventory.map((row, i) => {

                        return `
                            <tr>
                                <td class="form-text text-dark">
                                    ${ row.title }
                                </td>
                                <td class="form-text">
                                    <div class="fw-bold ${ (row.amount < 0 ? 'text-danger' : 'text-success' ) }">${ (row.amount < 0 ? '' : '+' ) + row.amount + row.stock_unit }</div>
                                </td>
                                <td id="itid${ attr(row.id) }" data-amount="${ attr(row.amount) }" class="form-text text-dark">

                                </td>
                                <td class="text-end d-none-">
                                    <div class="dropdown inventorTableActionsCont">
                                        <svg id="inventoryHistoryActions${i}" data-bs-toggle="dropdown" data-boundary="viewport" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical dropdown-toggle po" viewBox="0 0 16 16">
                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                        </svg>
                                        <ul class="dropdown-menu" aria-labelledby="inventoryHistoryActions${i}">
                                            <li><a class="dropdown-item po d-none" href="#" data-action="copy" data-id="${ attr(row.id) }" data-index="${ i }">${ __html('Copy') }</a></li>
                                            <li><hr class="dropdown-divider d-none"></li>
                                            <li><a class="dropdown-item po" href="#" data-action="remove" data-id="${ attr(row.id) }" data-index="${ i }">${ __html('Remove') }</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        `

                    }).join('')
                }

                ${
                    _this.state.response.product.stock.inventory.length > 0 ? `
                    <tr>
                        <td class="form-text"></td>
                        <td class="form-text"></td>
                        <td id="itidtotal" class="form-text" colspan="2">
                            
                        </td>
                    </tr>
                    ` : ''
                }

            </tbody>
        </table>
    </div>
    `;

    // ${__html('Total')}

    // table actions
    [...document.querySelectorAll(".inventorTableActionsCont .dropdown-item")].forEach(row => {
        row.addEventListener("click", (e)=> {

            e.preventDefault();

            switch(e.currentTarget.dataset.action){

                case 'copy':

                    // copyRow(_this, e.currentTarget.dataset.id);
                break;
                case 'remove':

                    if(!confirm(__html('Remove this record?'))) return;

                    removeInventoryRow(_this, e.currentTarget.dataset.id);
                break;
            }
        });
    });

    // add inventory modal
    if(!document.querySelector(".add-inventory").dataset.assigned) document.querySelector(".add-inventory").addEventListener('click', e => {

        e.preventDefault();

        document.querySelector(".add-inventory").dataset.assigned = true;

        let modal = document.querySelector(".modal");
        _this.state.modalCont = new bootstrap.Modal(modal);
        modal.querySelector(".modal-dialog").classList.add('modal-lg');
        modal.querySelector(".modal-title").innerHTML = __html('Add Inventory Item');
        modal.querySelector('.modal-footer').innerHTML = `
            <button type="button" class="btn btn-success btn-modal btn-add btn-inventory-add d-none">${ __html('Add') }</button>
            <button class="btn btn-outline-secondary remove-application btn-lg d-none" type="button" title="${ __html('Remove application.') }"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></span></button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${ __html('Close') }</button>
        `;

        modal.querySelector(".modal-body").innerHTML = `
            <div class="row mb-4">
                <div class="col-sm-12">
                    <div class="table-responsive-">
                        <table class="table table-hover table-borderless align-middle table-striped table-inventory-list mb-0" style="">
                            <thead>
                                <tr>
                                    <th>
                                        ${ __html("Title") }
                                    </th>
                                    <th>
                                        ${ __html('Amount') }
                                    </th>
                                    <th>
                                    
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="inventory-list">
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
        `;

        let addToInventory = (_this, obj) => {

            let id = getProductId();
            let sid = spaceID();

            // showLoader();
            // if(!_this.state.response.product.inventory) _this.state.response.product.inventory = [];
            
            _this.state.response.product.stock.inventory.push(obj);

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
                            data:       {
                                stock: _this.state.response.product.stock
                            }
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {

                if(response.success){

                    if(_this.state.modalCont) _this.state.modalCont.hide();

                    inventoryTable(_this);
                    
                }else{

                    parseApiError(response);
                }
                
                // console.log('Success:', response);
            })
            .catch(error => { parseApiError(error); });
        }

        let loadInventory = (_this) => {

            // send data
            let limit = 50;
            let s = "";
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        inventory: {
                            type:       'find',
                            key:        'ecommerce-inventory',
                            fields:     ['_id', 'img', 'status', 'tags', 'price', 'price_prev', 'price_per_unit', 'price_per_unit_prev', 'title', 'stock_amount', 'stock_unit', 'stock_warning', 'updated'],
                            limit:      limit,
                            // term:[
                            //     {
                            //         "field": "iid",
                            //         "relation": "=",
                            //         "type": "string",
                            //         "value": _this.state.id
                            //     }
                            // ],
                            offset:     s.length > 0 ? 0 : getPageNumber() * limit - limit,     // automatically calculate the offset of table pagination
                            search:     {                                                                               // if s is empty search query is ignored
                                            field: 'title',
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

                    _this.state.inventory = response.inventory;

                    // table is empty
                    if(response.inventory.length == 0){
                        
                        document.querySelector("#inventory-list").innerHTML = `<tr><td colspan="3" class="form-text">${ __html("No data to display.") }</td></tr>`;
                        return;
                    }
                    
                    // load table data
                    document.querySelector("#inventory-list").innerHTML = response.inventory.map((inventory, i) => {

                        return `
                            <tr>
                                <td data-id="${ attr(inventory._id) }">
                                    ${ inventory.title }
                                </td>
                                <td data-id="${ attr(inventory._id) }">
                                    <div class="input-group mb-sm-2" style="max-width:200px;">
                                        <input id="stock_amount${i}" type="text" class="form-control stock_amount inp" name="stock_amount" aria-label="Current stock amount" aria-describedby="basic-addon1" value="" autocomplete="off">
                                        <span class="input-group-text" id="stock_amount_unit">${ inventory.stock_unit }</span>
                                    </div>
                                </td>
                                <td class="text-end d-none- add-inventory-item" data-index="${i}" data-id="${ attr(inventory._id) }">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle text-success po" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg>
                                </td>
                            </tr>`;

                    }).join('');

                    // only numbers
                    onlyNumbers('.stock_amount', [8, 46, 190, 189]);

                    // add inventory item
                    [...document.querySelectorAll(".add-inventory-item")].forEach(item => {

                        item.addEventListener('click', el => {

                            let i = el.currentTarget.dataset.index;
                            // check if amount is not empty
                            let amount = document.querySelector("#stock_amount"+i).value;
                            if(amount.length == 0){ alert(__html('Please enter amount')); return; }
                            if(isNaN(amount)){ alert(__html('Amount should be a number')); return; }
                            if(amount < 0){ alert(__html('Amount should be a positive number')); return; }

                            let obj = { id: el.currentTarget.dataset.id, amount: amount, title: _this.state.inventory[i].title, stock_unit: _this.state.inventory[i].stock_unit }

                            addToInventory(_this, obj);
                            // el.currentTarget.dataset.id
                        });
                    });

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); });
        }

        loadInventory(_this);

        // btn-inventory-add

        _this.state.modalCont.show();
    });

    // remove record from table
    let removeInventoryRow = (_this, id) => {

        // console.log(_this.state.response.product.stock.inventory);
        // console.log(id);

        // let id = getProductId();
        let sid = spaceID();

        _this.state.response.product.stock.inventory = _this.state.response.product.stock.inventory.filter(el => { return el.id != id })

        // send data
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    product: {
                        type:       'update',
                        key:        'ecommerce-product',
                        id:         getProductId(),         
                        sid:        sid,
                        data:       {
                            stock: _this.state.response.product.stock
                        }
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

                // getHistory(_this);
                if(_this.state.modalCont) _this.state.modalCont.hide();

                inventoryTable(_this);

                toast(__html('Record removed'));

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    }

    let loadInventoryPrice = (_this) => {

        let ids = _this.state.response.product.stock.inventory.map(obj => { return obj.id })
        // console.log(ids);

        // return; 
        // send data
        let limit = 50;
        let s = "";
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    inventory_price: {
                        type:       'find',
                        key:        'ecommerce-inventory',
                        fields:     ['_id', 'img', 'status', 'tags', 'price', 'price_prev', 'price_per_unit', 'price_per_unit_prev', 'title', 'stock_amount', 'stock_unit', 'stock_warning', 'updated'],
                        id:         ids
                        // limit:      limit,
                        // term:[
                        //     {
                        //         "field": "iid",
                        //         "relation": "=",
                        //         "type": "string",
                        //         "value": _this.state.id
                        //     }
                        // ],
                        // offset:     s.length > 0 ? 0 : getPageNumber() * limit - limit,     // automatically calculate the offset of table pagination
                        // search:     {                                                                               // if s is empty search query is ignored
                        //                 field: 'title',
                        //                 s: s
                        //             },
                        // sortby:     {
                        //                 field: 'created',
                        //                 order: 'DESC'
                        //             },
                    },
                }
            }) 
        })
        .then(response => response.json())
        .then(response => {

            if(response.success){

                // _this.state.inventory = response.inventory
                // console.log("prices");
                // console.log(response.inventory_price);

                let price_total = 0;
                response.inventory_price.forEach(inv => {

                    let price = inv.price_per_unit * parseFloat(document.querySelector('#itid'+inv._id).dataset.amount);
                    price_total += price;
                    document.querySelector('#itid'+inv._id).innerHTML = priceFormat(_this, price); 
                })

                if(document.querySelector('#itidtotal')) document.querySelector('#itidtotal').innerHTML = priceFormat(_this, price_total);
            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    }

    // load inventory prices
    loadInventoryPrice(_this);
}