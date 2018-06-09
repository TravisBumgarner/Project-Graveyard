import styled from 'styled-components';

import Card from '@material-ui/core/Card';

const SnippetListItemCard = styled(Card)`
  margin: 10px 0;
  background-color: ${props => props.color} !important;
`;

export { SnippetListItemCard };
