import { useSetRecoilState } from 'recoil';
import { dialogState } from '../recoil/dialog/atom';

export function useDialog() {
    const setMessages = useSetRecoilState(dialogState);

    function dialog({message, confirmation}) {
        setMessages(prev => ([
            ...prev,
            {
                message: message,
                confirmation: confirmation,
            }
        ]));
    }

    return dialog;
}