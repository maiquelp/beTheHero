import styled from 'styled-components';
import { RefreshCw } from '@styled-icons/feather';

export const Spinner = styled(RefreshCw)`
    animation: rotation 2s infinite linear;
    width: 18px;
    height: 18px;
    color: #fff;
    stroke-width: 3;
    margin-right: 5px;
`;