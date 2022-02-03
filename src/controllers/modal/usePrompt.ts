import { IPromptControl } from "../../components/modal/prompt";
import { useToggle } from "../../hooks/useToggle";
import { syncPipe } from "../../util/pipe";
import { IModalController, useModal } from "./useModal";

export interface IPromptController extends IModalController {
  isApproved: boolean;
}

export const usePrompt = (): IPromptController => {
  const [isApproved, _, forceApprove, forceReject] = useToggle(false);
  const modalController = useModal();

  const approve = syncPipe(forceApprove, close);
  const reject = syncPipe(forceReject, close);

  const control: IPromptControl = {
    ...modalController.control,
    approve,
    reject,
  };

  return {
    ...modalController,
    isApproved,
    control,
  };
};
