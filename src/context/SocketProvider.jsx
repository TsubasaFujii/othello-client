import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';

export const SocketContext = createContext();

export function SocketProvider(props) {
    const { children } = props;
    const value = useSocket();

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}