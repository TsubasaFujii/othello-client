import styled from 'styled-components';

export const Wrapper = styled.div`
    // Score board takes 0.5fr (one part) and board will take 3fr (6 parts)
    width: calc((100vmin / 7) * 6);
    height: calc((100vmin / 7) * 6);
    padding: 1rem;

    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, minmax(0, 1fr));

    background: ${({theme}) => theme.colors.board};

    @media ${({theme}) => theme.viewport.sm} {
        width: calc((80vmin / 7) * 6);
        height: calc((80vmin / 7) * 6);
    }
`;