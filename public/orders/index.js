!function(){"use strict";function e(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function a(e,a){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,a){if(e){if("string"==typeof e)return t(e,a);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,a):void 0}}(e))||a&&e&&"number"==typeof e.length){n&&(e=n);var r=0,s=function(){};return{s:s,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){l=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw o}}}}const n=e=>{let t=new URLSearchParams(window.location.search),a=t.get("sid")?t.get("sid"):"",n=-1==e.indexOf("?")?"?sid="+a:"&sid="+a;return e+n},r=()=>{let e=new URLSearchParams(window.location.search);return e.get("sid")?e.get("sid"):""},s=e=>{let t=e+"=",a=decodeURIComponent(document.cookie).split(";");for(let e=0;e<a.length;e++){let n=a[e];for(;" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(t))return n.substring(t.length,n.length)}return""},o=e=>{if(401===e.code){if(-1!=window.location.href.indexOf("localhost"))return void alert(e.reason);location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+window.location.href}else alert(e.reason)},i=(e,t)=>{if(document.querySelector(e))for(let a of document.querySelectorAll(e))a.removeEventListener("click",t,!0),a.addEventListener("click",t,!0)};var l=function(e){var t=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"});return void 0!==e&&""!=e||(e=0),e=parseFloat(e),e=t.format(e)},d=function(e,t){console.log(e+" "+t),e=parseInt(e),t=parseInt(t),console.log(e+" "+t);var a=e-t;if(a<60)return"moments ago";if(a<3600)return parseInt(a/60)+" minutes ago";if(a<86400)return parseInt(a/60/24)+" hours ago";var n=new Date(1e3*t),r=n.getFullYear(),s=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][n.getMonth()],o=n.getDate();return n.getHours(),n.getMinutes(),n.getSeconds(),t=o+" "+s+" "+r},c={state:{firstLoad:!0,firstTouch:!0,playSoundNow:!1,newOrderCount:0,orderIDs:[],orders:[],playTitleTimer:null,refreshTimer:null,statuses:[],audio:new Audio("https://kenzap.com/static/swiftly.mp3"),limit:50},init:function(){c.getData(),c.state.refreshTimer=setInterval((function(){c.getData()}),7e3)},getData:function(){c.state.firstLoad&&(()=>{let e=document.querySelector(".loader");e&&(e.style.display="block")})();var e=document.querySelector(".search-input")?document.querySelector(".search-input").value:"",t=document.querySelector("#order-status")?document.querySelector("#order-status").dataset.value:"";fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:{Accept:"application/json","Content-Type":"text/plain",Authorization:"Bearer "+s("kenzap_api_key"),"Kenzap-Header":localStorage.hasOwnProperty("header"),"Kenzap-Token":s("kenzap_token"),"Kenzap-Sid":r()},body:JSON.stringify({query:{user:{type:"authenticate",fields:["avatar"],token:s("kenzap_token")},locale:{type:"locale",id:s("lang")},orders:{type:"find",key:"ecommerce-order",fields:"*",term:""!=t?"status='"+t+"'":"",limit:c.state.limit,search:{field:"from",s:e},sortby:{field:"created",order:"DESC"}}}})}).then((function(e){return e.json()})).then((function(e){(()=>{let e=document.querySelector(".loader");e&&(e.style.display="none")})(),e.success?((e=>{if(e.header&&localStorage.setItem("header",e.header),!document.querySelector("#k-script")){let e=document.createElement("div");e.innerHTML=localStorage.getItem("header"),e=e.firstChild,document.body.prepend(e),Function(document.querySelector("#k-script").innerHTML).call("test")}e.locale&&window.i18n.init(e.locale)})(e),c.loadPageStructure(),c.renderPage(e),c.initListeners(),c.initFooter(),c.state.firstLoad=!1):o(e)})).catch((function(e){console.error("Error:",e)}))},authUser:function(e){e.user&&e.user.success},loadPageStructure:function(){c.state.firstLoad&&(document.querySelector("#contents").innerHTML=function(e){return'\n      <div class="container ec-orders">\n        <div class="d-flex justify-content-between bd-highlight mb-3">\n            <nav class="bc" aria-label="breadcrumb"></nav>\n        </div>\n        <div class="row">\n          <div class="col-md-12 page-title">\n            <div class="st-opts st-table mb-3 dropdown">\n                <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="order-status" data-id="status" data-value="" data-bs-toggle="dropdown" aria-expanded="false">\n                  All\n                </a>\n                <ul class="dropdown-menu" aria-labelledby="order-status">\n                  <li><a class="dppi dropdown-item" data-key="" href="#" >All</a></li>\n                  <li><a class="dppi dropdown-item" data-key="new" href="#" >New</a></li>\n                  <li><a class="dppi dropdown-item" data-key="processing" href="#" >Processing</a></li>\n                  <li><a class="dppi dropdown-item" data-key="completed" href="#" >Completed</a></li>\n                  <li><a class="dppi dropdown-item" data-key="canceled" href="#" >Canceled</a></li>\n                  <li><a class="dppi dropdown-item" data-key="failed" href="#" >Failed</a></li>\n                </ul>\n            </div>\n            <div class="st-opts" >\n              <div class="input-group-sm mb-0 justify-content-start" >\n                <input id="usearch" type="text" class="inp form-control search-input" placeholder="'.concat(e("Search order"),'">\n              </div>\n              \x3c!-- <a id="viewSum" href="#" style="margin-left:16px;">view summary</a> --\x3e\n            </div>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">\n            <div class="card border-white shadow-sm">\n              <div class="card-body">\n \n                <div class="table-responsive">\n                  <table class="table table-hover table-borderless align-middle table-striped table-p-list">\n                    <thead>\n                      <tr>\n\n                        <th>From</th>\n                        <th>Status</th>\n                        <th>Total</th>\n                        <th>Time</th>\n                        <th></th>\n                      </tr>\n                    </thead>\n                    <tbody class="list">\n\n                    </tbody>\n                  </table>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="modal order-modal" tabindex="-1">\n        <div class="modal-dialog ">\n          <div class="modal-content">\n              <div class="modal-header">\n                <h5 class="modal-title"></h5>\n                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n              </div>\n              <div class="modal-body">\n              \n              </div>\n              <div class="modal-footer">\n                <button type="button" class="btn btn-primary"></button>\n                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>\n              </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="position-fixed bottom-0 p-sm-2 m-sm-4 end-0 align-items-center" >   \n        <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">\n          <div class="d-flex">  \n            <div class="toast-body"></div>\n            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>\n          </div>\n        </div>\n      </div>\n    ')}(__))},renderPage:function(e){if(c.state.firstLoad&&((e=>{let t='<ol class="breadcrumb mt-2 mb-0">';for(let a of e)void 0===a.link?t+=`<li class="breadcrumb-item">${a.text}</li>`:t+=`<li class="breadcrumb-item"><a href="${a.link}">${a.text}</a></li>`;t+="</ol>",document.querySelector(".bc").innerHTML=t})([{link:n("https://dashboard.kenzap.cloud"),text:__("Dashboard")},{link:n("/"),text:__("E-commerce")},{text:__("Orders")}]),c.state.statuses={new:{text:__("New"),class:"btn-warning text-dark fw-light"},processing:{text:__("Processing"),class:"btn-primary fw-light"},completed:{text:__("Completed"),class:"btn-success fw-light"},canceled:{text:__("Canceled"),class:"btn-secondary fw-light"},failed:{text:__("Failed"),class:"btn-danger fw-light"}}),c.state.orders=e.orders,0!=e.orders.length){var t=[];c.state.newOrderCount=[];var a="",r=0;for(var s in e.orders){t.push(e.orders[s]._id),void 0===e.orders[s].status&&(e.orders[s].status="new"),"new"==e.orders[s].status&&r++;var o=c.state.orderIDs.includes(e.orders[s]._id)||c.state.firstLoad?"":"new";a+='\n            <tr class="'.concat(o,'">\n              <td class="destt" style="max-width:250px;min-width:250px;">\n                <div>\n                  <b>').concat(e.orders[s].from,'</b><div class="elipsized fst-italic">').concat(e.orders[s].note,'</div>\n                </div>\n              </td>\n              <td>\n                <span style="font-size:24px;">').concat(c.getStatus(e.orders[s].status),'</span>\n              </td>\n              <td>\n                <span style="font-size:18px;">').concat(l(e.orders[s].total),'</span>\n              </td>\n              <td class="">\n                <span style="font-size:18px;">').concat(d(e.meta.time,e.orders[s].created),'</span>\n              </td>\n              <td class="last">\n                <a href="#" data-id="').concat(e.orders[s]._id,'" data-index="').concat(s,'" class="view-order text-success me-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n                </svg></a>\n                <a href="#" data-id="').concat(e.orders[s]._id,'" data-index="').concat(s,'" class="remove-order text-danger "><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\n                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>\n                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>\n                </svg></a>\n              </td>\n            </tr>')}c.state.playSoundNow=r>0,c.state.orderIDs=t,document.querySelector(".table tbody").innerHTML=a}else document.querySelector(".table tbody").innerHTML='<tr><td colspan="5">'.concat(__("No orders to display."),"</td></tr>")},getStatus:function(e){return'<div class="badge '.concat(c.state.statuses[e].class,'">').concat(c.state.statuses[e].text,"</div>")},playSound:function(){console.log("playSound"),c.state.audio.play()},playTitle:function(e){},initListeners:function(){i(".view-order",c.listeners.viewOrder),i(".remove-order",c.listeners.removeOrder),i(".st-table li a",c.listeners.changeStatus),c.state.firstLoad&&(i(".modal .btn-primary",c.listeners.modalSuccessBtn),((e,t)=>{if(document.querySelector(e))for(let a of document.querySelectorAll(e))a.removeEventListener("keyup",t,!0),a.addEventListener("keyup",t,!0)})(".search-input",c.listeners.searchOrders),document.body.addEventListener("touchstart",(function(){c.state.firstTouch?(c.state.audio.play(),c.state.audio.pause(),c.state.audio.currentTime=0,c.state.firstTouch=!1):(c.state.playTitleTimer&&clearInterval(c.state.playTitleTimer),c.state.playTitleTimer=setInterval((function(){c.state.playSoundNow&&c.playSound()}),6500))}),!1))},listeners:{changeStatus:function(e){e.preventDefault(),console.log(e.currentTarget.dataset.key);var t=document.querySelector("#order-status");""==e.currentTarget.dataset.key?(t.innerHTML=__("All"),t.dataset.value=""):(t.innerHTML=c.state.statuses[e.currentTarget.dataset.key].text,t.dataset.value=e.currentTarget.dataset.key);Object.keys(c.state.statuses).forEach((function(e){c.state.statuses[e].class.split(" ").forEach((function(e){t.classList.remove(e)}))})),""==e.currentTarget.dataset.key?t.classList.add("btn-primary"):c.state.statuses[e.currentTarget.dataset.key].class.split(" ").forEach((function(e){t.classList.add(e)})),c.getData()},viewOrder:function(t){var a,n=document.querySelector(".order-modal"),r=new bootstrap.Modal(n),s=t.currentTarget.dataset.index,o="";Object.keys(c.state.statuses).forEach((function(e,t){console.log(e),o+='<li><a class="dppi dropdown-item" data-key="'.concat(e,'" href="#">').concat(c.state.statuses[e].text,"</a></li>")}));var d='\n            <div class="st-modal st-opts mb-3 me-3 dropdown">\n                <a class="btn btn-sm '.concat(c.state.statuses[c.state.orders[s].status].class,' dropdown-toggle order-form" data-id="status" data-type="key" data-value="new" href="#" role="button" id="order-status-modal" data-bs-toggle="dropdown" aria-expanded="false" >\n                    ').concat(c.state.statuses[c.state.orders[s].status].text,'\n                </a>\n                <ul class="dropdown-menu" aria-labelledby="order-status-modal">\n                    ').concat(o,"\n                </ul>\n            </div>");n.querySelector(".modal-dialog").classList.add("modal-dialog-wide"),n.querySelector(".modal-header .modal-title").innerHTML=d+c.state.orders[s].from,n.querySelector(".modal-footer .btn-primary").innerHTML=__("Update"),n.querySelector(".modal-footer .btn-secondary").innerHTML=__("Close");var u="";console.log(s),console.log(c.state.orders[s]._id);var p=(e(a={_id:{l:"ID"},from:{l:"From",e:"text",editable:!0},items:{l:"",e:"items"},fname:{l:"Name",e:"text"},lname:{l:"Surname",e:"text"},bios:{l:"Bios",e:"textarea"},avatar:{l:"Avatar",e:"text"},email:{l:"Email",e:"text"},countryr:{l:"Country",e:"text"},cityr:{l:"City",e:"text"},addr1:{l:"Address 1",e:"textarea"},addr2:{l:"Address 2",e:"textarea"},post:{l:"Post",e:"text"},state:{l:"State",e:"text"},c1:{l:"Whatsapp",e:"text"},c2:{l:"Messenger",e:"text"},c3:{l:"Line",e:"text"},c4:{l:"Email",e:"text"},c5:{l:"Telegram",e:"text"}},"email",{l:"Email",e:"text"}),e(a,"bio",{l:"Bio",e:"text"}),e(a,"y1",{l:"Name",e:"text"}),e(a,"y2",{l:"IBAN",e:"text"}),e(a,"y3",{l:"SWIFT",e:"text"}),e(a,"y4",{l:"Bank",e:"text"}),e(a,"y5",{l:"Bank city",e:"text"}),e(a,"y6",{l:"Bank country",e:"text"}),e(a,"note",{l:"Note",e:"textarea"}),e(a,"total",{l:"Total",e:"text"}),e(a,"s3",{l:"Link 3",e:"text"}),e(a,"company",{l:"Company",e:"text"}),e(a,"vat",{l:"Tax ID",e:"text"}),e(a,"grade",{l:"Grade",e:"text"}),e(a,"kenzap_ida",{l:"Kenzap IDA",e:"text"}),a);for(var m in p)if(void 0!==c.state.orders[s][m]){var f=c.state.orders[s][m],v=p[m].l;"total"==m&&(f=l(f)),u+='                <div class="mb-3 mt-3">                    <b>'+v+"</b>&nbsp;"+c.renderField(p[m],f,m)+"                </div>"}u+="",n.querySelector(".modal-body").innerHTML=u,r.show(),c.listeners.modalSuccessBtnFunc=function(e){e.preventDefault(),c.updateOrder(c.state.orders[s]._id),r.hide()},i(".st-modal li a",(function(e){e.preventDefault(),console.log(e.currentTarget.dataset.key);var t=document.querySelector("#order-status-modal");t.innerHTML=c.state.statuses[e.currentTarget.dataset.key].text,t.dataset.value=e.currentTarget.dataset.key;Object.keys(c.state.statuses).forEach((function(e){c.state.statuses[e].class.split(" ").forEach((function(e){t.classList.remove(e)}))})),c.state.statuses[e.currentTarget.dataset.key].class.split(" ").forEach((function(e){t.classList.add(e)}))}))},removeOrder:function(e){e.preventDefault(),confirm(__("Completely remove this order?"))&&fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:{Accept:"application/json","Content-Type":"text/plain",Authorization:"Bearer "+s("kenzap_api_key"),"Kenzap-Token":s("kenzap_token"),"Kenzap-Sid":r()},body:JSON.stringify({query:{product:{type:"delete",key:"ecommerce-order",id:e.currentTarget.dataset.id,sid:r()}}})}).then((function(e){return e.json()})).then((function(e){e.success?c.getData():o(e),console.log("Success:",e)})).catch((function(e){console.error("Error:",e)}))},searchOrders:function(e){e.preventDefault(),c.getData()},modalSuccessBtn:function(e){console.log("calling modalSuccessBtnFunc"),c.listeners.modalSuccessBtnFunc(e)},modalSuccessBtnFunc:null},renderField:function(e,t,a){switch(e.e){case"text":default:return t;case"textarea":return'<textarea type="text" rows="4" class="form-control order-form pv " data-type="textarea" id="'+a+'" value="'+t+'">'+t+"</textarea>";case"items":var n='<table class="items"><tr><th>Product</th><th class="qty">Quantity</th><th class="tp">Total</th></tr>';for(var r in t){var s="";for(var o in t[r].variations){var i="";for(var d in t[r].variations[o].list)i+=t[r].variations[o].list[d].title+" ";s+="<div><b>"+t[r].variations[o].title+"</b> <span>"+i+"</span></div> ",void 0!==t[r].variations[o].note&&t[r].variations[o].note.length>0&&(s+="<div><b>Note</b> "+t[r].variations[o].note+"</div> ")}n+="<tr>",n+="<td><div>"+t[r].title+"</div><div>"+t[r].note+'</div><div class="vars border-primary">'+s+'</div></td><td class="qty"><span>'+t[r].qty+'</span></td><td class="tp"><span>'+l(t[r].priceF)+"</span></td>",n+="</tr>"}return n+="</table>"}},updateOrder:function(e){var t,n={},i=a(document.querySelectorAll(".order-form"));try{for(i.s();!(t=i.n()).done;){var l=t.value;switch(l.dataset.type){case"key":n[l.dataset.id]=l.dataset.value;break;case"text":case"email":case"emails":case"select":case"textarea":n[l.id]=l.value;break;case"radio":n[l.id]=l.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector("input:checked").value}}}catch(e){i.e(e)}finally{i.f()}fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:{Accept:"application/json","Content-Type":"text/plain",Authorization:"Bearer "+s("kenzap_api_key"),"Kenzap-Token":s("kenzap_token"),"Kenzap-Sid":r()},body:JSON.stringify({query:{settings:{type:"update",key:"ecommerce-order",sid:r(),id:e,data:n}}})}).then((function(e){return e.json()})).then((function(e){if(e.success){var t=new bootstrap.Toast(document.querySelector(".toast"));document.querySelector(".toast .toast-body").innerHTML=__("Order updated"),t.show(),c.getData()}else o(e);console.log("Success:",e)})).catch((function(e){console.error("Error:",e)})),console.log("saveOrder")},initFooter:function(){var e,t;e=__("Copyright © "+(new Date).getFullYear()+' <a class="text-muted" href="https://kenzap.com/" target="_blank">Kenzap</a>. All rights reserved.'),t=__("Kenzap Cloud Services - Dashboard"),document.querySelector("footer .row").innerHTML=`\n    <div class="d-sm-flex justify-content-center justify-content-sm-between">\n        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">${e}</span>\n        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">${t}</span>\n    </div>`}};c.init()}();
