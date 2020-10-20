const cron = require("cron-validator");

class CronComponent extends HTMLElement {
  constructor() {
    super();
  }

  Init(state) {
    this.state = state;

    if (this.state.props != undefined) {
      this.state.props.forEach((p) => {
        this.state.self[p] = state.self.getAttribute(p);
      });
    }

    this.Create(this.state.self, this.state.template);
  }

  Create(self, template) {
    var div = document.createElement("div");
    div.innerHTML = template;
    if (this.state.style != undefined) {
      var style = document.createElement("style");
      style.innerHTML = this.state.style;
      self.appendChild(style);
    }
    self.appendChild(div);
  }
  getElements(className) {
    return this.state.self.querySelectorAll(className);
  }
  getElement(className) {
    return this.state.self.querySelector(className);
  }
  addEvent(className, event, handle) {
    this.getElements(className).forEach((element) => {
      element.addEventListener(event, function (e) {
        handle(e.target);
      });
    });
  }
  increaseBrightness(hex, percent) {
    hex = hex.replace(/^\s*#|\s*$/g, "");

    if (hex.length == 3) {
      hex = hex.replace(/(.)/g, "$1$1");
    }

    var r = parseInt(hex.substr(0, 2), 16);
    var g = parseInt(hex.substr(2, 2), 16);
    var b = parseInt(hex.substr(4, 2), 16);

    return (
      "#" +
      (0 | ((1 << 8) + r + ((256 - r) * percent) / 100))
        .toString(16)
        .substr(1) +
      (0 | ((1 << 8) + g + ((256 - g) * percent) / 100))
        .toString(16)
        .substr(1) +
      (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
    );
  }
}

customElements.define(
  "cron-fields",
  class extends CronComponent {
    constructor() {
      super();
    }

    connectedCallback() {
      this.Init({
        self: this,
        props: ["input", "hasZero", "every"],
        template: `
          <div>
            <form>
                <div style='display: flex; height: 138px;'>
                    <div class='panel panel-default' style='margin-right: 2.5px; width: 50%; height: 132px;'>
                        <div class='panel-heading'>
                            <div style='display: flex;'> <input class='form-check-input' type='radio' name='choise' value='1'
                                    match='choise' checked> <span style='margin-left: 10px;'>Step</span> </div>
                        </div>
                        <div class='panel-body' style='display: flex !important;'>
                            <div class='form-group' style='margin-right: 5px; width: 50%;'> <label
                                    for='everySelect'>Every</label> <select match='every' class='form-control'
                                    style='width: 100%;' :disabled='input.choise==1 ? false : true'>
                                    <option>*</option>
                                </select> </div>
                            <div class='form-group' style='margin-left: 5px; width: 50%;'> <label for='stepSelect'>Step</label>
                                <select match='step' class='form-control' style='width: 100%;'
                                    :disabled='input.choise==1 ? false : true'>
                                    <option>*</option>
                                </select> </div>
                        </div>
                    </div>
                    <div class='panel panel-default' style='margin-left: 2.5px; width: 50%; height: 132px;'>
                        <div class='panel-heading'>
                            <div style='display: flex;'> <input class='form-check-input' type='radio' name='choise' value='2'
                                    match='choise'> <span style='margin-left: 10px;'>Range</span> </div>
                        </div>
                        <div class='panel-body'>
                            <div class='form-group'>
                                <div style='display: flex;'>
                                    <div style='width: 50%; margin-right: 5px;'> <label class='form-check-label'
                                            for='exampleRadios1'>Min</label> <select match='rangeMin'
                                            class='form-control' style='width: 100%;'
                                            :disabled='input.choise==2 ? false : true'>
                                        </select> </div>
                                    <div style='width: 50%; margin-right: 5px;'> <label class='form-check-label'
                                            for='exampleRadios1'>Max</label> <select match='rangeMax'
                                            class='form-control' style='width: 100%;'
                                            :disabled='input.choise==2 ? false : true'>
                                        </select> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='panel panel-default' style='margin: 0px !important; padding: 0px !important; height: 230px;'>
                    <div class='panel-heading'>
                        <div style='display: flex;'> <input class='form-check-input' type='radio' name='choise' value='3'
                                match='choise'> <span style='margin-left: 10px;'>Choise</span> </div>
                    </div>
                    <div class='panel-body' style="padding-top: 6px !important;">
                        <div match='spesific' class='form-group'
                            style='display: flex !important; flex-wrap: wrap !important; margin: 0px !important; padding: 0px !important;'>
                        </div>
                    </div>
                </div>
            </form>
        </div>
      `,
      });

      this.value = "*";
      this.Mount();
    }

    Mount() {
      this.addSelectOptions("every");
      this.addSelectOptions("step");
      this.addSelectOptions("rangeMin");
      this.addSelectOptions("rangeMax");
      this.addSpesificOptions("spesific");
      this.eventListen("select");
      this.eventListen("input");
    }
    getNumber(n) {
      return n.toString().padStart(2, "0");
    }
    getHasZero() {
      return Number(this.hasZero == "true");
    }
    addSelectOptions(attr) {
      var match = this.getElement("*[match=" + attr + "]");
      for (var i = this.getHasZero(); i <= this["every"]; i++) {
        var option = document.createElement("option");
        option.innerText = this.getNumber(i);
        match.appendChild(option);
      }
    }
    addSpesificOptions(attr) {
      var match = this.getElement("*[match=" + attr + "]");
      for (var i = this.getHasZero(); i <= this["every"]; i++) {
        var div = document.createElement("div");
        div.innerHTML = `
              <div style="margin: 10px;">
                  <label class="check-container">
                      <span>${this.getNumber(i)}</span>
                      <input value='${i}' type="checkbox">
                      <span class="checkmark"></span>
                  </label>
              </div>
            `;
        match.appendChild(div);
      }
    }
    makeCron(choise, input) {
      var cron = "*";
      if (choise == 1) {
        if (input.step == "*") {
          cron = `${input.every}`;
        } else {
          cron = `${input.every}/${input.step}`;
        }
      } else if (
        choise == 2 &&
        !(input.rangeMin == "*" || input.rangeMax == "*")
      ) {
        let min = parseInt(input.rangeMin);
        let max = parseInt(input.rangeMax);
        if (!(min >= max)) {
          cron = `${input.rangeMin}-${input.rangeMax}`;
        }
      } else if (choise == 3 && input.spesific.length != 0) {
        cron = "";
        input.spesific.forEach((m) => {
          cron += m + ",";
        });
        cron = cron.slice(0, cron.length - 1);
      }
      this.value = cron;
    }
    eventListen(attr) {
      var self = this;
      this.getElements(attr).forEach(function (element) {
        element.addEventListener("change", function (e) {
          var choise = self.getElement("*[match=choise]:checked").value;
          var every = self.getElement("*[match=every]").value;
          var step = self.getElement("*[match=step]").value;
          var rangeMin = self.getElement("*[match=rangeMin]").value;
          var rangeMax = self.getElement("*[match=rangeMax]").value;
          var spesific = Array.prototype.map.call(
            self.getElements("*[match=spesific] input:checked"),
            function (input) {
              return input.value;
            }
          );
          self.makeCron(choise, {
            every,
            step,
            rangeMin,
            rangeMax,
            spesific,
          });
        });
      });
    }
  }
);

customElements.define(
  "cron-expression-input",
  class extends CronComponent {
    constructor() {
      super();
    }

    connectedCallback() {
      this.width = this.getAttribute("width");
      this.height = this.getAttribute("height");

      var color = this.getAttribute("color");
      this.colorMain = "#" + color;
      this.colorSecond = this.increaseBrightness(color, 10);

      this.Init({
        self: this,
        style: `
        cron-expression-input {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
        }
        cron-expression-input .cronInput {
          height: 34px !important;
          position: relative !important;
        }
        cron-expression-input .cronInput input[type="text"] {
          width: 98% !important;
          box-shadow: none !important;
          padding-left: 10px !important;
          padding-top: 0px !important;
          padding-bottom: 0px !important;
          border: 1px #ccc solid !important;
        }
        cron-expression-input .cronInput button {
          position: absolute !important;
          right: 0 !important;
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
          z-index: 2 !important;
        }
        cron-expression-input .cronInput input {
          line-height: normal !important;
        }
        cron-expression-input * {
          -webkit-box-sizing: border-box !important;
          -moz-box-sizing: border-box !important;
          box-sizing: border-box !important;
        }
        cron-expression-input button,
        cron-expression-input input,
        cron-expression-input select {
          font-family: inherit !important;
          font-size: inherit !important;
          line-height: inherit !important;
        }
        cron-expression-input label {
          display: inline-block !important;
          max-width: 100% !important;
          margin-bottom: 5px !important;
        }
        cron-expression-input input[type="checkbox"],
        cron-expression-input input[type="radio"] {
          margin: 4px 0 0 !important;
          line-height: normal !important;
        }
        cron-expression-input input[type="checkbox"]:focus,
        cron-expression-input input[type="radio"]:focus {
          outline: 5px auto -webkit-focus-ring-color !important;
          outline-offset: -2px !important;
        }
        cron-expression-input .form-control {
          display: block !important;
          width: 100% !important;
          height: 34px !important;
          padding: 6px 12px !important;
          font-size: 14px !important;
          line-height: 1.42857143 !important;
          color: #555 !important;
          background-color: #fff !important;
          background-image: none !important;
          border: 1px solid #ccc !important;
          border-radius: 4px !important;
          -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
          -webkit-transition: border-color ease-in-out 0.15s,
            -webkit-box-shadow ease-in-out 0.15s !important;
          -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s !important;
          transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s !important;
        }
        cron-expression-input .form-control:focus {
          border-color: #66afe9 !important;
          outline: 0 !important;
          -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
            0 0 8px rgba(102, 175, 233, 0.6) !important;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
            0 0 8px rgba(102, 175, 233, 0.6) !important;
        }
        cron-expression-input .form-group {
          margin-bottom: 15px !important;
        }
        cron-expression-input .btn {
          display: inline-block !important;
          padding: 6px 12px !important;
          margin-bottom: 0 !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          line-height: 1.42857143 !important;
          text-align: center !important;
          white-space: nowrap !important;
          vertical-align: middle !important;
          -ms-touch-action: manipulation !important;
          touch-action: manipulation !important;
          cursor: pointer !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          background-image: none !important;
          border: 1px solid #ccc !important;
          border-radius: 4px !important;
          height: 100% !important;
        }
        cron-expression-input .btn:focus,
        cron-expression-input .btn:hover {
          color: #333 !important;
          text-decoration: none !important;
        }
        cron-expression-input .btn:active {
          background-image: none !important;
          outline: 0 !important;
          -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125) !important;
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125) !important;
        }
        cron-expression-input .btn-custom {
          color: #fff !important;
          border: 1px #ccc solid !important;
          background-color: #d58512 !important;
          border-color: #d99129 !important;
        }
        cron-expression-input .btn-custom:focus {
          color: #fff !important;
          background-color: #d99129 !important;
          border: 1px #ccc solid;
          outline: 0 !important;
        }
        cron-expression-input .btn-custom:hover {
          color: #fff !important;
          background-color: #d99129 !important;
          border-color: #d99129 !important;
        }
        cron-expression-input .btn-custom:active {
          color: #fff !important;
          border: 1px #ccc solid !important;
          background-color: #d99129 !important;
          border-color: #d99129 !important;
          outline: 0 !important;
        }
        cron-expression-input .btn-custom:active:focus,
        cron-expression-input .btn-custom:active:hover {
          color: #fff !important;
          background-color: #d99129 !important;
          border-color: #ccc !important;
        }
        cron-expression-input .btn-custom:active {
          background-image: none !important;
        }
        cron-expression-input .fade {
          opacity: 0 !important;
          -webkit-transition: opacity 0.15s linear !important;
          -o-transition: opacity 0.15s linear !important;
          transition: opacity 0.15s linear !important;
        }
        cron-expression-input .nav {
          padding-left: 0 !important;
          margin-bottom: 0 !important;
          list-style: none !important;
        }
        cron-expression-input .nav > li {
          position: relative !important;
          display: block !important;
        }
        cron-expression-input .nav > li > a {
          position: relative !important;
          display: block !important;
          padding: 10px 15px !important;
        }
        cron-expression-input .nav > li > a:focus,
        cron-expression-input .nav > li > a:hover {
          text-decoration: none !important;
          background-color: #eee !important;
        }
        cron-expression-input .nav-tabs {
          border-bottom: 1px solid #ddd !important;
        }
        cron-expression-input .nav-tabs > li {
          float: left !important;
          margin-bottom: -1px !important;
        }
        cron-expression-input .nav-tabs > li > a {
          margin-right: 2px !important;
          line-height: 1.42857143 !important;
          border: 1px solid transparent !important;
          border-radius: 4px 4px 0 0 !important;
        }
        cron-expression-input .nav-tabs > li > a:hover {
          border-color: #eee #eee #ddd !important;
        }
        cron-expression-input .nav-tabs > li.active > a,
        cron-expression-input .nav-tabs > li.active > a:focus,
        cron-expression-input .nav-tabs > li.active > a:hover {
          color: #555 !important;
          cursor: default !important;
          background-color: #fff !important;
          border: 1px solid #ddd !important;
          border-bottom-color: transparent !important;
        }
        cron-expression-input .tab-content > .tab-pane {
          display: none !important;
        }
        cron-expression-input .tab-content > .active {
          display: block !important;
        }
        cron-expression-input .panel {
          margin-bottom: 20px !important;
          background-color: #fff !important;
          border: 1px solid transparent !important;
          border-radius: 4px !important;
          -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) !important;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) !important;
        }
        cron-expression-input .panel-body {
          padding: 15px !important;
        }
        cron-expression-input .panel-heading {
          padding: 10px 15px !important;
          border-bottom: 1px solid transparent !important;
          border-top-left-radius: 3px !important;
          border-top-right-radius: 3px !important;
        }
        cron-expression-input .panel-default {
          border-color: #ddd !important;
        }
        cron-expression-input .panel-default > .panel-heading {
          color: #333 !important;
          background-color: #f5f5f5 !important;
          border-color: #ddd !important;
        }
        cron-expression-input .close {
          float: right !important;
          font-size: 21px !important;
          font-weight: 700 !important;
          line-height: 1 !important;
          color: #000 !important;
          text-shadow: 0 1px 0 #fff !important;
        }
        cron-expression-input .close:focus,
        cron-expression-input .close:hover {
          color: #000 !important;
          text-decoration: none !important;
          cursor: pointer !important;
          opacity: 0.5 !important;
        }
        cron-expression-input .modal {
          position: fixed !important;
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
          z-index: 1050 !important;
          display: none !important;
          overflow: hidden !important;
          -webkit-overflow-scrolling: touch !important;
          outline: 0 !important;
        }
        cron-expression-input .modal-dialog {
          position: relative !important;
          width: auto !important;
          margin: 10px !important;
        }
        cron-expression-input .modal-content {
          position: relative !important;
          background-color: #fff !important;
          -webkit-background-clip: padding-box !important;
          background-clip: padding-box !important;
          border: 1px solid #999 !important;
          border: 1px solid rgba(0, 0, 0, 0.2) !important;
          border-radius: 6px !important;
          outline: 0 !important;
          -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5) !important;
          box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5) !important;
        }
        cron-expression-input .modal-header {
          padding: 15px !important;
        }
        cron-expression-input .modal-header .close {
          margin-top: -2px !important;
        }
        cron-expression-input .modal-body {
          position: relative !important;
          top: -15px !important;
          padding: 15px !important;
          padding-bottom: 0px !important;
        }
        cron-expression-input .modal-dialog {
          width: 600px !important;
          margin: 30px auto !important;
        }
        cron-expression-input .modal-header:after,
        cron-expression-input .modal-header:before,
        cron-expression-input .nav:after,
        cron-expression-input .nav:before,
        cron-expression-input .panel-body:after,
        cron-expression-input .panel-body:before {
          display: table !important;
          content: " " !important;
        }
        cron-expression-input .modal-header:after,
        cron-expression-input .nav:after,
        cron-expression-input .panel-body:after {
          clear: both !important;
        }
        cron-expression-input .show {
          display: block !important;
        }
        cron-expression-input input[type="radio"] {
          position: relative !important;
          top: -2.52px !important;
        }
        cron-expression-input input[type="radio"] {
          appearance: none !important;
          display: block !important;
          width: 1em !important;
          height: 1em !important;
          border-radius: 50% !important;
          border: 0.1em solid #d99129 !important;
        }
        cron-expression-input input[type="radio"]:after {
          appearance: radio !important;
          display: block !important;
          width: 10px !important;
          height: 10px !important;
          border-radius: 10px !important;
          top: -2px !important;
          left: -1px !important;
          position: relative !important;
          background-color: #d1d3d1 !important;
          display: inline-block !important;
          visibility: visible !important;
          border: 2px solid white !important;
          position: absolute !important;
          top: 2px !important;
          left: 1.8px !important;
        }
        cron-expression-input input[type="radio"]:checked:after {
          appearance: radio !important;
          border: 2px solid white !important;
          display: block !important;
          width: 10px !important;
          height: 10px !important;
          border-radius: 10px !important;
          top: -3px !important;
          left: 2px !important;
          position: relative !important;
          background-color: #d99129 !important;
          content: "" !important;
          display: inline-block !important;
          visibility: visible !important;
          border: none !important;
          position: absolute !important;
          top: 1px !important;
          left: 1.9px !important;
        }
        cron-expression-input input[type="checkbox"]:focus,
        cron-expression-input input[type="radio"]:focus,
        cron-expression-input .cronInsideInput:focus,
        cron-expression-input .btn-custom:active  {
          outline: none !important;
        }
        cron-expression-input span {
          position: relative !important;
          z-index: 2 !important;
        }
      `,
        template: `
        <div class="cronInput" style="display: flex !important; width: ${this.width} !important; height: ${this.height} !important;">
          <input class="cronInsideInput" type="text" class="form-control" placeholder="Cron expression">
          <button type="button" class="cronButtonUI btn btn-custom" style="font-size: 114% !important;" @click="openCronUI">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </button>
        </div>
        <small class="cronexpressionError hiden" style="display: none; color: red !important; margin-top: 5px !important;">expression cron invalida, try with (* * * * *)</small>
        <div class="modal" tabindex="-1">
            <div class="modal-dialog" style="width: 893px !important;">
                <div class="modal-content">
                    <div class="modal-header" style="height: 0px;">
                        <span class="close cronClose">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="${this.colorSecond}">
                                <path fill-rule="evenodd"
                                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path fill-rule="evenodd"
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </span>
                        <span class="close cronSave" style="margin-right: 10px;">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="${this.colorSecond}">
                                <path fill-rule="evenodd"
                                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path fill-rule="evenodd"
                                    d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
                            </svg>
                        </span>
                    </div>
                    <div class="modal-body" style="padding-top: 0px !important;">
                        <ul class="nav nav-tabs" style="margin-top: 0px;">
                            <li class="nav-item active in"><a class="nav-link">Minutes</a></li>
                            <li class="nav-item"><a class="nav-link">Hours</a></li>
                            <li class="nav-item"><a class="nav-link">Day of Month</a></li>
                            <li class="nav-item"><a class="nav-link">Month</a></li>
                            <li class="nav-item"><a class="nav-link">Days of week</a></li>
                        </ul>
                        <div class="tab-content" style="margin-top: 13px !important;">
                            <div class="tab-pane active in">
                                <cron-fields pos="0" input="minute" hasZero="true" every="59" />
                            </div>
                            <div class="tab-pane fade">
                                <cron-fields pos="1" input="hour" hasZero="true" every="23" />
                            </div>
                            <div class="tab-pane fade">
                                <cron-fields pos="2" input="dayOfMonth" every="31" />
                            </div>
                            <div class="tab-pane fade">
                                <cron-fields pos="3" input="month" every="12" />
                            </div>
                            <div class="tab-pane fade">
                                <cron-fields pos="4" input="dayOfWeek" hasZero="true" every="6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `,
      });

      var self = this;
      self.setValue("0/1 * * * *");

      this.addEvent(".cronButtonUI", "click", function () {
        self.currentValue = self.getAttribute("value");
        self.modalToggle();
      });
      this.addEvent(".cronClose", "click", function () {
        self.setValue(self.currentValue);
        self.modalToggle();
      });
      this.addEvent(".cronSave", "click", function () {
        self.modalToggle();
      });

      this.addEvent("li > a", "click", function (scope) {
        var index = 0;
        self.getElements("li > a").forEach(function (elem, i) {
          elem.parentNode.setAttribute("class", "nav-link");
          if (elem == scope) {
            index = i;
          }
        });
        scope.parentNode.setAttribute("class", "nav-link active in");
        var elements = self.getElements("cron-fields");
        elements.forEach(function (elem) {
          elem.parentNode.setAttribute("class", 'tab-pane fade"');
        });
        elements[index].parentNode.setAttribute("class", "tab-pane active in");
      });

      this.addEvent(".cronInsideInput", "change", function (e) {
        var error = self.getElement(".cronexpressionError");
        if (!cron.isValidCron(e.value)) {
          error.classList.replace("hiden", "show");
        } else {
          error.classList.replace("show", "hiden");
        }
      });

      var input = this.getElement(".cronInsideInput");
      input.addEventListener("keydown", function (e) {
        self.validateLongitud(e);
      });
      input.addEventListener("keypress", function (e) {
        self.validateLongitud(e);
      });
      input.addEventListener("keyup", function (e) {
        self.validateLongitud(e);
      });

      this.addEvent("cron-fields", "change", function (e) {
        var value = true;
        var node = e.parentNode;
        while (value) {
          node = node.parentNode;
          if (node.nodeName == "CRON-FIELDS") value = false;
        }

        var input = self.getElement(".cronInsideInput");
        self.setValue(
          self.generateCron(
            parseInt(node.getAttribute("pos")),
            input["value"],
            node.value
          )
        );
      });
    }

    validateLongitud(e) {
      var values = e.target.value.trim().split(" ");
      if (values.length > 5) {
        e.target.value = values.slice(0, 5).join(" ");
      }
    }
    setValue(value) {
      value = value.trim();
      var len = value.split(" ").length;
      var array = value.split(" ");
      if (len != 5) {
        for (var i = 0; i < 5 - len; i++) {
          array.push("*");
        }
      }
      value = array.join(" ");
      this.setAttribute("value", value);
      var input = this.getElement(".cronInsideInput");
      input.value = value;
    }
    modalToggle() {
      this.getElement(".modal").classList.toggle("show");
    }
    generateCron(pos, values, value) {
      var values = values.split(" ");
      values[pos] = value;
      return values.join(" ");
    }
  }
);
