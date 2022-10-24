import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { gameState } from '../recoil/game/atom';

export default function useScore() {
    const [score, setScore] = useState({
        white: 0,
        black: 0,
    });
    const { board, order } = useRecoilValue(gameState);

    useEffect(() => {
        const newScore = board.reduce((sum, row) => {
            row.forEach(({ takenBy }) => {
                if (!takenBy) {
                    return sum;
                } else if (takenBy.id === order[0].id) {
                    sum.white += 1;
                } else {
                    sum.black += 1;
                }
            });
            return sum;
        }, {
            white: 0,
            black: 0
        });
        setScore(newScore);
    }, [board, order]);

    return score;
}