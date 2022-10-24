import { useContext } from "react";
import { useRecoilValue } from 'recoil';

import { SocketContext } from '../../../../context/SocketProvider';
import { gameState } from '../../../../recoil/game/atom';

import { Wrapper } from './styled';


export default function Square(props) {
    const { takenBy, row, col, isAvailable } = props;
    const { socket } = useContext(SocketContext);
    const { isPlayerTurn, order } = useRecoilValue(gameState);

    function placeDisc(position) {
        if (isPlayerTurn) {
            socket.emit('place_disc', position);
        }
    }

    function getPlayerColor() {
        return takenBy.id === order[0].id ?
            'white' :
            'black';
    }

    return (
        <Wrapper
            disabled={!isAvailable}
            onClick={() => placeDisc({
                row: row,
                col: col
            })}>
            {
                takenBy?.id &&
                <svg
                    fill={getPlayerColor()}
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="48" />
                </svg>
            }
        </Wrapper>
    )
}