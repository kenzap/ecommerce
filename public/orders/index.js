!function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}function r(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,i=!0,d=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){d=!0,s=e},f:function(){try{i||null==r.return||r.return()}finally{if(d)throw s}}}}const n=()=>{let e=document.querySelector(".loader");e&&(e.style.display="none")},o=e=>{let t=new URLSearchParams(window.location.search),a=t.get("sid")?t.get("sid"):"",r=-1==e.indexOf("?")?"?sid="+a:"&sid="+a;return e+r},s=()=>{let e=new URLSearchParams(window.location.search);return e.get("sid")?e.get("sid"):""},i=()=>{let e=new URLSearchParams(window.location.search);return e.get("sid")?e.get("sid"):""},d=e=>{let t=e+"=",a=decodeURIComponent(document.cookie).split(";");for(let e=0;e<a.length;e++){let r=a[e];for(;" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return""},c={Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+d("kenzap_api_key"),"Kenzap-Locale":d("locale")?d("locale"):"en","Kenzap-Header":localStorage.hasOwnProperty("header")&&localStorage.hasOwnProperty("header-version")?localStorage.getItem("header-version"):0,"Kenzap-Token":d("kenzap_token"),"Kenzap-Sid":s()},l=e=>{if(console.log(e),isNaN(e.code)){let t=e;try{t=JSON.stringify(t)}catch(e){}let a=new URLSearchParams;return a.append("cmd","report"),a.append("sid",s()),a.append("token",d("kenzap_token")),a.append("data",t),fetch("https://api-v1.kenzap.cloud/error/",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded"},body:a}),void alert("Can not connect to Kenzap Cloud")}if(401===e.code){if(-1!=window.location.href.indexOf("localhost"))return void alert(e.reason);location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+window.location.href}else alert(e.reason)},u=(e,t)=>{if(document.querySelector(e))for(let a of document.querySelectorAll(e))a.removeEventListener("click",t,!0),a.addEventListener("click",t,!0)},m=(e,t)=>{if(document.querySelector(e))for(let a of document.querySelectorAll(e))a.removeEventListener("keyup",t,!0),a.addEventListener("keyup",t,!0)},p=e=>{if(!document.querySelector(".toast")){let e='\n        <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">\n            <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">\n                <div class="d-flex">\n                    <div class="toast-body"></div>\n                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>\n                </div>\n            </div>\n        </div>';document.querySelector("body > div")&&document.querySelector("body > div").insertAdjacentHTML("afterend",e)}let t=new bootstrap.Toast(document.querySelector(".toast"));document.querySelector(".toast .toast-body").innerHTML=e,t.show()};var v=function(e,t){t=y(t);var a=parseFloat(t).toFixed(2);switch(e.state.settings.currency_symb_loc){case"left":a=e.state.settings.currency_symb+a;break;case"right":a+=e.state.settings.currency_symb}return a},y=function(e){return e=""==e?0:e,e=parseFloat(e)},f=function(e,t){var a=(e=parseInt(e))-(t=parseInt(t));if(a<60)return"moments ago";if(a<3600)return parseInt(a/60)+" minutes ago";if(a<86400)return parseInt(a/60/24)+" hours ago";var r=new Date(1e3*t),n=[__("Jan"),__("Feb"),__("Mar"),__("Apr"),__("May"),__("Jun"),__("Jul"),__("Aug"),__("Sep"),__("Oct"),__("Nov"),__("Dec")],o=r.getFullYear(),s=n[r.getMonth()],i=r.getDate();return r.getHours(),r.getMinutes(),r.getSeconds(),t=i+" "+s+" "+o},h=function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},g={_this:null,renderOrder:function(e,a){var r,n=document.querySelector(".order-modal");e.modalCont=new bootstrap.Modal(n),e.modalOpen=!0;var o=a.currentTarget.dataset.index;history.pushState({pageID:"orders"},"Orders",window.location.href+"#editing"),n.addEventListener("hide.bs.modal",(function(e){-1!=window.location.href.indexOf("#editing")&&history.pushState({pageID:"orders"},"Orders",window.location.pathname+window.location.search)})),e.state.orderSingle=void 0===o?{_id:"new",created:1649831099,from:"from",id:"",idd:"",items:[],kid:"0",name:"from",note:"",sid:i,status:"new",step:1,table:"1",total:0,updated:1649833845}:e.state.orders[o];var s="";Object.keys(e.state.statuses).forEach((function(t,a){s+='<li><a class="dppi dropdown-item" data-key="'.concat(t,'" href="#">').concat(e.state.statuses[t].text,"</a></li>")}));var d='\n        <div class="st-modal st-opts mb-3 me-1 me-sm-3 dropdown">\n            <a class="btn btn-sm '.concat(e.state.statuses[e.state.orderSingle.status].class,' dropdown-toggle order-form" data-id="status" data-type="key" data-value="').concat(e.state.orderSingle.status,'" href="#" role="button" id="order-status-modal" data-bs-toggle="dropdown" aria-expanded="false" >\n                ').concat(e.state.statuses[e.state.orderSingle.status].text,'\n            </a>\n            <ul class="dropdown-menu" aria-labelledby="order-status-modal">\n                ').concat(s,"\n            </ul>\n        </div>");n.querySelector(".modal-dialog").classList.add("modal-dialog-wide"),n.querySelector(".modal-header .modal-title").innerHTML=e.state.orderSingle.from,n.querySelector(".modal-footer .btn-primary").innerHTML="new"==e.state.orderSingle._id?__("Create"):__("Update"),n.querySelector(".btn-primary").dataset.loading=!1,n.querySelector(".modal-footer .btn-secondary").innerHTML=__("Close");var c=d,l=(t(r={_id:{l:__("ID")},from:{l:__("From"),e:"text",editable:!0,classList:"order-form"},items:{l:"",e:"items"},fname:{l:__("Name"),e:"text"},lname:{l:__("Surname"),e:"text"},bios:{l:__("Bios"),e:"textarea"},avatar:{l:__("Avatar"),e:"text"},email:{l:__("Email"),e:"text"},countryr:{l:__("Country"),e:"text"},cityr:{l:__("City"),e:"text"},addr1:{l:__("Address 1"),e:"textarea"},addr2:{l:__("Address 2"),e:"textarea"},post:{l:__("Post"),e:"text"},state:{l:__("State"),e:"text"},c1:{l:__("Whatsapp"),e:"text"},c2:{l:__("Messenger"),e:"text"},c3:{l:__("Line"),e:"text"},c4:{l:__("Email"),e:"text"},c5:{l:__("Telegram"),e:"text"}},"email",{l:__("Email"),e:"text"}),t(r,"bio",{l:__("Bio"),e:"text"}),t(r,"y1",{l:__("Name"),e:"text"}),t(r,"y2",{l:__("IBAN"),e:"text"}),t(r,"y3",{l:__("SWIFT"),e:"text"}),t(r,"y4",{l:__("Bank"),e:"text"}),t(r,"y5",{l:__("Bank city"),e:"text"}),t(r,"y6",{l:__("Bank country"),e:"text"}),t(r,"note",{l:__("Note"),e:"textarea"}),t(r,"total",{l:__("Total"),e:"text"}),t(r,"tax",{l:__("Tax"),e:"text"}),t(r,"totalWithTax",{l:__("Amount Payable"),e:"text"}),t(r,"s3",{l:__("Link 3"),e:"text"}),t(r,"company",{l:__("Company"),e:"text"}),t(r,"vat",{l:__("Tax ID"),e:"text"}),t(r,"grade",{l:__("Grade"),e:"text"}),t(r,"kenzap_ida",{l:__("Kenzap IDA"),e:"text"}),r);for(var m in l)if(void 0!==e.state.orderSingle[m]){var p=e.state.orderSingle[m],y=l[m].l;switch(m){case"total":case"tax":case"totalWithTax":p=v(e,p);default:c+='\n                    <div class="mb-3 mt-3 order-row keyx-'.concat(m," ").concat("_id"==m||"from"==m?"elipsized":"",'" >\n                        <b>').concat(y,"</b>").concat(g.renderField(e,l[m],p,m),"\n                    </div>")}}c+="",n.querySelector(".modal-body").innerHTML=c,e.modalCont.show(),g.tableOrderItemListeners(),g.suggestOrderItem(e),n.querySelector(".edit-item").addEventListener("blur",(function(e){setTimeout((function(){document.querySelector(".s-list").dataset.toggle=!1}),500)})),g.addOrderItem(e),"new"==e.state.orderSingle._id&&g.refreshTotals(),"new"==e.state.orderSingle._id&&setTimeout((function(){document.querySelector(".edit-item").focus()}),300),e.listeners.modalSuccessBtnFunc=function(t){t.preventDefault(),e.updateOrder(o,e.state.orderSingle._id)},u(".st-modal li a",(function(t){t.preventDefault();var a=document.querySelector("#order-status-modal");a.innerHTML=e.state.statuses[t.currentTarget.dataset.key].text,a.dataset.value=t.currentTarget.dataset.key;Object.keys(e.state.statuses).forEach((function(t){e.state.statuses[t].class.split(" ").forEach((function(e){a.classList.remove(e)}))})),e.state.statuses[t.currentTarget.dataset.key].class.split(" ").forEach((function(e){a.classList.add(e)}))}))},newOrder:function(e){g._this=e,u(".add-order",(function(t){g.renderOrder(e,t)}))},viewOrder:function(e){g._this=e,u(".view-order",(function(t){g.renderOrder(e,t)}))},renderField:function(e,t,a,r){var n="";switch(t.e){case"text":return n='<div data-id="'.concat(r,'" data-type="text" class="').concat(t.classList?t.classList:"",' ms-2 d-inline-block" ').concat(t.editable?'contenteditable="true"':"",' data-id="').concat(r,'">').concat(a,"</div>");case"textarea":return'<textarea type="text" rows="4" class="form-control order-form pv " data-type="textarea" id="'+r+'" value="'+a+'">'+a+"</textarea>";case"items":for(var o in n='<table class="items order-form" data-type="items"><tr><th><div class="me-1 me-sm-3">'.concat(__("Product"),'</div></th><th class="qty"><div class="me-1 me-sm-3">').concat(__("Qty"),'</div></th><th class="tp"><div class="me-1 me-sm-3">').concat(__("Total"),"</div></th><th></th></tr>"),a)n+=g.structOrderItemTable(e,o,a,!1);return n+='<tr class="new-item-row">\n                            <td>\n                                <div class="me-1 me-sm-3">\n                                    <input type="text" value="" autocomplete="off" placeholder="'.concat(__("Search.."),'" class="form-control edit-item" data-id="" data-index="" list="item-suggestions">\n                                    <span class="select-list-group__toggle"> </span>\n                                    <ul class="s-list my-1 shadow-sm" data-toggle="false"></ul>\n                                    <datalist id="item-suggestions" class="fs-12 d-none"></datalist>\n                                </div>\n                            </td>\n                            <td class="qty">\n                                <div class="me-1 me-sm-3">\n                                    <input type="text" value="" autocomplete="off" class="form-control text-right edit-qty">\n                                </div>\n                            </td>\n                            <td class="tp">\n                                <div class="me-1 me-sm-3">\n                                    <input type="text" value="" autocomplete="off" class="form-control edit-tp">\n                                </div>\n                            </td>\n                            <td class="align-middle text-center"> \n                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="24" height="24" class="bi bi-plus-circle text-success align-middle add-item"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>\n                            </td>\n                        </tr>'),n+='</table><div class="item-vars-input mt-3"> </div>';default:return"_id"==r&&(a=a.substr(0,5)),n='<div data-id="'.concat(r,'" data-type="text" class="').concat(t.classList?t.classList:"",' ms-2 d-inline-block" ').concat(t.editable?'contenteditable="true"':"",' data-id="').concat(r,'">').concat(a,"</div>")}},itemOptions:function(e){return'\n\n        <div class="dropdown text-center">\n            <a  href="#" role="button" id="order-item-options" data-id="status" data-value="" data-bs-toggle="dropdown" aria-expanded="false">\n                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical order-item-options" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>\n            </a>\n            <ul class="dropdown-menu" aria-labelledby="order-item-options" >\n                <li><a class="oio dropdown-item edit-item-note" data-key="edit-item-note" href="#">'.concat(__("Add note"),'</a></li>\n                <li><a class="oio dropdown-item d-none" data-key="edit-item-variation" href="#">').concat(__("Add variation"),'</a></li>\n                <li><a class="oio dropdown-ite d-none" data-key="edit-item-price" href="#">').concat(__("Adjust price"),'</a></li>\n                <li><a class="oio dropdown-item text-danger remove-item" data-key="remove-item" href="#">').concat(__("Remove"),"</a></li>\n            </ul>\n        </div>\n    ")},structOrderItemTable:function(e,t,a){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],n="",o="";for(var s in a[t].variations){var i="";for(var d in a[t].variations[s].list)i+=a[t].variations[s].list[d].title+" ";n+="<div><b>"+a[t].variations[s].title+"</b> <span>"+i+"</span></div> ",void 0!==a[t].variations[s].note&&a[t].variations[s].note.length>0&&(n+="<div><b>"+__("Note")+"</b> "+a[t].variations[s].note+"</div> ")}return o+='<tr class="order-item-row-active" data-x="'+t+'" data-id="'+a[t].id+'" data-vars="'+h(JSON.stringify(a[t].variations))+'">',o+='<td><div class="item-title" contenteditable="false" data-value="'+a[t].title+'" data-sdesc="'+(a[t].sdesc?a[t].sdesc:"")+'">'+a[t].title+'</div><div class="item-note text-muted mb-1 '+(0!=a[t].note.length&&"<br>"!=a[t].note||r?"":"d-none")+'" contenteditable="true" data-value="'+a[t].note+'">'+a[t].note+'</div><div class="vars border-primary item-variations my-1 ps-2 text-secondary" data-value="">'+n+'</div></td><td class="qty"><div class="me-1 me-sm-3 item-qty" data-value="'+a[t].qty+'">'+a[t].qty+'</div></td><td class="tp"><div class="me-1 me-sm-3 item-pricef" data-price="'+a[t].price+'" data-value="'+a[t].priceF+'" >'+v(e,a[t].priceF)+"</div><td>"+g.itemOptions(a[t])+"</td></td>",o+="</tr>"},suggestOrderItem:function(t){m(".edit-item",(function(a){var r=a.keyCode||a.charCode;if(!(r>=34&&r<=45)){var o,s,i=a.currentTarget.value;if(0!=i.length&&a.currentTarget===document.activeElement)fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:c,body:JSON.stringify({query:{products:{type:"find",key:"ecommerce-product",fields:["_id","id","img","status","variations","price","title"],limit:t.state.slist,offset:i.length>0?0:(o=new URLSearchParams(window.location.search),s=o.get("page")?o.get("page"):1,parseInt(s)*t.state.slist-t.state.slist),search:{field:"title",s:i},sortby:{field:"title",order:"DESC"}}}})}).then((function(e){return e.json()})).then((function(a){if(n(),console.log(a),a.success){t.state.productsSuggestions=a.products;var r="";a.products.forEach((function(e,t){r+='<li class="s-list-item py-1" data-id="'.concat(e._id,'" data-title="').concat(e.title,'" data-index="').concat(t,'"  data-display="true" data-highlight="false">').concat(e.title,"</li>")})),document.querySelector(".s-list").innerHTML=r,document.querySelector(".s-list").dataset.toggle=!0,u(".s-list-item",(function(a){var r=a.currentTarget.dataset.index;document.querySelector(".edit-item").dataset.index=r,document.querySelector(".edit-item").dataset.id=t.state.productsSuggestions[r]._id,document.querySelector(".edit-item").value=t.state.productsSuggestions[r].title,document.querySelector(".edit-qty").value=1,document.querySelector(".edit-qty").dataset.price=t.state.productsSuggestions[r].price,document.querySelector(".edit-tp").value=t.state.productsSuggestions[r].price,document.querySelector(".edit-tp").dataset.price=t.state.productsSuggestions[r].price,document.querySelector(".s-list").dataset.toggle=!1;document.querySelector(".edit-qty").addEventListener("keypress",(function(e){if(8!=e.which&&isNaN(String.fromCharCode(e.which)))return e.preventDefault(),!1})),document.querySelector(".edit-qty").addEventListener("keydown",(function(e){setTimeout((function(){var e;e=parseFloat(document.querySelector(".edit-qty").value)*parseFloat(document.querySelector(".edit-qty").dataset.price),isNaN(e)&&(e=""),document.querySelector(".edit-tp").value=e}),300)})),document.querySelector(".edit-tp").addEventListener("keypress",(function(e){if(8!=e.which&&46!=e.which&&isNaN(String.fromCharCode(e.which)))return e.preventDefault(),!1})),document.querySelector(".edit-qty").focus(),document.querySelector(".edit-qty").select(),document.querySelector(".item-vars-input").innerHTML=function(t,a){var r="";if(console.log(a.variations),e("undefined"!==a.variations))for(var n in a.variations){var o="";for(var s in"checkbox"==a.variations[n].type&&(o="check"),"radio"==a.variations[n].type&&(o="radio"),r+="        <b>"+__(a.variations[n].title)+("1"==a.variations[n].required?' <span class="tag">'+__("required")+"</span>":"")+'</b>        <div class="kp-'+o+'" >',a.variations[n].data)switch(a.variations[n].data[s].price=y(a.variations[n].data[s].price),o){case"check":r+='                    <label>                        <input type="checkbox" data-required="'+a.variations[n].required+'" data-indexv="'+n+'" data-index="'+s+'" data-title="'+a.variations[n].data[s].title+'" data-titlev="'+__(a.variations[n].title)+'" data-price="'+a.variations[n].data[s].price+'" >                        <div class="checkbox">                            <svg width="20px" height="20px" viewBox="0 0 20 20">                                <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>                                <polyline points="4 11 8 15 16 6"></polyline>                            </svg>                        </div>                        <span>'+__(a.variations[n].data[s].title)+'</span>                        <div class="price">+ '+v(t,a.variations[n].data[s].price)+"</div>                    </label>";break;case"radio":r+='                    <label>                        <input type="radio" data-required="'+a.variations[n].required+'" data-indexv="'+n+'" name="radio'+n+'" data-index="'+s+'" data-title="'+a.variations[n].data[s].title+'" data-titlev="'+__(a.variations[n].title)+'" data-price="'+a.variations[n].data[s].price+'"  />                        <span>'+__(a.variations[n].data[s].title)+'</span>                        <div class="price">+ '+v(t,a.variations[n].data[s].price)+"</div>                    </label>"}r+="</div>"}return r}(t,t.state.productsSuggestions[r])}))}else l(a)})).catch((function(e){console.log(e),l(e)}));else document.querySelector(".s-list").dataset.toggle=!1}}))},tableOrderItemListeners:function(e){u(".edit-item-note",(function(e){e.preventDefault();var t=e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".item-note");console.log(t),t.classList.remove("d-none"),t.focus()})),u(".remove-item",(function(e){e.preventDefault(),e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.remove(),g.refreshTotals()}))},refreshTotals:function(){document.querySelector(".order-total")&&document.querySelector(".order-total").remove(),document.querySelector(".keyx-total")&&document.querySelector(".keyx-total").remove(),document.querySelector(".keyx-tax")&&document.querySelector(".keyx-tax").remove(),document.querySelector(".keyx-totalWithTax")&&document.querySelector(".keyx-totalWithTax").remove();var e,t="",a={total:{title:__("Total"),amount:0},tax:{title:__("Tax"),amount:0},totalWithTax:{title:__("Paid"),amount:0}},n=r(document.querySelectorAll(".item-pricef"));try{for(n.s();!(e=n.n()).done;){var o=e.value,s=.09*y(o.dataset.value);a.total.amount+=y(o.dataset.value),a.tax.amount+=s,a.totalWithTax.amount+=y(o.dataset.value)+s}}catch(e){n.e(e)}finally{n.f()}for(var i in a)t+='\n        <div class="mb-3 mt-3 order-row elipsized keyx-'.concat(i,'">\n            <b>').concat(a[i].title,'</b><div class="order-form ms-2 d-inline-block" data-id="').concat(i,'" data-type="key-number" data-value="').concat(a[i].amount,'">').concat(v(g._this,a[i].amount),"</div>\n        </div>");t='<div class="order-total">'.concat(t,"</div>"),document.querySelector(".modal-body").insertAdjacentHTML("beforeend",t)},addOrderItem:function(e){u(".add-item",(function(t){var a=[],n={};n.id=document.querySelector(".edit-item").dataset.id,n.title=document.querySelector(".edit-item").value,n.priceF=parseFloat(document.querySelector(".edit-tp").value),n.price=parseInt(document.querySelector(".edit-tp").dataset.price),n.qty=parseInt(document.querySelector(".edit-qty").value),n.note="",n.variations=[];var o,s=0,i=r(document.querySelectorAll(".item-vars-input input"));try{for(i.s();!(o=i.n()).done;){var d=o.value,c=s;d.checked&&(n.variations[c]||(n.variations[c]={}),n.variations[c].list||(n.variations[c].list={}),n.variations[c].title||(n.variations[c].title=d.dataset.titlev),n.variations[c].list["_"+d.dataset.index]={title:d.dataset.title,price:parseFloat(d.dataset.price)},n.priceF+=n.qty*parseFloat(d.dataset.price),s+=1)}}catch(e){i.e(e)}finally{i.f()}if(n.title.length<2)alert(__("Incorrect product data"));else{a.push(n);var l=g.structOrderItemTable(e,0,a,!0);document.querySelector(".new-item-row").insertAdjacentHTML("beforebegin",l),g.tableOrderItemListeners(),g.refreshTotals(),document.querySelector(".edit-item").value="",document.querySelector(".edit-tp").value="",document.querySelector(".edit-qty").value="",document.querySelector(".item-vars-input").innerHTML="",setTimeout((function(){document.querySelector(".edit-item").focus()}),300)}}))}},b={state:{firstLoad:!0,firstTouch:!0,modalCont:null,modalOpen:!1,playSoundNow:!1,newOrderCount:0,orderIDs:[],orders:[],settings:{},orderSingle:[],playTitleTimer:null,refreshTimer:null,statuses:[],audio:new Audio("https://kenzap.com/static/swiftly.mp3"),limit:50,slistLimit:10,productsSuggestions:[]},init:function(){b.getData()},getData:function(){b.state.firstLoad&&(()=>{let e=document.querySelector(".loader");e&&(e.style.display="block")})();var e=document.querySelector(".search-input")?document.querySelector(".search-input").value:"",t=document.querySelector("#order-status")?document.querySelector("#order-status").dataset.value:"";fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:c,body:JSON.stringify({query:{user:{type:"authenticate",fields:["avatar"],token:d("kenzap_token")},locale:{type:"locale",source:["extension"],key:"ecommerce"},orders:{type:"find",key:"ecommerce-order",fields:"*",term:""!=t?"status='"+t+"'":"",limit:b.state.limit,search:{field:"from",s:e},sortby:{field:"created",order:"DESC"}},settings:{type:"get",key:"ecommerce-settings",fields:["currency","currency_symb","currency_symb_loc","tax_calc","tax_auto_rate","tax_rate","tax_display"]}}})}).then((function(e){return e.json()})).then((function(e){n(),e.success?((e=>{if(e.header&&localStorage.setItem("header",e.header),!document.querySelector("#k-script")){let e=document.createElement("div");e.innerHTML=localStorage.getItem("header"),e=e.firstChild,document.body.prepend(e),Function(document.querySelector("#k-script").innerHTML).call("test")}e.locale&&window.i18n.init(e.locale)})(e),b.loadPageStructure(),b.renderPage(e),b.initListeners(),b.initFooter(),b.state.firstLoad=!1):l(e)})).catch((function(e){l(e)}))},authUser:function(e){e.user&&e.user.success},loadPageStructure:function(){b.state.firstLoad&&(document.querySelector("#contents").innerHTML=function(e){return'\n      <div class="container ec-orders">\n        <div class="d-md-flex justify-content-between bd-highlight mb-3">\n            <nav class="bc" aria-label="breadcrumb"></nav>\n            <button class="btn btn-primary add-order btn-add mt-3 mb-1 mt-md-0 mb-md-0" type="button">'.concat(e("New order"),'</button>\n        </div>\n        <div class="row">\n          <div class="col-md-12 page-title">\n            <div class="st-opts st-table mb-3 dropdown">\n                <a class="btn btn-outline-secondary dropdown-toggle" href="#" role="button" id="order-status" data-id="status" data-value="" data-bs-toggle="dropdown" aria-expanded="false">\n                ').concat(e("All"),'\n                </a>\n                <ul class="dropdown-menu" aria-labelledby="order-status">\n                  <li><a class="dppi dropdown-item" data-key="" href="#" >').concat(e("All"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="new" href="#" >').concat(e("New"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="paid" href="#" >').concat(e("Paid"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="processing" href="#" >').concat(e("Processing"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="completed" href="#" >').concat(e("Completed"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="canceled" href="#" >').concat(e("Canceled"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="failed" href="#" >').concat(e("Failed"),'</a></li>\n                  <li><a class="dppi dropdown-item" data-key="refunded" href="#" >').concat(e("Refunded"),'</a></li>\n                </ul>\n            </div>\n            <div class="st-opts" >\n              <div class="input-group-sm mb-0 justify-content-start mb-3 mb-sm-0" >\n                <input id="usearch" type="text" class="inp form-control search-input" autocomplete="off" placeholder="').concat(e("Search order"),'">\n              </div>\n              \x3c!-- <a id="viewSum" href="#" style="margin-left:16px;">view summary</a> --\x3e\n            </div>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">\n            <div class="card border-white shadow-sm border-0">\n              <div class="card-body p-0">\n \n                <div class="table-responsive">\n                  <table class="table table-hover table-borderless align-middle table-striped table-p-list mb-0">\n                    <thead>\n                      <tr>\n                        <th><span class="ps-1">').concat(e("From"),'</span></th>\n                        <th class="d-none d-sm-table-cell">').concat(e("Status"),"</th>\n                        <th>").concat(e("Total"),'</th>\n                        <th class="d-none d-sm-table-cell">').concat(e("Time"),'</th>\n                        <th></th>\n                      </tr>\n                    </thead>\n                    <tbody class="list">\n\n                    </tbody>\n                  </table>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="modal order-modal" tabindex="-1">\n        <div class="modal-dialog ">\n          <div class="modal-content">\n              <div class="modal-header">\n                <h5 class="modal-title"></h5>\n                <button type="button" class="btn-close align-self-start-remove" data-bs-dismiss="modal" aria-label="Close"></button>\n              </div>\n              <div class="modal-body">\n              \n              </div>\n              <div class="modal-footer">\n                <button type="button" class="btn btn-primary"></button>\n                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>\n              </div>\n          </div>\n        </div>\n      </div>\n\n    ')}(__))},renderPage:function(e){if(b.state.firstLoad&&((e=>{let t='<ol class="breadcrumb mt-2 mb-0">';for(let a of e)void 0===a.link?t+=`<li class="breadcrumb-item">${a.text}</li>`:t+=`<li class="breadcrumb-item"><a href="${a.link}">${a.text}</a></li>`;t+="</ol>",document.querySelector(".bc").innerHTML=t})([{link:o("https://dashboard.kenzap.cloud"),text:__("Dashboard")},{link:o("/"),text:__("E-commerce")},{text:__("Orders")}]),b.state.statuses={new:{text:__("New"),class:"btn-warning text-dark fw-light"},processing:{text:__("Processing"),class:"btn-primary fw-light"},completed:{text:__("Completed"),class:"btn-success fw-light"},canceled:{text:__("Canceled"),class:"btn-secondary fw-light"},failed:{text:__("Failed"),class:"btn-danger fw-light"}}),b.state.orders=e.orders,b.state.settings=e.settings,0!=e.orders.length){var t=[];b.state.newOrderCount=[];var a="",r=0;for(var n in e.orders){t.push(e.orders[n]._id),void 0===e.orders[n].status&&(e.orders[n].status="new"),"new"==e.orders[n].status&&r++;var s=b.state.orderIDs.includes(e.orders[n]._id)||b.state.firstLoad?"":"new";a+='\n            <tr class="'.concat(s,'">\n              <td class="details">\n                <div class="ps-1 view-order" data-id="').concat(e.orders[n]._id,'" data-index="').concat(n,'">\n                  <b class="">').concat(e.orders[n].from,'</b>\n                  <div class=" elipsized fst-italic">').concat(e.orders[n].note?e.orders[n].note:"",'</div>\n                  <div class=" d-sm-none"> <span class="me-2">').concat(b.getStatus(e.orders[n].status),'</span> <span class="text-muted">').concat(f(e.meta.time,e.orders[n].created),'</span> </div>\n                </div>\n              </td>\n              <td class="d-none d-sm-table-cell">\n                <span class="fs-12">').concat(b.getStatus(e.orders[n].status),'</span>\n              </td>\n              <td>\n                <span style="font-size:18px;">').concat(v(b,e.orders[n].total),'</span>\n              </td>\n              <td class="d-none d-sm-table-cell">\n                <span style="font-size:18px;">').concat(f(e.meta.time,e.orders[n].created),'</span>\n              </td>\n              <td class="last">\n                <a href="#" data-id="').concat(e.orders[n]._id,'" data-index="').concat(n,'" class="view-order text-success d-none me-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n                </svg></a>\n                <a href="#" data-id="').concat(e.orders[n]._id,'" data-index="').concat(n,'" class="remove-order text-danger me-2"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\n                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>\n                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>\n                </svg></a>\n              </td>\n            </tr>')}b.state.playSoundNow=r>0,b.state.orderIDs=t,document.querySelector(".table tbody").innerHTML=a}else document.querySelector(".table tbody").innerHTML='<tr><td colspan="5">'.concat(__("No orders to display."),"</td></tr>")},getStatus:function(e){return'<div class="badge '.concat(b.state.statuses[e].class,'">').concat(b.state.statuses[e].text,"</div>")},playSound:function(){console.log("playSound"),b.state.audio.play()},playTitle:function(e){},initListeners:function(){g.viewOrder(b),u(".remove-order",b.listeners.removeOrder),u(".st-table li a",b.listeners.changeStatus),b.state.firstLoad&&(g.newOrder(b),u(".modal .btn-primary",b.listeners.modalSuccessBtn),m(".search-input",b.listeners.searchOrders),document.body.addEventListener("touchstart",(function(){b.state.firstTouch?(b.state.audio.play(),b.state.audio.pause(),b.state.audio.currentTime=0,b.state.firstTouch=!1):(b.state.playTitleTimer&&clearInterval(b.state.playTitleTimer),b.state.playTitleTimer=setInterval((function(){b.state.playSoundNow&&b.playSound()}),6500))}),!1),window.addEventListener("hashchange",(function(e){if(b.modalCont)return e.preventDefault(),b.modalOpen=!1,b.modalCont.hide(),!1})))},listeners:{newOrder:function(e){},changeStatus:function(e){e.preventDefault();var t=document.querySelector("#order-status");""==e.currentTarget.dataset.key?(t.innerHTML=__("All"),t.dataset.value=""):(t.innerHTML=b.state.statuses[e.currentTarget.dataset.key].text,t.dataset.value=e.currentTarget.dataset.key);Object.keys(b.state.statuses).forEach((function(e){b.state.statuses[e].class.split(" ").forEach((function(e){t.classList.remove(e)}))})),""==e.currentTarget.dataset.key?t.classList.add("btn-primary"):b.state.statuses[e.currentTarget.dataset.key].class.split(" ").forEach((function(e){t.classList.add(e)})),b.getData()},removeOrder:function(e){e.preventDefault(),confirm(__("Completely remove this order?"))&&fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:c,body:JSON.stringify({query:{product:{type:"delete",key:"ecommerce-order",id:e.currentTarget.dataset.id,sid:s()}}})}).then((function(e){return e.json()})).then((function(e){e.success?b.getData():l(e)})).catch((function(e){l(e)}))},searchOrders:function(e){e.preventDefault(),b.getData()},modalSuccessBtn:function(e){b.listeners.modalSuccessBtnFunc(e)},modalSuccessBtnFunc:null},updateOrder:function(e,t){var a=document.querySelector(".modal");if("true"!==a.querySelector(".btn-primary").dataset.loading){a.querySelector(".btn-primary").dataset.loading=!0,a.querySelector(".btn-primary").innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>'+__("Loading..");var n,o={},d=r(document.querySelectorAll(".order-form"));try{for(d.s();!(n=d.n()).done;){var u=n.value;switch(u.dataset.type){case"key":o[u.dataset.id]=u.dataset.value;break;case"key-number":o[u.dataset.id]=y(u.dataset.value);break;case"items":o.items={};var m,v=r(document.querySelectorAll(".order-item-row-active"));try{for(v.s();!(m=v.n()).done;){var f=m.value,h=JSON.parse(f.dataset.vars.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"));o.items[f.dataset.id]={id:f.dataset.id,qty:parseInt(f.querySelector(".item-qty").dataset.value),note:f.querySelector(".item-note").innerHTML,type:"new",index:"0",price:parseFloat(f.querySelector(".item-pricef").dataset.price),sdesc:f.querySelector(".item-title").dataset.sdesc,title:f.querySelector(".item-title").dataset.value,priceF:parseFloat(f.querySelector(".item-pricef").dataset.value),variations:"new"==t?[]:h||[]}}}catch(e){v.e(e)}finally{v.f()}break;case"text":o[u.dataset.id]=u.innerHTML;break;case"email":case"emails":case"select":case"textarea":o[u.id]=u.value;break;case"radio":o[u.id]=u.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector("input:checked").value}}}catch(e){d.e(e)}finally{d.f()}console.log(o),"new"==t?(o.name=o.from,fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:c,body:JSON.stringify({query:{order:{type:"create",key:"ecommerce-order",sid:i(),data:o}}})}).then((function(e){return e.json()})).then((function(e){e.success?(b.modalCont.hide(),p(__("Order created")),b.getData()):l(e)})).catch((function(e){l(e)}))):fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:c,body:JSON.stringify({query:{order:{type:"update",key:"ecommerce-order",sid:s(),id:t,data:o}}})}).then((function(e){return e.json()})).then((function(e){e.success?(b.modalCont.hide(),p(__("Order updated")),b.getData()):l(e)})).catch((function(e){l(e)}))}},initFooter:function(){var e,t;e=__("Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.",'<a class="text-muted" href="https://kenzap.com/" target="_blank">',"</a>",'<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">',"</a>"),t="",document.querySelector("footer .row").innerHTML=`\n    <div class="d-sm-flex justify-content-center justify-content-sm-between">\n        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">${e}</span>\n        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">${t}</span>\n    </div>`}};b.init()}();
