import { useCallback, useEffect, useRef } from 'react';

export default ({ events, onOuterEvent }) => {
  const eventsCaptured = useRef(new Set());
  const captureInnerEvent = useCallback(
    ev => eventsCaptured.current.add(ev.nativeEvent),
    []
  );
  useEffect(() => {
    const handle = ev => {
      if (!eventsCaptured.current.has(ev)) onOuterEvent(ev);
      setTimeout(() => eventsCaptured.current.clear());
    };
    events.forEach(([event]) => document.addEventListener(event, handle));
    return () => {
      events.forEach(([event]) => document.removeEventListener(event, handle));
    };
  }, [events, onOuterEvent]);

  return { captureInnerEvent };
};
