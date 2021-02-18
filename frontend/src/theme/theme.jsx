import { createMuiTheme } from '@material-ui/core/styles';
import NunitoTTF from './fonts/Nunito/Nunito-Regular.ttf';

const nunito = {
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('Nunito'),
      local('Nunito-Regular'),
      url(${NunitoTTF}) format('ttf')
    `,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  };
  
export const defaultTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#274472'
        },
        secondary: {
            main: '#80faf8'
        },
        background: {
            default: '#E9EFF5'
        },
        text: {
            primary: '#37517e',
            secondary: 'rgba(55, 81, 126, 0.7)',
            disabled: 'rgba(55, 81, 126, 0.5)',
            hint: 'rgba(55, 81, 126, 0.5)',
        }
    },
    typography: {
        fontFamily: 'Nunito, Roboto, San-Serif',
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
              '@font-face': [nunito],
            },
          },
    }
});

export const lightTheme = defaultTheme;

export const darkTheme = {
    palette: {
      type: 'dark',
      primary: {
        main: '#80faf8'
      },
      secondary: {
        main: '#274472'
      },
      background: {
        default: '#2b3b41'
      },
      text: {
        primary: '#fff',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
        hint: 'rgba(255, 255, 255, 0.5)',
        icon: 'rgba(255, 255, 255, 0.5)'
      },
      divider: 'rgba(255, 255, 255, 0.12)'
    },
    typography: {
      fontFamily: 'Nunito, Roboto, San-Serif',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [nunito],
        },
      },
    },
  };