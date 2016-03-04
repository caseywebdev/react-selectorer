import React, {Component, PropTypes} from 'react';
import Selector from 'selector';
import indexOf from 'index-of';

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

  blur() {
    this.setState({hasFocus: false});
  }

  focus() {
    this.setState({hasFocus: true});
  }

  clear() {
    this.props.onChange();
  }

  handleSelect(index) {
    const {onChange, onQuery, options} = this.props;
    this.blur();
    onChange(options[index]);
    onQuery();
  }

  renderValue() {
    const {valueRenderer, value} = this.props;
    const clear = ::this.clear;
    return valueRenderer({
      value,
      clear,
      props: {
        onClick: ::this.focus,
        onFocus: ::this.focus,
        tabIndex: '0'
      }
    });
  }

  renderOption({props, index, isActive}) {
    const {optionRenderer, options, value: existingValue} = this.props;
    const value = options[index];
    const isSelected = value === existingValue;
    return optionRenderer({index, value, isActive, isSelected, props});
  }

  renderSelector() {
    const {options, value} = this.props;
    return (
      <Selector
        {...this.props}
        autoFocus={value != null}
        initialActiveIndex={value == null ? undefined : indexOf(options, value)}
        length={options.length}
        onBlur={::this.blur}
        onFocus={::this.focus}
        onSelect={::this.handleSelect}
        optionRenderer={::this.renderOption}
      />
    );
  }

  render() {
    const {value} = this.props;
    const {hasFocus} = this.state;
    return value == null || hasFocus ?
      this.renderSelector() :
      this.renderValue();
  }
}
