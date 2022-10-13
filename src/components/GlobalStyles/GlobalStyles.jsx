const { createGlobalStyle } = require('styled-components');

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 1rem;
    }

    #dialog-root {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    #dialog-root.hidden {
        z-index: -1;
    }

    body {
        width: 100vw;
        overflow-x: hidden;
    }
    
    // Typography
    body {
        font-family: 'Poppins', sans-serif;
    }

    button,
    p,
    input {
        font-family: 'Poppins', sans-serif;
        font-size:1.2rem;
    }

    // Colors
    body {
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.black}
    }
`;