import React from 'react'

import styled from 'styled-components'

const NormalList = styled.ul`
`

const NormalItem = styled.li`
`

type ListProps = {
    children: React.ReactNode
}

type ItemProps = {
    children: React.ReactNode
}

const List = ({ children }: ListProps) => {
    return <NormalList>{children}</NormalList>
}

List.Item = ({ children }: ItemProps) => {
    return <NormalItem>{children}</NormalItem>
}

export default List


