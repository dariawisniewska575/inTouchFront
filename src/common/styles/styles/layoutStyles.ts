import { css } from '@emotion/react';

export const marginVerticalCenter = css`
    margin: 0 auto;
`;

export const verticallyCenteringContainer = css`
    display: flex;
    align-items: center;
`;

export const horizontallyCenteringContainer = css`
    display: flex;
    justify-content: center;
`;

export const centeringContainer = css`
    display: flex;
    justify-content: center;

    align-items: center;
`;

export const absoluteCenteringContainer = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const centeringMarginContainer = css`
    margin-top: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;
