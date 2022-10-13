import { Wrapper } from './styled';

export default function Button(props) {
    const { children, onClick, className } = props;
    return (
        <Wrapper
            onClick={onClick}
            className={className}>
            {children}
        </Wrapper>
    )
}