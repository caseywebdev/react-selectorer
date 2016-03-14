((function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react', 'react-dom', 'react-list'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(
      require('react'),
      require('react-dom'),
      require('react-list')
    );
  } else {
    root.ReactSelectorer = factory(
      root.React,
      root.ReactDOM,
      root.ReactList
    );
  }
})(this, function (React, ReactDOM, ReactList) {
  return (function () {
var define;
var require;

(function () {
  'use strict';

  // Store modules in an object.
  var mods = {};

  // Define just adds to the module storage.
  define = function (name, deps, cb) {
    if (!cb) {
      cb = deps;
      deps = ['require', 'exports', 'module'];
    }
    mods[name] = {isResolved: false, deps: deps, exports: {}, cb: cb};
  };

  // Fool the masses.
  define.amd = {};

  // Require the given module, recursively resolving dependencies as
  // necessary.
  require = function (name, requester) {

    // Special cases...
    if (name === 'require') return require;
    if (name === 'exports') return mods[requester].exports;
    if (name === 'module') return mods[requester];

    // Pull the module from the storage object.
    var mod = mods[name];
    if (!mod) throw new Error("Cannot find module '" + name + "'");

    // Return immediately if the module has already been resolved.
    if (mod.isResolved) return mod.exports;

    // Otherwise, resolve all dependencies.
    mod.isResolved = true;
    var deps = mod.deps || [];
    for (var i = 0, l = deps.length; i < l; ++i) {
      deps[i] = require(deps[i], name);
    }
    var val =
      typeof mod.cb === 'function' ?
      mod.cb.apply(mod.exports, deps) :
      mod.cb;

    // Delete obsolete variables.
    delete mod.cb;
    delete mod.deps;

    // Finally, return the module's return value, or fallback to exports.
    if (val !== undefined) mod.exports = val;
    return mod.exports;
  };
})();
define('react', ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = React;
});
define('option', ['exports', 'module', 'react'], function (exports, module, _react) {
  'use strict';

  var LAST_MOUSE = { x: 0, y: 0 };

  var handleMouseMove = function handleMouseMove(onActivate, index, _ref) {
    var x = _ref.screenX;
    var y = _ref.screenY;

    if (x === LAST_MOUSE.x && y === LAST_MOUSE.y) return;
    LAST_MOUSE.x = x;
    LAST_MOUSE.y = y;
    onActivate(index);
  };

  var Component = function Component(props) {
    var index = props.index;
    var isActive = props.isActive;
    var onActivate = props.onActivate;
    var onSelect = props.onSelect;
    var renderer = props.renderer;

    return renderer({
      props: {
        onClick: onSelect.bind(null, index),
        onMouseMove: handleMouseMove.bind(null, onActivate, index)
      },
      index: index,
      isActive: isActive
    });
  };

  Component.propTypes = {
    index: _react.PropTypes.number.isRequired,
    isActive: _react.PropTypes.bool.isRequired,
    onActivate: _react.PropTypes.func.isRequired,
    onSelect: _react.PropTypes.func.isRequired,
    renderer: _react.PropTypes.func.isRequired
  };

  module.exports = Component;
});
define('react-list', ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = ReactList;
});
define('options', ['exports', 'module', 'option', 'react-list', 'react'], function (exports, module, _option, _reactList, _react) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Option = _interopRequireDefault(_option);

  var _ReactList = _interopRequireDefault(_reactList);

  var _React = _interopRequireDefault(_react);

  var renderOption = function renderOption(props, index, key) {
    var activeIndex = props.activeIndex;
    var onActivate = props.onActivate;
    var onSelect = props.onSelect;
    var optionRenderer = props.optionRenderer;

    return _React['default'].createElement(_Option['default'], {
      index: index,
      isActive: index === activeIndex,
      key: key,
      onActivate: onActivate.bind(null, index),
      onSelect: onSelect.bind(null, index),
      renderer: optionRenderer
    });
  };

  var Component = function Component(props) {
    var activeIndex = props.activeIndex;
    var length = props.length;
    var listProps = props.listProps;
    var renderer = props.renderer;

    return renderer({
      props: {},
      options: _React['default'].createElement(_ReactList['default'], _extends({
        initialIndex: activeIndex,
        itemRenderer: renderOption.bind(null, props),
        length: length,
        type: 'uniform',
        updateOnActiveIndexChange: activeIndex
      }, listProps))
    });
  };

  Component.propTypes = {
    activeIndex: _react.PropTypes.number.isRequired,
    length: _react.PropTypes.number.isRequired,
    listProps: _react.PropTypes.object,
    onActivate: _react.PropTypes.func.isRequired,
    onSelect: _react.PropTypes.func.isRequired,
    optionRenderer: _react.PropTypes.func.isRequired,
    renderer: _react.PropTypes.func.isRequired
  };

  module.exports = Component;
});
define('react-dom', ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = ReactDOM;
});
define('selector', ['exports', 'module', 'react-dom', 'options', 'react'], function (exports, module, _reactDom, _options, _react) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _Options = _interopRequireDefault(_options);

  var _React = _interopRequireDefault(_react);

  var _default = (function (_Component) {
    _inherits(_default, _Component);

    function _default() {
      var _this = this;

      _classCallCheck(this, _default);

      _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);

      this.state = {
        activeIndex: this.props.initialActiveIndex,
        hasFocus: false
      };

      this.handleFocus = function (_ref) {
        var target = _ref.target;
        var silentFocus = _this.silentFocus;
        var container = _this.container;

        if (silentFocus) return _this.silentFocus = false;

        if (container && document.documentElement.contains(target)) {
          _this.setFocus((0, _reactDom.findDOMNode)(container).contains(target));
        }
      };
    }

    _createClass(_default, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.autoFocus) this.focus();
        document.addEventListener('focus', this.handleFocus, true);
        document.addEventListener('click', this.handleFocus);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.query !== this.props.query) this.setActiveIndex(0);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        if (this.silentFocus) {
          if (!(0, _reactDom.findDOMNode)(this.container).contains(document.activeElement)) {
            (0, _reactDom.findDOMNode)(this.input).focus();
          }
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        document.removeEventListener('focus', this.handleFocus, true);
        document.removeEventListener('click', this.handleFocus);
      }
    }, {
      key: 'incrActiveIndex',
      value: function incrActiveIndex(dir) {
        this.setActiveIndex(this.state.activeIndex + dir);
      }
    }, {
      key: 'setActiveIndex',
      value: function setActiveIndex(i) {
        i = Math.max(0, Math.min(i, this.props.length - 1));
        this.setState({ activeIndex: i }, this.scrollAroundActiveIndex.bind(this));
        if (!this.state.hasFocus) this.props.onSelect(i);
      }
    }, {
      key: 'scrollAroundActiveIndex',
      value: function scrollAroundActiveIndex() {
        if (this.list) this.list.scrollAround(this.state.activeIndex);
      }
    }, {
      key: 'focus',
      value: function focus() {
        (0, _reactDom.findDOMNode)(this.input).focus();
        this.setFocus(true);
      }
    }, {
      key: 'blur',
      value: function blur() {
        (0, _reactDom.findDOMNode)(this.input).blur();
        this.setFocus(false);
      }
    }, {
      key: 'open',
      value: function open() {
        this.setFocus(true, true);
      }
    }, {
      key: 'close',
      value: function close() {
        this.setFocus(false, true);
      }
    }, {
      key: 'setQuery',
      value: function setQuery(query) {
        this.props.onQuery(query);
      }
    }, {
      key: 'handleSelect',
      value: function handleSelect(index) {
        this.props.onSelect(index);
        if (this.props.closeOnSelect) this.close();else this.open();
      }
    }, {
      key: 'handleQueryChange',
      value: function handleQueryChange(ev) {
        ev.stopPropagation();
        this.setQuery(ev.target.value);
      }
    }, {
      key: 'handleKeyDown',
      value: function handleKeyDown(ev) {
        ev.stopPropagation();
        var key = ev.key;
        if (ev.ctrlKey) {
          if (ev.which === 80) key = 'ArrowUp';
          if (ev.which === 78) key = 'ArrowDown';
        }
        switch (key) {
          case 'Enter':
            if (this.state.hasFocus) this.handleSelect(this.state.activeIndex);else this.setFocus(true, true);
            return ev.preventDefault();
          case 'Escape':
            if (this.props.query) this.setQuery('');else this.blur();
            return ev.preventDefault();
          case 'ArrowUp':
            this.incrActiveIndex(-1);
            return ev.preventDefault();
          case 'ArrowDown':
            this.incrActiveIndex(1);
            return ev.preventDefault();
        }
      }
    }, {
      key: 'setFocus',
      value: function setFocus(hasFocus, silentFocus) {
        if (silentFocus) this.silentFocus = true;

        if (this.state.hasFocus === hasFocus) return;

        this.setState({ hasFocus: hasFocus });

        var _props = this.props;
        var onFocus = _props.onFocus;
        var onBlur = _props.onBlur;

        if (hasFocus && onFocus) onFocus();else if (!hasFocus && onBlur) onBlur();
      }
    }, {
      key: 'renderOptions',
      value: function renderOptions() {
        var _this2 = this;

        var _props2 = this.props;
        var autoHideOptions = _props2.autoHideOptions;
        var listProps = _props2.listProps;
        var length = _props2.length;
        var optionRenderer = _props2.optionRenderer;
        var optionsRenderer = _props2.optionsRenderer;
        var _state = this.state;
        var activeIndex = _state.activeIndex;
        var hasFocus = _state.hasFocus;

        if (autoHideOptions && !hasFocus) return;
        return _React['default'].createElement(_Options['default'], {
          activeIndex: activeIndex,
          optionRenderer: optionRenderer,
          renderer: optionsRenderer,
          onActivate: this.setActiveIndex.bind(this),
          onSelect: this.handleSelect.bind(this),
          length: length,
          listProps: _extends({}, listProps, { ref: function ref(c) {
              return _this2.list = c;
            } })
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _props3 = this.props;
        var inputRenderer = _props3.inputRenderer;
        var placeholder = _props3.placeholder;
        var query = _props3.query;

        return this.props.containerRenderer({
          props: {
            ref: function ref(c) {
              return _this3.container = c;
            }
          },
          input: inputRenderer({
            props: {
              ref: function ref(c) {
                return _this3.input = c;
              },
              value: query,
              onChange: this.handleQueryChange.bind(this),
              onKeyDown: this.handleKeyDown.bind(this),
              placeholder: placeholder,
              tabIndex: 0
            }
          }),
          options: this.renderOptions()
        });
      }
    }], [{
      key: 'propTypes',
      value: {
        autoFocus: _react.PropTypes.bool.isRequired,
        autoHideOptions: _react.PropTypes.bool.isRequired,
        closeOnSelect: _react.PropTypes.bool.isRequired,
        containerRenderer: _react.PropTypes.func.isRequired,
        initialActiveIndex: _react.PropTypes.number.isRequired,
        inputRenderer: _react.PropTypes.func.isRequired,
        optionsRenderer: _react.PropTypes.func.isRequired,
        optionRenderer: _react.PropTypes.func.isRequired,
        length: _react.PropTypes.number.isRequired,
        listProps: _react.PropTypes.object,
        onBlur: _react.PropTypes.func,
        onFocus: _react.PropTypes.func,
        onQuery: _react.PropTypes.func.isRequired,
        onSelect: _react.PropTypes.func.isRequired,
        placeholder: _react.PropTypes.string.isRequired,
        query: _react.PropTypes.string
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        autoFocus: false,
        autoHideOptions: true,
        closeOnSelect: true,
        containerRenderer: function containerRenderer(_ref2) {
          var props = _ref2.props;
          var input = _ref2.input;
          var options = _ref2.options;
          return _React['default'].createElement(
            'div',
            _extends({}, props, { className: 'rs-container' }),
            input,
            options
          );
        },
        initialActiveIndex: 0,
        inputRenderer: function inputRenderer(_ref3) {
          var props = _ref3.props;
          return _React['default'].createElement('input', _extends({}, props, { className: 'rs-input' }));
        },
        length: 0,
        optionsRenderer: function optionsRenderer(_ref4) {
          var props = _ref4.props;
          var options = _ref4.options;
          return _React['default'].createElement(
            'div',
            _extends({}, props, { className: 'rs-options' }),
            options
          );
        },
        optionRenderer: function optionRenderer(_ref5) {
          var props = _ref5.props;
          var index = _ref5.index;
          var isActive = _ref5.isActive;
          return _React['default'].createElement(
            'div',
            _extends({}, props, {
              className: ['rs-option'].concat(isActive ? 'rs-option-active' : []).join(' ')
            }),
            index
          );
        },
        placeholder: 'Search...'
      },
      enumerable: true
    }]);

    return _default;
  })(_react.Component);

  module.exports = _default;
});
define('index-of', ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = function (haystack, needle) {
    if (haystack.indexOf) return haystack.indexOf(needle);
    for (var i in haystack) {
      if (haystack[i] === needle) return parseInt(i);
    }return -1;
  };
});
define('single-selector', ['exports', 'module', 'react-dom', 'index-of', 'react', 'selector'], function (exports, module, _reactDom, _indexOf, _react, _selector) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _indexOf2 = _interopRequireDefault(_indexOf);

  var _React = _interopRequireDefault(_react);

  var _Selector = _interopRequireDefault(_selector);

  var _default = (function (_Component) {
    _inherits(_default, _Component);

    function _default() {
      _classCallCheck(this, _default);

      _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);

      this.state = {
        hasFocus: false,
        query: this.props.query
      };
    }

    _createClass(_default, [{
      key: 'focus',
      value: function focus() {
        this.selector.focus();
      }
    }, {
      key: 'blur',
      value: function blur() {
        this.selector.blur();
      }
    }, {
      key: 'open',
      value: function open() {
        this.selector.open();
      }
    }, {
      key: 'close',
      value: function close() {
        this.selector.close();
      }
    }, {
      key: 'handleBlur',
      value: function handleBlur() {
        this.setState({ hasFocus: false });
        var onBlur = this.props.onBlur;

        if (onBlur) onBlur();
      }
    }, {
      key: 'handleFocus',
      value: function handleFocus() {
        this.setState({ hasFocus: true });
        (0, _reactDom.findDOMNode)(this.selector.input).focus();
        var _props = this.props;
        var onFocus = _props.onFocus;
        var options = _props.options;
        var value = _props.value;

        var i = value == null ? undefined : (0, _indexOf2['default'])(options, value);
        if (i != null) this.selector.setActiveIndex(i);
        if (onFocus) onFocus();
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.props.onChange();
      }
    }, {
      key: 'handleSelect',
      value: function handleSelect(index) {
        var _props2 = this.props;
        var onChange = _props2.onChange;
        var options = _props2.options;

        onChange(options[index]);
      }
    }, {
      key: 'renderOption',
      value: function renderOption(_ref) {
        var props = _ref.props;
        var index = _ref.index;
        var isActive = _ref.isActive;
        var _props3 = this.props;
        var optionRenderer = _props3.optionRenderer;
        var options = _props3.options;
        var existingValue = _props3.value;

        var value = options[index];
        var isSelected = value === existingValue;
        return optionRenderer({ index: index, value: value, isActive: isActive, isSelected: isSelected, props: props });
      }
    }, {
      key: 'renderInput',
      value: function renderInput(options) {
        var _props4 = this.props;
        var _props4$inputRenderer = _props4.inputRenderer;
        var inputRenderer = _props4$inputRenderer === undefined ? _Selector['default'].defaultProps.inputRenderer : _props4$inputRenderer;
        var value = _props4.value;
        var valueRenderer = _props4.valueRenderer;
        var hasFocus = this.state.hasFocus;

        if (value == null || hasFocus) return inputRenderer(options);

        return valueRenderer(_extends({}, options, { value: value, clear: this.clear.bind(this) }));
      }
    }, {
      key: 'render',
      value: function render() {
        var _this = this;

        return _React['default'].createElement(_Selector['default'], _extends({}, this.props, {
          length: this.props.options.length,
          onBlur: this.handleBlur.bind(this),
          onFocus: this.handleFocus.bind(this),
          onSelect: this.handleSelect.bind(this),
          inputRenderer: this.renderInput.bind(this),
          optionRenderer: this.renderOption.bind(this),
          ref: function (c) {
            return _this.selector = c;
          }
        }));
      }
    }], [{
      key: 'propTypes',
      value: {
        onBlur: _react.PropTypes.func,
        onChange: _react.PropTypes.func.isRequired,
        onFocus: _react.PropTypes.func,
        onQuery: _react.PropTypes.func.isRequired,
        optionRenderer: _react.PropTypes.func.isRequired,
        options: _react.PropTypes.oneOfType([_react.PropTypes.array.isRequired, _react.PropTypes.shape({ length: _react.PropTypes.number.isRequired }).isRequired]).isRequired,
        placeholder: _react.PropTypes.string,
        query: _react.PropTypes.string,
        value: _react.PropTypes.any,
        inputRenderer: _react.PropTypes.func,
        valueRenderer: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        optionRenderer: function optionRenderer(_ref2) {
          var props = _ref2.props;
          var value = _ref2.value;
          var isActive = _ref2.isActive;
          var isSelected = _ref2.isSelected;
          return _React['default'].createElement(
            'div',
            _extends({}, props, {
              className: ['rs-option'].concat(isActive ? 'rs-option-active' : [], isSelected ? 'rs-option-selected' : []).join(' ')
            }),
            value
          );
        },
        query: '',
        valueRenderer: function valueRenderer(_ref3) {
          var props = _ref3.props;
          var value = _ref3.value;
          var clear = _ref3.clear;
          return _React['default'].createElement(
            'div',
            { className: 'rs-value' },
            _React['default'].createElement(
              'div',
              _extends({}, props, { className: 'rs-value-label' }),
              value
            ),
            _React['default'].createElement(
              'div',
              { className: 'rs-value-clear', onClick: clear },
              'X'
            )
          );
        }
      },
      enumerable: true
    }]);

    return _default;
  })(_react.Component);

  module.exports = _default;
});
define('react-selectorer', ['exports', 'module', 'option', 'options', 'selector', 'single-selector'], function (exports, module, _option, _options, _selector, _singleSelector) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Option = _interopRequireDefault(_option);

  var _Options = _interopRequireDefault(_options);

  var _Selector = _interopRequireDefault(_selector);

  var _SingleSelector = _interopRequireDefault(_singleSelector);

  module.exports = {
    Option: _Option['default'],
    Options: _Options['default'],
    Selector: _Selector['default'],
    SingleSelector: _SingleSelector['default']
  };
});
    var ReactSelectorer = require('react-selectorer');
    ReactSelectorer.require = require;
    return ReactSelectorer;
  }).call({});
}));
