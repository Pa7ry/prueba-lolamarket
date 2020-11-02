import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
// import { Ubuntu } from './fonts/ubuntu-fonts';

const baseTheme = createMuiTheme({});
const theme = responsiveFontSizes(baseTheme);

export default theme;
