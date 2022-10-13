import styled from 'styled-components';

export const Overlay = styled.div`
    z-index: 15;
    display: ${({$isHidden}) => $isHidden ? 'none' : 'block'};
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: ${({$isHidden, theme}) => $isHidden ? 'none' : theme.colors.overlay};
`;

export const Content = styled.div`
    padding: 2rem;
    
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    
    background: ${({theme}) => theme.colors.background};
    box-shadow: 4px 4px 4px ${({theme}) => theme.colors.black20};
    border-radius: 0.5rem;
    z-index: 20;

    display: flex;
    flex-direction: column;
    align-items: center;
`;