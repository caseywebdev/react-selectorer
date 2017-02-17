import {findDOMNode} from 'react-dom';
import Options from './options';
import React, {Component, PropTypes} from 'react';

export default class extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool.isRequired,
    autoHideOptions: PropTypes.bool.isRequired,
    closeOnSelect: PropTypes.bool.isRequired,
    containerRenderer: PropTypes.func.isRequired,
    initialActiveIndex: PropTypes.number.isRequired,
    inputRenderer: PropTypes.func.isRequired,
    optionsRenderer: PropTypes.func.isRequired,
    optionRenderer: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    listProps: PropTypes.object,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onQuery: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    query: PropTypes.string
  };

  static defaultProps = {
    autoFocus: false,
    autoHideOptions: true,
    closeOnSelect: true,
    containerRenderer: ({props, input, options}) =>
      <div {...props} className='rs-container'>{input}{options}</div>,
    initialActiveIndex: 0,
    inputRenderer: ({props}) =>
      <input {...props} className='rs-input' />,
    length: 0,
    optionsRenderer: ({props, options}) =>
      <div {...props} className='rs-options'>{options}</div>,
    optionRenderer: ({props, index, isActive}) =>
      <div
        {...props}
        className={['rs-option'].concat(
          isActive ? 'rs-option-active' : []
        ).join(' ')}
      >
        {index}
      </div>,
    placeholder: 'Search...'
  };

  state = {
    activeIndex: this.props.initialActiveIndex,
    hasFocus: false
  };

  componentDidMount() {
    if (this.props.autoFocus) this.focus();
    document.addEventListener('focus', this.handleFocus, true);
    document.addEventListener('click', this.handleFocus);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) this.setActiveIndex(0);
  }

  componentDidUpdate() {
    if (this.silentFocus) {
      if (!findDOMNode(this.container).contains(document.activeElement)) {
        findDOMNode(this.input).focus();
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('focus', this.handleFocus, true);
    document.removeEventListener('click', this.handleFocus);
  }

  incrActiveIndex(dir) {
    this.setActiveIndex(this.state.activeIndex + dir);
  }

  setActiveIndex(i) {
    i = Math.max(0, Math.min(i, this.props.length - 1));
    this.setState({activeIndex: i}, ::this.scrollAroundActiveIndex);
    if (!this.state.hasFocus) this.props.onSelect(i);
  }

  scrollAroundActiveIndex() {
    if (this.list) this.list.scrollAround(this.state.activeIndex);
  }

  focus() {
    findDOMNode(this.input).focus();
    this.setFocus(true);
  }

  blur() {
    findDOMNode(this.input).blur();
    this.setFocus(false);
  }

  open() {
    this.setFocus(true, true);
  }

  close() {
    this.setFocus(false, true);
  }

  setQuery(query) {
    this.props.onQuery(query);
  }

  handleSelect(index) {
    this.props.onSelect(index);
    if (this.props.closeOnSelect) this.close();
    else this.open();
  }

  handleQueryChange(ev) {
    ev.stopPropagation();
    this.setQuery(ev.target.value);
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
      if (this.state.hasFocus) this.handleSelect(this.state.activeIndex);
      else this.setFocus(true, true);
      return ev.preventDefault();
    case 'Escape':
      if (this.props.query) this.setQuery(''); else this.blur();
      return ev.preventDefault();
    case 'ArrowUp':
      this.incrActiveIndex(-1);
      return ev.preventDefault();
    case 'ArrowDown':
      this.incrActiveIndex(1);
      return ev.preventDefault();
    }
  }

  handleFocus = ({target}) => {
    const {silentFocus, container} = this;

    if (silentFocus) return this.silentFocus = false;

    if (container && document.documentElement.contains(target)) {
      this.setFocus(findDOMNode(container).contains(target));
    }
  };

  setFocus(hasFocus, silentFocus) {
    if (silentFocus) this.silentFocus = true;

    if (this.state.hasFocus === hasFocus) return;

    this.setState({hasFocus});

    const {onFocus, onBlur} = this.props;
    if (hasFocus && onFocus) onFocus();
    else if (!hasFocus && onBlur) onBlur();
  }

  renderOptions() {
    const {autoHideOptions, listProps, length, optionRenderer, optionsRenderer}
      = this.props;
    const {activeIndex, hasFocus} = this.state;
    if (autoHideOptions && !hasFocus) return;
    return (
      <Options
        activeIndex={activeIndex}
        optionRenderer={optionRenderer}
        renderer={optionsRenderer}
        onActivate={::this.setActiveIndex}
        onSelect={::this.handleSelect}
        length={length}
        listProps={{...listProps, ref: c => this.list = c}}
      />
    );
  }

  render() {
    const {inputRenderer, placeholder, query} = this.props;
    return this.props.containerRenderer({
      props: {
        ref: c => this.container = c
      },
      input: inputRenderer({
        props: {
          ref: c => this.input = c,
          value: query,
          onChange: ::this.handleQueryChange,
          onKeyDown: ::this.handleKeyDown,
          placeholder,
          tabIndex: 0
        }
      }),
      options: this.renderOptions()
    });
  }
}
