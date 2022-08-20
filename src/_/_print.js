import { headers, __html, parseApiError, spaceID, toast, __ } from '@kenzap/k-cloud';
import { priceFormat, renderNotifications } from "../_/_helpers.js"

export const printReceipt = (_this, _id, type, template, debug = false) => {

    let o = {}, data = {}, date = new Date();
    if(_id=="test"){

        o = {
            _id: "test",
            id: "test",
            created: 1649831099,
            from: "dine-in",
            idd: "",
            items: [
                {
                    cats: [],
                    id: "02de5fc62938ba0b031b4e80e962bac15a7285d8",
                    index: "0",
                    note: "",
                    price: 45,
                    qty: 2,
                    sdesc: "Salted Egg Crab",
                    title: "咸蛋螃蟹",
                    total: 45,
                    type: "new",
                    variations: [],
                },
                {
                    cats: [],
                    id: "69ae96cfb7b25c358dd07560fc55e7d83cae2eb7",
                    index: "0",
                    note: "",
                    price: 45,
                    qty: 1,
                    sdesc: "Kam Heong Crab",
                    title: "金香螃蟹",
                    total: 45,
                    type: "new",
                    variations: [],
                },
                {
                    cats: ['Other'],
                    id: "a678f2b21a3a3f7e97b6707d8223f32d17ecbefa",
                    index: "0",
                    note: "",
                    price: 10,
                    qty: 12,
                    sdesc: "",
                    title: "鱼鳔羮",
                    total: 10,
                    type: "new",
                    variations: [],
                },
                {
                    cats: ['Other'],
                    id: "a678f2b21a3a3f7e97b6707d8223f32d17ecbefa",
                    index: "0",
                    note: "",
                    price: 25,
                    qty: 1,
                    sdesc: "",
                    title: "螃蟹米粉汤 (粗/幼米粉）",
                    total: 25,
                    type: "new",
                    variations: [],
                },
                {
                    cats: ['Other'],
                    id: "a678f2b21a3a3f7e97b6707d8223f32d17ecbefa",
                    index: "0",
                    note: "",
                    price: 4,
                    qty: 1,
                    sdesc: "",
                    title: "Fied Chicken Noodles",
                    total: 4,
                    type: "new",
                    variations: [],
                }
            ],
            kid: "0",
            name: "dine-in",
            note: "",
            sid: spaceID,
            status: "new",
            price: { 
                discount_percent: 10,
                discount_total: 11.105,
                discount_value: 0,
                fee_total: 0,
                grand_total: 99.95,
                payment_method: "Cash",
                tax_percent: 0,
                tax_total: 0,
                total: 111.05 
            },
            step: 1,
            table: "table test",
            total: 111.05,
            total_all: 99.95,
            updated: 1649833845
        }

    }else{
        o = _this.state.orders.filter(order => { return order._id == _id; })[0], data = {}, date = new Date();
    }
 
    // console.log(o);

    // debug vs actual print
    data.debug = debug;

    // find receipt template if none is provided
    if(!template){

        // any user designated templates?
        let templates = _this.state.settings['templates'].filter(template => { return template.type == "receipt" && (template.user == _this.state.user.id); });
        
        // get default templagte
        if(templates.length == 0) templates = _this.state.settings['templates'].filter(template => { return template.type == "receipt" && (template.user == ""); });

        // assign template
        data.print = templates.length > 0 ? templates[0].template : "Kenzap Cloud: no receipt template found";

        // default
        template = templates.length > 0 ? templates[0] : {};
    }else{

        data.print = template.template;
    }

    // find max char per line parameter
    let cols_p = data.print.indexOf('[W:'); let cols = 20;
    if(cols_p!=-1){ cols = parseInt(data.print.substr(cols_p+3, 2)); data.print = data.print.substr(0, cols_p) + data.print.substr(cols_p+6, data.print.length); }

    // order id
    data.print = data.print.replace(/{{order_id}}/g, o.id);

    // order from
    data.print = data.print.replace(/{{order_from}}/g, o.from);

    // table no
    data.print = data.print.replace(/{{order_table}}/g, o.table ? o.table : "");

    // current time
    data.print = data.print.replace(/{{date_time}}/g, date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short', }));

    // order items
    data.print = data.print.replace(/{{order_items}}/g, getPrintItems(_this, o, '', cols));

    console.log(template);

    // order items restricted by category
    const matches = data.print.matchAll(/{{order_items:(.*?):start}}/g);
    Array.from(matches, x => x[1]).forEach(cat => {

        // console.log(cat);

        // const items_match = data.print.matchAll(/{{order_items:Frog:start}}([\s\S]*?){{order_items:Frog:end}}/g);

        let items_restricted = getPrintItems(_this, o, cat, cols);

        // order items cat
        let replace = "{{order_items:"+cat+"}}";
        let re = new RegExp(replace,"g");
        data.print = data.print.replace(re, items_restricted);

        // remove entire block if no items for requested category are present 
        if(items_restricted.length<2){

            let start = data.print.indexOf("{{order_items:"+cat+":start}}");
            let end = data.print.indexOf("{{order_items:"+cat+":end}}") + ("{{order_items:"+cat+":end}}").length;

            data.print = data.print.slice(0, start) + data.print.slice(end);

        // get rid of start/end row indicators
        }else{

            replace = "\n{{order_items:"+cat+":start}}";
            re = new RegExp(replace,"g");
            data.print = data.print.replace(re, '');

            replace = "\n{{order_items:"+cat+":end}}";
            re = new RegExp(replace,"g");
            data.print = data.print.replace(re, '');
        }
    });

    // order note
    let note = !o.note || o.note == '<br>' ? '' : o.note;
    if(note.length>0){
        //  data.print += '[C]================================';
        data.print = data.print.replace(/{{order_note}}/g, '[C]================================\n' + note + '\n[C]================================\n');
    }

    // order totals
    data.print = data.print.replace(/{{total}}/g, priceFormat(_this, o.price.total));
    data.print = data.print.replace(/{{tax_total}}/g, priceFormat(_this, o.price.tax_total));
    data.print = data.print.replace(/{{discount_total}}/g, priceFormat(_this, o.price.discount_total));
    data.print = data.print.replace(/{{grand_total}}/g, priceFormat(_this, o.price.grand_total));

    let order_totals  = '';
    order_totals += '[L]' + __('Subtotal')+'[R]' + priceFormat(_this, o.price.total) + '\n';
    if(o.price.discount_total > 0) order_totals += '[L]'+__('Discount')+'[R]-' + priceFormat(_this, o.price.discount_total) + '\n';
    if(o.price.fee_total > 0) order_totals += '[L]'+_this.state.settings.fee_display+'[R]' + priceFormat(_this, o.price.fee_total) + '\n';
    if(o.price.tax_total > 0) order_totals += '[L]'+_this.state.settings.tax_display+'[R]' + priceFormat(_this, o.price.tax_total) + '\n';
    if(o.price.grand_total > 0) order_totals += '[L]'+__('Grand Total')+'[R]' + priceFormat(_this, o.price.grand_total);

    data.print = data.print.replace(/{{order_totals}}/g, order_totals);

    // qr link
    // data.print = data.print.replace(/{{qr_link}}/g, 'http://'+_this.state.qr_settings.slug + '.kenzap.site');
    if(document.querySelector('#qr-number')) data.print = data.print.replace(/{{qr_number}}/g, document.querySelector('#qr-number').value);

    if(data.debug){ console.log(data.print); }

    let printers = type == "user" ? template["user_print"] : template["auto_print"];

    // console.log(printers);

    data["user"] = _this.state.user.id;
    data["printers"] = printers;
    data["type"] = "receipt";

    // process styling
    data.print = processStyling(data.print, cols);

    // console.log(data.print); return;

    // send data
    fetch('https://api-v1.kenzap.cloud/ecommerce/', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
            query: {
                print: {
                    type:       'print',
                    data:       data,
                    sid:        spaceID(),
                }
            }
        })
    })
    .then(response => response.json())
    .then(response => {

        if (response.success){

            toast( __('Printing order #'+o.id) );

        }else{

            parsePrintError(_this, response);

            // parseApiError(response);
        }
    })
    .catch(error => {

        parseApiError(error);
    });

    _this.state.printRequest = null;

    return true;
}

