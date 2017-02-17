import {findDOMNode} from 'react-dom';
import indexOf from './index-of';
import React, {Component, PropTypes} from 'react';
import Selector from './selector';

export default class extends Component {
  static propTypes = {
    containerRenderer: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
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
    containerRenderer: ({props, input, options, value}) =>
      <div {...props} className='rs-container'>{value}{input}{options}</div>,
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
    query: '',
    valueRenderer: ({props, value}) =>
      <div {...props} className='rs-value'>{value}</div>
  };

  state = {
    isOpen: false
  };

  componentDidUpdate(__, {isOpen: wasOpen}) {
    const {isOpen} = this.state;
    if (this.selector && isOpen) this.selector.focus();
    else if (this.value && !isOpen) this.value.focus();
  }

  focus() {
    (this.value || this.selector).focus();
    this.open();
  }

  blur() {
    (this.value || this.selector).blur();
  }

  open() {
    this.setState({isOpen: true});
    const {onOpen} = this.props;
    if (onOpen) onOpen();
  }

  close() {
    this.setState({isOpen: false});
    const {onClose} = this.props;
    if (onClose) onClose();
  }

  incrValue(dir) {
    const {onChange, options, value} = this.props;
    const i = indexOf(options, value) + dir;
    if (i >= 0 && i < options.length) onChange(options[i]);
  }

  handleClose() {
    this.close();
  }

  handleOpen() {
    findDOMNode(this.selector.input).focus();
    const {options, value} = this.props;
    const i = value == null ? undefined : indexOf(options, value);
    if (i != null) this.selector.setActiveIndex(i);
  }

  handleSelect(index) {
    const {onChange, options} = this.props;
    onChange(options[index]);
    this.setState({isOpen: false});
  }

  handleKeyDown(ev) {
    ev.stopPropagation();
    var key = ev.key;
    if (ev.ctrlKey) {
      if (ev.which === 80) key = 'ArrowUp';
      if (ev.which === 78) key = 'ArrowDown';
    }
    switch (key) {
    case 'Enter':
      this.setState({isOpen: true});
      return ev.preventDefault();
    case 'Escape':
      if (this.state.isOpen) this.setState({isOpen: false});
      else this.blur();
      return ev.preventDefault();
    case 'ArrowUp':
      this.incrValue(-1);
      return ev.preventDefault();
    case 'ArrowDown':
      this.incrValue(1);
      return ev.preventDefault();
    }
  }

  renderOption({props, index, isActive}) {
    const {optionRenderer, options, value: existingValue} = this.props;
    const value = options[index];
    const isSelected = value === existingValue;
    return optionRenderer({index, value, isActive, isSelected, props});
  }

  renderValue() {
    const {containerRenderer, valueRenderer, placeholder, value} = this.props;
    return containerRenderer({
      props: {
        ref: c => this.container = c
      },
      value: valueRenderer({
        props: {
          ref: c => this.value = c,
          onClick: ::this.open,
          onKeyDown: ::this.handleKeyDown,
          tabIndex: 0
        },
        value
      })
    });
  }

  renderSelector() {
    return (
      <Selector
        {...this.props}
        length={this.props.options.length}
        onClose={::this.handleClose}
        onOpen={::this.handleOpen}
        onSelect={::this.handleSelect}
        optionRenderer={::this.renderOption}
        ref={c => this.selector = c}
      />
    );
  }

  render() {
    const {value} = this.props;
    const {isOpen} = this.state;
    return !isOpen && value != null ? this.renderValue() : this.renderSelector();
  }
}
