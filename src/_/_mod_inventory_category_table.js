import { H, __html, __attr, html, attr, showLoader, hideLoader, parseApiError, getCookie, onClick, onKeyUp, spaceID, simulateClick, getSiteId, toast, link } from '@kenzap/k-cloud';
import { formatStatus, priceFormat, formatTime, stockBadge, simpleTags, getPageNumber, getProductId, onlyNumbers, formatTimeDetailed, mt } from "../_/_helpers.js"

// html inventory list loader
export const categoryTable = (_this) => {

    // if(!_this.state.response.product.stock.inventory) _this.state.response.product.stock.inventory = [];

    // e.preventDefault();

    // document.querySelector(".add-inventory").dataset.assigned = true;

    let modal = document.querySelector(".modal");
    _this.state.modalCont = new bootstrap.Modal(modal);
    modal.querySelector(".modal-dialog").classList.add('modal-lg');
    modal.querySelector(".modal-title").innerHTML = __html('Sort by Tag');
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
                        <tbody id="category-list">
                            <tr>
                                <td >
                                    ${ __html("Loading") }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    let loadCategories = (_this) => {

        let tags = [];

        // send data
        let limit = 250;
        let s = "";
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    inventory: {
                        type:       'find',
                        key:        'ecommerce-inventory',
                        fields:     ['_id', 'tags'],
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
                        // search:     {                                                                               // if s is empty search query is ignored
                        //                 field: 'title',
                        //                 s: 'ASC'
                        //             },
                        // sortby:     {
                        //                 field: 'created',
                        //                 order: 'DESC'
                        //             },
                        term:          [
                            {
                                type:       'string',
                                field:      'tags',
                                value:      '[]',
                                relation:   '!='
                            }
                        ]
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
                    
                    document.querySelector("#category-list").innerHTML = `<tr><td colspan="2" class="form-text">${ __html("No data to display.") }</td></tr>`;
                    return;
                }

                // pre-process categories
                console.log(response.inventory);
                response.inventory.forEach((inventory, i) => {

                    inventory.tags.forEach((tag, i) => {

                        let exists = tags.filter(cat => { return tag == cat.title })
                        if(exists.length == 0) tags.push({ title: tag })
                    });

                });
                console.log(tags);
                
                // load table data
                document.querySelector("#category-list").innerHTML = tags.map((tag, i) => {

                    return `
                        <tr>
                            <td class="add-inventory-item" data-tag="${ attr(tag.title) }">
                                ${ html(tag.title) }
                            </td>
                            <td class="text-end d-none- add-inventory-item" data-index="${i}" data-tag="${ attr(tag.title) }">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle text-success po" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </td>
                        </tr>`;

                }).join('');

                // only numbers
                // onlyNumbers('.stock_amount', [8, 46, 190, 189]);

                // add inventory item
                [...document.querySelectorAll(".add-inventory-item")].forEach(item => {

                    item.addEventListener('click', el => {

                        _this.state.tag = item.dataset.tag;

                        // alert(_this.state.tag);

                        _this.state.modalCont.hide();

                        _this.getData();
                    });
                });

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    }

    loadCategories(_this);

    // btn-inventory-add

    _this.state.modalCont.show();

}