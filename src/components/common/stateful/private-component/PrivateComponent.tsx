import { useRouter } from 'next/router';
import React, { useContext, useMemo } from 'react';
import { UserContext } from 'src/common/context/UserContext';
import { Pages } from 'src/common/enums/Pages';
import { getPageUrl } from 'src/common/helpers/routingHelper';
import { isAuthorized } from './PrivateComponentHelper';
import { PrivateComponentProps } from './PrivateComponentProps';

const PrivateComponent: React.FC<PrivateComponentProps> = (props) => {
    const { children } = props;
    const userContext = useContext(UserContext);
    const hasAccess = useMemo(() => isAuthorized(userContext), [userContext]);
    const router = useRouter();
    // do not render anything when token is being checked to prevent 401 errors
    if (userContext?.user?.isTokenBeingChecked) {
        return null;
    }
    if (!hasAccess) {
        router.push(getPageUrl(Pages.signIn));

        return <div>Unauthorized</div>;
    }

    return children ? <>{children}</> : null;
};

export default PrivateComponent;
