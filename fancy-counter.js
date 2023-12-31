// Create a template
const template = document.createElement("template");
// Set the content of the template
template.innerHTML = `
	<style>
		.container {
			margin: 3px;
			display: flex;
			font-family: "Baloo 2", sans-serif;
            font-size: 1em;
		}

		.button {
			padding: 1em;
			background-color: #f0e68c;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 5px solid #add8e6;
			border-bottom: 5px solid #add8e6;
		}

		.left {
			border-top-left-radius: 0.75em;
			border-bottom-left-radius: 0.75em;
			border-left: 5px solid #add8e6;
		}

		.right {
			border-top-right-radius: 0.75em;
			border-bottom-right-radius: 0.75em;
			border-right: 5px solid #add8e6;
		}

		.arrow {
			width: 8px;
			height: 8px;
			border-top: 5px solid #28a745;
			border-right: 5px solid #28a745;
		}

		.left .arrow {
			transform: rotate(-135deg);
		}

		.right .arrow {
			transform: rotate(45deg);
		}

		.display {
			padding: 1em;
			border-top: 5px solid #add8e6;
			border-bottom: 5px solid #add8e6;
		}
	</style>
	<div class="container">
		<div class="button left">
			<div class="arrow"></div>
		</div>

		<div class="display">0</div>

		<div class="button right">
			<div class="arrow"></div>
		</div>
	</div>
`;

class FancyCounter extends HTMLElement {
  constructor() {
    super();

    const tempNode = template.content.cloneNode(true);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(tempNode);

    this._leftButton = this._shadowRoot.querySelector(".left");
    this._rightButton = this._shadowRoot.querySelector(".right");
    this._display = this._shadowRoot.querySelector(".display");

    this._value = 0;
    this._step = 1;
    this._max = 10;
    this._min = 0;

    this._update();

    this._increment = this._increment.bind(this);
    this._decrement = this._decrement.bind(this);
  }

  _increment(e) {
    const newValue = this._value + this._step;
    if (newValue <= this._max) {
      this._value = newValue;
    }
    this._update();
  }

  _decrement(e) {
    const newValue = this._value - this._step;
    if (newValue >= this._min) {
      this._value = newValue;
    }
    this._update();
  }

  _update() {
    // Update the display
    this._display.innerHTML = this._value;

    // Update the value attribute only if it's different
    const currentValue = parseInt(this.getAttribute("value"));
    if (currentValue !== this._value) {
      this.setAttribute("value", this._value);
    }

    // Dispatch the change event
    this.dispatchEvent(new Event("change"));
  }

  // Tell this component it should look for changes to value, min, max, and step
  static get observedAttributes() {
    return ["value", "min", "max", "step"];
  }

  // Handle changes to attributes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value" && this._value !== parseInt(newValue)) {
      this._value = parseInt(newValue);
      this._display.innerHTML = this._value; // Update display directly
    } else if (name === "min") {
      this._min = parseInt(newValue);
    } else if (name === "max") {
      this._max = parseInt(newValue);
    } else if (name === "step") {
      this._step = parseInt(newValue);
    }
  }

  connectedCallback() {
    this._rightButton.addEventListener("click", this._increment);
    this._leftButton.addEventListener("click", this._decrement);
  }

  disconnectedCallback() {
    this._rightButton.removeEventListener("click", this._increment);
    this._leftButton.addEventListener("click", this._decrement);
  }
}

customElements.define("fancy-counter", FancyCounter);
