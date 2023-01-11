import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const DContainer = styled(Box)`
    padding: 36px; ;
`;

export const DHeader = styled.div`
    min-height: 50px;
`;

export const DComponents = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const DModal = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 50px;
    border-radius: 20px;
`;
