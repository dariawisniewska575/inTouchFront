import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { colors } from 'src/common/styles/variables/themes/colors';

export const USContainer = styled.div``;

export const USSmallBoxContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const USSmallBox = styled(Box)`
    margin-top: 20px;
    border: 1px solid ${colors.lightBlue};
    border-radius: 30px;
    padding: 40px 50px;
    margin: 20px 60px;
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
    @media screen and (max-width: 1280px) {
        margin: 30px 30px;
    }
    @media screen and (max-width: 960px) {
        margin: 10px 10px;
        padding: 20px 10px;
    }
`;

export const USSmallerBoxContainer = styled(Box)`
    display: flex;
    width: 100%;
    flex-direction: column;
`;
