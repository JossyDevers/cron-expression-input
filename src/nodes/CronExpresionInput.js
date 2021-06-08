var ceInputLangInternal = {};
import lang from "../cultures";
if (typeof ceInputLang == "undefined") ceInputLangInternal = lang;
else ceInputLangInternal = ceInputLang;

import { CronComponent } from "./CronComponent";
import { CronExpresionInputTemplateGenerator } from "../templates/CronExpresionInputTemplate";

const cron = require("cron-validator");
const cronstrue = require('cronstrue');

export class CronExpresionInput extends CronComponent {
    constructor() {
        super();
    }

    connectedCallback() {
        this.width = this.getAttribute("width");
        this.height = this.getAttribute("height");
        this.required = this.getAttribute("required") == "true";
        this.hotValidate = this.getAttribute("hotValidate") == "true";
        var color = this.getAttribute("color").replace("#", "");
        this.colorMain = "#" + color;
        this.colorSecond = this.increaseBrightness(color, 10);

        this.Init({
            self: this,
        });

        var template = CronExpresionInputTemplateGenerator(this, ceInputLangInternal);

        var self = this;
        this.Create(self, template);
        this.setValue(this.getAttribute("value"));

        var input1 = this.getElement(".cronInsideInput");
        input1.addEventListener("keydown", (e) => self.validateLongitud(e));
        input1.addEventListener("keypress", (e) => self.validateLongitud(e));
        input1.addEventListener("keyup", (e) => self.validateLongitud(e));
        this.addEvent(".cronButtonUI", "click", () => {
            self.querySelectorAll("form").forEach((element) => element.reset());
            if (self.getElementsByClassName("cronInsideInput").length != 0) {
                self.currentValue = self.getElementsByClassName("cronInsideInput")[0].value;
                if (self.currentValue.split(" ").length == 5) self.getCron(self.currentValue);
            }
            self.modalToggle();
        });
        this.addEvent(".cronClose", "click", () => {
            self.setValue(self.currentValue);
            self.modalToggle();
        });
        this.addEvent(".cronSave", "click", () => self.modalToggle());
        this.addEvent("li > a", "click", (scope) => {
            var index = 0;
            self.getElements("li > a").forEach(function (elem, i) {
                elem.parentNode.setAttribute("class", "nav-link");
                if (elem == scope) {
                    index = i;
                }
            });
            scope.parentNode.setAttribute("class", "nav-link active in");
            var elements = self.getElements("cron-fields");
            elements.forEach((elem) => elem.parentNode.setAttribute("class", 'tab-pane fade"'));
            elements[index].parentNode.setAttribute("class", "tab-pane active in");
        });
        var formParent = self.querySelector(".cronInsideInput").closest("form");
        if (formParent != null) {
            formParent.closest("form").addEventListener("submit", (e) => {
                if (!self.validator(self)) e.preventDefault();
            });
        }
        if (self.hotValidate) {
            this.addEvent(".cronInsideInput", "change", (e) => self.validator(self));
        }
        this.addEvent("cron-fields", "change", (e) => {
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

        this.getElements(".propagationClass").forEach((element) =>
            element.addEventListener("input", (e) =>
                e.stopPropagation())
        );

        self.validator(self);
    }
    validator(self) {
        var insideInput = self.querySelector(".cronInsideInput");
        var error = self.getElement(".cronexpressionError");
        if (
            (insideInput.value.length == 0 && self.required) ||
            (insideInput.value.length != 0 && !cron.isValidCron(insideInput.value))
        ) {
            error.classList.replace("hiden", "show");
            return false;
        }
        error.classList.replace("show", "hiden");
        self.setValue(insideInput["value"]);
        return true;
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
        if (!expresion.includes(separator) && expresion != "*") step.every = expresion;
        else if (expresion.includes("*") && expresion.includes(separator)) step.step = expresion.split(separator)[1];
        else if (expresion.includes(separator)) {
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
        choises.forEach((choise) => choise.removeAttribute("checked"));
        choises[type - 1].checked = true;
        switch (type) {
            case 1:
                var step = this.getTypeStep(value);
                var decrementStep = 1 - decrement;
                form.querySelector("*[match=every]").selectedIndex =
                    parseInt(step["every"]) + decrementStep;
                form.querySelector("*[match=step]").selectedIndex =
                    parseInt(step["step"]) + decrementStep;
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
                    .forEach((element, index) => {
                        if (cs.includes((index + decrement).toString())) element.checked = true;
                    });
                break;
        }
    }
    validateLongitud(e) {
        var values = e.target.value.trim().split(" ");
        if (values.length > 5) e.target.value = values.slice(0, 5).join(" ");
        this.sendEvent();
    }
    setValue(value) {
        var defaultArray = ["*", "*", "*", "*", "*"];
        if (value == undefined) return defaultArray.join(" ");
        else if (value.length > 0) {
            var array = value.trim().split(" ");
            for (var i = 0; i < 5; i++)
                if (array[i] != undefined) defaultArray[i] = array[i];
            value = defaultArray.join(" ");
        }
        var input3 = this.getElement(".cronInsideInput");
        input3.value = value;

        this.querySelector(".inputCronMsg").value = cronstrue.toString(value);
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