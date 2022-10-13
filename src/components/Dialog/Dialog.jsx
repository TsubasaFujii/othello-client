import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilState } from 'recoil';

import { dialogState } from '../../recoil/dialog/atom';

import { Content, Overlay } from './styled';
import { Button } from '../Button';

export default function Dialog() {
    const [messages, setMessages] = useRecoilState(dialogState);
    const [currentMessage, setCurrentMessage] = useState(null);
    const [isHidden, setIsHidden] = useState(true);

    function removeDialog() {
        setCurrentMessage(null);
        setIsHidden(true);
    }

    function handleClose() {
        removeDialog();
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages.shift();
            return newMessages;
        });
    }

    useEffect(() => {
        if (!isHidden) {
            document.querySelector('#dialog-root').classList.remove('hidden');
        } else {
            document.querySelector('#dialog-root').classList.add('hidden');
        }
    }, [isHidden]);

    useEffect(() => {
        if (!currentMessage) return;

        setIsHidden(false);
        let timeoutId;
        if (!currentMessage.confirmation) {
            timeoutId = setTimeout(removeDialog, 1500);

            setMessages(prev => {
                const newMessages = [...prev];
                newMessages.shift();
                return newMessages;
            });
        }
        return () => {
            clearTimeout(timeoutId);
        }
        // eslint-disable-next-line
    }, [currentMessage]);

    useEffect(() => {
        if (messages.length === 0) return;
        if (currentMessage) return;

        setCurrentMessage(messages[0]);
    }, [messages, currentMessage]);

    if (!currentMessage) return;
    return createPortal(
        <Overlay $isHidden={isHidden}>
            <Content>
                {currentMessage.message}
                {currentMessage.confirmation && <Button onClick={handleClose}>OK</Button>}
            </Content>
        </Overlay>,
        document.querySelector('#dialog-root')
    )
}