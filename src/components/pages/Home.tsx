import { Button } from '@mui/material';
import React from 'react';

const Home: React.FC = () => {
    //   const router = useRouter();

    //   const goToLoginPage = () => {
    //     router.push(getPageUrl(Pages.signIn));
    //   };
    return (
        <Button
            fullWidth
            variant="contained"
            color="primary"
            // onClick={() => goToLoginPage()}
        >
            Logowanie
        </Button>
    );
};

export default Home;
