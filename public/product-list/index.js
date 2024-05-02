!function(){"use strict";function t(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var a=n.call(t,e||"default");if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:e+""}function e(e,n){for(var a=0;a<n.length;a++){var r=n[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,t(r.key),r)}}function n(e,n,a){return(n=t(n))in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function a(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||r(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}const i=(t,e,...n)=>{let a=(t,e)=>(e.forEach(((e,n)=>{t=t.replace("%"+(n+1)+"$",e)})),t);return void 0===window.i18n||void 0===window.i18n.state.locale.values[t]?a(t,n):a(e(window.i18n.state.locale.values[t]),n)},c=(t,...e)=>{if(0===(t=String(t)).length)return"";return i(t,(t=>t.replace(/[<>'"]/g,(t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"}[t])))),...e)},s=(t,...e)=>{if(0===(t=String(t)).length)return"";return i(t,(t=>t.replace(/[&<>'"]/g,(t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"}[t])))),...e)},l=t=>{let e=new URLSearchParams(window.location.search),n=e.get("sid")?e.get("sid"):"",a=-1==t.indexOf("?")?"?sid="+n:"&sid="+n;return t+a},d=()=>{let t=new URLSearchParams(window.location.search);return t.get("sid")?t.get("sid"):""},u=t=>{let e=t+"=",n=decodeURIComponent(document.cookie).split(";");for(let t=0;t<n.length;t++){let a=n[t];for(;" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(e))return a.substring(e.length,a.length)}return""},p=()=>{let t=localStorage.hasOwnProperty("header")&&localStorage.hasOwnProperty("header-version")?localStorage.getItem("header-version"):0,e=window.location.hostname+"/"+d()+"/"+u("locale");return e!=u("check")&&(t=0,console.log("refresh")),((t,e,n)=>{let a="";if(n){let t=new Date;t.setTime(t.getTime()+24*n*60*60*1e3),a=";expires="+t.toUTCString()}document.cookie=t+"="+(escape(e)||"")+a+";path=/;domain=.kenzap.cloud"})("check",e,5),t},m=()=>({Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+u("kenzap_api_key"),"Kenzap-Locale":u("locale")?u("locale"):"en","Kenzap-Header":p(),"Kenzap-Token":u("kenzap_token"),"Kenzap-Sid":d()});u("kenzap_api_key"),u("locale")&&u("locale"),p(),u("kenzap_token"),d();const h=t=>{if(console.log(t),isNaN(t.code)){let e=t;try{e=JSON.stringify(e)}catch(t){}let n=new URLSearchParams;return n.append("cmd","report"),n.append("sid",d()),n.append("token",u("kenzap_token")),n.append("data",e),fetch("https://api-v1.kenzap.cloud/error/",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded"},body:n}),void alert("Can not connect to Kenzap Cloud")}if(401===t.code){if(-1!=window.location.href.indexOf("localhost"))return void alert(t.reason);location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+encodeURIComponent(window.location.href)}else alert(t.reason)},f=(t,e)=>{if(document.querySelector(t))for(let n of document.querySelectorAll(t))n.removeEventListener("click",e,!0),n.addEventListener("click",e,!0)};var b,v,g,y=function(){return localStorage.getItem("API")?localStorage.getItem("API"):"https://api-eu.kenzap.cloud"},w=function(){var t=new URLSearchParams(window.location.search),e=t.get("page")?t.get("page"):1;return parseInt(e)},S=function(t,e,n){if(void 0!==e){var a=e.limit+e.offset;a>e.total_records&&(a=e.total_records),document.querySelector("#listing_info").innerHTML=t("Showing %1$ to %2$ of %3$ entries",1+e.offset,a,e.total_records);var o=Math.ceil(e.total_records/e.limit);document.querySelector("#listing_paginate").style.display=o<2?"none":"block";var i=w(),c='<ul class="pagination d-flex justify-content-end pagination-flat mb-0">';c+='<li class="paginate_button page-item previous" id="listing_previous"><a href="#" aria-controls="order-listing" data-type="prev" data-page="0" tabindex="0" class="page-link"><span aria-hidden="true">&laquo;</span></li>';for(var s=0;s<o;)(++s>=i-3&&s<=i||s<=i+3&&s>=i)&&(c+='<li class="paginate_button page-item '+(i==s?"active":"")+'"><a href="#" aria-controls="order-listing" data-type="page" data-page="'+s+'" tabindex="0" class="page-link">'+s+"</a></li>");c+='<li class="paginate_button page-item next" id="order-listing_next"><a href="#" aria-controls="order-listing" data-type="next" data-page="2" tabindex="0" class="page-link"><span aria-hidden="true">&raquo;</span></a></li>',c+="</ul>",document.querySelector("#listing_paginate").innerHTML=c;var l,d=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=r(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var a=0,o=function(){};return{s:o,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){s=!0,i=t},f:function(){try{c||null==n.return||n.return()}finally{if(s)throw i}}}}(document.querySelectorAll(".page-link"));try{var u=function(){var t=l.value;t.addEventListener("click",(function(e){var a,r,i,c,s,l=parseInt(w()),d=l;switch(t.dataset.type){case"prev":(l-=1)<1&&(l=1);break;case"page":l=t.dataset.page;break;case"next":(l+=1)>o&&(l=o)}if(window.history.replaceState){var u=window.location.search;a="page",r=l,i=u,c=new RegExp("([?;&])"+a+"[^&;]*[;&]?"),u=((s=i.replace(c,"$1").replace(/&$/,"")).length>2?s+"&":"?")+(r?a+"="+r:""),window.history.replaceState("kenzap-cloud",document.title,window.location.pathname+u)}return d!=l&&n(),e.preventDefault(),!1}))};for(d.s();!(l=d.n()).done;)u()}catch(t){d.e(t)}finally{d.f()}}else document.querySelector("#listing_info").innerHTML=t("no records to display")},k=function(t,e){switch(e=parseInt(e)){case 0:return'<div class="badge bg-warning text-dark fw-light">'+t("Draft")+"</div>";case 1:return'<div class="badge bg-primary fw-light">'+t("Published")+"</div>";case 3:return'<div class="badge bg-secondary fw-light">'+t("Unpublished")+"</div>";default:return'<div class="badge bg-secondary fw-light">'+t("Drafts")+"</div>"}},x=function(t,e){switch(e=_(e),e=(Math.round(100*parseFloat(e))/100).toFixed(2),t.state.settings.currency_symb_loc){case"left":e=t.state.settings.currency_symb+" "+e;break;case"right":e+=t.state.settings.currency_symb}return e},_=function(t){return t=t||0,t=parseFloat(t),t=Math.round(100*t)/100},L=function(t){var e=s("E-commerce 2.1.3 by %1$Kenzap%2$. ❤️ Licensed %3$GPLv3%4$.",'<a class="text-muted" href="https://kenzap.com/" target="_blank">',"</a>",'<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">',"</a>");document.querySelector("footer .row").innerHTML='\n    <div class="d-sm-flex justify-content-center justify-content-sm-between">\n        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">'.concat(e,'</span>\n        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">').concat("","</span>\n    </div>")};new(b=function t(){var e=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n(this,"getData",(function(){e.state.firstLoad&&(()=>{let t=document.querySelector(".loader");t&&(t.style.display="block")})();var t=document.querySelector(".search-cont input")?document.querySelector(".search-cont input").value:"";fetch(y(),{method:"post",headers:m(),body:JSON.stringify({query:{user:{type:"authenticate",fields:["avatar"],token:u("kenzap_token")},locale:{type:"locale",source:["extension"],key:"ecommerce"},settings:{type:"get",key:"ecommerce-settings",fields:["currency","currency_symb","currency_symb_loc","tax_calc","tax_auto_rate","tax_rate","tax_display","fee_calc","fee_percent","fee_display"]},products:{type:"find",key:"ecommerce-product",fields:["_id","id","img","status","price","title","updated","created"],limit:e.state.limit,offset:t.length>0?0:w()*e.state.limit-e.state.limit,search:{field:"title",s:t},sortby:{field:"created",order:"DESC"}}}})}).then((function(t){return t.json()})).then((function(t){(()=>{let t=document.querySelector(".loader");t&&(t.style.display="none")})(),t.success?((t=>{if(t.header&&localStorage.setItem("header",t.header),t.cdn&&localStorage.setItem("cdn",t.cdn),!document.querySelector("#k-script")){let t=document.createElement("div");t.innerHTML=localStorage.getItem("header"),t=t.firstChild,document.body.prepend(t),Function(document.querySelector("#k-script").innerHTML).call("test")}t.locale&&window.i18n.init(t.locale)})(t),e.html(),e.render(t),e.initListeners(),e.initPagination(t),L(),e.state.firstLoad=!1):h(t)})).catch((function(t){h(t)}))})),n(this,"authUser",(function(t){t.user&&t.user.success})),n(this,"html",(function(){e.state.firstLoad&&(document.querySelector("#contents").innerHTML='\n    <div class="container">\n\n        <div class="d-md-flex justify-content-between bd-highlight mb-3">\n            <nav class="bc" aria-label="breadcrumb"></nav>\n            <button class="btn btn-primary btn-add mt-3 mb-1 mt-md-0 mb-md-0" type="button">'.concat(s("Add product"),'</button>\n        </div>\n\n        <div class="row">\n            <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">\n                <div class="card border-white shadow-sm border-0">\n                    <div class="card-body p-0">\n                        <div class="no-footer">\n                            <div class="row">\n                                <div class="col-sm-12">\n                                    <div class="table-responsive">\n                                        <table class="table table-hover table-borderless align-middle table-striped table-p-list mb-0" style="min-width: 800px;">\n                                            <thead>\n\n                                            </thead>\n                                            <tbody>\n\n                                            </tbody>\n                                        </table>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class="row my-2">\n                                <div class="col-sm-12 col-md-5 d-flex align-items-center">\n                                    <div class="dataTables_info mx-2 text-secondary fw-lighter " id="listing_info"\n                                        role="status" aria-live="polite">&nbsp;</div>\n                                </div>\n                                <div class="col-sm-12 col-md-7">\n                                    <div class="dataTables_paginate paging_simple_numbers m-2" id="listing_paginate">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    \n    <div class="modal" tabindex="-1">\n        <div class="modal-dialog">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <h5 class="modal-title"></h5>\n                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n                </div>\n                <div class="modal-body">\n\n                </div>\n                <div class="modal-footer">\n                    <button type="button" class="btn btn-primary btn-modal"></button>\n                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">\n        <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive"\n            aria-atomic="true" data-bs-delay="3000">\n            <div class="d-flex">\n                <div class="toast-body"></div>\n                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"\n                    aria-label="Close"></button>\n            </div>\n        </div>\n    </div>\n    \n    '))})),n(this,"render",(function(t){if(e.state.firstLoad&&((t=>{let e='<ol class="breadcrumb mt-2 mb-0">';for(let n of t)void 0===n.link?e+=`<li class="breadcrumb-item">${n.text}</li>`:e+=`<li class="breadcrumb-item"><a href="${n.link}">${n.text}</a></li>`;e+="</ol>",document.querySelector(".bc").innerHTML=e})([{link:l("https://dashboard.kenzap.cloud"),text:s("Home")},{link:l("/"),text:s("E-commerce")},{text:s("Product list")}]),document.querySelector(".table thead").innerHTML='\n                <tr>\n                    <th>\n                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" class="bi justify-content-end bi-search mb-1" viewBox="0 0 16 16" >\n                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>\n                        </svg>\n                    </th>\n                    <th>\n                        <div class="search-cont input-group input-group-sm mb-0 justify-content-start">     \n                            <input type="text" placeholder="'.concat(s("Search products"),'" class="form-control border-top-0 border-start-0 border-end-0 rounded-0" aria-label="').concat(s("Search products"),'" aria-describedby="inputGroup-sizing-sm" style="max-width: 200px;">\n                        </div>\n                        <span>').concat(s("Title"),"</span>\n                    </th>\n                    <th>").concat(s("Status"),"</th>\n                    <th>").concat(s("Price"),"</th>\n                    <th>").concat(s("Last change"),"</th>\n                    <th></th>\n                </tr>")),0!=t.products.length){var n=(()=>{let t=new URLSearchParams(window.location.search);return t.get("sid")?t.get("sid"):""})();e.state.settings=t.settings;var a,r="";for(var o in t.products){var i="https://cdn.kenzap.com/loading.png";void 0===t.products[o].img&&(t.products[o].img=[]),t.products[o].img[0]&&(i=parseInt(t.products[o].created)<1677e6?CDN+"/S"+n+"/product-"+t.products[o]._id+"-1-100x100.jpeg?"+t.products[o].updated:CDN+"/S"+n+"/product-"+t.products[o]._id+"-1-100x100.webp?"+t.products[o].updated),r+='\n                <tr>\n                    <td>\n                        <div class="timgc">\n                            <a href="'.concat(l("/product-edit/?id="+t.products[o]._id),'"><img src="').concat(i,'" data-srcset="').concat(i,'" class="img-fluid rounded" alt="').concat(c("Product placeholder"),'" srcset="').concat(i,'" ></a>\n                        </div>\n                    </td>\n                    <td class="destt" style="max-width:250px;min-width:250px;">\n                        <div class="my-1"> \n                            <a class="text-body" href="').concat(l("/product-edit/?id="+t.products[o]._id),'" >').concat(t.products[o].title,'<i style="color:#9b9b9b;font-size:15px;margin-left:8px;" title="').concat(c("Edit product"),'" class="mdi mdi-pencil menu-icon edit-page"></i></a>\n                        </div>\n                    </td>\n                    <td>\n                        <span>').concat(k(__,t.products[o].status),"</span>\n                    </td>\n                    <td>\n                        <span>").concat(x(e,t.products[o].price),"</span>\n                    </td>\n                    <td>\n                        <span>").concat((__,a=t.products[o].updated,new Date(1e3*parseInt(a)).toLocaleDateString()),'</span>\n                    </td>\n                    <td class="text-end"> \n                        <a href="#" data-id="').concat(t.products[o]._id,'" class="remove-product text-danger me-2">\n                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\n                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>\n                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>\n                            </svg>\n                        </a>\n                        <i title="').concat(c("Remove this product"),'" data-key="').concat(t.products[o].id,'" class="mdi mdi-trash-can-outline list-icon remove-product"></i>\n                    </td>\n                </tr>')}document.querySelector(".table tbody").innerHTML=r}else document.querySelector(".table tbody").innerHTML='<tr><td colspan="6">'.concat(s("No products to display."),"</td></tr>")})),n(this,"initListeners",(function(){f(".remove-product",e.listeners.removeProduct),f(".table-p-list .bi-search",e.listeners.searchProductsActivate),e.state.firstLoad&&(f(".btn-add",e.addProduct),f(".btn-modal",e.listeners.modalSuccessBtn))})),n(this,"listeners",{removeProduct:function(t){t.preventDefault(),confirm(s("Completely remove this product?"))&&fetch(y(),{method:"post",headers:m(),body:JSON.stringify({query:{product:{type:"delete",key:"ecommerce-product",id:t.currentTarget.dataset.id}}})}).then((function(t){return t.json()})).then((function(t){t.success?e.getData():h(t)})).catch((function(t){h(t)}))},searchProductsActivate:function(t){t.preventDefault(),document.querySelector(".table-p-list thead tr th:nth-child(2) span").style.display="none",document.querySelector(".table-p-list thead tr th:nth-child(2) .search-cont").style.display="flex",document.querySelector(".table-p-list thead tr th:nth-child(2) .search-cont input").focus(),((t,e)=>{if(document.querySelector(t))for(let n of document.querySelectorAll(t))n.removeEventListener("keyup",e,!0),n.addEventListener("keyup",e,!0)})(".table-p-list thead tr th:nth-child(2) .search-cont input",e.listeners.searchProducts)},searchProducts:function(t){t.preventDefault(),e.getData()},modalSuccessBtn:function(t){e.listeners.modalSuccessBtnFunc(t)},modalSuccessBtnFunc:null}),n(this,"addProduct",(function(t){var n=document.querySelector(".modal"),r=new bootstrap.Modal(n);n.querySelector(".modal-title").innerHTML=s("Add Product"),n.querySelector(".btn-primary").innerHTML=s("Add"),n.querySelector(".btn-secondary").innerHTML=s("Cancel");var o,i,c='\n        <div class="form-cont">\n            <div class="form-group mb-3">\n                <label for="p-title" class="form-label">'.concat(s("Title"),'</label>\n                <input type="text" class="form-control" id="p-title" autocomplete="off" placeholder="" value="').concat("",'">\n            </div>\n            <div class="form-group mb-3">\n                <label for="p-sdesc" class="form-label">').concat(s("Short description"),'</label>\n                <input type="text" class="form-control" id="p-sdesc" autocomplete="off" placeholder="" value="').concat("",'">\n            </div>\n            <div class="form-group mb-3">\n                <label for="p-price" class="form-label">').concat(s("Price"),'</label>\n                <input type="text" class="form-control" id="p-price" autocomplete="off" placeholder="" value="').concat("",'">\n            </div>\n        </div>');n.querySelector(".modal-body").innerHTML=c,o="#p-price",i=[8,46,190],document.querySelector(o)&&(i.push.apply(i,[9,37,38,39,40,98,100,102,104]),a(document.querySelectorAll(o)).forEach((function(t){t.addEventListener("keydown",(function(t){var e=t.key.toLowerCase();"control"!=e&&"meta"!=e||(window[e]=!0),console.log(e.length+" / "+n+" / "+t.which);var n=e>="0"&&e<="9";return(window.control||window.meta)&&[86,88,65,67,90].includes(t.which)?(console.log("pushing"),!0):n||i.includes(t.which)?void 0:(t.preventDefault(),!1)})),t.addEventListener("keyup",(function(t){var e=t.key.toLowerCase();"control"!=e&&"meta"!=e||(window[e]=!1)}))}))),e.listeners.modalSuccessBtnFunc=function(t){t.preventDefault();var e={};e.title=n.querySelector("#p-title").value.trim(),e.sdesc=n.querySelector("#p-sdesc").value.trim(),e.price=n.querySelector("#p-price").value.trim(),e.status="0",e.img=[],e.cats=[],e.title.length<2?alert(s("Please provide longer title")):fetch(y(),{method:"post",headers:m(),body:JSON.stringify({query:{product:{type:"create",key:"ecommerce-product",data:e}}})}).then((function(t){return t.json()})).then((function(t){t.success?window.location.href=l("/product-edit/?id=".concat(t.product.id)):h(t)})).catch((function(t){h(t)}))},r.show(),setTimeout((function(){return n.querySelector("#p-title").focus()}),100)})),n(this,"initPagination",(function(t){S(__,t.meta,e.getData)})),n(this,"initFooter",(function(){L(s("Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.",'<a class="text-muted" href="https://kenzap.com/" target="_blank">',"</a>",'<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">',"</a>"))})),this.state={firstLoad:!0,settings:{},limit:10},this.getData()},v&&e(b.prototype,v),g&&e(b,g),Object.defineProperty(b,"prototype",{writable:!1}),b)}();
