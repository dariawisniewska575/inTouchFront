import styled from '@emotion/styled';
import { Chip } from '@mui/material';
import React from 'react';
import HintChipProps from './HintChipProps';
import { Check as CheckIcon } from '@mui/icons-material';
import { colors } from 'src/common/styles/variables/themes/colors';

export const HintChipContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 12px;
`;

const HintChipStyled = styled(Chip, {
    shouldForwardProp: (prop) => (prop === '$isValid' ? false : true),
})<{ $isValid?: boolean }>`
    padding: 0 8px;
    color: ${colors.lighterBlue};
    ${(props) =>
        props.$isValid === true &&
        `
        background-color: ${colors.green};
        color: ${colors.white};
    `}
    ${(props) =>
        props.$isValid === false &&
        `
        background-color: #${colors.white};
        color: ${colors.black};
    `}
`;

const HintChip: React.FC<HintChipProps> = (props) => {
    return (
        <HintChipStyled
            variant="outlined"
            $isValid={props.success}
            color={props.success ? 'success' : props.success ? 'error' : 'info'}
            label={props.label}
            icon={props.icon && props.success ? <CheckIcon css={{ width: 16, marginLeft: 8 }} /> : undefined}
        />
    );
};

export default HintChip;
