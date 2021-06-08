export function EspesificOptionTemplateGenerator(getNumber, number) {
    return `
      <div style="margin: 10px;">
          <label class="container">
              <span class="numberValue">${getNumber}</span>
              <input class="propagationClass" value='${number}' type="checkbox">
              <span class="checkmark"></span>
          </label>
      </div>
    `;
}