export const processStyling = (print, cols) => {

    // preprocess lines
    let rows = print.split('\n');
    let output = "";
    for(let row of rows){

        let max_char = cols;

        let s = row.indexOf('[S]');
        let r = row.indexOf('[R]');
        let l = row.indexOf('[L]');
        let c = row.indexOf('[C]');
        
        // chinese, japanese.. chars are twice the size of latin chars, deduct it
        max_char -= countDoubledChars(row) ? countDoubledChars(row) : 1;

        // [S] stretch to fit row width
        if(s!=-1){

            row = row.substr(0, s) + row.substr(s+3, row.length);
        }

        // [R] right aign text
        if(r!=-1){ 

            let spaceN = max_char - (row.substr(0, r) + row.substr(r+3, row.length)).length;

            // other tags offset
            if(l!=-1) spaceN += 3; if(c!=-1) spaceN += 3;

            row = row.substr(0, r) + addSpaces(spaceN) + row.substr(r+3, row.length)
        }

        // [L] left align text
        if(l!=-1){

            let spaceN = max_char - (row.substr(0, l) + row.substr(l+3, row.length)).length;
            row = row.substr(0, l) + row.substr(l+3, row.length) + addSpaces(spaceN); 
        }

        // [C] center align text
        if(c!=-1){ 
            
            let spaceN = max_char - (row.substr(0, r) + row.substr(r+3, row.length)).length;

            row = addSpaces(Math.floor(spaceN/2)) + row.substr(0, c) + row.substr(c+3, row.length) + addSpaces(Math.ceil(spaceN/2));
        }

        // clean empty row
        let empty = 0; [...row].forEach(char => { if (char==" ") empty +=1 ; }); if(empty>=max_char) row = ""; // console.log(empty + " " + max_char);

        output += row+"\n";
    }

    return output;
}

