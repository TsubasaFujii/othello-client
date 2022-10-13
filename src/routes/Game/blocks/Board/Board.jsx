import { useRecoilValue } from 'recoil';

import { gameState } from '../../../../recoil/game/atom';

import { Wrapper } from './styled';
import { Square } from './Square';

export default function Board() {
    const { board, available } = useRecoilValue(gameState);

    return (
        <Wrapper>
            {
                board.map((row) =>
                    row.map(({ takenBy, row, col }) =>
                        <Square
                            key={`${row}${col}`}
                            row={row}
                            col={col}
                            isAvailable={available.some(square =>
                                square.col === col && square.row === row
                            )}
                            takenBy={takenBy} />
                    )
                        .flat()
                )
            }
        </Wrapper>
    )
}