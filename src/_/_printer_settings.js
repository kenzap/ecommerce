import { onClick, __attr, __html, html, toast, onChange, headers, spaceID } from '@kenzap/k-cloud';
import { printReceipt } from "../_/_print.js"

export const printerSettings = {

  _this: null,
  templateDefault : {
    'auto_print': [],
    'user_print': [],
    'template': '',
    'type': 'receipt',
    'user': ''
  },

  init: (_this) => {

    printerSettings._this = _this;
    printerSettings.renderSettings(_this);
  },

  renderSettings: (_this) => {

    let printers = [];
    if(_this.state.response.settings.printers) printers = _this.state.response.settings.printers;

    // render printers
    if(Array.isArray(printers)){

        // pricing row parent
        printers.forEach((printer, i) => {

          document.querySelector('.printer-table tbody').insertAdjacentHTML("beforeend", printerSettings.structPrinterRow(printer, i));
        });

    }else{

      printers = [];
      document.querySelector('#printers').value = '[]';
    }

    // cache printers
    document.querySelector('#printers').value = JSON.stringify(printers);

    // set templates
    printerSettings.renderTemplatesSettings(_this);

    // init listeners
    printerSettings.initListeners(_this);
  },

  renderTemplatesSettings: (_this) => {

    if(!_this.state.response.settings['templates']) _this.state.response.settings['templates'] = [];
    if(_this.state.response.settings['templates'].length == 0) _this.state.response.settings['templates'].push(printerSettings.templateDefault);

    // render templates
    let html = '';
    _this.state.response.settings['templates'].forEach((template, i) => { html += printerSettings.structPrintTemplateItem(_this, i+1, true); });
    document.querySelector('#templates-list').innerHTML = html;

    // temlate listeners
    printerSettings.templateListeners(_this);
  },

  initListeners: (_this) => {

    let printers = document.querySelector('#printers').value;

    if(printers){ printers = JSON.parse(printers); }else{ printers = []; }

    // new template listener
    onClick(".btn-template-new", e => {

      _this.state.response.settings["templates"].push(printerSettings.templateDefault);

      document.querySelector('#templates-list').insertAdjacentHTML("beforeend", printerSettings.structPrintTemplateItem(_this, _this.state.response.settings["templates"].length, true));

      // temlate listener
      printerSettings.templateListeners(_this);
    });
    
    // printer type select listener
    onClick(".printer-type .dropdown-item", e => { printerSettings.modelSelect(e); });
    
    // printer paper type select listener
    onClick(".printer-paper-type .dropdown-item", e => { printerSettings.paperSelect(e); });

    // remove printer listener
    onClick('.remove-printer', printerSettings.removePrinter);

    // printer add listener
    onClick(".add-printer", e => {

        e.preventDefault();

        let obj = {}

        obj.idd = document.querySelector('.printer-idd').value;
        obj.type = document.querySelector('.printer-type button').dataset.value; 
        obj.paper = document.querySelector('.printer-paper-type button').dataset.value; 
        obj.ip = document.querySelector('.printer-ip').value; 

        if(obj.idd.length < 1 || obj.type.length < 1){ alert( __("Fill in all fields first!") ); return false; }

        document.querySelector('.printer-idd').value = '';
        document.querySelector('.printer-type button').dataset.value = '';
        document.querySelector('.printer-ip').value = '';

        let printers = document.querySelector('#printers').value;

        console.log(printers);

        if(printers){ printers = JSON.parse(printers); }else{ printers = []; }
        if(Array.isArray(printers)){ printers.push(obj); }else{ printers = []; }
        document.querySelector('#printers').value = JSON.stringify(printers);
        document.querySelector('.printer-table tbody').insertAdjacentHTML("beforeend", printerSettings.structPrinterRow(obj, printers.length-1));

        // remove printer listener
        onClick('.remove-printer', printerSettings.removePrinter);

        // refresh templates
        printerSettings.renderTemplatesSettings(_this);

    });
  },

  templateListeners: (_this) => {

    onClick('.remove-template', printerSettings.removeTemplateRow);

    onChange('.template_auto_print_action', e => {

      // console.log('change' + e.currentTarget.value);
      if(e.currentTarget.value == '') e.currentTarget.parentElement.querySelector('.template_auto_print').classList.add('d-none');
      if(e.currentTarget.value != '') e.currentTarget.parentElement.querySelector('.template_auto_print').classList.remove('d-none');
    });

    onClick('.test-template', e => {
      
      // get all printers
      let printers = document.querySelector('#printers').value;
      if(printers){ printers = JSON.parse(printers); }else{ printers = []; }

      // selected printer index
      let pi = parseInt(e.currentTarget.dataset.index);

      // confirm user
      if(!confirm( __("Send this template to %1$ printer %2$?", printers[pi].type, (pi+1)+"-"+printers[pi].idd) )) return;

      let template = {};

      template['template'] = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.template').value;
      template['type'] = "receipt";
      template['user'] = "";
      template['user_print'] = [];
      printers[pi].index = pi+1;
      template['user_print'].push(printers[pi]);

      console.log(template);

      // send print request
      printReceipt(_this, "test", "user", template);
    });
  },

  saveFile: (blob, filename) => {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const a = document.createElement('a');
      document.body.appendChild(a);
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0)
    }
  },

  removeTemplateRow: (e) => {

    console.log(e.currentTarget.dataset.index);

    if(confirm(__('Remove this template?'))) document.querySelector('.templates-list .accordion-item[data-index="'+e.currentTarget.dataset.index+'"]').remove();
  },

  modelSelect: (e) => {

    e.preventDefault();

    document.querySelector(".printer-type button").innerHTML = e.currentTarget.innerHTML;
    document.querySelector(".printer-type button").dataset.value = e.currentTarget.dataset.value;

    if(e.currentTarget.dataset.value=="ethernet"){

      document.querySelector('.printer-ip-th').classList.remove("d-none");
      document.querySelector('.printer-ip-td').classList.remove("d-none");
      // document.querySelector('.printer-ip-td2').classList.remove("d-none");
    }

    if(e.currentTarget.dataset.value=="bluetooth" || e.currentTarget.dataset.value=="usb"){

      document.querySelector('.printer-ip-th').classList.add("d-none");
      document.querySelector('.printer-ip-td').classList.add("d-none");
      // document.querySelector('.printer-ip-td2').classList.add("d-none");
    }
  },

  paperSelect: (e) => {

    e.preventDefault();

    document.querySelector(".printer-paper-type button").innerHTML = e.currentTarget.innerHTML;
    document.querySelector(".printer-paper-type button").dataset.value = e.currentTarget.dataset.value;
  },

  removePrinter: (e) => {

      e.preventDefault();

      let c = confirm( __('Remove this record?') );

      if(!c) return;

      let i = e.currentTarget.dataset.i;

      let printers = JSON.parse(document.querySelector('#printers').value);

      printers.splice(i, 1);

      document.querySelector('#printers').value = JSON.stringify(printers);

      e.currentTarget.parentElement.parentElement.remove();

      // console.log(document.querySelector('#printers').value);

      printerSettings.renderTemplatesSettings(printerSettings._this);
  },

  save: (_this, data) => {

    data['templates'] = [];
    if(document.querySelector(".templates-list .accordion-item")) for(let tl of document.querySelectorAll(".templates-list .accordion-item")){

        let obj = {};

        obj['template'] = tl.querySelector('.template').value;
        obj['type'] = tl.querySelector('.template_type').value;
        obj['user'] = tl.querySelector('.template_user').value;
        obj['user_print'] = [];
        obj['auto_print_action'] = tl.querySelector('.template_auto_print_action').value;
        obj['auto_print'] = [];

        if(tl.querySelector('input.template_auto_print:checked')) for(let tap of tl.querySelectorAll("input.template_auto_print:checked")){

            obj['auto_print'].push({ index: tap.dataset.index, idd: tap.dataset.idd, type: tap.dataset.type, ip: tap.dataset.ip, paper: tap.dataset.paper });
        }

        if(tl.querySelector('input.template_user_print:checked')) for(let uap of tl.querySelectorAll("input.template_user_print:checked")){

            obj['user_print'].push({ index: uap.dataset.index, idd: uap.dataset.idd, type: uap.dataset.type, ip: uap.dataset.ip, paper: uap.dataset.paper });
        }

        data['templates'].push(obj);
    }

    return data;
  },

  structPrinterRow: (obj, i) => {

      return `
      <tr class="printer-row form-text" >
          <td class="tp">
              <div class="me-1 me-sm-3 my-1 ">
              ${ i+1 }-${ obj.idd }
              </div>
          </td>
          <td>
              <div class="me-1 me-sm-3 my-1">
                ${ obj.type == "bluetooth" ? '<img style="height:20px" src="/assets/img/bluetooth.webp" >' : '' } 
                ${ obj.type == "ethernet" ? '<img style="height:20px" src="/assets/img/ethernet.png" >' : '' } 
                ${ obj.type == "usb" ? '<img style="height:20px" src="/assets/img/usb.png" >' : '' } 
                ${ obj.type }
              </div>
          </td>
          <td>
              <div class="me-1 me-sm-3 my-1">
                ${ obj.paper == "58" || !obj.paper ? __html('58mm') : '' } 
                ${ obj.paper == "80" ? __html('80mm') : '' }
              </div>
          </td>
          <td class="">
              <div class="me-1 me-sm-3 my-1">
                  ${ obj.ip }
              </div>
          </td>
          <td class="align-middle text-center pt-2"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" class="remove-printer bi bi-x-circle po" data-i="${ i }" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
              </svg>
          </td>
      </tr>`;

  },

  structPrintTemplateItem: (_this, i, show = false) => {

    let template = _this.state.response.settings["templates"][i-1];

    let printers = document.querySelector('#printers').value;
    if(printers){ printers = JSON.parse(printers); }else{ printers = []; }
    // document.querySelector('#printers').value = JSON.stringify(printers);


    // render printers html
    let auto_printers  = ''; printers.forEach((printer, ip) => {

      let checked = "";
      if(!template['auto_print']) template['auto_print'] = [];
      template['auto_print'].filter(ap => { if(ap.idd == printer.idd && ap.index == (ip+1) ){ checked = "checked"; } })

      auto_printers += `
        <div class="form-check">
          <input id="auto_print${ ip+1 }" class="form-check-input template_auto_print" name="auto_print" type="checkbox" value="1" data-index="${ ip+1 }" data-idd="${ printer.idd }" data-type="${ printer.type }" data-ip="${ printer.ip }" data-paper="${ printer.paper }" data-value="" data-type="checkbox" ${checked}>
          <label class="form-check-label" for="auto_print${ ip+1 }">
            ${ ip+1 }-${ printer.idd } 

            ${ printer.type == "bluetooth" ? '<img style="height:20px" src="/assets/img/bluetooth.webp" >' : '' } 
            ${ printer.type == "ethernet" ? '<img style="height:20px" src="/assets/img/ethernet.png" >' : '' } 
            ${ printer.type == "usb" ? '<img style="height:20px" src="/assets/img/usb.png" >' : '' } 

          </label>
        </div>
      `;
    });

    // render users
    let users  = ''; _this.state.response.users.forEach((user, iu) => {

      users += `<option value="${user.id}" ${ template.user == user.id ? "selected" : "" }>${user.name}</option>`;
    });

    // render printers html
    let user_printers  = ''; printers.forEach((printer, ip) => {

      let checked = "";
      if(!template['user_print']) template['user_print'] = [];
      template['user_print'].filter(ap => { if(ap.idd == printer.idd && ap.index == (ip+1) ){ checked = "checked"; } })

      user_printers += `
        <div class="form-check clearfix">
          <input id="user_print${ ip+1 }" class="form-check-input template_user_print" name="user_print" type="checkbox" value="1" data-index="${ ip+1 }" data-idd="${ printer.idd }" data-type="${ printer.type }" data-ip="${ printer.ip }" data-paper="${ printer.paper }" data-value="" data-type="checkbox" ${checked}>
          <label class="form-check-label" for="user_print${ ip+1 }">
            ${ ip+1 }-${ printer.idd }

            ${ printer.type == "bluetooth" ? '<img style="height:20px" src="/assets/img/bluetooth.webp" >' : '' } 
            ${ printer.type == "ethernet" ? '<img style="height:20px" src="/assets/img/ethernet.png" >' : '' } 
            ${ printer.type == "usb" ? '<img style="height:20px" src="/assets/img/usb.png" >' : '' } 

          </label>
          <div class="d-inline   me-1" style="float:right;" title="${ __attr("click for test print") }">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-printer test-template ms-2 po text-primary" viewBox="0 0 16 16" data-index="${(ip)}">
                    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"></path>
                    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"></path>
            </svg>
          </div>
        </div>
      `;
    });

    return `
    <div class="accordion-item border-0 mb-3" data-index="${i-1}" >
      <h2 class="accordion-header" id="flush-heading-${i}">
        <button class="accordion-button ${ (i == 1 || show) ? "":"collapsed" }" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${i}" aria-expanded="${ (i || show) == 1 ? "true":"false" }" aria-controls="flush-collapse-${i}">
          ${ __html("Template #%1$", i) }
        </button>
      </h2>
      <div id="flush-collapse-${i}" class="accordion-collapse collapse ${ (i == 1 || show) ? "show":"" } mt-3" aria-labelledby="flush-heading-${i}" data-bs-parent="#templates-list">
        <div class="accordion-body">
        
          <div class="row inp-list">

            <div class="col-lg-6 ">
              <div class="form-group row mb-3 mt-1">
                <div class="col-sm-12" >
                  <textarea class="form-control template inp" name="template" rows="20" data-type="text" style="font-size:13px;font-family: monospace;">${ template.template }</textarea>
                  <p class="form-text">${__html('Template code.')}</p>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="form-group row mb-3 mt-1 ">
                <label class="col-sm-3 col-form-label">${__html('Template type')}</label>
                <div class="col-sm-9">
                  <select class="form-select template_type" name="template_type" data-type="select">
                    <option value="receipt" ${ template.type == "receipt" ? "selected" : "" }>${__html('Receipt')}</option>
                    <option value="invoice" ${ template.type == "invoice" ? "selected" : "" }>${__html('Invoice')}</option>
                    <option value="qr" ${ template.type == "qr" ? "selected" : "" }>${__html('QR-code')}</option>
                  </select>
                  <p class="form-text">${__html('QR-code receipt type adds extra button to the orders page.')}</p>
                </div> 
              </div>
              <div class="form-group row mb-3 mt-1 ">
                <label class="col-sm-3 col-form-label">${__html('Default for')}</label>
                <div class="col-sm-9">
                  <select class="form-select template_user mb-2 mt-1" name="template_user" data-type="select">
                    <option value="">${__html('All users')}</option>
                    ${ users }
                  </select>
                  <div class="template_user_print">
                    ${ user_printers }
                  </div>
                  <p class="form-text">${__html('Assign this receipt to one of the selected users and printers.')}</p>
                </div> 
              </div>
              <div class="form-group row mb-3 mt-1 ">
                <label class="col-sm-3 col-form-label">${__html('Auto print')}</label>
                <div class="col-sm-9" >
                  <select class="form-select template_auto_print_action mb-2 mt-1" name="template_auto_print_action" data-type="select">
                    <option value="">${__html('Never')}</option>
                    <option value="new" ${ template.auto_print_action == "new" ? "selected" : "" }>${__html('New order')}</option>
                    <option value="completed" ${ template.auto_print_action == "completed" ? "selected" : "" }>${__html('Completed order')}</option>
                    <option value="canceled" ${ template.auto_print_action == "canceled" ? "selected" : "" }>${__html('Canceled order')}</option>
                    <option value="failed" ${ template.auto_print_action == "failed" ? "selected" : "" }>${__html('Failed order')}</option>
                  </select>
                  <div class="template_auto_print ${ template.auto_print_action == "" ? "d-none" : "" }" >
                    ${ auto_printers }
                  </div>
                  <p class="form-text">${__html('Auto print this template when selected action is triggered.')}</p>
                </div> 
              </div>
              <div class="form-group mb-3 mt-1 ">
                <button class="d-none btn btn-sm btn-outline-success test-template mt-5 mb-1 mt-md-4 mb-md-0 d-flex align-items-center ms-auto bd-highlight" type="button" data-index="${(i-1)}">${ __html('Test print') }</button>
                <button class="btn btn-sm btn-outline-danger remove-template mt-5 mb-1 mt-md-4 mb-md-0 d-flex align-items-center ms-auto bd-highlight" type="button" data-index="${(i-1)}">${ __html('Remove template') }</button>
              </div>
            </div>

            <div class="col-lg-6 d-none">

            </div>

            <div class="col-lg-6 d-none">
              <div class="form-group row mb-3 mt-1">
                <div class="col-sm-12" >
                  <iframe class="template-preview" style="width:600px;min-height:400px" srcdoc="${ html(template.template) }"></iframe>
                  <p class="form-text">${__html('Template preview.')}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>`;

  }
}