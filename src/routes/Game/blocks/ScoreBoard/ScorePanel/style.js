import styled from 'styled-components';
import { Large } from '../../../../../components';

export const Points = styled(Large)`
    grid-column: 1 / span 3;
    grid-row: 2 / span 1;

    width: 100%;
    padding: 0.5rem 1.5rem;
    position: relative;
    z-index: 5;

    text-align: center;
    background-color: ${({theme}) => theme.colors.white};
    border-radius: 0.5rem;
    border: ${({theme, $current}) => $current ? `2px solid ${theme.colors.black}` : 'none'};
`;

export const Wrapper = styled.div`
    min-width: calc(100% / 3);
    padding: 1rem 0;

    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, max-content);

    align-items: center;
`;

export const Title = styled.span`
    grid-column: 1 / span 3;
    grid-row: 1 / span 1;
    text-align: center;
`;

export const Disc = styled.div`
    grid-column: ${({$color}) => $color === 'black' ? 3 : 1} / span 1;
    grid-row: 2 / span 1;

    width: 100%;
    position: relative;
    z-index: 7;
    transform: translateX(${({$color}) => $color === 'black' ? '50%' : '-50%'});

    filter: drop-shadow(4px 4px 4px ${({theme}) => theme.colors.black20});
`;