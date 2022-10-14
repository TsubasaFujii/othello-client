import { useContext, useMemo } from "react";
import { useRecoilValue } from 'recoil';

import { SocketContext } from '../../../../context/SocketProvider';
import { useScore } from '../../../../hooks/useScore';
import { gameState } from '../../../../recoil/game/atom';
import { getPlayerColor } from '../../../../JS/game';

import { Aside } from './styled';
import ScorePanel from './ScorePanel';

export default function ScoreBoard() {
    const { order } = useRecoilValue(gameState);
    const { socket } = useContext(SocketContext);
    const score = useScore();
    const { color } = useMemo(() => {
        if (!socket || !order) {
            return null;
        }
        return getPlayerColor(order, socket.id);
    }, [socket, order]);

    if (!color) return;
    return (
        <Aside>
            <ScorePanel color='white' playerColor={color === 'white'} score={score.white} />
            <ScorePanel color='black' playerColor={color === 'black'} score={score.black} />
        </Aside>
    )
}