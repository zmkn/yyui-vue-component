import spinnerStyle from './spinner.component.css?string';
import spinnerTemplate from './spinner.component.html?string';

export class SpinnerComponent extends HTMLElement {
  #window = window;
  #document = this.#window.document;

  #createStyles = (css) => {
    const style = this.#document.createElement('style');
    style.textContent = css;
    return style;
  }

  #createElements = (html) => {
    const wrapper = this.#document.createElement('template');
    wrapper.innerHTML = html;
    return wrapper.content.cloneNode(true);
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const styles = this.#createStyles(spinnerStyle);
    const elements = this.#createElements(spinnerTemplate);
    shadow.appendChild(styles);
    shadow.appendChild(elements);
  }

  self() {
    return this;
  }

  parent() {
    return this.parentNode;
  }
}
