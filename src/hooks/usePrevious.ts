import { useEffect, useRef } from 'react';

export const usePrevious = (value: string) => {
  const ref = useRef<string>();

  const current = ref.current;

  useEffect(() => {
    ref.current = value;
  });

  return current;
}
