import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getCurrentUserRequest } from 'src/api/currentUserApi';
import { Pages } from 'src/common/enums/Pages';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { colors } from 'src/common/styles/variables/themes/colors';
import useCurrentUserHelper from 'src/components/hooks/use-current-user-helper/useCurrentUserHelper';
import PageLink from '../../stateless/page-link/PageLink';
import { DashboardLayoutProps } from './DashboardLayoutProps';
import { DContainer, DHeader, MainContainer } from './DashboardLayoutStyles';

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
    const [userName, setUserName] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const { signOut } = useCurrentUserHelper();
    const [avatar, setAvatar] = useState<string>();
    const welcomeUser = useMemo(() => {
        return 'Witaj ' + userName;
    }, [userName]);
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
            setAvatar(request.avatarSource);
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
                <PageLink page={Pages.dashboard}>{welcomeUser}</PageLink>
                <IconButton color="inherit" aria-label="open drawer" onClick={handleOpenMenu}>
                    {avatar ? (
                        <Avatar src={avatar} />
                    ) : (
                        <Avatar sx={{ background: colors.white, color: colors.black }}> {userName[0]}</Avatar>
                    )}
                </IconButton>
                <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
                    <MenuItem>
                        <PageLink page={Pages.invitations}>Zaproszenia i blokady</PageLink>
                    </MenuItem>
                    <MenuItem>
                        <PageLink page={Pages.settings}>Ustawienia </PageLink>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <PageLink page={Pages.signIn}>Wyloguj</PageLink>
                    </MenuItem>
                </Menu>
            </DHeader>
            <Box>
                <DContainer>{props.children}</DContainer>
            </Box>
        </MainContainer>
    );
};

export default DashboardLayout;
