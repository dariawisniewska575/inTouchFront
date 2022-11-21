import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Pages } from 'src/common/enums/Pages';
import { getPageUrl, GetPageUrlOptions } from 'src/common/helpers/routingHelper';

const useRouterHelper = () => {
    const router = useRouter();

    const push = useCallback(
        async (page: Pages, options?: GetPageUrlOptions) => {
            await router.push(getPageUrl(page, options));
        },
        [router],
    );

    const replace = useCallback(
        async (page: Pages, options?: GetPageUrlOptions) => {
            await router.replace(getPageUrl(page, options));
        },
        [router],
    );

    return {
        ...router,
        push,
        replace,
    };
};

export default useRouterHelper;
