(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'react', 'react-dom', 'react-selectorer'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('react'), require('react-dom'), require('react-selectorer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.ReactDOM, global.ReactSelectorer);
    global.example = mod.exports;
  }
})(this, function (exports, _react, _reactDom, _reactSelectorer) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _ReactDOM = _interopRequireDefault(_reactDom);

  var _ReactSelectorer = _interopRequireDefault(_reactSelectorer);

  var SingleSelector = _ReactSelectorer['default'].SingleSelector;

  var NAMES = ['Shanelle', 'Stacy', 'Euna', 'Lucy', 'Latia', 'Merry', 'Celestina', 'Sherie', 'Jonathon', 'Mao', 'Viva', 'Tomasa', 'Lesha', 'Mohammed', 'Mavis', 'Ara', 'Lidia', 'Novella', 'Tinisha', 'Virgen', 'Myles', 'Lucrecia', 'Claudie', 'Tamra', 'America', 'Dionna', 'Elicia', 'Louann', 'Rufina', 'Charissa', 'Tish', 'Willis', 'Mohammad', 'Adelia', 'Terresa', 'Jody', 'Wm', 'Myrle', 'Honey', 'Hyon', 'Harmony', 'Lamont', 'Ivette', 'Kasi', 'Danyell', 'Santo', 'Mui', 'Owen', 'Emmanuel', 'Colby'];

  var Example = (function (_React$Component) {
    _inherits(Example, _React$Component);

    function Example() {
      _classCallCheck(this, Example);

      _get(Object.getPrototypeOf(Example.prototype), 'constructor', this).apply(this, arguments);

      this.state = {
        options: NAMES
      };
    }

    _createClass(Example, [{
      key: 'handleChange',
      value: function handleChange(value) {
        this.setState({ value: value });
      }
    }, {
      key: 'handleQuery',
      value: function handleQuery(query) {
        query = (query || '').toLowerCase().trim();
        var filter = function filter(option) {
          return option.toLowerCase().indexOf(query) > -1;
        };
        this.setState({ query: query, options: NAMES.filter(filter) });
      }
    }, {
      key: 'render',
      value: function render() {
        return _React['default'].createElement(SingleSelector, {
          onQuery: this.handleQuery.bind(this),
          onChange: this.handleChange.bind(this),
          options: this.state.options,
          placeholder: 'Search by first name...',
          query: this.state.query,
          value: this.state.value
        });
      }
    }]);

    return Example;
  })(_React['default'].Component);

  _ReactDOM['default'].render(_React['default'].createElement(Example, null), document.getElementById('main'));
});
