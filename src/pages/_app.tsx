import { CacheProvider, EmotionCache, ThemeProvider as ScThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from 'src/common/configs/emotionCache';
import defaultTheme from 'src/common/styles/variables/themes';
import { UserContextUser } from 'src/common/models/contexts/UserContext';
import { getPersistedUserContextUser, UserContext } from 'src/common/context/UserContext';

const Toasts = dynamic(() => import('src/components/common/stateful/toasts/Toasts'), { ssr: false });

const AccessTokenChecker = dynamic(
    () => import('src/components/common/stateful/access-token-checker/AccessTokenChecker'),
);

const UserContextUpdater = dynamic(
    () => import('src/components/common/stateful/user-context-updater/UserContextUpdater'),
    {
        ssr: false,
    },
);

const clientSideEmotionCache = createEmotionCache();

interface InTouchAppProps extends AppProps {
    emotionCache?: EmotionCache;
}
const App: React.FC<InTouchAppProps> = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {
    const [userContextUser, setUserContextUser] = useState<UserContextUser | undefined>(getPersistedUserContextUser());

    const userContextValue = useMemo(
        () => (userContextUser ? { user: userContextUser, setUserContextUser } : { setUserContextUser }),
        [userContextUser],
    );

    const components = useMemo(
        () => (
            <>
                <CssBaseline />
                <Component {...pageProps} />
                {userContextUser?.isLogged && (
                    <>
                        <UserContextUpdater />
                    </>
                )}
                <AccessTokenChecker />
                <Toasts />
            </>
        ),
        [Component, pageProps, userContextUser?.isLogged],
    );

    return (
        <>
            <CacheProvider value={emotionCache}>
                <MuiThemeProvider theme={defaultTheme}>
                    <ScThemeProvider theme={defaultTheme}>
                        <UserContext.Provider value={userContextValue}>{components}</UserContext.Provider>
                    </ScThemeProvider>
                </MuiThemeProvider>
            </CacheProvider>
        </>
    );
};

export default App;
