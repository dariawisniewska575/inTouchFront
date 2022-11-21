import Link from 'next/link';
import React from 'react';
import { getPageUrl } from 'src/common/helpers/routingHelper';
import CustomLinkProps from './CustomLinkProps';

const CustomLink: React.FC<CustomLinkProps> = (props) => {
    const href = props.href ?? getPageUrl(props.page);

    return (
        <Link href={href}>
            <div {...props} style={{ cursor: 'pointer' }}>
                {props.children}
            </div>
        </Link>
    );
};

export default CustomLink;
