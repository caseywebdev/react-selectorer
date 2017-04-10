import PropTypes from 'prop-types';

const LAST_MOUSE = {x: 0, y: 0};

const handleMouseMove = (onActivate, index, {screenX: x, screenY: y}) => {
  if (x === LAST_MOUSE.x && y === LAST_MOUSE.y) return;
  LAST_MOUSE.x = x;
  LAST_MOUSE.y = y;
  onActivate(index);
};

const Component = props => {
  const {index, isActive, onActivate, onSelect, renderer} = props;
  return renderer({
    props: {
      onClick: onSelect.bind(null, index),
      onMouseMove: handleMouseMove.bind(null, onActivate, index)
    },
    index,
    isActive
  });
};

Component.propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onActivate: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  renderer: PropTypes.func.isRequired
};

export default Component;
