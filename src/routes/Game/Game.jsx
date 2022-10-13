import { useContext, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { gameState } from '../../recoil/game/atom';
import { SocketContext } from '../../context/SocketProvider';

import { ScoreBoard } from './blocks/ScoreBoard';
import { Board } from './blocks/Board';
import { Wrapper } from './styled';

export default function Game() {
    const socket = useContext(SocketContext);
    const { board, isPlaying } = useRecoilValue(gameState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) {
            navigate('/');
        }
    }, [board, navigate, socket, isPlaying]);

    if (!socket) return;
    return (
        <Wrapper>
            <ScoreBoard />
            <Board />
        </Wrapper>
    )
}