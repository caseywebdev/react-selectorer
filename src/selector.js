import Options from 'options';
import React, {Component, PropTypes} from 'react';

export default class extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool.isRequired,
    autoHideOptions: PropTypes.bool.isRequired,
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
    hasFocus: false,
    hasMouse: false
  };

  componentDidMount() {
    if (this.props.autoFocus) this.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) this.setActiveIndex(0);
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
    this.query.focus();
  }

  blur() {
    this.setState({hasMouse: false});
    this.query.blur();
  }

  setQuery(query) {
    this.props.onQuery(query);
  }

  handleSelect(index) {
    this.props.onSelect(index);
    this.blur();
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
      this.handleSelect(this.state.activeIndex);
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

  handleFocus(ev) {
    ev.stopPropagation();
    this.setState({hasFocus: true});
    this.handleActivate();
  }

  handleBlur(ev) {
    ev.stopPropagation();
    this.setState({hasFocus: false});
    if (!this.state.hasMouse) this.handleDeactivate();
  }

  handleMouseDown(ev) {
    ev.stopPropagation();
    if (!this.state.hasFocus) return;
    this.setState({hasMouse: true});
    this.handleActivate();
  }

  handleMouseLeave(ev) {
    ev.stopPropagation();
    this.setState({hasMouse: false});
    if (!this.state.hasFocus) this.handleDeactivate();
  }

  handleActivate() {
    if (this.props.onFocus) this.props.onFocus();
  }

  handleDeactivate() {
    if (this.props.onBlur) this.props.onBlur();
  }

  renderOptions() {
    const {autoHideOptions, listProps, length, optionRenderer, optionsRenderer}
      = this.props;
    const {activeIndex, hasFocus, hasMouse} = this.state;
    if (autoHideOptions && !hasFocus && !hasMouse) return;
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
        onMouseDown: ::this.handleMouseDown,
        onMouseLeave: ::this.handleMouseLeave,
        onKeyDown: ::this.handleKeyDown
      },
      input: inputRenderer({
        props: {
          ref: c => this.query = c,
          value: query,
          onChange: ::this.handleQueryChange,
          onFocus: ::this.handleFocus,
          onBlur: ::this.handleBlur,
          placeholder
        }
      }),
      options: this.renderOptions()
    });
  }
}
