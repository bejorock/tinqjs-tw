import { useEffect } from "react";
// import { IModalControl } from "../../components/modal/modal";
import { useToggle } from "../../hooks/useToggle";

export interface IModalController {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  control: any;
}

export const useModal = (): IModalController => {
  const [isOpen, _, forceOpen, forceClose] = useToggle(false);

  /* useEffect(() => {
    console.log(isOpen);
  }, [isOpen]); */

  const open = () => forceOpen();
  const close = () => forceClose();

  const control: any = {
    isOpen,
    onClose: () => forceClose(),
  };

  return {
    isOpen,
    open,
    close,
    control,
  };
};
