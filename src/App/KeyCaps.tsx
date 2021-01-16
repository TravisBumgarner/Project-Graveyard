import React from "react"
import styled from "styled-components"
import { useLocation, useHistory } from 'react-router-dom'

const COLORS = {
    black: "#2e2e2e",
    white: "#f0efed",
    tan: "#d7d3c7",
    gray1: "#aeada8",
    gray2: "#7a7a7a",
    gray3: "#5e5a57",
    red: "#d42929",
    pink: "#fac7cc",
    hotpink: "#ff00e0",
    orange: "#f96600",
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
    lpurple: "#bcaeeb",
}

const KEY_SPACING = '10px;'

const Key = styled.div`
    background-color: ${({ color }) => color};
    margin-right: ${KEY_SPACING};
    margin-bottom: ${KEY_SPACING};
    box-sizing: border-box;
    
    :nth-child(-n+3){
        margin-top: ${KEY_SPACING};
    }

    :nth-child(3n + 1){
        margin-left: ${KEY_SPACING};
    }

    &:before {
        content: "";
        padding-bottom: 100%;
        display: block;
    }
`

const Keyboard = styled.div`
    background-color: ${({ isWhitePCB }) => isWhitePCB ? 'white' : 'black'};
    width: 100%;
    margin: 0 auto;
    max-width: 600px;
    display: grid;
    grid-template-columns: repeat(3, 33.3%);
`

const ColorSwatches = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1em 0;
`

const Swatch = styled.div`
    flex-basis: ${95 / (Object.keys(COLORS).length / 2)}%; // There be magic numbers here.
    background-color: ${({ color }) => color};
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    ${({ hasBorder }) => hasBorder ? 'border: 5px solid white;' : ''}
`

const mapTheme = (search) => {
    const params = new URLSearchParams(search)

    const keys = ['k1', 'k2', 'k3', 'k4', 'k5', 'k6'].map(key => params.get(key))
    const allValidKeys = keys.every(key => Object.keys(COLORS).includes(key))

    const isWhitePCB = params.get('w')
    console.log(allValidKeys)
    return (allValidKeys && isWhitePCB === '1' || isWhitePCB === '0')
        ? [keys, isWhitePCB === '1']
        : [new Array(6).fill('black'), true]
}

const stringifyTheme = (keys, isWhitePCB) => {
    return keys.reduce((accum, key, index) => `${accum}k${index + 1}=${key}&`, '?') + `w=${isWhitePCB ? 1 : 0}`
}

const KeyCaps = () => {
    let history = useHistory();
    const { search } = useLocation()
    const [initialKeys, initialPCB] = mapTheme(search)

    const [isWhitePCB, setIsWhitePCB] = React.useState(initialPCB)
    const [selectedColor, setSelectedColor] = React.useState('black')
    const [keys, setKeys] = React.useState(initialKeys)

    React.useEffect(
        () => {
            history.push(stringifyTheme(keys, isWhitePCB))
        },
        [JSON.stringify(keys), isWhitePCB]
    )

    return (
        <div>
            <h1>Design your own Theme!</h1>
            <h2>How To</h2>
            <ol>
                <li>Select either a Black or White PCB: <button onClick={() => setIsWhitePCB(true)}>White</button> <button onClick={() => setIsWhitePCB(false)}>Black</button></li>
                <li>Select a Color from the Color Palette</li>
                <ColorSwatches>
                    {
                        Object
                            .keys(COLORS)
                            .map(color => {
                                return <Swatch
                                    hasBorder={color === selectedColor}
                                    color={COLORS[color]}
                                    onClick={() => setSelectedColor(color)}
                                />
                            })
                    }
                </ColorSwatches>
                <li>Click on a Key on the keyboard below to change the color</li>
                <li>Repeat the previous step until you're happy</li>
                <li>Share the page URL on Kickstarter for a chance to win your theme!</li>

            </ol>
            <h2>Your Theme</h2>
            <Keyboard
                isWhitePCB={isWhitePCB}
            >
                {keys.map((key, index) => {
                    return <Key
                        key={index}
                        color={COLORS[key]}
                        onClick={() => {
                            const newKeys = [...keys]
                            newKeys[index] = selectedColor
                            setKeys(newKeys)
                        }}
                    />
                })}
            </Keyboard>
        </div >
    )
}

export default KeyCaps
