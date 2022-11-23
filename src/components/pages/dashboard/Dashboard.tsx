import { Logout } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { getCurrentUserRequest } from 'src/api/auth/currentUserApi';
import { UserContext } from 'src/common/context/UserContext';
import { Pages } from 'src/common/enums/Pages';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { getPageUrl } from 'src/common/helpers/routingHelper';
import useCurrentUserHelper from 'src/components/hooks/use-current-user-helper/useCurrentUserHelper';
import { DContainer, DHeader, MainContainer } from './DashboardStyles';
import DashboardUserList from './DashboardUserList';

const Dashboard: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const { signOut } = useCurrentUserHelper();
    const router = useRouter();
    const userContext = useContext(UserContext);
    const isLogged = userContext.user?.isLogged;

    const goToLoginPage = useCallback(() => {
        router.push(getPageUrl(Pages.signIn));
    }, [router]);

    useEffect(() => {
        !isLogged && goToLoginPage();
    }, [goToLoginPage, isLogged]);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const getCurrentUser = useCallback(async () => {
        try {
            const request = await getCurrentUserRequest();
            setUserName(request.firstName);
        } catch (ex) {
            handleApiError(ex);
        }
    }, []);

    const handleLogout = () => {
        handleMenuClose();
        signOut();
    };

    useEffect(() => {
        getCurrentUser();
    }, [getCurrentUser]);

    return (
        <MainContainer>
            <DHeader>
                <Typography variant="h5" style={{ fontWeight: '600' }}>
                    Witaj {userName}
                </Typography>
                <IconButton color="inherit" aria-label="open drawer" onClick={handleOpenMenu}>
                    menu
                </IconButton>
                <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
                    <MenuItem onClick={handleLogout}>
                        <Logout /> Wyloguj
                    </MenuItem>
                </Menu>
            </DHeader>
            <Box>
                <DContainer>
                    <DashboardUserList />
                </DContainer>
            </Box>
        </MainContainer>
    );
};

export default Dashboard;
