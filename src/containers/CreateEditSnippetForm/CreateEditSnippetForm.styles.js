import styled from 'styled-components';

import FormControl from '@material-ui/core/FormControl';

const AuthorFormControl = styled(FormControl)`
  width: 100%;
`;

const CategoryFormControl = AuthorFormControl.extend`
  width: 100%;
`;

export { AuthorFormControl, CategoryFormControl };
