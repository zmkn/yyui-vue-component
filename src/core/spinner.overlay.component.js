import spinnerOverlayStyle from './spinner.overlay.component.css?string';

export class SpinnerOverlayComponent extends HTMLElement {
  #window = window;
  #document = this.#window.document;

  #createStyles = (css) => {
    const style = this.#document.createElement('style');
    style.textContent = css;
    return style;
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const styles = this.#createStyles(spinnerOverlayStyle);
    const slotElement = this.#document.createElement('slot');
    shadow.appendChild(styles);
    shadow.appendChild(slotElement);
  }

  self() {
    return this;
  }

  parent() {
    return this.parentNode;
  }
}
