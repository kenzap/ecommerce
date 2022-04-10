(function (kCloud) {
    'use strict';

    const getProductId = () => {
        
        let urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get('id') ? urlParams.get('id') : "";
        return id;
    };

    const formatPrice = (price) => {

        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD", });
        if(typeof(price) === 'undefined' || price == '') price = 0;
        price = parseFloat(price);
        price = formatter.format(price);
        return price;
    };

    // initiate header and related scripts

    // categories input tags
    const simpleTags = (element) => {

        if (!element) {
            throw new Error("DOM Element is undifined! Please choose HTML target element.")
        }

        let DOMParent = element;
        let DOMList;
        let DOMInput;
        let dataAttribute;
        let arrayOfList;

        function DOMCreate() {
            let ul = document.createElement("ul");
            let input = document.createElement("input");

            input.setAttribute('placeholder', 'new category');

            DOMParent.appendChild(ul);
            DOMParent.appendChild(input);

            // first child is <ul>
            DOMList = DOMParent.firstElementChild;
            // last child is <input>
            DOMInput = DOMParent.lastElementChild;
        }

        function DOMRender() {
            // clear the entire <li> inside <ul>
            DOMList.innerHTML = "";

            // render each <li> to <ul>
            arrayOfList.forEach((currentValue, index) => {

                if (currentValue) {

                    let li = document.createElement("li");
                    li.innerHTML = `${currentValue} <a>&times;</a>`;
                    li.querySelector("a").addEventListener("click", function () {
                        onDelete(index);
                    });

                    DOMList.appendChild(li);
                }
            });

            setAttribute();
        }

        function onKeyUp() {
            DOMInput.addEventListener("keyup", function (event) {
                let text = this.value.trim();

                // check if ',' or 'enter' key was press
                if (text.includes(",") || event.keyCode === 13) {
                    // check if empty text when ',' is remove
                    if (text.replace(",", "") !== "") {
                        // push to array and remove ','
                        arrayOfList.push(text.replace(",", ""));
                    }
                    // clear input
                    this.value = "";
                }

                DOMRender();
            });
        }

        function onDelete(id) {
            arrayOfList = arrayOfList.filter(function (currentValue, index) {
                if (index === id) {
                    return false
                }
                return currentValue
            });

            DOMRender();
        }

        function getAttribute() {
            dataAttribute = DOMParent.getAttribute("data-simple-tags");
            dataAttribute = dataAttribute.split(",");

            // store array of data attribute in arrayOfList
            arrayOfList = dataAttribute.map((currentValue) => {
                return currentValue.trim()
            });
        }

        function setAttribute() {
            DOMParent.setAttribute("data-simple-tags", arrayOfList.toString());
        }

        getAttribute();
        DOMCreate();
        DOMRender();
        onKeyUp();
    };

    // // html product list loader
    // export const productListContent = (__) => {

    //     return `
    //     <div class="container">

    //         <div class="d-flex justify-content-between bd-highlight mb-3">
    //             <nav class="bc" aria-label="breadcrumb"></nav>
    //             <button class="btn btn-primary btn-add" type="button">${ __('Add product') }</button>
    //         </div>
     
    //         <div class="row">
    //             <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
    //                 <div class="card border-white shadow-sm">
    //                     <div class="card-body">
    //                         <div class="no-footer">
    //                             <div class="row">
    //                                 <div class="col-sm-12">
    //                                     <div class="table-responsive">
    //                                         <table class="table table-hover table-borderless align-middle table-striped table-p-list" style="min-width: 800px;">
    //                                             <thead>
                                                    
    //                                             </thead>
    //                                             <tbody>

    //                                             </tbody>
    //                                         </table>
    //                                     </div>
    //                                 </div>
    //                             </div>

    //                             <div class="row">
    //                                 <div class="col-sm-12 col-md-5">
    //                                 <div class="dataTables_info mt-3 text-secondary fw-lighter" id="listing_info" role="status" aria-live="polite">&nbsp;</div>
    //                                 </div>
    //                                 <div class="col-sm-12 col-md-7">
    //                                 <div class="dataTables_paginate paging_simple_numbers mt-3" id="listing_paginate"></div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>`;

    // }

    // // html product list loader
    // export const productEditContent = (__) => {

    //     return `
    //     <div class="container p-edit">
    //         <div class="mb-3">
    //             <nav class="bc" aria-label="breadcrumb"></nav>
    //         </div>
    //         <div class="row">
    //             <div class="col-lg-9 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
    //                 <div class="sections" id="sections" role="tablist" style="width:100%;">

    //                     <div class="row">
    //                     <div class="col-12 grid-margin stretch-card">
    //                         <div class="card border-white shadow-sm p-sm-3">
    //                         <div class="card-body">

    //                             <div class="landing_status"></div>
    //                             <input type="hidden" class="form-control" id="landing-slug" value="">

    //                             <h4 id="elan" class="card-title mb-4">Description</h4>

    //                             <div id="placeholders" >

    //                             <div class="mb-3">
    //                                 <label class="banner-title-l form-label" for="p-title">Title</label>
    //                                 <input type="text" class="form-control inp" id="p-title" placeholder="Sushi set..">
    //                                 <p class="card-description">
    //                                 <a target="_blank" style="float:right;margin-top:4px;display:none;" href="https://kenzap.com/post/kenzap-marketplace-listing-title-guidelines/">Title guidelines.</a>
    //                                 </p>
    //                             </div>

    //                             <div class="mb-3">
    //                                 <label class="banner-descshort-l form-label" for="p-sdesc">Short Description</label>
    //                                 <textarea class="form-control inp" id="p-sdesc" placeholder="  " maxlength="120" rows="2"></textarea>
    //                             </div>

    //                             <div class="mb-3">
    //                                 <label class="banner-descshort-l form-label" for="desc">Images</label>
    //                                 <div class="clearfix"></div>
    //                                 <div class="ic"></div>
    //                                 <div class="clearfix"></div>
    //                             </div>

    //                             <div class="mb-3">
    //                                 <div class="clearfix"></div>
    //                                 <div style="clear:both;margin-top:16px;"></div>
    //                                 <label class="banner-descshort-l form-label" for="p-desc">Description</label>
    //                                 <textarea class="form-control inp" id="p-ldesc" placeholder=" " maxlength="2000" rows="10"></textarea>
    //                             </div>

    //                             <div class="mb-3 mw" >
    //                                 <div class="list-wrapper">
    //                                 <ul class="d-flex flex-column-reverse features">
    //                                 </ul>
    //                                 </div>
    //                                 <p class="card-description"> </p>
    //                             </div>

    //                             <div class="bg-light price_group mt-3 mb-3 p-4">
    //                                 <h4 class="card-title mb-3">Price</h4>
    //                                 <div class="price_group_base">
    //                                 <div class="mb-3 mw" >
    //                                     <div class="input-group">

    //                                         <div id="p-price-c">
    //                                             <label for="p-price" class="form-label">Price normal <span class="lang"></span></label>
    //                                             <div class="input-group">

    //                                             <span class="input-group-text">$</span>
    //                                             <input id="p-price" type="text" class="form-control inp" placeholder="55.00" autocomplete="off" >

    //                                             </div>
    //                                         </div>
    //                                         <div id="p-priced-c">
    //                                             <label for="p-priced" class="form-label">Discounted <span class="lang"></span></label>
    //                                             <input id="p-priced" type="text" class="form-control inp" placeholder="45.00" autocomplete="off" >
    //                                         </div>

    //                                     </div>
    //                                     <div class="add-mix-ctn"><a class="add-mix-block" href="#" data-action="add">+ add variation</a></div>
    //                                 </div>

    //                                 <div class="variation-blocks">

    //                                 </div>

    //                                 <div style='margin:24px 0 48px;border-bottom:0px solid #ccc;'></div>

    //                                 <div class="mb-3 mw" >
    //                                     <h4 id="elan" class="card-title">Inventory</h4>
    //                                     <label for="p-sku" class="form-label">SKU <span class="lang"></span></label>
    //                                     <div class="input-group">
    //                                     <input id="p-sku" type="text" style="width:100%;" class="form-control inp" placeholder="" maxlength="200">
    //                                     <p class="card-description">
    //                                         SKU hint
    //                                     </p>
    //                                     </div>
    //                                 </div>

    //                                 </div>
    //                             </div>
    //                             </div>

    //                             <div class="desc-repeater-cont">

    //                             </div>

    //                             <p class="card-description"> &nbsp;</p>

    //                         </div>
    //                         </div>
    //                     </div>

    //                     </div>

    //                 </div>
    //             </div>
    //             <div class="col-lg-3 grid-margin grid-margin-lg-0 grid-margin-md-0">

    //                 <div class="row">
    //                 <div class="col-12 grid-margin stretch-card">
    //                     <div class="card border-white shadow-sm p-sm-3">
    //                     <div class="card-body">

    //                         <h4 class="card-title" style="display:none;">General</h4>
    //                         <div class="landing_status"></div>
    //                         <input type="hidden" class="form-control" id="landing-slug" value="">

    //                         <h4 id="elan" class="card-title mb-4">Status</h4>
    //                         <div id="status-cont" class="mb-3">

    //                         <div class="col-sm-12">
    //                             <div class="form-check">
    //                             <label class="form-check-label status-publish form-label">
    //                                 <input type="radio" class="form-check-input" name="p-status" id="p-status1" value="1" >
    //                                 Published
    //                             </label>
    //                             </div>
    //                         </div>

    //                         <div class="col-sm-12">
    //                             <div class="form-check">
    //                             <label class="form-check-label status-draft form-label">
    //                                 <input type="radio" class="form-check-input" name="p-status" id="p-status0" value="0" >
    //                                 Draft
    //                             </label>
    //                             </div>
    //                         </div>
    //                         </div>

    //                         <h4 id="elan" class="card-title mb-4">Categories</h4>
    //                         <div id="p-cats" class="simple-tags mb-4" data-simple-tags=""></div>
    //                         <div class="clearfix"> </div>

    //                         <div class="d-grid gap-2">
    //                         <button class="btn btn-primary btn-save" type="button">Save</button>
    //                         </div>

    //                     </div>
    //                     </div>
    //                 </div>
    //                 </div>

    //             </div>
    //             </div>
    //             </div>



    //             </div>
    //             </div>
    //             </div>


    //         <div class="modal p-modal" tabindex="-1">
    //           <div class="modal-dialog">
    //             <div class="modal-content">
    //                 <div class="modal-header">
    //                 <h5 class="modal-title"></h5>
    //                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //                 </div>
    //                 <div class="modal-body">
                    
    //                 </div>
    //                 <div class="modal-footer">
    //                 <button type="button" class="btn btn-primary"></button>
    //                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
    //                 </div>
    //             </div>
    //           </div>
    //         </div>
            
    //         <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center" >   
    //           <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
    //             <div class="d-flex">  
    //               <div class="toast-body"></div>
    //               <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    //             </div>
    //           </div>
    //         </div>
    //     `;
    // }

    // export const settingsContent = (__) => {

    //     return `
    //     <div class="container p-edit">
    //         <div class="d-flex justify-content-between bd-highlight mb-3">
    //             <nav class="bc" aria-label="breadcrumb"></nav>
    //             <button class="btn btn-primary btn-save" type="button">${ __('Save changes') }</button>
    //         </div>
    //         <div class="row">
    //             <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
    //               <div class="card border-white shadow-sm p-sm-3">
    //                 <nav class="nav tab-content mb-4" role="tablist">
    //                     <div class="nav nav-tabs" id="nav-tab" role="tablist">
    //                         <a class="nav-link active" id="nav-notifications-link" data-bs-toggle="tab" data-bs-target="#nav-notifications" type="button" role="tab" aria-controls="nav-notifications" aria-selected="true" href="#">${ __('Notifications') }</a>
    //                         <a class="nav-link" id="nav-currency-link" data-bs-toggle="tab" data-bs-target="#nav-currency" type="button" role="tab" aria-controls="nav-currency" aria-selected="true" href="#">${ __('Currency') }</a>
    //                         <a class="nav-link" id="nav-payout-link" data-bs-toggle="tab" data-bs-target="#nav-payout" type="button" role="tab" aria-controls="nav-payout" aria-selected="true"  href="#">${ __('Payout') }</a>
    //                         <a class="nav-link" id="nav-tax-link" data-bs-toggle="tab" data-bs-target="#nav-tax" type="button" role="tab" aria-controls="nav-tax" aria-selected="true"  href="#">${ __('Tax') }</a>
    //                     </div>
    //                 </nav>
    //                 <div class="card-body tab-content" id="nav-tabContent">
    //                     <div class="tab-pane fade show active" id="nav-notifications" role="tabpanel" aria-labelledby="nav-notifications-link">
    //                     <h4 id="gen" class="card-title mb-4">${ __('Notification settings') }</h4>
    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('New order') }</label>
    //                           <div class="col-sm-9">
    //                             <select id="notify_new_order" class="form-control inp" name="notify_new_order" data-type="select">
    //                                 <option value="">${ __('None') }</option>
    //                                 <option value="client">${ __('Client') }</option>
    //                                 <option value="admin">${ __('Administrator') }</option>
    //                                 <option value="both">${ __('Client and administrator') }</option>
    //                             </select>
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="notify_new_order_emails" type="text" class="form-control inp" name="notify_new_order_emails" data-type="emails">
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Cancelled order') }</label>
    //                           <div class="col-sm-9">
    //                             <select id="notify_cancel_order" class="form-control inp" name="notify_cancel_order" data-type="select">
    //                                 <option value="">${ __('None') }</option>
    //                                 <option value="client">${ __('Client') }</option>
    //                                 <option value="admin">${ __('Administrator') }</option>
    //                                 <option value="both">${ __('Client and administrator') }</option>
    //                             </select>
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="notify_cancel_order_emails" type="text" class="form-control inp" name="notify_cancel_order_emails" data-type="emails">
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Processing order') }</label>
    //                           <div class="col-sm-9">
    //                             <select id="notify_proc_order" class="form-control inp" name="notify_proc_order" data-type="select">
    //                                 <option value="">${ __('None') }</option>
    //                                 <option value="client">${ __('Client') }</option>
    //                                 <option value="admin">${ __('Administrator') }</option>
    //                                 <option value="both">${ __('Client and administrator') }</option>
    //                             </select>
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="notify_proc_order_emails" type="text" class="form-control inp" name="notify_proc_order_emails" data-type="emails">
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Refunded order') }</label>
    //                           <div class="col-sm-9">
    //                             <select id="notify_refunded_order" class="form-control inp" name="notify_refunded_order" data-type="select">
    //                                 <option value="">${ __('None') }</option>
    //                                 <option value="client">${ __('Client') }</option>
    //                                 <option value="admin">${ __('Administrator') }</option>
    //                                 <option value="both">${ __('Client and administrator') }</option>
    //                             </select>
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="notify_refunded_order_emails" type="text" class="form-control inp" name="notify_refunded_order_emails" data-type="emails">
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Refunded order') }</label>
    //                           <div class="col-sm-9">
    //                             <select id="notify_completed_order" class="form-control inp" name="notify_completed_order" data-type="select">
    //                                 <option value="">${ __('None') }</option>
    //                                 <option value="client">${ __('Client') }</option>
    //                                 <option value="admin">${ __('Administrator') }</option>
    //                                 <option value="both">${ __('Client and administrator') }</option>
    //                             </select>
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="notify_completed_order_emails" type="text" class="form-control inp" name="notify_completed_order_emails" data-type="emails">
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>

    //                     <br>
    //                     <hr>
    //                     <br>
    //                     <br>
    //                     </div>
    //                     <div class="tab-pane fade" id="nav-currency" role="tabpanel" aria-labelledby="nav-currency-link">
    //                     <h4 id="gen" class="card-title mb-4">${ __('Currency settings') }</h4>
    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Currency') }</label>
    //                           <div class="col-sm-9">
    //                             <select id="currency" class="form-control inp" name="currency" data-type="select">
    //                               <?php include('inc/select-currencies.php'); ?>
    //                             </select>
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Currency symbol') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="currency_symb" type="text" class="form-control inp" name="currency_symb" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>

    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Currency position') }</label>
    //                           <div class="col-sm-9">
    //                             <select id="currency_symb_loc" class="form-control inp" name="currency_symb_loc" data-type="select">
    //                               <option value="left">${ __('Left') }</option>
    //                               <option value="right">${ __('Right') }</option>
    //                               <option value="left_space">${ __('Left with space') }</option>
    //                               <option value="right_space">${ __('Right with space') }</option>
    //                             </select>
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">

    //                       </div>
    //                     </div>

    //                     <br>
    //                     <hr>
    //                     <br>
    //                     <br>
    //                     </div>
    //                     <div class="tab-pane fade" id="nav-tax" role="tabpanel" aria-labelledby="nav-tax-link">
    //                     <h4 id="tax" class="card-title mb-4">${ __('Your tax informatio') }</h4>
    //                     <p class="card-description"> ${ __('Invoice info (this information will be not revealed public)') } </p>

    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Tax ID') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="vat" type="text" class="form-control inp" name="vat" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Email') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="email" type="email" class="form-control inp" name="email" data-type="email">
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Company') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="company" type="text" class="form-control inp inp" name="company" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Type') }</label>
    //                           <div class="col-sm-4">
    //                             <div class="form-check">
    //                               <label class="form-check-label">
    //                                 <input type="radio" class="form-check-input inp" name="entity_type" id="entity_type" value="individual" data-type="radio">
    //                                 ${ __('Individual') }
    //                                 <i class="input-helper"></i></label>
    //                             </div>
    //                           </div>
    //                           <div class="col-sm-5">
    //                             <div class="form-check">
    //                               <label class="form-check-label">
    //                                 <input type="radio" class="form-check-input inp" name="entity_type" id="entity_type" value="business" data-type="radio">
    //                                 ${ __('Business') }
    //                                 <i class="input-helper"></i></label>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <p class="card-description">
    //                         ${ __('Address') }
    //                     </p>
    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label"> ${ __('Address 1') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="addr1" type="text" class="form-control inp" name="addr1" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('State') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="state" type="text" class="form-control inp" name="state" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Address 2') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="addr2" type="text" class="form-control inp" name="addr2" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Postcode') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="post" type="text" class="form-control inp" name="post" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('City') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="city" type="text" class="form-control inp" name="city" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Country') }</label>
    //                           <div class="col-sm-9">
    //                             <select id="country" class="form-control inp" name="country" data-type="select">
    //                               <?php include('inc/select-countries.php'); ?>
    //                             </select>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>

    //                     <br>
    //                     <hr>
    //                     <br>
    //                     <br>
    //                     </div>
    //                     <div class="tab-pane fade" id="nav-payout" role="tabpanel" aria-labelledby="nav-payout-link">
    //                     <h4 id="payout" class="card-title mb-4" title="payouts">${ __('Payout data') }</h4>
    //                     <p class="card-description">${ __('This information is used to process your earnings as part of Kenzap Affiliate or Kenzap Designing programs.') }</p>

    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Bank account holder\'s name') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="y1" type="text" class="form-control inp" name="y1" minlength="2" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('IBAN/Account Nr.') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="y2" type="text" class="form-control inp" name="y2" minlength="2" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('SWIFT Code') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="y3" type="text" class="form-control inp" name="y3" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Bank name') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="y4" type="text" class="form-control inp" name="y4" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div class="row">
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Bank branch city') }</label>
    //                           <div class="col-sm-9">
    //                             <input id="y5" type="text" class="form-control inp" name="y5" data-type="text">
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div class="col-lg-6">
    //                         <div class="form-group row mb-3 mt-1">
    //                           <label class="col-sm-3 col-form-label">${ __('Bank branch country') }</label>
    //                           <div class="col-sm-9">
    //                             <select id="y6" class="form-control inp" name="y6" data-type="select">
    //                               <?php include('inc/countries.php'); ?>
    //                             </select>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     </div>

    //                 </div>
    //               </div>
    //             </div>
    //         </div>
    //     </div>
        
    //     <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center" >   
    //       <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
    //         <div class="d-flex">  
    //           <div class="toast-body"></div>
    //           <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    //         </div>
    //       </div>
    //     </div>
    //     `;
    // }

    // export const homeContent = (__) => {

    //     return `
    //         <div class="container p-edit">
    //             <div class="d-flex justify-content-between bd-highlight mb-3">
    //                 <nav class="bc" aria-label="breadcrumb"></nav>
                    
    //             </div>
    //             <div class="row">
    //                 <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
    //                     <div class="card border-white shadow-sm p-sm-3">
    //                         <nav class="nav flex-column">
    //                             <a class="nav-link active fs-4" aria-current="page" href="/product-list/">
    //                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list-stars me-3" viewBox="0 0 16 16">
    //                             <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"></path>
    //                             <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z"></path>
    //                             </svg>Product list</a>

    //                             <hr>
                                                   
    //                             <a class="nav-link fs-4" href="/orders/">
    //                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart-check mb-1 me-3" viewBox="0 0 16 16">
    //                             <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
    //                             <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    //                             </svg>Orders</a>

    //                             <hr>
                                                    
    //                             <a class="nav-link fs-4" href="/settings/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-gear mb-1 me-3" viewBox="0 0 16 16">
    //                             <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"></path>
    //                             <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"></path>
    //                             </svg>Settings</a>

    //                             <hr>
                                                    
    //                             <a class="nav-link fs-4 disabled" href="/analytics/" tabindex="-1" aria-disabled="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-graph-up me-3" viewBox="0 0 16 16">
    //                             <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"></path>
    //                             </svg>Analytics</a>
    //                         </nav>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     `;
    // }

    // export const ordersContent = (__) => {

    //     return `
    //       <div class="container ec-orders">
    //         <div class="d-flex justify-content-between bd-highlight mb-3">
    //             <nav class="bc" aria-label="breadcrumb"></nav>
    //         </div>
    //         <div class="row">
    //           <div class="col-md-12 page-title">
    //             <div class="st-opts st-table mb-3 dropdown">
    //                 <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="order-status" data-id="status" data-value="all" data-bs-toggle="dropdown" aria-expanded="false">
    //                   All
    //                 </a>
    //                 <ul class="dropdown-menu" aria-labelledby="order-status">
    //                   <li><a class="dppi dropdown-item" data-key="" href="#" >All</a></li>
    //                   <li><a class="dppi dropdown-item" data-key="new" href="#" >New</a></li>
    //                   <li><a class="dppi dropdown-item" data-key="processing" href="#" >Processing</a></li>
    //                   <li><a class="dppi dropdown-item" data-key="completed" href="#" >Completed</a></li>
    //                   <li><a class="dppi dropdown-item" data-key="canceled" href="#" >Canceled</a></li>
    //                   <li><a class="dppi dropdown-item" data-key="failed" href="#" >Failed</a></li>
    //                 </ul>
    //             </div>
    //             <div class="st-opts" >
    //               <div class="input-group-sm mb-0 justify-content-start" >
    //                 <input id="usearch" type="text" class="inp form-control" placeholder="${ __('Search order') }">
    //               </div>
    //               <!-- <a id="viewSum" href="#" style="margin-left:16px;">view summary</a> -->
    //             </div>
    //           </div>
    //         </div>

    //         <div class="row">
    //           <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
    //             <div class="card border-white shadow-sm">
    //               <div class="card-body">
     
    //                 <div class="table-responsive">
    //                   <table class="table table-hover table-borderless align-middle table-striped table-p-list">
    //                     <thead>
    //                       <tr>

    //                         <th>From</th>
    //                         <th>Status</th>
    //                         <th>Total</th>
    //                         <th>Time</th>
    //                         <th></th>
    //                       </tr>
    //                     </thead>
    //                     <tbody class="list">

    //                     </tbody>
    //                   </table>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div class="modal order-modal" tabindex="-1">
    //         <div class="modal-dialog ">
    //           <div class="modal-content">
    //               <div class="modal-header">
    //                 <h5 class="modal-title"></h5>
    //                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //               </div>
    //               <div class="modal-body">
                  
    //               </div>
    //               <div class="modal-footer">
    //                 <button type="button" class="btn btn-primary"></button>
    //                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
    //               </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center" >   
    //         <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
    //           <div class="d-flex">  
    //             <div class="toast-body"></div>
    //             <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    //           </div>
    //         </div>
    //       </div>
    //     `;
    // }

    // html product list loader
    const HTMLContent = (__) => {

    return `
  <div class="container p-edit">
    <div class="d-flex justify-content-between bd-highlight mb-3">
        <nav class="bc" aria-label="breadcrumb"></nav>
        
    </div>
    <div class="row">
        <div class="col-lg-9 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
            <div class="sections" id="sections" role="tablist" style="width:100%;">

                <div class="row">
                    <div class="col-12 grid-margin stretch-card">
                        <div class="card border-white shadow-sm p-sm-3">
                            <div class="card-body">

                                <div class="landing_status"></div>
                                <input type="hidden" class="form-control" id="landing-slug" value="">

                                <h4 id="elan" class="card-title mb-4">${ __('Description') }</h4>

                                <div id="placeholders">

                                    <div class="mb-3">
                                        <label class="banner-title-l form-label" for="p-title">${ __('Title') }</label>
                                        <input type="text" class="form-control inp" id="p-title"
                                            placeholder="${ __('Sushi set..') }">
                                        <p class="form-text"> </p>
                                    </div>

                                    <div class="mb-3">
                                        <label class="banner-descshort-l form-label" for="p-sdesc">${ __('Short Description') }</label>
                                        <textarea class="form-control inp" id="p-sdesc" placeholder="  " maxlength="120" rows="2"></textarea>
                                    </div>

                                    <div class="mb-3">
                                        <label class="banner-descshort-l form-label" for="desc">${ __('Images') }</label>
                                        <div class="clearfix"></div>
                                        <div class="ic"></div>
                                        <div class="clearfix"></div>
                                    </div>

                                    <div class="mb-3">
                                        <div class="clearfix"></div>
                                        <div style="clear:both;margin-top:16px;"></div>
                                        <label class="banner-descshort-l form-label" for="p-desc">${ __('Description') }</label>
                                        <textarea class="form-control inp" id="p-ldesc" placeholder=" " maxlength="2000" rows="10"></textarea>
                                    </div>

                                    <div class="mb-3 mw">
                                        <div class="list-wrapper">
                                            <ul class="d-flex flex-column-reverse features"> </ul>
                                        </div>
                                        <p class="form-text"> </p>
                                    </div>

                                    <div class="bg-light price_group mt-3 mb-3 p-4">
                                        <h4 class="card-title mb-3">${ __('Price') }</h4>
                                        <div class="price_group_base">
                                            <div class="mb-3 mw">
                                                <div class="input-group">

                                                    <div id="p-price-c">
                                                        <label for="p-price" class="form-label">${ __('Price normal') } <span class="lang"></span></label>
                                                        <div class="input-group">
                                                            <span class="input-group-text">$</span>
                                                            <input id="p-price" type="text" class="form-control inp" placeholder="55.00" autocomplete="off">
                                                        </div>
                                                    </div>
                                                    <div id="p-priced-c">
                                                        <label for="p-priced" class="form-label">${ __('Discounted') } <span class="lang"></span></label>
                                                        <input id="p-priced" type="text" class="form-control inp" placeholder="45.00" autocomplete="off">
                                                    </div>

                                                </div>
                                                <div class="add-mix-ctn"><a class="add-mix-block" href="#" data-action="add">${ __('+ add variation') }</a></div>
                                            </div>

                                            <div class="variation-blocks">

                                            </div>

                                            <div style='margin:24px 0 48px;border-bottom:0px solid #ccc;'></div>

                                            <div class="mb-3 mw">
                                                <h4 id="elan" class="card-title">${ __('Inventory') }</h4>
                                                <label for="p-sku" class="form-label"> <span class="lang"></span></label>
                                                <div class="input-group">
                                                    <input id="p-sku" type="text" style="width:100%;" class="form-control inp" placeholder="" maxlength="200">
                                                    <p class="form-text">
                                                        ${ __('Product stock unit identification number') } 
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="desc-repeater-cont">

                                </div>

                                <p class="form-text"> &nbsp;</p>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <div class="col-lg-3 grid-margin grid-margin-lg-0 grid-margin-md-0">

            <div class="row">
                <div class="col-12 grid-margin stretch-card">
                    <div class="card border-white shadow-sm p-sm-3">
                        <div class="card-body">

                            <h4 class="card-title" style="display:none;">${ __('General') }</h4>
                            <div class="landing_status"></div>
                            <input type="hidden" class="form-control" id="landing-slug" value="">

                            <h4 id="elan" class="card-title mb-4">Status</h4>
                            <div id="status-cont" class="mb-3">

                                <div class="col-sm-12">
                                    <div class="form-check">
                                        <label class="form-check-label status-publish form-label">
                                            <input type="radio" class="form-check-input" name="p-status"
                                                id="p-status1" value="1">
                                                ${ __('Published') }
                                        </label>
                                    </div>
                                </div>

                                <div class="col-sm-12">
                                    <div class="form-check">
                                        <label class="form-check-label status-draft form-label">
                                            <input type="radio" class="form-check-input" name="p-status"  id="p-status0" value="0">
                                            ${ __('Draft') }
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <h4 id="elan" class="card-title mb-4">Categories</h4>
                            <div id="p-cats" class="simple-tags mb-4" data-simple-tags=""></div>
                            <div class="clearfix"> </div>

                            <div class="d-grid gap-2">
                                <button class="btn btn-primary btn-save" type="button">${ __('Save') }</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  </div>

  <div class="modal p-modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-modal"></button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
            </div>
        </div>
    </div>
  </div>

  <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">
    <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive"
        aria-atomic="true" data-bs-delay="3000">
        <div class="d-flex">
            <div class="toast-body"></div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
  </div>
  `;
    };

    // js dependencies

    // where everything happens
    const _this = {

        init: () => {
            
            _this.getData(); 
        },
        state: {

            ajaxQueue: 0
        },
        getData: () => {

            // block ui during load
            kCloud.showLoader();

            let id = getProductId();
            kCloud.getSiteId();

            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: kCloud.headers,
                body: JSON.stringify({
                    query: {
                        user: {
                            type:       'authenticate',
                            fields:     ['avatar'],
                            token:      kCloud.getCookie('kenzap_token')
                        },
                        product: {
                            type:       'find',
                            key:        'ecommerce-product',
                            id:         id,   
                            fields:     ['_id', 'id', 'img', 'status', 'price', 'variations', 'priced', 'title', 'sdesc', 'ldesc', 'sku', 'cats', 'updated']
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
                kCloud.hideLoader();

                if (!response.success){ kCloud.parseApiError(response); return; }

                if (response.success){

                    // init header
                    kCloud.initHeader(response);
      
                    // get core html content 
                    document.querySelector('#contents').innerHTML = HTMLContent(__);

                    // check product response
                    if (response.product.length == 0) {
                 
                        // $(".list").html(/*html*/`<tr><td colspan="3">No products to display. Please create one by clicking on the button above.</td></tr>`);
                        // $( "#loader" ).fadeOut( "fast" );
                        _this.initListeners('all');
                        return;
                    }

                    // if(typeof(response.product[i].img) !== 'undefined' && response.product[i].img[0] == 'true') img = 'https://preview.kenzap.cloud/S1000452/_site/images/product-'+response.product[i].id+'-1-100x100.jpeg?1630925420';
                    
                    // bind frontend data
                    _this.renderPage(response.product);

                    // load images if any
                    _this.loadImages(response.product);

                    // init page listeners
                    _this.initListeners('all');
                }
            })
            .catch(error => { kCloud.parseApiError(error); });
        },
        renderPage: (product) => {

            let d = document;

            // initiate breadcrumbs
            kCloud.initBreadcrumbs(
                [
                    { link: kCloud.link('https://dashboard/kenzap.cloud'), text: __('Dashboard') },
                    { link: kCloud.link('/'), text: __('E-commerce') },
                    { link: kCloud.link('/product-list/'), text: __('Product List') },
                    { text: __('Product Edit') }
                ]
            );

            // general section
            d.querySelector("#p-title").value = product.title;
            d.querySelector("#p-sdesc").value = product.sdesc;
            d.querySelector("#p-ldesc").value = product.ldesc;

            // price section
            d.querySelector("#p-price").value = product.price;
            d.querySelector("#p-priced").value = product.priced;

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

            // init status box
            document.querySelector('#p-status'+product.status).checked = true;

            // init categories
            let pcats = document.querySelector('#p-cats');
            if (product.cats) pcats.setAttribute('data-simple-tags', product.cats);
            new simpleTags(pcats);
        },
        initListeners: (type = 'partial') => {

            console.log('initListeners ');

            // listeners that can be initiated only once
            if(type == 'all'){

                // product save button
                kCloud.onClick('.btn-save', _this.listeners.saveProduct);
                
                // modal success button
                kCloud.onClick('.p-modal .btn-primary', _this.listeners.modalSuccessBtn);
            }

            // add variation block
            kCloud.onClick('.add-mix-block', _this.listeners.addMixBlock);
            
            // edit variation block
            kCloud.onClick('.edit-block', _this.listeners.editBlock);

            // remove variation block
            kCloud.onClick('.remove-block', _this.listeners.removeBlock);

            // add variation option
            kCloud.onClick('.add-mix', _this.listeners.addMixOption);

            // remove variation option
            kCloud.onClick('.remove-option', _this.listeners.removeOption);

        },
        listeners: {

            editBlock: (e) => {

                e.preventDefault();

                let amb = document.querySelector('.add-mix-block');
                amb.dataset.action = 'edit';
                amb.dataset.index = e.currentTarget.dataset.index;
                setTimeout(() => kCloud.simulateClick(amb), 10);

                console.log('editBlock');
            },

            removeBlock: (e) => {

                e.preventDefault();

                let c = confirm(__('Remove entire block?'));
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
                let modal_title = __('Add Variation Block');
                let title = "";
                let type = "";
                let required = 0;
                let modal_btn = __('Add'), modal_cancel_btn = __('Cancel');

                // override defaults in editing mode
                if(action == 'edit'){

                    modal_title = __('Edit Variation Block');

                    title = document.querySelector(".var-block[data-index='"+index+"']").dataset.title;
                    type  = document.querySelector(".var-block[data-index='"+index+"']").dataset.type;
                    required = parseInt(document.querySelector(".var-block[data-index='"+index+"']").dataset.required);

                    modal_btn = __('Save');
                    // console.log(variations);
                }

                let pmodal = document.querySelector(".p-modal");
                let pmodalCont = new bootstrap.Modal(pmodal);
                
                pmodal.querySelector(".modal-title").innerHTML = modal_title;
                pmodal.querySelector(".btn-primary").innerHTML = modal_btn;
                pmodal.querySelector(".btn-secondary").innerHTML = modal_cancel_btn;

                pmodalCont.show();

                let modalHTml = `\
            <div class="form-cont">\
                <div class="form-group mb-3">\
                    <label for="mtitle" class="form-label">${ __('Save') }</label>\
                    <input type="text" class="form-control" id="mtitle" autocomplete="off" placeholder="Rice type" value="${ title }">\
                </div>\
                <div class="form-group mb-3">\
                    <label for="mtype" class="form-label">${ __('Input type') }</label>\
                    <select id="mtype" class="form-control " >\
                        <option ${ type=='radio'?'selected="selected"':'' } value="radio">${ __('Radio buttons') }</option>\
                        <option ${ type=='checkbox'?'selected="selected"':'' } value="checkbox">${ __('Checkboxes') }</option>\
                    </select>\
                    <p class="card-description">${ __('Define how this renders on frontend.') }</p>\
                </div>\
                <div class="form-group mb-3">\
                    <div class="form-check">\
                        <label for="id="mtype"" class="form-check-label form-label">\
                            <input id="mrequired" type="checkbox" class="form-check-input" ${ required==1?'checked="checked"':'' } value="1">\
                            ${ __('Required') }\
                        </label>\
                    </div>\
                    <p class="card-description">${ __('Make this variation mandatory for users.') }</p>\
                </div>\
                <div class="form-group mb-3 dn">\
                    <label for="mtype" class="form-label">${ __('Minimum required') }</label>\
                    <select id="mtype" class="form-control " >\
                        <option value="1">1</option>\
                        <option value="2">2</option>\
                    </select>\
                </div>\
            </div>`;

                pmodal.querySelector(".modal-body").innerHTML = modalHTml;

                _this.listeners.modalSuccessBtnFunc = (e) => {

                    e.preventDefault();

                    let mtitle = pmodal.querySelector(".p-modal #mtitle").value;
                    let mtype = pmodal.querySelector(".p-modal #mtype").value;
                    let mrequired = pmodal.querySelector(".p-modal #mrequired:checked");
                    mrequired = mrequired == null ? 0 : mrequired.value == "1" ? 1 : 0;
                
                    if(mtitle.length<2){ alert(__('Please provide longer title')); return; }

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
                        }else {
                            document.querySelector(".variation-blocks .var-block:last-of-type").insertAdjacentHTML('afterend', _this.structMixBlock(data));
                        }
                    }

                    pmodalCont.hide();

                    setTimeout(() => _this.initListeners('partial'), 10);
                };

                console.log('addMixBlock');
            },

            addMixOption: (e) => {

                let block_el = e.currentTarget;
                e.preventDefault();

                let pmodal = document.querySelector(".p-modal");
                let pmodalCont = new bootstrap.Modal(pmodal);
                
                pmodalCont.show();

                pmodal.querySelector(".modal-title").innerHTML = __('Add Variation');
                pmodal.querySelector(".btn-primary").innerHTML = __('Add');
                pmodal.querySelector(".btn-secondary").innerHTML = __('Cancel');

                let modalHTML = `\
            <div class="form-cont">\
                <div class="form-group">\
                    <label for="mtitle" class="form-label">${ __('Title') }</label>\
                    <input type="text" class="form-control" id="mtitle" autocomplete="off" placeholder="${ __('Brown rice') }">\
                </div>\
                <div class="form-group">\
                    <label for="mprice" class="form-label">${ __('Price') }</label>\
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input id="mprice" type="text" class="form-control" placeholder="0.00" value="" >\
                        <p class="card-description">${ __('You can change default currency under Dashboard &gt; Settings.') }</p>\
                    </div>\
                </div>\
            </div>`;

                pmodal.querySelector(".modal-body").innerHTML = modalHTML;

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
                    }else {
                        document.querySelector(sel + " .offer-pricef li:last-of-type").insertAdjacentHTML('afterend', _this.structMixRow(data));
                    }

                    pmodalCont.hide();

                    setTimeout(() => _this.initListeners('partial'), 10);
                };
            },

            removeOption: (e) => {

                e.preventDefault();
                
                if( confirm('Remove option?') ) e.currentTarget.parentElement.remove();

                console.log('removeOption');
            },

            saveProduct: (e) => {
                
                e.preventDefault();

                let data = {};

                // iterate through input fields
                for( let inp of document.querySelectorAll('.inp') ){

                    data[inp.id.replace("p-","")] = inp.value;
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

                console.log(data);
            
                let id = getProductId();
                let sid = kCloud.getSiteId();

                kCloud.showLoader();

                // send data
                fetch('https://api-v1.kenzap.cloud/', {
                    method: 'post',
                    headers: kCloud.headers,
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
                
                        // successfully changed
                        // if(ajaxQueue==0){
                
                        // iqwerty.toast.toast('changes applied', toast);
                        // // $( "#loader" ).fadeOut( "fast" );
                        // }
                        
                    }else {

                        kCloud.parseApiError(response);
                    }
                    
                    console.log('Success:', response);
                })
                .catch(error => { kCloud.parseApiError(error); });
            },

            openImage: (e) => {

                e.preventDefault();
                kCloud.simulateClick(document.querySelector(".aif-"+e.currentTarget.dataset.index));
            },

            previewImage: (e) => {

                e.preventDefault();

                let input = e.currentTarget;
                let toast = new bootstrap.Toast(document.querySelector('.p-toast'));

                if (input.files && input.files[0]) {

                    // check image type
                    if(input.files[0].type != 'image/jpeg' && input.files[0].type != 'image/jpg' && input.files[0].type != 'image/png'){

                        document.querySelector('.p-toast .toast-body').innerHTML = __('Please provide image in JPEG format');  
                        toast.show();
                        return;
                    }
              
                    // check image size
                    if(input.files[0].size > 5000000){

                        document.querySelector('.p-toast .toast-body').innerHTML = __('Please provide image less than 5 MB in size!');  
                        toast.show();
                        return;
                    }

                    let index = input.dataset.index;
                    let reader = new FileReader();
                    reader.onload = function(e) {
                      
                        console.log('target '+e.currentTarget.result);
                        document.querySelector('.images-'+index).setAttribute('src', e.currentTarget.result);
                    };
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

            modalSuccessBtnFunc: null
        },

        structMixBlock: (data) => {

            let html = '\
        <div class="mb-4 var-block mw" data-title="'+data.title+'" data-type="'+data.type+'" data-required="'+data.required+'" data-index="'+data.index+'" >\
            <label for="offer-pricef" class="form-label pb-2"><span class="title">' + data.title + '</span>\
                &nbsp;&nbsp;\
                <svg class="bi bi-pencil-fill edit-block ms-4" title="edit block" data-index="'+data.index+'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">\
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>\
                </svg>\
                <svg class="bi bi-trash remove-block ms-4" title="edit block" data-index="'+data.index+'"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" viewBox="0 0 16 16">\
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>\
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>\
                </svg>\
            </label>\
            <div class="list-wrapper">\
                <ul class="d-flex flex-column-reverse offer-pricef" >\
                \
                </ul>\
            </div>\
            <p class="card-description"><a class="add-mix" href="#">'+ __('+ add option') +'</a> '+ __(', differentiate price and product options.') +'</p>\
            <div class="add-mix-ctn d-none"><a class="add-mix" href="#">'+ __('+ add option') +'</a></div>\
        </div>\
        ';
        
            return html;
        },
        structMixRow: (data) => {

            return '\
        <li data-title="'+data.title+'" data-price="'+data.price+'" data-cond="" class="pt-2 pb-2"><div class="form-check"><label class="form-check-label form-label"><input class="'+data.type+' form-check-input" type="'+data.type+'" checked="" data-ft="'+data.title+'">'+data.title+' &nbsp;&nbsp;&nbsp; '+formatPrice(data.price)+'</label></div>\
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" class="remove-option bi bi-x-circle" viewBox="0 0 16 16">\
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>\
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>\
            </svg>\
        </li>';
        },
        loadImages: (product) => {

            let d = document;
            let id = getProductId();
            let sid = kCloud.getSiteId();
            let t = '';
            for(let i=0;i<5;i++){
         
              let img = (product.img !== undefined && product.img[i] == 'true') ? 'https://preview.kenzap.cloud/S'+kCloud.getSiteId()+'/_site/images/product-'+product.id+'-'+(i+1)+'-100x100.jpeg?'+product.updated:'https://account.kenzap.com/images/placeholder.jpg';
              t+=`\
          <div class="p-img-cont float-start">\
            <p data-index="${i}">\
              <img class="p-img images-${i}" data-index="${i}" width="100" height="100" src="${img}" />\
              <span class="remove hd" title="${ __('Remove') }">×</span>\
            </p>\
            <input type="file" name="img[]" data-type="search" data-index="${i}" class="file aif-${i} d-none">\
          </div>`;
            }
            
            d.querySelector(".ic").innerHTML = t;
        
            // new image listener
            kCloud.onClick('.p-img-cont img', _this.listeners.openImage);

            // new remove listener
            kCloud.onClick('.p-img-cont .remove', _this.listeners.removeImage);

            // image preview listener
            kCloud.onChange('.p-img-cont .file', _this.listeners.previewImage);
        
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
                let sid = kCloud.getSiteId();

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
                fd.append('token', kCloud.getCookie('kenzap_token'));

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

                        let toast = new bootstrap.Toast(document.querySelector('.toast'));
                        document.querySelector('.toast .toast-body').innerHTML = __('Order updated');  
                        toast.show();

                        // hide UI loader
                        kCloud.hideLoader();
                    }
                });
            }
            
            // image upload notice
            if(_this.state.ajaxQueue == 0){

                let toast = new bootstrap.Toast(document.querySelector('.toast'));
                document.querySelector('.toast .toast-body').innerHTML = __('Order updated');  
                toast.show();

                kCloud.hideLoader();
            }
        }
    };

    _this.init();

})(kCloud);
