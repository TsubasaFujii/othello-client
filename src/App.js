import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SocketProvider } from './context/SocketProvider';

import { GlobalStyles, Main } from './components';
import { Dialog } from './components';
import { Theme } from './context/ThemeProvider';
import Root from './routes/Root';
import Game from './routes/Game';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
    },
    {
        path: 'game',
        element: <Game />
    },
]);

function App() {

    return (
        <SocketProvider>
            <Theme>
                <GlobalStyles />
                    <Main>
                        <RouterProvider router={router} />
                    </Main>
                <Dialog />
            </Theme>
        </SocketProvider>
    );
}

export default App;

// when the turn comes
// when the turn is skipped
// when the game finished