import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 16px;
        font-weight: 400;
        font-family: 'Comfortaa', cursive;
        background-color: #242424;
        padding: 1em;
        max-width: 1200px;
        margin: 0px auto;
    }
`

export default { GlobalStyle }
