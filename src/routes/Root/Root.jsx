import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { SocketContext } from '../../context/SocketProvider';
import { gameState } from '../../recoil/game/atom';

import Reception from './Reception';
import WaitingRoom from './WaitingRoom';

export default function Root() {
    const { socket } = useContext(SocketContext);
    const { isPlaying, isPending, code } = useRecoilValue(gameState);
    const navigate = useNavigate();

    useEffect(() => {
        if (isPlaying) {
            navigate('game');
            socket.emit('ready_game');
        }
        // navigate shouldn't be in the list
        //eslint-disable-next-line
    }, [isPlaying, socket]);

    return (
        <>
            {
                isPending ?
                    <WaitingRoom code={code} /> :
                    <Reception />
            }
        </>
    )
}