import styled from 'styled-components';

import {
  Text,
  View,
} from 'react-native';

const Header = styled(Text)`
  color: palevioletred;
`;

const AppView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: papayawhip;
`;

export {
  Header,
  AppView,
}