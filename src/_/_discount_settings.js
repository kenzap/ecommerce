import { onClick, __attr, __html, html, toast, onChange, headers, spaceID } from '@kenzap/k-cloud';
import { onlyNumbers } from "../_/_helpers.js"

/**
 * Discount settings
 * 
 * @version 1.0
 */
export class Discounts {

  // construct class
  constructor(parent){

    console.log(parent.state.settings);

    if(!parent.state.settings.discounts) parent.state.settings.discounts = { enabled: false, products: false, list: [] }
      
    this.parent = parent;
    this.state = {
        firstLoad: true,
        data: parent.state.settings.discounts.list ? parent.state.settings.discounts.list : [],
        limit: 10, // number of records to load per table
    };
  }

  html = () => {

    return `
    <h4 id="h-discounts" class="card-title mb-4 mt-4">${ __html('Discounts') }</h4>
    <div class="row">
      <div class="col-lg-6">
        <div class="form-group row mb-3 mt-1">
          <label class="col-sm-3 col-form-label">${ __html('Coupons') }</label>
          <div class="col-sm-9">
            <div class="form-check">
              <input id="coupons" class="form-check-input" name="coupons" type="checkbox" value="1" data-type="checkbox" ${ this.parent.state.settings.discounts.enabled ? 'checked' : '' }>
              <label class="form-check-label" for="coupons">
                ${ __html('Enable coupons') }
              </label>
            </div>
            <p class="form-text">${ __html('Allow use of coupons upon checkout.') }</p>
          </div> 
        </div>
      </div>
      <div class="col-lg-6">
        <div class="form-group row mb-3 mt-1">
          <label class="col-sm-3 col-form-label">${ __html('List of coupons') }</label>
          <div class="col-sm-9">

            <table class="discount-table order-form mb-3">
              <thead>
                <tr><th><div class="me-1 me-sm-3">${ __html('Name') }</div></th><th class="tp"><div class="me-1 me-sm-3">${ __html('Type') }</div></th><th class="tp"><div class="me-1 me-sm-3">${ __html('Amount') }</div></th><th></th></tr>
                <tr class="new-item-row">
                    <td class="pb-3">
                      <div class="me-1 me-sm-3 mt-2">
                          <input type="text" value="" length="12" autocomplete="off" placeholder="${ __html('KENZAPSALE20') }" class="form-control form-control-sm discount-coupon" style="max-width: 156px;text-transform: uppercase;" data-id="" data-index="" list="item-suggestions">
                      </div>
                    </td>
                    <td class="discount-type-cont pb-3">
                        <div class="me-1 me-sm-3 mt-2">
                          <button class="form-control form-control-sm dropdown-toggle discount-type" type="button" id="discount_type" data-value="" data-bs-toggle="dropdown" aria-expanded="false">
                            ${ __html('Select') }
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="discount_type">
                            <li><a class="dropdown-item discount-type-option" data-value="percent" href="#"><img style="height:24px" class="d-none" src="/assets/img/bluetooth.webp" > ${ __html('by percent') }</a></li>
                            <li><a class="dropdown-item discount-type-option" data-value="value" href="#"><img style="height:24px" class="d-none" src="/assets/img/ethernet.png" > ${ __html('by value') }</a></li>
                          </ul>
                        </div>
                    </td>
                    <td class="discount-amount-cont pb-3">
                      <div class="me-1 me-sm-3 mt-2"> 
                        <input type="text" value="" autocomplete="off" placeholder="${ __html('15') }" class="form-control form-control-sm discount-amount" style="max-width: 156px;" data-id="" data-index="" >
                      </div>
                    </td>
                    <td class="align-middle text-center pt-2 pb-3"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="24" height="24" class="bi bi-plus-circle text-success align-middle add-discount po"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
                    </td>
                </tr>
              </thead>
              <tbody class="dicount-rows">


              </tbody>
            </table>

          </div>
        </div>
      </div>

      <p class="form-text d-none">${ __html('Add discount coupon codes.') }</p>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <div class="form-group row mb-3 mt-1">
          <label class="col-sm-3 col-form-label">${__html('Products')}</label>
          <div class="col-sm-9">
            <div class="form-check">
              <input id="discount-product" class="form-check-input discount-product" name="discount-product" type="checkbox" value="1" data-type="checkbox" ${ this.parent.state.settings.discounts.products ? 'checked' : '' }>
              <label class="form-check-label" for="discount-product">
                ${__html('Product discounts')}
              </label>
            </div>
            <p class="form-text">${__html('Enable or disable all discounts defined under individual products page.')}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 d-none">
        <div class="form-group row mb-3 mt-1">
          <label class="col-sm-3 col-form-label">${__html('List of hours')}</label>
          <div class="col-sm-9">
            <textarea id="happy_hours_list" class="form-control inp" name="happy_hours_list" rows="2" data-type="text" style="font-size:13px;font-family: monospace;"></textarea>
            <p class="form-text">${__html('Provide one happy hour, its discount per line. Example: Monday 15:00-17:30 10.')}</p>
          </div>
        </div>
      </div>
    </div>
    `;
    
    // return "ok";
  }

