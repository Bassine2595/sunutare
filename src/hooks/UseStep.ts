import { useState } from "react";

export const useStep = (init: number, max: number) => {
  const [current, setCurrent] = useState(init);

  const next = () =>
    setCurrent((current) => (current === max ? current : current + 1));

  const prev = () => setCurrent((current) => (current === 0 ? 0 : current - 1));

  return { current, next, prev };
};
