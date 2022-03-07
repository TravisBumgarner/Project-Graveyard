import { createGlobalStyle } from 'styled-components'

import { DARKNESS } from './App/components/StyleExploration'

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 16px;
        font-weight: 400;
        font-family: 'Comfortaa', cursive;
        background-color: ${DARKNESS.base};
        padding: 1em;
        max-width: 1200px;
        margin: 0px auto;
    }
`

export default { GlobalStyle }
