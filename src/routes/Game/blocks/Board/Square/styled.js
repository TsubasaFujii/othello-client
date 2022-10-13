import styled from 'styled-components';

export const Wrapper = styled.button`
    width: 100%;
    height: 100%;

    background: transparent;
    border: 0.05rem solid ${({theme}) => theme.colors.black};

    & > svg {
        width: 100%;
        height: 100%;
        margin: auto;
        
        & > circle {
            filter: drop-shadow(0px 4px 4px ${({theme}) => theme.colors.black20});
        }
    }

    &:disabled {
        // 5A: 35% transparency
        background: ${({theme}) => theme.colors.white}5A;
    }
`;