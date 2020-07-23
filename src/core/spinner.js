import {
  SpinnerComponent
} from './spinner.component.js';
import {
  SpinnerOverlayComponent
} from './spinner.overlay.component.js';

export class Spinner {
  #window = window;
  #document = this.#window.document;
  #spinnerElement;

  #mount = {
    status: false,
    mountTimestamp: 0,
    unmountTimestamp: 0
  }

  #options = {
    overlay: true
  }

  static options = {
    overlay: true
  }

  static clear = () => {
    const instanceAll = this.instanceAll;
    while (instanceAll.length > 0) {
      instanceAll[0].unmount();
      instanceAll.splice(0, 1);
    }
  }

  static instanceAll = [];

  #create = () => {
    const spinnerElement = new SpinnerComponent();
    if (this.#options.overlay) {
      let overlayName = this.#options.overlay;
      const spinnerOverlayElement = new SpinnerOverlayComponent();
      if ({}.toString.call(overlayName) !== '[object String]') {
        overlayName = 'default';
      }
      spinnerOverlayElement.setAttribute('class', `spinner-overlay-${overlayName}`);
      spinnerOverlayElement.appendChild(spinnerElement);
      return spinnerOverlayElement;
    } else {
      return spinnerElement;
    }
  }

  #connect = (spinnerElement) => {
    this.#spinnerElement = spinnerElement;
    return spinnerElement;
  }

  #register = () => {
    if (!this.#window.customElements.get('yy-spinner-component')) {
      this.#window.customElements.define('yy-spinner-component', SpinnerComponent);
    }
    if (this.#options.overlay) {
      if (!this.#window.customElements.get('yy-spinner-overlay-component')) {
        this.#window.customElements.define('yy-spinner-overlay-component', SpinnerOverlayComponent);
      }
    }
  }

  constructor(options = {}) {
    this.#options = Object.assign(this.#options, Spinner.options, options);
    this.#register();
    this.#connect(this.#create());
    Spinner.instanceAll.push(this);
  }

  mount(millisecond = 0) {
    if (!this.#mount.status) {
      const mount = () => {
        if (!this.#spinnerElement.parent()) {
          this.#document.body.appendChild(this.#spinnerElement);
        }
      }
      this.#mount.status = true;
      clearTimeout(this.#mount.mountTimestamp);
      clearTimeout(this.#mount.unmountTimestamp);
      if (millisecond > 0) {
        this.#mount.mountTimestamp = setTimeout(() => {
          mount();
          clearTimeout(this.#mount.mountTimestamp);
        }, millisecond);
      } else {
        mount();
      }
    }
  }

  unmount(millisecond = 0) {
    if (this.#mount.status) {
      const unmount = () => {
        if (this.#spinnerElement.parent()) {
          this.#spinnerElement.parent().removeChild(this.#spinnerElement);
        }
      }
      this.#mount.status = false;
      clearTimeout(this.#mount.mountTimestamp);
      clearTimeout(this.#mount.unmountTimestamp);
      if (millisecond > 0) {
        this.#mount.unmountTimestamp = setTimeout(() => {
          unmount();
          clearTimeout(this.#mount.unmountTimestamp);
        }, millisecond);
      } else {
        unmount();
      }
    }
  }

  isMount() {
    return this.#mount.status;
  }

  isMountDocument() {
    return !!this.#spinnerElement.parent();
  }
}
