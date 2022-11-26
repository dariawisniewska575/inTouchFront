import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect } from 'react';
import { UserContext } from 'src/common/context/UserContext';
import { Pages } from 'src/common/enums/Pages';
import { getPageUrl } from 'src/common/helpers/routingHelper';
import DashboardUserList from './DashboardUserList';

const Dashboard: React.FC = () => {
    const router = useRouter();
    const userContext = useContext(UserContext);
    const isLogged = userContext.user?.isLogged;

    const goToLoginPage = useCallback(() => {
        router.push(getPageUrl(Pages.signIn));
    }, [router]);

    useEffect(() => {
        !isLogged && goToLoginPage();
    }, [goToLoginPage, isLogged]);

    return <DashboardUserList />;
};

export default Dashboard;
