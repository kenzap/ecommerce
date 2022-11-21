import { H, __html, __attr, html, attr, showLoader, hideLoader, parseApiError, getCookie, onClick, onKeyUp, getSiteId, toast, link } from '@kenzap/k-cloud';
import { formatStatus, priceFormat, formatTime, simpleTags, onlyNumbers } from "../_/_helpers.js"

// html inventory list loader
export const inventoryEdit = (_this) => {

    let inventory = { img: [], price: 0, price_per_unit: 0, price_per_unit_prev: 0, status: "1", tags: [], stock_amount: 0, stock_unit: "kg", stock_warning: "", title: "", write_off: { type: "never", dof: [], time: '0', amount: 0 }, updated: 0 };

    // console.log(_this.state.id);
    // console.log(_this.state.response.inventory);

    if(_this.state.action == 'edit' && _this.state.id){

        inventory = _this.state.response.inventory.filter((el) => { return el._id == _this.state.id; })[0];
    }

    let required = false;
    let modal = document.querySelector(".modal");
    let modalCont = new bootstrap.Modal(modal);
    modal.querySelector(".modal-dialog").classList.add('modal-fullscreen');
    modal.querySelector(".modal-title").innerHTML = _this.state.action == 'edit' ? __html('Edit Item') : __html('Add Item');
    modal.querySelector('.modal-footer').innerHTML = `
        <button type="button" class="btn btn-primary btn-modal btn-add-item">${ _this.state.action == 'edit' ? __html('Update') : __html('Add') }</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${ __html('Cancel') }</button>
        <button class="btn btn-danger btn-remove-item btn-lg- ${ _this.state.action == 'edit' ? '' : 'd-none' }" type="button" title="${ __html('Remove application.') }"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></span></button>
    `;

    let modalHTml = `

    <h4 class="card-title mb-lg-4 mt-sm-3 mt-3">${__html('Item')}</h4>
    <div class="row">
        <div class="col-lg-6">
            <div class="form-group row mb-lg-3 mt-1">
            <label class="col-sm-3 col-form-label">${__html('Title')}</label>
            <div class="col-sm-9">
                <input id="title" type="text" class="form-control inp" name="title" data-type="emails" value="${ inventory.title }"  autocomplete="off">
                <p class="form-text">${__html('Item description.')}</p>
            </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="form-group row mb-lg-3 mt-1">
            <label class="col-sm-3 col-form-label">${__html('Price per 1 ')}<span id="price_stock_unit">${ inventory.stock_unit }</span></label>
            <div class="col-sm-9">
                <div class="input-group">
                    <input id="price_per_unit" type="text" class="form-control inp" name="price_per_unit" aria-label="Current stock amount" aria-describedby="basic-addon1" value="${ inventory.price_per_unit }" autocomplete="off">
                    <span class="input-group-text" id="price_curr">${ html(_this.state.settings.currency_symb ? _this.state.settings.currency_symb : '') }</span>
                </div>
                <p class="form-text">${__html('Price per one stock measurement unit.')}</p>
            </div>
            </div>
        </div>
    </div>

    <h4 class="card-title mb-lg-4 mt-sm-0 mt-3">${__html('Stock')}</h4>
    <div class="row">
        <div class="col-lg-6">
            <div class="form-group row mb-lg-3 mt-1">
            <label class="col-sm-3 col-form-label">${__html('Stock unit')}</label>
            <div class="col-sm-9">
                <select id="stock_unit" class="form-select inp" name="stock_unit" data-type="select">
                    <option value="g" ${ inventory.stock_unit == 'g' ? 'selected' : '' }>${__html('g')}</option>
                    <option value="kg" ${ inventory.stock_unit == 'kg' ? 'selected' : '' }>${__html('kg')}</option>
                    <option value="set" ${ inventory.stock_unit == 'set' ? 'selected' : '' }>${__html('set')}</option>
                    <option value="pc" ${ inventory.stock_unit == 'pc' ? 'selected' : '' }>${__html('piece')}</option>
                    <option value="l" ${ inventory.stock_unit == 'l' ? 'selected' : '' }>${__html('liter')}</option>
                </select>
                <p class="form-text">${__html('Stock measurement unit for inventory deductions.')}</p>
            </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="form-group row mb-lg-3 mt-1">
            <label class="col-sm-3 col-form-label">${__html('Current stock')}</label>
            <div class="col-sm-9">
                <div class="input-group">
                    <input id="stock_amount" type="text" class="form-control inp" name="stock_amount" aria-label="Current stock amount" aria-describedby="basic-addon1" value="${ inventory.stock_amount }" autocomplete="off">
                    <span class="input-group-text" id="stock_amount_unit">${ inventory.stock_unit }</span>
                </div>
                <p class="form-text">${__html('Current stock amount.')}</p>
            </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="form-group row mb-lg-3 mt-1">
            <label class="col-sm-3 col-form-label">${__html('Low stock')}</label>
            <div class="col-sm-9">
                <div class="input-group">
                    <input id="stock_warning" type="text" class="form-control inp" name="stock_warning" aria-label="Low stock warning" aria-describedby="basic-addon2" value="${ inventory.stock_warning }" autocomplete="off">
                    <span class="input-group-text" id="stock_warning_unit">${ inventory.stock_unit }</span>
                </div>
                <p class="form-text">${__html('Trigger alert when stock drops below this value.')}</p>
            </div>
            </div>
        </div>
    </div>

    <h4 class="card-title mb-lg-4 mt-sm-0 mt-3">${__html('Write-off')}</h4>
    <div class="row">
        <div class="col-lg-6">
            <div class="form-group row mb-lg-3 mt-1">
            <label class="col-sm-3 col-form-label">${__html('Auto deduction')}</label>
            <div class="col-sm-9">
                <div class="input-group">
                    <select id="write_off" class="form-select inp" name="write_off" data-type="select">
                        <option value="never" ${ inventory.write_off.type == 'never' ? 'selected' : '' }>${__html('Never')}</option>
                        <option value="daily" ${ inventory.write_off.type  == 'daily' ? 'selected' : '' }>${__html('Daily')}</option>
                        <option value="ai" ${ inventory.write_off.type  == 'ai' ? 'selected' : '' }>${__html('AI-driven')}</option>
                    </select>
                </div>
                <p class="form-text">${__html('Trigger alert when stock drops below this value.')}</p>
            </div>
            </div>
            <div class="form-group row mb-lg-3 mt-1 write_off_cont ${ inventory.write_off.type == 'never' ? 'd-none' : '' }">
                <label class="col-sm-3 col-form-label">${__html('Days of week')}</label>
                <div class="col-sm-9">
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
            </div>
        </div>
        <div class="col-lg-6 write_off_cont ${ inventory.write_off.type == 'never' ? 'd-none' : '' }">
            <div class="form-group row mb-lg-3 mt-1">
                <label class="col-sm-3 col-form-label">${__html('Amount')}</label>
                <div class="col-sm-9">
                    <div class="input-group">
                        <input id="write_off_amount" type="text" class="form-control inp" name="write_off_amount" aria-label="write off stock amount" aria-describedby="basic-addon1" value="${ inventory.write_off.amount ? inventory.write_off.amount : 0 }" autocomplete="off">
                        <span class="input-group-text" id="write_off_amount_unit">${ inventory.stock_unit }</span>
                    </div>
                    <p class="form-text">${__html('Amount to deduct from current stock amount.')}</p>
                </div>
            </div>
            <div class="form-group row mb-lg-3 mt-1">
                <label class="col-sm-3 col-form-label">${__html('When')}</label>
                <div class="col-sm-9">
                    <select id="write_off_time" class="form-select inp" name="write_off_time" data-type="select">
                        <option value="2" ${ inventory.write_off.time == '2' ? 'selected' : '' }>${__html('2:00 AM')}</option>
                        <option value="4" ${ inventory.write_off.time == '4' ? 'selected' : '' }>${__html('4:00 AM')}</option>
                        <option value="6" ${ inventory.write_off.time == '6' ? 'selected' : '' }>${__html('6:00 AM')}</option>
                        <option value="8" ${ inventory.write_off.time == '8' ? 'selected' : '' }>${__html('8:00 AM')}</option>
                        <option value="10" ${ inventory.write_off.time == '10' ? 'selected' : '' }>${__html('10:00 AM')}</option>
                        <option value="12" ${ inventory.write_off.time == '12' ? 'selected' : '' }>${__html('12:00 PM')}</option>
                        <option value="14" ${ inventory.write_off.time == '14' ? 'selected' : '' }>${__html('14:00 PM')}</option>
                        <option value="16" ${ inventory.write_off.time == '16' ? 'selected' : '' }>${__html('16:00 PM')}</option>
                        <option value="18" ${ inventory.write_off.time == '18' ? 'selected' : '' }>${__html('18:00 PM')}</option>
                        <option value="20" ${ inventory.write_off.time == '20' ? 'selected' : '' }>${__html('20:00 PM')}</option>
                        <option value="22" ${ inventory.write_off.time == '22' ? 'selected' : '' }>${__html('22:00 PM')}</option>
                    </select>
                    <p class="form-text">${ __html('Local time when deduction is called.') }</p>
                </div>
            </div>
        </div>
    </div>

    <h4 class="card-title mb-lg-4 mt-sm-0 mt-3">${__html('Tagging')}</h4>
    <div class="row">
        <div class="col-lg-6">
            <div class="form-group row mb-lg-3 mt-1">
            <label class="col-sm-3 col-form-label">${__html('Tags')}</label>
            <div class="col-sm-9">
                <div class="form-group">
                    <div id="tags" class="simple-tags" data-simple-tags=""></div>
                </div>
                <p class="form-text">${__html('Use tagging for inventory grouping.')}</p>
            </div>
            </div>
        </div>
    </div>
    `;

    modal.querySelector(".modal-body").innerHTML = modalHTml;
    modal.querySelector(".modal-body").innerHTML

    // init tags
    let tags = modal.querySelector('#tags');
    if (inventory.tags) tags.setAttribute('data-simple-tags', inventory.tags );
    const sTags = new simpleTags(tags);

    // restrict to numbers only
    onlyNumbers('#price', [8, 46, 190]);
    onlyNumbers('#stock_amount', [8, 46, 190, 189]);
    onlyNumbers('#stock_warning', [8, 46, 190]);

    // stock unit changed
    modal.querySelector("#stock_unit").addEventListener('change', e => {

        e.preventDefault();

        modal.querySelector("#stock_warning_unit").innerHTML = e.currentTarget.value;
        modal.querySelector("#stock_amount_unit").innerHTML = e.currentTarget.value;
        modal.querySelector("#write_off_amount_unit").innerHTML = e.currentTarget.value;
        modal.querySelector("#price_stock_unit").innerHTML = e.currentTarget.value;
    });

    // write_off changed
    modal.querySelector("#write_off").addEventListener('change', e => {

        e.preventDefault();

        // hide all by defaulf
        [...modal.querySelectorAll(".write_off_cont")].forEach(el => {

            el.classList.add('d-none');
        });

        switch(e.currentTarget.value){

            case 'never':


            break;
            default:

                [...modal.querySelectorAll(".write_off_cont")].forEach(el => {

                    el.classList.remove('d-none');
                });

            break;
        }
    });

    // add item btn
    modal.querySelector(".btn-add-item").addEventListener('click', e => {

        e.preventDefault();

        // ui is blocked
        if(modal.querySelector('.btn-add-item').dataset.loading) return false;

        let data = { write_off: {} };
        data.title = modal.querySelector("#title").value.trim();
        data.price_per_unit = parseFloat(modal.querySelector("#price_per_unit").value.trim());
        data.stock_unit = modal.querySelector("#stock_unit").value.trim();
        data.stock_amount = parseFloat(modal.querySelector("#stock_amount").value.trim());
        data.stock_warning = parseFloat(modal.querySelector("#stock_warning").value.trim());
        data.write_off.type = modal.querySelector("#write_off").value.trim();
        data.write_off.time = modal.querySelector("#write_off_time").value.trim();
        data.write_off.amount = parseFloat(modal.querySelector("#write_off_amount").value.trim());
        data.tags = []; [...modal.querySelectorAll('#tags ul li')].forEach(tag => { data.tags.push(tag.innerHTML.replace('<a>×</a>','').trim()) });
        data.status = "1";
        data.img = [];
        data.cats = [];

        // console.log(data);
        // return;

        if(data.title.length<2){ alert( __html('Please provide longer title') ); return; }
        if(data.price_per_unit.length == 0){ data.price_per_unit = '0'; }
        if(data.stock_amount == 0) data.stock_amount = '0';
        // if(data.stock_unit.length<2){ alert( __html('Please provide longer title') ); return; }
        if(data.stock_warning.length<2){ data.stock_warning = 0; }

        data.price_per_unit_prev = data.price_per_unit;

        // create query
        let query = {
            update: {
                type:       'create',
                key:        'ecommerce-inventory',   
                data:       data
            }
        }

        // update query
        if(_this.state.action == 'edit' && _this.state.id){

            query.update.type = 'update';
            query.update.id = _this.state.id;
        }
                
        // show loading
        let btnHTML = modal.querySelector('.btn-add-item').innerHTML;
        modal.querySelector('.btn-add-item').dataset.loading = true;
        modal.querySelector('.btn-add-item').innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' + __html('Loading..');
  
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

            // restore loading button state
            modal.querySelector('.btn-add-item').dataset.loading = "";
            modal.querySelector('.btn-add-item').innerHTML = btnHTML;

            if (response.success){

                modalCont.hide();

                _this.getData();

                toast(_this.state.action == 'edit' ? __html('Item updated') : __html('Item created'));

                // open product editing page
                // window.location.href = link(`/product-edit/?id=${ response.product.id}`)

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    });

    // add remove btn
    modal.querySelector(".btn-remove-item").addEventListener('click', e => {

        e.preventDefault();

        // ui is blocked
        if(modal.querySelector('.btn-add-item').dataset.loading) return false;

        // confirm removal
        if(!confirm('Completely remove from inventory?')) return;

        // show loading
        let btnHTML = modal.querySelector('.btn-remove-item').innerHTML;
        modal.querySelector('.btn-add-item').dataset.loading = true;
        modal.querySelector('.btn-remove-item').innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' + __html('Loading..');
  
        // send data
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    product: {
                        type:       'delete',
                        key:        'ecommerce-inventory',   
                        id:        _this.state.id,
                    }
                }
            }) 
        })
        .then(response => response.json())
        .then(response => {

            // restore loading button state
            modal.querySelector('.btn-add-item').dataset.loading = "";
            modal.querySelector('.btn-add-item').innerHTML = btnHTML;

            if (response.success){

                modalCont.hide();

                _this.getData();

                toast(__html('Item removed'));

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });

    });

    modalCont.show();

    if(_this.state.action != 'edit'){ setTimeout( () => modal.querySelector("#title").focus(), 100); }
}