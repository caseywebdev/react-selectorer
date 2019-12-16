import { useCallback } from 'react';

const LAST_MOUSE = { x: 0, y: 0 };

export default ({ index, isActive, onActivate, onSelect, renderer }) => {
  const handleClick = useCallback(() => onSelect(index), [index, onSelect]);
  const handleMouseMove = useCallback(
    ({ screenX: x, screenY: y }) => {
      if (x === LAST_MOUSE.x && y === LAST_MOUSE.y) return;

      LAST_MOUSE.x = x;
      LAST_MOUSE.y = y;
      onActivate(index);
    },
    [index, onActivate]
  );

  return renderer({
    props: { onClick: handleClick, onMouseMove: handleMouseMove },
    index,
    isActive
  });
};
