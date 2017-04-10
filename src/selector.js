import {findDOMNode} from 'react-dom';
import Options from './options';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

export default class extends Component {
  static propTypes = {
    alwaysOpen: PropTypes.bool.isRequired,
    autoFocus: PropTypes.bool.isRequired,
    closeOnSelect: PropTypes.bool.isRequired,
    containerRenderer: PropTypes.func.isRequired,
    initialActiveIndex: PropTypes.number.isRequired,
    inputRenderer: PropTypes.func.isRequired,
    optionsRenderer: PropTypes.func.isRequired,
    optionRenderer: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    listProps: PropTypes.object,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onQuery: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    query: PropTypes.string
  };

  static defaultProps = {
    alwaysOpen: false,
    autoFocus: false,
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
    isOpen: false
  };

  componentDidMount() {
    document.addEventListener('focus', this.handleFocus, true);
    document.addEventListener('click', this.handleFocus);
    if (this.props.autoFocus) this.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) this.setActiveIndex(0);
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
  }

  scrollAroundActiveIndex() {
    if (this.list) this.list.scrollAround(this.state.activeIndex);
  }

  focus() {
    findDOMNode(this.input).focus();
    this.open();
  }

  blur() {
    findDOMNode(this.input).blur();
    this.close();
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
    this.open();
    ev.stopPropagation();
    var key = ev.key;
    if (ev.ctrlKey) {
      if (ev.which === 80) key = 'ArrowUp';
      if (ev.which === 78) key = 'ArrowDown';
    }
    switch (key) {
    case 'Enter':
      if (this.state.activeIndex < this.props.length) {
        this.handleSelect(this.state.activeIndex);
      }
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
    const {container} = this;

    if (container && document.documentElement.contains(target)) {
      if (findDOMNode(container).contains(target)) this.open();
      else this.close();
    }
  };

  renderOptions() {
    const {alwaysOpen, listProps, length, optionRenderer, optionsRenderer} =
      this.props;
    const {activeIndex, isOpen} = this.state;
    if (!alwaysOpen && !isOpen) return;
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
    const {containerRenderer, inputRenderer, placeholder, query} = this.props;
    return containerRenderer({
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
