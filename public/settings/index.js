(function (kCloud) {
    'use strict';

    const getCurrencies = () => {

        // length 164
        return [
            {"name":"Afghan Afghani","code":"AFA","symbol":"؋"},
            {"name":"Albanian Lek","code":"ALL","symbol":"Lek"},
            {"name":"Algerian Dinar","code":"DZD","symbol":"دج"},
            {"name":"Angolan Kwanza","code":"AOA","symbol":"Kz"},
            {"name":"Argentine Peso","code":"ARS","symbol":"$"},
            {"name":"Armenian Dram","code":"AMD","symbol":"֏"},
            {"name":"Aruban Florin","code":"AWG","symbol":"ƒ"},
            {"name":"Australian Dollar","code":"AUD","symbol":"$"},
            {"name":"Azerbaijani Manat","code":"AZN","symbol":"m"},
            {"name":"Bahamian Dollar","code":"BSD","symbol":"B$"},
            {"name":"Bahraini Dinar","code":"BHD","symbol":".د.ب"},
            {"name":"Bangladeshi Taka","code":"BDT","symbol":"৳"},
            {"name":"Barbadian Dollar","code":"BBD","symbol":"Bds$"},
            {"name":"Belarusian Ruble","code":"BYR","symbol":"Br"},
            {"name":"Belgian Franc","code":"BEF","symbol":"fr"},
            {"name":"Belize Dollar","code":"BZD","symbol":"$"},
            {"name":"Bermudan Dollar","code":"BMD","symbol":"$"},
            {"name":"Bhutanese Ngultrum","code":"BTN","symbol":"Nu."},
            {"name":"Bitcoin","code":"BTC","symbol":"฿"},
            {"name":"Bolivian Boliviano","code":"BOB","symbol":"Bs."},
            {"name":"Bosnia-Herzegovina Convertible Mark","code":"BAM","symbol":"KM"},
            {"name":"Botswanan Pula","code":"BWP","symbol":"P"},
            {"name":"Brazilian Real","code":"BRL","symbol":"R$"},
            {"name":"British Pound Sterling","code":"GBP","symbol":"£"},
            {"name":"Brunei Dollar","code":"BND","symbol":"B$"},
            {"name":"Bulgarian Lev","code":"BGN","symbol":"Лв."},
            {"name":"Burundian Franc","code":"BIF","symbol":"FBu"},
            {"name":"Cambodian Riel","code":"KHR","symbol":"KHR"},
            {"name":"Canadian Dollar","code":"CAD","symbol":"$"},
            {"name":"Cape Verdean Escudo","code":"CVE","symbol":"$"},
            {"name":"Cayman Islands Dollar","code":"KYD","symbol":"$"},
            {"name":"CFA Franc BCEAO","code":"XOF","symbol":"CFA"},
            {"name":"CFA Franc BEAC","code":"XAF","symbol":"FCFA"},
            {"name":"CFP Franc","code":"XPF","symbol":"₣"},
            {"name":"Chilean Peso","code":"CLP","symbol":"$"},
            {"name":"Chinese Yuan","code":"CNY","symbol":"¥"},
            {"name":"Colombian Peso","code":"COP","symbol":"$"},
            {"name":"Comorian Franc","code":"KMF","symbol":"CF"},
            {"name":"Congolese Franc","code":"CDF","symbol":"FC"},
            {"name":"Costa Rican Colón","code":"CRC","symbol":"₡"},
            {"name":"Croatian Kuna","code":"HRK","symbol":"kn"},
            {"name":"Cuban Convertible Peso","code":"CUC","symbol":"$, CUC"},
            {"name":"Czech Republic Koruna","code":"CZK","symbol":"Kč"},
            {"name":"Danish Krone","code":"DKK","symbol":"Kr."},
            {"name":"Djiboutian Franc","code":"DJF","symbol":"Fdj"},
            {"name":"Dominican Peso","code":"DOP","symbol":"$"},
            {"name":"East Caribbean Dollar","code":"XCD","symbol":"$"},
            {"name":"Egyptian Pound","code":"EGP","symbol":"ج.م"},
            {"name":"Eritrean Nakfa","code":"ERN","symbol":"Nfk"},
            {"name":"Estonian Kroon","code":"EEK","symbol":"kr"},
            {"name":"Ethiopian Birr","code":"ETB","symbol":"Nkf"},
            {"name":"Euro","code":"EUR","symbol":"€"},
            {"name":"Falkland Islands Pound","code":"FKP","symbol":"£"},
            {"name":"Fijian Dollar","code":"FJD","symbol":"FJ$"},
            {"name":"Gambian Dalasi","code":"GMD","symbol":"D"},
            {"name":"Georgian Lari","code":"GEL","symbol":"ლ"},
            {"name":"German Mark","code":"DEM","symbol":"DM"},
            {"name":"Ghanaian Cedi","code":"GHS","symbol":"GH₵"},
            {"name":"Gibraltar Pound","code":"GIP","symbol":"£"},
            {"name":"Greek Drachma","code":"GRD","symbol":"₯, Δρχ, Δρ"},
            {"name":"Guatemalan Quetzal","code":"GTQ","symbol":"Q"},
            {"name":"Guinean Franc","code":"GNF","symbol":"FG"},
            {"name":"Guyanaese Dollar","code":"GYD","symbol":"$"},
            {"name":"Haitian Gourde","code":"HTG","symbol":"G"},
            {"name":"Honduran Lempira","code":"HNL","symbol":"L"},
            {"name":"Hong Kong Dollar","code":"HKD","symbol":"$"},
            {"name":"Hungarian Forint","code":"HUF","symbol":"Ft"},
            {"name":"Icelandic króna","code":"ISK","symbol":"kr"},
            {"name":"Indian Rupee","code":"INR","symbol":"₹"},
            {"name":"Indonesian Rupiah","code":"IDR","symbol":"Rp"},
            {"name":"Iranian Rial","code":"IRR","symbol":"﷼"},
            {"name":"Iraqi Dinar","code":"IQD","symbol":"د.ع"},
            {"name":"Israeli New Sheqel","code":"ILS","symbol":"₪"},
            {"name":"Italian Lira","code":"ITL","symbol":"L,£"},
            {"name":"Jamaican Dollar","code":"JMD","symbol":"J$"},
            {"name":"Japanese Yen","code":"JPY","symbol":"¥"},
            {"name":"Jordanian Dinar","code":"JOD","symbol":"ا.د"},
            {"name":"Kazakhstani Tenge","code":"KZT","symbol":"лв"},
            {"name":"Kenyan Shilling","code":"KES","symbol":"KSh"},
            {"name":"Kuwaiti Dinar","code":"KWD","symbol":"ك.د"},
            {"name":"Kyrgystani Som","code":"KGS","symbol":"лв"},
            {"name":"Laotian Kip","code":"LAK","symbol":"₭"},
            {"name":"Latvian Lats","code":"LVL","symbol":"Ls"},
            {"name":"Lebanese Pound","code":"LBP","symbol":"£"},
            {"name":"Lesotho Loti","code":"LSL","symbol":"L"},
            {"name":"Liberian Dollar","code":"LRD","symbol":"$"},
            {"name":"Libyan Dinar","code":"LYD","symbol":"د.ل"},
            {"name":"Lithuanian Litas","code":"LTL","symbol":"Lt"},
            {"name":"Macanese Pataca","code":"MOP","symbol":"$"},
            {"name":"Macedonian Denar","code":"MKD","symbol":"ден"},
            {"name":"Malagasy Ariary","code":"MGA","symbol":"Ar"},
            {"name":"Malawian Kwacha","code":"MWK","symbol":"MK"},
            {"name":"Malaysian Ringgit","code":"MYR","symbol":"RM"},
            {"name":"Maldivian Rufiyaa","code":"MVR","symbol":"Rf"},
            {"name":"Mauritanian Ouguiya","code":"MRO","symbol":"MRU"},
            {"name":"Mauritian Rupee","code":"MUR","symbol":"₨"},
            {"name":"Mexican Peso","code":"MXN","symbol":"$"},
            {"name":"Moldovan Leu","code":"MDL","symbol":"L"},
            {"name":"Mongolian Tugrik","code":"MNT","symbol":"₮"},
            {"name":"Moroccan Dirham","code":"MAD","symbol":"MAD"},
            {"name":"Mozambican Metical","code":"MZM","symbol":"MT"},
            {"name":"Myanmar Kyat","code":"MMK","symbol":"K"},
            {"name":"Namibian Dollar","code":"NAD","symbol":"$"},
            {"name":"Nepalese Rupee","code":"NPR","symbol":"₨"},
            {"name":"Netherlands Antillean Guilder","code":"ANG","symbol":"ƒ"},
            {"name":"New Taiwan Dollar","code":"TWD","symbol":"$"},
            {"name":"New Zealand Dollar","code":"NZD","symbol":"$"},
            {"name":"Nicaraguan Córdoba","code":"NIO","symbol":"C$"},
            {"name":"Nigerian Naira","code":"NGN","symbol":"₦"},
            {"name":"North Korean Won","code":"KPW","symbol":"₩"},
            {"name":"Norwegian Krone","code":"NOK","symbol":"kr"},
            {"name":"Omani Rial","code":"OMR","symbol":".ع.ر"},
            {"name":"Pakistani Rupee","code":"PKR","symbol":"₨"},
            {"name":"Panamanian Balboa","code":"PAB","symbol":"B/."},
            {"name":"Papua New Guinean Kina","code":"PGK","symbol":"K"},
            {"name":"Paraguayan Guarani","code":"PYG","symbol":"₲"},
            {"name":"Peruvian Nuevo Sol","code":"PEN","symbol":"S/."},
            {"name":"Philippine Peso","code":"PHP","symbol":"₱"},
            {"name":"Polish Zloty","code":"PLN","symbol":"zł"},
            {"name":"Qatari Rial","code":"QAR","symbol":"ق.ر"},
            {"name":"Romanian Leu","code":"RON","symbol":"lei"},
            {"name":"Russian Ruble","code":"RUB","symbol":"₽"},
            {"name":"Rwandan Franc","code":"RWF","symbol":"FRw"},
            {"name":"Salvadoran Colón","code":"SVC","symbol":"₡"},
            {"name":"Samoan Tala","code":"WST","symbol":"SAT"},
            {"name":"Saudi Riyal","code":"SAR","symbol":"﷼"},
            {"name":"Serbian Dinar","code":"RSD","symbol":"din"},
            {"name":"Seychellois Rupee","code":"SCR","symbol":"SRe"},
            {"name":"Sierra Leonean Leone","code":"SLL","symbol":"Le"},
            {"name":"Singapore Dollar","code":"SGD","symbol":"$"},
            {"name":"Slovak Koruna","code":"SKK","symbol":"Sk"},
            {"name":"Solomon Islands Dollar","code":"SBD","symbol":"Si$"},
            {"name":"Somali Shilling","code":"SOS","symbol":"Sh.so."},
            {"name":"South African Rand","code":"ZAR","symbol":"R"},
            {"name":"South Korean Won","code":"KRW","symbol":"₩"},
            {"name":"Special Drawing Rights","code":"XDR","symbol":"SDR"},
            {"name":"Sri Lankan Rupee","code":"LKR","symbol":"Rs"},
            {"name":"St. Helena Pound","code":"SHP","symbol":"£"},
            {"name":"Sudanese Pound","code":"SDG","symbol":".س.ج"},
            {"name":"Surinamese Dollar","code":"SRD","symbol":"$"},
            {"name":"Swazi Lilangeni","code":"SZL","symbol":"E"},
            {"name":"Swedish Krona","code":"SEK","symbol":"kr"},
            {"name":"Swiss Franc","code":"CHF","symbol":"CHf"},
            {"name":"Syrian Pound","code":"SYP","symbol":"LS"},
            {"name":"São Tomé and Príncipe Dobra","code":"STD","symbol":"Db"},
            {"name":"Tajikistani Somoni","code":"TJS","symbol":"SM"},
            {"name":"Tanzanian Shilling","code":"TZS","symbol":"TSh"},
            {"name":"Thai Baht","code":"THB","symbol":"฿"},
            {"name":"Tongan Pa'anga","code":"TOP","symbol":"$"},
            {"name":"Trinidad & Tobago Dollar","code":"TTD","symbol":"$"},
            {"name":"Tunisian Dinar","code":"TND","symbol":"ت.د"},
            {"name":"Turkish Lira","code":"TRY","symbol":"₺"},
            {"name":"Turkmenistani Manat","code":"TMT","symbol":"T"},
            {"name":"Ugandan Shilling","code":"UGX","symbol":"USh"},
            {"name":"Ukrainian Hryvnia","code":"UAH","symbol":"₴"},
            {"name":"United Arab Emirates Dirham","code":"AED","symbol":"إ.د"},
            {"name":"Uruguayan Peso","code":"UYU","symbol":"$"},
            {"name":"US Dollar","code":"USD","symbol":"$"},
            {"name":"Uzbekistan Som","code":"UZS","symbol":"лв"},
            {"name":"Vanuatu Vatu","code":"VUV","symbol":"VT"},
            {"name":"Venezuelan  Bolívar","code":"VEF","symbol":"Bs"},
            {"name":"Vietnamese Dong","code":"VND","symbol":"₫"},
            {"name":"Yemeni Rial","code":"YER","symbol":"﷼"},
            {"name":"Zambian Kwacha","code":"ZMK","symbol":"ZK"}
        ];
    };

    const HTMLContent = (__) => {

        return `
    <div class="container p-edit">
        <div class="d-flex justify-content-between bd-highlight mb-3">
            <nav class="bc" aria-label="breadcrumb"></nav>
            <button class="btn btn-primary btn-save" type="button">${ __('Save changes') }</button>
        </div>
        <div class="row">
            <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
              <div class="card border-white shadow-sm p-sm-3">
                <nav class="nav tab-content mb-4" role="tablist">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-link active" id="nav-notifications-link" data-bs-toggle="tab" data-bs-target="#nav-notifications" type="button" role="tab" aria-controls="nav-notifications" aria-selected="true" href="#">${ __('Notifications') }</a>
                        <a class="nav-link" id="nav-currency-link" data-bs-toggle="tab" data-bs-target="#nav-currency" type="button" role="tab" aria-controls="nav-currency" aria-selected="true" href="#">${ __('Currency') }</a>
                        <a class="nav-link" id="nav-payout-link" data-bs-toggle="tab" data-bs-target="#nav-payout" type="button" role="tab" aria-controls="nav-payout" aria-selected="true"  href="#">${ __('Payout') }</a>
                        <a class="nav-link" id="nav-tax-link" data-bs-toggle="tab" data-bs-target="#nav-tax" type="button" role="tab" aria-controls="nav-tax" aria-selected="true"  href="#">${ __('Tax') }</a>
                    </div>
                </nav>
                <div class="card-body tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-notifications" role="tabpanel" aria-labelledby="nav-notifications-link">
                    <h4 id="gen" class="card-title mb-4">${ __('Notification settings') }</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('New order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_new_order" class="form-control inp" name="notify_new_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_new_order_emails" type="text" class="form-control inp" name="notify_new_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Cancelled order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_cancel_order" class="form-control inp" name="notify_cancel_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_cancel_order_emails" type="text" class="form-control inp" name="notify_cancel_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Processing order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_proc_order" class="form-control inp" name="notify_proc_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_proc_order_emails" type="text" class="form-control inp" name="notify_proc_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Refunded order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_refunded_order" class="form-control inp" name="notify_refunded_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_refunded_order_emails" type="text" class="form-control inp" name="notify_refunded_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Refunded order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_completed_order" class="form-control inp" name="notify_completed_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_completed_order_emails" type="text" class="form-control inp" name="notify_completed_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>

                    <br>
                    <hr>
                    <br>
                    <br>
                    </div>
                    <div class="tab-pane fade" id="nav-currency" role="tabpanel" aria-labelledby="nav-currency-link">
                    <h4 id="gen" class="card-title mb-4">${ __('Currency settings') }</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Currency') }</label>
                          <div class="col-sm-9">
                            <select id="currency" class="form-control inp" name="currency" data-type="select">
                              
                            
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Currency symbol') }</label>
                          <div class="col-sm-9">
                            <input id="currency_symb" type="text" class="form-control inp" name="currency_symb" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Currency position') }</label>
                          <div class="col-sm-9">
                            <select id="currency_symb_loc" class="form-control inp" name="currency_symb_loc" data-type="select">
                              <option value="left">${ __('Left') }</option>
                              <option value="right">${ __('Right') }</option>
                              <option value="left_space">${ __('Left with space') }</option>
                              <option value="right_space">${ __('Right with space') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">

                      </div>
                    </div>

                    <br>
                    <hr>
                    <br>
                    <br>
                    </div>
                    <div class="tab-pane fade" id="nav-tax" role="tabpanel" aria-labelledby="nav-tax-link">
                    <h4 id="tax" class="card-title mb-4">${ __('Your tax informatio') }</h4>
                    <p class="card-description"> ${ __('Invoice info (this information will be not revealed public)') } </p>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Tax ID') }</label>
                          <div class="col-sm-9">
                            <input id="vat" type="text" class="form-control inp" name="vat" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Email') }</label>
                          <div class="col-sm-9">
                            <input id="email" type="email" class="form-control inp" name="email" data-type="email">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Company') }</label>
                          <div class="col-sm-9">
                            <input id="company" type="text" class="form-control inp inp" name="company" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Type') }</label>
                          <div class="col-sm-4">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input inp" name="entity_type" id="entity_type" value="individual" data-type="radio">
                                ${ __('Individual') }
                                <i class="input-helper"></i></label>
                            </div>
                          </div>
                          <div class="col-sm-5">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input inp" name="entity_type" id="entity_type" value="business" data-type="radio">
                                ${ __('Business') }
                                <i class="input-helper"></i></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-description">
                        ${ __('Address') }
                    </p>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label"> ${ __('Address 1') }</label>
                          <div class="col-sm-9">
                            <input id="addr1" type="text" class="form-control inp" name="addr1" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('State') }</label>
                          <div class="col-sm-9">
                            <input id="state" type="text" class="form-control inp" name="state" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Address 2') }</label>
                          <div class="col-sm-9">
                            <input id="addr2" type="text" class="form-control inp" name="addr2" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Postcode') }</label>
                          <div class="col-sm-9">
                            <input id="post" type="text" class="form-control inp" name="post" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('City') }</label>
                          <div class="col-sm-9">
                            <input id="city" type="text" class="form-control inp" name="city" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Country') }</label>
                          <div class="col-sm-9">
                            <select id="country" class="form-control inp" name="country" data-type="select">
                              <?php include('inc/select-countries.php'); ?>
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
                    <h4 id="payout" class="card-title mb-4" title="payouts">${ __('Payout data') }</h4>
                    <p class="card-description">${ __('This information is used to process your earnings as part of Kenzap Affiliate or Kenzap Designing programs.') }</p>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Bank account holder\'s name') }</label>
                          <div class="col-sm-9">
                            <input id="y1" type="text" class="form-control inp" name="y1" minlength="2" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('IBAN/Account Nr.') }</label>
                          <div class="col-sm-9">
                            <input id="y2" type="text" class="form-control inp" name="y2" minlength="2" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('SWIFT Code') }</label>
                          <div class="col-sm-9">
                            <input id="y3" type="text" class="form-control inp" name="y3" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Bank name') }</label>
                          <div class="col-sm-9">
                            <input id="y4" type="text" class="form-control inp" name="y4" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Bank branch city') }</label>
                          <div class="col-sm-9">
                            <input id="y5" type="text" class="form-control inp" name="y5" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Bank branch country') }</label>
                          <div class="col-sm-9">
                            <select id="y6" class="form-control inp" name="y6" data-type="select">
                              <?php include('inc/countries.php'); ?>
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
    };

    // js dependencies

    // where everything happens
    const _this = {
       
        state:{
            firstLoad: true,
            limit: 10, // number of records to load per table
        },
        init: () => {
             
            _this.getData();
        },
        getData: () => {

            // show loader during first load
            if (_this.state.firstLoad) kCloud.showLoader();

            // search content
            document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';

            // do API query
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
                        locale: {
                            type:       'locale',
                            source:      ['extension'],
                            key:         'ecommerce',
                        },
                        settings: {
                            type:       'get',
                            key:        'ecommerce-settings',
                            fields:     '*',
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {

                // hide UI loader
                kCloud.hideLoader();

                if(response.success){

                    // init header
                    kCloud.initHeader(response);
                    
                    // get core html content 
                    _this.loadPageStructure();  

                    // render table
                    _this.renderPage(response);

                    // bind content listeners
                    _this.initListeners();
                
                    // initiate footer
                    _this.initFooter();

                    // first load
                    _this.state.firstLoad = false;

                }else {

                    kCloud.parseApiError(response);
                }
            })
            .catch(error => { kCloud.parseApiError(error); });
        },
        authUser: (response) => {

            if(response.user){
                
                if(response.user.success == true);
            }
        },
        loadPageStructure: () => {

            if(!_this.state.firstLoad) return;

            // get core html content 
            document.querySelector('#contents').innerHTML = HTMLContent(__);
        },
        renderPage: (response) => {

            if(_this.state.firstLoad){

                // initiate breadcrumbs
                kCloud.initBreadcrumbs(
                    [
                        { link: kCloud.link('https://dashboard.kenzap.cloud'), text: __('Dashboard') },
                        { link: kCloud.link('/'), text: __('E-commerce') },
                        { text: __('Settings') }
                    ]
                );
            }

            // setup currencies
            let coptions = '<option value="">'+__('Choose currency')+'</option>';
            for (let c of getCurrencies()){

                coptions += `<option value="${ c.code }">${ __(c.name) } (${ __(c.code) })</option>`;
            }
            document.querySelector("#currency").innerHTML = coptions;

            // populate fields
            for (let field in response.settings){

                if(typeof(response.settings[field]) === "undefined") continue;
                if(response.settings[field] == "") continue;
                if(document.querySelector("#"+field)) switch(document.querySelector("#"+field).dataset.type){
            
                    case 'text':   
                    case 'email':  
                    case 'emails':  
                    case 'select':
                    case 'textarea': document.querySelector("#"+field).value = response.settings[field]; break;
                    // case 'radio': $("#"+field).parent().parent().parent().parent().parent().find("input[value=" + data.res[field] + "]").prop('checked', true); break;
                }
            }

            // for(let s of document.querySelectorAll('.form-control')){

            //     switch(s.dataset.type){
              
            //         case 'text':   
            //         case 'email':  
            //         case 'emails':  
            //         case 'select':
            //         case 'textarea': data[s.id] = s.value; break;
            //         case 'radio': data[s.id] = s.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('input:checked').value; break;
            //     }

            kCloud.getSiteId();

            // bind settings data
      
            // provide result to the page
            // document.querySelector(".table tbody").innerHTML = list;
        },
        initListeners: () => {

            // break here if initListeners is called more than once
            if(!_this.state.firstLoad) return;

            // add product modal
            kCloud.onClick('.btn-save', _this.saveSettings);
        },
        listeners: {

            removeProduct: (e) => {

                e.preventDefault();

                let c = confirm( __('Completely remove this product?') );

                if(!c) return;
      
                // send data
                fetch('https://api-v1.kenzap.cloud/', {
                    method: 'post',
                    headers: kCloud.headers,
                    body: JSON.stringify({
                        query: {
                            product: {
                                type:       'delete',
                                key:        'product',   
                                id:         e.currentTarget.dataset.id, 
                            }
                        }
                    })
                })
                .then(response => response.json())
                .then(response => {

                    if (response.success){

                        // modalCont.hide();

                        _this.getData();

                    }else {

                        kCloud.parseApiError(response);
                    }
                    
                })
                .catch(error => { kCloud.parseApiError(error); });
            },
     
            searchProductsActivate: (e) => {

                e.preventDefault();

                document.querySelector('.table-p-list thead tr th:nth-child(2) span').style.display = 'none';
                document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'flex';
                document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont input').focus();

                // search products
                kCloud.onKeyUp('.table-p-list thead tr th:nth-child(2) .search-cont input', _this.listeners.searchProducts);
            },
     
            searchProducts: (e) => {

                e.preventDefault();

                _this.getData();

                // console.log('search products ' +e.currentTarget.value);
            },

            modalSuccessBtn: (e) => {
                
                console.log('calling modalSuccessBtnFunc');
                _this.listeners.modalSuccessBtnFunc(e);
            },

            modalSuccessBtnFunc: null
        },
        saveSettings: (e) => {

            e.preventDefault();

            let data = {};

            // iterate through all fields
            for(let s of document.querySelectorAll('.form-control')){

                switch(s.dataset.type){
              
                    case 'text':   
                    case 'email':  
                    case 'emails':  
                    case 'select':
                    case 'textarea': data[s.id] = s.value; break;
                    case 'radio': data[s.id] = s.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('input:checked').value; break;
                }
            }

            // send data
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: kCloud.headers,
                body: JSON.stringify({
                    query: {
                        settings: {
                            type:       'set',
                            key:        'ecommerce-settings',       
                            data:       data
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    let toast = new bootstrap.Toast(document.querySelector('.toast'));
                    document.querySelector('.toast .toast-body').innerHTML = __('Successfully updated');  
                    toast.show();

                    // modalCont.hide();
                    // _this.getData();
                    // open product editing page
                    // window.location.href = `/product-edit/?id=${ response.product.id}`

                }else {

                    kCloud.parseApiError(response);
                }
                
            })
            .catch(error => { kCloud.parseApiError(error); });
        },
        initFooter: () => {
            
            kCloud.initFooter(__('Copyright © %1$ %2$ Kenzap%3$. All rights reserved.', new Date().getFullYear(), '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>'), __('Kenzap Cloud Services - Dashboard'));
        }
    };

    _this.init();

})(kCloud);
