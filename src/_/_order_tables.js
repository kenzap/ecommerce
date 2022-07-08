import { headers, showLoader, hideLoader, onClick, onKeyUp, simulateClick, parseApiError, spaceID, __html } from '@kenzap/k-cloud';
import { priceFormat, getPageNumber, makeNumber, parseVariations, timeConverterAgo, escape, onlyNumbers, unescape } from "../_/_helpers.js"
import { printQR } from "../_/_print.js"

export const tables = {

    _this: null,
    firstLoad: true,
    state: { orderSingle: null },
    render: (_this, e) => {

        if(_this.state.settings.tables != "1") return;

        let s = '', table_list = _this.state.settings.table_list.trim().split('\n');
       
        let html = `<div id="table_list" class="row row-cols-1 row-cols-lg-5 row-cols-md-3 row-cols-sm-2 g-3 mb-3">`;

        _this.state.orders.forEach(o => {

            if(o.table) if(o.table.length>0) if(!table_list.includes(o.table)) table_list.push(o.table);
        });

        console.log(table_list);

        table_list.forEach((el, i) => {

            html += tables.structTableCard(_this, i, el, { orders: _this.state.orders, meta: _this.state.meta }); 

        });

        html += '</div>';

        if(document.querySelector('#table_list')) document.querySelector('#table_list').remove();
        
        document.querySelector('#orders-after-header').insertAdjacentHTML("beforeend", html);

        // print custom QR code
        if(tables.firstLoad){
         
            tables.firstLoad = false; onClick('.print-qr', (e) => {
        
                e.preventDefault();

                printQR(_this, e.currentTarget.dataset.qrnum);
            });
        }
    },
    renderField: (_this, a, item, x) => {

        let html = '';
        switch(a.e){
            
            case 'price': 

                html = `<div data-id="${x}" data-type="key-number" class="${ a.classList ? a.classList : "" } ms-2 d-inline-block" ${ a.editable ? 'contenteditable="true"':'' } data-id="${x}" data-value="${ item }">${ priceFormat(_this, item) }</div>`;
                return html;
            case 'text': 

                html = `<div data-id="${x}" data-type="text" class="${ a.classList ? a.classList : "" } ms-2 d-inline-block" ${ a.editable ? 'contenteditable="true"':'' } data-id="${x}">${ item }</div>`;
                return html;
            case 'textarea': return '<textarea type="text" rows="4" class="form-control order-form pv " data-type="textarea" id="'+x+'" value="'+item+'">'+item+'</textarea>';
            case 'items': 

                // parse product items
                html = `<table class="items order-form" data-type="items"><tr><th><div class="me-1 me-sm-3">${ __('Product') }</div></th><th class="qty"><div class="me-1 me-sm-3">${ __('Qty') }</div></th><th class="tp"><div class="me-1 me-sm-3">${ __('Total') }</div></th><th></th></tr>`;
                for(let x in item){ html += preview.structOrderItemTable(_this, x, item, false); }

                // add row for manual product entry
                html += `<tr class="new-item-row">
                            <td>
                                <div class="me-1 me-sm-3 mt-2">
                                    <input type="text" value="" autocomplete="off" placeholder="${ __('Search..') }" class="form-control edit-item" data-id="" data-index="" list="item-suggestions">
                                    <span class="select-list-group__toggle"> </span>
                                    <ul class="s-list my-1 shadow-sm" data-toggle="false"></ul>
                                    <datalist id="item-suggestions" class="fs-12 d-none"></datalist>
                                </div>
                            </td>
                            <td class="qty">
                                <div class="me-1 me-sm-3 mt-2">
                                    <input type="text" value="" autocomplete="off" class="form-control text-right edit-qty">
                                </div>
                            </td>
                            <td class="tp">
                                <div class="me-1 me-sm-3 mt-2">
                                    <input type="text" value="" autocomplete="off" class="form-control edit-tp">
                                </div>
                            </td>
                            <td class="align-middle text-center pt-2"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="24" height="24" class="bi bi-plus-circle text-success align-middle add-item"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
                            </td>
                        </tr>`;

                html += `</table><div class="item-vars-input mt-3"> </div>`;

                return html;
            default: 
            
                if(x == '_id') item = item.substr(0, 6);

                html = `<div data-id="${x}" data-type="text" class="${ a.classList ? a.classList : "" } ms-2 d-inline-block" ${ a.editable ? 'contenteditable="true"':'' } data-id="${x}">${ item }</div>`;
                return html;
        }
  },
 
  structTableCard: (_this, i, el, response) => {

    let ii = 0;
    let order = {};
    let id_last = 0;
    
    response.orders.forEach((o, index) => { if(o.table == el+'' && o.id > id_last){ ii = index; order = o; id_last = o.id; } });

    order = order ? order : {};
    order['id'] = order.id ? order.id : "";
    order['_id'] = order._id ? order._id : "";
    order['created'] = order.created ? order.created : "";

    let classes = "";
    let _id_header = order._id ? order._id : "", _id_body = _id_header;

    switch(order['status']){

        case 'new': classes = "text-dark bg-warning";  break;
        case 'paid': classes = "text-white bg-primary"; break;
        case 'processing': classes = "text-white bg-primary"; break;
        case 'completed': classes = "text-white bg-secondary"; _id_body = ""; break;
        case 'failed': classes = "text-white bg-danger"; _id_body = ""; break;
        case 'refunded': classes = "text-white bg-danger"; _id_body = ""; break;
        default: classes = "text-white bg-secondary"; _id_body = ""; break;
    }

    return `
    <div class="col">
        <div class="card ${ classes } mb-2 " style="max-width: 18rem;">
            <div class="card-header view-order po ${ _id_header && order['status'] == 'completed' ? "bg-success" : "" }" data-id="${ _id_header }" data-table="${ el }" ${ _id_header ? 'data-index="' + ii + '"' : '' }">${ order.id ? __html("last order #%1$", order.id) : "&nbsp;" }</div>
            <div class="card-body d-flex align-items-center justify-content-center view-order po" style="min-height:140px;" data-id="${ _id_body }" data-table="${ el }" ${ _id_body ? 'data-index="' + ii + '"' : '' }">
                <h5 class="card-title">${ __("Table %1$", el) }</h5>
            </div>
            <div class="card-footer d-flex justify-content-between">
                ${ order['created'] ? timeConverterAgo(__, response.meta.time, order['created']) : '&nbsp;' }
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-qr-code-scan print-qr po ${ _this.state.settings.qr_print ? "" : "d-none" } " viewBox="0 0 16 16" data-qrnum="${ el }">
                    <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z"></path>
                    <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z"></path>
                    <path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z"></path>
                    <path d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z"></path>
                    <path d="M12 9h2V8h-2v1Z"></path>
                </svg>
            </div>
        </div>
    </div>`;
  }
}