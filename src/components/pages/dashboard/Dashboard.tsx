import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/common/context/UserContext';
import { Pages } from 'src/common/enums/Pages';
import { getPageUrl } from 'src/common/helpers/routingHelper';
import DashboardChatsList from './DashboardChatsList';
import { DComponents } from './DashboardStyles';
import DashboardMessage from './DashboardMessage';
import { ChatType } from 'src/common/enums/ChatType';
import PrivateComponent from 'src/components/common/stateful/private-component/PrivateComponent';

const Dashboard: React.FC = () => {
    const router = useRouter();
    const userContext = useContext(UserContext);
    const isLogged = userContext.user?.isLogged;
    const [chatId, setChatId] = useState('');
    const [chatUserName, setChatUserName] = useState('');
    const [chatType, setChatType] = useState<ChatType>(ChatType.PRIVATE);
    const goToLoginPage = useCallback(() => {
        router.push(getPageUrl(Pages.signIn));
    }, [router]);

    useEffect(() => {
        !isLogged && goToLoginPage();
    }, [goToLoginPage, isLogged]);

    return (
        <PrivateComponent>
            <DComponents>
                <DashboardChatsList setChatId={setChatId} setChatUserName={setChatUserName} setChatType={setChatType} />
                <DashboardMessage chatId={chatId} chatUserName={chatUserName} chatType={chatType} />
            </DComponents>
        </PrivateComponent>
    );
};

export default Dashboard;
