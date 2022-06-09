import { headers, showLoader, hideLoader, onClick, onKeyUp, simulateClick, parseApiError, spaceID } from '@kenzap/k-cloud';
import { priceFormat, getPageNumber, makeNumber, parseVariations, timeConverterAgo, escape, onlyNumbers, unescape } from "../_/_helpers.js"

export const tables = {

    _this: null, 
    state: { orderSingle: null },
    render: (_this, e) => {

        if(_this.state.settings.tables != "1") return;

        let s = '';
       
        let html = `<div id="table_list" class="row row-cols-1 row-cols-lg-5 row-cols-md-3 row-cols-sm-2 g-3 mb-3">`;
        // console.log(_this.state.settings.table_list);
        _this.state.settings.table_list.trim().split('\n').forEach((el, i) => {

            html += tables.structTableCard(_this, i, el, { orders: _this.state.orders, meta: _this.state.meta }); 

        });

        html += '</div>';

        if(document.querySelector('#table_list')) document.querySelector('#table_list').remove();
        
        document.querySelector('#orders-after-header').insertAdjacentHTML("beforeend", html);
        
    },
    // render: (_this, e) => {

    //     if(_this.state.settings.tables != "1") return;

    //     let s = '';

    //     // do API query
    //     fetch('https://api-v1.kenzap.cloud/', {
    //         method: 'post',
    //         headers: headers,
    //         body: JSON.stringify({
    //             query: {
    //                 orders: {
    //                     type:           'find',
    //                     key:            'ecommerce-order',
    //                     fields:         '*',
    //                     term_relation:  'OR',
    //                     term:       [
    //                         { 
    //                             type: 'text',
    //                             field: 'status',
    //                             relation: '=',
    //                             value: 'new'
    //                         },
    //                         { 
    //                             type: 'text',
    //                             field: 'status',
    //                             relation: '=',
    //                             value: 'paid'
    //                         },
    //                         { 
    //                             type: 'text',
    //                             field: 'status',
    //                             relation: '=',
    //                             value: 'processing'
    //                         }
    //                     ],
    //                     limit:      500,
    //                     search:     {
    //                         field: 'from',
    //                         s: s
    //                     },
    //                     sortby:     {
    //                         field: 'created',
    //                         order: 'DESC'
    //                     }
    //                 }
    //             }
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(response => {

    //         // hide UI loader
    //         hideLoader();

    //         if(response.success){
                
    //             // console.log("haha");
    //             // console.log(response.meta);
                 
    //             let html = `<div id="table_list" class="row row-cols-1 row-cols-lg-5 row-cols-md-3 row-cols-sm-2 g-3 mb-3">`;
    //             // console.log(_this.state.settings.table_list);
    //             _this.state.settings.table_list.trim().split('\n').forEach((el, i) => {

    //                 html += tables.structTableCard(_this, i, el, response); 

    //             });

    //             html += '</div>';

    //             if(document.querySelector('#table_list')) document.querySelector('#table_list').remove();
                
    //             document.querySelector('#orders-after-header').insertAdjacentHTML("beforeend", html);
                

    //         }else{

    //             parseApiError(response);
    //         }
    //     })
    //     .catch(error => { parseApiError(error); });
        
    // },
    renderField: (_this, a, item, x) => {

        let html = '';
        switch(a.e){
            
            // case 'text': return '<input type="text" class="form-control pv" id="'+x+'" value="'+b+'">';

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
    
    response.orders.forEach((o, index) => { if(o.table == el+''){ ii = index; order = o; } });

    order = order ? order : {};
    order['id'] = order.id ? order.id : "";
    order['_id'] = order._id ? order._id : "";
    order['created'] = order.created ? order.created : "";

    let classes = "";

    switch(order['status']){

        case 'new': classes = "text-dark bg-warning";  break;
        case 'paid': classes = "text-white bg-primary"; break;
        case 'processing': classes = "text-white bg-primary"; break;
        case 'completed': classes = "text-white bg-success"; break;
        case 'failed': classes = "text-white bg-danger"; break;
        case 'refunded': classes = "text-white bg-danger"; break;
        default: classes = "text-white bg-secondary"; break;
    }

    return `
    <div class="col">
        <div class="card ${ classes } ${ order._id ? "view-order po" : "view-order po" } mb-2 " data-id="${ order._id ? order._id : "" }" data-table="${ el }" ${ order._id ? 'data-index="' + ii + '"' : '' }" style="max-width: 18rem;">
            <div class="card-header">${ order.id ? "#"+order.id : "&nbsp;" }</div>
            <div class="card-body d-flex align-items-center justify-content-center" style="min-height:140px;">
                <h5 class="card-title">${ __("Table %1$", el) }</h5>
            </div>
            <div class="card-footer">${ order['created'] ? timeConverterAgo(__, response.meta.time, order['created']) : '&nbsp;' }</div>
        </div>
    </div>`;
  }
}