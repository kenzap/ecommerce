import { headers, showLoader, hideLoader, onClick, onKeyUp, simulateClick, parseApiError, spaceID, toast } from '@kenzap/k-cloud';
import { timeConverterAgo, priceFormat, getPageNumber, makeNumber, parseVariations, escape, unescape } from "../_/_helpers.js"


export const printReceipt = (_this, order) => {

    // console.log(order.items);

    // vars
    let o = order, data = {}, date = new Date();

    // debug vs actual print
    data.debug = false;

    // get receipt template
    data.print = _this.state.settings.receipt_template;

    // console.log(data.print);

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
    order_totals += '[L]Subtotal[R]' + priceFormat(_this, o.price.total) + '\n';
    if(o.price.discount_total > 0) order_totals += '[L]'+__('Discount')+'[R]-' + priceFormat(_this, o.price.discount_total) + '\n';
    if(o.price.fee_total > 0) order_totals += '[L]'+_this.state.settings.fee_display+'[R]' + priceFormat(_this, o.price.fee_total) + '\n';
    if(o.price.tax_total > 0) order_totals += '[L]'+_this.state.settings.tax_display+'[R]' + priceFormat(_this, o.price.tax_total) + '\n';
    if(o.price.grand_total > 0) order_totals += '[L]'+__('Grand Total')+'[R]' + priceFormat(_this, o.price.grand_total);

    data.print = data.print.replace(/{{order_totals}}/g, order_totals);

    // qr link
    data.print = data.print.replace(/{{qr_link}}/g, 'http://'+_this.state.qr_settings.slug + '.kenzap.site');
    data.print = data.print.replace(/{{qr_number}}/g, document.querySelector('#qr-number').value);

    let str = 'kenzapprint://kenzapprint.app?data='+encodeURIComponent(JSON.stringify(data));
    
    console.log(data.print);

    if(data.debug) { console.log(data.print); console.log(str); }

    return str;
}

// 58mm wide thermal printers are best to display 32 chars per line
export const row = (txt, end_ofst) => {

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

export const getPrintItems = (_this, o, cat) => {

    let items = '';
    for(let i in o.items){

        // console.log(cat);
        // console.log(o.items[i].cats);
        // if(!o.items[i].cats) o.items[i].cats = [];

        if(!o.items[i].cats.includes(cat) && cat.length > 0) continue;

        let total = priceFormat(_this, o.items[i].total);
        let end_ofst = (o.items[i].qty+"").length + (total+"").length + 3;
        items += `[L]<b>${ o.items[i].qty } X ${ row(__(o.items[i].title), end_ofst) }</b>[R]${ total }\n`;
        for(let v in o.items[i].variations){

            items += `[L] ${ row(__(o.items[i].variations[v].title), 1) }:`;
            for(let l in  o.items[i].variations[v].list) items += ` ${ o.items[i].variations[v].list[l].title },`;

            if(items.endsWith(',')) items = items.substring(0, items.length - 1) + '\n';
        }
    }
    if(items.endsWith('\n')) items = items.substring(0, items.length - 2);

    return items;
}

export const printQR = (_this, order) => {

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


// export const print = {

//     viewOrder: (_this) => {

//         print._this = _this;
//         onClick('.print-order', (e) => { print.renderOrder(_this, e); });
//     },
//     renderOrder: (_this, e) => {

//         e.preventDefault();
        
//         const date = new Date();
//         let i = e.currentTarget.dataset.index; // _this.state.orderPreviewIndex = i;
//         _this.state.orderSingle = _this.state.orders[i];
//         let o = _this.state.orders[i];

//         let data = {};
//         data.print = _this.state.settings.receipt_template;

//         // var today = new Date();
//         // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//         // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

//         // order id
//         data.print = data.print.replace(/{{order_id_short}}/g, o.id.substr(0, 5));

//         // current time
//         data.print = data.print.replace(/{{date_time}}/g,  date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short', }));

//         // order items
//         data.print = data.print.replace(/{{order_items}}/g, print.getItems(_this, o, ''));

//         // order note
//         let note = o.note.length == 0 || o.note == '<br>' ? '' : o.note;
//         if(note.length>0){
//             //  data.print += '[C]================================';
//             data.print = data.print.replace(/{{order_note}}/g, '[C]================================\n' + note + '\n[C]================================\n');
//         }
 
//         // order totals
//         data.print = data.print.replace(/{{total}}/g, priceFormat(_this, o.price.total));
//         data.print = data.print.replace(/{{total_tax}}/g, priceFormat(_this, o.price.tax_total));
//         data.print = data.print.replace(/{{grand_total}}/g, priceFormat(_this, o.price.grand_total));
        
//         // debug vs actual print
//         data.debug = false;

//         console.log('kenzapprint://kenzapprint.app?data='+encodeURIComponent(JSON.stringify(data)));

//         toast(__('Printing'));

//         location.href = 'kenzapprint://kenzapprint.app?data='+encodeURIComponent(JSON.stringify(data));

//         return false;
//     },
//     getItems: (_this, o, cat) => {

//         let items = '';
//         for(let i in o.items){

//             if(cat.length > 0) if(!o.items.cats.includes(cat)) continue;

//             items += `[L]<b>${ o.items[i].qty } X ${ o.items[i].title }</b>[R]${ priceFormat(_this, o.items[i].total) }\n`;
//             for(let v in o.items[i].variations){
    
//                 items += `[L]| ${ o.items[i].variations[v].title }:`;
//                 for(let l in  o.items[i].variations[v].list) items += ` ${ o.items[i].variations[v].list[l].title },`;

//                 if(items.endsWith(',')) items = items.substring(0, items.length - 1) + '\n';
//             }
//         }
//         if(items.endsWith('\n')) items = items.substring(0, items.length - 2);

//         return items;
//     }
// }