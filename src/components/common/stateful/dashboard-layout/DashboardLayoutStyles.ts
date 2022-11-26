import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { colors } from 'src/common/styles/variables/themes/colors';

export const MainContainer = styled(Box)`
    margin: 0px 200px 20px 200px;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

export const DHeader = styled(Box)`
    max-height: 100px;
    width: 100%;
    background: ${colors.lightBlue};
    justify-content: space-between;
    display: flex;
    padding: 16px;
    border-radius: 0px 0px 50px 50px;
    margin-bottom: 20px;
`;

export const DContainer = styled(Box)`
    min-height: 800px;
    border: 1px solid ${colors.lightBlue};
    border-radius: 20px;
    padding: 16px;
`;
