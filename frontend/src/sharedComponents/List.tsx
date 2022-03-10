import styled from 'styled-components'

import colors from './colors'

const OrderedList = styled.ol`
    color: ${colors.PRIMARY.base};
`

const UnorderedList = styled.ol`
    color: ${colors.PRIMARY.base};
`

const ListItem = styled.li`
`

export {
    OrderedList,
    UnorderedList,
    ListItem
}
