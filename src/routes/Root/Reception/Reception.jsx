import { useContext, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { SocketContext } from '../../../context/SocketProvider';
import { gameState } from '../../../recoil/game/atom';

import { Large } from '../../../components';
import { Button } from '../../../components/Button';
import { FlexRow, Input, Left, Wrapper } from './styled';

export default function Reception() {
    const [inputValue, setInputValue] = useState({
        code: ''
    });
    const { socket } = useContext(SocketContext);
    const { isConnecting } = useRecoilValue(gameState);

    function createNewGame() {
        socket.emit('new_game');
    }

    function joinGame() {
        socket.emit('join_game', inputValue);
        setInputValue({
            code: ''
        });
    }

    function handleOnChange(event) {
        const { target } = event;
        setInputValue(() => ({
            code: target.value
        }))
    }

    if (isConnecting) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <Wrapper>
            <Large>Othello</Large>
            <Left>Do you have game code? </Left>
            <FlexRow>
                <Input
                    value={inputValue.code}
                    onChange={handleOnChange} />
                <Button className='button-join' onClick={joinGame} secondary>Join</Button>
            </FlexRow>
            <div>or</div>
            <Button className='button-create' onClick={createNewGame}>Start New Game</Button>
            <a href='https://www.worldothello.org/about/about-othello/othello-rules/official-rules/english' target='_blank' rel="noreferrer">How to play Othello? (WORLD OTHELLO FEDERATION)</a>
        </Wrapper>
    )
}