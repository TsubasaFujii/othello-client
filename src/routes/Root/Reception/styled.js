import styled from 'styled-components';

const Flex = styled.div`
    max-width: 100%;
    display: flex;
    gap: 1rem;
`;

export const Wrapper = styled(Flex)`
    flex-direction: column;
    align-items: center;
`;

export const FlexRow = styled(Flex)`
    flex-direction: row;
`;

export const Left = styled.div`
    width: 100%;
    text-align: left;
`;

export const Input = styled.input.attrs(() => ({
    type: 'number',
    autoFocus: true,
}))`
    flex: 1;
    width: 100%;

    padding: 1rem 1.5rem;

    border: none;
    background: ${({theme}) => theme.colors.white};
    border-radius: 0.2rem;
`;