  init = () => {

    this.listeners();
  }

  renderTable = () => {

    document.querySelector('.discount-table tbody').innerHTML = this.state.data.map((row, i) => {

      return this.row(row, i);

    }).join('');

    onClick('.remove-discount', e => {

      e.preventDefault();

      if(!confirm(__html('Remove discount?'))){ return false; }

      this.state.data = this.state.data.filter((row, i) => { return i !== parseInt(e.currentTarget.dataset.i) });

      this.renderTable();
    })
  }

  row = (row, i) => {

    return `
    <tr class="new-item-row">
      <td class="form-text ps-1 pt-1">
        ${ row.coupon }
      </td>
      <td class="form-text ps-1 pt-1">
        ${ row.type }
      </td>
      <td class="form-text ps-1 pt-1">
        ${ row.amount }
      </td>
      <td class="align-middle text-center pt-2"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" class="remove-discount bi bi-x-circle po" data-i="${i}" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
        </svg>
      </td>
    </tr>`;
  }

  listeners = () => {

    // console.log("init");

    onChange('#discount_type', e => {

      e.preventDefault();


    });

    onClick('.add-discount', e => {

      e.preventDefault();

      let obj = { coupon: document.querySelector('.discount-coupon').value.trim().toUpperCase(), type: document.querySelector('.discount-type').dataset.value, amount: document.querySelector('.discount-amount').value.trim() };
      
      // amount is not a number
      if(isNaN(obj.amount)){ alert(__html('Coupon amount is invalid')); return false; }

      // percent amound should be < 100
      if(parseInt(obj.amount) > 100 && obj.type == 'percent'){ alert(__html('Coupon amount must be less than 100')); return false; }

      // coupon is too short
      if(obj.coupon.length < 6){ alert(__html('Coupon name is too short')); return false; }

      // check for special characters
      if(this.containsSpecialChars(obj.coupon)){ alert(__html('Remove special characters')); return false; }

      // clean up
      document.querySelector('.discount-coupon').value = "";
      document.querySelector('.discount-amount').value = "";

      // console.log(obj);

      this.state.data.push(obj);

      this.renderTable();
    });

    onClick('.discount-type-option', e => {

      e.preventDefault();

      document.querySelector('#discount_type').innerHTML = e.currentTarget.innerHTML;
      document.querySelector('#discount_type').dataset.value = e.currentTarget.dataset.value;

    });

    onlyNumbers('.discount-amount', [8]);

    this.renderTable();
  }

  save = (data) => {

    data['discounts'] = { enabled: document.querySelector('#coupons').checked, products: document.querySelector('.discount-product').checked, list: this.state.data };
    return data;
  }

  containsSpecialChars = (str) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
}