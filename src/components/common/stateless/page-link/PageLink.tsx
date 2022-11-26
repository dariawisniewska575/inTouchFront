import Link from 'next/link';
import React, { useMemo } from 'react';
import { getPageUrl } from 'src/common/helpers/routingHelper';
import PageLinkProps from './PageLinkProps';
import styled from '@emotion/styled';

export const Anchor = styled.a`
    &:active,
    &:focus,
    &:hover {
        background-color: transparent;
        cursor: pointer;
    }
    -webkit-tap-highlight-color: transparent;
`;

const PageLink: React.FC<PageLinkProps> = (props) => {
    const href = getPageUrl(props.page, { params: props.params, query: props.query });

    const linkProps = useMemo(() => {
        return {
            shallow: props.shallow,
            replace: props.replace,
            scroll: props.scroll,
            prefetch: props.prefetch,
            href: href,
        };
    }, [href, props.prefetch, props.replace, props.scroll, props.shallow]);

    return useMemo(
        () => (
            <Link {...linkProps}>
                {props.anchor ? (
                    props.disableAnchorEffects ? (
                        <Anchor href={linkProps.href}>{props.children}</Anchor>
                    ) : (
                        <a>{props.children}</a>
                    )
                ) : (
                    props.children
                )}
            </Link>
        ),
        [linkProps, props.anchor, props.children, props.disableAnchorEffects],
    );
};

export default PageLink;
