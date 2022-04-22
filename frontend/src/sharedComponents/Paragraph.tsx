import styled from 'styled-components'

import colors from './colors'

type ParagraphProps = {
    color?: string
}

const Paragraph = styled.p`
    ${({ color }: ParagraphProps) => `color: ${color || colors.PRIMARY.base};`}
`

export default Paragraph
