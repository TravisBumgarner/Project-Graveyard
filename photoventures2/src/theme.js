import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  cyan500,
  pinkA200,
  grey100, grey300, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

const Theme = getMuiTheme({
  palette: {
    primary1Color: '#e01f58',
    primary2Color: '#4de06a',
    primary3Color: '#e0dc41',
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: '#000000',
    alternateTextColor: '#000000',
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
});

export default Theme;
