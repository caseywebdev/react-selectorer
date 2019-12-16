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
    events.forEach(([event, options]) =>
      document.addEventListener(event, handle, options)
    );
    return () => {
      events.forEach(([event, options]) =>
        document.removeEventListener(event, handle, options)
      );
    };
  }, [events, onOuterEvent]);

  return { captureInnerEvent };
};
