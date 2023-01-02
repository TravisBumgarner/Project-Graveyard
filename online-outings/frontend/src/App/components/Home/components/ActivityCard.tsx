import React from 'react'
import styled from 'styled-components'
import { v5 as uuidv5 } from 'uuid'

import { Header, Text } from 'shared'
import { categoryIconMap, Category, categoryNameMap } from 'utilities'

type Activity = {
    id: string
    name: string
    links: {
        name: string
        url: string
        id: number
    }[]
    description: string
    categories: {
        name: Category
        id: string
    }[]
}

const CategoryLabelList = styled.ul`
    margin: 0;
    padding: 0;

`

const CategoryLabel = styled(({ name, className }: { name: Category }) => {
    const Icon = categoryIconMap[name]
    return <li className={className}><Icon /><span>{categoryNameMap[name]}</span></li>
})`
    display: inline-block;
    background-color: white;
    border-radius: 7px;
    padding: 0px 6px;
    margin-right: 6px;
    font-size: 0.75em;
    
    span {
        display: inline-block;
        position: relative;
        top: -6px;
        margin-left: 6px;
    }

    svg {
        position: relative;
        top: 2px;
    }
`

const Wrapper = styled.div`
    background-color: hsl(${({ randInt }: { randInt: string }) => randInt}, 100%, 81%);
    border-radius: 15px;
    padding: 15px;
`

const convertNameToHue = (str: string) => {
    // This is excessive. I know.
    const MY_NAMESPACE = '01d09e82-ce76-402a-bc81-5e2fd2f5386a'
    const uuid = uuidv5(str, MY_NAMESPACE)
    let hash = 0;
    for (let i = 0; i < uuid.length; i++) {
        const chr = uuid.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0
    }
    return Math.abs(hash % 360);
}

const ActivityCard = ({ id, name, description, links, categories }: Activity & { className: string }) => {
    return <Wrapper randInt={`${convertNameToHue(name)}`}>
        <Header size="medium">{name}</Header>
        <ul>
            {links.map(({ name, url, id }) => (
                <li key={id}>
                    <a target="_blank" href={url}>{name}</a>
                </li>
            ))}
        </ul>
        <Text>{description}</Text>
        <CategoryLabelList>
            {categories
                .sort((a, b) => a.name < b.name ? -1 : 1)
                .map(({ name, id }) => <CategoryLabel key={id} name={name} />)}
        </CategoryLabelList>
    </Wrapper>
}

export default ActivityCard
export { Activity }