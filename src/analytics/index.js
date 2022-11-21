// js dependencies
import { H, showLoader, hideLoader, initHeader, initBreadcrumbs, parseApiError, getCookie, link, onClick, onChange } from '@kenzap/k-cloud';
import { HTMLContent } from "../_/_cnt_analytics.js"
import { priceFormat, mt, initFooter } from "../_/_helpers.js"

// where everything happens
const _this = {

    state: {
        firstLoad: true,
        ajaxQueue: 0 ,
        modalCont: null,
        settings: {}, // where all requested settings are cached
        charts: {}
    },
    init: () => {
        
        _this.getData(); 
    },
    getData: () => {

        // show loader during first load
        if (_this.state.firstLoad) showLoader();

        // do API query
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    locale: {
                        type:       'locale',
                        source:      ['extension'],
                        key:         'ecommerce',
                    },
                    settings: {
                        type:       'get',
                        key:        'ecommerce-settings',
                        fields:     ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_auto_rate', 'tax_rate', 'tax_display'],
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if(response.success){

                // init header
                initHeader(response);

                // initiate locale
                // i18n.init(response.locale);

                // get core html content 
                _this.loadHomeStructure();  

                // render table
                _this.renderPage(response);

                // init header
                // _this.initHeader(response);

                // bind content listeners
                _this.initListeners();
            
                // initiate footer
                initFooter(_this);

                // first load
                _this.state.firstLoad = false;

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    },
    renderPage: (response) => {

        let d = document;

        // initiate breadcrumbs
        initBreadcrumbs(
            [
                { link: link('https://dashboard.kenzap.cloud'), text: __('Home') },
                { link: link('/home/'), text: __('E-commerce') },
                { text: __('Analytics') },
            ]
        );

        // cache settings globally
        _this.state.settings = response.settings;
    },
    // initHeader: (response) => {

    //     onClick('.nav-back', (e) => {

    //         e.preventDefault();
    //         console.log('.nav-back');
    //         let link = document.querySelector('.bc ol li:nth-last-child(2)').querySelector('a');
    //         simulateClick(link);
    //     });
    // },
    initListeners: () => {

        onClick('.sales-report', _this.salesReport);
        onClick('.products-report', _this.productReport);
    },
    salesReport: (e) => {

        e.preventDefault();

        let modal = document.querySelector(".modal");
        _this.state.modalCont = new bootstrap.Modal(modal);
        modal.querySelector(".modal-dialog").classList.add("modal-fullscreen");
        let html_head = `
        <input id="datepicker" class="form-control form-control-sm mt-1 border-0" placeholder="${ __('Today') }"/>
        `;
        
        modal.querySelector(".modal-title").innerHTML = __('Sales report') + " " + html_head;
        modal.querySelector(".btn-primary").style.display = 'none';
        modal.querySelector(".btn-secondary").innerHTML = __('Close');
        modal.querySelector(".modal-body").innerHTML = "Loading..";

        // range picker
        let bookedDates = [];
        const picker = new easepick.create({
            element: document.getElementById('datepicker'),
            css: [
                'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.1.7/dist/index.css',
                '/assets/css/date_picker.css',
            ],
            plugins: ['RangePlugin', 'LockPlugin'],
            RangePlugin: {
                tooltipNumber(num) {
                return num - 1;
                },
                locale: {
                one: __('day'),
                other: __('days'),
                },
            },
            LockPlugin: {
                maxDate: new Date(),
                minDays: 1,
                inseparable: true,
                filter(date, picked) {
                if (picked.length === 1) {
                    const incl = date.isBefore(picked[0]) ? '[)' : '(]';
                    return !picked[0].isSame(date, 'day') && date.inArray(bookedDates, incl);
                }
    
                return date.inArray(bookedDates, '[)');
                },
            }
        });
        
        // data change listener
        picker.on('select', (e) => { _this.salesReportData(); }, {});

        // get data now
        _this.salesReportData();

        // show modal
        _this.state.modalCont.show();
    },
    salesReportData: (e) => {

        // 2016-06-01T14:46:22.001Z
        let from = ""; 
        let to = ""; 

        let date = document.querySelector('#datepicker').value.split(' - ');
        if(date.length == 2){

            from = date[0].trim()+'T00:00:00.001Z'; 
            to = date[1].trim()+'T23:59:59.001Z'; 
        }else{

            let dateObj = new Date();
            from = dateObj.getUTCFullYear() + '-' + mt(dateObj.getUTCMonth() + 1) + '-' + mt(dateObj.getUTCDate()) + 'T00:00:00.001Z';
            to = dateObj.getUTCFullYear() + '-' + mt(dateObj.getUTCMonth() + 1) + '-' + mt(dateObj.getUTCDate()) + 'T23:59:00.001Z';
        }

        console.log(Date.parse(from) + ' ' + Date.parse(to));
        console.log((from) + ' ' + (to));

        // do API query
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    sales: {
                        type: "find",
                        key: "ecommerce-order",
                        fields: [
                            "status",
                            "updated",
                            "created_ymd"
                        ],
                        sum:["total","total_all"],
                        count:["total"],
                        term:[
                            {
                                "field": "created",
                                "relation": ">=",
                                "type": "numeric",
                                "value": Date.parse(from)  / 1000 | 0
                            },
                            {
                                "field": "status",
                                "relation": "=",
                                "type": "string",
                                "value":"completed"
                            },
                            {
                                "field": "created",
                                "relation": "<=",
                                "type": "numeric",
                                "value": Date.parse(to) / 1000 | 0
                            },
                        ],
                        groupby: [
                            {
                                "field": "created_ymd"
                            }
                        ],
                        sortby: {
                            "field": "created_ymd",
                            "order": "DESC"
                        },
                        limit: 40,
                        offset: 0
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if(response.success){

                //console.log(response.sales);

                let ds = [['Period', 'Tax', 'Total']];
                let obj = {total: 0, total_all: 0}; // total_tax: 0, 
                let obj_txt = {total: __('Subtotal'), total_all: __('Grand Total')}; // total_tax: __('Total tax'),

                if(response.sales.length == 0){ document.querySelector(".modal-body").innerHTML = __('No data to display'); return; }

                response.sales.forEach(el => {

                    // skipping null records
                    if(el.created_ymd){

                        el.total_sum = el.total_sum ? el.total_sum : 0;
                        //el.total_tax_sum = el.total_tax_sum ? el.total_tax_sum : 0;
                        el.total_all_sum = el.total_all_sum ? el.total_all_sum : 0;

                        obj.total += el.total_sum;
                        //obj.total_tax += el.total_tax_sum;
                        obj.total_all += el.total_all_sum;
                        
                        ds.push([el.created_ymd, el.total_sum, el.total_all_sum]); // el.total_tax_sum,
                    }
                });

                // console.log(ds);

                let html_body = `<div id="sales-chart" style="min-height:300px"></div>`;
                for(let i in obj){

                    html_body += `
                    <div class="mb-3 mt-3 order-row" >
                        <b>${ obj_txt[i] }</b> ${ priceFormat(_this, obj[i]) }
                    </div>`;
                }
        
                document.querySelector(".modal-body").innerHTML = html_body;
                    
                // avg heart rate chart
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(() => {

                    let data = google.visualization.arrayToDataTable(ds);
                    
                    let options = {
                        // title: document.querySelector("[data-period='"+period+"']").innerHTML + ' average',
                        // title: 'sales average',
                        // titleColor: '#212529',
                        animation:{
                            duration: 1000,
                            easing: 'out',
                        },
                        hAxis: { titleTextStyle: { color: '#1941df' }, baselineColor: '#1941df', textStyle: { color: '#212529', fontSize: 12, bold: true } },
                        vAxis: { titleTextStyle: { color: '#1941df' }, minValue: 0, textStyle: { color: '#212529', fontSize: 12, bold: true } },
                        backgroundColor: { stroke: '#1941df', fill: 'transparent', strokeWidth: 0 },
                        colors: [  '#dc3545','#1941df', '#198754' ],
                        bar: {groupWidth: "95%"},
                        legend: { position: "none" },
                    };

                    // var chart = new google.visualization.AreaChart(document.getElementById('customer-chart'));

                    // if(!_this.state.charts.sales) 
                    _this.state.charts.sales = new google.visualization.ColumnChart(document.getElementById('sales-chart'));
                    _this.state.charts.sales.draw(data, options);
                });

      
            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });

    },
    productReport: (e) => {

        e.preventDefault();

        let modal = document.querySelector(".modal");
        _this.state.modalCont = new bootstrap.Modal(modal);
        modal.querySelector(".modal-dialog").classList.add("modal-fullscreen");
        let html_head = `
        <input id="datepicker" class="form-control form-control-sm mt-1 border-0" placeholder="${ __('Today') }"/>
        `;
        
        modal.querySelector(".modal-title").innerHTML = __('Top products') + " " + html_head;
        modal.querySelector(".btn-primary").style.display = 'none';
        modal.querySelector(".btn-secondary").innerHTML = __('Close');
        modal.querySelector(".modal-body").innerHTML = "Loading..";

        // range picker
        let bookedDates = [];
        const picker = new easepick.create({
            element: document.getElementById('datepicker'),
            css: [
                'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.1.7/dist/index.css',
                '/assets/css/date_picker.css',
            ],
            plugins: ['RangePlugin', 'LockPlugin'],
            RangePlugin: {
                tooltipNumber(num) {
                return num - 1;
                },
                locale: {
                one: __('day'),
                other: __('days'),
                },
            },
            LockPlugin: {
                maxDate: new Date(),
                minDays: 1,
                inseparable: true,
                filter(date, picked) {
                if (picked.length === 1) {
                    const incl = date.isBefore(picked[0]) ? '[)' : '(]';
                    return !picked[0].isSame(date, 'day') && date.inArray(bookedDates, incl);
                }
    
                return date.inArray(bookedDates, '[)');
                },
            }
        });
        
        // data change listener
        picker.on('select', (e) => { _this.productsReportData(); }, {});

        // get data now
        _this.productsReportData();

        // show modal
        _this.state.modalCont.show();
    },
    productsReportData: (e) => {

        // 2016-06-01T14:46:22.001Z
        let from = ""; 
        let to = ""; 

        let date = document.querySelector('#datepicker').value.split(' - ');
        if(date.length == 2){

            from = date[0].trim()+'T00:00:00.001Z'; 
            to = date[1].trim()+'T23:59:59.001Z'; 
        }else{

            let dateObj = new Date();
            from = dateObj.getUTCFullYear() + '-' + mt(dateObj.getUTCMonth() + 1) + '-' + mt(dateObj.getUTCDate()) + 'T00:00:00.001Z';
            to = dateObj.getUTCFullYear() + '-' + mt(dateObj.getUTCMonth() + 1) + '-' + mt(dateObj.getUTCDate()) + 'T23:59:00.001Z';
        }

        console.log(Date.parse(from) + ' ' + Date.parse(to));
        console.log((from) + ' ' + (to));

        // do API query
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    products: {
                        type: "find",
                        key: "ecommerce-order",
                        fields: [
                            "items",
                            "updated",
                            "created_ymd"
                        ],
                        // sum:["items"],
                        // count:["total"],
                        term:[
                            {
                                "field": "created",
                                "relation": ">=",
                                "type": "numeric",
                                "value": Date.parse(from)  / 1000 | 0
                            },
                            {
                                "field": "status",
                                "relation": "=",
                                "type": "string",
                                "value":"completed"
                            },
                            {
                                "field": "created",
                                "relation": "<=",
                                "type": "numeric",
                                "value": Date.parse(to) / 1000 | 0
                            },
                        ],
                        // groupby: [
                        //     {
                        //         "field": "created_ymd"
                        //     }
                        // ],
                        sortby: {
                            "field": "created",
                            "order": "DESC"
                        },
                        limit: 1000,
                        offset: 0
                    },
                    settings: {
                        type:       'get',
                        key:        'ecommerce-settings',
                        fields:     ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_auto_rate', 'tax_rate', 'tax_display'],
                    },
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if(response.success){

                _this.state.settings = response.settings;

                // console.log(response.products);
                let html = `
                    <div class="table-responsive">
                        <table class="table table-hover table-borderless align-middle table-striped table-p-list mb-0" style="min-width: 800px;">
                            <thead>
                                <tr><th><div class="me-1 me-sm-3">${ __('Product') }</div></th><th class="qty"><div class="me-1 me-sm-3">${ __('Qty') }</div></th><th class="tp"><div class="me-1 me-sm-3">${ __('Total') }</div></th><th></th>
                            </thead>
                            <tbody>`;

                // let html = `<table class="items order-form" data-type="items"><tr><th><div class="me-1 me-sm-3">${ __('Product') }</div></th><th class="qty"><div class="me-1 me-sm-3">${ __('Qty') }</div></th><th class="tp"><div class="me-1 me-sm-3">${ __('Total') }</div></th><th></th></tr>`;
                let s = [], totals = {qty: 0, total: 0};
                response.products.forEach(o => {

                    if(Array.isArray(o.items)){

                        o.items.forEach(p => {

                            if(!s[p.id]){
                                
                                s[p.id] = {id: p.id, title: p.title, qty: p.qty, qty: p.qty, total: p.total};
                            }else{

                                s[p.id].qty += p.qty;
                                s[p.id].total += p.total;
                            }
                        });
                    }
                });

                // convert to array and skip ID indexes
                let list = Object.keys(s).map((key) => s[key]);

                // sort in descending order by total quantity
                list.sort((a, b) => b.qty - a.qty);
                // console.log(list);

                // add product row
                list.forEach(i => {

                        let img = 'https://cdn.kenzap.com/loading.png';

                        html += `
                            <tr class="new-item-row">
                                <td class="d-none">
                                    <div class="timgc me-1 me-sm-3">
                                        <a href="${ link('/product-edit/?id='+i.id) }"><img src="${ img }" data-srcset="${ img }" class="img-fluid rounded" alt="${ __("Product placeholder") }" srcset="${ img }" ></a>
                                    </div>
                                </td>
                                <td class="destt" style="max-width:250px;min-width:150px;">
                                    <div class="my-1"> 
                                        <a class="text-body" href="${ link('/product-edit/?id='+i.id) }" >${ i.title }<i style="color:#9b9b9b;font-size:15px;margin-left:8px;" title="${ __("Edit product") }" class="mdi mdi-pencil menu-icon edit-page"></i></a>
                                    </div>
                                </td>
                                <td class="qty">
                                    <div class="me-1 me-sm-3">
                                        ${ i.qty }
                                    </div>
                                </td>
                                <td class="tp">
                                    ${  priceFormat(_this, i.total) }
                                </td>
                                <td class="align-middle text-center"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="24" height="24" class="bi bi-plus-circle text-success align-middle add-item"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
                                </td>
                            </tr>`;

                            totals.qty += i.qty;
                            totals.total += i.total;
                });

                // list is empty 
                if(list.length == 0) html += `<tr><td colspan="4">${ __('No data to display') }</td></tr>`;

                // add totals row
                if(list.length > 0) html += `<tr><td><b>${ __('Totals') }</b></td><td>${ totals.qty }</td><td>${ priceFormat(_this, totals.total) }</td><td> </td></tr>`;

                html += `</tbody>
                    </table>
                </div>`;

            
                document.querySelector(".modal-body").innerHTML = html;
                    
                // avg heart rate chart
                // google.charts.load('current', {'packages':['corechart']});
                // google.charts.setOnLoadCallback(() => {

                //     let data = google.visualization.arrayToDataTable(ds);
                    
                //     let options = {
                //         // title: document.querySelector("[data-period='"+period+"']").innerHTML + ' average',
                //         // title: 'sales average',
                //         // titleColor: '#212529',
                //         animation:{
                //             duration: 1000,
                //             easing: 'out',
                //         },
                //         hAxis: { titleTextStyle: { color: '#1941df' }, baselineColor: '#1941df', textStyle: { color: '#212529', fontSize: 12, bold: true } },
                //         vAxis: { titleTextStyle: { color: '#1941df' }, minValue: 0, textStyle: { color: '#212529', fontSize: 12, bold: true } },
                //         backgroundColor: { stroke: '#1941df', fill: 'transparent', strokeWidth: 0 },
                //         colors: [  '#dc3545','#1941df', '#198754' ],
                //         bar: {groupWidth: "95%"},
                //         legend: { position: "none" },
                //     };

                //     // var chart = new google.visualization.AreaChart(document.getElementById('customer-chart'));

                //     // if(!_this.state.charts.sales) 
                //     _this.state.charts.sales = new google.visualization.ColumnChart(document.getElementById('sales-chart'));
                //     _this.state.charts.sales.draw(data, options);
                // });

      
            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });

    },
    listeners: {

        modalSuccessBtn: (e) => {
            
            _this.listeners.modalSuccessBtnFunc(e);
        },

        modalSuccessBtnFunc: null
    },
    loadHomeStructure: () => {

        if(!_this.state.firstLoad) return;

        // get core html content 
        document.querySelector('#contents').innerHTML = HTMLContent(__);
    },
    initFooter: () => {
        
        initFooter(__('Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>'), '');
        // initFooter(__('Copyright © %1$ %2$ Kenzap%3$. All rights reserved.', new Date().getFullYear(), '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>'), __('Kenzap Cloud Services - Dashboard'));
    }
}

_this.init();
