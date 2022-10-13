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
    const socket = useContext(SocketContext);
    const { color } = useMemo(() => getPlayerColor(order, socket.id), [socket, order]);
    const score = useScore();

    return (
        <Aside>
            <ScorePanel color='white' playerColor={color === 'white'} score={score.white} />
            <ScorePanel color='black' playerColor={color === 'black'} score={score.black} />
        </Aside>
    )
}