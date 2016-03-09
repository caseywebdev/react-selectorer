import {findDOMNode} from 'react-dom';
import indexOf from 'index-of';
import React, {Component, PropTypes} from 'react';
import Selector from 'selector';

export default class extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onQuery: PropTypes.func.isRequired,
    optionRenderer: PropTypes.func.isRequired,
    options: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.shape({length: PropTypes.number.isRequired}).isRequired
    ]).isRequired,
    placeholder: PropTypes.string,
    query: PropTypes.string,
    value: PropTypes.any,
    inputRenderer: PropTypes.func,
    valueRenderer: PropTypes.func.isRequired
  };

  static defaultProps = {
    optionRenderer: ({props, value, isActive, isSelected}) =>
      <div
        {...props}
        className={['rs-option'].concat(
          isActive ? 'rs-option-active' : [],
          isSelected ? 'rs-option-selected' : []
        ).join(' ')}
      >
        {value}
      </div>,
    valueRenderer: ({props, value, clear}) =>
      <div className='rs-value'>
        <div {...props} className='rs-value-label'>{value}</div>
        <div className='rs-value-clear' onClick={clear}>X</div>
      </div>
  };

  state = {
    hasFocus: false,
    query: ''
  };

  focus() {
    this.selector.focus();
  }

  blur() {
    this.selector.blur();
  }

  open() {
    this.selector.open();
  }

  close() {
    this.selector.close();
  }

  handleBlur() {
    this.setState({hasFocus: false});
  }

  handleFocus() {
    this.setState({hasFocus: true});
    findDOMNode(this.selector.input).focus();
    const {options, value} = this.props;
    const i = value == null ? undefined : indexOf(options, value);
    if (i != null) this.selector.setActiveIndex(i);
  }

  clear() {
    this.props.onChange();
  }

  handleSelect(index) {
    const {onChange, onQuery, options} = this.props;
    onChange(options[index]);
    onQuery();
  }

  renderOption({props, index, isActive}) {
    const {optionRenderer, options, value: existingValue} = this.props;
    const value = options[index];
    const isSelected = value === existingValue;
    return optionRenderer({index, value, isActive, isSelected, props});
  }

  renderInput(options) {
    const {
      inputRenderer = Selector.defaultProps.inputRenderer,
      value,
      valueRenderer
    } = this.props;
    const {hasFocus} = this.state;

    if (value == null || hasFocus) return inputRenderer(options);

    return valueRenderer({...options, value, clear: ::this.clear});
  }

  render() {
    return (
      <Selector
        {...this.props}
        length={this.props.options.length}
        onBlur={::this.handleBlur}
        onFocus={::this.handleFocus}
        onSelect={::this.handleSelect}
        inputRenderer={::this.renderInput}
        optionRenderer={::this.renderOption}
        ref={c => this.selector = c}
      />
    );
  }
}
