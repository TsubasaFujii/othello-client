import styled from 'styled-components';

export const Wrapper = styled.button`
    min-width: 6rem;
    padding: 1rem 1.5rem;

    background-color: ${({theme, secondary}) => secondary ? theme.colors.white : theme.colors.primary};
    box-shadow: 4px 4px 4px ${({theme}) => theme.colors.black20};
    border-radius: calc(2rem + 1.2rem);
    border: none;

    &:hover {
        background-color: ${({theme}) => theme.colors.dark};
    }

    &:active {
        background-color: ${({theme}) => theme.colors.light};
    }
    
`;