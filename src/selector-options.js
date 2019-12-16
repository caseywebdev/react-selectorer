import React, { useCallback } from 'react';
import ReactList from 'react-list';

import SelectorOption from './selector-option.js';

export default ({
  activeIndex,
  length,
  listProps,
  onActivate,
  onSelect,
  optionRenderer,
  renderer
}) => {
  const renderOption = useCallback(
    (index, key) => (
      <SelectorOption
        index={index}
        isActive={index === activeIndex}
        key={key}
        onActivate={onActivate}
        onSelect={onSelect}
        renderer={optionRenderer}
      />
    ),
    [activeIndex, onActivate, onSelect, optionRenderer]
  );

  return renderer({
    props: {},
    options: (
      <ReactList
        initialIndex={activeIndex}
        itemRenderer={renderOption}
        length={length}
        {...listProps}
      />
    )
  });
};