export const addSpaces = (l) => {

    let s = "";
    for(let i=0;i<=l;i++){s+=" ";}
    return s;
}

export const printReceiptLegacy = (_this, _id, type, template) => {

    let o = _this.state.orders.filter(order => { return order._id == _id; })[0], data = {}, date = new Date();

    // debug vs actual print
    data.debug = false;

    // find receipt template if none is provided
    if(!template){

        // any user designated templates?
        let templates = _this.state.settings['templates'].filter(template => { return template.type == "receipt" && (template.user == _this.state.user.id); });
        
        // get default templagte
        if(templates.length == 0) templates = _this.state.settings['templates'].filter(template => { return template.type == "receipt" && (template.user == ""); });

        // assign template
        data.print = templates.length > 0 ? templates[0].template : "Kenzap Cloud: no receipt template found";

        // default
        template = templates.length > 0 ? templates[0] : {};
    }else{

        data.print = template.template;
    }

    // order id
    data.print = data.print.replace(/{{order_id}}/g, o.id);

    // table no
    data.print = data.print.replace(/{{order_table}}/g, o.table ? o.table : "");

    // current time
    data.print = data.print.replace(/{{date_time}}/g, date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short', }));

    // order items
    data.print = data.print.replace(/{{order_items}}/g, getPrintItems(_this, o, ''));

    // order items restricted by category
    const matches = data.print.matchAll(/{{order_items:(.*?):start}}/g);
    Array.from(matches, x => x[1]).forEach(cat => {

        // const items_match = data.print.matchAll(/{{order_items:Frog:start}}([\s\S]*?){{order_items:Frog:end}}/g);

        let items_restricted = getPrintItems(_this, o, cat);

        // order items cat
        let replace = "{{order_items:"+cat+"}}";
        let re = new RegExp(replace,"g");
        data.print = data.print.replace(re, items_restricted);

        // remove entire block if no items for requested category are present 
        if(items_restricted.length<2){

            console.log("removing entire block");

            let start = data.print.indexOf("{{order_items:"+cat+":start}}");
            let end = data.print.indexOf("{{order_items:"+cat+":end}}") + ("{{order_items:"+cat+":end}}").length;

            data.print = data.print.slice(0, start) + data.print.slice(end);

            // replace = "\n{{order_items:"+cat+":start}}([\s\S]){{order_items:"+cat+":end}}";
            // re = new RegExp(replace,"g");
            // data.print = data.print.replace(re, "");

        // get rid of start/end row indicators
        }else{

            replace = "\n{{order_items:"+cat+":start}}";
            re = new RegExp(replace,"g");
            data.print = data.print.replace(re, '');

            replace = "\n{{order_items:"+cat+":end}}";
            re = new RegExp(replace,"g");
            data.print = data.print.replace(re, '');
        }
    });

    // order note
    let note = !o.note || o.note == '<br>' ? '' : o.note;
    if(note.length>0){
        //  data.print += '[C]================================';
        data.print = data.print.replace(/{{order_note}}/g, '[C]================================\n' + note + '\n[C]================================\n');
    }

    // order totals
    data.print = data.print.replace(/{{total}}/g, priceFormat(_this, o.price.total));
    data.print = data.print.replace(/{{tax_total}}/g, priceFormat(_this, o.price.tax_total));
    data.print = data.print.replace(/{{discount_total}}/g, priceFormat(_this, o.price.discount_total));
    data.print = data.print.replace(/{{grand_total}}/g, priceFormat(_this, o.price.grand_total));

    let order_totals  = '';
    order_totals += '[L]'+__('Subtotal')+'[R]' + priceFormat(_this, o.price.total) + '\n';
    if(o.price.discount_total > 0) order_totals += '[L]'+__('Discount')+'[R]-' + priceFormat(_this, o.price.discount_total) + '\n';
    if(o.price.fee_total > 0) order_totals += '[L]'+_this.state.settings.fee_display+'[R]' + priceFormat(_this, o.price.fee_total) + '\n';
    if(o.price.tax_total > 0) order_totals += '[L]'+_this.state.settings.tax_display+'[R]' + priceFormat(_this, o.price.tax_total) + '\n';
    if(o.price.grand_total > 0) order_totals += '[L]'+__('Grand Total')+'[R]' + priceFormat(_this, o.price.grand_total);

    data.print = data.print.replace(/{{order_totals}}/g, order_totals);

    // qr link
    data.print = data.print.replace(/{{qr_link}}/g, 'http://'+_this.state.qr_settings.slug + '.kenzap.site');
    data.print = data.print.replace(/{{qr_number}}/g, document.querySelector('#qr-number').value);

    // let str = 'kenzapprint://kenzapprint.app?data='+encodeURIComponent(JSON.stringify(data));
    
    console.log(data.print);

    if(data.debug){ console.log(data.print); console.log(str); }

    let printers = type == "user" ? template["user_print"] : template["auto_print"];

    data["user"] = _this.state.user.id;
    data["printers"] = printers;
    data["type"] = "receipt";

    // send data
    fetch('https://api-v1.kenzap.cloud/ecommerce/', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
            query: {
                print: {
                    type:       'print',
                    data:       data,
                    sid:        spaceID(),
                }
            }
        })
    })
    .then(response => response.json())
    .then(response => {

        if (response.success){

            toast( __('Printing order #'+o.id) );

        }else{

            parsePrintError(_this, response);
            
            // parseApiError(response);
        }
    })
    .catch(error => {

        parseApiError(error);
    });

    _this.state.printRequest = null;

    return true;
}

