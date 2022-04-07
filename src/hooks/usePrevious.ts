import { useEffect, useRef } from 'react';

export const usePrevious = (value: any) => {
  const ref = useRef<any>();

  const current = ref.current;

  useEffect(() => {
    ref.current = value;
  });

  return current;
}
