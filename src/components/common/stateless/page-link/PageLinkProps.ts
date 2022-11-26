import { ReactNode } from 'react';
import { Pages } from 'src/common/enums/Pages';

export default interface PageLinkProps {
    page: Pages;
    query?: string;
    params?: Record<string, string | number>;
    anchor?: boolean;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    prefetch?: boolean;
    disableAnchorEffects?: boolean;
    children?: ReactNode | undefined;
}
