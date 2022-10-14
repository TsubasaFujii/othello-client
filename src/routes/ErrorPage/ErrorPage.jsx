import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { gameState } from '../../recoil/game/atom';
import { dialogState } from '../../recoil/dialog/atom';
import { SocketContext } from '../../context/SocketProvider';

export default function ErrorPage() {
    const resetGameState = useResetRecoilState(gameState);
    const resetDialog = useResetRecoilState(dialogState);
    const { resetSocket } = useContext(SocketContext);
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        resetGameState();
        resetDialog();
        resetSocket();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        function countDown() {
            setCount(prev => prev - 1);
        }
        if (count > 0) {
            const intervalId = window.setInterval(countDown, 1000);
            return () => clearInterval(intervalId);
        }
        navigate('/');
        //eslint-disable-next-line
    }, [count]);

    return (
        <div>
            <h1>Oops!</h1>
            <div>Something went wrong...</div>
            <div>Redirecting in {count} seconds to <Link to='/'>Home</Link></div>
        </div>
    )
}