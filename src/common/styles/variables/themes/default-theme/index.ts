import { createTheme, PaletteOptions } from '@mui/material/styles';
import { defaultFont } from 'src/common/styles/fonts';
import { colors } from '../colors';
import inTouchColors from '../inTouchColors';

import palette from '../palette';

export default createTheme({
    palette: palette as PaletteOptions,
    inTouchColors: inTouchColors,
    typography: {
        fontFamily: defaultFont.fontFamily,
        fontWeightBold: 600,
        button: {
            textTransform: 'none',
            height: '56px',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            body {
              color: ${colors.darkGray};
              background-color: ${colors.lightGray};
            }
            a {
                color: inherit;
                text-decoration: none;
                color: ${colors.darkBlue};
                font-weight: 500;
              }
          `,
        },
    },
    breakpoints: {
        values: {
            xs: 400,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});
