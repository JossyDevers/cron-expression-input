export default class extends HTMLElement {
    constructor() {
        super();
    }
    Init(state) {
        this.state = state;

        if(this.state.props != undefined) {
            this.state.props.forEach((p) => {
                this.state.self[p] = state.self.getAttribute(p);
            });
        }
    }
    Create(self) {
        var template = document.querySelector('template[id=' + this.state.template + ']');
        const clone = document.importNode(template.content, true);
        self.appendChild(clone);
    }
}