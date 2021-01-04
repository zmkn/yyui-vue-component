import Vue from 'vue';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

var _component = new WeakMap();

var _query = new WeakMap();

var VueComponent = /*#__PURE__*/function () {
  function VueComponent(component) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, VueComponent);

    _component.set(this, {
      writable: true,
      value: void 0
    });

    _query.set(this, {
      writable: true,
      value: function value(el) {
        if (typeof el === "string") {
          var selected = document.querySelector(el);

          if (!selected) {
            return document.createElement("div");
          }

          return selected;
        } else {
          return el;
        }
      }
    });

    var vueInstance = Vue.extend(component);

    _classPrivateFieldSet(this, _component, new vueInstance(options));
  }

  _createClass(VueComponent, [{
    key: "get",
    value: function get(key) {
      return _classPrivateFieldGet(this, _component)[key];
    }
  }, {
    key: "set",
    value: function set(key, value) {
      _classPrivateFieldGet(this, _component)[key] = value;
    }
  }, {
    key: "mount",
    value: function mount(el, hydrating) {
      _classPrivateFieldGet(this, _component).$mount(el, hydrating);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _classPrivateFieldGet(this, _component).$destroy();
    }
  }, {
    key: "insertTo",
    value: function insertTo(el) {
      _classPrivateFieldGet(this, _component).$mount();

      _classPrivateFieldGet(this, _query).call(this, el).appendChild(_classPrivateFieldGet(this, _component).$el);
    }
  }, {
    key: "original",
    value: function original() {
      return _classPrivateFieldGet(this, _component);
    }
  }]);

  return VueComponent;
}();

export { VueComponent };
