import { useState, useEffect } from 'react';
export function useModalAnimation(isOpen: boolean) {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setShow(false), 200);
    }
  }, [isOpen]);

  return { show, animate };
}
