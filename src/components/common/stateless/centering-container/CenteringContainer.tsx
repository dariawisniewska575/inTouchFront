import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import {
    absoluteCenteringContainer,
    centeringContainer,
    centeringMarginContainer,
    horizontallyCenteringContainer,
    marginVerticalCenter,
    verticallyCenteringContainer,
} from 'src/common/styles/styles/layoutStyles';

const baseStyle = styled('div', {
    shouldForwardProp: (prop) => isPropValid(prop),
})<{ $column?: boolean; $gap?: string }>`
    gap: ${(props) => props.$gap};
    flex-direction: ${(props) => (props.$column ? 'column' : 'row')};
`;

export default styled(baseStyle)`
    ${centeringContainer}
`;

export const VerticallyCenteringContainer = styled(baseStyle)`
    ${verticallyCenteringContainer}
`;

export const HorizontallyCenteringContainer = styled(baseStyle)`
    ${horizontallyCenteringContainer}
`;

export const AbsoluteCenteringContainer = styled.div`
    ${absoluteCenteringContainer}
`;

export const MarginVerticalCenter = styled(baseStyle)`
    ${marginVerticalCenter}
`;

export const CenteringMarginContainer = styled(baseStyle)`
    ${centeringMarginContainer}
`;
