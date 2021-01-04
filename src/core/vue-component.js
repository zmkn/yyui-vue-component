import Vue from "vue";

export class VueComponent {
  #component;

  #query = el => {
    if (typeof el === "string") {
      const selected = document.querySelector(el);
      if (!selected) {
        return document.createElement("div");
      }
      return selected;
    } else {
      return el;
    }
  };

  constructor(component, options = {}) {
    const vueInstance = Vue.extend(component);
    this.#component = new vueInstance(options);
  }

  get(key) {
    return this.#component[key];
  }

  set(key, value) {
    this.#component[key] = value;
  }

  mount(el, hydrating) {
    this.#component.$mount(el, hydrating);
  }

  destroy() {
    this.#component.$destroy();
  }

  insertTo(el) {
    this.#component.$mount();
    this.#query(el).appendChild(this.#component.$el);
  }

  original() {
    return this.#component;
  }
}