/*
* 58mm wide thermal printers are best to display 20-32 chars per line
*
* @param    txt         text with long product item titles to process
* @param    end_ofst    previous iteation offset     
* @param    cols        max chars per line 
* @return 	{String} 	txt
* 
*/
export const row_latin = (txt, end_ofst) => {

    let output = '', max_char = 32 - end_ofst, max_ofst = 4, ofst_prev = 0, ofst = 0, ci = 0;
    // console.log(max_char);
    for(let i = 0; i < Math.ceil(txt.length / max_char); i++){

        // add new line print from second loop only
        if(i>0) output += '\n[L]';

        // ofst store first available whitespace break in words
        ofst = ci = 0;
        for(let e = max_ofst; e > -1 * max_ofst; e--){

            ci = ((max_char + ofst_prev) * i) + max_char + e; if(txt[ci] == ' ' || ci == txt.length){ ofst += e; break; }
        }

        // add line row
        output += txt.substr((max_char + ofst_prev) * i, max_char + ofst);

        // line ends earlier than expected, skip loop
        if(ci == txt.length) break;

        ofst_prev = ofst;
    }

    return output;
};

export const row = (txt, start_ofst, end_ofst, cols) => {

    cols-=1;

    let output = '', max_ofst = 6, ofst_prev = 0, ofst = 0, ci = 0;

    let first_row = true;

    for(let i = 0; i < txt.length; i++){
        
        output += txt[i];

        ofst += (1 + countDoubledChars(txt[i]));

        // first loop
        if(first_row && ofst >= cols - (start_ofst + end_ofst)){ output += '\n[L]'; ofst = 0; first_row = false;}

        // other loops
        if(ofst >= cols - end_ofst){ output += '\n[L]'; ofst = 0; }
    }

    return output;
}

