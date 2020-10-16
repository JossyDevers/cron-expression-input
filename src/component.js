class CronComponent extends HTMLElement {
  constructor() {
    super();
  }
  Init(state) {
    this.state = state;
    this.state.self.value = this.state.defaultValue || "";

    if (this.state.props != undefined) {
      this.state.props.forEach((p) => {
        this.state.self[p] = state.self.getAttribute(p);
      });
    }

    this.Create(this.state.self, this.state.template);
    this.Mount();
    this.Mounted();
  }
  Create(self, template) {
    var div = document.createElement("div");
    div.innerHTML = template;
    self.appendChild(div);
  }
  Mount() {
    this.addHasZero();
    this.addSelectOptions("every");
    this.addSelectOptions("step");
    this.addSelectOptions("rangeMin");
    this.addSelectOptions("rangeMax");
    this.addSpesificOptions("spesific");
    var choise = this.state.self.getElements("*[v-model=choise]");
  }
  Mounted() {
    this.eventListen("select");
    this.eventListen("input");
  }
  addHasZero() {
    if (this.state.self.hasZero != "true") {
      this.getElements("*[v-if=hasZero]").forEach(function (element) {
        element.remove();
      });
    }
  }
  addSelectOptions(attr) {
    var step = this.getElement("*[v-model=" + attr + "]");
    for (var i = 1; i <= this.state.self[attr]; i++) {
      var option = document.createElement("option");
      option.innerText = i;
      step.appendChild(option);
    }
  }
  addSpesificOptions(attr) {
    var spesific = this.state.self.getElement("*[v-model=" + attr + "]");
    for (var i = 1; i <= this.state.self[attr]; i++) {
      var option = document.createElement("div");
      option.innerHTML = `
              <div style="margin: 10px;">
                  <label class="check-container">
                      <span>${i}</span>
                      <input value='${i}' type="checkbox">
                      <span class="checkmark"></span>
                  </label>
              </div>
            `;
      spesific.appendChild(option);
    }
  }
  eventListen(attr) {
    var self3 = this.state.self;
    var self4 = this;
    this.state.self.querySelectorAll(attr).forEach(function (element) {
      element.addEventListener("change", function (e) {
        var every = self3.getElement("*[v-model=every]").value;
        var step = self3.getElement("*[v-model=step]").value;
        var rangeMin = self3.getElement("*[v-model=rangeMin]").value;
        var rangeMax = self3.getElement("*[v-model=rangeMax]").value;
        var choise = "1";
        self3.getElements("*[v-model=choise]").forEach(function (ee) {
          if (ee.checked) {
            choise = ee.value;
          }
        });
        var spesific = Array.prototype.map.call(
          self3.getElements("*[v-model=spesific] input:checked"),
          function (el) {
            return el.value;
          }
        );
        self4.makeCron(choise, {
          every,
          step,
          rangeMin,
          rangeMax,
          spesific,
        });
      });
    });
  }
  getElements(className) {
    return this.state.self.querySelectorAll(className);
  }
  getElement(className) {
    return this.state.self.querySelector(className);
  }
  addEvent(className, event, handle) {
    this.getElements(className).forEach((elem) => {
      elem.addEventListener(event, function (e) {
        handle(e.target);
      });
    });
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
}

class CronFieldsComponent extends CronComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    this.Init({
      self: this,
      props: [
        "input",
        "hasZero",
        "every",
        "step",
        "rangeMin",
        "rangeMax",
        "spesific",
      ],
      defaultValue: "*",
      template: `
                        <div>
                            <form>
                                <div style="display: flex;">
                                    <div class="panel panel-default" style="margin-right: 5px; width: 50%;">
                                        <div class="panel-heading">
                                            <div style="display: flex;">
                                                <input class="form-check-input" type="radio" name="choise" value="1" v-model="choise" checked>
                                                <span style="margin-left: 10px;">Step</span>
                                            </div>
                                        </div>
                                        <div class="panel-body" style="display: flex !important;">
                                            <div class="form-group" style="margin-right: 5px; width: 50%;">
                                                <label for="everySelect">Every</label>
                                                <select v-model="every" class="form-control" style="width: 100%;" :disabled="input.choise == 1 ? false : true">
                                                    <option>*</option>
                                                    <option v-if="hasZero">0</option>
                                                </select>
                                            </div>
                                            <div class="form-group" style="margin-left: 5px; width: 50%;">
                                                <label for="stepSelect">Step</label>
                                                <select id="stepSelect" v-model="step" class="form-control" style="width: 100%;" :disabled="input.choise == 1 ? false : true">
                                                    <option>*</option>
                                                    <option v-if="hasZero">0</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-default" style="margin-right: 5px; width: 50%;">
                                        <div class="panel-heading">
                                            <div style="display: flex;">
                                                <input class="form-check-input" type="radio" name="choise" value="2" v-model="choise">
                                                <span style="margin-left: 10px;">Range</span>
                                            </div>
                                        </div>
                                        <div class="panel-body">
                                            <div class="form-group">
                                                <div style="display: flex;">
                                                    <div style="width: 50%; margin-right: 5px;">
                                                        <label class="form-check-label" for="exampleRadios1">Min</label>
                                                        <select id="stepSelect" v-model="rangeMin" class="form-control" style="width: 100%;"
                                                                :disabled="input.choise == 2 ? false : true">
                                                            <option v-if="hasZero">0</option>
                                                        </select>
                                                    </div>
                                                    <div style="width: 50%; margin-right: 5px;">
                                                        <label class="form-check-label" for="exampleRadios1">Max</label>
                                                        <select id="stepSelect" v-model="rangeMax" class="form-control" style="width: 100%;"
                                                                :disabled="input.choise == 2 ? false : true">
                                                            <option v-if="hasZero">0</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default" style="margin: 0px !important; padding: 0px !important; height: 280px;">
                                    <div class="panel-heading">
                                        <div style="display: flex;">
                                            <input class="form-check-input" type="radio" name="choise" value="3" v-model="choise">
                                            <span style="margin-left: 10px;">Choise</span>
                                        </div>
                                    </div>
                                    <div class="panel-body">
                                        <div v-model="spesific" class="form-group" style="display: flex !important; flex-wrap: wrap !important; margin: 0px !important; padding: 0px !important;">
                                            <div v-if="hasZero" style="margin: 10px;">
                                                <label class="check-container">
                                                    <span>0</span>
                                                    <input value='0' type="checkbox" value="0" :disabled="input.choise == 3 ? false : true">
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        `,
    });
  }
}

