import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import brown from '@material-ui/core/colors/brown';

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[800],
    },
    secondary: {
      main: brown[500],
    },
  },
});

export default lightTheme