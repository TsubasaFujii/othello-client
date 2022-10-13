import { useRecoilValue } from 'recoil';
import { useTheme } from 'styled-components';
import { gameState } from '../../../../../recoil/game/atom';

import { Wrapper, Points, Title, Disc } from './style';

export default function ScorePanel(props) {
    const { playerColor, score, color } = props;
    const { isPlayerTurn } = useRecoilValue(gameState);
    const theme = useTheme();

    return (
        <Wrapper>
            <Title>{playerColor ? 'You' : 'Opponent'}</Title>
            <Points $current={playerColor ? isPlayerTurn : !isPlayerTurn}>{score}</Points>
            <Disc $color={color}>
                <svg
                    fill={theme.colors[color]}
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="48" />
                </svg>
            </Disc>
        </Wrapper>
    )
}