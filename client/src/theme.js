import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#222831',
      white: '#EEEEEE'
    },
    primary: {
      darker: '#1A1D20',
      dark: '#2A2E33',
      main: '#393E46',
      light: '#6F7278',
      lighter: '#A5A7AA'
    },
    secondary: {
      darker: '#695E42',
      dark: '#A79669',
      main: '#E5CD90',
      light: '#ECDAAE',
      lighter: '#F3E8CC'
    },
    error: {
      darker: '#622B19',
      dark: '#9C4427',
      main: '#D65D35',
      light: '#E1896C',
      lighter: '#ECB5A3'
    },
    warning: {
      darker: '#694D3A',
      dark: '#A77B5C',
      main: '#E5A97E',
      light: '#ECC0A1',
      lighter: '#F3D7C4'
    },
    success: {
      darker: '#5C623F',
      dark: '#939C64',
      main: '#C9D689',
      light: '#D7E1A9',
      lighter: '#E6ECC9'
    },
    info: {
      darker: '#495762',
      dark: '#758B9C',
      main: '#A0BED6',
      light: '#B9CFE1',
      lighter: '#D3E1EC'
    },
    gray: {
      darker: '#56585B',
      dark: '#7A7D82',
      main: '#9C9EA2',
      light: '#BDBEC1',
      lighter: '#DEDEE0'
    },
    background: {
      default: '#EEEEEE'
    }
  }
});

export default theme;
