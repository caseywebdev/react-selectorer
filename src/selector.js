import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';

import SelectorOptions from './selector-options.js';
import useOuterEvents from './use-outer-events.js';

export default ({
  apiRef,
  closeOnSelect = true,
  containerRenderer = ({ props, input, isOpen, options }) => (
    <div {...props}>
      {input}
      {isOpen && options}
    </div>
  ),
  initialActiveIndex = 0,
  inputRenderer = ({ props }) => <input {...props} />,
  length = 0,
  listProps = {},
  optionsRenderer = ({ props, options }) => <div {...props}>{options}</div>,
  optionRenderer = ({ props, index, isActive }) => (
    <div {...props}>
      {index}
      {isActive && ' [isActive]'}
    </div>
  ),
  onClose = () => {},
  onOpen = () => {},
  onQueryChange = () => {},
  onSelect = () => {},
  placeholder = 'Search...',
  query = ''
}) => {
  const containerRef = useRef();
  const inputRef = useRef();
  const listRef = useRef();
  const prevQuery = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const activate = useCallback(
    i => setActiveIndex(Math.max(0, Math.min(i, length - 1))),
    [length]
  );

  const open = useCallback(() => {
    if (isOpen) return;

    setIsOpen(true);
    onOpen();
  }, [isOpen, onOpen]);

  const close = useCallback(() => {
    if (!isOpen) return;

    setIsOpen(false);
    onClose();
  }, [isOpen, onClose]);

  const handleSelect = useCallback(
    index => {
      onSelect(index);
      if (closeOnSelect) close();
      else open();
    },
    [close, closeOnSelect, onSelect, open]
  );

  const listPropsWithRef = useMemo(
    () => ({
      ...listProps,
      ref: listRef
    }),
    [listProps]
  );

  const handleQueryChange = useCallback(
    ev => {
      ev.stopPropagation();
      onQueryChange(ev.target.value);
    },
    [onQueryChange]
  );

  const handleKeyDown = useCallback(
    ev => {
      open();
      ev.stopPropagation();
      var key = ev.key;
      if (ev.ctrlKey) {
        if (ev.which === 80) key = 'ArrowUp';
        if (ev.which === 78) key = 'ArrowDown';
      }
      switch (key) {
        case 'Enter':
          if (activeIndex < length) handleSelect(activeIndex);
          return ev.preventDefault();
        case 'Escape':
          if (query) onQueryChange('');
          else close();
          return ev.preventDefault();
        case 'ArrowUp':
          activate(activeIndex - 1);
          return ev.preventDefault();
        case 'ArrowDown':
          activate(activeIndex + 1);
          return ev.preventDefault();
      }
    },
    [
      open,
      activeIndex,
      length,
      handleSelect,
      query,
      onQueryChange,
      close,
      activate
    ]
  );

  useEffect(() => {
    if (!isOpen) return;

    const inputEl = inputRef.current;
    inputEl.focus();
    return () => inputEl.blur();
  }, [isOpen]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollAround(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (query !== prevQuery.current) activate(0);
    prevQuery.current = query;
  }, [activate, query]);

  const { captureInnerEvent } = useOuterEvents({
    events: useMemo(() => ['focusin', 'mousedown', 'touchstart'], []),
    onOuterEvent: useCallback(
      ev => {
        if (isOpen && !ev.defaultPrevented) close();
      },
      [close, isOpen]
    )
  });

  const handleContainerEvent = useCallback(
    ev => {
      if (!isOpen && !ev.defaultPrevented) open();
      if (ev.type === 'focus') captureInnerEvent(ev);
    },
    [captureInnerEvent, isOpen, open]
  );

  useImperativeHandle(apiRef, () => ({ activate, open, close }), [
    activate,
    close,
    open
  ]);

  return containerRenderer({
    props: {
      ref: containerRef,
      onClick: handleContainerEvent,
      onFocus: handleContainerEvent,
      onMouseDown: captureInnerEvent,
      onTouchStart: captureInnerEvent
    },
    input: inputRenderer({
      props: {
        ref: inputRef,
        value: query,
        onChange: handleQueryChange,
        onKeyDown: handleKeyDown,
        placeholder,
        tabIndex: 0
      }
    }),
    inputRef,
    isOpen,
    options: (
      <SelectorOptions
        activeIndex={activeIndex}
        optionRenderer={optionRenderer}
        renderer={optionsRenderer}
        onActivate={activate}
        onSelect={handleSelect}
        length={length}
        listProps={listPropsWithRef}
      />
    )
  });
};
