import { Large } from '../../../components';
import { Wrapper } from './styled';

export default function WaitingRoom(props) {
    const { code } = props;

    return (
        <Wrapper>
            <div>Game code</div>
            <Large>{code}</Large>
        </Wrapper>
    )
}