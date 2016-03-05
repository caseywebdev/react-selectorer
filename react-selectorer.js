((function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react', 'react-list'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('react'), require('react-list'));
  } else root.ReactSelectorer = factory(root.React, root.ReactList);
})(this, function (React, ReactList) {
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
define('selector', ['exports', 'module', 'options', 'react'], function (exports, module, _options, _react) {
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
      _classCallCheck(this, _default);

      _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);

      this.state = {
        activeIndex: this.props.initialActiveIndex,
        hasFocus: false,
        hasMouse: false
      };
    }

    _createClass(_default, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.autoFocus) this.focus();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.query !== this.props.query) this.setActiveIndex(0);
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
      }
    }, {
      key: 'scrollAroundActiveIndex',
      value: function scrollAroundActiveIndex() {
        if (this.list) this.list.scrollAround(this.state.activeIndex);
      }
    }, {
      key: 'focus',
      value: function focus() {
        this.query.focus();
      }
    }, {
      key: 'blur',
      value: function blur() {
        this.setState({ hasMouse: false });
        this.query.blur();
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
        if (this.props.blurOnSelect) this.blur();
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
            this.handleSelect(this.state.activeIndex);
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
      key: 'handleFocus',
      value: function handleFocus(ev) {
        ev.stopPropagation();
        this.setState({ hasFocus: true });
        this.handleActivate();
      }
    }, {
      key: 'handleBlur',
      value: function handleBlur(ev) {
        ev.stopPropagation();
        this.setState({ hasFocus: false });
        if (!this.state.hasMouse) this.handleDeactivate();
      }
    }, {
      key: 'handleMouseDown',
      value: function handleMouseDown(ev) {
        ev.stopPropagation();
        if (!this.state.hasFocus) return;
        this.setState({ hasMouse: true });
        this.handleActivate();
      }
    }, {
      key: 'handleMouseLeave',
      value: function handleMouseLeave(ev) {
        ev.stopPropagation();
        this.setState({ hasMouse: false });
        if (!this.state.hasFocus) this.handleDeactivate();
      }
    }, {
      key: 'handleActivate',
      value: function handleActivate() {
        if (this.props.onFocus) this.props.onFocus();
      }
    }, {
      key: 'handleDeactivate',
      value: function handleDeactivate() {
        if (this.props.onBlur) this.props.onBlur();
      }
    }, {
      key: 'renderOptions',
      value: function renderOptions() {
        var _this = this;

        var _props = this.props;
        var autoHideOptions = _props.autoHideOptions;
        var listProps = _props.listProps;
        var length = _props.length;
        var optionRenderer = _props.optionRenderer;
        var optionsRenderer = _props.optionsRenderer;
        var _state = this.state;
        var activeIndex = _state.activeIndex;
        var hasFocus = _state.hasFocus;
        var hasMouse = _state.hasMouse;

        if (autoHideOptions && !hasFocus && !hasMouse) return;
        return _React['default'].createElement(_Options['default'], {
          activeIndex: activeIndex,
          optionRenderer: optionRenderer,
          renderer: optionsRenderer,
          onActivate: this.setActiveIndex.bind(this),
          onSelect: this.handleSelect.bind(this),
          length: length,
          listProps: _extends({}, listProps, { ref: function ref(c) {
              return _this.list = c;
            } })
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props2 = this.props;
        var inputRenderer = _props2.inputRenderer;
        var placeholder = _props2.placeholder;
        var query = _props2.query;

        return this.props.containerRenderer({
          props: {
            onMouseDown: this.handleMouseDown.bind(this),
            onMouseLeave: this.handleMouseLeave.bind(this)
          },
          input: inputRenderer({
            props: {
              ref: function ref(c) {
                return _this2.query = c;
              },
              value: query,
              onChange: this.handleQueryChange.bind(this),
              onFocus: this.handleFocus.bind(this),
              onBlur: this.handleBlur.bind(this),
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
        blurOnSelect: _react.PropTypes.bool.isRequired,
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
        blurOnSelect: true,
        containerRenderer: function containerRenderer(_ref) {
          var props = _ref.props;
          var input = _ref.input;
          var options = _ref.options;
          return _React['default'].createElement(
            'div',
            _extends({}, props, { className: 'rs-container' }),
            input,
            options
          );
        },
        initialActiveIndex: 0,
        inputRenderer: function inputRenderer(_ref2) {
          var props = _ref2.props;
          return _React['default'].createElement('input', _extends({}, props, { className: 'rs-input' }));
        },
        length: 0,
        optionsRenderer: function optionsRenderer(_ref3) {
          var props = _ref3.props;
          var options = _ref3.options;
          return _React['default'].createElement(
            'div',
            _extends({}, props, { className: 'rs-options' }),
            options
          );
        },
        optionRenderer: function optionRenderer(_ref4) {
          var props = _ref4.props;
          var index = _ref4.index;
          var isActive = _ref4.isActive;
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
define('single-selector', ['exports', 'module', 'react', 'selector', 'index-of'], function (exports, module, _react, _selector, _indexOf) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _Selector = _interopRequireDefault(_selector);

  var _indexOf2 = _interopRequireDefault(_indexOf);

  var _default = (function (_Component) {
    _inherits(_default, _Component);

    function _default() {
      _classCallCheck(this, _default);

      _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);

      this.state = {
        hasFocus: false,
        query: ''
      };
    }

    _createClass(_default, [{
      key: 'blur',
      value: function blur() {
        this.setState({ hasFocus: false });
      }
    }, {
      key: 'focus',
      value: function focus() {
        this.setState({ hasFocus: true });
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.props.onChange();
      }
    }, {
      key: 'handleSelect',
      value: function handleSelect(index) {
        var _props = this.props;
        var onChange = _props.onChange;
        var onQuery = _props.onQuery;
        var options = _props.options;

        this.blur();
        onChange(options[index]);
        onQuery();
      }
    }, {
      key: 'renderValue',
      value: function renderValue() {
        var _props2 = this.props;
        var valueRenderer = _props2.valueRenderer;
        var value = _props2.value;

        var clear = this.clear.bind(this);
        return valueRenderer({
          value: value,
          clear: clear,
          props: {
            onClick: this.focus.bind(this),
            onFocus: this.focus.bind(this),
            tabIndex: '0'
          }
        });
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
      key: 'renderSelector',
      value: function renderSelector() {
        var _props4 = this.props;
        var options = _props4.options;
        var value = _props4.value;

        return _React['default'].createElement(_Selector['default'], _extends({}, this.props, {
          autoFocus: value != null,
          initialActiveIndex: value == null ? undefined : (0, _indexOf2['default'])(options, value),
          length: options.length,
          onBlur: this.blur.bind(this),
          onFocus: this.focus.bind(this),
          onSelect: this.handleSelect.bind(this),
          optionRenderer: this.renderOption.bind(this)
        }));
      }
    }, {
      key: 'render',
      value: function render() {
        var value = this.props.value;
        var hasFocus = this.state.hasFocus;

        return value == null || hasFocus ? this.renderSelector() : this.renderValue();
      }
    }], [{
      key: 'propTypes',
      value: {
        onChange: _react.PropTypes.func.isRequired,
        onQuery: _react.PropTypes.func.isRequired,
        optionRenderer: _react.PropTypes.func.isRequired,
        options: _react.PropTypes.oneOfType([_react.PropTypes.array.isRequired, _react.PropTypes.shape({ length: _react.PropTypes.number.isRequired }).isRequired]).isRequired,
        placeholder: _react.PropTypes.string,
        query: _react.PropTypes.string,
        value: _react.PropTypes.any,
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
