import { Avatar, Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CenteringMarginContainer } from 'src/components/common/stateless/centering-container/CenteringContainer';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CustomLink from 'src/components/common/stateful/custom-link/CustomLink';
import { Pages } from 'src/common/enums/Pages';
import { getQueryParams } from 'src/common/helpers/routingHelper';
import { handleApiError } from 'src/common/helpers/errorHelper';
import inTouchColors from 'src/common/styles/variables/themes/inTouchColors';
import { confirmEmailRequest } from 'src/api/authApi';

const ConfirmEmail: React.FC = () => {
    const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
    useEffect(() => {
        (async () => {
            const { userId, emailConfirmationToken } = getQueryParams();
            if (userId && emailConfirmationToken && !isEmailConfirmed) {
                try {
                    await confirmEmailRequest(userId as string, emailConfirmationToken as string);
                    setIsEmailConfirmed(true);
                } catch (ex) {
                    handleApiError(ex);
                }
            }
        })();
    }, [isEmailConfirmed]);
    return (
        <CenteringMarginContainer>
            {isEmailConfirmed && (
                <>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Email został potwierdzony
                    </Typography>
                    <Box component="form">
                        <Grid container>
                            <Grid item xs>
                                <div style={{ color: inTouchColors.lightBlue, fontWeight: '600' }}>
                                    <CustomLink page={Pages.signIn}>Przejdz do strony logowania</CustomLink>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}
        </CenteringMarginContainer>
    );
};

export default ConfirmEmail;
