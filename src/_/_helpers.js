import { getCookie, getSiteId } from '@kenzap/k-cloud';

export const mt = (val) =>{

    return (""+val).length < 2 ? "0"+val : val;
}

export const getProductId = () => {
    
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id') ? urlParams.get('id') : "";
    return id;
}

export const getProductIdFromLink = () => {
    
    let url = new URL(window.location.href);
    let id = url.pathname.trim().split('/').slice(-2)[0];
    return id;
}

export const replaceQueryParam = (param, newval, search) => {

    let regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    let query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}

export const getPageNumberOld = () => {

    let url = window.location.href.split('/');
    let page = url[url.length-1];
    let pageN = 1;
    if(page.indexOf('page')==0){
      pageN = page.replace('page', '').replace('#', '');
    }
    // console.log(pageN);
    return parseInt(pageN);
}

export const getPageNumber = () => {

    let urlParams = new URLSearchParams(window.location.search);
    let page = urlParams.get('page') ? urlParams.get('page') : 1;

    return parseInt(page);
}

export const getPagination = (__, meta, cb) => {

    if(typeof(meta) === 'undefined'){ document.querySelector("#listing_info").innerHTML = __('no records to display'); return; }

    let offset = meta.limit+meta.offset;
    if(offset>meta.total_records) offset = meta.total_records;

    document.querySelector("#listing_info").innerHTML = __("Showing %1$ to %2$ of %3$ entries", (1+meta.offset), (offset), meta.total_records);
    //  "Showing "+(1+meta.offset)+" to "+(offset)+" of "+meta.total_records+" entries";

    let pbc = Math.ceil(meta.total_records / meta.limit);
    document.querySelector("#listing_paginate").style.display = (pbc < 2) ? "none" : "block";

    let page = getPageNumber(); 
    let html = '<ul class="pagination d-flex justify-content-end pagination-flat mb-0">';
    html += '<li class="paginate_button page-item previous" id="listing_previous"><a href="#" aria-controls="order-listing" data-type="prev" data-page="0" tabindex="0" class="page-link"><span aria-hidden="true">&laquo;</span></li>';
    let i = 0;
    while(i<pbc){

        i++; 
        if(((i >= page-3) && (i <= page)) || ((i <= page+3) && (i >=page))){

            html += '<li class="paginate_button page-item '+((page==i)?'active':'')+'"><a href="#" aria-controls="order-listing" data-type="page" data-page="'+i+'" tabindex="0" class="page-link">'+(page==i?i:i)+'</a></li>';      
        }
    }  
    html += '<li class="paginate_button page-item next" id="order-listing_next"><a href="#" aria-controls="order-listing" data-type="next" data-page="2" tabindex="0" class="page-link"><span aria-hidden="true">&raquo;</span></a></li>';
    html += '</ul>'

    document.querySelector("#listing_paginate").innerHTML = html;

    let page_link = document.querySelectorAll(".page-link");
    for (const l of page_link) {
        l.addEventListener('click', function(e) {

            let p = parseInt(getPageNumber());
            let ps = p;
            switch(l.dataset.type){ 
                case 'prev': p-=1; if(p<1) p = 1; break;
                case 'page': p=l.dataset.page; break;
                case 'next': p+=1; if(p>pbc) p = pbc; break;
            }
            
            // update url
            if (window.history.replaceState) {

                // let url = window.location.href.split('/page');
                // let urlF = (url[0]+'/page'+p).replace('//page', '/page');

                let str = window.location.search;
                str = replaceQueryParam('page', p, str);
                // window.location = window.location.pathname + str

                // prevents browser from storing history with each change:
                window.history.replaceState("kenzap-cloud", document.title, window.location.pathname + str);
            }

            // only refresh if page differs
            if(ps!=p) cb();
            
            e.preventDefault();
            return false;
        });
    }
}

export const formatStatus = (__, st) => {

    st = parseInt(st); 
    switch(st){ 
      case 0: return '<div class="badge bg-warning text-dark fw-light">' + __('Draft') + '</div>';
      case 1: return '<div class="badge bg-primary fw-light">' + __('Published') + '</div>';
      case 3: return '<div class="badge bg-secondary fw-light">' + __('Unpublished') + '</div>';
      default: return '<div class="badge bg-secondary fw-light">' + __('Drafts') + '</div>';
    }
}

/**
    * Render price
    * @public
    */
 export const priceFormat = function(_this, price) {

    price = makeNumber(price);

    let priceF = (Math.round(parseFloat(price) * 100)/100).toFixed(2);
    
    switch(_this.state.settings.currency_symb_loc){
        case 'left': priceF = _this.state.settings.currency_symb + priceF; break;
        case 'right': priceF = priceF + _this.state.settings.currency_symb; break;
    }

    return priceF;
}

/**
    * Normalize number variables mostly to cover malformed data cases
    * @public
    */
// export const makeNumber = function(price) {

//     price = price == "" ? 0 : price;

//     return price;
// }

// export const formatPrice = (price) => {

//     const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD", });
//     if(typeof(price) === 'undefined' || price == '') price = 0;
//     price = parseFloat(price);
//     price = formatter.format(price);
//     return price;
// }

export const makeNumber = function(price) {

    price = price == "" ? 0 : price;
    price = parseFloat(price);
    return price;
}

