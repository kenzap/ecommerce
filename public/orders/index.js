!function(){"use strict";function t(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function a(t,a){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,a){if(t){if("string"==typeof t)return e(t,a);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,a):void 0}}(t))||a&&t&&"number"==typeof t.length){n&&(t=n);var s=0,r=function(){};return{s:r,n:function(){return s>=t.length?{done:!0}:{done:!1,value:t[s++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,d=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return i=t.done,t},e:function(t){d=!0,o=t},f:function(){try{i||null==n.return||n.return()}finally{if(d)throw o}}}}const n=()=>{let t=document.querySelector(".loader");t&&(t.style.display="none")},s=t=>{let e=new URLSearchParams(window.location.search),a=e.get("sid")?e.get("sid"):"",n=-1==t.indexOf("?")?"?sid="+a:"&sid="+a;return t+n},r=()=>{let t=new URLSearchParams(window.location.search);return t.get("sid")?t.get("sid"):""},o=t=>{let e=t+"=",a=decodeURIComponent(document.cookie).split(";");for(let t=0;t<a.length;t++){let n=a[t];for(;" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(e))return n.substring(e.length,n.length)}return""},i=t=>{if(t.code)if(401===t.code){if(-1!=window.location.href.indexOf("localhost"))return void alert(t.reason);location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+window.location.href}else alert(t.reason);else alert("Can not connect to Kenzap Cloud")},d=(t,e)=>{if(document.querySelector(t))for(let a of document.querySelectorAll(t))a.removeEventListener("click",e,!0),a.addEventListener("click",e,!0)},l=(t,e)=>{if(document.querySelector(t))for(let a of document.querySelectorAll(t))a.removeEventListener("keyup",e,!0),a.addEventListener("keyup",e,!0)},c={Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+o("kenzap_api_key"),"Kenzap-Locale":localStorage.hasOwnProperty("locale")?localStorage.getItem("locale"):"en","Kenzap-Header":localStorage.hasOwnProperty("header")&&localStorage.hasOwnProperty("header-version")?localStorage.getItem("header-version"):0,"Kenzap-Token":o("kenzap_token"),"Kenzap-Sid":r()};var u=function(t){var e=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"});return void 0!==t&&""!=t||(t=0),t=parseFloat(t),t=e.format(t)},m=function(t,e){var a=(t=parseInt(t))-(e=parseInt(e));if(a<60)return"moments ago";if(a<3600)return parseInt(a/60)+" minutes ago";if(a<86400)return parseInt(a/60/24)+" hours ago";var n=new Date(1e3*e),s=[__("Jan"),__("Feb"),__("Mar"),__("Apr"),__("May"),__("Jun"),__("Jul"),__("Aug"),__("Sep"),__("Oct"),__("Nov"),__("Dec")],r=n.getFullYear(),o=s[n.getMonth()],i=n.getDate();return n.getHours(),n.getMinutes(),n.getSeconds(),e=i+" "+o+" "+r},p={state:{firstLoad:!0,firstTouch:!0,playSoundNow:!1,newOrderCount:0,orderIDs:[],orders:[],playTitleTimer:null,refreshTimer:null,statuses:[],audio:new Audio("https://kenzap.com/static/swiftly.mp3"),limit:50,searchLimit:50},init:function(){p.getData()},getData:function(){p.state.firstLoad&&(()=>{let t=document.querySelector(".loader");t&&(t.style.display="block")})();var t=document.querySelector(".search-input")?document.querySelector(".search-input").value:"",e=document.querySelector("#order-status")?document.querySelector("#order-status").dataset.value:"";fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:c,body:JSON.stringify({query:{user:{type:"authenticate",fields:["avatar"],token:o("kenzap_token")},locale:{type:"locale",source:["extension"],key:"ecommerce"},orders:{type:"find",key:"ecommerce-order",fields:"*",term:""!=e?"status='"+e+"'":"",limit:p.state.limit,search:{field:"from",s:t},sortby:{field:"created",order:"DESC"}}}})}).then((function(t){return t.json()})).then((function(t){n(),t.success?((t=>{if(t.header&&localStorage.setItem("header",t.header),!document.querySelector("#k-script")){let t=document.createElement("div");t.innerHTML=localStorage.getItem("header"),t=t.firstChild,document.body.prepend(t),Function(document.querySelector("#k-script").innerHTML).call("test")}t.locale&&window.i18n.init(t.locale)})(t),p.loadPageStructure(),p.renderPage(t),p.initListeners(),p.initFooter(),p.state.firstLoad=!1):i(t)})).catch((function(t){i(t)}))},authUser:function(t){t.user&&t.user.success},loadPageStructure:function(){p.state.firstLoad&&(document.querySelector("#contents").innerHTML=function(t){return'\n      <div class="container ec-orders">\n        <div class="d-md-flex justify-content-between bd-highlight mb-3">\n            <nav class="bc" aria-label="breadcrumb"></nav>\n            <button class="btn btn-primary btn-add mt-3 mb-1 mt-md-0 mb-md-0" type="button">'.concat(t("New order"),'</button>\n        </div>\n        <div class="row">\n          <div class="col-md-12 page-title">\n            <div class="st-opts st-table mb-3 dropdown">\n                <a class="btn btn-outline-secondary dropdown-toggle" href="#" role="button" id="order-status" data-id="status" data-value="" data-bs-toggle="dropdown" aria-expanded="false">\n                ').concat(t("All"),'\n                </a>\n                <ul class="dropdown-menu" aria-labelledby="order-status">\n                  <li><a class="dppi dropdown-item" data-key="" href="#" >').concat(t("All"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="new" href="#" >').concat(t("New"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="paid" href="#" >').concat(t("Paid"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="processing" href="#" >').concat(t("Processing"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="completed" href="#" >').concat(t("Completed"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="canceled" href="#" >').concat(t("Canceled"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="failed" href="#" >').concat(t("Failed"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="refunded" href="#" >').concat(t("Refunded"),'</a></li>\n                </ul>\n            </div>\n            <div class="st-opts" >\n              <div class="input-group-sm mb-0 justify-content-start mb-3 mb-sm-0" >\n                <input id="usearch" type="text" class="inp form-control search-input" placeholder="').concat(t("Search order"),'">\n              </div>\n              \x3c!-- <a id="viewSum" href="#" style="margin-left:16px;">view summary</a> --\x3e\n            </div>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">\n            <div class="card border-white shadow-sm border-0">\n              <div class="card-body p-0">\n \n                <div class="table-responsive">\n                  <table class="table table-hover table-borderless align-middle table-striped table-p-list mb-0">\n                    <thead>\n                      <tr>\n                        <th><span class="ps-1">').concat(t("From"),'</span></th>\n                        <th class="d-none d-sm-table-cell">').concat(t("Status"),"</th>\n                        <th>").concat(t("Total"),'</th>\n                        <th class="d-none d-sm-table-cell">').concat(t("Time"),'</th>\n                        <th></th>\n                      </tr>\n                    </thead>\n                    <tbody class="list">\n\n                    </tbody>\n                  </table>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="modal order-modal" tabindex="-1">\n        <div class="modal-dialog ">\n          <div class="modal-content">\n              <div class="modal-header">\n                <h5 class="modal-title"></h5>\n                <button type="button" class="btn-close align-self-start-remove" data-bs-dismiss="modal" aria-label="Close"></button>\n              </div>\n              <div class="modal-body">\n              \n              </div>\n              <div class="modal-footer">\n                <button type="button" class="btn btn-primary"></button>\n                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>\n              </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="position-fixed bottom-0 p-sm-2 m-sm-4 end-0 align-items-center" >   \n        <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">\n          <div class="d-flex">  \n            <div class="toast-body"></div>\n            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>\n          </div>\n        </div>\n      </div>\n    ')}(__))},renderPage:function(t){if(p.state.firstLoad&&((t=>{let e='<ol class="breadcrumb mt-2 mb-0">';for(let a of t)void 0===a.link?e+=`<li class="breadcrumb-item">${a.text}</li>`:e+=`<li class="breadcrumb-item"><a href="${a.link}">${a.text}</a></li>`;e+="</ol>",document.querySelector(".bc").innerHTML=e})([{link:s("https://dashboard.kenzap.cloud"),text:__("Dashboard")},{link:s("/"),text:__("E-commerce")},{text:__("Orders")}]),p.state.statuses={new:{text:__("New"),class:"btn-warning text-dark fw-light"},processing:{text:__("Processing"),class:"btn-primary fw-light"},completed:{text:__("Completed"),class:"btn-success fw-light"},canceled:{text:__("Canceled"),class:"btn-secondary fw-light"},failed:{text:__("Failed"),class:"btn-danger fw-light"}}),p.state.orders=t.orders,0!=t.orders.length){var e=[];p.state.newOrderCount=[];var a="",n=0;for(var r in t.orders){e.push(t.orders[r]._id),void 0===t.orders[r].status&&(t.orders[r].status="new"),"new"==t.orders[r].status&&n++;var o=p.state.orderIDs.includes(t.orders[r]._id)||p.state.firstLoad?"":"new";a+='\n            <tr class="'.concat(o,'">\n              <td class="details">\n                <div class="ps-1 view-order" data-id="').concat(t.orders[r]._id,'" data-index="').concat(r,'">\n                  <b class="">').concat(t.orders[r].from,'</b>\n                  <div class=" elipsized fst-italic">').concat(t.orders[r].note?t.orders[r].note:"",'</div>\n                  <div class=" d-sm-none"> <span class="me-2">').concat(p.getStatus(t.orders[r].status),'</span> <span class="text-muted">').concat(m(t.meta.time,t.orders[r].created),'</span> </div>\n                </div>\n              </td>\n              <td class="d-none d-sm-table-cell">\n                <span style="font-size:24px;">').concat(p.getStatus(t.orders[r].status),'</span>\n              </td>\n              <td>\n                <span style="font-size:18px;">').concat(u(t.orders[r].total),'</span>\n              </td>\n              <td class="d-none d-sm-table-cell">\n                <span style="font-size:18px;">').concat(m(t.meta.time,t.orders[r].created),'</span>\n              </td>\n              <td class="last">\n                <a href="#" data-id="').concat(t.orders[r]._id,'" data-index="').concat(r,'" class="view-order text-success d-none me-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n                </svg></a>\n                <a href="#" data-id="').concat(t.orders[r]._id,'" data-index="').concat(r,'" class="remove-order text-danger me-2"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\n                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>\n                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>\n                </svg></a>\n              </td>\n            </tr>')}p.state.playSoundNow=n>0,p.state.orderIDs=e,document.querySelector(".table tbody").innerHTML=a}else document.querySelector(".table tbody").innerHTML='<tr><td colspan="5">'.concat(__("No orders to display."),"</td></tr>")},getStatus:function(t){return'<div class="badge '.concat(p.state.statuses[t].class,'">').concat(p.state.statuses[t].text,"</div>")},playSound:function(){console.log("playSound"),p.state.audio.play()},playTitle:function(t){},initListeners:function(){d(".view-order",p.listeners.viewOrder),d(".remove-order",p.listeners.removeOrder),d(".st-table li a",p.listeners.changeStatus),p.state.firstLoad&&(d(".modal .btn-primary",p.listeners.modalSuccessBtn),l(".search-input",p.listeners.searchOrders),document.body.addEventListener("touchstart",(function(){p.state.firstTouch?(p.state.audio.play(),p.state.audio.pause(),p.state.audio.currentTime=0,p.state.firstTouch=!1):(p.state.playTitleTimer&&clearInterval(p.state.playTitleTimer),p.state.playTitleTimer=setInterval((function(){p.state.playSoundNow&&p.playSound()}),6500))}),!1))},listeners:{changeStatus:function(t){t.preventDefault(),console.log(t.currentTarget.dataset.key);var e=document.querySelector("#order-status");""==t.currentTarget.dataset.key?(e.innerHTML=__("All"),e.dataset.value=""):(e.innerHTML=p.state.statuses[t.currentTarget.dataset.key].text,e.dataset.value=t.currentTarget.dataset.key);Object.keys(p.state.statuses).forEach((function(t){p.state.statuses[t].class.split(" ").forEach((function(t){e.classList.remove(t)}))})),""==t.currentTarget.dataset.key?e.classList.add("btn-primary"):p.state.statuses[t.currentTarget.dataset.key].class.split(" ").forEach((function(t){e.classList.add(t)})),p.getData()},viewOrder:function(e){var a,n=document.querySelector(".order-modal"),s=new bootstrap.Modal(n),r=e.currentTarget.dataset.index,o="";Object.keys(p.state.statuses).forEach((function(t,e){console.log(t),o+='<li><a class="dppi dropdown-item" data-key="'.concat(t,'" href="#">').concat(p.state.statuses[t].text,"</a></li>")}));var i='\n            <div class="st-modal st-opts mb-3 me-1 me-sm-3 dropdown">\n                <a class="btn btn-sm '.concat(p.state.statuses[p.state.orders[r].status].class,' dropdown-toggle order-form" data-id="status" data-type="key" data-value="new" href="#" role="button" id="order-status-modal" data-bs-toggle="dropdown" aria-expanded="false" >\n                    ').concat(p.state.statuses[p.state.orders[r].status].text,'\n                </a>\n                <ul class="dropdown-menu" aria-labelledby="order-status-modal">\n                    ').concat(o,"\n                </ul>\n            </div>");n.querySelector(".modal-dialog").classList.add("modal-dialog-wide"),n.querySelector(".modal-header .modal-title").innerHTML=p.state.orders[r].from,n.querySelector(".modal-footer .btn-primary").innerHTML=__("Update"),n.querySelector(".modal-footer .btn-secondary").innerHTML=__("Close");var c=i,m=(t(a={_id:{l:__("ID")},from:{l:__("From"),e:"text",editable:!0},items:{l:"",e:"items"},fname:{l:__("Name"),e:"text"},lname:{l:__("Surname"),e:"text"},bios:{l:__("Bios"),e:"textarea"},avatar:{l:__("Avatar"),e:"text"},email:{l:__("Email"),e:"text"},countryr:{l:__("Country"),e:"text"},cityr:{l:__("City"),e:"text"},addr1:{l:__("Address 1"),e:"textarea"},addr2:{l:__("Address 2"),e:"textarea"},post:{l:__("Post"),e:"text"},state:{l:__("State"),e:"text"},c1:{l:__("Whatsapp"),e:"text"},c2:{l:__("Messenger"),e:"text"},c3:{l:__("Line"),e:"text"},c4:{l:__("Email"),e:"text"},c5:{l:__("Telegram"),e:"text"}},"email",{l:__("Email"),e:"text"}),t(a,"bio",{l:__("Bio"),e:"text"}),t(a,"y1",{l:__("Name"),e:"text"}),t(a,"y2",{l:__("IBAN"),e:"text"}),t(a,"y3",{l:__("SWIFT"),e:"text"}),t(a,"y4",{l:__("Bank"),e:"text"}),t(a,"y5",{l:__("Bank city"),e:"text"}),t(a,"y6",{l:__("Bank country"),e:"text"}),t(a,"note",{l:__("Note"),e:"textarea"}),t(a,"total",{l:__("Total"),e:"text"}),t(a,"s3",{l:__("Link 3"),e:"text"}),t(a,"company",{l:__("Company"),e:"text"}),t(a,"vat",{l:__("Tax ID"),e:"text"}),t(a,"grade",{l:__("Grade"),e:"text"}),t(a,"kenzap_ida",{l:__("Kenzap IDA"),e:"text"}),a);for(var v in m)if(void 0!==p.state.orders[r][v]){var f=p.state.orders[r][v],h=m[v].l;"total"==v&&(f=u(f)),c+='\n                <div class="mb-3 mt-3 order-row '.concat("_id"==v||"from"==v?"elipsized":"",'">\n                    <b>').concat(h,"</b>&nbsp; ").concat(p.renderField(m[v],f,v),"\n                </div>")}c+="",n.querySelector(".modal-body").innerHTML=c,s.show(),l(".edit-item",p.listeners.suggestOrderItem),p.listeners.modalSuccessBtnFunc=function(t){t.preventDefault(),p.updateOrder(p.state.orders[r]._id),s.hide()},d(".st-modal li a",(function(t){t.preventDefault(),console.log(t.currentTarget.dataset.key);var e=document.querySelector("#order-status-modal");e.innerHTML=p.state.statuses[t.currentTarget.dataset.key].text,e.dataset.value=t.currentTarget.dataset.key;Object.keys(p.state.statuses).forEach((function(t){p.state.statuses[t].class.split(" ").forEach((function(t){e.classList.remove(t)}))})),p.state.statuses[t.currentTarget.dataset.key].class.split(" ").forEach((function(t){e.classList.add(t)}))}))},removeOrder:function(t){t.preventDefault(),confirm(__("Completely remove this order?"))&&fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:c,body:JSON.stringify({query:{product:{type:"delete",key:"ecommerce-order",id:t.currentTarget.dataset.id,sid:r()}}})}).then((function(t){return t.json()})).then((function(t){t.success?p.getData():i(t)})).catch((function(t){i(t)}))},searchOrders:function(t){t.preventDefault(),p.getData()},suggestOrderItem:function(t){var e,a,s=t.currentTarget.value;fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:c,body:JSON.stringify({query:{products:{type:"find",key:"ecommerce-product",fields:["_id","id","img","status","price","title","updated"],limit:p.state.limit,offset:s.length>0?0:(e=new URLSearchParams(window.location.search),a=e.get("page")?e.get("page"):1,parseInt(a)*p.state.searchLimit-p.state.searchLimit),search:{field:"title",s:s},sortby:{field:"title",order:"DESC"}}}})}).then((function(t){return t.json()})).then((function(t){if(n(),t.success){var e="";t.products.forEach((function(t){e+='<option value="'.concat(t.id,'">').concat(t.title,"</option>")})),document.querySelector("#item-suggestions").innerHTML=e}else i(t)})).catch((function(t){i(t)}))},modalSuccessBtn:function(t){console.log("calling modalSuccessBtnFunc"),p.listeners.modalSuccessBtnFunc(t)},modalSuccessBtnFunc:null},renderField:function(t,e,a){switch(t.e){case"text":default:return e;case"textarea":return'<textarea type="text" rows="4" class="form-control order-form pv " data-type="textarea" id="'+a+'" value="'+e+'">'+e+"</textarea>";case"items":var n='<table class="items"><tr><th><div class="me-1 me-sm-3">'.concat(__("Product"),'</div></th><th class="qty"><div class="me-1 me-sm-3">').concat(__("Qty"),'</div></th><th class="tp"><div class="me-1 me-sm-3">').concat(__("Total"),"</div></th><th></th></tr>");for(var s in e){var r="";for(var o in e[s].variations){var i="";for(var d in e[s].variations[o].list)i+=e[s].variations[o].list[d].title+" ";r+="<div><b>"+e[s].variations[o].title+"</b> <span>"+i+"</span></div> ",void 0!==e[s].variations[o].note&&e[s].variations[o].note.length>0&&(r+="<div><b>"+__("Note")+"</b> "+e[s].variations[o].note+"</div> ")}n+="<tr>",n+='<td><div contenteditable="true">'+e[s].title+"</div><div>"+e[s].note+'</div><div class="vars border-primary">'+r+'</div></td><td class="qty"><div class="me-1 me-sm-3">'+e[s].qty+'</div></td><td class="tp"><div class="me-1 me-sm-3">'+u(e[s].priceF)+"</div><td>"+p.itemOptions(e[s])+"</td></td>",n+="</tr>"}return n+='<tr>\n                            <td>\n                                <div class="me-1 me-sm-3">\n                                    <input type="text" value="" autocomplete="off" placeholder="'.concat(__("Search.."),'" class="form-control edit-item" list="item-suggestions">\n                                    <datalist id="item-suggestions" class="fs-12">\n\n                                    </datalist>\n                                </div>\n                            </td>\n                            <td class="qty">\n                                <div class="me-1 me-sm-3">\n                                    <input type="text" value="" autocomplete="off" class="form-control text-right edit-qty">\n                                </div>\n                            </td>\n                            <td class="tp">\n                                <div class="me-1 me-sm-3">\n                                    <input type="text" value="" autocomplete="off" class="form-control edit-tp">\n                                </div>\n                            </td>\n                            <td class="align-middle text-center"> \n                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="24" height="24" class="bi bi-plus-circle text-success align-middle add-item"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>\n                            </td>\n                        </tr>'),n+="</table>"}},updateOrder:function(t){var e,n={},s=a(document.querySelectorAll(".order-form"));try{for(s.s();!(e=s.n()).done;){var o=e.value;switch(o.dataset.type){case"key":n[o.dataset.id]=o.dataset.value;break;case"text":case"email":case"emails":case"select":case"textarea":n[o.id]=o.value;break;case"radio":n[o.id]=o.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector("input:checked").value}}}catch(t){s.e(t)}finally{s.f()}fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:c,body:JSON.stringify({query:{settings:{type:"update",key:"ecommerce-order",sid:r(),id:t,data:n}}})}).then((function(t){return t.json()})).then((function(t){if(t.success){var e=new bootstrap.Toast(document.querySelector(".toast"));document.querySelector(".toast .toast-body").innerHTML=__("Order updated"),e.show(),p.getData()}else i(t)})).catch((function(t){i(t)}))},itemOptions:function(t){return'\n\n            <div class="dropdown text-center">\n                <a  href="#" role="button" id="order-item-options" data-id="status" data-value="" data-bs-toggle="dropdown" aria-expanded="false">\n                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical order-item-options" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>\n                </a>\n                <ul class="dropdown-menu" aria-labelledby="order-item-options" >\n                    <li><a class="oio dropdown-item" data-key="edit-item-note" href="#">'.concat(__("Add note"),'</a></li>\n                    <li><a class="oio dropdown-item" data-key="edit-item-variation" href="#">').concat(__("Add variation"),'</a></li>\n                    <li><a class="oio dropdown-item" data-key="edit-item-price" href="#">').concat(__("Adjust price"),'</a></li>\n                    <li><a class="oio dropdown-item text-danger" data-key="remove-item" href="#">').concat(__("Remove"),"</a></li>\n                </ul>\n            </div>\n        ")},initFooter:function(){var t,e;t=__("Copyright © %1$ %2$ Kenzap%3$. All rights reserved.",(new Date).getFullYear(),'<a class="text-muted" href="https://kenzap.com/" target="_blank">',"</a>"),e=__("Kenzap Cloud Services - Dashboard"),document.querySelector("footer .row").innerHTML=`\n    <div class="d-sm-flex justify-content-center justify-content-sm-between">\n        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">${t}</span>\n        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">${e}</span>\n    </div>`}};p.init()}();
