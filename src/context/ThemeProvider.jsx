import { ThemeProvider } from 'styled-components';

const colors = {
    board: '#3F7A71',
    background: '#C0E1DC',
    primary: '#44A9E3',
    dark: '#3D98CC',
    light: '#72BAE3',
    black: '#05121A',
    black20: '#05121A33',
    white: '#F9F9F9',
    grey: '#8FA5B2',
    overlay: '#8080807e',
}

const minScreenSize = '320px';

const viewport = {
    xs: 'screen and (min-width: 320px)',
    sm: 'screen and (min-width: 414px)'
}

const theme = {
    colors,
    viewport,
    minScreenSize
}

export function Theme(props) {
    const { children } = props;
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}