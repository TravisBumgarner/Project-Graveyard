import { createGlobalStyle } from 'styled-components'

const PRIMARY_COLOR = '#FFFFFF'
const SECONDARY_COLOR = '#333a4a'
const TERTIARY_COLOR = '#b9ccff'

const customMediaQuery = (maxWidth: number) => `@media (max-width: ${maxWidth}px)`

const media = {
    desktop: customMediaQuery(1000),
    tablet: customMediaQuery(768),
    phone: customMediaQuery(376)
}

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }
    html {
        color: ${PRIMARY_COLOR};
        font-family: 'Montserrat', sans-serif;
        background-color: ${SECONDARY_COLOR};
        font-size: 16px;
    }
    h1 {
        font-size: 1.5em;
    }
    h2 {
        font-size: 1.2em;
    }
    h3 {
        font-size: 1em;
    }
    ol {
        margin: 0;
        padding: 0;
    }
`

export { media, PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, GlobalStyle }
