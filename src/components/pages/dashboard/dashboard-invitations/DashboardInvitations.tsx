import { Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
    acceptInviteToFriendRequest,
    cancelInviteRequest,
    getBlockedUsersRequest,
    getInvitedUsersRequest,
    getWaitingsRequest,
    rejectInviteToFriendRequest,
    unblockUserRequest,
} from 'src/api/usersApi';
import { handleApiError } from 'src/common/helpers/errorHelper';
import { User } from 'src/common/models/dto/user/User';
import { colors } from 'src/common/styles/variables/themes/colors';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import PrivateComponent from 'src/components/common/stateful/private-component/PrivateComponent';
const DashboardInvications = (): JSX.Element => {
    const [invitees, setInvitees] = useState<User[]>([]);
    const [waitings, setWaitings] = useState<User[]>([]);
    const [blocked, setBlocked] = useState<User[]>([]);

    const getInvitees = useCallback(async () => {
        try {
            const response = await getInvitedUsersRequest('');
            setInvitees(response);
        } catch (ex) {
            handleApiError(ex);
        }
    }, []);

    const getWaitings = useCallback(async () => {
        try {
            const response = await getWaitingsRequest('');
            setWaitings(response);
        } catch (ex) {
            handleApiError(ex);
        }
    }, []);

    const cancelInvite = useCallback(
        async (userId: string) => {
            try {
                await cancelInviteRequest(userId);
                toast.success('Anulowano zaproszenie');
                getInvitees();
            } catch (ex) {
                handleApiError(ex);
            }
        },
        [getInvitees],
    );

    const acceptInvite = useCallback(
        async (userId: string) => {
            try {
                await acceptInviteToFriendRequest(userId);
                toast.success('Zaakceptowano zaproszenie');
                getWaitings();
            } catch (ex) {
                handleApiError(ex);
            }
        },
        [getWaitings],
    );
    const rejectInvite = useCallback(
        async (userId: string) => {
            try {
                await rejectInviteToFriendRequest(userId);
                toast.success('Usunięto zaproszenie');
                getWaitings();
            } catch (ex) {
                handleApiError(ex);
            }
        },
        [getWaitings],
    );

    const getBlocked = useCallback(async () => {
        try {
            const response = await getBlockedUsersRequest('');
            setBlocked(response);
        } catch (ex) {
            handleApiError(ex);
        }
    }, []);

    const unblockUser = useCallback(
        async (userId: string) => {
            try {
                await unblockUserRequest(userId);
                toast.success('Odblokowano użytkownika');
                getBlocked();
            } catch (ex) {
                handleApiError(ex);
            }
        },
        [getBlocked],
    );

    useEffect(() => {
        getInvitees();
        getWaitings();
        getBlocked();
    }, [getBlocked, getInvitees, getWaitings]);
    return (
        <PrivateComponent>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                <div>
                    <Typography variant="h5">Wysłane zaproszenia</Typography>
                    {invitees.length > 0 ? (
                        invitees.map((invitedUser) => (
                            <div
                                style={{
                                    background: colors.lightBlueOpacity,
                                    margin: '16px',
                                    padding: '10px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                                key={invitedUser.id}
                            >
                                <div>
                                    {invitedUser.firstName} {invitedUser.lastName}
                                </div>
                                <div style={{ marginTop: '2px' }}>
                                    <AiOutlineClose onClick={() => cancelInvite(invitedUser.id)} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ fontStyle: 'italic' }}>Brak wysłanych zaproszeń</div>
                    )}
                </div>
                <div>
                    <Typography variant="h5">Otrzymane zaproszenia</Typography>
                    {waitings.length > 0 ? (
                        waitings.map((waitingUser) => (
                            <div
                                style={{
                                    background: colors.lightBlueOpacity,
                                    margin: '16px',
                                    padding: '10px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                                key={waitingUser.id}
                            >
                                <div>
                                    {waitingUser.firstName} {waitingUser.lastName}
                                </div>
                                <div style={{ marginTop: '2px' }}>
                                    <AiOutlineCheck onClick={() => acceptInvite(waitingUser.id)} />
                                    <AiOutlineClose onClick={() => rejectInvite(waitingUser.id)} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ fontStyle: 'italic' }}>Brak otrzymanych zaproszeń</div>
                    )}
                </div>
                <div>
                    <Typography variant="h5">Zablokowani użytkownicy</Typography>
                    {blocked.length > 0 ? (
                        blocked.map((blockedUser) => (
                            <div
                                style={{
                                    background: colors.lightBlueOpacity,
                                    margin: '16px',
                                    padding: '10px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                                key={blockedUser.id}
                            >
                                <div>
                                    {blockedUser.firstName} {blockedUser.lastName}
                                </div>
                                <div
                                    onClick={() => unblockUser(blockedUser.id)}
                                    style={{
                                        fontSize: '12px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '4px',
                                        border: `1px solid ${colors.lightBlue}`,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Odblokuj
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ fontStyle: 'italic' }}>Brak zablokowanych użytkowników</div>
                    )}
                </div>
            </div>
        </PrivateComponent>
    );
};

export default DashboardInvications;
