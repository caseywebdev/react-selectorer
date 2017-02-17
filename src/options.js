import Option from './option';
import ReactList from 'react-list';
import React, {PropTypes} from 'react';

const renderOption = (props, index, key) => {
  const {activeIndex, onActivate, onSelect, optionRenderer} = props;
  return (
    <Option
      index={index}
      isActive={index === activeIndex}
      key={key}
      onActivate={onActivate.bind(null, index)}
      onSelect={onSelect.bind(null, index)}
      renderer={optionRenderer}
    />
  );
};

const Component = props => {
  const {activeIndex, length, listProps, renderer} = props;
  return renderer({
    props: {},
    options:
      <ReactList
        initialIndex={activeIndex}
        itemRenderer={renderOption.bind(null, props)}
        length={length}
        type='uniform'
        {...listProps}
      />
  });
};

Component.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  listProps: PropTypes.object,
  onActivate: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  optionRenderer: PropTypes.func.isRequired,
  renderer: PropTypes.func.isRequired
};

export default Component;
