import styled, { createGlobalStyle, css } from 'styled-components'

const FONT_FAMILY = "'Bellota Text', cursive"

const GlobalStyle = createGlobalStyle`
    :root {
        --background-color: #fff;
        --foreground-color: #424242;
        --hover-color: #0098d4;
        --accent-color: #70b5d0;
        
    }

    html {
        background-color: var(--background-color);
        color: var(--foreground-color);
        font-size: 16px;
        font-family: ${FONT_FAMILY};
    }
    a {
        color: var(--foreground-color);
        &:hover{
            color: var(--hover-color)
        }
    }
`

export {
    GlobalStyle
}