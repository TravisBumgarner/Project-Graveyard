import React from "react"
import styled from "styled-components"

import {
    Text,
    H2,
    H3,
    Section,
    SectionWrapper,
    SectionContent,
} from "sharedComponents"

const KeyCapWrapper = styled.div``

const COLORS = {
    black: "#2e2e2e",
    white: "#f0efed",
    tan: "#d7d3c7",
    gray1: "#aeada8",
    gray2: "#7a7a7a",
    gray3: "#5e5a57",
    red: "#d42929",
    pink: "#fac7cc",
    orange: "#ff9144",
    yellow: "#f3da42",
    brown: "#9b6b47",
    olive: "#887e4b",
    forrest: "#648733",
    lime: "#65d559",
    turqouise: "#8bdfae",
    navy: "#3e578f",
    blue: "#4360d5",
    lblue: "#95c8f3",
    purple: "#564186",
    lpurple: "#bcaeeb"

}

const KEYBOARD_WIDTH = '300px'

const Key = styled.div`
    background-color: ${({ color }) => color};
    width: calc(${KEYBOARD_WIDTH} / 3);
    height: calc(${KEYBOARD_WIDTH} / 3);
    display: flex;
    align - items: center;
    justify - content: center;
    box-sizing: border-box;
    margin: 5px 0;
    display: inline-block;

    &:nth-child(3n + 2){
        margin-left: 10px;
        margin-right: 10px;
    }
`

const Keyboard = styled.div`
    width: calc(${KEYBOARD_WIDTH} + 20px);
    background-color: white;
    padding: 20px;

`

const keyboards = [
    {
        keys: ['orange', 'purple', 'orange', 'purple', 'orange', 'purple',],
        title: "Orange and Purple"
    },
    {
        keys: ['pink', 'lpurple', 'lblue', 'lime', 'white', 'turqouise',],
        title: "Pastels"
    },
    {
        keys: ['black', 'black', 'black', 'black', 'black', 'black',],
        title: "All Black"
    },
    {
        keys: ['white', 'white', 'white', 'white', 'white', 'white',],
        title: "All White"
    },
    {
        keys: ['red', 'orange', 'yellow', 'blue', 'black', 'white',],
        title: "Solids"
    },
    {
        keys: ['turqouise', 'lime', 'navy', 'lblue', 'blue', 'gray1',],
        title: "Sea"
    },
    {
        keys: ['red', 'orange', 'yellow', 'yellow', 'red', 'orange',],
        title: "Fire"
    },
    {
        keys: ['gray1', 'gray2', 'gray3', 'white', 'gray1', 'gray2',],
        title: "Cloudy"
    },
    {
        keys: ['navy', 'blue', 'lblue', 'blue', 'lblue', 'navy',],
        title: "Blues"
    },
    {
        keys: ['brown', 'turqouise', 'brown', 'turqouise', 'brown', 'turqouise',],
        title: "Mint Chocolate Chip"
    },
    {
        keys: ['lime', 'lime', 'navy', 'lime', 'navy', 'navy',],
        title: "Triangles"
    },
]


const KeyCaps = () => {

    const Keyboards = keyboards.map(({ title, keys }) => {
        return <>
            <H2>{title}</H2>
            <Keyboard>
                {keys.map(key => <Key color={COLORS[key]} />)}
            </Keyboard>
        </>
    })

    return (
        <KeyCapWrapper>
            <SectionWrapper>
                <H2>KeyCaps</H2>
                <SectionContent>
                    <Keyboard>
                        {Object.keys(COLORS).map(color => <Key color={COLORS[color]}>{color}</Key>)}
                    </Keyboard>
                </SectionContent>
                {Keyboards}
            </SectionWrapper>
        </KeyCapWrapper >
    )
}

export default KeyCaps