class CronInputComponent extends CronComponent {
  constructor() {
    super();
  }
  generateCron(pos, value) {
    var values = this.value.split(" ");
    values[pos] = value;
    return values.join(" ");
  }
  connectedCallback() {
    this.Init({
      self: this,
      template: `
      
      <div class="cronInput">
          <div class="cronContainer" style="display: flex;">
              <input id="cronInput" type="text" class="form-control" placeholder="Enter Cron">
              <button type="button" class="cronButtonUI btn btn-warning" @click="openCronUI">UI</button>
          </div>
      </div>
            <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document" style="width: 860px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class="cronClose" aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item active in">
                                <a class="nav-link" id="minuteItem" data-toggle="tab" role="tab" aria-controls="home"
                                    aria-selected="true" style="color: black;">Minutes</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="hoursItem" data-toggle="tab" role="tab" aria-controls="profile"
                                    aria-selected="false" style="color: black;">Hours</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="dayItem" data-toggle="tab" role="tab" aria-controls="contact"
                                    aria-selected="false" style="color: black;">Day
                                    of Month</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="monthItem" data-toggle="tab" role="tab" aria-controls="contact"
                                    aria-selected="false" style="color: black;">Month</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="dayOfWeekItem" data-toggle="tab" role="tab" aria-controls="contact"
                                    aria-selected="false" style="color: black;">Days
                                    of week</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent" style="margin-top: 13px;">
                            <div class="tab-pane active in" id="minuteTab" role="tabpanel" aria-labelledby="minuteTab">
                                <cron-fields pos="0" input="minute" hasZero="true" every="59" step="59" rangeMin="59"
                                    rangeMax="59" spesific="59" />
                            </div>
                            <div class="tab-pane fade" id="hoursTab" role="tabpanel" aria-labelledby="hoursTab">
                                <cron-fields pos="1" input="hour" hasZero="true" every="23" step="23" rangeMin="23"
                                    rangeMax="23" spesific="23" />
                            </div>
                            <div class="tab-pane fade" id="dayTab" role="tabpanel" aria-labelledby="dayTab">
                                <cron-fields pos="2" input="dayOfMonth" every="31" step="31" rangeMin="31" rangeMax="31"
                                    spesific="31" />
                            </div>
                            <div class="tab-pane fade" id="monthTab" role="tabpanel" aria-labelledby="monthTab">
                                <cron-fields pos="3" input="month" every="12" step="12" rangeMin="12" rangeMax="12"
                                    spesific="12" />
                            </div>
                            <div class="tab-pane fade" id="dayOfWeekTab" role="tabpanel" aria-labelledby="dayOfWeekTab">
                                <cron-fields pos="4" input="dayOfWeek" hasZero="true" every="6" step="6" rangeMin="6"
                                    rangeMax="6" spesific="6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `,
    });

    // Events
    var self = this;

    this.addEvent("li > a", "click", function (self2) {
      var index = 0;
      self.getElements("li > a").forEach((elem, i) => {
        elem.parentNode.setAttribute("class", "nav-link");
        if (elem == self2) index = i;
      });
      self2.parentNode.setAttribute("class", "nav-link active in");
      var elements = self.getElements("cron-fields");
      elements.forEach((elem, i) => {
        elem.parentNode.setAttribute("class", 'tab-pane fade"');
        if (elem == self2) index = i;
      });
      elements[index].parentNode.setAttribute("class", "tab-pane active in");
    });

    this.addEvent("cron-fields", "change", function (e) {
      var value = true;
      var dd = e.parentNode;
      while (value) {
        dd = dd.parentNode;
        if (dd.nodeName == "CRON-FIELDS") value = false;
      }
      self.value = self.generateCron(
        parseInt(dd.getAttribute("pos")),
        dd.value
      );
      console.log(self.value);
      var eleme2 = document.getElementById("cronInput");
      eleme2.value = self.value;
    });

    var eleme22 = document.getElementById("cronInput");
    eleme22.value = this.attributes.value["nodeValue"];

    this.addEvent(".cronButtonUI", "click", function () {
      var d = document.getElementsByClassName("modal")[0];
      console.dir(d);
      d.classList.toggle("show");
    });

    this.addEvent(".cronClose", "click", function () {
      var d = document.getElementsByClassName("modal")[0];
      console.dir(d);
      d.classList.toggle("show");
    });
  }
}

customElements.define("cron-input", CronInputComponent);
customElements.define("cron-fields", CronFieldsComponent);
