import { createGlobalStyle } from 'styled-components'

const PRIMARY_COLOR = '#FFFFFF'
const SECONDARY_COLOR = '#333a4a'
const TERTIARY_COLOR = '#b9ccff'

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
        a {
            color: white;
            &: hover {
                color: ${ TERTIARY_COLOR};
            }
        }
    }
`

export { media, PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, GlobalStyle }
