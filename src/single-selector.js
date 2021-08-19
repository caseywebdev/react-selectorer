import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';

import Selector from './selector.js';

const indexOf = (haystack, needle) => {
  if (haystack.indexOf) return haystack.indexOf(needle);
  for (const i in haystack) if (haystack[i] === needle) return parseInt(i);
  return -1;
};

export default props => {
  const {
    apiRef,
    containerRenderer,
    onChange,
    onOpen,
    onClose,
    onQueryChange,
    optionRenderer = ({ props, value, isActive, isSelected }) => (
      <div {...props}>
        {value}
        {isSelected && ' [isSelected]'}
        {isActive && ' [isActive]'}
      </div>
    ),
    options,
    value,
    valueRenderer = ({ props, value }) => <div {...props}>{value}</div>
  } = props;
  const selectorApiRef = useRef();
  const valueRef = useRef();
  const [shouldFocus, setShouldFocus] = useState(false);

  const renderOption = useCallback(
    ({ props, index, isActive }) => {
      const newValue = options[index];
      const isSelected = newValue === value;
      return optionRenderer({
        index,
        value: newValue,
        isActive,
        isSelected,
        props
      });
    },
    [optionRenderer, options, value]
  );

  const change = useCallback(
    index => {
      onQueryChange('');
      if (value !== options[index]) onChange(options[index]);
    },
    [onChange, onQueryChange, options, value]
  );

  const incrValue = useCallback(
    dir => {
      const i = indexOf(options, value) + dir;
      if (i >= 0 && i < options.length) change(i);
    },
    [change, options, value]
  );

  const handleOpen = useCallback(() => {
    const i = value == null ? undefined : indexOf(options, value);
    if (i != null) selectorApiRef.current.activate(i);
    onOpen?.();
  }, [onOpen, options, value]);

  const handleClose = useCallback(() => {
    setShouldFocus(true);
    onClose?.();
  }, [onClose]);

  const handleSelect = useCallback(
    i => {
      change(i);
      selectorApiRef.current.close();
    },
    [change]
  );

  const handleKeyDown = useCallback(
    ev => {
      ev.stopPropagation();
      let { key } = ev;
      if (ev.ctrlKey) {
        if (ev.which === 80) key = 'ArrowUp';
        if (ev.which === 78) key = 'ArrowDown';
      }
      switch (key) {
        case 'Enter':
        case ' ':
          selectorApiRef.current.open();
          return ev.preventDefault();
        case 'Escape':
          valueRef.current.blur();
          return ev.preventDefault();
        case 'ArrowUp':
          incrValue(-1);
          return ev.preventDefault();
        case 'ArrowDown':
          incrValue(1);
          return ev.preventDefault();
      }
    },
    [incrValue]
  );

  const containerRendererWithValue = useCallback(
    options =>
      (
        containerRenderer ||
        (({ props, input, isOpen, options, value: renderedValue }) => (
          <>
            {!isOpen && value != null && renderedValue}
            <div {...props}>
              {(isOpen || value == null) && input}
              {isOpen && options}
            </div>
          </>
        ))
      )({
        ...options,
        value: valueRenderer({
          props: {
            ref: valueRef,
            onClick: () => selectorApiRef.current.open(),
            onKeyDown: handleKeyDown,
            tabIndex: 0
          },
          value
        })
      }),
    [containerRenderer, handleKeyDown, value, valueRenderer]
  );

  useEffect(() => {
    if (shouldFocus) {
      if (
        valueRef.current &&
        (!document.activeElement || document.activeElement === document.body)
      ) {
        valueRef.current.focus();
      }
      setShouldFocus(false);
    }
  }, [shouldFocus]);

  useImperativeHandle(
    apiRef,
    () => ({
      close: (...args) => selectorApiRef.current.close(...args),
      open: (...args) => selectorApiRef.current.open(...args),
      activate: (...args) => selectorApiRef.current.activate(...args)
    }),
    []
  );

  return (
    <Selector
      {...props}
      apiRef={selectorApiRef}
      length={options.length}
      onOpen={handleOpen}
      onClose={handleClose}
      onSelect={handleSelect}
      optionRenderer={renderOption}
      containerRenderer={containerRendererWithValue}
    />
  );
};
