import { useState } from "react";

type UseModalType = [boolean, () => void];

export const useModal = (): UseModalType => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  };
  return [visible, toggle];
};
