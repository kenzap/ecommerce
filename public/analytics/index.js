!function(){"use strict";function e(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}const t=(e,...t)=>{if(0===(e=String(e)).length)return"";return((e,t,...a)=>{let n=(e,t)=>(t.forEach(((t,a)=>{e=e.replace("%"+(a+1)+"$",t)})),e);return void 0===window.i18n||void 0===window.i18n.state.locale.values[e]?n(e,a):n(t(window.i18n.state.locale.values[e]),a)})(e,(e=>e.replace(/[&<>'"]/g,(e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"}[e])))),...t)},a=()=>{let e=document.querySelector(".loader");e&&(e.style.display="none")},n=e=>{let t=new URLSearchParams(window.location.search),a=t.get("sid")?t.get("sid"):"",n=-1==e.indexOf("?")?"?sid="+a:"&sid="+a;return e+n},o=()=>{let e=new URLSearchParams(window.location.search);return e.get("sid")?e.get("sid"):""},r=e=>{let t=e+"=",a=decodeURIComponent(document.cookie).split(";");for(let e=0;e<a.length;e++){let n=a[e];for(;" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(t))return n.substring(t.length,n.length)}return""},l=()=>{let e=localStorage.hasOwnProperty("header")&&localStorage.hasOwnProperty("header-version")?localStorage.getItem("header-version"):0,t=window.location.hostname+"/"+o()+"/"+r("locale");return t!=r("check")&&(e=0,console.log("refresh")),((e,t,a)=>{let n="";if(a){let e=new Date;e.setTime(e.getTime()+24*a*60*60*1e3),n=";expires="+e.toUTCString()}document.cookie=e+"="+(escape(t)||"")+n+";path=/;domain=.kenzap.cloud"})("check",t,5),e},s=()=>({Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+r("kenzap_api_key"),"Kenzap-Locale":r("locale")?r("locale"):"en","Kenzap-Header":l(),"Kenzap-Token":r("kenzap_token"),"Kenzap-Sid":o()});r("kenzap_api_key"),r("locale")&&r("locale"),l(),r("kenzap_token"),o();const c=e=>{if(console.log(e),isNaN(e.code)){let t=e;try{t=JSON.stringify(t)}catch(e){}let a=new URLSearchParams;return a.append("cmd","report"),a.append("sid",o()),a.append("token",r("kenzap_token")),a.append("data",t),fetch("https://api-v1.kenzap.cloud/error/",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded"},body:a}),void alert("Can not connect to Kenzap Cloud")}if(401===e.code){if(-1!=window.location.href.indexOf("localhost"))return void alert(e.reason);location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+window.location.href}else alert(e.reason)},i=(e,t)=>{if(document.querySelector(e))for(let a of document.querySelectorAll(e))a.removeEventListener("click",t,!0),a.addEventListener("click",t,!0)};var d=function(e){return(""+e).length<2?"0"+e:e},u=function(e,t){switch(t=m(t),t=(Math.round(100*parseFloat(t))/100).toFixed(2),e.state.settings.currency_symb_loc){case"left":t=e.state.settings.currency_symb+" "+t;break;case"right":t+=e.state.settings.currency_symb}return t},m=function(e){return e=e||0,e=parseFloat(e),e=Math.round(100*e)/100},p=function(e){var a=t("E-commerce 2.1.1 by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.",'<a class="text-muted" href="https://kenzap.com/" target="_blank">',"</a>",'<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">',"</a>");document.querySelector("footer .row").innerHTML='\n    <div class="d-sm-flex justify-content-center justify-content-sm-between">\n        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">'.concat(a,'</span>\n        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">').concat("","</span>\n    </div>")},h={state:{firstLoad:!0,ajaxQueue:0,modalCont:null,settings:{},charts:{}},init:function(){h.getData()},getData:function(){h.state.firstLoad&&(()=>{let e=document.querySelector(".loader");e&&(e.style.display="block")})(),fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:s(),body:JSON.stringify({query:{locale:{type:"locale",source:["extension"],key:"ecommerce"},settings:{type:"get",key:"ecommerce-settings",fields:["currency","currency_symb","currency_symb_loc","tax_calc","tax_auto_rate","tax_rate","tax_display"]}}})}).then((function(e){return e.json()})).then((function(e){a(),e.success?((e=>{if(e.header&&localStorage.setItem("header",e.header),!document.querySelector("#k-script")){let e=document.createElement("div");e.innerHTML=localStorage.getItem("header"),e=e.firstChild,document.body.prepend(e),Function(document.querySelector("#k-script").innerHTML).call("test")}e.locale&&window.i18n.init(e.locale)})(e),h.loadHomeStructure(),h.renderPage(e),h.initListeners(),p(),h.state.firstLoad=!1):c(e)})).catch((function(e){c(e)}))},renderPage:function(e){(e=>{let t='<ol class="breadcrumb mt-2 mb-0">';for(let a of e)void 0===a.link?t+=`<li class="breadcrumb-item">${a.text}</li>`:t+=`<li class="breadcrumb-item"><a href="${a.link}">${a.text}</a></li>`;t+="</ol>",document.querySelector(".bc").innerHTML=t})([{link:n("https://dashboard.kenzap.cloud"),text:__("Home")},{link:n("/home/"),text:__("E-commerce")},{text:__("Analytics")}]),h.state.settings=e.settings},initListeners:function(){i(".sales-report",h.salesReport),i(".products-report",h.productReport)},salesReport:function(e){e.preventDefault();var t=document.querySelector(".modal");h.state.modalCont=new bootstrap.Modal(t),t.querySelector(".modal-dialog").classList.add("modal-fullscreen");var a='\n        <input id="datepicker" class="form-control form-control-sm mt-1 border-0" placeholder="'.concat(__("Today"),'"/>\n        ');t.querySelector(".modal-title").innerHTML=__("Sales report")+" "+a,t.querySelector(".btn-primary").style.display="none",t.querySelector(".btn-secondary").innerHTML=__("Close"),t.querySelector(".modal-body").innerHTML="Loading..";var n=[];new easepick.create({element:document.getElementById("datepicker"),css:["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.1.7/dist/index.css","/assets/css/date_picker.css"],plugins:["RangePlugin","LockPlugin"],RangePlugin:{tooltipNumber:function(e){return e-1},locale:{one:__("day"),other:__("days")}},LockPlugin:{maxDate:new Date,minDays:1,inseparable:!0,filter:function(e,t){if(1===t.length){var a=e.isBefore(t[0])?"[)":"(]";return!t[0].isSame(e,"day")&&e.inArray(n,a)}return e.inArray(n,"[)")}}}).on("select",(function(e){h.salesReportData()}),{}),h.salesReportData(),h.state.modalCont.show()},salesReportData:function(e){var t="",n="",o=document.querySelector("#datepicker").value.split(" - ");if(2==o.length)t=o[0].trim()+"T00:00:00.001Z",n=o[1].trim()+"T23:59:59.001Z";else{var r=new Date;t=r.getUTCFullYear()+"-"+d(r.getUTCMonth()+1)+"-"+d(r.getUTCDate())+"T00:00:00.001Z",n=r.getUTCFullYear()+"-"+d(r.getUTCMonth()+1)+"-"+d(r.getUTCDate())+"T23:59:00.001Z"}console.log(Date.parse(t)+" "+Date.parse(n)),console.log(t+" "+n),fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:s(),body:JSON.stringify({query:{sales:{type:"find",key:"ecommerce-order",fields:["status","updated","created_ymd"],sum:["total","total_all"],count:["total"],term:[{field:"created",relation:">=",type:"numeric",value:Date.parse(t)/1e3|0},{field:"status",relation:"=",type:"string",value:"completed"},{field:"created",relation:"<=",type:"numeric",value:Date.parse(n)/1e3|0}],groupby:[{field:"created_ymd"}],sortby:{field:"created_ymd",order:"DESC"},limit:40,offset:0}}})}).then((function(e){return e.json()})).then((function(e){if(a(),e.success){var t=[["Period","Tax","Total"]],n={total:0,total_all:0},o={total:__("Subtotal"),total_all:__("Grand Total")};if(0==e.sales.length)return void(document.querySelector(".modal-body").innerHTML=__("No data to display"));e.sales.forEach((function(e){e.created_ymd&&(e.total_sum=e.total_sum?e.total_sum:0,e.total_all_sum=e.total_all_sum?e.total_all_sum:0,n.total+=e.total_sum,n.total_all+=e.total_all_sum,t.push([e.created_ymd,e.total_sum,e.total_all_sum]))}));var r='<div id="sales-chart" style="min-height:300px"></div>';for(var l in n)r+='\n                    <div class="mb-3 mt-3 order-row" >\n                        <b>'.concat(o[l],"</b> ").concat(u(h,n[l]),"\n                    </div>");document.querySelector(".modal-body").innerHTML=r,google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback((function(){var e=google.visualization.arrayToDataTable(t);h.state.charts.sales=new google.visualization.ColumnChart(document.getElementById("sales-chart")),h.state.charts.sales.draw(e,{animation:{duration:1e3,easing:"out"},hAxis:{titleTextStyle:{color:"#1941df"},baselineColor:"#1941df",textStyle:{color:"#212529",fontSize:12,bold:!0}},vAxis:{titleTextStyle:{color:"#1941df"},minValue:0,textStyle:{color:"#212529",fontSize:12,bold:!0}},backgroundColor:{stroke:"#1941df",fill:"transparent",strokeWidth:0},colors:["#dc3545","#1941df","#198754"],bar:{groupWidth:"95%"},legend:{position:"none"}})}))}else c(e)})).catch((function(e){c(e)}))},productReport:function(e){e.preventDefault();var t=document.querySelector(".modal");h.state.modalCont=new bootstrap.Modal(t),t.querySelector(".modal-dialog").classList.add("modal-fullscreen");var a='\n        <input id="datepicker" class="form-control form-control-sm mt-1 border-0" placeholder="'.concat(__("Today"),'"/>\n        ');t.querySelector(".modal-title").innerHTML=__("Top products")+" "+a,t.querySelector(".btn-primary").style.display="none",t.querySelector(".btn-secondary").innerHTML=__("Close"),t.querySelector(".modal-body").innerHTML="Loading..";var n=[];new easepick.create({element:document.getElementById("datepicker"),css:["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.1.7/dist/index.css","/assets/css/date_picker.css"],plugins:["RangePlugin","LockPlugin"],RangePlugin:{tooltipNumber:function(e){return e-1},locale:{one:__("day"),other:__("days")}},LockPlugin:{maxDate:new Date,minDays:1,inseparable:!0,filter:function(e,t){if(1===t.length){var a=e.isBefore(t[0])?"[)":"(]";return!t[0].isSame(e,"day")&&e.inArray(n,a)}return e.inArray(n,"[)")}}}).on("select",(function(e){h.productsReportData()}),{}),h.productsReportData(),h.state.modalCont.show()},productsReportData:function(t){var o="",r="",l=document.querySelector("#datepicker").value.split(" - ");if(2==l.length)o=l[0].trim()+"T00:00:00.001Z",r=l[1].trim()+"T23:59:59.001Z";else{var i=new Date;o=i.getUTCFullYear()+"-"+d(i.getUTCMonth()+1)+"-"+d(i.getUTCDate())+"T00:00:00.001Z",r=i.getUTCFullYear()+"-"+d(i.getUTCMonth()+1)+"-"+d(i.getUTCDate())+"T23:59:00.001Z"}console.log(Date.parse(o)+" "+Date.parse(r)),console.log(o+" "+r),fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:s(),body:JSON.stringify({query:{products:{type:"find",key:"ecommerce-order",fields:["items","updated","created_ymd"],term:[{field:"created",relation:">=",type:"numeric",value:Date.parse(o)/1e3|0},{field:"status",relation:"=",type:"string",value:"completed"},{field:"created",relation:"<=",type:"numeric",value:Date.parse(r)/1e3|0}],sortby:{field:"created",order:"DESC"},limit:1e3,offset:0},settings:{type:"get",key:"ecommerce-settings",fields:["currency","currency_symb","currency_symb_loc","tax_calc","tax_auto_rate","tax_rate","tax_display"]}}})}).then((function(e){return e.json()})).then((function(t){if(a(),t.success){h.state.settings=t.settings;var o='\n                    <div class="table-responsive">\n                        <table class="table table-hover table-borderless align-middle table-striped table-p-list mb-0" style="min-width: 800px;">\n                            <thead>\n                                <tr><th><div class="me-1 me-sm-3">'.concat(__("Product"),'</div></th><th class="qty"><div class="me-1 me-sm-3">').concat(__("Qty"),'</div></th><th class="tp"><div class="me-1 me-sm-3">').concat(__("Total"),"</div></th><th></th>\n                            </thead>\n                            <tbody>"),r=[],l={qty:0,total:0};t.products.forEach((function(t){Array.isArray(t.items)&&t.items.forEach((function(t){var a;r[t.id]?(r[t.id].qty+=t.qty,r[t.id].total+=t.total):r[t.id]=(e(a={id:t.id,title:t.title,qty:t.qty},"qty",t.qty),e(a,"total",t.total),a)}))}));var s=Object.keys(r).map((function(e){return r[e]}));s.sort((function(e,t){return t.qty-e.qty})),s.forEach((function(e){var t="https://cdn.kenzap.com/loading.png";o+='\n                            <tr class="new-item-row">\n                                <td class="d-none">\n                                    <div class="timgc me-1 me-sm-3">\n                                        <a href="'.concat(n("/product-edit/?id="+e.id),'"><img src="').concat(t,'" data-srcset="').concat(t,'" class="img-fluid rounded" alt="').concat(__("Product placeholder"),'" srcset="').concat(t,'" ></a>\n                                    </div>\n                                </td>\n                                <td class="destt" style="max-width:250px;min-width:150px;">\n                                    <div class="my-1"> \n                                        <a class="text-body" href="').concat(n("/product-edit/?id="+e.id),'" >').concat(e.title,'<i style="color:#9b9b9b;font-size:15px;margin-left:8px;" title="').concat(__("Edit product"),'" class="mdi mdi-pencil menu-icon edit-page"></i></a>\n                                    </div>\n                                </td>\n                                <td class="qty">\n                                    <div class="me-1 me-sm-3">\n                                        ').concat(e.qty,'\n                                    </div>\n                                </td>\n                                <td class="tp">\n                                    ').concat(u(h,e.total),'\n                                </td>\n                                <td class="align-middle text-center"> \n                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="24" height="24" class="bi bi-plus-circle text-success align-middle add-item"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>\n                                </td>\n                            </tr>'),l.qty+=e.qty,l.total+=e.total})),0==s.length&&(o+='<tr><td colspan="4">'.concat(__("No data to display"),"</td></tr>")),s.length>0&&(o+="<tr><td><b>".concat(__("Totals"),"</b></td><td>").concat(l.qty,"</td><td>").concat(u(h,l.total),"</td><td> </td></tr>")),o+="</tbody>\n                    </table>\n                </div>",document.querySelector(".modal-body").innerHTML=o}else c(t)})).catch((function(e){c(e)}))},listeners:{modalSuccessBtn:function(e){h.listeners.modalSuccessBtnFunc(e)},modalSuccessBtnFunc:null},loadHomeStructure:function(){h.state.firstLoad&&(document.querySelector("#contents").innerHTML=function(e){return'\n        <div class="container p-edit">\n            <div class="d-flex justify-content-between bd-highlight mb-3">\n                <nav class="bc" aria-label="breadcrumb"></nav>\n            </div>\n            <div class="row">\n                <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">\n                    <div class="card border-white shadow-sm p-sm-3 py-3">\n                        <nav class="nav flex-column">\n                            <a class="nav-link active fs-4 sales-report" aria-current="page" href="#">\n                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-shop mb-1 me-3" viewBox="0 0 16 16">\n                            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>\n                            </svg>'.concat(e("Sales report"),'</a>\n\n                            <hr>\n                                               \n                            <a class="nav-link fs-4 products-report" href="#">\n                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-tags mb-1 me-3" viewBox="0 0 16 16">\n                            <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>\n                            <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>\n                            </svg>').concat(e("Top products"),'</a>\n\n                            <hr>\n                                                \n                            <a class="nav-link fs-4 disabled" href="').concat(n("/settings/"),'">\n                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chat-left-dots mb-1 me-3" viewBox="0 0 16 16">\n                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>\n                            <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>\n                            </svg>').concat(e("Customers"),'</a>\n\n                            <hr>\n                                                \n                            <a class="nav-link fs-4 disabled" href="').concat(n("/analytics/"),'" tabindex="-1" aria-disabled="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-graph-up me-3" viewBox="0 0 16 16">\n                            <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"></path>\n                            </svg>').concat(e("Custom"),'</a>\n                        </nav>\n                    </div>\n                </div>\n            </div>\n   \n            <div class="modal" tabindex="-1">\n                <div class="modal-dialog">\n                    <div class="modal-content">\n                        <div class="modal-header">\n                            <h5 class="modal-title"></h5>\n                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n                        </div>\n                        <div class="modal-body">\n\n                        </div>\n                        <div class="modal-footer">\n                            <button type="button" class="btn btn-primary btn-modal"></button>\n                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    ')}(__))},initFooter:function(){p(__("Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.",'<a class="text-muted" href="https://kenzap.com/" target="_blank">',"</a>",'<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">',"</a>"))}};h.init()}();
