"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CronComponent = /*#__PURE__*/function (_HTMLElement) {
  _inherits(CronComponent, _HTMLElement);

  var _super = _createSuper(CronComponent);

  function CronComponent() {
    _classCallCheck(this, CronComponent);

    return _super.call(this);
  }

  _createClass(CronComponent, [{
    key: "Init",
    value: function Init(state) {
      var _this = this;

      this.state = state;

      if (this.state.props != undefined) {
        this.state.props.forEach(function (p) {
          _this.state.self[p] = state.self.getAttribute(p);
        });
      }

      this.Create(this.state.self, this.state.template);
    }
  }, {
    key: "Create",
    value: function Create(self, template) {
      var div = document.createElement("div");
      div.innerHTML = template;

      if (this.state.style != undefined) {
        var style = document.createElement("style");
        style.innerHTML = this.state.style;
        self.appendChild(style);
      }

      self.appendChild(div);
    }
  }, {
    key: "getElements",
    value: function getElements(className) {
      return this.state.self.querySelectorAll(className);
    }
  }, {
    key: "getElement",
    value: function getElement(className) {
      return this.state.self.querySelector(className);
    }
  }, {
    key: "addEvent",
    value: function addEvent(className, event, handle) {
      this.getElements(className).forEach(function (element) {
        element.addEventListener(event, function (e) {
          handle(e.target);
        });
      });
    }
  }]);

  return CronComponent;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define("cron-fields", /*#__PURE__*/function (_CronComponent) {
  _inherits(_class, _CronComponent);

  var _super2 = _createSuper(_class);

  function _class() {
    _classCallCheck(this, _class);

    return _super2.call(this);
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.Init({
        self: this,
        props: ["input", "hasZero", "every"],
        template: "<div>\n                  <form>\n                      <div style='display: flex; height: 138px;'>\n                          <div class='panel panel-default' style='margin-right: 5px; width: 50%; height: 132px;'>\n                              <div class='panel-heading'>\n                                  <div style='display: flex;'> <input class='form-check-input' type='radio' name='choise' value='1'\n                                          match='choise' checked> <span style='margin-left: 10px;'>Step</span> </div>\n                              </div>\n                              <div class='panel-body' style='display: flex !important;'>\n                                  <div class='form-group' style='margin-right: 5px; width: 50%;'> <label\n                                          for='everySelect'>Every</label> <select match='every' class='form-control'\n                                          style='width: 100%;' :disabled='input.choise==1 ? false : true'>\n                                          <option>*</option>\n                                      </select> </div>\n                                  <div class='form-group' style='margin-left: 5px; width: 50%;'> <label for='stepSelect'>Step</label>\n                                      <select id='stepSelect' match='step' class='form-control' style='width: 100%;'\n                                          :disabled='input.choise==1 ? false : true'>\n                                          <option>*</option>\n                                      </select> </div>\n                              </div>\n                          </div>\n                          <div class='panel panel-default' style='margin-right: 5px; width: 50%; height: 132px;'>\n                              <div class='panel-heading'>\n                                  <div style='display: flex;'> <input class='form-check-input' type='radio' name='choise' value='2'\n                                          match='choise'> <span style='margin-left: 10px;'>Range</span> </div>\n                              </div>\n                              <div class='panel-body'>\n                                  <div class='form-group'>\n                                      <div style='display: flex;'>\n                                          <div style='width: 50%; margin-right: 5px;'> <label class='form-check-label'\n                                                  for='exampleRadios1'>Min</label> <select id='stepSelect' match='rangeMin'\n                                                  class='form-control' style='width: 100%;'\n                                                  :disabled='input.choise==2 ? false : true'>\n                                              </select> </div>\n                                          <div style='width: 50%; margin-right: 5px;'> <label class='form-check-label'\n                                                  for='exampleRadios1'>Max</label> <select id='stepSelect' match='rangeMax'\n                                                  class='form-control' style='width: 100%;'\n                                                  :disabled='input.choise==2 ? false : true'>\n                                              </select> </div>\n                                      </div>\n                                  </div>\n                              </div>\n                          </div>\n                      </div>\n                      <div class='panel panel-default' style='margin: 0px !important; padding: 0px !important; height: 240px;'>\n                          <div class='panel-heading'>\n                              <div style='display: flex;'> <input class='form-check-input' type='radio' name='choise' value='3'\n                                      match='choise'> <span style='margin-left: 10px;'>Choise</span> </div>\n                          </div>\n                          <div class='panel-body' style=\"padding-top: 6px !important;\">\n                              <div match='spesific' class='form-group'\n                                  style='display: flex !important; flex-wrap: wrap !important; margin: 0px !important; padding: 0px !important;'>\n                              </div>\n                          </div>\n                      </div>\n                  </form>\n              </div>"
      });
      this.value = "*";
      this.Mount();
    }
  }, {
    key: "Mount",
    value: function Mount() {
      this.addSelectOptions("every");
      this.addSelectOptions("step");
      this.addSelectOptions("rangeMin");
      this.addSelectOptions("rangeMax");
      this.addSpesificOptions("spesific");
      this.eventListen("select");
      this.eventListen("input");
    }
  }, {
    key: "getNumber",
    value: function getNumber(n) {
      return n.toString().padStart(2, "0");
    }
  }, {
    key: "getHasZero",
    value: function getHasZero() {
      return Number(this.hasZero == "true");
    }
  }, {
    key: "addSelectOptions",
    value: function addSelectOptions(attr) {
      var match = this.getElement("*[match=" + attr + "]");

      for (var i = this.getHasZero(); i <= this["every"]; i++) {
        var option = document.createElement("option");
        option.innerText = this.getNumber(i);
        match.appendChild(option);
      }
    }
  }, {
    key: "addSpesificOptions",
    value: function addSpesificOptions(attr) {
      var match = this.getElement("*[match=" + attr + "]");

      for (var i = this.getHasZero(); i <= this["every"]; i++) {
        var div = document.createElement("div");
        div.innerHTML = "\n              <div style=\"margin: 10px;\">\n                  <label class=\"check-container\">\n                      <span>".concat(this.getNumber(i), "</span>\n                      <input value='").concat(i, "' type=\"checkbox\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n              </div>\n            ");
        match.appendChild(div);
      }
    }
  }, {
    key: "makeCron",
    value: function makeCron(choise, input) {
      var cron = "*";

      if (choise == 1) {
        if (input.step == "*") {
          cron = "".concat(input.every);
        } else {
          cron = "".concat(input.every, "/").concat(input.step);
        }
      } else if (choise == 2 && !(input.rangeMin == "*" || input.rangeMax == "*")) {
        var min = parseInt(input.rangeMin);
        var max = parseInt(input.rangeMax);

        if (!(min >= max)) {
          cron = "".concat(input.rangeMin, "-").concat(input.rangeMax);
        }
      } else if (choise == 3 && input.spesific.length != 0) {
        cron = "";
        input.spesific.forEach(function (m) {
          cron += m + ",";
        });
        cron = cron.slice(0, cron.length - 1);
      }

      this.value = cron;
    }
  }, {
    key: "eventListen",
    value: function eventListen(attr) {
      var self = this;
      this.getElements(attr).forEach(function (element) {
        element.addEventListener("change", function (e) {
          var choise = self.getElement("*[match=choise]:checked").value;
          var every = self.getElement("*[match=every]").value;
          var step = self.getElement("*[match=step]").value;
          var rangeMin = self.getElement("*[match=rangeMin]").value;
          var rangeMax = self.getElement("*[match=rangeMax]").value;
          var spesific = Array.prototype.map.call(self.getElements("*[match=spesific] input:checked"), function (input) {
            return input.value;
          });
          self.makeCron(choise, {
            every: every,
            step: step,
            rangeMin: rangeMin,
            rangeMax: rangeMax,
            spesific: spesific
          });
        });
      });
    }
  }]);

  return _class;
}(CronComponent));
customElements.define("cron-expresion-input", /*#__PURE__*/function (_CronComponent2) {
  _inherits(_class2, _CronComponent2);

  var _super3 = _createSuper(_class2);

  function _class2() {
    _classCallCheck(this, _class2);

    return _super3.call(this);
  }

  _createClass(_class2, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.Init({
        self: this,
        style: "\n        cron-expresion-input .cronContainer {\n          position: relative !important;\n        }\n        cron-expresion-input .cronContainer input[type=\"text\"] {\n          width: 98% !important;\n          box-shadow: none !important;\n        }\n        cron-expresion-input .cronContainer button {\n          position: absolute !important;\n          right: 0 !important;\n          border-top-left-radius: 0 !important;\n          border-bottom-left-radius: 0 !important;\n          z-index: 2 !important;\n        }\n        cron-expresion-input .cronContainer input {\n          line-height: normal !important;\n        }\n        cron-expresion-input * {\n          -webkit-box-sizing: border-box !important;\n          -moz-box-sizing: border-box !important;\n          box-sizing: border-box !important;\n        }\n        cron-expresion-input button,\n        cron-expresion-input input,\n        cron-expresion-input select {\n          font-family: inherit !important;\n          font-size: inherit !important;\n          line-height: inherit !important;\n        }\n        cron-expresion-input label {\n          display: inline-block !important;\n          max-width: 100% !important;\n          margin-bottom: 5px !important;\n          font-weight: 700 !important;\n        }\n        cron-expresion-input input[type=\"checkbox\"],\n        cron-expresion-input input[type=\"radio\"] {\n          margin: 4px 0 0 !important;\n          line-height: normal !important;\n        }\n        cron-expresion-input input[type=\"checkbox\"]:focus,\n        cron-expresion-input input[type=\"radio\"]:focus {\n          outline: 5px auto -webkit-focus-ring-color !important;\n          outline-offset: -2px !important;\n        }\n        cron-expresion-input .form-control {\n          display: block !important;\n          width: 100% !important;\n          height: 34px !important;\n          padding: 6px 12px !important;\n          font-size: 14px !important;\n          line-height: 1.42857143 !important;\n          color: #555 !important;\n          background-color: #fff !important;\n          background-image: none !important;\n          border: 1px solid #ccc !important;\n          border-radius: 4px !important;\n          -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;\n          -webkit-transition: border-color ease-in-out 0.15s,\n            -webkit-box-shadow ease-in-out 0.15s !important;\n          -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s !important;\n          transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s !important;\n        }\n        cron-expresion-input .form-control:focus {\n          border-color: #66afe9 !important;\n          outline: 0 !important;\n          -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),\n            0 0 8px rgba(102, 175, 233, 0.6) !important;\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),\n            0 0 8px rgba(102, 175, 233, 0.6) !important;\n        }\n        cron-expresion-input .form-group {\n          margin-bottom: 15px !important;\n        }\n        cron-expresion-input .btn {\n          display: inline-block !important;\n          padding: 6px 12px !important;\n          margin-bottom: 0 !important;\n          font-size: 14px !important;\n          font-weight: 400 !important;\n          line-height: 1.42857143 !important;\n          text-align: center !important;\n          white-space: nowrap !important;\n          vertical-align: middle !important;\n          -ms-touch-action: manipulation !important;\n          touch-action: manipulation !important;\n          cursor: pointer !important;\n          -webkit-user-select: none !important;\n          -moz-user-select: none !important;\n          -ms-user-select: none !important;\n          user-select: none !important;\n          background-image: none !important;\n          border: 1px solid transparent !important;\n          border-radius: 4px !important;\n        }\n        cron-expresion-input .btn:active:focus,\n        cron-expresion-input .btn:focus {\n          outline: 5px auto -webkit-focus-ring-color !important;\n          outline-offset: -2px !important;\n        }\n        cron-expresion-input .btn:focus,\n        cron-expresion-input .btn:hover {\n          color: #333 !important;\n          text-decoration: none !important;\n        }\n        cron-expresion-input .btn:active {\n          background-image: none !important;\n          outline: 0 !important;\n          -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125) !important;\n          box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125) !important;\n        }\n        cron-expresion-input .btn-custom {\n          color: #fff !important;\n          background-color: #f0ad4e !important;\n          border-color: #eea236 !important;\n        }\n        cron-expresion-input .btn-custom:focus {\n          color: #fff !important;\n          background-color: #ec971f !important;\n          border-color: #985f0d !important;\n          outline: 0 !important;\n        }\n        cron-expresion-input .btn-custom:hover {\n          color: #fff !important;\n          background-color: #ec971f !important;\n          border-color: #d58512 !important;\n        }\n        cron-expresion-input .btn-custom:active {\n          color: #fff !important;\n          background-color: #ec971f !important;\n          border-color: #d58512 !important;\n          outline: 0 !important;\n        }\n        cron-expresion-input .btn-custom:active:focus,\n        cron-expresion-input .btn-custom:active:hover {\n          color: #fff !important;\n          background-color: #d58512 !important;\n          border-color: #985f0d !important;\n        }\n        cron-expresion-input .btn-custom:active {\n          background-image: none !important;\n        }\n        cron-expresion-input .fade {\n          opacity: 0 !important;\n          -webkit-transition: opacity 0.15s linear !important;\n          -o-transition: opacity 0.15s linear !important;\n          transition: opacity 0.15s linear !important;\n        }\n        cron-expresion-input .nav {\n          padding-left: 0 !important;\n          margin-bottom: 0 !important;\n          list-style: none !important;\n        }\n        cron-expresion-input .nav > li {\n          position: relative !important;\n          display: block !important;\n        }\n        cron-expresion-input .nav > li > a {\n          position: relative !important;\n          display: block !important;\n          padding: 10px 15px !important;\n        }\n        cron-expresion-input .nav > li > a:focus,\n        cron-expresion-input .nav > li > a:hover {\n          text-decoration: none !important;\n          background-color: #eee !important;\n        }\n        cron-expresion-input .nav-tabs {\n          border-bottom: 1px solid #ddd !important;\n        }\n        cron-expresion-input .nav-tabs > li {\n          float: left !important;\n          margin-bottom: -1px !important;\n        }\n        cron-expresion-input .nav-tabs > li > a {\n          margin-right: 2px !important;\n          line-height: 1.42857143 !important;\n          border: 1px solid transparent !important;\n          border-radius: 4px 4px 0 0 !important;\n        }\n        cron-expresion-input .nav-tabs > li > a:hover {\n          border-color: #eee #eee #ddd !important;\n        }\n        cron-expresion-input .nav-tabs > li.active > a,\n        cron-expresion-input .nav-tabs > li.active > a:focus,\n        cron-expresion-input .nav-tabs > li.active > a:hover {\n          color: #555 !important;\n          cursor: default !important;\n          background-color: #fff !important;\n          border: 1px solid #ddd !important;\n          border-bottom-color: transparent !important;\n        }\n        cron-expresion-input .tab-content > .tab-pane {\n          display: none !important;\n        }\n        cron-expresion-input .tab-content > .active {\n          display: block !important;\n        }\n        cron-expresion-input .panel {\n          margin-bottom: 20px !important;\n          background-color: #fff !important;\n          border: 1px solid transparent !important;\n          border-radius: 4px !important;\n          -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) !important;\n          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) !important;\n        }\n        cron-expresion-input .panel-body {\n          padding: 15px !important;\n        }\n        cron-expresion-input .panel-heading {\n          padding: 10px 15px !important;\n          border-bottom: 1px solid transparent !important;\n          border-top-left-radius: 3px !important;\n          border-top-right-radius: 3px !important;\n        }\n        cron-expresion-input .panel-default {\n          border-color: #ddd !important;\n        }\n        cron-expresion-input .panel-default > .panel-heading {\n          color: #333 !important;\n          background-color: #f5f5f5 !important;\n          border-color: #ddd !important;\n        }\n        cron-expresion-input .close {\n          float: right !important;\n          font-size: 21px !important;\n          font-weight: 700 !important;\n          line-height: 1 !important;\n          color: #000 !important;\n          text-shadow: 0 1px 0 #fff !important;\n        }\n        cron-expresion-input .close:focus,\n        cron-expresion-input .close:hover {\n          color: #000 !important;\n          text-decoration: none !important;\n          cursor: pointer !important;\n          opacity: 0.5 !important;\n        }\n        cron-expresion-input button.close {\n          -webkit-appearance: none !important;\n          padding: 0 !important;\n          cursor: pointer !important;\n          background: 0 0 !important;\n          border: 0 !important;\n        }\n        cron-expresion-input .modal {\n          position: fixed !important;\n          top: 0 !important;\n          right: 0 !important;\n          bottom: 0 !important;\n          left: 0 !important;\n          z-index: 1050 !important;\n          display: none !important;\n          overflow: hidden !important;\n          -webkit-overflow-scrolling: touch !important;\n          outline: 0 !important;\n        }\n        cron-expresion-input .modal-dialog {\n          position: relative !important;\n          width: auto !important;\n          margin: 10px !important;\n        }\n        cron-expresion-input .modal-content {\n          position: relative !important;\n          background-color: #fff !important;\n          -webkit-background-clip: padding-box !important;\n          background-clip: padding-box !important;\n          border: 1px solid #999 !important;\n          border: 1px solid rgba(0, 0, 0, 0.2) !important;\n          border-radius: 6px !important;\n          outline: 0 !important;\n          -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5) !important;\n          box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5) !important;\n        }\n        cron-expresion-input .modal-header {\n          padding: 15px !important;\n          border-bottom: 1px solid #e5e5e5 !important;\n        }\n        cron-expresion-input .modal-header .close {\n          margin-top: -2px !important;\n        }\n        cron-expresion-input .modal-body {\n          position: relative !important;\n          padding: 15px !important;\n        }\n        cron-expresion-input .modal-dialog {\n          width: 600px !important;\n          margin: 30px auto !important;\n        }\n        cron-expresion-input .modal-header:after,\n        cron-expresion-input .modal-header:before,\n        cron-expresion-input .nav:after,\n        cron-expresion-input .nav:before,\n        cron-expresion-input .panel-body:after,\n        cron-expresion-input .panel-body:before {\n          display: table !important;\n          content: \" \" !important;\n        }\n        cron-expresion-input .modal-header:after,\n        cron-expresion-input .nav:after,\n        cron-expresion-input .panel-body:after {\n          clear: both !important;\n        }\n        cron-expresion-input .show {\n          display: block !important;\n        }\n        cron-expresion-input .form-check-input, cron-expresion-input .check-container span {\n          position: relative;top: -1.5px;\n        }\n        ",
        template: "\n      <div class=\"cronInput\">\n          <div class=\"cronContainer\" style=\"display: flex !important;\"> <input id=\"cronInput\" type=\"text\" class=\"form-control\"\n                  placeholder=\"Cron Expresion\"> <button type=\"button\" class=\"cronButtonUI btn btn-custom\"\n                  style=\"height: 34px;font-size: 114% !important;\" @click=\"openCronUI\">\n                  <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-pencil-square\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n                  <path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"/>\n                  <path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z\"/>\n                </svg>\n                  </button>\n          </div>\n      </div>\n      <div class=\"modal\" tabindex=\"-1\">\n          <div class=\"modal-dialog\" style=\"width: 860px !important;\">\n              <div class=\"modal-content\">\n                  <div class=\"modal-header\" style=\"height: 44px;\">\n                      <span class=\"close cronClose\">\n                          <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-x-circle\" fill=\"currentColor\">\n                              <path fill-rule=\"evenodd\"\n                                  d=\"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\" />\n                              <path fill-rule=\"evenodd\"\n                                  d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\" />\n                          </svg>\n                      </span>\n                      <span class=\"close cronClose\" style=\"margin-right: 10px;\">\n                          <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-check-circle\" fill=\"currentColor\">\n                              <path fill-rule=\"evenodd\"\n                                  d=\"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\" />\n                              <path fill-rule=\"evenodd\"\n                                  d=\"M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z\" />\n                          </svg>\n                      </span>\n                  </div>\n                  <div class=\"modal-body\" style=\"padding-top: 0px !important;\">\n                      <ul class=\"nav nav-tabs\" style=\"margin-top: 13px;\">\n                          <li class=\"nav-item active in\"><a class=\"nav-link\">Minutes</a></li>\n                          <li class=\"nav-item\"><a class=\"nav-link\">Hours</a></li>\n                          <li class=\"nav-item\"><a class=\"nav-link\">Day of Month</a></li>\n                          <li class=\"nav-item\"><a class=\"nav-link\">Month</a></li>\n                          <li class=\"nav-item\"><a class=\"nav-link\">Days of week</a></li>\n                      </ul>\n                      <div class=\"tab-content\" style=\"margin-top: 13px !important;\">\n                          <div class=\"tab-pane active in\">\n                              <cron-fields pos=\"0\" input=\"minute\" hasZero=\"true\" every=\"59\" />\n                          </div>\n                          <div class=\"tab-pane fade\">\n                              <cron-fields pos=\"1\" input=\"hour\" hasZero=\"true\" every=\"23\" />\n                          </div>\n                          <div class=\"tab-pane fade\">\n                              <cron-fields pos=\"2\" input=\"dayOfMonth\" every=\"31\" />\n                          </div>\n                          <div class=\"tab-pane fade\">\n                              <cron-fields pos=\"3\" input=\"month\" every=\"12\" />\n                          </div>\n                          <div class=\"tab-pane fade\">\n                              <cron-fields pos=\"4\" input=\"dayOfWeek\" hasZero=\"true\" every=\"6\" />\n                          </div>\n                      </div>\n                  </div>\n              </div>\n          </div>\n      </div>\n      "
      });
      var self = this;
      self.setValue(self.getAttribute("value"));
      this.addEvent(".cronButtonUI", "click", function () {
        self.modalToggle();
      });
      this.addEvent(".cronClose", "click", function () {
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
      this.addEvent("cron-fields", "change", function (e) {
        var value = true;
        var node = e.parentNode;

        while (value) {
          node = node.parentNode;
          if (node.nodeName == "CRON-FIELDS") value = false;
        }

        self.setValue(self.generateCron(parseInt(node.getAttribute("pos")), self.getAttribute("value"), node.value));
      });
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.setAttribute("value", value);
      document.getElementById("cronInput").setAttribute("value", value);
    }
  }, {
    key: "modalToggle",
    value: function modalToggle() {
      this.getElement(".modal").classList.toggle("show");
    }
  }, {
    key: "generateCron",
    value: function generateCron(pos, values, value) {
      var values = values.split(" ");
      values[pos] = value;
      return values.join(" ");
    }
  }]);

  return _class2;
}(CronComponent));
