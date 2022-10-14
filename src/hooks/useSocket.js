import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Manager } from 'socket.io-client';
import { gameState } from '../recoil/game/atom';
import { useDialog } from './useDialog';
import { getPlayerColor } from '../JS/game';

const RECONNECTION_ATTEMPTS = 3;

export function useSocket() {
    const [socket, setSocket] = useState(null);
    // Becomes lint error without useRef
    const setGameState = useRef(useSetRecoilState(gameState));
    const dialog = useDialog();

    function resetSocket() {
        setSocket(null)
    }

    useEffect(() => {
        const manager = new Manager(process.env.REACT_APP_BACKEND_URL);
        const newSocket = manager.socket('/');
        manager.reconnectionAttempts([RECONNECTION_ATTEMPTS]);

        newSocket.on('game:pending', (data) => {
            const { code } = data;
            setGameState.current(prev => ({
                ...prev,
                isPending: true,
                code: code,
            }));
        });

        newSocket.on('game:start', (data) => {
            const { board, order } = data;
            setGameState.current(prev => ({
                ...prev,
                isPending: false,
                isPlaying: true,
                board,
                order
            }));
            const {color, number} = getPlayerColor(order, newSocket.id);
            dialog({
                message: `Game has started. You play at ${number}th. Your disc is in ${color}`,
                confirmation: true,
            });
        });

        newSocket.on('game:your_turn', (data) => {
            const { board, available } = data;
            setGameState.current(prev => ({
                ...prev,
                isPlayerTurn: true,
                board: board,
                available: available
            }));
            dialog({
                message: 'Your turn',
            });
        });

        newSocket.on('game:opponent_turn', ({board}) => {
            setGameState.current(prev => ({
                ...prev,
                isPlayerTurn: false,
                board: board,
                available: []
            }));
            dialog({
                message: 'Opponent\'s turn',
            });
        });

        newSocket.on('game:turn_skipped', ({board}) => {
            setGameState.current(prev => ({
                ...prev,
                isPlayerTurn: false,
                board: board,
            }));
            dialog({
                message: 'Your turn is skipped',
                confirmation: true,
            });
        });

        newSocket.on('game:ended', ({result}) => {
            setGameState.current(prev => ({
                ...prev,
                result: result,
                isPlaying: false,
            }));
            console.log(result);
        });

        newSocket.on('game:not_found', ({message}) => {
            dialog({
                message: message,
                confirmation: true,
            });
        });

        newSocket.on('game:error', ({message}) => {
            dialog({
                message: message,
                confirmation: true,
            });
        });

        newSocket.on('user: disconnected', ({message}) => {
            dialog({
                message: message,
                confirmation: true,
            });
            setGameState.current({
                board: [],
                isPlaying: false,
                isPlayerTurn: null,
                available: [],
                isPending: false,
                code: null,
                result: null,
            });
        });

        newSocket.io.on('reconnect_failed', () => {
            dialog({
                message: 'Something went wrong. Can\t connect to the server.',
                confirmation: true,
            });
        });

        setSocket(newSocket);
        newSocket.emit('ready');
        // dialog shouldn't be in the list
        //eslint-disable-next-line
    }, []);

    return { socket, resetSocket };
}