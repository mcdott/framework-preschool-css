class NumberLine extends HTMLElement {
  // Static getter for the template to not conflict with the fancy-counter template
  static get template() {
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1em;            
        }

        .number-labels {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 0%;
          color: #ff6384;
          font-size: 1em;
        }

        .outline {
          display: block;
          width: 75px;
          height: 650px;
          background: var(--fill-color, #28a745);
          border-radius: 0.75em;
          border: 5px solid #add8e6;
          overflow: hidden;
        }

        .fill-first {
          width: 100%;
          height: 0%;
          background: var(--color-lightest, #ffffff);
          transition: height 0.5s;
        }

        .fill-second {
          width: 100%;
          height: 0%;
          background: red;
          transition: height 0.5s;
        }
        </style>
      <div class="container">
        <div class="number-labels">
          <h4>10 -</h4>
          <h4>9 -</h4>
          <h4>8 -</h4>
          <h4>7 -</h4>
          <h4>6 -</h4>
          <h4>5 -</h4>
          <h4>4 -</h4>
          <h4>3 -</h4>
          <h4>2 -</h4>
          <h4>1 -</h4>
          <h4>0 -</h4>
        </div>
        <div class="outline">
          <div class="fill-first"></div>
          <div class="fill-second"></div>
        </div>
      </div>
    `;
    return template;
  }

  // Look for changes to the "first-value" and "second-value" attributes
  static get observedAttributes() {
    return ["first-value", "second-value"];
  }

  constructor() {
    super();
    console.log("NumberLine constructor called");

    const tempNode = NumberLine.template.content.cloneNode(true);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(tempNode);

    this._shadowRoot.querySelector(".fill-first").style.height = `${
      100 - this.firstValue * 10
    }%`;
  }

  get firstValue() {
    const value = this.getAttribute("first-value");
    return Number(value);
  }

  set firstValue(value) {
    this.setAttribute("first-value", value);
  }

  connectedCallback() {
    console.log("NumberLine connected to DOM");
    this.updateFillHeight();
  }

  updateFillHeight() {
    const fillHeight = 100 - this.firstValue * 10;
    console.log("Updating fill height to:", fillHeight + "%");
    this._shadowRoot.querySelector(
      ".fill-first"
    ).style.height = `${fillHeight}%`;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute changed: ${name}, from ${oldValue} to ${newValue}`);
    if (name === "first-value" || name === "second-value") {
      this.updateFillHeight();
    }
  }
}

customElements.define("number-line", NumberLine);