export const formatTime = (__, timestamp) => {
	
    let a = new Date(timestamp * 1000);
    let months = [__('Jan'), __('Feb'), __('Mar'), __('Apr'), __('May'), __('Jun'), __('Jul'), __('Aug'), __('Sep'), __('Oct'), __('Nov'), __('Dec')];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

// nums only validation
export const numsOnly = (e, max) => {

    // Only ASCII charactar in that range allowed 
    var ASCIICode = (e.which) ? e.which : e.keyCode 
    if (ASCIICode > 31 && ASCIICode != 46 && (ASCIICode < 48 || ASCIICode > 57)) 
    return false; 

    if(parseFloat(e.target.value)>max) 
    return false; 

    let dec = e.target.value.split('.');
    if(dec.length>1)
    if(dec[1].length>1)
        return false;
    
    return true; 
}

export const onClick = (sel, fn) => {

    // console.log('onClick');
    if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

        e.removeEventListener('click', fn, true);
        e.addEventListener('click', fn, true);
    }
}

// time elapsed since creation 
export const timeConverterAgo = (now, time) => {

    // console.log(now + " " + time);

    now = parseInt(now);
    time = parseInt(time);

    // console.log(now + " " + time);

    // parse as elapsed time
    let past = now - time;
    if(past < 60) return 'moments ago';
    if(past < 3600) return parseInt(past / 60) + ' minutes ago';
    if(past < 86400) return parseInt(past / 60 / 24) + ' hours ago';

    // process as normal date
    var a = new Date(time * 1000);
    var months = [__('Jan'), __('Feb'), __('Mar'), __('Apr'), __('May'), __('Jun'), __('Jul'), __('Aug'), __('Sep'), __('Oct'), __('Nov'), __('Dec')];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

export const parseVariations = (_this, product) => {

    let html_vars = '';
    console.log(product.variations);
    if(typeof(product.variations !== 'undefined'))
    for(let v in product.variations){

        // variation type
        let type = '';	
        if(product.variations[v].type=='checkbox') type = 'check';
        if(product.variations[v].type=='radio')    type = 'radio';

        // update cart state
        // if(typeof(cart.state.product.variations[v]) === 'undefined') cart.state.product.variations[v] = {title: product.variations[v].title, required: product.variations[v].required, allow: product.variations[v].required == '1'?false:true };	

        // struct variation
        html_vars += '\
        <b>' + __(product.variations[v].title) + (product.variations[v].required == '1' ? ' <span class="tag">'+__('required')+'</span>':'')+'</b>\
        <div class="kp-'+type+'" >';

        // variation labels
        for(let d in product.variations[v].data){

            let checked = false;
            // for public qr feed
            // if(typeof(cart.state.product.variations[v]) !== 'undefined' && typeof(cart.state.product.variations[v].list) !== 'undefined' && typeof(cart.state.product.variations[v].list["_"+d]) !== 'undefined'){ checked = true; }
            
            // verify variation price validity
            product.variations[v].data[d]['price'] = makeNumber(product.variations[v].data[d]['price']);

            switch(type){
                case 'check':

                html_vars += '\
                    <label>\
                        <input type="checkbox" data-required="'+product.variations[v].required+'" data-indexv="'+v+'" data-index="'+d+'" data-title="'+product.variations[v].data[d]['title']+'" data-titlev="'+__(product.variations[v].title)+'" data-price="'+product.variations[v].data[d]['price']+'" '+(checked?'checked="checked"':'')+'>\
                        <div class="checkbox">\
                            <svg width="20px" height="20px" viewBox="0 0 20 20">\
                                <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>\
                                <polyline points="4 11 8 15 16 6"></polyline>\
                            </svg>\
                        </div>\
                        <span>'+__(product.variations[v].data[d]['title'])+'</span>\
                        <div class="price">+ '+priceFormat(_this, product.variations[v].data[d]['price'])+'</div>\
                    </label>';
                
                break;
                case 'radio':

                html_vars += '\
                    <label>\
                        <input type="radio" data-required="'+product.variations[v].required+'" data-indexv="'+v+'" name="radio'+v+'" data-index="'+d+'" data-title="'+product.variations[v].data[d]['title']+'" data-titlev="'+__(product.variations[v].title)+'" data-price="'+product.variations[v].data[d]['price']+'" '+(checked?'checked="checked"':'')+' />\
                        <span>'+__(product.variations[v].data[d]['title'])+'</span>\
                        <div class="price">+ '+priceFormat(_this, product.variations[v].data[d]['price'])+'</div>\
                    </label>';
                
                break;
            }
        }

        html_vars += '</div>';
    }

    return html_vars;
}

export const escape = (htmlStr) => {

    return htmlStr.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");        
 
}

export const unescape = (htmlStr) => {

    htmlStr = htmlStr.replace(/&lt;/g , "<");	 
    htmlStr = htmlStr.replace(/&gt;/g , ">");     
    htmlStr = htmlStr.replace(/&quot;/g , "\"");  
    htmlStr = htmlStr.replace(/&#39;/g , "\'");   
    htmlStr = htmlStr.replace(/&amp;/g , "&");
    return htmlStr;
}

export const getCurrencies = () => {

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
}