export const countDoubledChars = (text) => {

    // This matches all CJK ideographs.
    var cjkRegEx = /[\u3400-\u4db5\u4e00-\u9fa5\uf900-\ufa2d]/;
  
    var wordCount = 0;
    var inWord = false;
    var length = text.length;
    for (var i = 0; i < length; i++) {

      var curChar = text.charAt(i);
      if (cjkRegEx.test(curChar)) {

        // Character is a CJK ideograph.
        // Count it as a word.
        wordCount += inWord ? 2 : 1;
        inWord = false;
      }
    }

    return wordCount;
}

export const getPrintItems = (_this, o, cat, cols) => {

    let items = '';

    // console.log(o.items);
  
    for(let i in o.items){

        if(o.items[i].cats == undefined) o.items[i].cats = [];

        if(!o.items[i].cats.includes(cat) && cat.length > 0) continue;

        let total = priceFormat(_this, o.items[i].total);
        // let end_ofst = ((o.items[i].qty+"") + " X " + (total+"")).length;
        // items += `[L]<b>${ o.items[i].qty } X ${ row(__(o.items[i].title), end_ofst) }</b>[R]${ total }\n`;
        items += `[L]${ o.items[i].qty } X ${ row( __(o.items[i].title), (o.items[i].qty+"").length + 3, (total+"").length, cols) }[R]${ total }\n`;
        for(let v in o.items[i].variations){

            items += `[L] ${ row( __(o.items[i].variations[v].title), 1, 0, cols) }:`;
            for(let l in  o.items[i].variations[v].list) items += ` ${ __(o.items[i].variations[v].list[l].title) },`;

            if(items.endsWith(',')) items = items.substring(0, items.length - 1) + '\n';
            if(!items.endsWith('\n')) items = items + '\n';
        }
    }

    if(items.endsWith('\n')) items = items.substring(0, items.length - 1);
 
    return items;
}

