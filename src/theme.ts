import { createGlobalStyle } from 'styled-components'

const PRIMARY_COLOR = '#FFFFFF'
const SECONDARY_COLOR = '#32394c'
const TERTIARY_COLOR = '#b9ccff'

const customMediaQuery = (maxWidth: number) => `@media (max-width: ${maxWidth}px)`

const media = {
    desktop: customMediaQuery(1200),
    tablet: customMediaQuery(768),
    phone: customMediaQuery(376)
}

const GlobalStyle = createGlobalStyle`
    html {
        background-color: ${SECONDARY_COLOR};
        font-size: 16px;
        ${media.tablet} {
            font-size: 14px;
        }
    }
`

export { media, PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, GlobalStyle }
