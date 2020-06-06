import { createGlobalStyle } from 'styled-components'

const PRIMARY_COLOR = '#FFFFFF'
const SECONDARY_COLOR = '#333a4a'

const customMediaQuery = (maxWidth: number) => `@media (max-width: ${maxWidth}px)`

const media = {
    desktop: customMediaQuery(1200),
    tablet: customMediaQuery(768),
    phone: customMediaQuery(376)
}

const GlobalStyle = createGlobalStyle`
    html {
        color: ${PRIMARY_COLOR};
        font-family: 'Montserrat', sans-serif;
        background-color: ${SECONDARY_COLOR};
        font-size: 16px;
        ${media.tablet} {
            font-size: 14px;
        }
        padding-bottom: 3em;
    }
`

export { media, PRIMARY_COLOR, SECONDARY_COLOR, GlobalStyle }
