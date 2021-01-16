import React from "react"
import styled from "styled-components"

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

const KeyCaps = () => {
    const [isWhitePCB, setIsWhitePCB] = React.useState(true)
    const [selectedColor, setSelectedColor] = React.useState('red')
    const [keys, setKeys] = React.useState(new Array(6).fill('black'))

    return (
        <div>
            <h1>Design your own Theme!</h1>
            <h2>How To</h2>
            <ol>
                <li>Select either a Black or White PCB</li>
                <li>Select a Color from the Color Palette Below</li>
                <li>Click on a Key on Your Keyboard to change the color</li>
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

            <h2>PCB Color</h2>
            <button onClick={() => setIsWhitePCB(true)}>White</button>
            <button onClick={() => setIsWhitePCB(false)}>Black</button>
            <h2>Color Palette</h2>
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


        </div >
    )
}

export default KeyCaps
