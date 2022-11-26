import { CacheProvider, EmotionCache, ThemeProvider as ScThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from 'src/common/configs/emotionCache';
import defaultTheme from 'src/common/styles/variables/themes/default-theme';
import { UserContextUser } from 'src/common/models/contexts/UserContext';
import { getPersistedUserContextUser, UserContext } from 'src/common/context/UserContext';
import { Layouts } from 'src/common/enums/Layouts';
import { DefaultProps } from 'src/common/models/common/DefaultProps';

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

const DashboardLayout = dynamic(() => import('src/components/common/stateful/dashboard-layout/DashboardLayout'), {
    ssr: false,
});

const clientSideEmotionCache = createEmotionCache();

interface InTouchAppProps extends AppProps {
    emotionCache?: EmotionCache;
}
const App: React.FC<InTouchAppProps> = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {
    const [userContextUser, setUserContextUser] = useState<UserContextUser | undefined>(getPersistedUserContextUser());

    const memoizedComponent = useMemo(() => {
        const layout = (Component.defaultProps as DefaultProps)?.layout;

        switch (layout) {
            case Layouts.Dashboard:
                return (
                    <DashboardLayout>
                        <Component {...pageProps} />
                    </DashboardLayout>
                );
            default:
                return <Component {...pageProps} />;
        }
    }, [Component, pageProps]);

    const userContextValue = useMemo(
        () => (userContextUser ? { user: userContextUser, setUserContextUser } : { setUserContextUser }),
        [userContextUser],
    );

    const components = useMemo(
        () => (
            <>
                <CssBaseline />
                {memoizedComponent}
                {userContextUser?.isLogged && (
                    <>
                        <UserContextUpdater />
                        <AccessTokenChecker />
                    </>
                )}
                <Toasts />
            </>
        ),
        [memoizedComponent, userContextUser?.isLogged],
    );

    return (
        <>
            {
                <CacheProvider value={emotionCache}>
                    <MuiThemeProvider theme={defaultTheme}>
                        <ScThemeProvider theme={defaultTheme}>
                            <UserContext.Provider value={userContextValue}>{components}</UserContext.Provider>
                        </ScThemeProvider>
                    </MuiThemeProvider>
                </CacheProvider>
            }
        </>
    );
};

export default App;
