import { Pages } from '../enums/Pages';
import { UserContext } from '../models/contexts/UserContext';
import { BaseRouteItem } from '../models/dto/routes/RouteItem';
import { replaceAll } from './utilities';
import { getWindow } from './windowHelper';

export const routes: BaseRouteItem = {
    dashboard: '/dashboard',
    signIn: '/logowanie',
    createAccount: '/stworz-konto',
    resetPassword: '/resetuj-haslo',
    confirmEmail: '/confirm-email',
    settings: '/dashboard/ustawienia',
    invications: '/dashboard/zaproszenia',
};

export const getPagePathname = (page: Pages): string => {
    switch (page) {
        case Pages.createAccount:
            return routes.createAccount;
        case Pages.dashboard:
            return routes.dashboard;
        case Pages.signIn:
            return routes.signIn;
        case Pages.resetPassword:
            return routes.resetPassword;
        case Pages.confirmEmail:
            return routes.confirmEmail;
        case Pages.settings:
            return routes.settings;
        case Pages.invitations:
            return routes.invications;
        default:
            return routes.dashboard;
    }
};

const replaceParams = (url: string, params?: Record<string, string | number>): string => {
    if (params) {
        let newUrl = url.toString();
        Object.entries(params).forEach((entry) => {
            const key = entry[0];
            const value = entry[1];
            newUrl = newUrl.replace(`[${key}]`, value.toString());
        });
        return newUrl;
    }

    return url;
};

export interface GetPageUrlOptions {
    query?: string;
    params?: Record<string, string | number>;
    elementId?: string;
}

export const getPageUrl = (page: Pages, options?: GetPageUrlOptions): string => {
    let pageUrl = getPagePathname(page);

    if (options?.elementId) {
        pageUrl += '#' + options.elementId;
    }
    if (options?.query) {
        pageUrl += '?' + options.query;
    }
    if (options?.params) {
        pageUrl = replaceParams(pageUrl, options.params);
    }

    return pageUrl;
};

export const hasAccessToPage = (page: Pages, userContext: UserContext | null | undefined): boolean => {
    switch (page) {
        case Pages.signIn:
        case Pages.createAccount:
            return true;
        default:
            return Boolean(userContext?.user?.isLogged);
    }
};

export const isCurrentPage = (page: Pages, pathname: string): boolean => {
    return getPagePathname(page) === pathname;
};

export const decodeUrl = (url: string): string => {
    return replaceAll(url, '+', '%2B');
};

export const getQueryParams = (keys?: string | string[]): Record<string, null | string | string[]> => {
    const window = getWindow();
    const queryParams = window ? new URLSearchParams(decodeUrl(window.location.search)) : undefined;

    if (queryParams) {
        if (!keys) {
            const obj: Record<string, null | string | string[]> = {};
            for (const [key, value] of queryParams) {
                obj[key] = value;
            }
            return obj;
        } else if (Array.isArray(keys)) {
            return keys.reduce((acc, current) => ({ ...acc, [current]: queryParams.get(current) }), {});
        }
        return { [keys]: queryParams.get(keys) };
    } else return {};
};
