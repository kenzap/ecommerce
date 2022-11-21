import { __html } from '@kenzap/k-cloud';

export const HTMLContent = (__) => {

  return `
    <div class="container p-edit">
        <div class="d-md-flex justify-content-between bd-highlight mb-3">
            <nav class="bc" aria-label="breadcrumb"></nav>
            <button class="btn btn-primary btn-save mt-3 mb-1 mt-md-0 mb-md-0" type="button">${__html('Save changes')}</button>
        </div>
        <div class="row">
            <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
              <div class="card border-white shadow-sm p-sm-3 ">
                <nav class="nav tab-content mb-4" role="tablist">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-link active" id="nav-notifications-link" data-bs-toggle="tab" data-bs-target="#nav-notifications" type="button" role="tab" aria-controls="nav-notifications" aria-selected="true" href="#">${__html('General')}</a>
                        <a class="nav-link d-none" id="nav-currency-link" data-bs-toggle="tab" data-bs-target="#nav-currency" type="button" role="tab" aria-controls="nav-currency" aria-selected="true" href="#">${__html('Currency &amp; Tax')}</a>
                        <a class="nav-link" id="nav-payout-link" data-bs-toggle="tab" data-bs-target="#nav-payout" type="button" role="tab" aria-controls="nav-payout" aria-selected="true"  href="#">${__html('Payout')}</a>
                        <a class="nav-link" id="nav-tax-link" data-bs-toggle="tab" data-bs-target="#nav-tax" type="button" role="tab" aria-controls="nav-tax" aria-selected="true"  href="#">${__html('Legal')}</a>
                    </div>
                </nav>
                <div class="card-body tab-content" id="nav-tabContent">
                  <div class="tab-pane fade show active" id="nav-notifications" role="tabpanel" aria-labelledby="nav-notifications-link">
                    
                    <h4 id="h-orders" class="card-title mb-4">${__html('Orders')}</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Order ID')}</label>
                          <div class="col-sm-9">
                            <input id="last_order_id" type="text" class="form-control inp" name="last_order_id" data-type="emails">
                            <p class="form-text">${__html('Define next new order ID number.')}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Auto complete')}</label>
                          <div class="col-sm-9">
                            <select id="auto_complete" class="form-select inp" name="auto_complete" data-type="select">
                                <option value="">${__html('None')}</option>
                                <option value="60">${__html('1 minute')}</option>
                                <option value="300">${__html('5 minutes')}</option>
                                <option value="1200">${__html('20 minutes')}</option>
                                <option value="3600">${__html('1 hour')}</option>
                                <option value="43200">${__html('12 hours')}</option>
                                <option value="86400">${__html('24 hours')}</option>
                            </select>
                            <p class="form-text">${__html('Auto complete orders after certain amount of time.')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Tables')}</label>
                          <div class="col-sm-9">
                            <div class="form-check">
                              <input id="tables" class="form-check-input inp" name="tables" type="checkbox" value="1" data-type="checkbox">
                              <label class="form-check-label" for="tables">
                                ${__html('Table mode')}
                              </label>
                            </div>
                            <p class="form-text">${__html('Enable table mode in orders dashboard.')}</p>
                          </div> 
                        </div>
                      </div>
          
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('List of tables')}</label>
                          <div class="col-sm-9">
                            <textarea id="table_list" class="form-control inp" name="table_list" rows="4" data-type="text" style="font-size:13px;font-family: monospace;"></textarea>
                            <p class="form-text">${__html('Provide one table per line. Example: 5.')}</p>
                          </div> 
                        </div>
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Products')}</label>
                          <div class="col-sm-9">
                            <div class="form-check">
                              <input id="add_products" class="form-check-input inp" name="add_products" type="checkbox" value="1" data-type="checkbox">
                              <label class="form-check-label" for="check">
                                ${__html('Auto add products')}
                              </label>
                            </div>
                            <p class="form-text">${__html('Automatically add products to new orders.')}</p>
                          </div> 
                        </div>
                      </div>
          
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('List of products')}</label>
                          <div class="col-sm-9">
                            <textarea id="add_products_list" class="form-control inp" name="add_products_list" rows="2" data-type="text" style="font-size:13px;font-family: monospace;"></textarea>
                            <p class="form-text">${__html('Provide one product ID per line. Example: e98d438cby6g..')}</p>
                          </div> 
                        </div>
                      </div>
                    </div>

                    <h4 id="h-notifications" class="card-title mb-4 mt-4">${__html('Notifications')}</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('New order')}</label>
                          <div class="col-sm-9">
                            <select id="notify_new_order" class="form-select inp" name="notify_new_order" data-type="select">
                                <option value="">${__html('None')}</option>
                                <option value="client">${__html('Client')}</option>
                                <option value="admin">${__html('Administrator')}</option>
                                <option value="both">${__html('Client and administrator')}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Emails')}</label>
                          <div class="col-sm-9">
                            <input id="notify_new_order_emails" type="text" class="form-control inp" name="notify_new_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Cancelled order')}</label>
                          <div class="col-sm-9">
                            <select id="notify_cancel_order" class="form-select inp" name="notify_cancel_order" data-type="select">
                                <option value="">${__html('None')}</option>
                                <option value="client">${__html('Client')}</option>
                                <option value="admin">${__html('Administrator')}</option>
                                <option value="both">${__html('Client and administrator')}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Emails')}</label>
                          <div class="col-sm-9">
                            <input id="notify_cancel_order_emails" type="text" class="form-control inp" name="notify_cancel_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Processing order')}</label>
                          <div class="col-sm-9">
                            <select id="notify_proc_order" class="form-select inp" name="notify_proc_order" data-type="select">
                                <option value="">${__html('None')}</option>
                                <option value="client">${__html('Client')}</option>
                                <option value="admin">${__html('Administrator')}</option>
                                <option value="both">${__html('Client and administrator')}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Emails')}</label>
                          <div class="col-sm-9">
                            <input id="notify_proc_order_emails" type="text" class="form-control inp" name="notify_proc_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Refunded order')}</label>
                          <div class="col-sm-9">
                            <select id="notify_refunded_order" class="form-select inp" name="notify_refunded_order" data-type="select">
                                <option value="">${__html('None')}</option>
                                <option value="client">${__html('Client')}</option>
                                <option value="admin">${__html('Administrator')}</option>
                                <option value="both">${__html('Client and administrator')}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Emails')}</label>
                          <div class="col-sm-9">
                            <input id="notify_refunded_order_emails" type="text" class="form-control inp" name="notify_refunded_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Completed order')}</label>
                          <div class="col-sm-9">
                            <select id="notify_completed_order" class="form-select inp" name="notify_completed_order" data-type="select">
                                <option value="">${__html('None')}</option>
                                <option value="client">${__html('Client')}</option>
                                <option value="admin">${__html('Administrator')}</option>
                                <option value="both">${__html('Client and administrator')}</option>
                            </select>
                            <p class="form-text">${__html('Choose how to trigger notifications.')}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Emails')}</label>
                          <div class="col-sm-9">
                            <input id="notify_completed_order_emails" type="text" class="form-control inp" name="notify_completed_order_emails" data-type="emails">
                            <p class="form-text d-none">${__html('Example: alex@kenzap.com, orders@kenzap.com')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Low stock')}</label>
                          <div class="col-sm-9">
                            <select id="notify_low_stock" class="form-select inp" name="notify_low_stock" data-type="select">
                                <option value="">${__html('None')}</option>
                                <option value="dashboard">${__html('Via dashboard')}</option>
                                <option value="email">${__html('Via email')}</option>
                                <option value="all">${__html('Via dashboard and email')}</option>
                            </select>
                            <p class="form-text">${__html('Product low stock notification settings.')}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Emails')}</label>
                          <div class="col-sm-9">
                            <input id="notify_low_stock_emails" type="text" class="form-control inp" name="notify_low_stock_emails" data-type="emails">
                            <p class="form-text">${__html('Example: alex@kenzap.com, orders@kenzap.com')}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 id="h-currency" class="card-title mb-4 mt-4">${__html('Currency')}</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Currency')}</label>
                          <div class="col-sm-9">
                            <select id="currency" class="form-select inp" name="currency" data-type="select">
                              
                            
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Currency symbol')}</label>
                          <div class="col-sm-9">
                            <input id="currency_symb" type="text" class="form-select inp" name="currency_symb" value="" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Position')}</label>
                          <div class="col-sm-9">
                            <select id="currency_symb_loc" class="form-select inp" name="currency_symb_loc" data-type="select">
                              <option value="left">${__html('Left')}</option>
                              <option value="right">${__html('Right')}</option>
                              <option value="left_space">${__html('Left with space')}</option>
                              <option value="right_space">${__html('Right with space')}</option>
                            </select>
                            <p class="form-text">${__html('Currency position symbol.')}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">

                      </div>
                    </div>

                    <h4 id="h-tax" class="card-title mb-4 mt-4">${__html('Tax')}</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Tax')}</label>
                          <div class="col-sm-9">
                            <div class="form-check">
                              <input id="tax_calc" class="form-check-input inp" name="tax_calc" type="checkbox" value="1" data-type="checkbox">
                              <label class="form-check-label" for="tax_calc">
                                ${__html('Calculate')}
                              </label>
                            </div>
                            <p class="form-text">${__html('Enable tax calculations when processing orders.')}</p>
                          </div> 
                        </div>
                      </div>
          
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Geolocation')}</label>
                          <div class="col-sm-9">
                            <div class="form-check">
                              <input id="tax_percent_auto" class="form-check-input inp" name="tax_percent_auto" type="checkbox" value="1" data-type="checkbox">
                              <label class="form-check-label" for="tax_percent_auto">
                                ${__html('Auto tax rate')}
                              </label>
                            </div>
                            <p class="form-text">${__html('Automatically detect tax rate whenever applicable.')}</p>
                          </div> 
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Percent')}</label>
                          <div class="col-sm-9">
                            <input id="tax_percent" type="text" class="form-control inp" placeholder="21" name="tax_percent" data-type="text">
                            <p class="form-text">${__html('Default tax rate. Example, 9 or 21. Use numeric value.')}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Display')}</label>
                          <div class="col-sm-9">
                            <input id="tax_display" type="text" class="form-control inp" placeholder="VAT" name="tax_display" data-type="text">
                            <p class="form-text">${__html('Tax title. Example, VAT or GST.')}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 id="h-fees" class="card-title mb-4 mt-4">${__html('Fees')}</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Service')}</label>
                          <div class="col-sm-9">
                            <div class="form-check">
                              <input id="fee_calc" class="form-check-input inp" name="fee_calc" type="checkbox" value="1" data-type="checkbox">
                              <label class="form-check-label" for="fee_calc">
                                ${__html('Calculate')}
                              </label>
                            </div>
                            <p class="form-text">${__html('Calculate service fee when processing orders.')}</p>
                          </div> 
                        </div>
                      </div>
          
                      <div class="col-lg-6 d-none">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Geolocation')}</label>
                          <div class="col-sm-9">
                            <div class="form-check">
                              <input id="tax_auto_rate" class="form-check-input inp" name="tax_auto_rate" type="checkbox" value="1" data-type="checkbox">
                              <label class="form-check-label" for="tax_auto_rate">
                                ${__html('Auto tax rate')}
                              </label>
                            </div>
                            <p class="form-text">${__html('Automatically detect tax rate whenever applicable.')}</p>
                          </div> 
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Percent')}</label>
                          <div class="col-sm-9">
                            <input id="fee_percent" type="text" class="form-control inp" placeholder="5" name="fee_percent" data-type="text">
                            <p class="form-text">${__html('Default fee rate. Example, 5 or 7. Use numeric value.')}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Display')}</label>
                          <div class="col-sm-9">
                            <input id="fee_display" type="text" class="form-control inp" placeholder="Service fee" name="fee_display" data-type="text">
                            <p class="form-text">${__html('Fee title. Example, Service fee.')}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 id="h-payment" class="card-title mb-4 mt-4">${__html('Payment')}</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Methods')}</label>
                          <div class="col-sm-9">
                            <div class="form-check">
                              <input id="custom_payment_method" class="form-check-input inp" name="custom_payment_method" type="checkbox" value="1" data-type="checkbox">
                              <label class="form-check-label" for="custom_payment_method">
                                ${__html('Custom methods')}
                              </label>
                            </div>
                            <p class="form-text">${__html('Allow changing of payment method in the dashboard.')}</p>
                          </div> 
                        </div>
                      </div>
          
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('List of Methods')}</label>
                          <div class="col-sm-9">
                            <textarea id="payment_methods" class="form-control inp" name="payment_methods" rows="4" data-type="text" style="font-size:13px;font-family: monospace;"></textarea>
                            <p class="form-text">${__html('Provide list of available payment methods. Example: PayPal, PayNow.')}</p>
                          </div> 
                        </div>
                      </div>
                    </div>

                    <h4 id="h-discounts" class="card-title mb-4 mt-4">${__html('Discounts')}</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Coupons')}</label>
                          <div class="col-sm-9">
                            <div class="form-check">
                              <input id="coupons" class="form-check-input inp" name="coupons" type="checkbox" value="1" data-type="checkbox">
                              <label class="form-check-label" for="coupons">
                                ${__html('Enable coupons')}
                              </label>
                            </div>
                            <p class="form-text">${__html('Allow use of coupons upon checkout.')}</p>
                          </div> 
                        </div>
                      </div>
          
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('List of coupons')}</label>
                          <div class="col-sm-9">
                            <textarea id="coupon_list" class="form-control inp" name="coupon_list" rows="2" data-type="text" style="font-size:13px;font-family: monospace;"></textarea>
                            <p class="form-text">${__html('Provide one coupon and its discount rate per line. Example: BESTDEALS 15.')}</p>
                          </div> 
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Products')}</label>
                          <div class="col-sm-9">
                            <div class="form-check">
                              <input id="product_discounts" class="form-check-input inp" name="product_discounts" type="checkbox" value="1" data-type="checkbox">
                              <label class="form-check-label" for="product_discounts">
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

                    <h4 id="h-webhooks" class="card-title mb-4 mt-4">${__html('Webhooks')}</h4>
                    <div class="row webhook-list">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Trigger')}</label>
                          <div class="col-sm-9">
                            <select id="webhook1_trigger" class="form-select webhook_trigger" name="webhook1_trigger" data-type="select">
                                <option value="">${__html('None')}</option>
                                <option value="new_order">${__html('New order')}</option>
                                <option value="canceled_order">${__html('Canceled order')}</option>
                                <option value="refunded_order">${__html('Refunded order')}</option>
                                <option value="completed_order">${__html('Completed order')}</option>
                                <option value="low_stock">${__html('Low stock')}</option>
                            </select>
                            <p class="form-text">${__html('Action when the URL is called.')}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Webhook')}</label>
                          <div class="col-sm-9">
                            <input id="webhook1_url" type="text" class="form-control webhook_url" name="webhook1_url" >
                            <p class="form-text">${__html('URL with parameters. Ex.: https://example.com/{{order_id}}')}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 id="h-printing" class="card-title mb-4 mt-4">${__html('Printing')}</h4>

                      <div class="row">

                        <div class="col-xl-6">
                          <div class="form-group row mb-3 mt-1">
                            <label class="col-sm-3 col-form-label d-none">${__html('Printers')}</label>
                            <div class="col-sm-12">

                              <input id="printers" class="form-control inp d-none" name="printers" type="text" value="1" data-type="text">
                              
                              <table class="printer-table order-form mb-3">
                                <theader>
                                  <tr><th><div class="me-1 me-sm-3">${ __html('Device ID') }</div></th><th class="tp"><div class="me-1 me-sm-3">${ __html('Type') }</div></th><th class="tp"><div class="me-1 me-sm-3">${ __html('Paper') }</div></th><th class="printer-ip-th d-none"><div class="me-1 me-sm-3 ">${ __html('IP Address') }</div></th><th></th></tr>
                                  <tr class="new-item-row">
                                      <td>
                                        <div class="me-1 me-sm-3 mt-2">
                                            <input type="text" value="" autocomplete="off" placeholder="${ __html('AW4FROYNFRGV') }" class="form-control form-control-sm printer-idd" style="max-width: 156px;" data-id="" data-index="" list="item-suggestions">
                                        </div>
                                      </td>
                                      <td class="printer-type">
                                          <div class="me-1 me-sm-3 mt-2">
                                            <button class="form-control form-control-sm dropdown-toggle" type="button" id="printer_type"  data-value="" data-bs-toggle="dropdown" aria-expanded="false">
                                              ${ __html('Select') }
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="printer_type">
                                              <li><a class="dropdown-item" data-value="bluetooth" href="#"><img style="height:24px" src="/assets/img/bluetooth.webp" > ${ __html('bluetooth') }</a></li>
                                              <li><a class="dropdown-item" data-value="ethernet" href="#"><img style="height:24px" src="/assets/img/ethernet.png" > ${ __html('ethernet') }</a></li>
                                              <li><a class="dropdown-item" data-value="usb" href="#"><img style="height:24px" src="/assets/img/usb.png" > ${ __html('usb') }</a></li>
                                            </ul>
                                          </div>
                                      </td>
                                      <td class="printer-paper-type">
                                          <div class="me-1 me-sm-3 mt-2">
                                            <button class="form-control form-control-sm dropdown-toggle" type="button" id="printer_paper_type"  data-value="" data-bs-toggle="dropdown" aria-expanded="false">
                                              ${ __html('Select') }
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="printer_paper_type">
                                              <li><a class="dropdown-item" data-value="58" href="#">${ __html('58mm') }</a></li>
                                              <li><a class="dropdown-item" data-value="80" href="#">${ __html('80mm') }</a></li>
                                            </ul>
                                          </div>
                                      </td>
                                      <td class="printer-ip-td d-none">
                                        <div class="me-1 me-sm-3 mt-2"> 
                                          <input type="text" value="" autocomplete="off" placeholder="${ __html('192.168.1.12') }" class="form-control form-control-sm printer-ip" style="max-width: 156px;" data-id="" data-index="" >
                                        </div>
                                      </td>
                                      <td class="align-middle text-center pt-2"> 
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="24" height="24" class="bi bi-plus-circle text-success align-middle add-printer po"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
                                      </td>
                                  </tr>
                                </theader>
                                <tbody>


                                </tbody>
                              </table>
                              <p class="form-text">${__html('List all printers connected to the Cloud.')}</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-6">
                          <div class="form-group row mb-3 mt-1">
                            <label class="col-sm-3 col-form-label">${__html('Action')}</label>
                            <div class="col-sm-9">
                              <select id="print_action" class="form-select inp" name="print_action" data-type="select">
                                <option value="system">${__html('Default printing dialogue')}</option>
                                <option value="app">${__html('Kenzap print app')}</option>
                              </select>
                              <p class="form-text">${__html('Choose action when printing icon is clicked.')}</p>
                            </div> 
                          </div>
                        </div>
                      </div>

                      <div class="border-top my-3 mb-5 d-none"></div>

                      <h4 id="h-templates" class="card-title mb-4 mt-4">${__html('Templates')}</h4>

                      <input id="templates" class="form-control inp d-none" name="templates" type="text" value="" data-type="text">

                      <div id="templates-list" class="accordion accordion-flush templates-list" > </div>

                      <div class="row">
                        <div class="col-lg-12">
                          <div class="text-end "> 
                            <button class="btn btn-outline-primary btn-template-new mt-5 mb-1 mt-md-4 mb-md-0 d-flex align-items-center" type="button"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="16" height="16" class="bi bi-plus-circle align-middle me-2 po" ><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>${ __html('New template') }</button>
                          </div>
                        </div>
                      </div>

                      <div class="row d-none">
                        <div class="col-lg-6">
                          <div class="form-group row mb-3 mt-1">
                            <label class="col-sm-3 col-form-label">${__html('QR code')}</label>
                            <div class="col-sm-9">
                              <div class="form-check">
                                <input id="qr_print" class="form-check-input inp" name="qr_print" type="checkbox" value="1" data-type="checkbox">
                                <label class="form-check-label" for="qr_print">
                                  ${__html('QR code printing')}
                                </label>
                              </div>
                              <p class="form-text">${__html('Allow "Scan me to order" QR-code printing from orders dashboard.')}</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-group row mb-3 mt-1">
                            <label class="col-sm-3 col-form-label">${__html('QR printing')}</label>
                            <div class="col-sm-9">
                              <textarea id="qr_template" class="form-control inp" name="qr_template" rows="10" data-type="text" style="font-size:13px;font-family: monospace;"></textarea>
                              <p class="form-text">${__html('Default "Scan me to order" template for printers.')}</p>
                            </div> 
                          </div>
                        </div>
                      </div>


                    </div>

                    <div class="tab-pane fade" id="nav-currency" role="tabpanel" aria-labelledby="nav-currency-link">
                      <br>
                      <hr>
                      <br>
                      <br>
                    </div>
                    
                    <div class="tab-pane fade" id="nav-tax" role="tabpanel" aria-labelledby="nav-tax-link">
                    <h4 id="h-tax" class="card-title mb-4">${__html('Your tax information')}</h4>
                    <p class="card-description"> ${__html('Invoice info (this information will be not revealed public)')} </p>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Tax ID')}</label>
                          <div class="col-sm-9">
                            <input id="vat" type="text" class="form-control inp" name="vat" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Email')}</label>
                          <div class="col-sm-9">
                            <input id="email" type="email" class="form-control inp" name="email" data-type="email">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Company')}</label>
                          <div class="col-sm-9">
                            <input id="company" type="text" class="form-control inp inp" name="company" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Type')}</label>
                          <div class="col-sm-4">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input inp" name="entity_type" value="individual" data-type="radio" checked="true">
                                ${__html('Individual')}
                                <i class="input-helper"></i></label>
                            </div>
                          </div>
                          <div class="col-sm-5">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input inp" name="entity_type" value="business" data-type="radio">
                                ${__html('Business')}
                                <i class="input-helper"></i></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-description">
                        ${__html('Address')}
                    </p>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label"> ${__html('Address 1')}</label>
                          <div class="col-sm-9">
                            <input id="addr1" type="text" class="form-control inp" name="addr1" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('State')}</label>
                          <div class="col-sm-9">
                            <input id="state" type="text" class="form-control inp" name="state" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Address 2')}</label>
                          <div class="col-sm-9">
                            <input id="addr2" type="text" class="form-control inp" name="addr2" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Postcode')}</label>
                          <div class="col-sm-9">
                            <input id="post" type="text" class="form-control inp" name="post" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('City')}</label>
                          <div class="col-sm-9">
                            <input id="city" type="text" class="form-control inp" name="city" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Country')}</label>
                          <div class="col-sm-9">
                            <select id="country" class="form-select inp" name="country" data-type="select">
                              
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <br>
                    <hr>
                    <br>
                    <br>
                    </div>
                    <div class="tab-pane fade" id="nav-payout" role="tabpanel" aria-labelledby="nav-payout-link">
                    <h4 id="h-payout" class="card-title mb-4" title="payouts">${__html('Payout data')}</h4>
                    <p class="card-description">${__html('This information is used to process your earnings as part of Kenzap Affiliate or Kenzap Designing programs.')}</p>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html("Bank account holder's name")}</label>
                          <div class="col-sm-9">
                            <input id="y1" type="text" class="form-control inp" name="y1" minlength="2" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('IBAN/Account Nr.')}</label>
                          <div class="col-sm-9">
                            <input id="y2" type="text" class="form-control inp" name="y2" minlength="2" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('SWIFT Code')}</label>
                          <div class="col-sm-9">
                            <input id="y3" type="text" class="form-control inp" name="y3" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Bank name')}</label>
                          <div class="col-sm-9">
                            <input id="y4" type="text" class="form-control inp" name="y4" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Bank branch city')}</label>
                          <div class="col-sm-9">
                            <input id="y5" type="text" class="form-control inp" name="y5" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${__html('Bank branch country')}</label>
                          <div class="col-sm-9">
                            <select id="y6" class="form-select inp" name="y6" data-type="select">
                              
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    
    <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center" >   
      <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
        <div class="d-flex">  
          <div class="toast-body"></div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
    `;
}