!function(){"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function t(t,a){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,a){if(t){if("string"==typeof t)return e(t,a);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,a):void 0}}(t))||a&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var e=n.next();return l=e.done,e},e:function(e){c=!0,i=e},f:function(){try{l||null==n.return||n.return()}finally{if(c)throw i}}}}const a=()=>{let e=document.querySelector(".loader");e&&(e.style.display="block")},n=()=>{let e=document.querySelector(".loader");e&&(e.style.display="none")},r=e=>{let t=new URLSearchParams(window.location.search),a=t.get("sid")?t.get("sid"):"",n=-1==e.indexOf("?")?"?sid="+a:"&sid="+a;return e+n},o=()=>{let e=new URLSearchParams(window.location.search);return e.get("sid")?e.get("sid"):""},i=e=>{let t=e+"=",a=decodeURIComponent(document.cookie).split(";");for(let e=0;e<a.length;e++){let n=a[e];for(;" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(t))return n.substring(t.length,n.length)}return""},l={Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+i("kenzap_api_key"),"Kenzap-Locale":i("locale")?i("locale"):"en","Kenzap-Header":localStorage.hasOwnProperty("header")&&localStorage.hasOwnProperty("header-version")?localStorage.getItem("header-version"):0,"Kenzap-Token":i("kenzap_token"),"Kenzap-Sid":o()},c=e=>{if(console.log(e),isNaN(e.code)){let t=e;try{t=JSON.stringify(t)}catch(e){}let a=new URLSearchParams;return a.append("cmd","report"),a.append("sid",o()),a.append("token",i("kenzap_token")),a.append("data",t),fetch("https://api-v1.kenzap.cloud/error/",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded"},body:a}),void alert("Can not connect to Kenzap Cloud")}if(401===e.code){if(-1!=window.location.href.indexOf("localhost"))return void alert(e.reason);location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+window.location.href}else alert(e.reason)},s=(e,t)=>{if(document.querySelector(e))for(let a of document.querySelectorAll(e))a.removeEventListener("click",t,!0),a.addEventListener("click",t,!0)},d=e=>{let t=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window});e.dispatchEvent(t)};var u=function(){var e=new URLSearchParams(window.location.search);return e.get("id")?e.get("id"):""},p=function(e){if(!e)throw new Error("DOM Element is undifined! Please choose HTML target element.");var t,a,n,r,o,i,l=e;function c(){t.innerHTML="",r.forEach((function(e,a){if(e){var n=document.createElement("li");n.innerHTML="".concat(e," <a>&times;</a>"),n.querySelector("a").addEventListener("click",(function(){var e;e=a,r=r.filter((function(t,a){return a!==e&&t})),c()})),t.appendChild(n)}})),l.setAttribute("data-simple-tags",r.toString())}n=(n=l.getAttribute("data-simple-tags")).split(","),r=n.map((function(e){return e.trim()})),o=document.createElement("ul"),(i=document.createElement("input")).setAttribute("placeholder","new category"),l.appendChild(o),l.appendChild(i),t=l.firstElementChild,a=l.lastElementChild,c(),a.addEventListener("keyup",(function(e){var t=this.value.trim();(t.includes(",")||13===e.keyCode)&&(""!==t.replace(",","")&&r.push(t.replace(",","")),this.value=""),c()}))},m={init:function(){m.getData()},state:{ajaxQueue:0},getData:function(){a();var e=u();o(),fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:l,body:JSON.stringify({query:{user:{type:"authenticate",fields:["avatar"],token:i("kenzap_token")},product:{type:"find",key:"ecommerce-product",id:e,fields:["_id","id","img","status","price","variations","priced","title","sdesc","ldesc","sku","cats","updated"]},locale:{type:"locale",source:["extension"],key:"ecommerce"}}})}).then((function(e){return e.json()})).then((function(e){if(n(),e.success){if(e.success){if((e=>{if(e.header&&localStorage.setItem("header",e.header),!document.querySelector("#k-script")){let e=document.createElement("div");e.innerHTML=localStorage.getItem("header"),e=e.firstChild,document.body.prepend(e),Function(document.querySelector("#k-script").innerHTML).call("test")}e.locale&&window.i18n.init(e.locale)})(e),document.querySelector("#contents").innerHTML=function(e){return'\n  <div class="container p-edit">\n    <div class="d-flex justify-content-between bd-highlight mb-3">\n        <nav class="bc" aria-label="breadcrumb"></nav>\n        \n    </div>\n    <div class="row">\n        <div class="col-lg-9 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">\n            <div class="sections" id="sections" role="tablist" style="width:100%;">\n\n                <div class="row">\n                    <div class="col-12 grid-margin stretch-card">\n                        <div class="card border-white shadow-sm p-sm-3">\n                            <div class="card-body">\n\n                                <div class="landing_status"></div>\n                                <input type="hidden" class="form-control" id="landing-slug" value="">\n\n                                <h4 id="elan" class="card-title mb-4">'.concat(e("Description"),'</h4>\n\n                                <div id="placeholders">\n\n                                    <div class="mb-3">\n                                        <label class="banner-title-l form-label" for="p-title">').concat(e("Title"),'</label>\n                                        <input type="text" class="form-control inp" id="p-title"\n                                            placeholder="').concat(e("Sushi set.."),'">\n                                        <p class="form-text"> </p>\n                                    </div>\n\n                                    <div class="mb-3">\n                                        <label class="banner-descshort-l form-label" for="p-sdesc">').concat(e("Short Description"),'</label>\n                                        <textarea class="form-control inp" id="p-sdesc" placeholder="  " maxlength="120" rows="2"></textarea>\n                                    </div>\n\n                                    <div class="mb-3">\n                                        <label class="banner-descshort-l form-label" for="desc">').concat(e("Images"),'</label>\n                                        <div class="clearfix"></div>\n                                        <div class="ic"></div>\n                                        <div class="clearfix"></div>\n                                    </div>\n\n                                    <div class="mb-3">\n                                        <div class="clearfix"></div>\n                                        <div style="clear:both;margin-top:16px;"></div>\n                                        <label class="banner-descshort-l form-label" for="p-desc">').concat(e("Description"),'</label>\n                                        <textarea class="form-control inp" id="p-ldesc" placeholder=" " maxlength="2000" rows="10"></textarea>\n                                    </div>\n\n                                    <div class="mb-3 mw">\n                                        <div class="list-wrapper">\n                                            <ul class="d-flex flex-column-reverse features"> </ul>\n                                        </div>\n                                        <p class="form-text"> </p>\n                                    </div>\n\n                                    <div class="bg-light price_group mt-3 mb-3 p-4">\n                                        <h4 class="card-title mb-3">').concat(e("Price"),'</h4>\n                                        <div class="price_group_base">\n                                            <div class="mb-3 mw">\n                                                <div class="input-group">\n\n                                                    <div id="p-price-c">\n                                                        <label for="p-price" class="form-label">').concat(e("Price normal"),' <span class="lang"></span></label>\n                                                        <div class="input-group">\n                                                            <span class="input-group-text">$</span>\n                                                            <input id="p-price" type="text" class="form-control inp" placeholder="55.00" autocomplete="off">\n                                                        </div>\n                                                    </div>\n                                                    <div id="p-priced-c">\n                                                        <label for="p-priced" class="form-label">').concat(e("Discounted"),' <span class="lang"></span></label>\n                                                        <input id="p-priced" type="text" class="form-control inp" placeholder="45.00" autocomplete="off">\n                                                    </div>\n\n                                                </div>\n                                                <div class="add-mix-ctn"><a class="add-mix-block" href="#" data-action="add">').concat(e("+ add variation"),'</a></div>\n                                            </div>\n\n                                            <div class="variation-blocks">\n\n                                            </div>\n\n                                            <div style=\'margin:24px 0 48px;border-bottom:0px solid #ccc;\'></div>\n\n                                            <div class="mb-3 mw">\n                                                <h4 id="elan" class="card-title">').concat(e("Inventory"),'</h4>\n                                                <label for="p-sku" class="form-label"> <span class="lang"></span></label>\n                                                <div class="input-group">\n                                                    <input id="p-sku" type="text" style="width:100%;" class="form-control inp" placeholder="" maxlength="200">\n                                                    <p class="form-text">\n                                                        ').concat(e("Product stock unit identification number"),' \n                                                    </p>\n                                                </div>\n                                            </div>\n\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class="desc-repeater-cont">\n\n                                </div>\n\n                                <p class="form-text"> &nbsp;</p>\n\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n\n            </div>\n        </div>\n        <div class="col-lg-3 grid-margin grid-margin-lg-0 grid-margin-md-0">\n\n            <div class="row">\n                <div class="col-12 grid-margin stretch-card">\n                    <div class="card border-white shadow-sm p-sm-3">\n                        <div class="card-body">\n\n                            <h4 class="card-title" style="display:none;">').concat(e("General"),'</h4>\n                            <div class="landing_status"></div>\n                            <input type="hidden" class="form-control" id="landing-slug" value="">\n\n                            <h4 id="elan" class="card-title mb-4">Status</h4>\n                            <div id="status-cont" class="mb-3">\n\n                                <div class="col-sm-12">\n                                    <div class="form-check">\n                                        <label class="form-check-label status-publish form-label">\n                                            <input type="radio" class="form-check-input" name="p-status"\n                                                id="p-status1" value="1">\n                                                ').concat(e("Published"),'\n                                        </label>\n                                    </div>\n                                </div>\n\n                                <div class="col-sm-12">\n                                    <div class="form-check">\n                                        <label class="form-check-label status-draft form-label">\n                                            <input type="radio" class="form-check-input" name="p-status"  id="p-status0" value="0">\n                                            ').concat(e("Draft"),'\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <h4 id="elan" class="card-title mb-4">Categories</h4>\n                            <div id="p-cats" class="simple-tags mb-4" data-simple-tags=""></div>\n                            <div class="clearfix"> </div>\n\n                            <div class="d-grid gap-2">\n                                <button class="btn btn-primary btn-save" type="button">').concat(e("Save"),'</button>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n  </div>\n\n  <div class="modal p-modal" tabindex="-1">\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n                <h5 class="modal-title"></h5>\n                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n            </div>\n            <div class="modal-body">\n\n            </div>\n            <div class="modal-footer">\n                <button type="button" class="btn btn-primary btn-modal"></button>\n                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>\n            </div>\n        </div>\n    </div>\n  </div>\n\n  <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">\n    <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive"\n        aria-atomic="true" data-bs-delay="3000">\n        <div class="d-flex">\n            <div class="toast-body"></div>\n            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>\n        </div>\n    </div>\n  </div>\n  ')}(__),0==e.product.length)return void m.initListeners("all");m.renderPage(e.product),m.loadImages(e.product),m.initListeners("all")}}else c(e)})).catch((function(e){c(e)}))},renderPage:function(e){var t=document;for(var a in(e=>{let t='<ol class="breadcrumb mt-2 mb-0">';for(let a of e)void 0===a.link?t+=`<li class="breadcrumb-item">${a.text}</li>`:t+=`<li class="breadcrumb-item"><a href="${a.link}">${a.text}</a></li>`;t+="</ol>",document.querySelector(".bc").innerHTML=t})([{link:r("https://dashboard.kenzap.cloud"),text:__("Dashboard")},{link:r("/"),text:__("E-commerce")},{link:r("/product-list/"),text:__("Product List")},{text:__("Product Edit")}]),t.querySelector("#p-title").value=e.title,t.querySelector("#p-sdesc").value=e.sdesc,t.querySelector("#p-ldesc").value=e.ldesc,t.querySelector("#p-price").value=e.price,t.querySelector("#p-priced").value=e.priced,e.variations){var n=e.variations[a],o=[];for(var i in o.title=n.title,o.type=n.type,o.required=n.required,o.index=a,t.querySelector(".variation-blocks").innerHTML+=m.structMixBlock(o),n.data){var l=n.data[i],c=[];c.title=l.title,c.price=l.price,c.type=n.type,t.querySelector(".var-block[data-index='"+a+"'] .offer-pricef").innerHTML+=m.structMixRow(c)}}document.querySelector("#p-status"+e.status).checked=!0;var s=document.querySelector("#p-cats");e.cats&&s.setAttribute("data-simple-tags",e.cats),new p(s)},initListeners:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"partial";console.log("initListeners "),"all"==e&&(s(".btn-save",m.listeners.saveProduct),s(".p-modal .btn-primary",m.listeners.modalSuccessBtn)),s(".add-mix-block",m.listeners.addMixBlock),s(".edit-block",m.listeners.editBlock),s(".remove-block",m.listeners.removeBlock),s(".add-mix",m.listeners.addMixOption),s(".remove-option",m.listeners.removeOption)},listeners:{editBlock:function(e){e.preventDefault();var t=document.querySelector(".add-mix-block");t.dataset.action="edit",t.dataset.index=e.currentTarget.dataset.index,setTimeout((function(){return d(t)}),10),console.log("editBlock")},removeBlock:function(e){e.preventDefault(),confirm(__("Remove entire block?"))&&e.currentTarget.parentNode.parentNode.remove(),console.log("removeBlock")},addMixBlock:function(e){e.preventDefault();var t=e.currentTarget.dataset.action,a=e.currentTarget.dataset.index;e.currentTarget.dataset.action="add",console.log("index: "+a);var n=__("Add Variation Block"),r="",o="",i=0,l=__("Add"),c=__("Cancel");"edit"==t&&(n=__("Edit Variation Block"),r=document.querySelector(".var-block[data-index='"+a+"']").dataset.title,o=document.querySelector(".var-block[data-index='"+a+"']").dataset.type,i=parseInt(document.querySelector(".var-block[data-index='"+a+"']").dataset.required),l=__("Save"));var s=document.querySelector(".p-modal"),d=new bootstrap.Modal(s);s.querySelector(".modal-title").innerHTML=n,s.querySelector(".btn-primary").innerHTML=l,s.querySelector(".btn-secondary").innerHTML=c,d.show();var u='            <div class="form-cont">                <div class="form-group mb-3">                    <label for="mtitle" class="form-label">'.concat(__("Save"),'</label>                    <input type="text" class="form-control" id="mtitle" autocomplete="off" placeholder="Rice type" value="').concat(r,'">                </div>                <div class="form-group mb-3">                    <label for="mtype" class="form-label">').concat(__("Input type"),'</label>                    <select id="mtype" class="form-control " >                        <option ').concat("radio"==o?'selected="selected"':"",' value="radio">').concat(__("Radio buttons"),"</option>                        <option ").concat("checkbox"==o?'selected="selected"':"",' value="checkbox">').concat(__("Checkboxes"),'</option>                    </select>                    <p class="card-description">').concat(__("Define how this renders on frontend."),'</p>                </div>                <div class="form-group mb-3">                    <div class="form-check">                        <label for="id="mtype"" class="form-check-label form-label">                            <input id="mrequired" type="checkbox" class="form-check-input" ').concat(1==i?'checked="checked"':"",' value="1">                            ').concat(__("Required"),'                        </label>                    </div>                    <p class="card-description">').concat(__("Make this variation mandatory for users."),'</p>                </div>                <div class="form-group mb-3 dn">                    <label for="mtype" class="form-label">').concat(__("Minimum required"),'</label>                    <select id="mtype" class="form-control " >                        <option value="1">1</option>                        <option value="2">2</option>                    </select>                </div>            </div>');s.querySelector(".modal-body").innerHTML=u,m.listeners.modalSuccessBtnFunc=function(e){e.preventDefault();var n=s.querySelector(".p-modal #mtitle").value,r=s.querySelector(".p-modal #mtype").value,o=s.querySelector(".p-modal #mrequired:checked");if(o=null==o?0:"1"==o.value?1:0,n.length<2)alert(__("Please provide longer title"));else{var i=[];i.title=n,i.type=r,i.required=o,i.index=document.querySelectorAll(".var-block").length,"edit"==t&&(document.querySelector(".var-block[data-index='"+a+"']").dataset.title=n,document.querySelector(".var-block[data-index='"+a+"']").dataset.type=r,document.querySelector(".var-block[data-index='"+a+"']").dataset.required=o,document.querySelector(".var-block[data-index='"+a+"'] .title").innerHTML=n),"add"==t&&(null==document.querySelector(".variation-blocks .var-block")?document.querySelector(".variation-blocks").innerHTML=m.structMixBlock(i):document.querySelector(".variation-blocks .var-block:last-of-type").insertAdjacentHTML("afterend",m.structMixBlock(i))),d.hide(),setTimeout((function(){return m.initListeners("partial")}),10)}},console.log("addMixBlock")},addMixOption:function(e){var t=e.currentTarget;e.preventDefault();var a=document.querySelector(".p-modal"),n=new bootstrap.Modal(a);n.show(),a.querySelector(".modal-title").innerHTML=__("Add Variation"),a.querySelector(".btn-primary").innerHTML=__("Add"),a.querySelector(".btn-secondary").innerHTML=__("Cancel");var r='            <div class="form-cont">                <div class="form-group">                    <label for="mtitle" class="form-label">'.concat(__("Title"),'</label>                    <input type="text" class="form-control" id="mtitle" autocomplete="off" placeholder="').concat(__("Brown rice"),'">                </div>                <div class="form-group">                    <label for="mprice" class="form-label">').concat(__("Price"),'</label>                    <div class="input-group mb-3">\n                        <span class="input-group-text">$</span>\n                        <input id="mprice" type="text" class="form-control" placeholder="0.00" value="" >                        <p class="card-description">').concat(__("You can change default currency under Dashboard &gt; Settings."),"</p>                    </div>                </div>            </div>");a.querySelector(".modal-body").innerHTML=r,m.listeners.modalSuccessBtnFunc=function(e){e.preventDefault();var r=a.querySelector(".p-modal #mtitle").value,o=a.querySelector(".p-modal #mprice").value;if(r.length<2)alert("Please provide longer title");else{var i=[];i.title=r,i.price=o,i.type=t.parentElement.parentElement.dataset.type;var l=".var-block[data-index='"+t.parentElement.parentElement.dataset.index+"']";console.log(l),null==document.querySelector(l+" .offer-pricef li")?document.querySelector(l+" .offer-pricef").innerHTML=m.structMixRow(i):document.querySelector(l+" .offer-pricef li:last-of-type").insertAdjacentHTML("afterend",m.structMixRow(i)),n.hide(),setTimeout((function(){return m.initListeners("partial")}),10)}}},removeOption:function(e){e.preventDefault(),confirm("Remove option?")&&e.currentTarget.parentElement.remove(),console.log("removeOption")},saveProduct:function(e){e.preventDefault();var n,r={},i=t(document.querySelectorAll(".inp"));try{for(i.s();!(n=i.n()).done;){var s=n.value;r[s.id.replace("p-","")]=s.value}}catch(e){i.e(e)}finally{i.f()}r.cats=[];var d,p=t(document.querySelectorAll("#p-cats ul li"));try{for(p.s();!(d=p.n()).done;){var v=d.value;r.cats.push(v.innerHTML.replace("<a>×</a>","").trim())}}catch(e){p.e(e)}finally{p.f()}r.img=[];var f,b=t(document.querySelectorAll(".p-img"));try{for(b.s();!(f=b.n()).done;){var h=!f.value.getAttribute("src").includes("placeholder");r.img.push(h)}}catch(e){b.e(e)}finally{b.f()}r.status=document.querySelector('input[name="p-status"]:checked').value,r.variations=[];var g,y=0,x=t(document.querySelectorAll(".variation-blocks .var-block"));try{for(x.s();!(g=x.n()).done;){var k,S=g.value,w=0,q=t(S.querySelectorAll(".offer-pricef li"));try{for(q.s();!(k=q.n()).done;){var _=k.value;void 0===r.variations[y]&&(r.variations[y]={title:S.getAttribute("data-title"),type:S.getAttribute("data-type"),required:S.getAttribute("data-required"),data:[]}),r.variations[y].data[w]={title:_.getAttribute("data-title"),price:_.getAttribute("data-price"),cond:_.getAttribute("data-cond")},w++}}catch(e){q.e(e)}finally{q.f()}y++}}catch(e){x.e(e)}finally{x.f()}console.log(r);var M=u(),L=o();a(),fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:l,body:JSON.stringify({query:{product:{type:"update",key:"ecommerce-product",id:M,sid:L,data:r}}})}).then((function(e){return e.json()})).then((function(e){e.success?m.uploadImages():c(e),console.log("Success:",e)})).catch((function(e){c(e)}))},openImage:function(e){e.preventDefault(),d(document.querySelector(".aif-"+e.currentTarget.dataset.index))},previewImage:function(e){e.preventDefault();var t=e.currentTarget,a=new bootstrap.Toast(document.querySelector(".p-toast"));if(t.files&&t.files[0]){if("image/jpeg"!=t.files[0].type&&"image/jpg"!=t.files[0].type&&"image/png"!=t.files[0].type)return document.querySelector(".p-toast .toast-body").innerHTML=__("Please provide image in JPEG format"),void a.show();if(t.files[0].size>5e6)return document.querySelector(".p-toast .toast-body").innerHTML=__("Please provide image less than 5 MB in size!"),void a.show();var n=t.dataset.index,r=new FileReader;r.onload=function(e){console.log("target "+e.currentTarget.result),document.querySelector(".images-"+n).setAttribute("src",e.currentTarget.result)},r.readAsDataURL(t.files[0]),e.currentTarget.parentElement.querySelector(".remove").classList.remove("hd")}},removeImage:function(e){var t=e.currentTarget.parentElement.dataset.index;document.querySelector(".aif-"+t).value="",document.querySelector(".images-"+t).setAttribute("src","https://account.kenzap.com/images/placeholder.jpg"),e.currentTarget.classList.add("hd")},modalSuccessBtn:function(e){console.log("calling modalSuccessBtnFunc"),m.listeners.modalSuccessBtnFunc(e)},modalSuccessBtnFunc:null},structMixBlock:function(e){return'        <div class="mb-4 var-block mw" data-title="'+e.title+'" data-type="'+e.type+'" data-required="'+e.required+'" data-index="'+e.index+'" >            <label for="offer-pricef" class="form-label pb-2"><span class="title">'+e.title+'</span>                &nbsp;&nbsp;                <svg class="bi bi-pencil-fill edit-block ms-4" title="edit block" data-index="'+e.index+'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>                </svg>                <svg class="bi bi-trash remove-block ms-4" title="edit block" data-index="'+e.index+'"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" viewBox="0 0 16 16">                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>                </svg>            </label>            <div class="list-wrapper">                <ul class="d-flex flex-column-reverse offer-pricef" >                                </ul>            </div>            <p class="card-description"><a class="add-mix" href="#">'+__("+ add option")+"</a> "+__(", differentiate price and product options.")+'</p>            <div class="add-mix-ctn d-none"><a class="add-mix" href="#">'+__("+ add option")+"</a></div>        </div>        "},structMixRow:function(e){return'        <li data-title="'+e.title+'" data-price="'+e.price+'" data-cond="" class="pt-2 pb-2"><div class="form-check"><label class="form-check-label form-label"><input class="'+e.type+' form-check-input" type="'+e.type+'" checked="" data-ft="'+e.title+'">'+e.title+" &nbsp;&nbsp;&nbsp; "+(t=e.price,a=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),void 0!==t&&""!=t||(t=0),t=parseFloat(t),a.format(t)+'</label></div>            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" class="remove-option bi bi-x-circle" viewBox="0 0 16 16">                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>            </svg>        </li>');var t,a},loadImages:function(e){for(var t=document,a=u(),n=o(),r="",i=0;i<5;i++){var l=void 0!==e.img&&"true"==e.img[i]?"https://preview.kenzap.cloud/S"+o()+"/_site/images/product-"+e.id+"-"+(i+1)+"-100x100.jpeg?"+e.updated:"https://account.kenzap.com/images/placeholder.jpg";r+='          <div class="p-img-cont float-start">            <p data-index="'.concat(i,'">              <img class="p-img images-').concat(i,'" data-index="').concat(i,'" width="100" height="100" src="').concat(l,'" />              <span class="remove hd" title="').concat(__("Remove"),'">×</span>            </p>            <input type="file" name="img[]" data-type="search" data-index="').concat(i,'" class="file aif-').concat(i,' d-none">          </div>')}t.querySelector(".ic").innerHTML=r,s(".p-img-cont img",m.listeners.openImage),s(".p-img-cont .remove",m.listeners.removeImage),((e,t)=>{if(document.querySelector(e))for(let a of document.querySelectorAll(e))a.removeEventListener("change",t,!0),a.addEventListener("change",t,!0)})(".p-img-cont .file",m.listeners.previewImage);for(var c=0;c<5;c++){var d=CDN+"/S"+n+"/product-"+a+"-"+(parseInt(c)+1)+"-250.jpeg?"+e.updated;setTimeout((function(a,n,r){var o=!0;if(void 0!==e.img&&(e.img[r]||(o=!1)),o){var i=new Image;i.onload=function(){t.querySelector(n+r).setAttribute("src",a),t.querySelector(n+r).parentElement.querySelector(".remove").classList.remove("hd")},i.src=a}}),300,d,".images-",c)}},uploadImages:function(){document.querySelector(".imgupnote")&&document.querySelector(".imgupnote").remove();var e,a=0,r=t(document.querySelectorAll(".file"));try{for(r.s();!(e=r.n()).done;){var l=e.value;a+=1;var c=u(),s=o(),d=l.files[0];if(void 0!==d){var p=new FormData;p.append("id",c),p.append("sid",s),p.append("pid",c),p.append("key","image"),p.append("sizes","1000|500|250|100x100"),p.append("file",d),p.append("slug","product-"+c+"-"+a),p.append("token",i("kenzap_token")),d.value="",m.state.ajaxQueue+=1,fetch("https://api-v1.kenzap.cloud/upload/",{body:p,method:"post"}).then((function(e){return e.json()})).then((function(e){if(m.state.ajaxQueue-=1,e.success&&0==m.state.ajaxQueue){var t=new bootstrap.Toast(document.querySelector(".toast"));document.querySelector(".toast .toast-body").innerHTML=__("Order updated"),t.show(),n()}}))}}}catch(e){r.e(e)}finally{r.f()}if(0==m.state.ajaxQueue){var v=new bootstrap.Toast(document.querySelector(".toast"));document.querySelector(".toast .toast-body").innerHTML=__("Order updated"),v.show(),n()}}};m.init()}();
