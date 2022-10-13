import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import { gameState } from '../recoil/game/atom';
import { useDialog } from './useDialog';
import { getPlayerColor } from '../JS/game';

export function useSocket() {
    const [socket, setSocket] = useState(null);
    // Becomes lint error without useRef
    const setGameState = useRef(useSetRecoilState(gameState));
    const dialog = useDialog();

    useEffect(() => {
        const newSocket = io(process.env.BACKEND_URL, {
            forceNew: true,
            withCredentials: true,
        });

        newSocket.on('user:ready', ({message}) => {
        });

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

        setSocket(newSocket);
        newSocket.emit('ready');
        // dialog shouldn't be in the list
        //eslint-disable-next-line
    }, []);

    return socket;
}