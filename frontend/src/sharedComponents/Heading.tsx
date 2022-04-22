import styled from 'styled-components'

import colors from './colors'

const H1 = styled.h1`
    color: ${colors.PRIMARY.base};
`

const H2 = styled.h2`
    color: ${colors.SECONDARY.base};
    padding-bottom: 1rem;
`

const H3 = styled.h3`
    color: ${colors.SECONDARY.base};
`

const H4 = styled.h4`
    color: ${colors.TERTIARY.base};
`

export { H1, H2, H3, H4 }
