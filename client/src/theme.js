import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#222831',
      white: '#EEEEEE',
    },
    primary: {
      main: '#393E46',
    },
    secondary: {
      main: '#E5CD90',
    },
    error: {
      main: '#D65D35',
    },
    warning: {
      main: '#E5A97E',
    },
    success: {
      main: '#C9D689',
    },
    info: {
      main: '#A0BED6',
    },
  },
});

export default theme;
