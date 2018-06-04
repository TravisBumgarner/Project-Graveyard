import styled from 'styled-components';
import { lighten, darken } from 'polished';

import {
  View,
} from 'react-native';

const DEFAULT_VIEW = styled(View)`
  flex: 1;
`;

const COLORS = {
  PRIMARY: '#383A54',
  SECONDARY: '#D8D8F6',
  TERTIARY: '#B18FCF',
  DARKEN: (color) => {
    darken(0.2, color);
  },
  BRIGHTEN: (color) => {
    darken(0.2, color);
  },
};

export {
  DEFAULT_VIEW,
  COLORS,
}