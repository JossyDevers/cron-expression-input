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
  }

  Create(self, template) {
    self.innerHTML = "";
    var div = document.createElement("div");
    div.innerHTML = template;
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
  getNumber(n) {
    return n.toString().padStart(2, "0");
  }
  getHasZero() {
    return this.hasZero ? 0 : 1;
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
        props: ["input", "hasZero", "every", "colorMain", "colorSecond"],
      });

      var template = `
  <div>
    <style>
      cron-expression-input input[type="radio"]:checked:after { background-color: ${this.colorMain} !important; }
      cron-expression-input input[type="radio"] { border: 0.1em solid ${this.colorSecond} !important; }
      .container input:checked ~ .checkmark { background-color: ${this.colorSecond} !important; }
    </style>
    <form>
        <div style='display: flex; height: 138px;'>
            <div class='panel panel-default' style='margin-right: 2.5px; width: 50%; height: 132px;'>
                <div class='panel-heading'>
                    <div style='display: flex;'> <input class='propagationClass form-check-input' type='radio' name='choise' value='1'
                            match='choise' checked> <span style='margin-left: 10px;'>Step</span> </div>
                </div>
                <div class='panel-body' style='display: flex !important;'>
                    <div class='propagationClass form-group' style='margin-right: 5px; width: 50%;'> <label
                            for='everySelect'>Every</label> <select match='every' class='form-control'
                            style='width: 100%;'>
                            <option>*</option>
                        </select> </div>
                    <div class='form-group' style='margin-left: 5px; width: 50%;'> <label for='stepSelect'>Step</label>
                        <select match='step' class='propagationClass form-control' style='width: 100%;'>
                            <option>*</option>
                        </select> </div>
                </div>
            </div>
            <div class='panel panel-default' style='margin-left: 2.5px; width: 50%; height: 132px;'>
                <div class='panel-heading'>
                    <div style='display: flex;'> <input class='propagationClass form-check-input' type='radio' name='choise' value='2'
                            match='choise'> <span style='margin-left: 10px;'>Range</span> </div>
                </div>
                <div class='panel-body'>
                    <div class='form-group'>
                        <div style='display: flex;'>
                            <div style='width: 50%; margin-right: 5px;'> <label class='form-check-label'
                                    for='exampleRadios1'>Min</label> <select match='rangeMin'
                                    class='propagationClass form-control' style='width: 100%;'>
                                </select> </div>
                            <div style='width: 50%; margin-right: 5px;'> <label class='form-check-label'
                                    for='exampleRadios1'>Max</label> <select match='rangeMax'
                                    class='propagationClass form-control' style='width: 100%;'>
                                </select> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='panel panel-default' style='margin: 0px !important; padding: 0px !important; height: 214px;'>
            <div class='panel-heading'>
                <div style='display: flex;'> <input class='propagationClass form-check-input' type='radio' name='choise' value='3'
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
`;

      this.value = "*";
      this.Create(this, template);
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
    addSelectOptions(attr) {
      var match = this.getElement("*[match=" + attr + "]");
      for (var i = this.getHasZero(); i <= this["every"]; i++) {
        var option = document.createElement("option");
        option.innerText = this.getNumber(i);
        option.value = i;
        match.appendChild(option);
      }
    }
    addSpesificOptions(attr) {
      var match = this.getElement("*[match=" + attr + "]");
      for (var i = this.getHasZero(); i <= this["every"]; i++) {
        var div = document.createElement("div");
        div.innerHTML = `
      <div style="margin: 10px;">
          <label class="container">
              <span class="numberValue">${this.getNumber(i)}</span>
              <input class="propagationClass" value='${i}' type="checkbox">
              <span class="checkmark"></span>
          </label>
      </div>
    `;
        div.style = "width: 55px !important;";
        match.appendChild(div);
      }
    }
    makeCron(choise, input) {
      var expression = "*";
      if (choise == 1) {
        if (input.step == "*") {
          expression = `${input.every}`;
        } else {
          expression = `${input.every}/${input.step}`;
        }
      } else if (
        choise == 2 &&
        !(input.rangeMin == "*" || input.rangeMax == "*")
      ) {
        let min = parseInt(input.rangeMin);
        let max = parseInt(input.rangeMax);
        if (min < max) {
          expression = `${input.rangeMin}-${input.rangeMax}`;
        }
      } else if (choise == 3 && input.spesific.length != 0) {
        expression = "";
        input.spesific.forEach((m) => {
          expression += m + ",";
        });
        expression = expression.slice(0, expression.length - 1);
      }
      this.value = expression;
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

      var color = this.getAttribute("color").replace("#", "");
      this.colorMain = "#" + color;
      this.colorSecond = this.increaseBrightness(color, 10);

      this.Init({
        self: this,
      });

      var template = `
          <div class="cronInput" style="display: flex !important; width: ${this.width} !important; height: ${this.height} !important;">
          <input class="cronInsideInput" type="text" class="form-control" placeholder="Cron Expression">
          <button type="button" class="cronButtonUI btn btn-custom" style="font-size: 114% !important; border-color: ${this.colorMain} !important; background-color: ${this.colorSecond} !important;">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="white">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </button>
        </div>
<small class="cronexpressionError hiden" style="display: none; color: red !important; margin-top: 5px !important; margin-bottom: 5px !important;">expression cron invalida, try with (* * * * *)</small>
<div class="modal" tabindex="-1">
    <div class="modal-dialog" style="width: 893px !important;">
        <div class="modal-content" style="height: 480px !important">
            <div class="modal-header" style="height: 0px !important; padding-bottom: 30px !important;">
                <span class="close2 cronClose">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="${this.colorMain}" style="font-size: 21px !important;">
                        <path fill-rule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path fill-rule="evenodd"
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </span>
                <span class="close2 cronSave" style="margin-right: 10px;">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="${this.colorMain}" style=" font-size: 21px !important;">
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
                        <cron-fields pos="0" input="minute" hasZero="true" every="59" colorMain="${this.colorMain}" colorSecond="${this.colorSecond}" />
                    </div>
                    <div class="tab-pane fade">
                        <cron-fields pos="1" input="hour" hasZero="true" every="23" colorMain="${this.colorMain}" colorSecond="${this.colorSecond}" />
                    </div>
                    <div class="tab-pane fade">
                        <cron-fields pos="2" input="dayOfMonth" every="31" colorMain="${this.colorMain}" colorSecond="${this.colorSecond}" />
                    </div>
                    <div class="tab-pane fade">
                        <cron-fields pos="3" input="month" every="12" colorMain="${this.colorMain}" colorSecond="${this.colorSecond}" />
                    </div>
                    <div class="tab-pane fade">
                        <cron-fields pos="4" input="dayOfWeek" hasZero="true" every="6" colorMain="${this.colorMain}" colorSecond="${this.colorSecond}" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

      var self = this;
      this.Create(self, template);
      this.setValue(this.getAttribute("value"));

      var input1 = this.getElement(".cronInsideInput");
      input1.addEventListener("keydown", function (e) {
        self.validateLongitud(e);
      });
      input1.addEventListener("keypress", function (e) {
        self.validateLongitud(e);
      });
      input1.addEventListener("keyup", function (e) {
        self.validateLongitud(e);
      });
      this.addEvent(".cronButtonUI", "click", function () {
        self.querySelectorAll("form").forEach(function (element) {
          element.reset();
        });
        if (self.getElementsByClassName("cronInsideInput").length != 0) {
          self.currentValue =
            self.getElementsByClassName("cronInsideInput")[0].value;
          if (self.currentValue.split(" ").length == 5)
            self.getCron(self.currentValue);
        }
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
        self.setValue(e["value"]);
      });
      this.addEvent("cron-fields", "change", function (e) {
        var value = true;
        var node = e.parentNode;
        while (value) {
          node = node.parentNode;
          if (node.nodeName == "CRON-FIELDS") value = false;
        }

        var input2 = self.getElement(".cronInsideInput");
        self.setValue(
          self.generateCron(
            parseInt(node.getAttribute("pos")),
            input2["value"],
            node.value
          )
        );
      });

      // Stop InputEvent when a input is clicked.
      this.getElements(".propagationClass").forEach(function (element) {
        element.addEventListener("input", function (e) {
          e.stopPropagation();
        });
      });
    }
    getTypeCron(expresion) {
      if (expresion.includes("/") || expresion.includes("*")) return 1;
      else if (expresion.includes("-")) return 2;
      return 3;
    }
    getTypeStep(expresion) {
      const separator = "/";
      var step = {
        every: "*",
        step: "*",
      };
      if (!expresion.includes(separator) && expresion != "*") {
        step.every = expresion;
      } else if (expresion.includes("*") && expresion.includes(separator)) {
        step.step = expresion.split(separator)[1];
      } else if (expresion.includes(separator)) {
        var c = expresion.split(separator);
        step.every = c[0];
        step.step = c[1];
      }
      return step;
    }
    getTypeRange(expresion) {
      const separator = "-";
      var range = {
        min: "0",
        max: "0",
      };
      if (expresion.includes(separator)) {
        var c = expresion.split(separator);
        range.min = c[0];
        range.max = c[1];
      }
      return range;
    }
    getTypeChoise(expresion) {
      return expresion.split(",");
    }
    getCron(cronExpresion) {
      var forms = this.querySelectorAll("form");
      var crons = cronExpresion.split(" ");
      this.setCronInTab(forms[0], crons[0], this.getTypeCron(crons[0]));
      this.setCronInTab(forms[1], crons[1], this.getTypeCron(crons[1]));
      this.setCronInTab(forms[2], crons[2], this.getTypeCron(crons[2]), 1);
      this.setCronInTab(forms[3], crons[3], this.getTypeCron(crons[3]), 1);
      this.setCronInTab(forms[4], crons[4], this.getTypeCron(crons[4]));
    }
    setCronInTab(form, value, type, decrement = 0) {
      var choises = form.querySelectorAll("input[name='choise']");
      choises.forEach(function (choise) {
        choise.removeAttribute("checked");
      });
      choises[type - 1].checked = true;
      switch (type) {
        case 1:
          var step = this.getTypeStep(value);
          form.querySelector("*[match=every]").selectedIndex =
            parseInt(step["every"]) + 1;
          form.querySelector("*[match=step]").selectedIndex =
            parseInt(step["step"]) + 1;
          break;
        case 2:
          var range = this.getTypeRange(value);
          form.querySelector("*[match=rangeMin]").selectedIndex =
            parseInt(range["min"]) - decrement;
          form.querySelector("*[match=rangeMax]").selectedIndex =
            parseInt(range["max"]) - decrement;
          break;
        case 3:
          var cs = this.getTypeChoise(value);
          form
            .querySelectorAll("*[match=spesific] input")
            .forEach(function (element, index) {
              if (cs.includes((index + 1).toString())) {
                element.checked = true;
              }
            });
          break;
      }
    }
    validateLongitud(e) {
      var values = e.target.value.trim().split(" ");
      if (values.length > 5) {
        e.target.value = values.slice(0, 5).join(" ");
      }
      this.sendEvent();
    }
    setValue(value) {
      var defaultArray = ["*", "*", "*", "*", "*"];
      if (value == undefined) {
        return defaultArray.join(" ");
      } else if (value.length > 0) {
        var array = value.trim().split(" ");
        for (var i = 0; i < 5; i++) {
          if (array[i] != undefined) {
            defaultArray[i] = array[i];
          }
        }
        value = defaultArray.join(" ");
      }
      var input3 = this.getElement(".cronInsideInput");
      input3.value = value;
      this.sendEvent();
    }
    modalToggle() {
      this.getElement(".modal").classList.toggle("show");
    }
    generateCron(pos, values, value) {
      var val = values.split(" ");
      val[pos] = value;
      return val.join(" ");
    }
    sendEvent() {
      var input4 = this.getElement(".cronInsideInput");
      var event = new CustomEvent("input", {
        detail: {
          value: input4.value,
        },
        bubbles: true,
        cancelable: true,
      });
      this.dispatchEvent(event);
    }
  }
);
