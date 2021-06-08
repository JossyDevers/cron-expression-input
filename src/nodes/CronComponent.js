export class CronComponent extends HTMLElement {
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
  getNumber(n) {
    return n.toString().padStart(2, "0");
  }
  getHasZero() {
    return this.hasZero ? 0 : 1;
  }
  addEvent(className, event, handle) {
    this.getElements(className).forEach((element) =>
      element.addEventListener(event, (e) => handle(e.target))
    );
  }
  increaseBrightness(hex, percent) {
    hex = hex.replace(/^\s*#|\s*$/g, "");
    if (hex.length == 3) hex = hex.replace(/(.)/g, "$1$1");

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
