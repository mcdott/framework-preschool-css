class NumberLine extends HTMLElement {
  static css = `
          :host {
              display: block;
              width: 60px;
              height: 500px;
              background: var(--fill-color, #28a745);
              border-radius: 0.75em;
              border: 5px solid #add8e6;
              overflow: hidden;
          }
  
          .fill {
              width: 100%;
              height: 0%;
              background: var(--color-lightest, #ffffff);
              transition: height 0.5s;
          }
      `;

  // Look for changes to the "sum" attribute
  static get observedAttributes() {
    return ["sum"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    const fill = document.createElement("div");

    style.innerHTML = NumberLine.css;
    fill.classList.add("fill");

    this.shadowRoot.append(style, fill);
  }

  get sum() {
    const value = this.getAttribute("sum");

    return Number(value);
  }

  set sum(value) {
    this.setAttribute("sum", value);
  }

  attributeChangedCallback(name) {
    if (name === "sum") {
      this.shadowRoot.querySelector(".fill").style.height = `${
        100 - this.sum * 10
      }%`;
    }
  }
}

customElements.define("number-line", NumberLine);
