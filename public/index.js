!function(){"use strict";const e=e=>{let t=new URLSearchParams(window.location.search),a=t.get("sid")?t.get("sid"):"",n=-1==e.indexOf("?")?"?sid="+a:"&sid="+a;return e+n},t=()=>{let e=new URLSearchParams(window.location.search);return e.get("sid")?e.get("sid"):""},a=e=>{let t=e+"=",a=decodeURIComponent(document.cookie).split(";");for(let e=0;e<a.length;e++){let n=a[e];for(;" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(t))return n.substring(t.length,n.length)}return""},n={Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+a("kenzap_api_key"),"Kenzap-Locale":a("locale")?a("locale"):"en","Kenzap-Header":localStorage.hasOwnProperty("header")&&localStorage.hasOwnProperty("header-version")?localStorage.getItem("header-version"):0,"Kenzap-Token":a("kenzap_token"),"Kenzap-Sid":t()},l=e=>{if(console.log(e),isNaN(e.code)){let n=e;try{n=JSON.stringify(n)}catch(e){}let l=new URLSearchParams;return l.append("cmd","report"),l.append("sid",t()),l.append("token",a("kenzap_token")),l.append("data",n),fetch("https://api-v1.kenzap.cloud/error/",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded"},body:l}),void alert("Can not connect to Kenzap Cloud")}if(401===e.code){if(-1!=window.location.href.indexOf("localhost"))return void alert(e.reason);location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+window.location.href}else alert(e.reason)};var c={state:{firstLoad:!0,ajaxQueue:0},init:function(){c.getData()},getData:function(){c.state.firstLoad&&(()=>{let e=document.querySelector(".loader");e&&(e.style.display="block")})(),fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:n,body:JSON.stringify({query:{locale:{type:"locale",source:["extension"],key:"ecommerce"}}})}).then((function(e){return e.json()})).then((function(e){(()=>{let e=document.querySelector(".loader");e&&(e.style.display="none")})(),e.success?((e=>{if(e.header&&localStorage.setItem("header",e.header),!document.querySelector("#k-script")){let e=document.createElement("div");e.innerHTML=localStorage.getItem("header"),e=e.firstChild,document.body.prepend(e),Function(document.querySelector("#k-script").innerHTML).call("test")}e.locale&&window.i18n.init(e.locale)})(e),c.loadHomeStructure(),c.renderPage(e),c.initFooter(),c.state.firstLoad=!1):l(e)})).catch((function(e){l(e)}))},renderPage:function(t){(e=>{let t='<ol class="breadcrumb mt-2 mb-0">';for(let a of e)void 0===a.link?t+=`<li class="breadcrumb-item">${a.text}</li>`:t+=`<li class="breadcrumb-item"><a href="${a.link}">${a.text}</a></li>`;t+="</ol>",document.querySelector(".bc").innerHTML=t})([{link:e("https://dashboard.kenzap.cloud"),text:__("Dashboard")},{text:__("E-commerce")}])},initListeners:function(){},listeners:{modalSuccessBtn:function(e){c.listeners.modalSuccessBtnFunc(e)},modalSuccessBtnFunc:null},loadHomeStructure:function(){c.state.firstLoad&&(document.querySelector("#contents").innerHTML=function(t){return'\n        <div class="container p-edit">\n            <div class="d-flex justify-content-between bd-highlight mb-3">\n                <nav class="bc" aria-label="breadcrumb"></nav>\n                \n            </div>\n            <div class="row">\n                <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">\n                    <div class="card border-white shadow-sm p-sm-3 py-3">\n                        <nav class="nav flex-column">\n                            <a class="nav-link active fs-4" aria-current="page" href="'.concat(e("/product-list/"),'">\n                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list-stars me-3" viewBox="0 0 16 16">\n                            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"></path>\n                            <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z"></path>\n                            </svg>').concat(t("Product list"),'</a>\n\n                            <hr>\n                                               \n                            <a class="nav-link fs-4" href="').concat(e("/orders/"),'">\n                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart-check mb-1 me-3" viewBox="0 0 16 16">\n                            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>\n                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n                            </svg>').concat(t("Orders"),'</a>\n\n                            <hr>\n                                                \n                            <a class="nav-link fs-4" href="').concat(e("/settings/"),'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-gear mb-1 me-3" viewBox="0 0 16 16">\n                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"></path>\n                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"></path>\n                            </svg>').concat(t("Settings"),'</a>\n\n                            <hr>\n                                                \n                            <a class="nav-link fs-4 disabled" href="').concat(e("/analytics/"),'" tabindex="-1" aria-disabled="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-graph-up me-3" viewBox="0 0 16 16">\n                            <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"></path>\n                            </svg>').concat(t("Analytics"),"</a>\n                        </nav>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ")}(__))},initFooter:function(){var e,t;e=__("Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.",'<a class="text-muted" href="https://kenzap.com/" target="_blank">',"</a>",'<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">',"</a>"),t="",document.querySelector("footer .row").innerHTML=`\n    <div class="d-sm-flex justify-content-center justify-content-sm-between">\n        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">${e}</span>\n        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">${t}</span>\n    </div>`}};c.init()}();
