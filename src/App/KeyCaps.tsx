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

const KEYBOARD_WIDTH = '300px'

const Key = styled.div`
    background-color: ${({ color }) => color};
    width: calc(${KEYBOARD_WIDTH} / 3);
    height: calc(${KEYBOARD_WIDTH} / 3);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin: 5px 0;
`

const Keyboard = styled.div`
    width: calc(${KEYBOARD_WIDTH} + 60px);
    background-color: white;
    padding: 10px;
    display:flex;
    flex-wrap: wrap;
    font-size: 50px;
    color: white;
    div {
        margin-left: 10px;
        margin-right: 10px;
    }
`

const KeyCapGrid = styled.div`
    background-color: white;
    display: flex;
    flex-wrap: wrap;

    div {
        margin: 10px;
    }
`

const KeyCaps = () => {
    const [selectedColor, setSelectedColor] = React.useState('red')
    const [keys, setKeys] = React.useState(new Array(6).fill('black'))

    return (
        <div>
            <KeyCapGrid>
                {
                    Object
                        .keys(COLORS)
                        .map(color => {
                            return <Key
                                color={COLORS[color]}
                                onClick={() => setSelectedColor(color)}
                            >{color}
                            </Key>
                        })
                }
            </KeyCapGrid>

            <div style={{
                backgroundColor: COLORS[selectedColor], width: '50px', height: '50px'
            }} />

            <Keyboard>
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
    // const Keyboards = keyboards.map(({ title, keys, text, images }) => {
    //     return <>
    //         <H2>{title}</H2>
    // <Keyboard>
    //     {keys.map((key, index) => <Key color={COLORS[key]}>{text ? text[index] : ''}{images ? <img src={images[index]} /> : ''}</Key>)}
    // </Keyboard>
    //     </>
    // })

    // return (
    //     <KeyCapWrapper>
    //         <SectionWrapper>
    //             <H2>Key Cap Colors</H2>
    //             <SectionContent>
    // < KeyCapGrid >
    // { Object.keys(COLORS).map(color => <Key color={COLORS[color]}>{color}</Key>) }
    //             </KeyCapGrid >
    //             </SectionContent>
    //             {Keyboards}
    //         </SectionWrapper>
    //     </KeyCapWrapper >
    // )
}

export default KeyCaps
