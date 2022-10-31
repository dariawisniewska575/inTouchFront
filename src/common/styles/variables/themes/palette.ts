import { PaletteOptions } from '@mui/material';
import { colors } from './colors';

const primaryColors: Partial<PaletteOptions> = {
    primary: {
        main: colors.lightBlue,
        contrastText: colors.black,
        dark: colors.darkGray,
    },
    secondary: {
        main: colors.darkGray,
        contrastText: colors.lightGray,
    },
};

const actionColors: Partial<PaletteOptions> = {
    action: {
        disabledBackground: colors.darkGray,
    },
};

const infoColors: Partial<PaletteOptions> = {
    info: {
        main: colors.darkGray,
        contrastText: colors.lightGray,
    },
};

export default {
    ...primaryColors,
    ...actionColors,
    ...infoColors,
};
