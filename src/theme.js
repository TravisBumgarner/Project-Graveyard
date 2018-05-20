import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styled, { css } from 'styled-components';

// ============================================= //
// == Constants ================================ //
// ============================================= //

// Colors
export const PRIMARY_COLOR = '#000000';
export const SECONDARY_COLOR = '#FFFFFF';
export const TERTIARY_COLOR = '#13cf00';

// Fonts
export const FONT_SIZE_SMALL = '0.8rem';
export const FONT_SIZE_NORMAL = '0.9rem';
export const FONT_NORMAL_LINE_HEIGHT = '1.4';
export const FONT_SIZE_LARGE = '1.5rem';
export const FONT_SIZE_XLARGE = '1.8rem';
export const FONT_FAMILY_HEADER = "'Montserrat', sans-serif";
export const FONT_FAMILY_CONTENT = "'Comic Sans', Helvetica, Arial, sans-serif";
export const FONT_WEIGHT_HEADER = 700;
export const FONT_WEIGHT_CONTENT = 400;


// Misc
export const SCREEN_WIDTHS = {
  DESKTOP: 992,
  TABLET: 768,
  PHONE: 376,
};

// ============================================= //
// == Styled Components ======================== //
// ============================================= //

// Media Queries
export const media = Object.keys(SCREEN_WIDTHS).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${SCREEN_WIDTHS[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc
}, {});

// Shared Styles
export const DEFAULT_PAGE_WRAPPER = styled.div`
  margin: 0;
  color: ${PRIMARY_COLOR};
  background-color: ${SECONDARY_COLOR};
  font-family: ${FONT_FAMILY_CONTENT};
  font-size: ${FONT_SIZE_NORMAL};
  font-weight: ${FONT_WEIGHT_CONTENT};
  line-height: ${FONT_NORMAL_LINE_HEIGHT};
  position: relative;
  height: 90vh;
  overflow: hidden;
`;

// ============================================= //
// == Material UI  ============================= //
// ============================================= //

export const muiTheme = getMuiTheme({
  palette: {
    textColor: `${PRIMARY_COLOR}`,
    fontFamily: `${FONT_FAMILY_CONTENT}`,
    primary1Color: `${TERTIARY_COLOR}`,
    primary2Color: `${TERTIARY_COLOR}`,
    primary3Color: `${TERTIARY_COLOR}`,
    accent1Color: `${TERTIARY_COLOR}`,
    accent2Color: `${TERTIARY_COLOR}`,
    accent3Color: `${TERTIARY_COLOR}`,
  },
});

