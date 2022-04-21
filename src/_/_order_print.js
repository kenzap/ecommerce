import { headers, showLoader, hideLoader, onClick, onKeyUp, parseApiError, spaceID } from '@kenzap/k-cloud';
import { timeConverterAgo, priceFormat, getPageNumber, makeNumber, parseVariations, escape, unescape } from "../_/_helpers.js"
import { preview } from "../_/_order_preview.js"

export const print = {

    viewOrder: (_this) => {

        print._this = _this;
        onClick('.print-order', (e) => { print.renderOrder(_this, e); });
    },
    renderOrder: (_this, e) => {

        e.preventDefault();
        
        let modal = document.querySelector(".order-modal");
        _this.modalCont = new bootstrap.Modal(modal);
        _this.modalOpen = true;
        let i = e.currentTarget.dataset.index; // _this.state.orderPreviewIndex = i;
        _this.state.orderSingle = _this.state.orders[i];

        // to properly handle back button on mobiles
        history.pushState({pageID: 'orders'}, 'Orders', window.location.pathname + window.location.search + "#printing");

        modal.addEventListener('hide.bs.modal', function (e) {
           
            if (window.location.href.indexOf("#printing")==-1) return;

            history.pushState({pageID: 'orders'}, 'Orders', window.location.pathname + window.location.search);
        });

        let html = "";

        // header
        html += `
        <table class="table table-hover table-borderless align-middle table-p-list" style="min-width:200px;">
            <tr>
                <td class="text-center p-1" colspan="3">Order #2334</td>
            </tr>
            <tr>
                <td class="text-center p-1" colspan="3">25 Mar 2022</td>
            </tr>
            <tr>
                <td class="text-center p-1" colspan="3">Fu Zhen Seafood Restaurant</td>
            </tr>
            <tr>
                <td class="text-center" colspan="3"><hr /></td>
            </tr>`;
        
            _this.state.orderSingle.items.forEach((item, x) => { console.log( _this.state.orderSingle.items[x]); html += preview.structOrderItemTable(_this, x, _this.state.orderSingle.items, false, false) } );

            html += `
            <tr>
                <td class="text-center p-1" colspan="3"><hr /></td>
            </tr>`;

            if(_this.state.orderSingle.total) html += `
            <tr>
                <td class="text-end p-1" colspan="3">
                    <div class="mb-0order-row elipsized ">
                        <b>Subtotal</b><div class="order-form ms-2 d-inline-block" >${ priceFormat(print._this, _this.state.orderSingle.total) }</div>
                    </div>
                </td>
            <tr>`;
            
            if(_this.state.orderSingle.total_tax) html += `
            <tr>
                <td class="text-end p-1" colspan="3">
                    <div class="mb-0 order-row elipsized ">
                        <b>GST</b><div class="order-form ms-2 d-inline-block" >${ priceFormat(print._this, _this.state.orderSingle.total_tax) }</div>
                    </div>
                </td>
            <tr>`;

            if(_this.state.orderSingle.total_with_tax) html += `
            <tr>
                <td class="text-end p-1" colspan="3">
                    <div class="mb-0 order-row elipsized ">
                        <b>Total</b><div class="order-form ms-2 d-inline-block" >${ priceFormat(print._this, _this.state.orderSingle.total_with_tax) }</div>
                    </div>
                </td>
            <tr>`;`;

            // html += `
            // <tr>
            //     <td class="text-center" colspan="3"><hr /></td>
            // </tr>`;
        html += `
        </table>
        
        
        `;

        modal.querySelector(".modal-dialog").classList.add('modal-dialog-wide');
        modal.querySelector(".modal-header").classList.add('d-none');
        modal.querySelector(".modal-footer").classList.add('d-none');
        modal.querySelector(".modal-body").innerHTML = html;
        _this.modalCont.show();
        
        // modal.querySelector(".modal-header .modal-title").innerHTML =  _this.state.orderSingle['from'];
        // modal.querySelector(".modal-footer .btn-primary").innerHTML = _this.state.orderSingle._id == "new" ? __('Create') : __('Update');
        // modal.querySelector(".btn-primary").dataset.loading = false;
        // modal.querySelector(".modal-footer .btn-secondary").innerHTML = __('Close');

        
        // modal.addEventListener('hide.bs.modal', function (e) {
           
        //     if (window.location.href.indexOf("#editing")==-1) return;

        //     history.pushState({pageID: 'orders'}, 'Orders', window.location.pathname + window.location.search);
            
        //     // history.pushState({pageID: 'orders'}, 'Orders', window.location.href);
        //     // if(_this.modalOpen) history.back();

        //     // _this.modalCont = null;
        // });

        window.print();
    }
}