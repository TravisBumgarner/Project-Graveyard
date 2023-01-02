import styled from 'styled-components';

import {
  DEFAULT_VIEW,
  COLORS,
} from "../../theme";

const HomeView = DEFAULT_VIEW.extend`
  background-color: ${ COLORS.PRIMARY };
`;

export {
  HomeView,
}