import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Pages } from 'src/common/enums/Pages';
import { getPageUrl } from 'src/common/helpers/routingHelper';

const Home: React.FC = () => {
    const router = useRouter();

    const goToLoginPage = () => {
        router.push(getPageUrl(Pages.signIn));
    };
    return (
        <Button fullWidth variant="contained" color="primary" onClick={() => goToLoginPage()}>
            Logowanie
        </Button>
    );
};

export default Home;