export const printQRNative = (_this, order) => {

    // vars
    let o = order, data = {}, date = new Date();

    // debug vs actual print
    data.debug = false;

    // get qr template
    data.print = _this.state.settings.qr_template;

    // qr link
    data.print = data.print.replace(/{{qr_link}}/g, 'http://'+_this.state.qr_settings.slug + '.kenzap.site');
    data.print = data.print.replace(/{{qr_number}}/g, document.querySelector('#qr-number').value);

    if(data.debug) { console.log(data.print); console.log(str); }

    let str = 'kenzapprint://kenzapprint.app?data='+encodeURIComponent(JSON.stringify(data));

    return str;
}

export const printQR = (_this, qrnum) => {

    // vars
    let data = {}, date = new Date();

    // debug vs actual print
    data.debug = false;

    // find QR template
    let templates = _this.state.settings['templates'].filter(template => { return template.type == "qr" && (template.user == "" || template.user == _this.state.user.id); });

    // get qr template
    data.print = templates.length > 0 ? templates[0].template : "Kenzap Cloud: no qr template found";

    // qr link
    data.print = data.print.replace(/{{qr_link}}/g, 'http://'+_this.state.qr_settings.slug + '.kenzap.site');

    // qr number
    qrnum = qrnum ? qrnum : document.querySelector('#qr-number').value;

    // qr number replace
    data.print = data.print.replace(/{{qr_number}}/g, qrnum);

    // find max char per line parameter
    let cols_p = data.print.indexOf('[W:'); let cols = 20;
    if(cols_p!=-1){ cols = parseInt(data.print.substr(cols_p+3, 2)); data.print = data.print.substr(0, cols_p) + data.print.substr(cols_p+6, data.print.length); }
    
    // pricess styling
    data.print = processStyling(data.print, cols);
  
    // if(data.debug) { console.log(data.print); }
    console.log(data.print);

    let printers = templates[0]["user_print"];

    data["user"] = _this.state.user.id;
    data["printers"] = printers;
    data["type"] = "qr";

    // return;

    // send data
    fetch('https://api-v1.kenzap.cloud/ecommerce/', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
            query: {
                print: {
                    type:       'print',
                    data:       data,
                    sid:        spaceID(),
                }
            }
        })
    })
    .then(response => response.json())
    .then(response => {

        if (response.success){

            toast( __('Printing') );

        }else{

            parsePrintError(_this, response);

            // parseApiError(response);
        }
    })
    .catch(error => {

        parseApiError(error);
    });
}

export const autoPrint = (_this) => {

    // console.log("autoPrint");

    // find auto printing receipt
    let templates = _this.state.settings['templates'].filter(template => { return template.auto_print_action == "new" && template.type == "receipt" && (template.user == "" || template.user == _this.state.user.id); });

    if(templates.length == 0) return false;

    autoPrintLoop(_this, templates[0]); setInterval((_this) => { autoPrintLoop(_this, templates[0]); }, 7000, _this);
}

export const autoPrintLoop = (_this, template) => {

    let last_print_id = localStorage.hasOwnProperty("last_print_id") ? localStorage.getItem("last_print_id") : 0;
    let i = _this.state.orders.length;

    while (i > 0){

        i--;

        if(_this.state.orders[i].status == "new" && parseInt(_this.state.orders[i].id) > last_print_id){

            localStorage.setItem("last_print_id", _this.state.orders[i].id);

            printReceipt(_this, _this.state.orders[i]._id, "auto", template);

            return false;
        }
    }
}

export const isPrintQREnabled = (_this) => {

    // find QR template
    let templates = _this.state.settings['templates'].filter(template => { return template.type == "qr" && (template.user == "" || template.user == _this.state.user.id); });

    return templates.length > 0 ? true : false;
}

const parsePrintError = (_this, response) => {

    toast( __(response.reason) );

    if(document.querySelector('.alert[data-id="print-api"')){ document.querySelector('.alert[data-id="print-api"').remove(); }

    let messages = [{ _id: "print-api", color: "danger", msg: __html(response.reason) }];

    renderNotifications(_this, messages);

    try{
        if(isMobile()) window.navigator.vibrate(200);
    }catch{

    }
}